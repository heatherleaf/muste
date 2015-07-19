concrete GraspGer of Grasp = GraspSyntaxGer
  ** open ParadigmsGer, (M=MorphoGer), (S=NounGer) in {

lincat Start = Utt ;

lin
  StartUtt u = lin Utt u ;

  default_PN = mkPN "[Nahme]" ;
  default_N = mkN "[Ding]" ;
  default_A = regA "[adjektiv]" ;
  default_V = lin GraspV (mkV3 (regV "[verb]en")) ;
  default_Adv = mkAdv "[adverbial]" ;
  default_NP = S.UsePron (M.mkPronPers "[irgendwas]" "[irgendwas]" "[irgendwas]" "[irgendwas]" "[irgendwas]"  M.Neutr M.Sg M.P3) ;

}

