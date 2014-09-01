
BASE = Grasp
LANG = Eng Swe Ger

GF-MAKE = gf --make --optimize-pgf -f 

$(BASE).js: $(BASE).gf $(LANG:%=$(BASE)%.gf)
		$(GF-MAKE) js $^ 

$(BASE).txt: $(BASE).gf $(LANG:%=$(BASE)%.gf)
		$(GF-MAKE) pgf_pretty $^ 
