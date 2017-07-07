concrete GraspSwe of Grasp = GraspSyntaxSwe
  ** open ParadigmsSwe, MorphoSwe in {

lincat Start = Utt ;

lin
  StartUtt u = lin Utt u ;

  default_PN = mkPN "[namn]" ;
  default_N = mkN "[sak]" "[saken]" "[saker]" "[sakerna]" ;
  default_A = mkA "[adjektiv]" ;
  default_V = lin GraspV (mkV3 "[verb]a") ;
  default_Adv = mkAdv "[adverbial]" ;
  -- default_NP = mkNP "[någonting]" "[någonting]" "[någonting]s" "[någonting]s" "[någonting]s" Utr Sg P3 ;
  default_NP = regNP "[någonting]" "[någonting]s" Utr Sg ;

}
