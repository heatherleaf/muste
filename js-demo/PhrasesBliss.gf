--# -path=.:alltenses

concrete PhrasesBliss of Phrases = PhrasesLexBliss, ConjBliss, PhrBliss ** {

lin

--NOUNS
	UsePron p = p ;
	UseN n = n ;
	UsePN pn = pn ;

	MassNP np = np ;
	PossPron p = p ;
	AdjCN ap cn = {s=ap.s ++ cn.s} ;

	IndefArt = {s = "12321"} ;
	DefArt = {s = "12321"} ;
	DetCN art cn = {s = art.s ++ cn.s} ;

	DQ q = q ; 				-- DetQuant, takes here only the determiner as argument
	AddArtIndef n = n ;
	AddArtDef n = n ;

--VERBS
	UseV v = v ;

	ComplVV v vp = {s = v.s ++ vp.s} ; 
	SlashV2a v = v ;
	ComplSlash vp np = {s = vp.s ++ np.s} ;

	CompAP ap = ap ;
	CompNP np = np ;
	UseComp c = c ;

	AdvVP vp adv = {s = vp.s ++ adv.s} ;	

--ADJECTIVES and ADVERBS
	PosAdj adj = adj ;
	CompAdj adj = {s = "15654" ++ adj.s} ; --symbol for more plus adjective
	UseAsAdv adv = adv ;
	PrepNP p np = {s = p.s ++ np.s} ;

--CLAUSES
	PredVP np vp = {s = np.s ++ vp.s} ;
	NowPos cl = cl ;
	NowNeg cl = {s = "/" ++ cl.s} ;
	ThenPos cl = {s = "(" ++ cl.s} ;
	ThenNeg cl = {s = "/" ++ "(" ++ cl.s} ;
	LaterPos cl = {s = ")" ++ cl.s} ;
	LaterNeg cl = {s = "/" ++ ")" ++ cl.s} ;

--QUESTIONS
-- A clause preceded by a question mark, no reversed order
	QuestCl cl = {s = "?" ++ cl.s} ; 
	QuestVP ip vp = {s = "?" ++ ip.s ++ vp.s} ;
	QuestIComp ic np = {s = "?" ++ ic.s ++ np.s} ;
	QuestIAdv ia cl = {s = "?" ++ ia.s ++ cl.s} ; 
	CompIP ip = {s = "?" ++ ip.s} ;

}


