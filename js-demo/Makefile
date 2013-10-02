
## To compile
# Put the path to your Traceur compiler here:
TRACEUR-COMPILER = ~/Applications/github/traceur-compiler/traceur

# Put the path to your Phrasebook grammar here:
PBBASE = ~/Projekt/GF-contrib/phrasebook/Phrasebook
PBEXTRA = ~/Projekt/GF-CCF/RGL/bliss/PhrasebookZbl.gf

# The Phrasebook languages you want (excluding the PBEXTRA languages)
PBLANGS = Eng Bul Fin Swe Tha 
# ^^ these are the only languages that has the larger vocabulary defined in Words.gf
# Eng Swe Ger Fre Spa Fin Tha Lav Rus Urd Ron Snd Spa Bul Cat Dut Hin Ita Pol Nor Dan Pes

GF-MAKE = gf --make --optimize-pgf -f 

COMPILED-FILES = compiled-grasp.html compiled-GF.js compiled-grasp.js compiled-grasp-gui.js 

.PHONY: help compiled clean

help:
	@echo "To compile for other browsers than Firefox: make compiled"
	@echo "   - for this you need the Traceur compiler and Node.js"
	@echo "   - you probably have to change file paths in this Makefile"
	@echo
	@echo "To build metadata and grammars: make -B bliss-metadata.js Phrasebook.js"
	@echo "   - for this you need GF and the Phrasebook grammars from GF-contrib"
	@echo "   - you probably have to change file paths in this Makefile"
	@echo
	@echo "To remove automatic files: make clean"

compiled: $(COMPILED-FILES) 

clean: 
	rm -f $(COMPILED-FILES) bliss-metadata.js Phrasebook.js Phrasebook.pgf

compiled-%.js: %.js
	$(TRACEUR-COMPILER) --unstarred-generators --out $@ $<

compiled-grasp.html: grasp.html
	perl -pe 's|javascript;version=1.7" +src="|javascript" src="compiled-|' $< > $@

bliss-metadata.js:
	python compile_metadata.py > $@

Phrasebook.js: $(PBBASE).gf $(PBLANGS:%=$(PBBASE)%.gf) $(PBEXTRA)
	$(GF-MAKE) js $^
