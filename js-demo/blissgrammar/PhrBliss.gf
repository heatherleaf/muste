--# -path=.:alltenses

concrete PhrBliss of Phr = CatBliss ** open Prelude in {

-- When a phrase is built from an utterance it can be prefixed
-- with a phrasal conjunction (such as "but", "therefore")
-- and suffixing with a vocative (typically a noun phrase).

lin

-- PhrUtt pconj utt voc = ss (pconj.s ++ utt.s ++ voc.s);

-- Utterances are formed from sentences, questions, and imperatives.

    UttS s = s;
    UttQS qs = qs;
    UttImpSg pol imp = ss (pol.s ++ imp.s);

{-
    UttImpPl pol imp = ss (pol.s ++ imp.s);
    UttImpPol pol imp = ss (pol.s ++ imp.s);

-- There are also 'one-word utterances'. A typical use of them is
-- as answers to questions.
-- *Note*. This list is incomplete. More categories could be covered.
-- Moreover, in many languages e.g. noun phrases in different cases
-- can be used.

    UttIP ip = ip;
    UttIAdv iadv = iadv;
    UttNP np = np;
    UttAdv adv = adv;
    UttVP vp = vp;
    UttCN cn = cn;
    UttCard card = card; 
    UttAP ap = ap;
    UttInterj int = int;

-- The phrasal conjunction is optional. A sentence conjunction
-- can also be used to prefix an utterance.

    NoPConj = ss "";
    PConjConj conj = conj;

-- The vocative is optional. Any noun phrase can be made into vocative,
-- which may be overgenerating (e.g. "I").

    NoVoc = ss "";
    VocNP np = np;
-}

}
