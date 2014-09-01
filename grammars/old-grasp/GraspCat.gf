abstract GraspCat = {

flags startcat = Utt ;

cat 
  -- the "mini" resource of GF book, chapter 9

  S ;     -- sentence
  Cl ;    -- clause
  NP ;    -- noun phrase
  VP ;    -- verb phrase
  AP ;    -- adjectival phrase
  CN ;    -- common noun
  Det ;   -- determiner
  N ;     -- noun
  A ;     -- adjective
  V ;     -- verb (one-place, intransitive)
  V2 ;    -- two-place verb (two-place, transitive or prepositional)
  AdA ;   -- ad-adjective
  Temp ;  -- temporal and aspectual features (incl. tense)
  Pol ;   -- polarity
  Conj ;  -- conjunction

  -- extension of the mini grammar

  Utt ;     -- utterance (sentence or question) e.g. "does she walk"
  QS ;      -- question (fixed tense)           e.g. "who doesn't walk"
  QCl ;     -- question clause (variable tense) e.g. "who walks"
  ClSlash ; -- clause missing noun phrase       e.g. "she walks with"
  Adv ;     -- adverb                           e.g. "here"
  Prep ;    -- preposition (and/or case)        e.g. "with"
  VS ;      -- sentence-complement verb         e.g. "know"
  VQ ;      -- question-complement verb         e.g. "wonder"
  VV ;      -- verb-phrase-complement verb      e.g. "want"
  IP ;      -- interrogative pronoun            e.g. "who"
  PN ;      -- proper name                      e.g. "John"
  Subj ;    -- subjunction                      e.g. "because"
  IAdv ;    -- interrogative adverb             e.g. "why"

}
