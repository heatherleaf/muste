

mini_tree = ("(decl (cl"
             " (np (sg_def) (cn (girl)))"
             " (vp (see) (np (sg_indef) (cn (boy))))))")

manycats_tree = ("(phr (utt (s"
                 " (npp (np many catt) (pp inn (np this house)))"
                 " (vp2 hunt (np plind dog)))))")

phrasebook_tree = ("(PSentence (SHaveNo (Children (IMale))"
                   " (SuchKind (Very (Boring))"
                   " (SuchKind (PropQuality (Cold)) (Apple)))))")

GRAMMARS = {
    "MiniSwe": mini_tree,
    "ManycatsEng": manycats_tree,
    "ManycatsSwe": manycats_tree,
    "PhrasebookEng": phrasebook_tree,
    "PhrasebookFre": phrasebook_tree,
    "PhrasebookGer": phrasebook_tree,
    "PhrasebookSwe": phrasebook_tree,
}

DEFAULT_GRAMMAR = "MiniSwe"

phrasebook_dir = "/Users/peter/Projekt/GF/examples/phrasebook/"

origins = {
    "PhrasebookEng": phrasebook_dir,
    "PhrasebookFre": phrasebook_dir,
    "PhrasebookGer": phrasebook_dir,
    "PhrasebookSwe": phrasebook_dir,
}

abstracts = {
    "MiniSwe": "Mini",
}


## This is for pickling the grammars:
## python grammars.py --pickle

def pickle_grammars():
    import cPickle as pickle
    import subprocess
    import os 
    import GF
    for grammar in GRAMMARS:
        print "#" * 70
        print "##", grammar
        gffile = origins.get(grammar, "") + grammar
        subprocess.check_call(["gf", "-make", "-f", "python", "-n", grammar, gffile + ".gf"])
        abstract = abstracts.get(grammar, grammar[:-3])
        grammar_module = {}
        execfile(grammar + ".py", grammar_module)
        G = GF.PGF(grammar_module[abstract])[grammar]
        with open(grammar + ".pickle", "wb") as F:
            pickle.dump(G, F, protocol=2)
        print

if __name__ == '__main__':
    import sys
    if len(sys.argv) == 2 and sys.argv[1].lower().lstrip('-') == 'pickle':
        pickle_grammars()
