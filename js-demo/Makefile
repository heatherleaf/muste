
GF-MAKE = gf -make -optimize-pgf -f

PBBASE = ~/Projekt/GF/examples/phrasebook/Phrasebook
PBLANGS = Eng Swe Lav Bul Tha Fre

Phrasebook.js: $(PBBASE).gf $(PBLANGS:%=$(PBBASE)%.gf)
	$(GF-MAKE) js $^
