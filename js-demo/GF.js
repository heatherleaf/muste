
/* 
   GF.js, by Peter Ljunglöf
   This file must be loaded BEFORE the GF grammar is loaded!
*/


function GFGrammar(abstract, concretes) {
    this.abstract = abstract;
    this.concretes = concretes;
    for (var cnc in concretes) {
        this.concretes[cnc].abstract = abstract;
    }
}

function GFAbstract(startcat, types) {
    this.startcat = startcat;
    // this.types = {fname: new Type([cat, ...], cat), ...}
    this.types = types;
}

function GFConcrete(flags, productions, functions, sequences, categories, nr_cats) {
    this.abstract = undefined;
    // this.flags = {...}
    this.flags = flags;
    // this.productions = {cat: [new Apply(fun, [new PArg(cat), ...]), new Coerce(cat), ...], ...}
    this.productions = {};
    for (var i in productions) 
        this.productions[mkCat(i)] = productions[i];
    // this.functions = {fun: new CncFun(absfun, [seq,...]), ...}
    this.functions = {};
    for (var i = 0; i < functions.length; i++) 
        this.functions[mkFun(i)] = functions[i];
    // this.sequences = {seq: [new SymLit(arg,param), new SymCat(arg,param), new SymKS("word"), ...], ...}
    this.sequences = {};
    for (var i = 0; i < sequences.length; i++) 
        this.sequences[mkSeq(i)] = sequences[i];
    // this.categories = {abscat: [cat,...], ...}
    // this.inversecats = {cat: abscat, ...}
    this.categories = {};
    this.inversecats = {};
    for (var abscat in categories) {
        this.categories[abscat] = [];
        for (var i = categories[abscat].s; i <= categories[abscat].e; i++) {
            this.categories[abscat].push(mkCat(i));
            this.inversecats[mkCat(i)] = abscat;
        }
    }
    // this.nr_cats = (integer)
    this.nr_cats = nr_cats;

    // this.coercions = {cat: [cat, ...], ...}
    // this.lincats = {cat: arity(integer)}
    // this.linfuns = {absfun: {[cat,...]: [{fun:fun, cat:cat, seqs:[seq,...]}, ...], ...} , ...}
    this.coercions = {};
    this.lincats = {};
    this.linfuns = {};
    for (var cat in this.productions) {
        setdefault(this.coercions, cat, []).push(cat);
        var prods = this.productions[cat];
        for (var i = 0; i < prods.length; i++) {
            var prod = prods[i];
            if (prod instanceof Coerce) {
                setdefault(this.coercions, prod.cat, []).push(cat);
            } else {
                var cncfun = this.functions[prod.fun];
                var lf = setdefault(this.linfuns, cncfun.absfun, {});
                var children = [];
                for (var j = 0; j < prod.children.length; j++) 
                    children.push(prod.children[j].parg);
                setdefault(lf, children, []).push({fun:prod.fun, cat:cat, seqs:cncfun.seqs});
                var arity = cncfun.seqs.length;
                setdefault(this.lincats, cat, arity);
                if (this.lincats[cat] != arity) alert("Mismatching linfun arities for cat: " + cat);
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////
// Type checking

/** GFAbstract.typecheck(tree):
    Throws a TypeError if the tree is not type correct.
    If the tree lacks type information, the types are output to the console.
    @param tree: a GFTree object
**/
GFAbstract.prototype.typecheck = function(tree, ntype) {
    var ftype = this.types[tree.node];
    if (!ftype) 
        throw(new TypeError("Function not found: " + tree.node));
    if (ntype && ntype != ftype.abscat) 
        throw(new TypeError("Function type mismatch: " + tree.node + ":" + ntype + 
                            " (should be " + ftype.abscat + ")"));
    if (tree.type && tree.type != ftype.abscat) 
        throw(new TypeError("Function type mismatch: " + tree.node + ":" + tree.type + 
                            " (should be " + ftype.abscat + ")"));
    if (!tree.type) 
        console.log("Missing type of function " + tree.node + " : " + ftype.abscat);
    if (ftype.children.length != tree.children.length) 
        throw(new TypeError("Children mismatch: " + tree.node + " has " + tree.children.length +
                            " children (should be " + ftype.children.length + ")"));
    for (var i = 0; i < tree.children.length; i++) 
        this.typecheck(tree.children[i], ftype.children[i]);
}

//////////////////////////////////////////////////////////////////////
// GF linearisations

var NODELEAF = ":"

/** GFGrammar.linearise(tree):
    @param language: a String denoting which concrete syntax to use
    @param tree: a GFTree object
    @return: an Array of {word:String, node:String} 
**/
GFGrammar.prototype.linearise = function(language, tree) {
    return this.concretes[language].linearise(tree);
}

/** GFConcrete.linearise(tree):
    @param tree: a GFTree instance
    @return: an Array of {word:String, node:String} 
**/
GFConcrete.prototype.linearise = function (tree) {
    var results = _linearise(this, tree, "");
    var lin = results[0].lin[0];
    lin.forEach(function(w){w.node += NODELEAF});
    return lin;
}

function _linearise(concrete, tree, node) {
    var results = [];
    var absfun = tree.node;
    var linfuns = concrete.linfuns[absfun];
    var all_dtrcatlins = tree.children.map(function(dtr,k){
        return _linearise(concrete, dtr, node + k);
    });
    var all_dtrcatlins_product = productlist(all_dtrcatlins);
    foreach(all_dtrcatlins_product, function(dtrcatlins) {
        dtrcats = dtrcatlins.map(function(catlin){return catlin.cat});
        dtrlins = dtrcatlins.map(function(catlin){return catlin.lin});
        var coerced_dtrcats = dtrcats.map(function(cat){return concrete.coercions[cat]});
        var coerced_dtrcats_product = productlist(coerced_dtrcats);
        foreach(coerced_dtrcats_product, function(dtrcs) {
            var fun_cat_seqs_list = linfuns[dtrcs];
            foreach(fun_cat_seqs_list, function(fun_cat_seq) {
                var fun = fun_cat_seq.fun;
                var cat = fun_cat_seq.cat;
                var seqs = fun_cat_seq.seqs;
                var lin = [];
                foreach(seqs, function(seqnr) {
                    var seq = concrete.sequences[seqnr];
                    lin.push([]);
                    var phrase = lin[lin.length-1];
                    foreach(seq, function(arg) {
                        if (arg instanceof SymCat) {
                            var children = dtrlins[arg.arg][arg.param];
                            foreach(children, function(child){
                                phrase.push(child);
                            });
                        } else if (arg instanceof SymKS) {
                            foreach(arg.tokens, function(word){
                                phrase.push({word:word, node:node});
                            });
                        } else if (arg instanceof SymKP) {
                            foreach(arg.tokens, function(word,i){
                                var seen = {};
                                seen[word] = true;
                                foreach(arg.alts, function(alt){
                                    var altw = alt.tokens[i];
                                    if (altw && !seen[altw]) {
                                        seen[altw] = true;
                                        word += "/" + altw;
                                    }
                                });
                                phrase.push({word:word, node:node});
                            });
                        }
                    });
                });
                results.push({cat:cat, lin:lin});
            });
        });
    });
    return results;
}

/** strLin(lin, ?focusnode, ?prefix, ?suffix)
    @param lin: a linearisation as returned by GFConcrete.linearise()
    @param focusnode: the highlighted node (a string of digits)
    @param prefix, suffix: the string that should be used for highlighting
    @return: a String
**/
function strLin(lin, focus, prefix, suffix) {
    if (prefix == null) prefix = "*";
    if (suffix == null) suffix = "";
    return lin.map(function(w){
        if (startswith(w.node, focus)) {
            return prefix + w.word + "/" + w.node + suffix;
        } else {
            return w.word + "/" + w.node;
        }
    }).join(" ");
}


//////////////////////////////////////////////////////////////////////
// GF trees

/** GFTree(node, type, ?children): creates a GF tree
   @param node, type: String
   @param children: an Array of GFTree's
   @return: a new object
**/
function GFTree(node, type, children) {
    return {'node': node,
            'type': type,
            'children': children || []};
}

/** strTree(tree, ?focusnode, ?prefix, ?suffix)
    @param tree: a GF tree
    @param focusnode: the highlighted node (a string of digits)
    @param prefix, suffix: the string that should be used for highlighting
    @return: a String
**/
function strTree(tree, focusnode, prefix, suffix) {
    if (prefix == null) prefix = "*";
    if (suffix == null) suffix = "";
    var result;
    if (tree instanceof Object && (tree.node || tree.type)) {
        result = (tree.node || "?") + (tree.type ? ":"+tree.type : "");
        if (tree.children) {
            tree.children.forEach(function(child, n) {
                var newnode = focusnode && focusnode[0] == n ? focusnode.slice(1) : null;
                result += " " + strTree(child, newnode, prefix, suffix);
            });
        }
    } else if (tree == null) {
        result = "?";
    } else {
        result = "" + tree;
    }
    if (focusnode === "" || focusnode === NODELEAF) 
        return prefix + "(" + result + ")" + suffix;
    else
        return "(" + result + ")";
}

/** copyTree(tree)
    @param tree: a GF tree
    @return: a deep copy of the tree
**/
function copyTree(tree) {
    return GFTree(tree.node, tree.type,
                  tree.children.map(function(child){
                      return copyTree(child);
                  }));
}

/** getSubtree(tree, node)
    @param tree: a GF tree
    @param node: node reference (a string of digits)
    @return: the subtree specified by the given node
**/
function getSubtree(tree, node) {
    var subtree = tree;
    for ( var i = 0; i < node.length; i++) {
        var n = node[i];
        if (n !== NODELEAF)
            subtree = subtree.children[n];
        if (!subtree) return;
    }
    return subtree;
};

/** updateSubtree(tree, node, update)
    @param tree: a GF tree
    @param node: node reference (a string of digits)
    @param update: a function that updates the specified subtree
    -- or a tree which should replace the existing subtree
**/
function updateSubtree(tree, node, update) {
    do {
        var n = node[node.length-1];
        node = node.slice(0, -1);
    } while (n === NODELEAF);
    var parent = getSubtree(tree, node);
    if (update instanceof Function) {
        parent.children[n] = update(parent.children[n]);
    } else {
        parent.children[n] = update;
    }
}

/** updateCopy(tree, node, update)
    @param tree: a GF tree
    @param node: node reference (a string of digits)
    @param update: a function that updates the specified subtree
    -- or a tree which should replace the existing subtree
    @return: an updated copy of the tree - the original tree is left unchanged
**/
function updateCopy(tree, node, update) {
    var newtree = copyTree(tree);
    updateSubtree(newtree, node, update);
    return newtree;
}

/** parseFocusedGFTree(descr)
    @param descr: a string representing the tree
    @return: a new GFTree
**/
function parseGFTree(descr) {
    return parseFocusedGFTree(descr).tree;
}

/** parseFocusedGFTree(descr)
    @param descr: a string representing the tree
    @return: a record {tree: a new GFTree, focus: a focus node}
**/
function parseFocusedGFTree(descr) {
    var tokens = descr
        .replace(/(\*?)\( */g," $1(")
        .replace(/\)/g," ) ")
        .replace(/^ +| +$/g,"")
        .split(/ +/);
    var focus = null;
    var stack = [GFTree()];
    tokens.forEach(function(token){
        if (token[0] == "*") {
            focus = stack.map(function(t){return t.children.length}).join("").slice(1);
            token = token.slice(1);
        }
        if (token[0] == "(") {
            if (stack.length == 1 && stack[0].children.length > 0) {
                console.log("PARSE ERROR: Expected end-of-string, found '(': " + descr);
            } else if (token.length <= 1) {
                console.log("PARSE ERROR: Expected node, found end-of-string: " + descr);
            } else {
                nodetype = token.slice(1).split(":");
                node = nodetype[0];
                type = nodetype[1] || null;
                stack.push(GFTree(node, type));
            }
        } else if (token == ")") {
            if (stack.length == 1) {
                var err = (stack[0].children.length == 0) ? "No matching open bracket" : "Expected end-of-string";
                console.log("PARSE ERROR: " + err + ", found ')': " + descr);
            } else {
                var tree = stack.pop();
                stack[stack.length-1].children.push(tree);
            }
        } else {
            console.log("PARSE ERROR: Unknown token " + token + ": " + descr);
        }
    });
    if (stack.length > 1) {
        console.log("PARSE ERROR: Expected close bracket, found end-of-string: " + descr);
    } else if (stack[0].children.length == 0) {
        console.log("PARSE ERROR: Expected open bracket, found end-of-string: " + descr);
    } else {
        return {tree:stack[0].children[0], focus:focus};
    }
}


//////////////////////////////////////////////////////////////////////
// utility functions

/** productlist(pools): the cartesian product of an Array of Arrays
    @param pools: an Array of Arrays
    @return: the cartesian product as an Array of Arrays
**/
function productlist(pools) {
    var results = [[]];
    foreach(pools, function(pool) {
        var oldresults = results;
        results = [];
        foreach(oldresults, function(oldres) {
            foreach(pool, function(k) {
                results.push(oldres.concat(k));
            });
        });
    });
    return results;
}

/** setdefault(dict, key, defval): lookup key in dict, and set it to defval if not there
    @param dict: an Object
    @param key: the String key
    @param defval: the default value to set, if key doesn't have a value already
    @return: the result of looking uå key in dict
**/
function setdefault(dict, key, defval) {
    if (dict[key] == null) 
        dict[key] = defval;
    return dict[key];
}

/** foreach(sequence, fun): apply fun to each value in sequence
    @param sequence: a sequence - an Array or a String
    @param fun: a function on arguments of the sequence
**/
function foreach(sequence, fun) {
    if (sequence != null) {
        for (var i = 0; i < sequence.length; i++) {
            fun(sequence[i], i, sequence);
        }
    }
}

/** startswith(string, prefix)
    @param string, prefix: Strings
    @return: True if string starts with prefix
**/
function startswith(str, prefix) {
    if (typeof str == "string" && typeof prefix == "string")
        return str.slice(0, prefix.length) == prefix;
}

function commonPrefix(s1, s2) {
    var len = Math.min(s1.length, s2.length);
    for (var i=0; i < len; i++) {
        if (s1[i] !== s2[i])
            return s1.slice(0,i);
    }
    return s1.slice(0,len);
}

//////////////////////////////////////////////////////////////////////
// functions for creating GF grammars from auto-generated javascript
// DO NOT RELY ON THESE - they might change whenever GF's output format changes

function mkFun(i) { return "F" + i }
function mkCat(i) { return "C" + i }
function mkSeq(i) { return "S" + i }

function Type(children, abscat) {
    this.children = children;
    this.abscat = abscat;
}

function Coerce(cat) {
    this.cat = mkCat(cat);
}

function PArg(cat) {
    this.parg = mkCat(cat);
}

function Apply(fun, children) {
    this.fun = mkFun(fun);
    this.children = children;
}

function CncFun(absfun, seqs) {
    this.absfun = absfun;
    this.seqs = [];
    for (var i = 0; i < seqs.length; i++)
        this.seqs.push(mkSeq(seqs[i]));
}

function SymLit(arg, param) {
    this.arg = arg; 
    this.param = param;
}

function SymCat(arg, param) {
    this.arg = arg;
    this.param = param;
}

function SymKS() {
    this.tokens = [];
    for (var i = 0; i < arguments.length; i++) {
        this.tokens.push(arguments[i]);
    }
}

function SymKP(tokens, alts) {
    this.tokens = tokens;
    this.alts = alts;
}

function Alt(tokens, follows) {
    this.tokens = tokens;
    this.follows = follows;
}

