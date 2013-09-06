
GF-MAKE = gf -make -optimize-pgf -f 

# Put the path to your Phrasebook grammar here:
PBBASE = ~/Projekt/GF/examples/phrasebook/Phrasebook
PBLANGS = Eng Swe Ger Fre Spa Fin Tha Lav Rus Urd
# Ron Snd Spa Bul Cat Dut Hin Ita Pol Nor Dan Pes

# Put the path to your Traceur compiler here:
TRACEUR-COMPILER = ~/Applications/github/traceur-compiler/traceur

COPIED-FILES = Phrasebook.js utilities.js grasp.css traceur-runtime.js jquery-1.9.1.min.js
TRACEUR-FILES = GF.js grasp.js grasp-gui.js

.PHONY: compiled

compiled: $(TRACEUR-FILES:%=compiled/%) $(COPIED-FILES:%=compiled/%) compiled/grasp.html

$(TRACEUR-FILES:%=compiled/%): compiled/%: %
	$(TRACEUR-COMPILER) --unstarred-generators --out $@ $<

$(COPIED-FILES:%=compiled/%): compiled/%: %
	cp $< $@

compiled/grasp.html: grasp.html
	perl -pe 's|javascript;version=1.7|javascript|; s|<!--::||; s|::-->||' $< > $@

Phrasebook.js: $(PBBASE).gf $(PBLANGS:%=$(PBBASE)%.gf)
	$(GF-MAKE) js $^
