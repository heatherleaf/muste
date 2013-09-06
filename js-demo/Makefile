
GF-MAKE = gf -make -optimize-pgf -f 

PBBASE = ~/Projekt/GF/examples/phrasebook/Phrasebook
PBLANGS = Eng Swe Ger Fre Spa Fin Tha Lav Rus Urd
# Ron Snd Spa Bul Cat Dut Hin Ita Pol Nor Dan Pes

Phrasebook.js: $(PBBASE).gf $(PBLANGS:%=$(PBBASE)%.gf)
	$(GF-MAKE) js $^
