concrete GraspSwe of Grasp = GraspSyntaxSwe
  ** open ParadigmsSwe, MorphoSwe in {

lincat Start = Utt ;

lin
  StartUtt u = lin Utt u ;

  default_PN = mkPN "[namn]" ;
  default_N = mkN "[substantiv]" "[substantiv]" ;
  default_A = mkA "[adjektiv]" ;
  default_V2 = mkV2 "[verb]a" ;
  default_Adv = mkAdv "[adverbial]" ;
  default_NP = mkNP "[någonting]" "[någonting]" "[någonting]s" "[någonting]s" "[ting]s" Utr Sg P3 ;

}
