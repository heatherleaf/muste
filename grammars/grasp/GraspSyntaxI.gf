incomplete concrete GraspSyntaxI of GraspSyntax = GraspLex ** 
  open Grammar, Syntax in {

lin

  -- This gives an error:
  -- UseCl t p cl = Syntax.mkS t p cl ;

  -- This also gives an error, provided "open (G=Grammar)":
  -- UseCl t p cl = G.UseCl t p cl ;

  UseCl t p cl = Grammar.UseCl t p cl ;
  PredVP np vp = Grammar.PredVP np vp ;
  DetCN det cn = Grammar.DetCN det cn ;
  ModCN ap cn = Grammar.AdjCN ap cn ;

  AdAP ada ap = Grammar.AdAP ada ap ;

  ConjS  co x y = Grammar.ConjS  co (Grammar.BaseS  x y) ;
  ConjAP co x y = Grammar.ConjAP co (Grammar.BaseAP x y) ;
  ConjNP co x y = Grammar.ConjNP co (Grammar.BaseNP x y) ;

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

  PrepNP prep np = Grammar.PrepNP prep np ;

  UseAdverb adv = lin Adv adv ;

  SlashPrep cl prep = Grammar.SlashPrep cl prep ;

  UsePN pn = Grammar.UsePN pn ;
  AdvNP np adv = Grammar.AdvNP np adv ;

  -- changed how to create VP

  SlashV np v = Grammar.SlashVP np (Grammar.SlashV2a (lin V2 v)) ;

  UseV v = Grammar.UseV (lin V v) ;
  UseVN v np = Grammar.ComplSlash (Grammar.SlashV2a (lin V2 v)) np ;
  UseVA v ap = Grammar.ComplVA (lin VA v) ap ;
  UseVNN v np1 np2 = Grammar.ComplSlash (Grammar.Slash3V3 (lin V3 v) np2) np1 ;
  UseVNA v np ap = Grammar.ComplSlash (Grammar.SlashV2A (lin V2A v) ap) np ;

  VerbVS v = v.v ;
  VerbVQ v = v.v ;
  VerbVV v = v.v ;

  ComplVS v s = Grammar.ComplVS v.vs s ;
  ComplVQ v q = Grammar.ComplVQ v.vq q ;
  ComplVV v vp = Grammar.ComplVV v.vv vp ;

  AdvVP vp adv = Grammar.AdvVP vp adv ;

}
