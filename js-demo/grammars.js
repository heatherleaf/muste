
mini_tree = "(decl (cl (np (sg_def) (cn (girl))) (vp (see) (np (sg_indef) (ap (small) (cn (boy)))))))";
manycats_tree = "(phr (utt (s (npp (np (many) (ap (big) (catt))) (pp (inn) (np (this) (house)))) (vp2 (hunt) (np (plind) (dog))))))";
phrasebook_tree = "(PSentence (SHaveNo (Children (IMale)) (SuchKind (Very (Boring)) (SuchKind (PropQuality (Cold)) (Apple)))))";

DEFAULT_GRAMMAR = 'ManycatsEng';

GRAMMARS = {
    'MiniSwe': Mini.concretes['MiniSwe'],
    'ManycatsEng': Manycats.concretes['ManycatsEng'],
    'ManycatsSwe': Manycats.concretes['ManycatsSwe'],
    'PhrasebookEng': Phrasebook.concretes['PhrasebookEng'],
    'PhrasebookFre': Phrasebook.concretes['PhrasebookFre'],
    'PhrasebookGer': Phrasebook.concretes['PhrasebookGer'],
    'PhrasebookSwe': Phrasebook.concretes['PhrasebookSwe']
};

TREES = {
    'MiniSwe': mini_tree,
    'ManycatsEng': manycats_tree,
    'ManycatsSwe': manycats_tree,
    'PhrasebookEng': phrasebook_tree,
    'PhrasebookFre': phrasebook_tree,
    'PhrasebookGer': phrasebook_tree,
    'PhrasebookSwe': phrasebook_tree
};
