abstract Grasp = GraspSyntax ** {

flags startcat = Start ;

cat Start ;

fun 
  StartUtt : Utt -> Start ;

  default_PN : PN ;
  default_N : N ;
  default_A : A ;
  default_V2 : V2 ;
  default_Adv : Adv ;
  default_NP : NP ;

}

