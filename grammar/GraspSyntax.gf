abstract GraspSyntax = GraspLex ** {

fun

  -- the "mini" resource of GF book, chapter 9

  UseCl   : Temp -> Pol -> Cl -> S ;
  PredVP  : NP -> VP -> Cl ;
  ComplV2 : V2 -> NP -> VP ;
  DetCN   : Det -> CN -> NP ;
  ModCN   : AP -> CN -> CN ;

  CompAP  : AP -> VP ;
  AdAP    : AdA -> AP -> AP ;

  ConjS   : Conj -> S  -> S  -> S ;
  ConjAP  : Conj -> AP -> AP -> AP ;
  ConjNP  : Conj -> NP -> NP -> NP ;

  UseV2   : V2 -> VP ;
  UseN    : N -> CN ;
  UseA    : A -> AP ;
  UsePron : Pron -> NP ;

  DetQuant : Quant -> Num -> Det ;

  Pos, Neg : Pol ;
  Pres, Past, Perf : Temp ;

  IndefArt, DefArt : Quant ;
  NumSg, NumPl : Num ;

  -- extension of the mini grammar

  UttS  : S -> Utt ;
  -- UttQS : QS -> Utt ;

  UseQCl : Temp -> Pol -> QCl -> QS ;

  QuestCl    : Cl -> QCl ;             -- does she walk
  QuestVP    : IP -> VP -> QCl ;       -- who walks
  QuestSlash : IP -> ClSlash -> QCl ;  -- who does she walk with
  QuestIAdv  : IAdv -> Cl -> QCl ;     -- why does she walk

  SubjS : S -> Subj -> S -> S ;     -- she walks because we run

  CompAdv : Adv -> VP ;         -- be here
  PrepNP  : Prep -> NP -> Adv ; -- in the house

  UseAdverb : Adverb -> Adv ; 

  ComplVS : VS -> S  -> VP ;  -- know that she walks
  ComplVQ : VQ -> QS -> VP ;  -- wonder who walks
  ComplVV : VV -> VP -> VP ;  -- want to walk

  SlashV2   : NP -> V2 -> ClSlash ;   -- she loves
  SlashPrep : Cl -> Prep -> ClSlash ; -- she walks with

  AdvVP : VP -> Adv -> VP ; -- walk in the city

  UsePN : PN -> NP ;        -- John
  AdvNP : NP -> Adv -> NP ; -- the man in the city

}
