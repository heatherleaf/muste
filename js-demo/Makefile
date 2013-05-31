
.PHONY: grammars sync-demo

help:
	@echo "Try 'make grammars' if you want to update the grammars."
	@echo "Or 'make sync-demo' if you want to sync to the demo server."


DEMOHOST = gf:Sites/grasp/

sync-demo:
	rsync -v -a --delete --exclude '.*' . $(DEMOHOST)

grammars: Manycats.js Mini.js Phrasebook.js Phrases.js

Manycats.js: Manycats.gf ManycatsEng.gf ManycatsSwe.gf
	gf -f js -make $^

Mini.js: Mini.gf MiniSwe.gf
	gf -f js -make $^

Phrases.js: Phrases.gf PhrasesSwe.gf PhrasesBliss.gf
	gf -f js -make $^

PBBASE = ~/Projekt/GF/examples/phrasebook/Phrasebook
PBLNG = Eng Fre Ger Swe

Phrasebook.js: $(PBBASE).gf $(PBLNG:%=$(PBBASE)%.gf)
	gf -f js -make $^
