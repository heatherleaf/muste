---
title: GRASP: Grammatical Sentence Processor
---

# GRASP: Grammatical Sentence Processor

(In Swedish: "Grammatisk Språkredigering")

The goal of this project is a tool that will simplify editing of grammatical text, a kind of predictive editor similar to the word prediction systems used in mobile phones. The main difference with current text input methods is that the user can edit anywhere in the text, not just add words at the end. The user just point at a word or a phrase, and the system suggests alternatives based on an underlying grammar. When the user selects an alternative, the system will automatically reformulate the sentence by changing inflection or word order, or adding or removing words, so that it will always be grammatically correct.

The underlying grammar formalism is GF, which has support for writing multlingual parallel grammars. This makes the GRASP editor a multilingual translator, provided that the underlying grammar supports several languages.

The theory behind GRASP is grammar- and language-independent, so the GRASP tool works for any GF grammar (even though some grammars are better suited than others). There is an online demonstration, purely written in Javascript here:

> [grasp.html](grasp.html)

The code is open-source and licensed under GPLv3, and is available at the Github project page:

> <http://github.com/heatherleaf/grasp>


<!-- ## Publications and presentations -->

<!-- Short paper and poster presented at SLTC'10, 3rd Swedish Language Technology Conference, October 2010, in Linköping: grasp-sltc.pdf, grasp-poster.pdf -->
<!-- Paper describing the underlying theory presented at Nodalida'11, 18th Nordic Conference of Computational Linguistics, May 2011, in Rīga, 2011: grasp-nodalida.pdf -->
<!-- Presentation at the first ISAAC Nordic Symposium, May 2011, in Gothenburg: ISAAC-talk-110524.pdf -->
<!-- Presentation at the LOCI II Workshop, June 2011, in London: LOCI-talk-110617.pdf -->
<!-- Local presentation here in Gothenburg: Gbg-talk-130903.pdf -->
