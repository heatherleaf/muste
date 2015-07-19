concrete GraspLexSwe of GraspLex = GraspCatSwe, LexiconSwe [
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

], StructuralSwe [
  AdA, Adv, Conj, IP, Prep, VV, Subj, IAdv, Det, Quant, Pron,

    very_AdA, too_AdA, so_AdA,
    and_Conj, or_Conj,
    whoSg_IP, vem,
    by8agent_Prep, in_Prep, possess_Prep, with_Prep,
    -- can_VV, must_VV, want_VV,
    although_Subj, because_Subj, when_Subj,
    when_IAdv, where_IAdv, why_IAdv,
    every_Det, this_Quant, that_Quant,

    -- youSg_Pron, youPl_Pron, 
    i_Pron, he_Pron, she_Pron, we_Pron, they_Pron

] ** open (L=LexiconSwe), (P=ParadigmsSwe), (S=StructuralSwe), (M=MorphoSwe) in {

lincat Adverb = Adv ;

lin

  mary_PN = P.mkPN "Maria" ;
  john_PN = P.mkPN "Johan" ;
  gothenburg_PN = P.mkPN "Göteborg" ;
  sweden_PN = P.mkPN "Sverige" ;
  london_PN = P.mkPN "London" ;
  britain_PN = P.mkPN "Storbritannien" ;
  berlin_PN = P.mkPN "Berlin" ;
  germany_PN = P.mkPN "Tyskland" ;

  here_Adverb = here_Adv ;
  there_Adverb = there_Adv ;
  somewhere_Adverb = somewhere_Adv ;
  everywhere_Adverb = everywhere_Adv ;

  copula = verbV1 (lin V M.verbBe) ;

  fly_V = verbV1 L.fly_V ;
  run_V = verbV1 L.run_V ;
  sit_V = verbV1 L.sit_V ;
  sleep_V = verbV1 L.sleep_V ;
  swim_V = verbV1 L.swim_V ;
  walk_V = verbV1 L.walk_V ;

  break_V = verbV2 L.break_V2 ;
  buy_V = verbV2 L.buy_V2 ;
  drink_V = verbV2 L.drink_V2 ;
  eat_V = verbV2 L.eat_V2 ;
  hate_V = verbV2 L.hate_V2 ;
  hear_V = verbV2 L.hear_V2 ;
  hunt_V = verbV2 L.hunt_V2 ;
  like_V = verbV2 L.like_V2 ;
  listen_V = verbV2 L.listen_V2 ;
  see_V = verbV2 L.see_V2 ;
  throw_V = verbV2 L.throw_V2 ;
  watch_V = verbV2 L.watch_V2 ;

  wonder_VQ = {v = verbVQ L.wonder_VQ; vq = L.wonder_VQ} ;
  know_VQ = {v = verbVQ L.know_VQ; vq = L.know_VQ} ;

  hope_VS = {v = verbVS L.hope_VS; vs = L.hope_VS} ;
  know_VS = {v = verbVS L.know_VS; vs = L.know_VS} ;
  say_VS = {v = verbVS L.say_VS; vs = L.say_VS} ;

  want_VV = {v = verbVV S.want_VV; vv = S.want_VV} ;

oper 

  verbV1 : V -> GraspV ;
  verbV2 : V2 -> GraspV ;
  verbVQ : VQ -> GraspV ;
  verbVS : VS -> GraspV ;
  verbVV : VV -> GraspV ;

  verbV1 v = lin GraspV (P.dirdirV3 v) ;
  verbV2 v = lin GraspV (P.dirV3 (lin V v) (lin Prep v.c2)) ;
  verbVQ v = lin GraspV (P.dirdirV3 (lin V v)) ;
  verbVS v = lin GraspV (P.dirdirV3 (lin V v)) ;
  verbVV v = lin GraspV (P.dirdirV3 (lin V v)) ;

}


