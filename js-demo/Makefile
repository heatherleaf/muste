
.PHONY: grammars

help:
	@echo "Try 'make grammars' if you want to update the grammars."

grammars: Manycats.js Mini.js Phrasebook.js

Manycats.js: Manycats.gf ManycatsEng.gf ManycatsSwe.gf
	gf -f js -make $^

Mini.js: Mini.gf MiniSwe.gf
	gf -f js -make $^

PBBASE = ~/Projekt/GF/examples/phrasebook/Phrasebook
PBLNG = Eng Fre Ger Swe

Phrasebook.js: $(PBBASE).gf $(PBLNG:%=$(PBBASE)%.gf)
	gf -f js -make $^
