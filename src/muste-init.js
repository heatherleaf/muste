///<reference path="GF.ts"/>
///<reference path="generated/grammar.ts"/>
var Grammar = Grasp;
var Languages = ["GraspSwe", "GraspEng", "GraspGer"];
var StartCat = 'Start';
var MapWordsToHTML = {};
var Metadata = {};
// MapWordsToHTML['GraspZbl'] = map_words_to_images;
// Metadata['GraspZbl'] = BlissMetadata;
var DefaultTree1 = parseGFTree("(StartUtt (UttS (UseCl (Pres) (Neg) (PredVP (UsePron (she_Pron)) " +
    "(UseVN (break_V) (DetCN (DetQuant (DefArt) (NumPl)) " +
    "(ModCN (UseA (yellow_A)) (UseN (stone_N)))))))))");
var DefaultTree2 = parseGFTree("(StartUtt (UttS (UseCl (Perf) (Pos) (PredVP (UsePN (mary_PN)) " +
    "(UseVN (eat_V) (AdvNP (DetCN (DetQuant (IndefArt) (NumPl)) " +
    "(UseN (fish_N))) (UseAdverb (here_Adverb))))))))");
