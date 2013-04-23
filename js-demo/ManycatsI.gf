--# -path=alltenses

incomplete concrete ManycatsI of Manycats = open Lang in {

flags startcat = Phr;

lincat 

Phr = Lang.Phr;
Utt = Lang.Utt;
S = Lang.Cl; 
NP = Lang.NP;
PP = Lang.Adv; 
N = Lang.CN;
P = Lang.Prep;
D = Lang.Det;
A = Lang.AP;
VP = Lang.VP;
V1 = Lang.V;
V2 = Lang.V2;

lin

phr u = PhrUtt u {s = ""} {s = ""};
utt s = UttS (UseCl (TTAnt TPres ASimul) PPos s);

s = PredVP;
np = DetCN;
ap = AdjCN;
vp1 = UseV;
vp2 v n = ComplSlash (SlashV2a v) n;
pp = PrepNP;
npp = AdvNP;
vpp = AdvVP;

i = UsePron i_Pron;
you = UsePron youSg_Pron;
catt = UseN cat_N;
dog = UseN dog_N;
house = UseN house_N;
this = DetQuant this_Quant NumSg;
these = DetQuant this_Quant NumPl;
many = many_Det;
a = DetQuant IndefArt NumSg;
plind = DetQuant IndefArt NumPl;
sleep = sleep_V;
run = run_V;
see = see_V2;
hunt = hunt_V2;
inn = in_Prep;
on = on_Prep;
under = under_Prep;
behind = behind_Prep;
big = PositA big_A;
small = PositA small_A;

}
