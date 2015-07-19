
TSFILES = $(wildcard src/*.ts)

.PHONY: all help clean grammar

.DELETE_ON_ERROR:
.SECONDARY:

all: demo/js/muste-gui.js
	rsync -a src/lib/*.js demo/js/

help:
	@echo "make all: compile everything"
	@echo "make clean: remove generated files"
	@echo "make grammar: build grammar from GF sources"

demo/js/muste-gui.js: src/muste-gui.ts $(TSFILES) grammar
	tsc --out $@ $<


clean:
	rm -f demo/js/* grammars/*.gfo src/generated/*


GENDIR = src/generated

grammar: $(GENDIR)/grammar.ts

GFNAME = Grasp
GFLANG = Eng Swe Ger

GFFILES = $(wildcard gf/*.gf)
GFBASES = $(GFLANG:%=gf/$(GFNAME)%.gf)
GFMAKE = gf --make --optimize-pgf --name grammar --output-dir $(GENDIR) --output-format

$(GENDIR)/grammar.ts: $(GENDIR)/grammar.js
	cp $< $@

$(GENDIR)/grammar.js: $(GFFILES)
	$(GFMAKE) js $(GFBASES)
