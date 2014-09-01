incomplete concrete GraspSyntaxI of GraspSyntax = GraspLex ** 
  open Grammar, Syntax in {

lin

  -- This gives an error:
  -- UseCl t p cl = Syntax.mkS t p cl ;

  -- This also gives an error, provided "open (G=Grammar)":
  -- UseCl t p cl = G.UseCl t p cl ;

  UseCl t p cl = Grammar.UseCl t p cl ;
  PredVP np vp = Grammar.PredVP np vp ;
  ComplV2 v2 np = Grammar.ComplSlash (Grammar.SlashV2a v2) np ;
  DetCN det cn = Grammar.DetCN det cn ;
  ModCN ap cn = Grammar.AdjCN ap cn ;

  CompAP ap = Grammar.UseComp (Grammar.CompAP ap) ;
  AdAP ada ap = Grammar.AdAP ada ap ;

  ConjS  co x y = Grammar.ConjS  co (Grammar.BaseS  x y) ;
  ConjAP co x y = Grammar.ConjAP co (Grammar.BaseAP x y) ;
  ConjNP co x y = Grammar.ConjNP co (Grammar.BaseNP x y) ;

  UseV2 v = Grammar.UseV (lin V v) ;
  UseN n = Grammar.UseN n ;
  UseA a = Grammar.PositA a ;
  UsePron p = Grammar.UsePron p ;

  DetQuant q n = Grammar.DetQuant q n ;

  Pos = Grammar.PPos ;
  Neg = Grammar.PNeg ;

  Pres = Grammar.TTAnt Grammar.TPres Grammar.ASimul ;
  Perf = Grammar.TTAnt Grammar.TPres Grammar.AAnter ;
  Past = Grammar.TTAnt Grammar.TPast Grammar.ASimul ;

  IndefArt = Grammar.IndefArt ;
  DefArt = Grammar.DefArt ;
  NumSg = Grammar.NumSg ;
  NumPl = Grammar.NumPl ;

  -- more

  UttS s = Grammar.UttS s ;
  -- UttQS s = lin Utt {s = (Grammar.UttQS s).s ++ "?"} ;

  UseQCl t p cl = Grammar.UseQCl t p cl ;
  
  QuestCl cl = Grammar.QuestCl cl ;
  QuestVP ip vp = Grammar.QuestVP ip vp ;
  QuestSlash ip cls = Grammar.QuestSlash ip cls ;
  QuestIAdv iadv cl = Grammar.QuestIAdv iadv cl ;

  SubjS s1 subj s2 = Grammar.SSubjS s1 subj s2 ;

  CompAdv adv = Grammar.UseComp (Grammar.CompAdv adv) ;
  PrepNP prep np = Grammar.PrepNP prep np ;

  UseAdverb adv = lin Adv adv ;

  ComplVS v s = Grammar.ComplVS v s ;
  ComplVQ v q = Grammar.ComplVQ v q ;
  ComplVV v vp = Grammar.ComplVV v vp ;

  SlashV2 np v2 = Grammar.SlashVP np (Grammar.SlashV2a v2) ;
  SlashPrep cl prep = Grammar.SlashPrep cl prep ;

  AdvVP vp adv = Grammar.AdvVP vp adv ;

  UsePN pn = Grammar.UsePN pn ;
  AdvNP np adv = Grammar.AdvNP np adv ;

}
