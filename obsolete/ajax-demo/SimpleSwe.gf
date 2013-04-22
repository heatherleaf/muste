
concrete SimpleSwe of Simple = {

lincat 

S = {s : Str};
Cl = {subj : NPType; pred : VPType};
VP = VPType;
NP = NPType;

Det = {s : Gender => Str; a : Agreement}; 
Noun = {s: Agreement => Str; g : Gender}; 
Adj = {s : Agreement => Gender => Str};
Verb = VPType;

Tense = STense;

oper 
VPType : Type = STense => {s1, s2 : Str};
NPType : Type = {s : Str};

param 
Agreement = Agr Number Defness;
Number = Sg | Pl;
Defness = Def | Indef;
Gender = Utr | Neutr;
STense = Pres | Pret | Perf;

lin

-- rules

s t c = 
  let pred = c.pred ! t
  in {s = c.subj.s ++ pred.s1 ++ pred.s2 ++ "."};

q t c = 
  let pred = c.pred ! t
  in {s = pred.s1 ++ c.subj.s ++ pred.s2 ++ "?"};

cl np vp = {subj = np; pred = vp};

vp v np = \\t => {s1 = (v ! t).s1; s2 = (v ! t).s2 ++ np.s};

np d n = {s = d.s ! n.g ++ n.s ! d.a};

ap a n = {s = \\agr => a.s ! agr ! n.g ++ n.s ! agr; g = n.g};

-- lexicon

sg_indef = {s = table {Utr => "en"; 
                       Neutr => "ett"};
            a = Agr Sg Indef};

pl_indef = {s = \\_ => "några"; 
            a = Agr Pl Indef};

sg_def = {s = \\_ => ""; 
          a = Agr Sg Def};

pl_def = {s = \\_ => ""; 
          a = Agr Pl Def};

child = {s = table {Agr _ Indef => "barn"; 
                    Agr Sg Def => "barnet";
                    Agr Pl Def => "barnen"};
         g = Neutr};

girl = {s = table {Agr Sg Indef => "flicka"; 
                   Agr Pl Indef => "flickor"; 
                   Agr Sg Def => "flickan"; 
                   Agr Pl Def => "flickorna"};
        g = Utr};

boy = {s = table {Agr Sg Indef => "pojke"; 
                  Agr Pl Indef => "pojkar"; 
                  Agr Sg Def => "pojken"; 
                  Agr Pl Def => "pojkarna"};
       g = Utr};

-- see, kiss : Verb;

-- green, small : Adj;

-- pres, pret, perf : Tense;

}
