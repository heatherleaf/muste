concrete GraspEng of Grasp = GraspSyntaxEng
  ** open ParadigmsEng, ResEng in {

lincat Start = Utt ;

lin
  StartUtt u = lin Utt u ;

  default_PN = regGenPN "[name]" nonhuman ;
  default_N = mkN "[noun]" ;
  default_A = mkA "[adjective]" ;
  default_V2 = mkV2 "[verb]" ;
  default_Adv = mkAdv "[adverbial]" ;
  default_NP = mkNP "[something]" "[something]" "[something]'s" Sg P3 nonhuman ;

}
