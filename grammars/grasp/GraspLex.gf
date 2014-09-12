abstract GraspLex = GraspCat, Lexicon [
  N, A, 

    man_N, woman_N, girl_N, boy_N, person_N,
    hair_N, hand_N, foot_N, head_N,
    shirt_N, hat_N, shoe_N,
    animal_N, cat_N, dog_N, horse_N, cow_N, fish_N, bird_N,
    house_N, car_N, airplaine_N, boat_N, bike_N,
    table_N, book_N, chair_N, 
    fruit_N, apple_N,
    tree_N, forest_N, stone_N, 
    water_N, wine_N, beer_N, milk_N,

    big_A, small_A, long_A, short_A, thick_A, thin_A, heavy_A,
    black_A, blue_A, green_A, red_A, white_A, yellow_A

], Structural [
  AdA, Adv, Conj, IP, Prep, VV, Subj, IAdv, Det, Quant, Pron,

    very_AdA, too_AdA, so_AdA,
    and_Conj, or_Conj,
    whoSg_IP,
    by8agent_Prep, in_Prep, possess_Prep, with_Prep,
    -- can_VV, must_VV, want_VV,
    although_Subj, because_Subj, when_Subj,
    when_IAdv, where_IAdv, why_IAdv,
    every_Det, this_Quant, that_Quant,

    -- youSg_Pron, youPl_Pron, 
    i_Pron, he_Pron, she_Pron, we_Pron, they_Pron

] ** {

cat Adverb ;

fun

  mary_PN, john_PN, gothenburg_PN, sweden_PN, london_PN, britain_PN, berlin_PN, germany_PN : PN ;

  here_Adverb, there_Adverb, somewhere_Adverb, everywhere_Adverb : Adverb ;

  copula : GraspV ;
  fly_V, run_V, sit_V, sleep_V, swim_V, walk_V : GraspV ;
  break_V, buy_V, drink_V, eat_V, hate_V, hear_V : GraspV ;
  hunt_V, like_V, listen_V, see_V, throw_V, watch_V : GraspV ;

  wonder_VQ, know_VQ : GraspVQ ;
  hope_VS, know_VS, say_VS : GraspVS ;
  want_VV : GraspVV ;

}

