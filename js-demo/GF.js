
/* 
   GF.js, by Peter Ljunglöf
   This file must be loaded BEFORE the GF grammar is loaded!
*/

META = "?";


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
    // this.cat2funs = {cat: [fname]}
    this.cat2funs = {};
    for (var fun in types) {
        var cat = types[fun].abscat;
        if (!this.cat2funs[cat]) this.cat2funs[cat] = [];
        this.cat2funs[cat].push(fun);
    }
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
    this.max_arity = 1;
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
                if (arity > this.max_arity) this.max_arity = arity;
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
    var ftype = this.types[tree[0]];
    if (!ftype) 
        throw(new TypeError("Function not found: " + tree[0]));
    if (ntype && ntype != ftype.abscat) 
        throw(new TypeError("Function type mismatch: " + tree[0] + ":" + ntype + 
                            " (should be " + ftype.abscat + ")"));
    // if (tree.type && tree.type != ftype.abscat) 
    //     throw(new TypeError("Function type mismatch: " + tree.node + ":" + tree.type + 
    //                         " (should be " + ftype.abscat + ")"));
    // if (!tree.type) 
    //     console.log("Missing type of function " + tree.node + " : " + ftype.abscat);
    if (ftype.children.length != tree.length - 1) 
        throw(new TypeError("Children mismatch: " + tree[0] + " has " + (tree.length - 1) +
                            " children (should be " + ftype.children.length + ")"));
    for (var i = 1; i < tree.length; i++) 
        this.typecheck(tree.children[i], ftype.children[i-1]);
}


//////////////////////////////////////////////////////////////////////
// Random generation

GFAbstract.prototype.generate = function(cat, maxdepth, maxtries, filter) {
    if (!maxdepth) maxdepth = 10;
    if (!maxtries) maxtries = 1000;
    var cat2funs = this.cat2funs;
    var types = this.types;

    function _generate(cat, maxdepth) {
        if (maxdepth <= 0) return null;
        var funs = cat2funs[cat];
        if (typeof filter == "function") {
            funs = funs.filter(filter);
        }
        if (!funs.length) return null;
        var fun = funs[Math.floor(Math.random() * funs.length)];
        if (startswith(fun, "default_")) return null;
        var children = types[fun].children;
        var tree = [fun];
        for (var i = 0; i < children.length; i++) {
            var child = _generate(children[i], maxdepth-1);
            if (!child) return null;
            tree.push(child);
        }
        return tree;
    }

    for (var i = 0; i < maxtries; i++) {
        var result = _generate(cat, maxdepth);
        if (result) return result;
    }
    return null;
}


//////////////////////////////////////////////////////////////////////
// GF linearisations

// var NODELEAF = ":"

/** GFGrammar.linearise(tree):
    @param language: a String denoting which concrete syntax to use
    @param tree: a GFTree object
    @return: an Array of {word:String, path:String} 
**/
GFGrammar.prototype.linearise = function(language, tree) {
    return this.concretes[language].linearise(tree);
}


/** GFConcrete.linearise(tree):
    @param tree: a GFTree instance
    @return: an Array of {word:String, path:String} 
**/
GFConcrete.prototype.linearise = function (tree) {
    var catlins = _linearise_nondet(this, tree, "");
    if (catlins.length > 0) {
        return _expand_tokens(catlins[0].lin[0]);
    }
}


function _expand_tokens(lin) {
    if (!(lin instanceof Array)) {
        throw TypeError("Linearisation must be Array: " + strObject(lin));
    } else if (lin.length == 0) {
        return lin;
    } else if (lin[0].arg) {
        var newlin = [];
        for (var i = lin.length-1; i >= 0; i--) {
            var path = lin[i].path;
            var arg = lin[i].arg;
            if (!arg.alts) {
                for (var j = arg.tokens.length-1; j >= 0; j--) {
                    newlin.push({'word':arg.tokens[j], 'path':path});
                }
            } else {
                var tokens = arg.tokens;
                if (newlin.length) {
                    altloop:
                    for (var altix = 0; altix < arg.alts.length; altix++) {
                        var alt = arg.alts[altix];
                        for (var followix = 0; followix < alt.follows.length; followix++) {
                            var prefix = alt.follows[followix];
                            if (startswith(newlin[0].word, prefix)) {
                                tokens = alt.tokens;
                                break altloop;
                            }
                        }
                    }
                }
                for (var j = tokens.length-1; j >= 0; j--) {
                    var toks = tokens[j].tokens;
                    for (var k = 0; k < toks.length; k++) {
                        newlin.push({'word':toks[k], 'path':path});
                    }
                }
            }
        }
        return newlin.reverse();
    } else {
        lin.map(function(sublin){
            return _expand_tokens(sublin);
        });
    }
}


function _linearise_nondet(concrete, tree, path) {
    var result = [];
    if (tree instanceof Array && concrete.linfuns[tree[0]]) {
        var linfuns = concrete.linfuns[tree[0]];
        var allchildren = _linearise_children_nondet(concrete, tree, 1, path);
        for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
            var children = allchildren[childrenix];
            var allfcs = linfuns[children.cats];
            if (allfcs && allfcs.length > 0) {
                for (var fcsix = 0; fcsix < allfcs.length; fcsix++) {
                    var fcs = allfcs[fcsix];
                    var lin = [];
                    for (var seqix = 0; seqix < fcs.seqs.length; seqix++) {
                        var seqnr = fcs.seqs[seqix];
                        var phrase = [];
                        var seq = concrete.sequences[seqnr];
                        for (var argix = 0; argix < seq.length; argix++) {
                            var arg = seq[argix];
                            if (arg instanceof SymCat) {
                                var alltokens = children.lins[arg.arg][arg.param];
                                for (var tokix = 0; tokix < alltokens.length; tokix++) {
                                    var token = alltokens[tokix];
                                    phrase.push(token);
                                }
                            } else {
                                phrase.push({'arg':arg, 'path':path});
                            }
                        }
                        lin.push(phrase);
                    }
                    result.push({'cat':fcs.cat, 'lin':lin});
                }
            }
        }
    } else {
        var childtype;
        if (tree instanceof Array) {
            childtype = concrete.abstract.types[tree[0]].abscat;
            tree = strTree(tree[0]);
        } else if (startswith(tree, META) && tree.length > 1) {
            childtype = tree.slice(1);
        }
        var cats = concrete.categories[childtype];
        for (var catix = 0; catix < cats.length; catix++) {
            var cat = cats[catix];
            var arity = concrete.lincats[cat] || concrete.max_arity;
            var lin = [];
            for (var k = 0; k < arity; k++) {
                lin.push([{'arg': {'tokens':["["+tree+"]"]}, 'path': path}]);
            }
            result.push({'cat':cat, 'lin':lin});
        }
    }
    return result;
}


function _linearise_children_nondet(concrete, tree, i, path) {
    var result = [];
    if (i >= tree.length) {
        result.push({'cats':[], 'lins':[]});
    } else {
        var allchild = _linearise_nondet(concrete, tree[i], path + i);
        var allchildren = _linearise_children_nondet(concrete, tree, i+1, path);
        for (var childix = 0; childix < allchild.length; childix++) {
            var child = allchild[childix];
            for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
                var children = allchildren[childrenix];
                var lins = [child.lin].concat(children.lins);
                var cats = [child.cat].concat(children.cats);
                var allcocats = _coerce_cats(concrete, cats, 0);
                for (var cocatix = 0; cocatix < allcocats.length; cocatix++) {
                    var cocats = allcocats[cocatix];
                    result.push({'cats':cocats, 'lins':lins});
                }
            }
        }
    }
    return result;
}


function _coerce_cats(concrete, cats, i) {
    var result = [];
    if (i >= cats.length) {
        result.push([]);
    } else {
        var cocats = concrete.coercions[cats[i]] || [cats[i]];
        var cocats_rest = _coerce_cats(concrete, cats, i+1);
        for (var cocatix = 0; cocatix < cocats.length; cocatix++) {
            for (var restix = 0; restix < cocats_rest.length; restix++) {
                result.push([cocats[cocatix]].concat(cocats_rest[restix]));
            }
        }
    }
    return result;
}


/** strLin(lin, ?focuspath, ?prefix, ?suffix)
    @param lin: a linearisation as returned by GFConcrete.linearise()
    @param focuspath: the highlighted node (a string of digits)
    @param prefix, suffix: the string that should be used for highlighting
    @return: a String
**/
function strLin(lin, focus, prefix, suffix) {
    if (prefix == null) prefix = "*";
    if (suffix == null) suffix = prefix;
    return lin.map(function(w){
        if (startswith(w.path, focus)) {
            return prefix + w.word + "/" + w.path + suffix;
        } else {
            return w.word + "/" + w.path;
        }
    }).join(" ");
}


//////////////////////////////////////////////////////////////////////
// GF trees

/** GFTree(node, ?children): creates a GF tree
   @param node, type: String
   @param children: an Array of GFTree's
   @return: a new object
**/
function GFTree(node, children) {
    if (children) {
        return [node].concat(children);
    } else {
        return [node];
    }
}


/** strTree(tree, ?focuspath, ?prefix, ?suffix)
    @param tree: a GF tree
    @param focuspath: the highlighted node (a string of digits)
    @param prefix, suffix: the string that should be used for highlighting
    @return: a String
**/
function strTree(tree, focuspath, prefix, suffix) {
    if (prefix == null) prefix = "*";
    if (suffix == null) suffix = prefix;
    var result;
    if (tree instanceof Array) {
        result = tree.map(function(child, n) {
            var newpath = focuspath && focuspath[0] == n ? focuspath.slice(1) : null;
            return strTree(child, newpath, prefix, suffix);
        });
        result = "(" + result.join(" ") + ")";
    } else if (tree == null) {
        result = META;
    } else {
        result = "" + tree;
    }
    if (focuspath === "") 
        return prefix + result + suffix;
    else
        return result;
}


/** copyTree(tree)
    @param tree: a GF tree
    @return: a deep copy of the tree
**/
function copyTree(tree) {
    if (tree instanceof Array) {
        return tree.map(copyTree);
    } else {
        return tree;
    }
}


/** getSubtree(tree, path)
    @param tree: a GF tree
    @param path: node reference (a string of digits)
    @return: the subtree specified by the given path
**/
function getSubtree(tree, path) {
    var subtree = tree;
    for ( var i = 0; i < path.length; i++) {
        var n = path[i];
        // if (n !== NODELEAF)
        subtree = subtree[n];
        if (!subtree) return;
    }
    return subtree;
};


/** updateSubtree(tree, path, update)
    @param tree: a GF tree
    @param path: node reference (a string of digits)
    @param update: a function that updates the specified subtree
    -- or a tree which should replace the existing subtree
**/
function updateSubtree(tree, path, update) {
    var n = path[path.length-1];
    path = path.slice(0, -1);
    var parent = getSubtree(tree, path);
    if (update instanceof Function) {
        parent[n] = update(parent[n]);
    } else {
        parent[n] = update;
    }
}


/** updateCopy(tree, path, update)
    @param tree: a GF tree
    @param path: node reference (a string of digits)
    @param update: a function that updates the specified subtree
    -- or a tree which should replace the existing subtree
    @return: an updated copy of the tree - the original tree is left unchanged
**/

function updateCopy(tree, path, update) {
    var plen = path.length;
    function _updateSubtree(sub, i) {
        if (i >= plen) {
            return (update instanceof Function) ? update(sub) : update;
        } else {
            var n = parseInt(path[i]);
            return sub.slice(0, n).concat([_updateSubtree(sub[n], i+1)]).concat(sub.slice(n+1));
        }
    }
    return _updateSubtree(tree, 0);
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
    var stack = [[]];
    tokens.forEach(function(token){
        if (token[0] == "*") {
            focus = stack.map(function(t){return t.length}).join("").slice(1);
            token = token.slice(1);
        }
        if (token[0] == "(") {
            if (stack.length == 1 && stack[0].length > 0) {
                console.log("PARSE ERROR: Expected end-of-string, found '(': " + descr);
            } else if (token.length <= 1) {
                console.log("PARSE ERROR: Expected node, found end-of-string: " + descr);
            } else {
                node = token.slice(1);
                stack.push(GFTree(node));
            }
        } else if (token == ")") {
            if (stack.length == 1) {
                var err = (stack[0].children.length == 0) ? "No matching open bracket" : "Expected end-of-string";
                console.log("PARSE ERROR: " + err + ", found ')': " + descr);
            } else {
                var tree = stack.pop();
                stack[stack.length-1].push(tree);
            }
        } else if (/^\w+$/.test(token)) {
            stack[stack.length-1].push(GFTree(token));
        } else if (/^\?\w+$/.test(token)) {
            stack[stack.length-1].push(token);
        } else {
            console.log("PARSE ERROR: Unknown token " + token + ": " + descr);
        }
    });
    if (stack.length > 1) {
        console.log("PARSE ERROR: Expected close bracket, found end-of-string: " + descr);
    } else if (stack[0].length == 0) {
        console.log("PARSE ERROR: Expected open bracket, found end-of-string: " + descr);
    } else {
        return {tree:stack[0][0], focus:focus};
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
    // return [abscat].concat(children);
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

