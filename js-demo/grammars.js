
mini_tree = "(decl (cl (np (sg_def) (cn (girl))) (vp (see) (np (sg_indef) (ap (small) (cn (boy)))))))";
manycats_tree = "(phr (utt (s (npp (np (many) (ap (big) (catt))) (pp (inn) (np (this) (house)))) (vp2 (hunt) (np (plind) (dog))))))";
phrasebook_tree = "(PSentence (SHaveNo (Children (IMale)) (SuchKind (Very (Boring)) (SuchKind (PropQuality (Cold)) (Apple)))))";

bliss_tree = "(UttS (ThenPos (PredVP (somebody_NP) (ComplSlash (SlashV2a (steal_V2)) (DetCN (DQ (PossPron (i_Pron))) (UseN (wallet_N)))))))";


DEFAULT_GRAMMAR = 'Bliss';

GRAMMARS = {
    'Mini': Mini,
    'Manycats': Manycats,
    // 'Phrasebook': Phrasebook,
    'Bliss': Phrases
};

TREES = {
    'Mini': mini_tree,
    'Manycats': manycats_tree,
    // 'Phrasebook': phrasebook_tree,
    'Bliss': bliss_tree
};


IMG_DIR = 'bliss_h78_transp_png/';

function is_image(word) {
    return word.slice(-4) == '.png';
}
