
abstract Mini = {

cat 
  S; Cl; VP; NP; CN; PP; 
  Det; Noun; Prep; Adj; Verb;

fun

-- rules

decl : Cl -> S;
que : Cl -> S;
cl : NP -> VP -> Cl;
vp : Verb -> NP -> VP;
np : Det -> CN -> NP;
pp : Prep -> NP -> PP;
pnp : NP -> PP -> NP;
pvp : VP -> PP -> VP;
ap : Adj -> CN -> CN;
cn : Noun -> CN;

-- lexicon

sg_indef, sg_def : Det;
pl_indef, pl_def : Det;

child, girl, boy : Noun;

behind, infront : Prep;

big, small : Adj;

see, kiss : Verb;

}
