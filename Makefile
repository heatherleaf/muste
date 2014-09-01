
GFDIR = grammar
GFNAME = Grasp
GFLANG = Eng Swe Ger

.PHONY: help grammar clean

help:
	@echo "make clean: remove generated files"
	@echo "make grammar.js: build grammar from GF sources"
	@echo "make bliss-metadata.js: build metadata for Blissymbolics"

clean: 
	rm -f grammar.js grammar.pgf* $(GFDIR)/*.gfo

grammar: grammar.js

bliss-metadata.js:
	python compile_metadata.py > $@

GFFILES = $(wildcard $(GFDIR)/*.gf)
GFBASES = $(GFLANG:%=$(GFDIR)/$(GFNAME)%.gf)
GFMAKE = gf --make --optimize-pgf --name grammar --output-format 

grammar.js: $(GFFILES)
	$(GFMAKE) js $(GFBASES)

grammar.pgf.txt: $(GFFILES)
	$(GFMAKE) pgf_pretty $(GFBASES)
	mv grammar.txt $@

