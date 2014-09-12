abstract GraspSyntax = GraspLex ** {

fun

  -- the "mini" resource of GF book, chapter 9

  UseCl   : Temp -> Pol -> Cl -> S ;
  PredVP  : NP -> VP -> Cl ;
  DetCN   : Det -> CN -> NP ;
  ModCN   : AP -> CN -> CN ;

  AdAP    : AdA -> AP -> AP ;

  ConjS   : Conj -> S  -> S  -> S ;
  ConjAP  : Conj -> AP -> AP -> AP ;
  ConjNP  : Conj -> NP -> NP -> NP ;

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

  PrepNP  : Prep -> NP -> Adv ; -- in the house

  UseAdverb : Adverb -> Adv ; 

  SlashPrep : Cl -> Prep -> ClSlash ; -- she walks with

  UsePN : PN -> NP ;        -- John
  AdvNP : NP -> Adv -> NP ; -- the man in the city

  -- changed how to create VP

  SlashV : NP -> GraspV -> ClSlash ;   -- she loves

  UseV   : GraspV -> VP ;
  UseVN  : GraspV -> NP -> VP ;
  UseVA  : GraspV -> AP -> VP ;
  UseVNN : GraspV -> NP -> NP -> VP ;
  UseVNA : GraspV -> NP -> AP -> VP ;

  VerbVS  : GraspVS -> GraspV ;
  VerbVQ  : GraspVQ -> GraspV ;
  VerbVV  : GraspVV -> GraspV ;

  ComplVS : GraspVS -> S  -> VP ;  -- know that she walks
  ComplVQ : GraspVQ -> QS -> VP ;  -- wonder who walks
  ComplVV : GraspVV -> VP -> VP ;  -- want to walk

  AdvVP : VP -> Adv -> VP ; -- walk in the city

}
