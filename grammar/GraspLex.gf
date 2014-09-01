abstract GraspLex = Cat, Lexicon [
  N, A, V2, VQ, VS, 

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
    black_A, blue_A, green_A, red_A, white_A, yellow_A,

    break_V2, buy_V2, drink_V2, eat_V2, hate_V2, hear_V2, 
    hunt_V2, like_V2, listen_V2, see_V2, throw_V2, watch_V2,

    wonder_VQ, know_VQ,
    hope_VS, know_VS, say_VS

], Structural [
  AdA, Adv, Conj, IP, Prep, VV, Subj, IAdv, Det, Quant, Pron,

    very_AdA, too_AdA, so_AdA,
    and_Conj, or_Conj,
    whoSg_IP,
    by8agent_Prep, in_Prep, possess_Prep, with_Prep,
    can_VV, must_VV, want_VV,
    although_Subj, because_Subj, when_Subj,
    when_IAdv, where_IAdv, why_IAdv,
    every_Det, this_Quant, that_Quant,
    i_Pron, youSg_Pron, he_Pron, she_Pron, we_Pron, youPl_Pron, they_Pron

] ** {

cat Adverb ;

fun

  here_Adverb, there_Adverb, somewhere_Adverb, everywhere_Adverb : Adverb ;

  fly_V2, run_V2, sit_V2, sleep_V2, swim_V2, walk_V2 : V2 ; -- stand_V2, 

  mary_PN, john_PN, gothenburg_PN, sweden_PN, london_PN, britain_PN, berlin_PN, germany_PN : PN ;

}

