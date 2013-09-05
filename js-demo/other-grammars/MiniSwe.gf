
concrete MiniSwe of Mini = {

lincat 
  S = SS;
  Cl = {subj : NPType} ** VPType;
  VP = VPType;
  NP = NPType;
  PP = SS;
  Verb = SS;
  Det = {s : AdjMod => Gender => Str; a : Agreement}; 
  CN = {s: Agreement => Str; g : Gender; adj : AdjMod}; 
  Noun = {s: Agreement => Str; g : Gender}; 
  Prep = SS;
  Adj = {s : Agreement => Gender => Str};

oper 
  VPType : Type = {pred : VType; obj : NPType};
  NPType : Type = SS;
  VType : Type = SS;
  SS : Type = {s : Str};

param 
  Agreement = Agr Number Defness;
  Number = Sg | Pl;
  Defness = Def | Indef;
  Gender = Utr | Neutr;
  AdjMod = HasAdj | NoAdj;

lin

-- rules

decl c = {s = c.subj.s ++ c.pred.s ++ c.obj.s ++ "."};
que c = {s = c.pred.s ++ c.subj.s ++ c.obj.s ++ "?"};

cl np vp = {subj = np; pred = vp.pred; obj = vp.obj};
-- The following triggers a bug:
--   Internal error in GeneratePMCFG: convertTerm (CProj (LIdent "obj") CNil) ({subj = NP_0} ** VP_1)
-- cl np vp = {subj = np} ** vp;

vp v np = {pred = v; obj = np};

np d n = {s = d.s ! n.adj ! n.g ++ n.s ! d.a};

pp p np = {s = p.s ++ np.s};
pnp np pp = {s = np.s ++ pp.s};
pvp vp pp = {pred = vp.pred; obj = pnp vp.obj pp};

ap a n = {s = \\agr => 
            a.s ! agr ! n.g ++ n.s ! agr; 
          g = n.g; 
          adj = HasAdj};

cn n = {s = n.s; g = n.g; adj = NoAdj};

-- lexicon

sg_indef = {s = \\_ => table {Utr => "en"; 
                              Neutr => "ett"};
            a = Agr Sg Indef};

pl_indef = {s = \\_,_ => ""; 
            a = Agr Pl Indef};

sg_def = {s = table {HasAdj => table{Utr => "den"; Neutr => "det"};
                     NoAdj => \\_ => ""}; 
          a = Agr Sg Def};

pl_def = {s = table {HasAdj => \\_ => "de";
                     NoAdj => \\_ => ""}; 
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

behind = {s = "bakom"};
infront = {s = "framfor"};

big = {s = table {Agr Sg Indef => table {Utr => "stor"; Neutr => "stort"};
                  _ => \\_ => "stora"}};

small = {s = table {Agr Sg Indef => table {Utr => "liten"; Neutr => "litet"};
                    Agr Sg Def => \\_ => "lilla";
                    _ => \\_ => "små"}};

see = {s = "ser"};
kiss = {s = "kysser"};

}
