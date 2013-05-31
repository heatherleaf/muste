--# -path=.:alltenses

concrete ConjBliss of Conjunction = CatBliss ** open Prelude, Coordination in {

--2 Categories

lincat 
  [S], [RS], [Adv], [NP], [AP], [IAdv], [CN] = ListX;

--2 Rules

lin

ConjS = conjunctSS;
ConjRS = conjunctSS;
ConjAP = conjunctSS;
ConjNP = conjunctSS;
-- ConjAdv = conjunctSS;
-- ConjIAdv = conjunctSS;
ConjCN = conjunctSS;

--2 List constructors

-- The list constructors are derived from the list notation and therefore
-- not given explicitly. But here are their type signatures:

  --  BaseC : C -> C   -> [C] ;  -- for C = S, AP, NP, Adv
  --  ConsC : C -> [C] -> [C] ;

BaseS = twoSS;
BaseRS = twoSS;
BaseAP = twoSS;
BaseNP = twoSS;
-- BaseAdv = twoSS;
BaseIAdv = twoSS;
BaseCN = twoSS;

ConsS = consrSS COMMA;
ConsRS = consrSS COMMA;
ConsAP = consrSS COMMA;
ConsNP = consrSS COMMA;
-- ConsAdv = consrSS COMMA;
ConsIAdv = consrSS COMMA;
ConsCN = consrSS COMMA;

  -- twoSS : (_,_ : SS) -> ListX;
  -- consrSS : Str -> SS -> ListX -> ListX;
  -- conjunctSS : Conjunction -> ListX -> SS;

oper COMMA : Str = "";

}

