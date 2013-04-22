
mini_tree = "(decl (cl (np (sg_def) (cn (girl))) (vp (see) (np (sg_indef) (cn (boy))))))";
manycats_tree = "(phr (utt (s (npp (np (many) (ap (big) (catt))) (pp (inn) (np (this) (house)))) (vp2 (hunt) (np (plind) (dog))))))";
phrasebook_tree = "(PSentence (SHaveNo (Children (IMale)) (SuchKind (Very (Boring)) (SuchKind (PropQuality (Cold)) (Apple)))))";

DEFAULT_GRAMMAR = 'MiniSwe';
// DEFAULT_GRAMMAR = 'ManycatsEng';

TREES = {
    "MiniSwe": mini_tree,
    "ManycatsEng": manycats_tree,
    "ManycatsSwe": manycats_tree,
    "PhrasebookEng": phrasebook_tree,
    "PhrasebookFre": phrasebook_tree,
    "PhrasebookGer": phrasebook_tree,
    "PhrasebookSwe": phrasebook_tree
};
