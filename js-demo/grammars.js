
mini_tree = "(decl (cl (np (sg_def) (cn (girl))) (vp (see) (np (sg_indef) (ap (small) (cn (boy)))))))";
manycats_tree = "(phr (utt (s (npp (np (many) (ap (big) (catt))) (pp (inn) (np (this) (house)))) (vp2 (hunt) (np (plind) (dog))))))";
phrasebook_tree = "(PSentence (SHaveNo (Children (IMale)) (SuchKind (Very (Boring)) (SuchKind (PropQuality (Cold)) (Apple)))))";

DEFAULT_GRAMMAR = 'Manycats';

GRAMMARS = {
    'Mini': Mini,
    'Manycats': Manycats,
    'Phrasebook': Phrasebook
};

TREES = {
    'Mini': mini_tree,
    'Manycats': manycats_tree,
    'Phrasebook': phrasebook_tree
};
