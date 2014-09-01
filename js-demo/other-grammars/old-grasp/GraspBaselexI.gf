incomplete concrete GraspBaselexI of GraspBaselex = Cat,
  Lexicon [man_N, woman_N, girl_N, boy_N, house_N, tree_N]
  ** open Lexicon, Structural, Grammar in {

lin

  -- man_N = Lexicon.man_N ;
  -- woman_N = Lexicon.woman_N ;
  -- house_N = Lexicon.house_N ;
  -- tree_N = Lexicon.tree_N ;
  big_A = Lexicon.big_A ;
  small_A = Lexicon.small_A ;
  green_A = Lexicon.green_A ;
  walk_V = Lexicon.walk_V ;
  sleep_V = Lexicon.sleep_V ;
  love_V2 = Lexicon.love_V2 ;
  know_VS = Lexicon.know_VS ;
  wonder_VQ = Lexicon.wonder_VQ ;

  a_Det = (Grammar.DetQuant Grammar.IndefArt Grammar.NumSg) ;
  every_Det = Structural.every_Det ;
  the_Det = (Grammar.DetQuant Grammar.DefArt Grammar.NumSg) ;
        
  this_Det = (Grammar.DetQuant Structural.this_Quant Grammar.NumSg) ;
  these_Det = (Grammar.DetQuant Structural.this_Quant Grammar.NumPl) ;
  that_Det = (Grammar.DetQuant Structural.that_Quant Grammar.NumSg) ;
  those_Det = (Grammar.DetQuant Structural.that_Quant Grammar.NumPl) ;

  i_NP = (Grammar.UsePron Structural.i_Pron) ;
  youSg_NP = (Grammar.UsePron Structural.youSg_Pron) ;
  he_NP = (Grammar.UsePron Structural.he_Pron) ;
  she_NP = (Grammar.UsePron Structural.she_Pron) ;
  we_NP = (Grammar.UsePron Structural.we_Pron) ;
  youPl_NP = (Grammar.UsePron Structural.youPl_Pron) ;
  they_NP = (Grammar.UsePron Structural.they_Pron) ;

  very_AdA = Structural.very_AdA ;

  and_Conj = Structural.and_Conj ;
  or_Conj  = Structural.or_Conj ;

  who_IP  = Structural.whoSg_IP ;
  here_Adv = Structural.here_Adv ;
  by_Prep = Structural.by8agent_Prep ;
  in_Prep = Structural.in_Prep ;
  of_Prep = Structural.possess_Prep ;
  with_Prep = Structural.with_Prep ;

  can_VV  = Structural.can_VV ;
  must_VV = Structural.must_VV ;
  want_VV = Structural.want_VV ;

  although_Subj = Structural.although_Subj ;
  because_Subj = Structural.because_Subj ;
  when_Subj = Structural.when_Subj ;

  when_IAdv = Structural.when_IAdv ;
  where_IAdv = Structural.where_IAdv ;
  why_IAdv = Structural.why_IAdv ;

}
