concrete GraspEng of Grasp = GraspSyntaxEng
  ** open ParadigmsEng, ResEng in {

lincat Start = Utt ;

lin
  StartUtt u = lin Utt u ;

  default_PN = regGenPN "[name]" nonhuman ;
  default_N = mkN "[thing]" ;
  default_A = mkA "[adjective]" ;
  default_V = lin GraspV (mkV3 "[verb]") ;
  default_Adv = mkAdv "[adverbial]" ;
  default_NP = mkNP "[something]" "[something]" "[something]'s" Sg P3 nonhuman ;

}
