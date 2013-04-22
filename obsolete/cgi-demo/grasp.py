#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import os.path
import cPickle as pickle
import cgi
import cgitb

import GF
from grammars import GRAMMARS, DEFAULT_GRAMMAR

ENCODING = "UTF-8"

def main(*argv):
    form = cgi.FieldStorage() 
    if argv:
        main_commandline(*argv)
    else:
        _cgitb_reset = cgitb.reset
        cgitb.reset = lambda: _cgitb_reset().replace("</", "</option> </select> </", 1)
        cgitb.enable(format="html")
        main_cgi()


## CGI

CSS = """
.grammars {font-family: verdana, arial, sans-serif; font-size: 70%; text-align: center; margin: 1em}
.grammars ul {list-style: none; display: inline; border: 1px solid; padding: 1em}
.grammars li {display: inline; margin: 1em}
.sentence {margin: 4em auto; font-family: georgia, serif; font-size: 200%}
.sentence table {border-collapse: collapse; margin: auto}
tr {vertical-align: top}
td {text-align: center; borderX: 1px solid blue}
td, tr, li, div, span {padding: 0em; margin: 0em}
.word span {padding: 0em 0.2em}
.word:hover {cursor: hand; cursor: pointer}
.menu {display: none}
.menu ul {list-style: none; padding: 0em 0.2em; margin: 0.2em; background-color: #ffa; border-radius: 8px}
a, a:visited {text-decoration: none; color: #00c}
a:hover, .clickable:hover {color: #b00; background-color: #ffb; border-radius: 8px}
"""

SCRIPT = """
function clicked(wordnr, click_before_word) {
  var clicked_id = "menu-" + wordnr + "-" + click_before_word;
  var clicked_menu = document.getElementById(clicked_id);
  if (clicked_menu) 
    if (clicked_menu.style.display == "inline")
      clicked_menu = null;
  var elements = document.getElementsByClassName("menu");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  if (clicked_menu) {
    clicked_menu.style.display = "inline";
  }
}
"""

HEADER = """Content-type:text/html; charset=%s\r\n\r\n
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=%s" />
<title>GRASP</title>
<style>%s</style>
<script>%s</script>
</head>
""" % (ENCODING, ENCODING, CSS, SCRIPT)

def main_cgi():
    print HEADER, '<body>'
    scriptfile = os.path.basename(sys.argv[0])
    form = cgi.FieldStorage() 
    grammar_name = form.getfirst("grammar")
    if grammar_name not in GRAMMARS:
        grammar_name = DEFAULT_GRAMMAR

    with open(grammar_name + ".pickle", "rb") as grammar_file:
        grammar = pickle.load(grammar_file)

    default_tree = GRAMMARS[grammar_name]
    tree = form.getfirst("tree")
    try:
        tree = GF.parse_tree(tree)
        lin = linearise(grammar, tree)
    except (KeyError, AttributeError, SyntaxError):
        tree = GF.parse_tree(GRAMMARS[grammar_name])
        lin = linearise(grammar, tree)

    print '<div class="grammars"><ul>'
    cgi_tree = cgi.escape(GF.str_tree(tree).replace(" ",""), True).encode(ENCODING)
    for g in sorted(GRAMMARS):
        if g == grammar_name:
            print '<li>%s</li>' % (g,)
        else:
            print ('<li><a class="clickable" href="%s?grammar=%s&tree=%s">%s</a></li>' % 
                   (scriptfile, g, cgi_tree, g))
    print '</ul></div>'

    all_clicks = [(wordnr, click_before_word)
                  for wordnr in range(len(lin) + 1)
                  for click_before_word in (True, False)
                  if wordnr < len(lin) or click_before_word]

    print '<div class="sentence"><table><tr>'
    for wordnr, click_before_word in all_clicks:
        if click_before_word:
            word = "&nbsp;&nbsp;&nbsp;"
        else:
            word, _focus = lin[wordnr] 
            word = word.encode(ENCODING)
        modifications = click_somewhere(grammar, tree, lin, wordnr, click_before_word)
        if modifications:
            print '<td>'
            print ('<div class="word" onclick="clicked(%d,%d)"><span class="clickable">%s</span></div>' % 
                   (wordnr, click_before_word, word))
            print '<div class="menu" id="menu-%d-%d">' % (wordnr, click_before_word)
            for sublist in modifications:
                print '<ul>'
                for (new_tree, new_focus, old_focus, new_focus_lin, new_context_lin, old_context_lin) in sublist:
                    cgi_tree = cgi.escape(GF.str_tree(new_tree).replace(" ",""), True).encode(ENCODING)
                    cgi_old_cxt_lin = GF.str_lin(old_context_lin).encode(ENCODING)
                    cgi_new_cxt_lin = GF.str_lin(new_context_lin).encode(ENCODING)
                    cgi_lin = GF.str_lin(new_focus_lin).encode(ENCODING) if new_focus_lin else "&empty;"
                    print ('<li><a href="%s?grammar=%s&tree=%s" title="%s &rArr; %s">%s</a></li>' % 
                           (scriptfile, grammar_name, cgi_tree, cgi_old_cxt_lin, cgi_new_cxt_lin, cgi_lin))
                print '</ul>'
            print '</div></td>'
        else:
            print '<td><div class="word" onclick="clicked()"><span>%s</span></div></td>' % (word,)
    print '</tr></table></div>'

    print '</form>'
    print '</body>'
    print '</html>'

## Command line

def main_commandline(grammar_name):
    with open(grammar_name + ".pickle", "rb") as grammar_file:
        grammar = pickle.load(grammar_file)
    tree = GF.parse_tree(GRAMMARS[grammar_name])
    # if isinstance(sentence, str):
    #     sentence = sentence.decode(ENCODING)
    # sentence = sentence.split()
    # parser = grammar.parser()
    # tree = parser.parse(sentence).next()
    interact(grammar, tree)

def interact(grammar, tree):
    lin = linearise(grammar, tree)
    print "=" * 80
    print GF.str_tree(tree)
    print
    print "     _ ", "  _  ".join(w.center(3) for w,p in lin), " _ "
    print "     0 ", 
    for n, (w,p) in enumerate(lin, 1):
        print str(2*n-1).center(max(len(w),3)), "%2d " % (2*n),
    print
    print
    while True:
        try:
            click = raw_input("[0-%d]: " % (2*len(lin)))
            if click.strip():
                click = int(click)
                assert 0 <= click <= 2 * len(lin)
                break
            return
        except (ValueError, AssertionError):
            pass

    wordnr = click // 2
    click_before_word = (click % 2 == 0)
    modifications = click_somewhere(grammar, tree, lin, wordnr, click_before_word)

    words = [w for w,p in lin]
    if click_before_word:
        words[wordnr:wordnr] = ["++"]
    spaces = sum(len(w) + 2 for w in words[:wordnr])
    print
    print " "*6 + "  ".join(words)
    print "%*s%s" % (6 + spaces, " ", "+"*len(words[wordnr]))

    if not modifications:
        print "%*s" % (10 + spaces, "FAIL")
    else:
        choices = []
        for sublist in modifications:
            print "%*s" % (7 + spaces, "+")
            for (new_tree, new_focus, old_focus, new_focus_lin, new_context_lin, old_context_lin) in sublist:
                print ("%*d: %-30s(%s => %s)" % 
                       (4 + spaces, len(choices), 
                        GF.str_lin(new_focus_lin), 
                        GF.str_lin(old_context_lin, old_focus), 
                        GF.str_lin(new_context_lin, new_focus)))
                choices.append(new_tree)
        print

        while True:
            try:
                n = raw_input("[0-%d]: " % (len(choices) - 1))
                if n.strip():
                    n = int(n)
                    assert 0 <= n < len(choices)
                    tree = choices[n]
                break
            except (ValueError, AssertionError):
                pass

    print
    interact(grammar, tree)


## word operations

OPERATIONS = REPLACE, PREPEND, APPEND = "REPLACE", "PREPEND", "APPEND"

def click_somewhere(grammar, tree, lin, wordnr, click_before_word):
    modifications = []
    if click_before_word:
        if wordnr < len(lin):
            _word, focus = lin[wordnr]
            modifications += modify_word(grammar, tree, lin, focus, PREPEND)
        if wordnr > 0:
            _word, focus = lin[wordnr - 1]
            modifications += modify_word(grammar, tree, lin, focus, APPEND)
    else:
        _word, focus = lin[wordnr]
        modifications += modify_word(grammar, tree, lin, focus, REPLACE)
    # sort results according to context path:
    modifications.sort(key=lambda res: res[1], reverse=True) 

    choices = []
    for (_oper, context, newtrees) in modifications:
        choices.append([])
        for (new_tree, new_lin, new_focus) in newtrees:
            old_focus = focus 
            if click_before_word:
                old_focus = None
            new_focus_lin = restricted_lin(new_lin, new_focus)
            old_context_lin = restricted_lin(lin, context)
            new_context_lin = restricted_lin(new_lin, context)
            choices[-1].append((new_tree, new_focus, old_focus,
                                new_focus_lin, new_context_lin, old_context_lin))
    return choices

def modify_word(grammar, tree, lin, focus, oper):
    assert oper in OPERATIONS, (
            "Exactly one of {%s} must be selected." % (", ".join(OPERATIONS),))
    focus_lin = restricted_lin(lin, focus)
    for k in range(len(focus)-1, -1, -1):
        context, context_focus = focus[:k], focus[k:]
        context_tree = GF.lookup_path(tree, context)
        context_lin = restricted_lin(lin, context)
        if (oper == REPLACE or 
            # context_lin[:len(focus_lin)] == focus_lin or 
            # context_lin[-len(focus_lin):] == focus_lin or
            context_lin == focus_lin
            ):
            for treeoper in (replace_gftree, wrap_gftree, unwrap_gftree):
                newtrees = []
                for new_context_tree, new_context_focus in treeoper(grammar, context_tree, context_focus):
                    new_focus = GF.concat_path(context, new_context_focus)
                    new_tree = GF.tree_replace_subtree(tree, context, new_context_tree)
                    new_lin = linearise(grammar, new_tree)
                    new_context_lin = restricted_lin(new_lin, context)
                    if oper == REPLACE:
                        new_focus_lin = restricted_lin(new_lin, new_focus)
                        if mapwords(new_focus_lin) != mapwords(focus_lin):
                            newtrees.append((new_tree, new_lin, new_focus))
                    elif new_focus:
                        focused_context_words = [GF.startswith(p, new_focus) for w,p in new_context_lin]
                        if oper == APPEND: 
                            focused_context_words.reverse()
                        try:
                            first_focused_word = focused_context_words.index(True)
                            assert first_focused_word > 0
                            if oper == APPEND: 
                                new_focus_lin = new_context_lin[-first_focused_word:]  
                            else: 
                                new_focus_lin = new_context_lin[:first_focused_word]
                            new_focus = commonprefix([p for w,p in new_focus_lin])
                            newtrees.append((new_tree, new_lin, new_focus))
                        except (ValueError, AssertionError):
                            pass
                if newtrees:
                    yield (treeoper, context, newtrees)

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
    return [(word, GF.append_path(path, 0)) for (word, path) in lin]

def linearise(grammar, tree):
    return fixlin(grammar.linearise(tree))


## main

if __name__ == '__main__':
    main(*sys.argv[1:])
