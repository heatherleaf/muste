--# -path=.:alltenses

abstract Phr = Cat ** {

fun
    UttS      : S   -> Utt ;                -- John walks
    UttQS     : QS  -> Utt ;                -- is it good
    UttImpSg  : Pol -> Imp -> Utt;          -- (don't) love yourself

}