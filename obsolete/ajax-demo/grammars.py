
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
