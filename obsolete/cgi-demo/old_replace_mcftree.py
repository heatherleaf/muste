
import Mini
import GF
from collections import namedtuple

FIXLIN = False

def fix_lin(lin):
    """adds 0 (or not) to every path in a linearization"""
    if FIXLIN:
        return [(word, path+(0,)) for (word, path) in lin]
    else:
        return lin

sentences = ["ser flickan sma barn ?",
             "ser en flicka det lilla barnet ?",
             ]


def main(sent):
    gram = GF.PGF(Mini.Mini)["MiniSwe"]
    sent = sent.split()
    for nr, word in enumerate(sent):
        if word.startswith("*"):
            sent[nr] = word[1:]
            break
    else:
        nr = 0

    parser = gram.parser()
    tree = parser.mcfparser.parse(sent).next()
    lin = linearise(gram, tree)
    lin = fix_lin(lin)
    assert sent == [w for w,p in lin]

    word, focus = lin[nr]
    print GF.str_tree(tree, focus)
    print "->", GF.str_lin(lin, focus)
    print

    for oper, path, newtrees in modify_mcftree_from_focus(gram, tree, focus):
        print "%s: '%s'" % (oper.__name__, GF.str_path(path))
        print "    ", GF.str_tree(GF.lookup_path(tree, path), focus[len(path):])
        print "  =>", "\n     ".join(GF.str_tree(new, p) for p, new in newtrees)
    print


def modify_mcftree_from_focus(gram, tree, focus):
    for n in range(len(focus), -1, -1):
        ancestor = GF.lookup_path(tree, focus[:n])
        for oper in (replace_mcftree_from_focus,):
            newtrees = list(oper(gram, ancestor, focus[n:]))
            if newtrees:
                yield oper, focus[:n], newtrees


def replace_mcftree_from_focus(gram, tree, focus, maxchanges=2):
    """
    searches for a parent to change, possibly also 
    changing children at the same time
    """
    cat, _args = get_typing(gram, tree[0])
    forbidden = focus[0] - 1 if focus else None
    for newcat in get_simcats(gram, cat):
        for changesleft, newtree in get_similar_mcftree(gram, tree, newcat, forbidden, maxchanges):
            if maxchanges - changesleft:
                yield focus, newtree

def get_similar_mcftree(gram, tree, newcat, forbidden, maxchanges):
    fun, children = tree[0], tree[1:]
    cat, args = get_typing(gram, fun)
    for newfun, newargs in gram.productions[newcat]:
        if not newfun:
            assert len(newargs) == 1
            newfun = GF.Coercion(newcat, newargs[0])
        maxch0 = maxchanges
        if fun != newfun:
            maxch0 -= 1
        if similar_cats(gram, args, newargs, maxchanges):
            for maxch, newchildren in get_similar_mcfchildren(gram, children, args, newargs, 0, forbidden, maxch0):
                yield maxch, (newfun,) + newchildren

def get_similar_mcfchildren(gram, children, args, newargs, childnr, forbidden, maxchanges):
    if childnr >= len(children):
        yield maxchanges, ()
    elif maxchanges <= 0:
        if args[childnr:] == newargs[childnr:]:
            yield maxchanges, children[childnr:]
    else:
        if childnr == forbidden:
            similar_children = []
            if args[childnr] == newargs[childnr]:
                similar_children.append((maxchanges, children[childnr]))
        else:
            similar_children = get_similar_mcftree(gram, children[childnr], newargs[childnr], None, maxchanges)
        for maxch0, newchild in similar_children:
            for maxch, newsiblings in get_similar_mcfchildren(gram, children, args, newargs, childnr+1, forbidden, maxch0):
                yield maxch, (newchild,) + newsiblings

def similar_cats(gram, cats, sims, maxchanges):
    if len(cats) != len(sims):
        return False
    diff_ctr = 0
    for (cat, sim) in zip(cats, sims):
        if cat == sim:
            continue
        elif sim in get_simcats(gram, cat):
            diff_ctr += 1
        else:
            return False
    return diff_ctr <= maxchanges




## annotation: not necessary??

Annotation = namedtuple("Annotation", "fun lbls")
Annotation.__str__ = lambda self: "%s/%s" % (self.fun, "".join(sorted(map(str, self.lbls))))

def annotate_tree(gram, tree, lbls=set([0])):
    fun, children = tree[0], tree[1:]
    if type(fun) is GF.Coercion:
        assert len(children) == 1
        return (Annotation(fun, lbls), annotate_tree(gram, children[0], lbls))
    seqs, _absfun = gram.cncfuns[fun]
    childlbls = tuple(set() for _ in children)
    for lbl in lbls:
        seq = gram.sequences[seqs[lbl]]
        for arg in seq:
            if isinstance(arg, tuple):
                childlbls[arg[0]].add(arg[1])
    return (Annotation(fun, lbls),) + tuple(annotate_tree(gram, child, clbls)
                                  for (child, clbls) in zip(children, childlbls))




def get_typing(gram, fun):
    if type(fun) is GF.Coercion:
        return (fun.cat, [fun.arg])
    for cat, typings in gram.productions.items():
        for fun_, args in typings:
            if fun == fun_:
                return cat, args

def get_simcats(gram, cat):
    for abscat, cats in gram.cnccats.items():
        if cat in cats:
            return cats
    return [cat]


## linearization

def getlin(gram, fun, lbls=None):
    seqs, _absfun = gram.cncfuns[fun]
    if lbls is None:
        lbls = range(len(seqs))
    return dict((lbl, gram.sequences[seqs[lbl]]) for lbl in lbls)

def filterwords(lin):
    return dict((lbl, [word for word in seq if isinstance(word, basestring)])
                for lbl, seq in lin.items())

def filterargs(lin):
    return dict((lbl, [arg for arg in seq if isinstance(arg, tuple)])
                for lbl, seq in lin.items())
    return [arg for arg in lin if isinstance(arg, tuple)]


## MCFG linearization

def linearise(gram, tree):
    """returns a (str,path) list"""
    return linearise_nondet(gram, tree).next()[0]

def linearise_nondet(gram, tree, path=()):
    """returns a generator of tuples of (str,path) lists"""
    cncfun = tree[0]
    if type(cncfun) is GF.Coercion:
        for lin in linearise_nondet(gram, tree[1], GF.append_path(path, 1)):
            yield lin
    else:
        seqs, _absfun = gram.cncfuns[cncfun]
        for children_lins in _linearise_children_nondet(gram, tree, path):
                lin = tuple([] for _ in seqs)
                for i, seqnr in enumerate(seqs):
                    seq = gram.sequences[seqnr]
                    phrase = lin[i]
                    for arg in seq:
                        if isinstance(arg, tuple):
                            phrase.extend(children_lins[arg[0]][arg[1]])
                        elif isinstance(arg, basestring):
                            phrase.append((arg, path))
                        elif isinstance(arg, list):
                            phrase.extend((w, path) for w in arg)
                        else:
                            raise ValueError("Unrecognised sequence item: %r" % arg)
                yield lin

def _linearise_children_nondet(gram, tree, path, childnr=1):
    if childnr >= len(tree): 
        yield ()
    else:
        for childlin in linearise_nondet(gram, tree[childnr], GF.append_path(path, childnr)):
            for childrenlins in _linearise_children_nondet(gram, tree, path, childnr+1):
                yield (childlin,) + childrenlins


if __name__ == '__main__':
    import sys
    if not sys.argv[1:]:
        for s in sentences:
            print s
    else:
        main(*sys.argv[1:])
