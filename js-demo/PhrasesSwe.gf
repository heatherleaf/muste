--# -path=.:alltenses

concrete PhrasesSwe of Phrases = PhrasesLexSwe, ConjunctionSwe, PhraseSwe ** open (G=GrammarSwe) in {

lin

--NOUNS
	UsePron = G.UsePron ; 
	UseN = G.UseN ;
	UsePN = G.UsePN ;

	MassNP = G.MassNP ;
	PossPron = G.PossPron ;
	AdjCN = G.AdjCN ;

	IndefArt = G.IndefArt ;
	DefArt = G.DefArt ;
	DetCN = G.DetCN ;

	NumSg = G.NumSg ;
	NumPl = G.NumPl ;

	DQ q = G.DetQuant q NumSg ;		-- DetQuant, takes here only determiner as argument and adds the Num manually. Works only for Sg so far. 
	AddArtIndef n = DetCN (DQ IndefArt) n ;
	AddArtDef n = DetCN (DQ DefArt) n ;


--VERBS
	UseV = G.UseV ;
	UseCopula = G.UseCopula ;

	ComplVV = G.ComplVV ;
	SlashV2a = G.SlashV2a ;
	ComplSlash = G.ComplSlash ;

	CompAP = G.CompAP ;
	CompNP = G.CompNP ;
	UseComp = G.UseComp ;

	AdvVP = G.AdvVP ;

--ADJECTIVE
	PosAdj a = G.PositA a.adj ;
	CompAdj a = G.UseComparA a.adj ;
	UseAsAdv a = a.adv ;
	PrepNP = G.PrepNP ;

--CLAUSES
	PredVP = G.PredVP ;

	NowPos cl = G.UseCl (G.TTAnt G.TPres G.ASimul) G.PPos cl ;
	NowNeg cl = G.UseCl (G.TTAnt G.TPres G.ASimul) G.PNeg cl ;
	ThenPos cl = G.UseCl (G.TTAnt G.TPast G.ASimul) G.PPos cl ;
	ThenNeg cl = G.UseCl (G.TTAnt G.TPast G.ASimul) G.PNeg cl ;
	LaterPos cl = G.UseCl (G.TTAnt G.TFut G.ASimul) G.PPos cl ;
	LaterNeg cl = G.UseCl (G.TTAnt G.TFut G.ASimul) G.PNeg cl ;

--QUESTIONS
	QuestCl = G.QuestCl ;
	QuestVP = G.QuestVP ;
	QuestIComp = G.QuestIComp ;
	QuestIAdv = G.QuestIAdv ;
	CompIP = G.CompIP ;

}
