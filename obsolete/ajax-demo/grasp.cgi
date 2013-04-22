#!/usr/bin/python
# -*- coding: utf-8 -*-

import cgi
import json
import cPickle as pickle
import GF

HEADER = "Content-type:text/json\r\n\r\n"

def main_cgi():
    print HEADER
    form = cgi.FieldStorage() 
    userinput = form.getfirst("input")
    if not userinput:
        raise ValueError("I need a CGI parameter 'input'.")
    for tree in parse_userinput(userinput):
        print tree

ENCODING = "UTF-8"

LIN = 'LIN'
POSITIONS = BEFORE, ON, AFTER = 'BEFORE', 'ON', 'AFTER'

def main():
    form = cgi.FieldStorage() 
    grammar_name = form.getfirst("grammar")
    with open(grammar_name + ".pickle", "rb") as grammar_file:
        grammar = pickle.load(grammar_file)

    tree_str = form.getfirst("tree")
    tree = GF.parse_tree(tree_str)
    lin = linearise(grammar, tree)

    result = {}
    result[LIN] = [(w, str_path(p)) for w,p in lin]
    for position in POSITIONS:
        for wordnr in range(len(lin)):
            for context, modifs in click_somewhere(grammar, tree, lin, wordnr, position):
                context = str_path(context)
                result.setdefault(position, {}).setdefault(wordnr, {})[context] = modifs
    print json.dumps(result, separators=(',',':'))
    # print json.dumps(result, sort_keys=True, indent=4, separators=(',', ': '))


## word operations

def click_somewhere(grammar, tree, lin, wordnr, pos):
    _word, focus = lin[wordnr]
    focus_lin = restricted_lin(lin, focus)
    for k in range(len(focus)-1, -1, -1):
        context, context_focus = focus[:k], focus[k:]
        context_tree = GF.lookup_path(tree, context)
        context_lin = restricted_lin(lin, context)
        if (pos == ON or 
            pos == BEFORE and context_lin[:len(focus_lin)] == focus_lin or 
            pos == AFTER and context_lin[-len(focus_lin):] == focus_lin 
            ):
            for treeoper in (replace_gftree, wrap_gftree, unwrap_gftree):
                choices = []
                newtrees = []
                for new_context_tree, new_context_focus in treeoper(grammar, context_tree, context_focus):
                    new_focus = GF.concat_path(context, new_context_focus)
                    new_tree = GF.tree_replace_subtree(tree, context, new_context_tree)
                    new_lin = linearise(grammar, new_tree)
                    new_context_lin = restricted_lin(new_lin, context)
                    if pos == ON:
                        new_focus_lin = restricted_lin(new_lin, new_focus)
                        if mapwords(new_focus_lin) == mapwords(focus_lin):
                            continue
                    elif new_focus:
                        focused_context_words = [GF.startswith(p, new_focus) for w,p in new_context_lin]
                        if pos == AFTER: 
                            focused_context_words.reverse()
                        try:
                            first_focused_word = focused_context_words.index(True)
                            assert first_focused_word > 0
                            if pos == AFTER: 
                                new_focus_lin = new_context_lin[-first_focused_word:]  
                            else: 
                                new_focus_lin = new_context_lin[:first_focused_word]
                            new_focus = commonprefix([p for w,p in new_focus_lin])
                        except (ValueError, AssertionError):
                            continue
                    old_focus = focus 
                    new_focus_lin = map_str_path(restricted_lin(new_lin, new_focus))
                    old_context_lin = map_str_path(restricted_lin(lin, context))
                    new_context_lin = map_str_path(restricted_lin(new_lin, context))
                    choices.append({
                        'new-tree': new_tree, 
                        'new-focus': str_path(new_focus), 
                        'old-focus': str_path(old_focus),
                        'new-focus-lin': new_focus_lin, 
                        'new-context-lin': new_context_lin, 
                        'old-context-lin': old_context_lin,
                        })
                if choices:
                    yield context, choices

def map_str_path(lin):
    return [(w, str_path(p)) for (w, p) in lin]

def str_path(path):
    return "0" + GF.str_path(path)

def restricted_lin(lin, focus):
    if focus is None:
        return []
    return [(word, path) for (word, path) in lin if GF.startswith(path, focus)]

def commonprefix(sequences):
    "returns the longest common leading component"
    if not sequences: 
        return ()
    minseq = min(sequences)
    maxseq = max(sequences)
    for i, c in enumerate(minseq):
        if c != maxseq[i]:
            return minseq[:i]
    return minseq

def mapwords(lin):
    return [word for (word, path) in lin]


## tree operations

def replace_gftree(grammar, tree, focus):
    """
    Tries to change the top node in 'tree' to a function 
    of the same type, or to change a child subtree;
    the 'focus' child (if it exists) must not be changed.
    """
    fun = tree[0]
    typing = grammar.abstract.funs[fun]
    for newfun, newtyping in grammar.abstract.funs.items():
        if fun != newfun and typing == newtyping:
            newtree = (newfun,) + tree[1:]
            yield newtree, focus
    focuschild = focus[0] if focus else None
    for childnr in range(1, len(tree)):
        if childnr != focuschild:
            for newchild, _focus in replace_gftree(grammar, tree[childnr], None):
                newtree = tree[:childnr] + (newchild,) + tree[childnr+1:]
                yield newtree, focus

def unwrap_gftree(grammar, tree, focus):
    if focus:
        focuschild = focus[0]
        cat, args = grammar.abstract.funs[tree[0]]
        for childnr, cat0 in enumerate(args, 1):
            if cat == cat0:
                newfocus = focus[1:] if childnr == focuschild else None
                yield tree[childnr], newfocus

def wrap_gftree(grammar, tree, focus):
    cat, _ = grammar.abstract.funs[tree[0]]
    for wrapper, (cat0, args) in grammar.abstract.funs.items():
        if cat == cat0 and len(args) == 2 and cat in args:
            newcat = (cat if args[0] == args[1] else
                      args[0] if cat == args[1] else
                      args[1])
            for newtree in generate_tree(grammar, newcat):
                if cat == args[0]:
                    yield (wrapper, tree, newtree), (1,) + focus
                if cat == args[1]:
                    yield (wrapper, newtree, tree), (2,) + focus

def generate_tree(grammar, cat, maxdepth=10, visited=set()):
    if maxdepth:
        for fun, (cat0, args) in grammar.abstract.funs.items():
            if cat == cat0 and fun not in visited:
                for children in generate_children(grammar, args, maxdepth-1, visited | set([fun])):
                    yield (fun,) + children

def generate_children(grammar, args, maxdepth, visited, childnr=0):
    if childnr >= len(args):
        yield ()
    # elif childnr > 0:
    #     # only generate a tree for the first child,
    #     # the other children become meta variables:
    #     yield (None,) * (len(args) - 1)
    else:
        for child in generate_tree(grammar, args[childnr], maxdepth, visited):
            # for children in generate_children(grammar, args, maxdepth, visited, childnr+1):
            #     yield (child,) + children
            #
            # only the first child will get several choices,
            # the other children will only generate one tree:
            all_children = generate_children(grammar, args, maxdepth, visited, childnr+1)
            try: 
                children = all_children.next()
                yield (child,) + children
            except StopIteration:
                pass


## linearisation

def filterwords(lin):
    return dict((lbl, [word for word in seq if isinstance(word, basestring)])
                for lbl, seq in lin.items())

def filterargs(lin):
    return dict((lbl, [arg for arg in seq if isinstance(arg, tuple)])
                for lbl, seq in lin.items())
    return [arg for arg in lin if isinstance(arg, tuple)]

def fixlin(lin):
    return [(word, GF.append_path(path, 0))
            for (word, path) in lin]

def linearise(grammar, tree):
    return fixlin(grammar.linearise(tree))


## main

if __name__ == '__main__':
    try:
        print HEADER
        main()
    except Exception as err:
        error = {"ERROR": type(err).__name__,
                 "str": str(err)}
        ## Uncomment this to show more information about the error:
        import traceback, sys
        for n, line in enumerate(traceback.format_exc().splitlines()):
            error['tb-%2d'%n] = line
        print json.dumps(error, sort_keys=True, indent=4, separators=(',', ': '))


