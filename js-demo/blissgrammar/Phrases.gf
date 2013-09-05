--# -path=.:alltenses

abstract Phrases = PhrasesLex, Conjunction, Phr ** {

--Either state startcat or test with cat flag
flags startcat = Utt ;

fun

--NOUNS
	UsePron : Pron -> NP ;		-- han
	UseN : N -> CN ;		-- pojke
	UsePN : PN -> NP ; 		-- Sara

	MassNP : CN -> NP ;		-- (öl)
	PossPron : Pron -> Quant ;	-- mitt hus
	AdjCN : AP -> CN -> CN ;	-- stort hus

	IndefArt : Quant ;		-- en/ett
	DefArt : Quant ;		-- den/det
	DetCN : Det -> CN -> NP ;	-- någon pojke

	NumSg : Num ;			
	NumPl : Num ;

	DQ : Quant -> Det ;		-- DetQuant where Num isn't an argument
	AddArtIndef : CN -> NP ;	-- Transforms a single n in Bliss to a det + n in Swedish
	AddArtDef : CN -> NP ;		-- Transforms a single n in Bliss to a n + definite article in Swedish

	
--VERBS
	UseV : V -> VP ;		-- sover
	UseCopula : VP ;		-- är

	ComplVV : VV -> VP -> VP ;	-- vill sova
	SlashV2a : V2 -> VPSlash ;	-- älska (det) 
	ComplSlash : VPSlash -> NP -> VP ;	-- älska det

	CompAP : AP -> Comp ;		-- vara (liten) 
	CompNP : NP -> Comp ;		-- vara Sara, vara flick
	UseComp : Comp -> VP ;		-- vara liten --works, but do I need it?

	AdvVP : VP -> Adv -> VP ;	-- sova här

--ADJECTIVES and ADVERBS
	PosAdj : AdjAdv -> AP ;
	CompAdj : AdjAdv -> AP ;
	UseAsAdv : AdjAdv -> Adv ;
	PrepNP : Prep -> NP -> Adv ;

--CLAUSES
	PredVP : NP -> VP -> Cl ;	-- Sara springer
	NowPos, ThenPos, LaterPos, NowNeg, ThenNeg, LaterNeg : Cl -> S ;

--QUESTIONS
	QuestCl : Cl -> QCl ;			-- springer Sara?
	QuestVP : IP -> VP -> QCl ;		-- vem springer?
	QuestIComp : IComp -> NP -> QCl ;	-- var är Sara?
	QuestIAdv : IAdv -> Cl -> QCl ;		-- varför springer Sara?
	CompIP    : IP   -> IComp ;		-- vem (är det)

}
