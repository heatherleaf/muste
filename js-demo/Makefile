
# Put the path to your Phrasebook grammar here:
PBBASE = ~/Projekt/GF-contrib/phrasebook/Phrasebook

# The Phrasebook languages you want:
PBLANGS = Eng Bul Fin Swe Tha 
# ^^ the only languages that has the larger vocabulary in Words.gf
# Eng Swe Ger Fre Spa Fin Tha Lav Rus Urd Ron Snd Spa Bul Cat Dut Hin Ita Pol Nor Dan Pes

PBEXTRA = ~/Projekt/GF-CCF/RGL/bliss/PhrasebookZbl.gf

GF-MAKE = gf --make --optimize-pgf -f 


# Put the path to your Traceur compiler here:
TRACEUR-COMPILER = ~/Applications/github/traceur-compiler/traceur

COPIED-FILES = Phrasebook.js utilities.js grasp.css traceur-runtime.js jquery-1.9.1.min.js bliss-metadata.js
TRACEUR-FILES = GF.js grasp.js grasp-gui.js

.PHONY: compiled

compiled: $(TRACEUR-FILES:%=compiled/%) $(COPIED-FILES:%=compiled/%) compiled/grasp.html

$(TRACEUR-FILES:%=compiled/%): compiled/%: %
	$(TRACEUR-COMPILER) --unstarred-generators --out $@ $<

$(COPIED-FILES:%=compiled/%): compiled/%: %
	cp $< $@

compiled/grasp.html: grasp.html
	perl -pe 's|javascript;version=1.7|javascript|; s|<!--::||; s|::-->||' $< > $@

bliss-metadata.js:
	python compile_metadata.py > $@

Phrasebook.js: $(PBBASE).gf $(PBLANGS:%=$(PBBASE)%.gf) $(PBEXTRA)
	$(GF-MAKE) js $^
