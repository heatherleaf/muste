
abstract Manycats = {

cat Phr; Utt; S; NP; PP; N; P; D; A; VP; V1; V2;

flags startcat = Phr;

fun

phr : Utt -> Phr;
utt : S -> Utt;
s : NP -> VP -> S;

np : D -> N -> NP;
ap : A -> N -> N;
vp1 : V1 -> VP;
vp2 : V2 -> NP -> VP;
pp : P -> NP -> PP;
npp : NP -> PP -> NP;
vpp : VP -> PP -> VP;

i, you : NP;
catt, dog, house : N;
this, these, many, a, plind : D;
sleep : V1;
see, hunt : V2;
inn : P;
big, small : A;

}



