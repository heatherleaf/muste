
GFNAME = Grasp
GFLANG = Eng Swe Ger

INPUTDIR = grammars/grasp
OUTPUTDIR = js/generated

.PHONY: help clean grammar metadata

help:
	@echo "make clean: remove generated files"
	@echo "make grammar: build grammar from GF sources"
	@echo "make metadata: build metadata for Blissymbolics"

clean: 
	rm -f $(OUTPUTDIR)/*.* $(INPUTDIR)/*.gfo

grammar: $(OUTPUTDIR)/grammar.js

metadata: $(OUTPUTDIR)/bliss-metadata.js

$(OUTPUTDIR)/bliss-metadata.js:
	python tools/compile_metadata.py > $@

GFFILES = $(wildcard $(INPUTDIR)/*.gf)
GFBASES = $(GFLANG:%=$(INPUTDIR)/$(GFNAME)%.gf)
GFMAKE = gf --make --optimize-pgf --name grammar --output-dir $(OUTPUTDIR) --output-format

$(OUTPUTDIR)/grammar.js: $(GFFILES)
	$(GFMAKE) js $(GFBASES)

$(OUTPUTDIR)/grammar.txt: $(GFFILES)
	$(GFMAKE) pgf_pretty $(GFBASES)

