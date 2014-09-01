concrete GraspLexiconGer of GraspLexicon = GraspBaselexGer ** 
  open ParadigmsGer in {

lin

  -- some definitions taken from lib/src/german/DictGer.gf

  arrive_V = prefixV "an" (irregV "kommen" "kommt" "kam" "käme" "gekommen") ;
  look_V2 = mkV2 (irregV "betrachten" "betrachtet" "betrachtete" "betrachtete" "betrachtet") ;
  please_V2 = mkV2 (irregV "gefallen" "gefallt" "gefiel" "gefiele" "gefallen") ;
  believe_VS = mkVS (mkV "glauben") ;
  john_PN = mkPN "Johann" ;
  mary_PN = mkPN "Maria" ;

}
