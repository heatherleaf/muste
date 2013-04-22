
abstract Simple = {

flags startcat = S;

cat 
S; Cl; VP; NP;
Det; Noun; Adj; Verb;
Tense;

fun

-- rules

s : Tense -> Cl -> S;
q : Tense -> Cl -> S;
cl : NP -> VP -> Cl;
vp : Verb -> NP -> VP;
np : Det -> Noun -> NP;
ap : Adj -> Noun -> Noun;

-- lexicon

sg_indef, sg_def : Det;
pl_indef, pl_def : Det;

child, girl, boy : Noun;

see, kiss : Verb;

green, small : Adj;

pres, pret, perf : Tense;

}
