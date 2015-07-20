var Utilities;
(function (Utilities) {
    // String utilities
    function common_prefix(sequences) {
        if (!sequences.length) {
            return [];
        }
        var minlen = Math.min.apply(this, sequences.map(function (seq) {
            return seq.length;
        }));
        for (var i = 0; i < minlen; i++) {
            var value = sequences[0][i];
            for (var seq = 1; seq < sequences.length; seq++) {
                if (sequences[seq][i] != value) {
                    return sequences[seq].slice(0, i);
                }
            }
        }
        return sequences[0].slice(0, minlen);
    }
    Utilities.common_prefix = common_prefix;
    // export function commonPrefix(s1 : string, s2 : string) : string {
    //     var len = Math.min(s1.length, s2.length);
    //     for (var i=0; i < len; i++) {
    //         if (s1[i] !== s2[i])
    //             return s1.slice(0,i);
    //     }
    //     return s1.slice(0,len);
    // }
    // List utilities
    function join() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return Array.prototype.slice.apply(args).join('-');
    }
    Utilities.join = join;
    function split(s) {
        return s.split('-');
    }
    Utilities.split = split;
    function array_cmp(a, b) {
        if (a instanceof Array) {
            if (b instanceof Array) {
                var alen = a.length, blen = b.length;
                if (alen < blen)
                    return -1;
                if (alen > blen)
                    return 1;
                for (var i = 0; i < alen; i++) {
                    var cmp = array_cmp(a[i], b[i]);
                    if (cmp)
                        return cmp;
                }
                return 0;
            }
            else {
                return 1;
            }
        }
        else if (b instanceof Array) {
            return -1;
        }
        else {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        }
    }
    Utilities.array_cmp = array_cmp;
    function array_eq(a, b) {
        if (a instanceof Array) {
            if (b instanceof Array) {
                var alen = a.length, blen = b.length;
                if (alen !== blen)
                    return false;
                for (var i = 0; i < alen; i++) {
                    var eq = array_eq(a[i], b[i]);
                    if (!eq)
                        return eq;
                }
                return true;
            }
            else {
                return false;
            }
        }
        else if (b instanceof Array) {
            return false;
        }
        else {
            return a == b;
        }
    }
    Utilities.array_eq = array_eq;
    function flatten(obj) {
        if (obj instanceof Array) {
            var list = [];
            for (var i = 0; i < obj.length; i++) {
                list.push.apply(list, flatten(obj[i]));
            }
            return list;
        }
        else {
            return [obj];
        }
    }
    Utilities.flatten = flatten;
    // Converting a list of strings into a string, so that the original list can be retrieved
    function ishash(hash) {
        return (typeof (hash) == "string" && /^\{\[\"[0-9]/.test(hash));
    }
    Utilities.ishash = ishash;
    function hash(args) {
        return JSON.stringify(args);
    }
    Utilities.hash = hash;
    function unhash(hash) {
        return JSON.parse(hash);
    }
    Utilities.unhash = unhash;
    // Timing
    var TIMERS = {};
    function START_TIMER(n, fresh) {
        if (fresh) {
            if (TIMERS[n]) {
                if (TIMERS[n] < -100)
                    STOP_TIMER(n);
                var i = 1;
                while (TIMERS[n + "." + i])
                    i++;
                TIMERS[n + "." + i] = TIMERS[n];
            }
            TIMERS[n] = -Date.now();
        }
        else {
            if (!TIMERS[n])
                TIMERS[n] = 0;
            TIMERS[n] -= Date.now();
        }
    }
    Utilities.START_TIMER = START_TIMER;
    function GET_TIMER(n) {
        return TIMERS[n] + Date.now();
    }
    Utilities.GET_TIMER = GET_TIMER;
    function STOP_TIMER(n) {
        TIMERS[n] += Date.now();
    }
    Utilities.STOP_TIMER = STOP_TIMER;
    function LOG_TIMERS() {
        var out = [];
        for (var key in TIMERS) {
            out.push(key + ": " + Math.round(TIMERS[key] / 100) / 10);
        }
        out.sort();
        console.log("TIMERS", out.join(", "));
        TIMERS = {};
    }
    Utilities.LOG_TIMERS = LOG_TIMERS;
    function getTime() {
        return Date.now();
    }
    Utilities.getTime = getTime;
    function showTime(start) {
        return (getTime() - start).toFixed(1) + " ms";
    }
    Utilities.showTime = showTime;
    // Pretty-printing
    function strObject(obj) {
        var result = [];
        if (obj == null) {
            return "" + obj;
        }
        else if (obj instanceof Array) {
            obj.forEach(function (o) {
                result.push(strObject(o));
            });
            // result = obj.map(function(o){
            //     return strObject(o);
            // });
            return "[" + result.join(", ") + "]";
        }
        else if (obj instanceof Object) {
            for (var key in obj) {
                result.push(key + ": " + strObject(obj[key]));
            }
            return "{" + result.join(", ") + "}";
        }
        else if (typeof obj == "string") {
            return '"' + obj + '"';
        }
        else {
            return "" + obj;
        }
    }
    Utilities.strObject = strObject;
    // Busy indicator
    var BUSY_DELAY = 50;
    var BUSY_STR = "\u25CF";
    // Unicode Character 'BLACK CIRCLE' (U+25CF)
    function BUSY(f) {
        return function () {
            var obj = this; // $(this);
            push_busy();
            setTimeout(function () {
                f(obj);
                pop_busy();
                LOG_TIMERS();
            }, BUSY_DELAY);
        };
    }
    Utilities.BUSY = BUSY;
    function push_busy() {
        var ind = document.getElementById('busy-indicator');
        ind.className = ind.className + BUSY_STR;
        ind.textContent += BUSY_STR;
    }
    Utilities.push_busy = push_busy;
    function pop_busy() {
        var ind = document.getElementById('busy-indicator');
        if (ind.className.slice(-BUSY_STR.length) === BUSY_STR) {
            ind.className = ind.className.slice(0, -BUSY_STR.length);
            ind.textContent = ind.textContent.slice(0, -BUSY_STR.length);
        }
        else {
            console.log("POP ERROR", ind.className, ind.textContent);
        }
    }
    Utilities.pop_busy = pop_busy;
    // Error handling
    function alertError(title, description) {
        alert("*** " + title + "***\n" + description);
    }
    Utilities.alertError = alertError;
})(Utilities || (Utilities = {}));
///<reference path="Utilities.ts"/>
/*
   GF.js, by Peter Ljunglöf
   This file must be loaded BEFORE the GF grammar is loaded!
*/
var GFGrammar = (function () {
    function GFGrammar(abs, cncs) {
        this.abs = abs;
        this.cncs = cncs;
        for (var lang in cncs) {
            this.cncs[lang].abs = abs;
        }
    }
    /** GFGrammar.linearise(tree):
        @param language: a String denoting which concrete syntax to use
        @param tree: a GFTree object
        @return: an Array of {word:String, path:String}
    **/
    GFGrammar.prototype.linearise = function (language, tree) {
        return this.cncs[language].linearise(tree);
    };
    return GFGrammar;
})();
var GFAbstract = (function () {
    function GFAbstract(startcat, types) {
        this.startcat = startcat;
        this.types = types;
        this.cat2funs = {};
        for (var fun in types) {
            var cat = types[fun].abscat;
            if (!this.cat2funs[cat]) {
                this.cat2funs[cat] = [];
            }
            this.cat2funs[cat].push(fun);
        }
        this.typing2funs = {};
        for (var fun in types) {
            var typ = types[fun].abscat;
            var hashargs = Utilities.hash(types[fun].children);
            if (!this.typing2funs[typ])
                this.typing2funs[typ] = {};
            if (!this.typing2funs[typ][hashargs])
                this.typing2funs[typ][hashargs] = [];
            this.typing2funs[typ][hashargs].push(fun);
        }
    }
    /** GFAbstract.typecheck(tree):
        Throws a TypeError if the tree is not type correct.
        If the tree lacks type information, the types are output to the console.
        @param tree: a GFTree object
    **/
    GFAbstract.prototype.typecheck = function (tree, ntype) {
        var ftype = this.types[tree.node];
        if (!ftype) {
            throw (new TypeError("Function not found: " + tree.node));
        }
        if (ntype && ntype != ftype.abscat) {
            throw (new TypeError("Function type mismatch: " + tree.node + ":" + ntype + " (should be " + ftype.abscat + ")"));
        }
        // if (tree.type && tree.type != ftype.abscat) {
        //     throw(new TypeError("Function type mismatch: " + tree.node + ":" + tree.type + 
        //                         " (should be " + ftype.abscat + ")"));
        // {
        // if (!tree.type) {
        //     console.log("Missing type of function " + tree.node + " : " + ftype.abscat);
        // }
        if (ftype.children.length != tree.children.length) {
            throw (new TypeError("Children mismatch: " + tree.node + " has " + tree.children.length + " children (should be " + ftype.children.length + ")"));
        }
        for (var i = 0; i < tree.children.length; i++) {
            this.typecheck(tree.children[i], ftype.children[i]);
        }
    };
    //////////////////////////////////////////////////////////////////////
    // Random generation
    GFAbstract.prototype.generate = function (cat, maxdepth, maxtries, filter) {
        if (!maxdepth)
            maxdepth = 10;
        if (!maxtries)
            maxtries = 1000;
        var cat2funs = this.cat2funs;
        var types = this.types;
        function _generate(cat, maxdepth) {
            if (maxdepth <= 0)
                return null;
            var funs = cat2funs[cat];
            if (typeof filter == "function") {
                funs = funs.filter(filter);
            }
            if (!funs.length)
                return null;
            var fun = funs[Math.floor(Math.random() * funs.length)];
            if (startswith(fun, "default_"))
                return null;
            var children = types[fun].children;
            var tree = new GFTree(fun, []);
            for (var i = 0; i < children.length; i++) {
                var child = _generate(children[i], maxdepth - 1);
                if (!child)
                    return null;
                tree.children.push(child);
            }
            return tree;
        }
        for (var i = 0; i < maxtries; i++) {
            var result = _generate(cat, maxdepth);
            if (result)
                return result;
        }
        return null;
    };
    return GFAbstract;
})();
var GFConcrete = (function () {
    function GFConcrete(flags, productions, functions, sequences, categories, nr_cats) {
        this.abs = undefined;
        this.productions = {};
        for (var p in productions) {
            this.productions[mkCat(p)] = productions[p];
        }
        this.functions = {};
        for (var i = 0; i < functions.length; i++) {
            this.functions[mkFun(i)] = functions[i];
        }
        this.sequences = {};
        for (var i = 0; i < sequences.length; i++) {
            this.sequences[mkSeq(i)] = sequences[i];
        }
        this.categories = {};
        this.inversecats = {};
        for (var abscat in categories) {
            this.categories[abscat] = [];
            for (var i = categories[abscat].s; i <= categories[abscat].e; i++) {
                this.categories[abscat].push(mkCat(i));
                this.inversecats[mkCat(i)] = abscat;
            }
        }
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
                if (prods[i] instanceof Coerce) {
                    setdefault(this.coercions, prods[i].cat, []).push(cat);
                }
                else if (prods[i] instanceof Apply) {
                    var prod = prods[i];
                    var cncfun = this.functions[prod.fun];
                    var xxx = {};
                    var lf = setdefault(this.linfuns, cncfun.absfun, xxx);
                    var children = [];
                    for (var j = 0; j < prod.children.length; j++) {
                        children.push(prod.children[j].parg);
                    }
                    var yyy = [];
                    setdefault(lf, children + "", yyy).push({ fun: prod.fun, cat: cat, seqs: cncfun.seqs });
                    var arity = cncfun.seqs.length;
                    setdefault(this.lincats, cat, arity);
                    if (this.lincats[cat] != arity) {
                        alert("Mismatching linfun arities for cat: " + cat);
                    }
                    if (arity > this.max_arity) {
                        this.max_arity = arity;
                    }
                }
            }
        }
    }
    //////////////////////////////////////////////////////////////////////
    // GF linearisations
    /** GFConcrete.linearise(tree):
        @param tree: a GFTree instance
        @return: an Array of {word:String, path:String}
    **/
    GFConcrete.prototype.linearise = function (tree) {
        var catlins = this._linearise_nondet(tree, "");
        if (catlins.length > 0) {
            return this._expand_tokens(catlins[0].lin[0]);
        }
    };
    GFConcrete.prototype._expand_tokens = function (lin) {
        if (lin.length == 0) {
            return [];
        }
        else if (lin[0].arg) {
            var newlin = [];
            for (var i = lin.length - 1; i >= 0; i--) {
                var path = lin[i].path;
                var arg = lin[i].arg;
                if (arg instanceof SymKS) {
                    for (var j = arg.tokens.length - 1; j >= 0; j--) {
                        newlin.push({ 'word': arg.tokens[j], 'path': path });
                    }
                }
                else if (arg instanceof SymKP) {
                    var tokens = arg.tokens;
                    if (newlin.length) {
                        altloop: for (var altix = 0; altix < arg.alts.length; altix++) {
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
                    for (var j = tokens.length - 1; j >= 0; j--) {
                        var toks = tokens[j].tokens;
                        for (var k = 0; k < toks.length; k++) {
                            newlin.push({ 'word': toks[k], 'path': path });
                        }
                    }
                }
            }
            return newlin.reverse();
        }
        else {
            lin.map(function (sublin) {
                return this._expand_tokens(sublin);
            });
        }
    };
    GFConcrete.prototype._linearise_nondet = function (tree, path) {
        var result = [];
        if (tree instanceof GFTree && this.linfuns[tree.node]) {
            var linfuns = this.linfuns[tree.node];
            var allchildren = this._linearise_children_nondet(tree, 0, path);
            for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
                var children = allchildren[childrenix];
                var allfcs = linfuns[children.cats.join()];
                if (allfcs && allfcs.length > 0) {
                    for (var fcsix = 0; fcsix < allfcs.length; fcsix++) {
                        var fcs = allfcs[fcsix];
                        var lin = [];
                        for (var seqix = 0; seqix < fcs.seqs.length; seqix++) {
                            var seqnr = fcs.seqs[seqix];
                            var phrase = [];
                            var seq = this.sequences[seqnr];
                            for (var argix = 0; argix < seq.length; argix++) {
                                var arg = seq[argix];
                                if (arg instanceof SymCat) {
                                    var scarg = arg;
                                    var alltokens = children.lins[scarg.arg][scarg.param];
                                    for (var tokix = 0; tokix < alltokens.length; tokix++) {
                                        var token = alltokens[tokix];
                                        phrase.push(token);
                                    }
                                }
                                else {
                                    phrase.push({ 'arg': arg, 'path': path });
                                }
                            }
                            lin.push(phrase);
                        }
                        result.push({ 'cat': fcs.cat, 'lin': lin });
                    }
                }
            }
        }
        else {
            // var childtype;
            // if (tree instanceof GFTree) {
            var childtype = this.abs.types[tree.node].abscat;
            var treeS = tree.node.toString();
            // } else if (startswith(tree, GFMETA) && tree.length > 1) {
            //     childtype = tree.slice(1);
            // }
            var cats = this.categories[childtype];
            for (var catix = 0; catix < cats.length; catix++) {
                var cat = cats[catix];
                var arity = this.lincats[cat] || this.max_arity;
                var lin = [];
                for (var k = 0; k < arity; k++) {
                    lin.push([{ 'arg': { 'tokens': ["[" + treeS + "]"] }, 'path': path }]);
                }
                result.push({ 'cat': cat, 'lin': lin });
            }
        }
        return result;
    };
    GFConcrete.prototype._linearise_children_nondet = function (tree, i, path) {
        var result = [];
        if (i >= tree.children.length) {
            result.push({ 'cats': [], 'lins': [] });
        }
        else {
            var allchild = this._linearise_nondet(tree.children[i], path + i);
            var allchildren = this._linearise_children_nondet(tree, i + 1, path);
            for (var childix = 0; childix < allchild.length; childix++) {
                var child = allchild[childix];
                for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
                    var children = allchildren[childrenix];
                    var lins = [child.lin].concat(children.lins);
                    var cats = [child.cat].concat(children.cats);
                    var allcocats = this._coerce_cats(cats, 0);
                    for (var cocatix = 0; cocatix < allcocats.length; cocatix++) {
                        var cocats = allcocats[cocatix];
                        result.push({ 'cats': cocats, 'lins': lins });
                    }
                }
            }
        }
        return result;
    };
    GFConcrete.prototype._coerce_cats = function (cats, i) {
        var result = [];
        if (i >= cats.length) {
            result.push([]);
        }
        else {
            var cocats = this.coercions[cats[i]] || [cats[i]];
            var cocats_rest = this._coerce_cats(cats, i + 1);
            for (var cocatix = 0; cocatix < cocats.length; cocatix++) {
                for (var restix = 0; restix < cocats_rest.length; restix++) {
                    result.push([cocats[cocatix]].concat(cocats_rest[restix]));
                }
            }
        }
        return result;
    };
    return GFConcrete;
})();
/** strLin(lin, ?showpath, ?focuspath, ?prefix, ?suffix)
    @param lin: a linearisation as returned by GFConcrete.linearise()
    @param showpath: boolean, if true then show the path of each word
    @param focuspath: the highlighted node, if any (a string of digits)
    @param prefix, suffix: the string that should be used for highlighting
    @return: a String
**/
function strLin(lin, showpath, focus, prefix, suffix) {
    if (prefix == null)
        prefix = "*";
    if (suffix == null)
        suffix = prefix;
    return lin.map(function (w) {
        var token = w.word;
        if (showpath)
            token += "/" + w.path;
        if (startswith(w.path, focus))
            token = prefix + token + suffix;
        return token;
    }).join(" ");
}
//////////////////////////////////////////////////////////////////////
// GF trees
/** GFTree(node, ?children): creates a GF tree
    @param node, type: String
    @param children: an Array of GFTree's
    @return: a new object
**/
var GFTree = (function () {
    function GFTree(node, children) {
        this.node = node;
        this.children = children;
    }
    GFTree.meta = function (typ) {
        return new GFTree(GFTree.GFMETA + typ, []);
    };
    GFTree.prototype.isMeta = function () {
        return this.node[0] == GFTree.GFMETA && this.node.slice(1);
    };
    GFTree.prototype.size = function () {
        var size = 1;
        for (var i = 0; i < this.children.length; i++) {
            size += this.children[i].size();
        }
        return size;
    };
    GFTree.prototype.toString = function (focuspath, prefix, suffix) {
        if (prefix == null)
            prefix = "*";
        if (suffix == null)
            suffix = prefix;
        var result = (this.children.length == 0) ? this.node : "(" + this.node + " " + this.children.map(function (child, n) {
            if (child == null) {
                return GFTree.GFMETA;
            }
            else {
                var newpath = focuspath && focuspath[0] == n + "" ? focuspath.slice(1) : null;
                return child.toString(newpath, prefix, suffix);
            }
        }).join(" ") + ")";
        if (focuspath === "")
            return prefix + result + suffix;
        else
            return result;
    };
    // /** strTree(tree, ?focuspath, ?prefix, ?suffix)
    //     @param tree: a GF tree
    //     @param focuspath: the highlighted node (a string of digits)
    //     @param prefix, suffix: the string that should be used for highlighting
    //     @return: a String
    // **/
    // function strTree(tree : any, focuspath? : string, prefix? : string, suffix? : string) : string {
    //     if (prefix == null) prefix = "*";
    //     if (suffix == null) suffix = prefix;
    //     var result : string ;
    //     if (tree instanceof Array) {
    //         result = "(" + tree.map((child, n) => {
    //             var newpath = focuspath && focuspath[0] == n ? focuspath.slice(1) : null;
    //             return strTree(child, newpath, prefix, suffix);
    //         }).join(" ") + ")";
    //     } else if (tree == null) {
    //         result = GFMETA;
    //     } else {
    //         result = "" + tree;
    //     }
    //     if (focuspath === "") 
    //         return prefix + result + suffix;
    //     else
    //         return result;
    // }
    GFTree.prototype.copy = function () {
        return new GFTree(this.node, this.children.map(function (child) {
            return (child instanceof GFTree) ? child.copy() : child;
        }));
    };
    // /** copyTree(tree)
    //     @param tree: a GF tree
    //     @return: a deep copy of the tree
    // **/
    // function copyTree(tree : any) : any {
    //     if (tree instanceof Array) {
    //         return tree.map(copyTree);
    //     } else {
    //         return tree;
    //     }
    // }
    GFTree.prototype.getSubtree = function (path) {
        var subtree = this;
        for (var i = 0; i < path.length; i++) {
            var n = path[i];
            // var NODELEAF = ":"
            // if (n !== NODELEAF)
            subtree = subtree.children[n];
            if (!subtree)
                return;
        }
        return subtree;
    };
    // /** getSubtree(tree, path)
    //     @param tree: a GF tree
    //     @param path: node reference (a string of digits)
    //     @return: the subtree specified by the given path
    // **/
    // function getSubtree(tree : any, path : string) : any {
    //     var subtree = tree;
    //     for (var i = 0; i < path.length; i++) {
    //         var n = path[i];
    //         // var NODELEAF = ":"
    //         // if (n !== NODELEAF)
    //         subtree = subtree[n];
    //         if (!subtree) return;
    //     }
    //     return subtree;
    // };
    GFTree.prototype.updateSubtree = function (path, update) {
        if (path.length == 0) {
            var newsub = (update instanceof Function) ? update(this) : update;
            this.node = newsub.node;
            this.children = newsub.children;
        }
        else {
            var n = path[path.length - 1];
            var parent = this.getSubtree(path.slice(0, -1));
            parent[n] = (update instanceof Function) ? update(parent[n]) : update;
        }
    };
    // /** updateSubtree(tree, path, update)
    //     @param tree: a GF tree
    //     @param path: node reference (a string of digits)
    //     @param update: a function that updates the specified subtree
    //     -- or a tree which should replace the existing subtree
    // **/
    // function updateSubtree(tree : any, path : string, update : any) {
    //     var n = path[path.length-1];
    //     path = path.slice(0, -1);
    //     var parent = getSubtree(tree, path);
    //     if (update instanceof Function) {
    //         parent[n] = (update instanceof Function) ? update(parent[n]) : update;
    //     }
    // }
    GFTree.prototype.updateCopy = function (path, update) {
        var plen = path.length;
        function _updateSubtree(sub, i) {
            if (i >= plen) {
                return (update instanceof Function) ? update(sub) : update;
            }
            else {
                var n = parseInt(path[i]);
                return new GFTree(sub.node, sub.children.slice(0, n).concat([_updateSubtree(sub.children[n], i + 1)]).concat(sub.children.slice(n + 1)));
            }
        }
        return _updateSubtree(this, 0);
    };
    // function GFTree(node : string, children? : string[]) : any {
    //     if (children) {
    //         return [node].concat(children);
    //     } else {
    //         return [node];
    //     }
    // }
    GFTree.GFMETA = "?";
    return GFTree;
})();
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
    var tokens = descr.replace(/(\*?)\( */g, " $1(").replace(/\)/g, " ) ").replace(/^ +| +$/g, "").split(/ +/);
    var focus = null;
    var stack = [new GFTree(null, [])];
    tokens.forEach(function (token) {
        if (token[0] == "*") {
            focus = stack.map(function (t) {
                return t.children.length;
            }).join("").slice(1);
            token = token.slice(1);
        }
        if (token[0] == "(") {
            if (stack.length == 1 && stack[0].children.length > 0) {
                console.log("PARSE ERROR: Expected end-of-string, found '(': " + descr);
            }
            else if (token.length <= 1) {
                console.log("PARSE ERROR: Expected node, found end-of-string: " + descr);
            }
            else {
                var node = token.slice(1);
                stack.push(new GFTree(node, []));
            }
        }
        else if (token == ")") {
            if (stack.length == 1) {
                var err = (stack[0].children.length == 0) ? "No matching open bracket" : "Expected end-of-string";
                console.log("PARSE ERROR: " + err + ", found ')': " + descr);
            }
            else {
                var tree = stack.pop();
                stack[stack.length - 1].children.push(tree);
            }
        }
        else if (/^\w+$/.test(token)) {
            stack[stack.length - 1].children.push(new GFTree(token, []));
        }
        else if (/^\?\w+$/.test(token)) {
            stack[stack.length - 1].children.push(new GFTree(token, []));
        }
        else {
            console.log("PARSE ERROR: Unknown token " + token + ": " + descr);
        }
    });
    if (stack.length > 1) {
        console.log("PARSE ERROR: Expected close bracket, found end-of-string: " + descr);
    }
    else if (stack[0].children.length == 0) {
        console.log("PARSE ERROR: Expected open bracket, found end-of-string: " + descr);
    }
    else {
        return { tree: stack[0].children[0], focus: focus };
    }
}
//////////////////////////////////////////////////////////////////////
// utility functions
/** setdefault(dict, key, defval): lookup key in dict, and set it to defval if not there
    @param dict: an Object
    @param key: the String key
    @param defval: the default value to set, if key doesn't have a value already
    @return: the result of looking up key in dict
**/
function setdefault(dict, key, defval) {
    if (dict[key] == null)
        dict[key] = defval;
    return dict[key];
}
/** startswith(string, prefix)
    @param string, prefix: Strings
    @return: True if string starts with prefix
**/
function startswith(str, prefix) {
    if (typeof str == "string" && typeof prefix == "string")
        return str.slice(0, prefix.length) == prefix;
}
//////////////////////////////////////////////////////////////////////
// functions for creating GF grammars from auto-generated javascript
// DO NOT RELY ON THESE - they might change whenever GF's output format changes
function mkFun(i) {
    return "F" + i;
}
function mkCat(i) {
    return "C" + i;
}
function mkSeq(i) {
    return "S" + i;
}
var Type = (function () {
    function Type(children, abscat) {
        this.children = children;
        this.abscat = abscat;
    }
    return Type;
})();
var Apply = (function () {
    function Apply(fun, children) {
        this.children = children;
        this.fun = mkFun(fun);
    }
    return Apply;
})();
var Coerce = (function () {
    function Coerce(cat) {
        this.cat = mkCat(cat);
    }
    return Coerce;
})();
var PArg = (function () {
    function PArg(cat) {
        this.parg = mkCat(cat);
    }
    return PArg;
})();
var CncFun = (function () {
    function CncFun(absfun, seqs) {
        this.absfun = absfun;
        this.seqs = [];
        for (var i = 0; i < seqs.length; i++)
            this.seqs.push(mkSeq(seqs[i]));
    }
    return CncFun;
})();
var SymLit = (function () {
    function SymLit(arg, param) {
        this.arg = arg;
        this.param = param;
    }
    return SymLit;
})();
var SymCat = (function () {
    function SymCat(arg, param) {
        this.arg = arg;
        this.param = param;
    }
    return SymCat;
})();
var SymKS = (function () {
    function SymKS() {
        var tokens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tokens[_i - 0] = arguments[_i];
        }
        this.tokens = tokens;
    }
    return SymKS;
})();
var SymKP = (function () {
    function SymKP(tokens, alts) {
        this.tokens = tokens;
        this.alts = alts;
    }
    return SymKP;
})();
var Alt = (function () {
    function Alt(tokens, follows) {
        this.tokens = tokens;
        this.follows = follows;
    }
    return Alt;
})();
///<reference path="Utilities.ts"/>
///<reference path="GF.ts"/>
var MAX_DEPTH = 3;
var MENU_TIMEOUT = 1000;
var FunTyping;
var TypingFuns;
var Linearise;
var GeneratedTrees;
function initialize_grammar(grammar) {
    FunTyping = grammar.abs.types;
    TypingFuns = grammar.abs.typing2funs;
    Linearise = function (lang, tree) {
        return grammar.cncs[lang].linearise(tree);
    };
    GeneratedTrees = generate_all_trees();
}
var BracketedLin = (function () {
    function BracketedLin(path, tokens) {
        this.path = path;
        this.tokens = tokens;
    }
    return BracketedLin;
})();
var BracketedToken = (function () {
    function BracketedToken(word, n) {
        this.word = word;
        this.n = n;
    }
    return BracketedToken;
})();
function bracketise(lin) {
    var stack = [new BracketedLin("", [])];
    var n = 0;
    var path = '';
    while (true) {
        var linpath = n < lin.length && lin[n].path + 'w';
        if (startswith(linpath, path)) {
            if (path === linpath) {
                var linword = lin[n].word;
                stack[stack.length - 1].tokens.push(new BracketedToken(linword, n));
                n++;
            }
            else {
                for (var i = path.length + 1; i <= linpath.length; i++) {
                    stack.push(new BracketedLin(linpath.slice(0, i), []));
                }
                path = linpath;
            }
        }
        else {
            var bracklin = stack.pop();
            stack[stack.length - 1].tokens.push(bracklin);
            path = path.slice(0, -1);
            if (!path)
                break;
        }
    }
    if (lin.length !== n || stack.length !== 1) {
        console.log("INTERNAL ERROR: ", lin.length, "!=", n, "//", stack.length, "!=", 1);
    }
    return stack[0];
}
function get_subtrees(tree, path, subtrees) {
    if (!path)
        path = "";
    if (!subtrees)
        subtrees = [];
    subtrees.push({ 'path': path, 'tree': tree });
    for (var i = 0; i < tree.children.length; i++) {
        get_subtrees(tree.children[i], path + i, subtrees);
    }
    return subtrees;
}
function equal_phrases(L1, tree1, L2, tree2) {
    var equals = {};
    equals[L1] = {};
    equals[L2] = {};
    var subs1 = get_subtrees(tree1);
    var subs2 = get_subtrees(tree2);
    for (var i = 0; i < subs1.length; i++) {
        var s1 = subs1[i];
        for (var j = 0; j < subs2.length; j++) {
            var s2 = subs2[j];
            if (s1.tree.toString() == s2.tree.toString()) {
                equals[L1][s1.path] = s2.path;
                equals[L2][s2.path] = s1.path;
                break;
            }
        }
    }
    return equals;
}
function initialize_menus(lang, tree) {
    Utilities.START_TIMER(lang, true);
    var final_menus = {};
    var lin = Linearise(lang, tree);
    var all_phrase_paths_D = {};
    for (var i = 0; i < lin.length; i++) {
        var path = lin[i].path;
        for (var j = path.length; j > 0; j--) {
            all_phrase_paths_D[path.slice(0, j)] = true;
        }
    }
    var all_phrase_paths = Object.keys(all_phrase_paths_D);
    all_phrase_paths.sort(function (a, b) {
        return b.length - a.length;
    });
    var visited = {};
    visited[tree.toString()] = all_phrase_paths;
    Utilities.START_TIMER(lang + ":similars", true);
    var all_similars = {};
    var all_menus = {};
    var max_cost = 0;
    for (var i = 0; i < all_phrase_paths.length; i++) {
        var phrase_path = all_phrase_paths[i];
        var phrase_tree = tree.getSubtree(phrase_path);
        all_similars[phrase_path] = similar_trees(phrase_tree);
        max_cost = Math.max(max_cost, all_similars[phrase_path].length);
        all_menus[phrase_path] = {};
    }
    Utilities.STOP_TIMER(lang + ":similars");
    Utilities.START_TIMER(lang + ":menugroup", true);
    var ctr = 0;
    menuloop: for (var cost = 1; cost <= max_cost; cost++) {
        for (var i = 0; i < all_phrase_paths.length; i++) {
            var phrase_path = all_phrase_paths[i];
            var phrase_left = restrict_left(lin, phrase_path);
            var phrase_right = restrict_right(lin, phrase_path);
            var phrase_lin = lin.slice(phrase_left, phrase_right + 1);
            var menus = all_menus[phrase_path];
            var similars = all_similars[phrase_path];
            var simphrs = similars[cost];
            if (simphrs) {
                Utilities.START_TIMER(lang + ":cost-" + cost);
                itemloop: for (var simix = 0; simix < simphrs.length; simix++) {
                    if (Utilities.GET_TIMER(lang + ":menugroup") > MENU_TIMEOUT) {
                        console.log("TIMEOUT: breaking menuloop, cost " + cost + ", path " + phrase_path + ", menu items " + ctr);
                        Utilities.STOP_TIMER(lang + ":cost-" + cost);
                        break menuloop;
                    }
                    Utilities.START_TIMER(lang + ":visited");
                    var sim = simphrs[simix];
                    var simtree = tree.updateCopy(phrase_path, sim);
                    var stree = simtree.toString();
                    var visitlist = visited[stree];
                    if (!visitlist) {
                        visitlist = visited[stree] = [];
                    }
                    else {
                        for (var sti = 0; sti < visitlist.length; sti++) {
                            if (startswith(visitlist[sti], phrase_path)) {
                                Utilities.STOP_TIMER(lang + ":visited");
                                continue itemloop;
                            }
                        }
                    }
                    visitlist.push(phrase_path);
                    Utilities.STOP_TIMER(lang + ":visited");
                    Utilities.START_TIMER(lang + ":simlin");
                    var simlin = Linearise(lang, simtree);
                    Utilities.STOP_TIMER(lang + ":simlin");
                    var pleft = phrase_left;
                    var pright = phrase_right;
                    var sleft = restrict_left(simlin, phrase_path);
                    var sright = restrict_right(simlin, phrase_path);
                    while (pleft <= pright && sleft <= sright && lin[pleft].word == simlin[sleft].word) {
                        pleft++;
                        sleft++;
                    }
                    while (pleft <= pright && sleft <= sright && lin[pright].word == simlin[sright].word) {
                        pright--;
                        sright--;
                    }
                    var phrase_simlin = simlin.slice(sleft, sright + 1);
                    var slin = Utilities.hash(mapwords(phrase_simlin));
                    var plin = Utilities.hash(mapwords(lin.slice(pleft, pright + 1)));
                    if (plin == slin)
                        continue;
                    var pspan = pleft + ":" + pright;
                    // var pspan : string = Utilities.hash([pleft, pright]);
                    if (!menus[pspan])
                        menus[pspan] = {};
                    var current = menus[pspan][slin];
                    if (current && current.cost <= cost)
                        continue;
                    menus[pspan][slin] = {
                        'cost': cost,
                        'tree': simtree,
                        'lin': phrase_simlin,
                        'path': phrase_path,
                        'pleft': pleft,
                        'pright': pright,
                        'sleft': sleft,
                        'sright': sright
                    };
                    ctr++;
                }
                Utilities.STOP_TIMER(lang + ":cost-" + cost);
            }
        }
    }
    Utilities.STOP_TIMER(lang + ":menugroup");
    Utilities.START_TIMER(lang + ":finalize", true);
    for (var i = 0; i < all_phrase_paths.length; i++) {
        var phrase_path = all_phrase_paths[i];
        var ctr = 0;
        final_menus[phrase_path] = {};
        var menus = all_menus[phrase_path];
        for (var ppspan in menus) {
            var menu = menus[ppspan];
            var slins = Object.keys(menu);
            slins.sort(function (a, b) {
                var ma = menu[a], mb = menu[b];
                return ma.cost - mb.cost || (ma.sright - ma.sleft) - (mb.sright - mb.sleft) || mapwords(ma.lin).join().localeCompare(mapwords(mb.lin).join());
            });
            var menu_items = final_menus[phrase_path][ppspan] = [];
            for (var n = 0; n < slins.length; n++) {
                var item = menu[slins[n]];
                menu_items.push(item);
            }
        }
    }
    Utilities.STOP_TIMER(lang + ":finalize");
    Utilities.STOP_TIMER(lang);
    return final_menus;
}
function similar_trees(tree) {
    var all_pruned = prune_tree(tree);
    var result = [];
    for (var pi = 0; pi < all_pruned.length; pi++) {
        var pruned = all_pruned[pi];
        var fun = pruned.tree.node;
        var typ = pruned.tree.isMeta();
        if (!typ) {
            typ = FunTyping[fun].abscat;
        }
        simloop: for (var si = 0; si < GeneratedTrees[typ].length; si++) {
            var simtree = GeneratedTrees[typ][si];
            var cost = pruned.cost + simtree.cost;
            // this should be optimized
            var new_tree = simtree.tree;
            for (var simtyp in simtree.metas) {
                var simmetas = simtree.metas[simtyp];
                var prunedmetas = pruned.metas[simtyp];
                if (!prunedmetas || prunedmetas.length < simmetas.length) {
                    continue simloop;
                }
                for (var j = 0; j < prunedmetas.length; j++) {
                    if (j < simmetas.length) {
                        var old_path = prunedmetas[j].path;
                        var new_path = simmetas[j].path;
                        var sub = tree.getSubtree(old_path);
                        new_tree = new_tree.updateCopy(new_path, sub);
                    }
                    else {
                        cost += prunedmetas[j].cost;
                    }
                }
            }
            for (var extyp in pruned.metas) {
                if (!simtree.metas[extyp]) {
                    for (var j = 0; j < pruned.metas[extyp].length; j++) {
                        cost += pruned.metas[extyp][j].cost;
                    }
                }
            }
            if (!result[cost])
                result[cost] = [];
            result[cost].push(new_tree);
        }
    }
    return result;
}
function prune_tree(tree) {
    function prune(sub, path, depth) {
        if (depth >= MAX_DEPTH)
            return [];
        var fun = sub.node;
        var typ = FunTyping[fun].abscat;
        return prunechildren(sub, path, 0, depth + 1).concat({ 'tree': GFTree.meta(typ), 'cost': 0, 'metas': [{ 'path': path, 'type': typ, 'cost': sub.size() }] });
    }
    function prunechildren(sub, path, i, depth) {
        var result = [];
        if (i >= sub.children.length) {
            result.push({ 'tree': sub, 'cost': 1, 'metas': [] });
        }
        else {
            var allchild = prune(sub.children[i], path + i, depth);
            var allchildren = prunechildren(sub, path, i + 1, depth);
            for (var childix = 0; childix < allchild.length; childix++) {
                var child = allchild[childix];
                for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
                    var children = allchildren[childrenix];
                    result.push({ 'tree': sub.updateCopy(i + '', child.tree), 'cost': child.cost + children.cost, 'metas': child.metas.concat(children.metas) });
                }
            }
        }
        return result;
    }
    var result0 = prune(tree, "", 0);
    var result = [];
    for (var i = 0; i < result0.length; i++) {
        var metas = {};
        for (var j = 0; j < result0[i].metas.length; j++) {
            var meta = result0[i].metas[j];
            if (!metas[meta.type])
                metas[meta.type] = [];
            metas[meta.type].push(meta);
        }
        result.push({ tree: result0[i].tree, cost: result0[i].cost, metas: metas });
    }
    return result;
}
function gentrees(typ, path, depth, visited) {
    var result = [];
    if (contains_word(typ, visited))
        return result;
    if (depth == 0) {
        // generate a tree of the form: ?t
        result.push({ 'tree': GFTree.meta(typ), 'cost': 0, 'metas': [{ 'path': path, 'type': typ, cost: 0 }] });
    }
    var fun = "default_" + typ;
    var fargs = depth > 0 && FunTyping[fun];
    if (fargs && fargs.children) {
        if (fargs.children.length == 0) {
            result.push({ 'tree': new GFTree(fun, []), 'cost': 1, 'metas': [] });
        }
        else {
            console.warn("Internal error: you shouldn't have got here", fun, fargs);
        }
    }
    else {
        var newvisited = visited + " " + typ + " ";
        for (var argshash in TypingFuns[typ] || {}) {
            var funs = TypingFuns[typ][argshash];
            var targs = Utilities.unhash(argshash);
            var metatrees = [];
            var metas = [];
            for (var i = 0; i < targs.length; i++) {
                var argtyp = targs[i];
                metatrees.push(GFTree.meta(argtyp));
                metas.push({ 'path': path + i, 'type': argtyp, cost: 0 });
            }
            for (var funix = 0; funix < funs.length; funix++) {
                var fun = funs[funix];
                result.push({ 'tree': new GFTree(fun, metatrees), 'cost': 1, 'metas': metas });
            }
            for (var argix = 0; argix < targs.length; argix++) {
                var argtyp = targs[argix];
                var allchildren = gentrees(argtyp, path + argix, depth + 1, newvisited);
                for (var chix = 0; chix < allchildren.length; chix++) {
                    var child = allchildren[chix];
                    var childtrees = metatrees.slice(0, argix).concat([child.tree]).concat(metatrees.slice(argix + 1));
                    var childmetas = metas.slice(0, argix).concat(child.metas).concat(metas.slice(argix + 1));
                    for (var funix = 0; funix < funs.length; funix++) {
                        var fun = funs[funix];
                        result.push({ 'tree': new GFTree(fun, childtrees), 'cost': child.cost + 1, 'metas': childmetas });
                    }
                }
            }
        }
    }
    return result;
}
function generate_all_trees() {
    Utilities.START_TIMER("generate", true);
    var total_trees = 0;
    var generated_trees = {};
    for (var typ in TypingFuns) {
        var trees0 = gentrees(typ, '', 0, '');
        var trees = generated_trees[typ] = [];
        for (var i = 0; i < trees0.length; i++) {
            var metas = {};
            for (var j = 0; j < trees0[i].metas.length; j++) {
                var meta = trees0[i].metas[j];
                if (!metas[meta.type])
                    metas[meta.type] = [];
                metas[meta.type].push(meta);
            }
            var treeinfo = { tree: trees0[i].tree, cost: trees0[i].cost, metas: metas };
            trees.push(treeinfo);
        }
        total_trees += generated_trees[typ].length;
    }
    Utilities.STOP_TIMER("generate");
    return generated_trees;
}
function contains_word(word, words) {
    return new RegExp(" " + word + " ").test(words);
}
function restrict_left(lin, path) {
    for (var i = 0; i < lin.length; i++) {
        if (startswith(lin[i].path, path))
            return i;
    }
}
function restrict_right(lin, path) {
    for (var i = lin.length - 1; i >= 0; i--) {
        if (startswith(lin[i].path, path))
            return i;
    }
}
function linearise_abstract(tree) {
    // flattened abstract tree
    var lin = [];
    function lintree_(tree, path) {
        if (tree instanceof Array) {
            lin.push({ 'word': "(", 'path': path });
            for (var i in tree) {
                lintree_(tree[i], i > 0 ? path + i : path);
            }
            lin.push({ 'word': ")", 'path': path });
        }
        else {
            lin.push({ 'word': tree, 'path': path });
        }
    }
    lintree_(tree, "");
    return lin;
}
function mapwords(lin) {
    return lin.map(function (token) { return token.word; });
}
var Grasp = new GFGrammar(new GFAbstract("Start", { AdAP: new Type(["AdA", "AP"], "AP"), AdvNP: new Type(["NP", "Adv"], "NP"), AdvVP: new Type(["VP", "Adv"], "VP"), ComplVS: new Type(["GraspVS", "S"], "VP"), ComplVV: new Type(["GraspVV", "VP"], "VP"), DefArt: new Type([], "Quant"), DetCN: new Type(["Det", "CN"], "NP"), DetQuant: new Type(["Quant", "Num"], "Det"), IndefArt: new Type([], "Quant"), ModCN: new Type(["AP", "CN"], "CN"), Neg: new Type([], "Pol"), NumPl: new Type([], "Num"), NumSg: new Type([], "Num"), Past: new Type([], "Temp"), Perf: new Type([], "Temp"), Pos: new Type([], "Pol"), PredVP: new Type(["NP", "VP"], "Cl"), PrepNP: new Type(["Prep", "NP"], "Adv"), Pres: new Type([], "Temp"), QuestCl: new Type(["Cl"], "QCl"), QuestIAdv: new Type(["IAdv", "Cl"], "QCl"), QuestVP: new Type(["IP", "VP"], "QCl"), StartUtt: new Type(["Utt"], "Start"), UseA: new Type(["A"], "AP"), UseAdverb: new Type(["Adverb"], "Adv"), UseCl: new Type(["Temp", "Pol", "Cl"], "S"), UseN: new Type(["N"], "CN"), UsePN: new Type(["PN"], "NP"), UsePron: new Type(["Pron"], "NP"), UseV: new Type(["GraspV"], "VP"), UseVA: new Type(["GraspV", "AP"], "VP"), UseVN: new Type(["GraspV", "NP"], "VP"), UseVNA: new Type(["GraspV", "NP", "AP"], "VP"), UseVNN: new Type(["GraspV", "NP", "NP"], "VP"), UttS: new Type(["S"], "Utt"), VerbVS: new Type(["GraspVS"], "GraspV"), VerbVV: new Type(["GraspVV"], "GraspV"), although_Subj: new Type([], "Subj"), and_Conj: new Type([], "Conj"), animal_N: new Type([], "N"), apple_N: new Type([], "N"), because_Subj: new Type([], "Subj"), beer_N: new Type([], "N"), berlin_PN: new Type([], "PN"), big_A: new Type([], "A"), bike_N: new Type([], "N"), bird_N: new Type([], "N"), black_A: new Type([], "A"), blue_A: new Type([], "A"), boat_N: new Type([], "N"), book_N: new Type([], "N"), boy_N: new Type([], "N"), break_V: new Type([], "GraspV"), britain_PN: new Type([], "PN"), buy_V: new Type([], "GraspV"), by8agent_Prep: new Type([], "Prep"), car_N: new Type([], "N"), cat_N: new Type([], "N"), chair_N: new Type([], "N"), copula: new Type([], "GraspV"), cow_N: new Type([], "N"), default_A: new Type([], "A"), default_N: new Type([], "N"), default_NP: new Type([], "NP"), default_PN: new Type([], "PN"), dog_N: new Type([], "N"), drink_V: new Type([], "GraspV"), eat_V: new Type([], "GraspV"), every_Det: new Type([], "Det"), everywhere_Adverb: new Type([], "Adverb"), fish_N: new Type([], "N"), fly_V: new Type([], "GraspV"), foot_N: new Type([], "N"), forest_N: new Type([], "N"), fruit_N: new Type([], "N"), germany_PN: new Type([], "PN"), girl_N: new Type([], "N"), gothenburg_PN: new Type([], "PN"), green_A: new Type([], "A"), hair_N: new Type([], "N"), hand_N: new Type([], "N"), hat_N: new Type([], "N"), hate_V: new Type([], "GraspV"), he_Pron: new Type([], "Pron"), head_N: new Type([], "N"), hear_V: new Type([], "GraspV"), heavy_A: new Type([], "A"), here_Adverb: new Type([], "Adverb"), hope_VS: new Type([], "GraspVS"), horse_N: new Type([], "N"), house_N: new Type([], "N"), hunt_V: new Type([], "GraspV"), i_Pron: new Type([], "Pron"), in_Prep: new Type([], "Prep"), john_PN: new Type([], "PN"), know_VQ: new Type([], "GraspVQ"), know_VS: new Type([], "GraspVS"), like_V: new Type([], "GraspV"), listen_V: new Type([], "GraspV"), london_PN: new Type([], "PN"), long_A: new Type([], "A"), man_N: new Type([], "N"), mary_PN: new Type([], "PN"), milk_N: new Type([], "N"), or_Conj: new Type([], "Conj"), person_N: new Type([], "N"), possess_Prep: new Type([], "Prep"), red_A: new Type([], "A"), run_V: new Type([], "GraspV"), say_VS: new Type([], "GraspVS"), see_V: new Type([], "GraspV"), she_Pron: new Type([], "Pron"), shirt_N: new Type([], "N"), shoe_N: new Type([], "N"), short_A: new Type([], "A"), sit_V: new Type([], "GraspV"), sleep_V: new Type([], "GraspV"), small_A: new Type([], "A"), so_AdA: new Type([], "AdA"), somewhere_Adverb: new Type([], "Adverb"), stone_N: new Type([], "N"), sweden_PN: new Type([], "PN"), swim_V: new Type([], "GraspV"), table_N: new Type([], "N"), that_Quant: new Type([], "Quant"), there_Adverb: new Type([], "Adverb"), they_Pron: new Type([], "Pron"), thick_A: new Type([], "A"), thin_A: new Type([], "A"), this_Quant: new Type([], "Quant"), throw_V: new Type([], "GraspV"), too_AdA: new Type([], "AdA"), tree_N: new Type([], "N"), very_AdA: new Type([], "AdA"), walk_V: new Type([], "GraspV"), want_VV: new Type([], "GraspVV"), watch_V: new Type([], "GraspV"), water_N: new Type([], "N"), we_Pron: new Type([], "Pron"), when_IAdv: new Type([], "IAdv"), when_Subj: new Type([], "Subj"), where_IAdv: new Type([], "IAdv"), white_A: new Type([], "A"), whoSg_IP: new Type([], "IP"), why_IAdv: new Type([], "IAdv"), wine_N: new Type([], "N"), with_Prep: new Type([], "Prep"), woman_N: new Type([], "N"), wonder_VQ: new Type([], "GraspVQ"), yellow_A: new Type([], "A") }), { GraspEng: new GFConcrete({}, { 0: [new Apply(157, []), new Apply(158, []), new Apply(159, []), new Apply(160, []), new Apply(161, []), new Apply(162, []), new Apply(163, []), new Apply(164, []), new Apply(165, []), new Apply(166, []), new Apply(167, []), new Apply(168, []), new Apply(169, []), new Apply(170, [])], 3: [new Apply(171, [new PArg(4), new PArg(3)]), new Apply(172, [new PArg(0)])], 4: [new Apply(173, []), new Apply(174, []), new Apply(175, [])], 7: [new Apply(176, [new PArg(93), new PArg(184)]), new Apply(177, [new PArg(8)])], 8: [new Apply(178, []), new Apply(179, []), new Apply(180, []), new Apply(181, [])], 12: [new Apply(182, [new PArg(3), new PArg(12)]), new Apply(183, [new PArg(59)])], 13: [new Apply(183, [new PArg(60)]), new Apply(184, [new PArg(3), new PArg(13)])], 14: [new Apply(183, [new PArg(61)]), new Apply(185, [new PArg(3), new PArg(14)])], 17: [new Apply(186, [new PArg(68), new PArg(175)]), new Apply(187, [new PArg(69), new PArg(175)]), new Apply(188, [new PArg(72), new PArg(175)]), new Apply(189, [new PArg(73), new PArg(175)]), new Apply(190, [new PArg(74), new PArg(175)]), new Apply(191, [new PArg(75), new PArg(175)])], 20: [new Apply(192, [])], 21: [new Apply(193, [])], 24: [new Apply(194, [new PArg(104), new PArg(76)]), new Apply(195, [])], 26: [new Apply(196, [new PArg(104), new PArg(78)])], 34: [new Apply(197, [new PArg(186)]), new Apply(198, [new PArg(188)]), new Apply(199, []), new Apply(200, []), new Apply(201, []), new Apply(202, []), new Apply(203, []), new Apply(204, []), new Apply(205, []), new Apply(206, []), new Apply(207, []), new Apply(208, []), new Apply(209, []), new Apply(210, []), new Apply(211, []), new Apply(212, []), new Apply(213, []), new Apply(214, []), new Apply(215, []), new Apply(216, []), new Apply(217, [])], 36: [new Apply(218, []), new Apply(219, [])], 40: [new Apply(220, []), new Apply(221, []), new Apply(222, [])], 46: [new Apply(223, [])], 50: [new Apply(224, []), new Apply(225, []), new Apply(226, [])], 54: [new Apply(227, [])], 59: [new Apply(228, []), new Apply(229, []), new Apply(230, []), new Apply(231, []), new Apply(232, []), new Apply(233, []), new Apply(234, []), new Apply(235, []), new Apply(236, []), new Apply(237, []), new Apply(238, []), new Apply(239, []), new Apply(240, []), new Apply(241, []), new Apply(242, []), new Apply(243, []), new Apply(244, []), new Apply(245, []), new Apply(246, []), new Apply(247, []), new Apply(248, []), new Apply(249, []), new Apply(250, []), new Apply(251, []), new Apply(252, []), new Apply(253, []), new Apply(254, []), new Apply(255, []), new Apply(256, []), new Apply(257, []), new Apply(258, [])], 60: [new Apply(259, []), new Apply(260, []), new Apply(261, [])], 61: [new Apply(262, []), new Apply(263, [])], 68: [new Apply(264, [new PArg(68), new PArg(7)]), new Apply(265, [new PArg(94)])], 69: [new Apply(264, [new PArg(69), new PArg(7)]), new Apply(265, [new PArg(95)])], 72: [new Apply(264, [new PArg(72), new PArg(7)]), new Apply(266, [new PArg(181), new PArg(12)]), new Apply(267, [new PArg(84)]), new Apply(268, [])], 73: [new Apply(264, [new PArg(73), new PArg(7)]), new Apply(265, [new PArg(99)]), new Apply(266, [new PArg(181), new PArg(13)]), new Apply(267, [new PArg(85)])], 74: [new Apply(264, [new PArg(74), new PArg(7)]), new Apply(265, [new PArg(100)]), new Apply(266, [new PArg(181), new PArg(14)]), new Apply(267, [new PArg(86)])], 75: [new Apply(264, [new PArg(75), new PArg(7)]), new Apply(265, [new PArg(101)]), new Apply(269, [new PArg(182), new PArg(183)])], 76: [new Apply(270, [])], 78: [new Apply(271, [])], 84: [new Apply(272, []), new Apply(273, []), new Apply(274, []), new Apply(275, []), new Apply(276, []), new Apply(277, []), new Apply(278, [])], 85: [new Apply(279, [])], 86: [new Apply(280, [])], 88: [new Apply(281, [])], 90: [new Apply(282, [])], 93: [new Apply(283, []), new Apply(284, []), new Apply(285, []), new Apply(286, [])], 94: [new Apply(287, [])], 95: [new Apply(288, [])], 99: [new Apply(289, [])], 100: [new Apply(290, [])], 101: [new Apply(291, [])], 102: [new Apply(292, [new PArg(17)]), new Apply(293, [new PArg(50), new PArg(17)]), new Apply(294, [new PArg(54), new PArg(175)])], 104: [new Apply(295, []), new Apply(296, []), new Apply(297, []), new Apply(298, [])], 122: [new Apply(299, [new PArg(127), new PArg(88), new PArg(17)]), new Apply(300, [new PArg(129), new PArg(88), new PArg(17)]), new Apply(301, [new PArg(128), new PArg(88), new PArg(17)]), new Apply(302, [new PArg(127), new PArg(90), new PArg(17)]), new Apply(303, [new PArg(129), new PArg(90), new PArg(17)]), new Apply(304, [new PArg(128), new PArg(90), new PArg(17)])], 125: [new Apply(305, [new PArg(140)])], 126: [new Apply(306, []), new Apply(307, []), new Apply(308, [])], 127: [new Apply(309, [])], 128: [new Apply(310, [])], 129: [new Apply(311, [])], 140: [new Apply(312, [new PArg(122)])], 161: [new Apply(313, [new PArg(175), new PArg(7)]), new Apply(314, [new PArg(176), new PArg(122)]), new Apply(315, [new PArg(179), new PArg(175)]), new Apply(316, [new PArg(34), new PArg(185)]), new Apply(317, [new PArg(34), new PArg(184)]), new Apply(318, [new PArg(34), new PArg(184), new PArg(185)]), new Apply(319, [new PArg(34), new PArg(184), new PArg(184)])], 162: [new Apply(320, [new PArg(34)])], 175: [new Coerce(161), new Coerce(162)], 176: [new Coerce(40)], 179: [new Coerce(46)], 181: [new Coerce(24)], 182: [new Coerce(26)], 183: [new Coerce(12), new Coerce(13), new Coerce(14)], 184: [new Coerce(68), new Coerce(69), new Coerce(72), new Coerce(73), new Coerce(74), new Coerce(75)], 185: [new Coerce(3)], 186: [new Coerce(40)], 188: [new Coerce(46)] }, [new CncFun("'lindef A'", [0]), new CncFun("'lindef A2'", []), new CncFun("'lindef AP'", [0, 0, 0, 0, 0, 0]), new CncFun("'lindef AdA'", [0]), new CncFun("'lindef AdN'", []), new CncFun("'lindef AdV'", []), new CncFun("'lindef Adv'", [0]), new CncFun("'lindef Adverb'", [0]), new CncFun("'lindef Ant'", []), new CncFun("'lindef CAdv'", []), new CncFun("'lindef CN'", [0, 0]), new CncFun("'lindef Card'", []), new CncFun("'lindef Cl'", [0, 0, 0, 0, 0, 0]), new CncFun("'lindef ClSlash'", []), new CncFun("'lindef Comp'", []), new CncFun("'lindef Conj'", []), new CncFun("'lindef DAP'", []), new CncFun("'lindef Det'", [0]), new CncFun("'lindef Digits'", []), new CncFun("'lindef GraspV'", [0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef GraspVQ'", []), new CncFun("'lindef GraspVS'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef GraspVV'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef IAdv'", []), new CncFun("'lindef IComp'", []), new CncFun("'lindef IDet'", []), new CncFun("'lindef IP'", []), new CncFun("'lindef IQuant'", []), new CncFun("'lindef Imp'", []), new CncFun("'lindef Interj'", []), new CncFun("'lindef N'", [0, 0]), new CncFun("'lindef N2'", []), new CncFun("'lindef N3'", []), new CncFun("'lindef NP'", [0, 0]), new CncFun("'lindef Num'", [0]), new CncFun("'lindef Numeral'", []), new CncFun("'lindef Ord'", []), new CncFun("'lindef PConj'", []), new CncFun("'lindef PN'", [0]), new CncFun("'lindef Phr'", []), new CncFun("'lindef Pol'", [0]), new CncFun("'lindef Predet'", []), new CncFun("'lindef Prep'", [0]), new CncFun("'lindef Pron'", [0, 0]), new CncFun("'lindef QCl'", []), new CncFun("'lindef QS'", []), new CncFun("'lindef Quant'", [0, 0]), new CncFun("'lindef RCl'", []), new CncFun("'lindef RP'", []), new CncFun("'lindef RS'", []), new CncFun("'lindef S'", [0]), new CncFun("'lindef SC'", []), new CncFun("'lindef SSlash'", []), new CncFun("'lindef Start'", [0]), new CncFun("'lindef Subj'", []), new CncFun("'lindef Temp'", [0]), new CncFun("'lindef Tense'", []), new CncFun("'lindef Text'", []), new CncFun("'lindef Utt'", [0]), new CncFun("'lindef V'", []), new CncFun("'lindef V2'", []), new CncFun("'lindef V2A'", []), new CncFun("'lindef V2Q'", []), new CncFun("'lindef V2S'", []), new CncFun("'lindef V2V'", []), new CncFun("'lindef V3'", []), new CncFun("'lindef VA'", []), new CncFun("'lindef VP'", [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1, 0, 1, 2, 1, 0, 1, 3, 1, 0, 1, 3, 1, 0, 1, 3, 1, 0, 1, 2, 1, 0, 1, 4, 1, 0, 1, 4, 1, 0, 1, 5, 1, 0, 1, 5, 1, 0, 1, 5, 1, 0, 1, 4, 1, 0, 1, 6, 1, 0, 1, 6, 1, 0, 1, 7, 1, 0, 1, 7, 1, 0, 1, 7, 1, 0, 1, 6, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 8, 1, 0, 1, 8, 1, 0, 1, 8, 1, 0, 1, 8, 1, 0, 1, 8, 1, 0, 1, 8, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]), new CncFun("'lindef VPSlash'", []), new CncFun("'lindef VQ'", []), new CncFun("'lindef VS'", []), new CncFun("'lindef VV'", []), new CncFun("'lindef Voc'", []), new CncFun("'lindef A'", [9]), new CncFun("'lindef A2'", [10]), new CncFun("'lindef AP'", [9]), new CncFun("'lindef AdA'", [9]), new CncFun("'lindef AdN'", [11]), new CncFun("'lindef AdV'", [11]), new CncFun("'lindef Adv'", [9]), new CncFun("'lindef Adverb'", [9]), new CncFun("'lindef Ant'", [11]), new CncFun("'lindef CAdv'", [11]), new CncFun("'lindef CN'", [9]), new CncFun("'lindef Card'", [11]), new CncFun("'lindef Cl'", [9]), new CncFun("'lindef ClSlash'", [10]), new CncFun("'lindef Comp'", [11]), new CncFun("'lindef Conj'", [10]), new CncFun("'lindef DAP'", [11]), new CncFun("'lindef Det'", [9]), new CncFun("'lindef Digits'", [11]), new CncFun("'lindef GraspV'", [9]), new CncFun("'lindef GraspVQ'", [11]), new CncFun("'lindef GraspVS'", [9]), new CncFun("'lindef GraspVV'", [9]), new CncFun("'lindef IAdv'", [11]), new CncFun("'lindef IComp'", [11]), new CncFun("'lindef IDet'", [11]), new CncFun("'lindef IP'", [11]), new CncFun("'lindef IQuant'", [11]), new CncFun("'lindef Imp'", [11]), new CncFun("'lindef Interj'", [11]), new CncFun("'lindef N'", [9]), new CncFun("'lindef N2'", [10]), new CncFun("'lindef N3'", [12]), new CncFun("'lindef NP'", [9]), new CncFun("'lindef Num'", [9]), new CncFun("'lindef Numeral'", [11]), new CncFun("'lindef Ord'", [11]), new CncFun("'lindef PConj'", [11]), new CncFun("'lindef PN'", [9]), new CncFun("'lindef Phr'", [11]), new CncFun("'lindef Pol'", [9]), new CncFun("'lindef Predet'", [11]), new CncFun("'lindef Prep'", [9]), new CncFun("'lindef Pron'", [9]), new CncFun("'lindef QCl'", [11]), new CncFun("'lindef QS'", [11]), new CncFun("'lindef Quant'", [9]), new CncFun("'lindef RCl'", [11]), new CncFun("'lindef RP'", [11]), new CncFun("'lindef RS'", [11]), new CncFun("'lindef S'", [9]), new CncFun("'lindef SC'", [11]), new CncFun("'lindef SSlash'", [10]), new CncFun("'lindef Start'", [9]), new CncFun("'lindef Subj'", [11]), new CncFun("'lindef Temp'", [9]), new CncFun("'lindef Tense'", [11]), new CncFun("'lindef Text'", [11]), new CncFun("'lindef Utt'", [9]), new CncFun("'lindef V'", [10]), new CncFun("'lindef V'", [13]), new CncFun("'lindef V2'", [12]), new CncFun("'lindef V2'", [14]), new CncFun("'lindef V2A'", [12]), new CncFun("'lindef V2A'", [14]), new CncFun("'lindef V2Q'", [12]), new CncFun("'lindef V2Q'", [14]), new CncFun("'lindef V2S'", [12]), new CncFun("'lindef V2S'", [14]), new CncFun("'lindef V2V'", [10]), new CncFun("'lindef V2V'", [13]), new CncFun("'lindef V3'", [15]), new CncFun("'lindef V3'", [16]), new CncFun("'lindef VA'", [10]), new CncFun("'lindef VA'", [13]), new CncFun("'lindef VP'", [17]), new CncFun("'lindef VPSlash'", [18]), new CncFun("'lindef VQ'", [10]), new CncFun("'lindef VQ'", [13]), new CncFun("'lindef VS'", [10]), new CncFun("'lindef VS'", [13]), new CncFun("'lindef VV'", [11]), new CncFun("'lindef VV'", [10]), new CncFun("'lindef Voc'", [11]), new CncFun("big_A", [19]), new CncFun("black_A", [20]), new CncFun("blue_A", [21]), new CncFun("default_A", [22]), new CncFun("green_A", [23]), new CncFun("heavy_A", [24]), new CncFun("long_A", [25]), new CncFun("red_A", [26]), new CncFun("short_A", [27]), new CncFun("small_A", [28]), new CncFun("thick_A", [29]), new CncFun("thin_A", [30]), new CncFun("white_A", [31]), new CncFun("yellow_A", [32]), new CncFun("AdAP", [33, 34, 35, 36, 37, 38]), new CncFun("UseA", [9, 9, 9, 9, 9, 9]), new CncFun("so_AdA", [39]), new CncFun("too_AdA", [40]), new CncFun("very_AdA", [41]), new CncFun("PrepNP", [34]), new CncFun("UseAdverb", [9]), new CncFun("everywhere_Adverb", [42]), new CncFun("here_Adverb", [43]), new CncFun("somewhere_Adverb", [44]), new CncFun("there_Adverb", [45]), new CncFun("ModCN", [46, 47]), new CncFun("UseN", [9, 48]), new CncFun("ModCN", [49, 47]), new CncFun("ModCN", [50, 47]), new CncFun("PredVP", [51, 52, 53, 54, 55, 56]), new CncFun("PredVP", [57, 58, 59, 60, 61, 62]), new CncFun("PredVP", [63, 64, 65, 66, 67, 68]), new CncFun("PredVP", [69, 70, 71, 72, 73, 74]), new CncFun("PredVP", [75, 76, 77, 78, 79, 80]), new CncFun("PredVP", [81, 82, 83, 84, 85, 86]), new CncFun("or_Conj", []), new CncFun("and_Conj", []), new CncFun("DetQuant", [33]), new CncFun("every_Det", [87]), new CncFun("DetQuant", [88]), new CncFun("VerbVS", [9, 48, 89, 90, 91, 92, 93]), new CncFun("VerbVV", [9, 48, 89, 90, 91, 92, 93]), new CncFun("break_V", [94, 95, 96, 97, 1, 1, 1]), new CncFun("buy_V", [98, 99, 100, 100, 1, 1, 1]), new CncFun("copula", [101, 102, 103, 104, 1, 1, 1]), new CncFun("drink_V", [105, 106, 107, 108, 1, 1, 1]), new CncFun("eat_V", [109, 110, 111, 112, 1, 1, 1]), new CncFun("fly_V", [113, 114, 115, 116, 1, 1, 1]), new CncFun("hate_V", [117, 118, 119, 119, 1, 1, 1]), new CncFun("hear_V", [120, 121, 122, 122, 1, 1, 1]), new CncFun("hunt_V", [123, 124, 125, 125, 1, 1, 1]), new CncFun("like_V", [126, 127, 128, 128, 1, 1, 1]), new CncFun("listen_V", [129, 130, 131, 131, 1, 132, 1]), new CncFun("run_V", [133, 134, 133, 135, 1, 1, 1]), new CncFun("see_V", [136, 137, 138, 139, 1, 1, 1]), new CncFun("sit_V", [140, 141, 142, 142, 1, 1, 1]), new CncFun("sleep_V", [143, 144, 145, 145, 1, 1, 1]), new CncFun("swim_V", [146, 147, 148, 149, 1, 1, 1]), new CncFun("throw_V", [150, 151, 152, 153, 1, 1, 1]), new CncFun("walk_V", [154, 155, 156, 156, 1, 1, 1]), new CncFun("watch_V", [157, 158, 159, 159, 1, 1, 1]), new CncFun("know_VQ", []), new CncFun("wonder_VQ", []), new CncFun("hope_VS", [160, 161, 162, 162, 1, 1, 1, 160, 161, 162, 162, 1]), new CncFun("know_VS", [163, 164, 165, 166, 1, 1, 1, 163, 164, 165, 166, 1]), new CncFun("say_VS", [167, 168, 169, 169, 1, 1, 1, 167, 168, 169, 169, 1]), new CncFun("want_VV", [170, 171, 172, 172, 1, 1, 1, 170, 171, 172, 172, 1]), new CncFun("when_IAdv", []), new CncFun("where_IAdv", []), new CncFun("why_IAdv", []), new CncFun("whoSg_IP", []), new CncFun("animal_N", [173, 174]), new CncFun("apple_N", [175, 176]), new CncFun("beer_N", [177, 178]), new CncFun("bike_N", [179, 180]), new CncFun("bird_N", [181, 182]), new CncFun("boat_N", [183, 184]), new CncFun("book_N", [185, 186]), new CncFun("car_N", [187, 188]), new CncFun("cat_N", [189, 190]), new CncFun("chair_N", [191, 192]), new CncFun("cow_N", [193, 194]), new CncFun("default_N", [195, 196]), new CncFun("dog_N", [197, 198]), new CncFun("fish_N", [199, 199]), new CncFun("foot_N", [200, 201]), new CncFun("forest_N", [202, 203]), new CncFun("fruit_N", [204, 204]), new CncFun("hair_N", [205, 206]), new CncFun("hand_N", [207, 208]), new CncFun("hat_N", [209, 210]), new CncFun("head_N", [211, 212]), new CncFun("horse_N", [213, 214]), new CncFun("house_N", [215, 216]), new CncFun("milk_N", [217, 218]), new CncFun("shirt_N", [219, 220]), new CncFun("shoe_N", [221, 222]), new CncFun("stone_N", [223, 224]), new CncFun("table_N", [225, 226]), new CncFun("tree_N", [227, 228]), new CncFun("water_N", [229, 230]), new CncFun("wine_N", [231, 232]), new CncFun("boy_N", [233, 234]), new CncFun("man_N", [235, 236]), new CncFun("person_N", [237, 238]), new CncFun("girl_N", [239, 240]), new CncFun("woman_N", [241, 242]), new CncFun("AdvNP", [33, 88]), new CncFun("UsePron", [9, 48]), new CncFun("DetCN", [33, 33]), new CncFun("UsePN", [9, 9]), new CncFun("default_NP", [243, 243]), new CncFun("DetCN", [34, 34]), new CncFun("NumSg", [1]), new CncFun("NumPl", [1]), new CncFun("berlin_PN", [244]), new CncFun("britain_PN", [245]), new CncFun("default_PN", [246]), new CncFun("germany_PN", [247]), new CncFun("gothenburg_PN", [248]), new CncFun("london_PN", [249]), new CncFun("sweden_PN", [250]), new CncFun("john_PN", [251]), new CncFun("mary_PN", [252]), new CncFun("Pos", [1]), new CncFun("Neg", [1]), new CncFun("by8agent_Prep", [253]), new CncFun("in_Prep", [254]), new CncFun("possess_Prep", [255]), new CncFun("with_Prep", [256]), new CncFun("i_Pron", [257, 258]), new CncFun("we_Pron", [259, 260]), new CncFun("he_Pron", [261, 262]), new CncFun("she_Pron", [263, 264]), new CncFun("they_Pron", [265, 266]), new CncFun("QuestCl", []), new CncFun("QuestIAdv", []), new CncFun("QuestVP", []), new CncFun("DefArt", [267, 267]), new CncFun("IndefArt", [268, 1]), new CncFun("that_Quant", [269, 270]), new CncFun("this_Quant", [271, 272]), new CncFun("UseCl", [273]), new CncFun("UseCl", [274]), new CncFun("UseCl", [275]), new CncFun("UseCl", [276]), new CncFun("UseCl", [277]), new CncFun("UseCl", [278]), new CncFun("StartUtt", [9]), new CncFun("although_Subj", []), new CncFun("because_Subj", []), new CncFun("when_Subj", []), new CncFun("Pres", [1]), new CncFun("Perf", [1]), new CncFun("Past", [1]), new CncFun("UttS", [279]), new CncFun("AdvVP", [9, 48, 89, 90, 91, 92, 93, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431]), new CncFun("ComplVS", [1, 1, 280, 1, 1, 1, 280, 1, 1, 1, 281, 1, 1, 1, 281, 1, 1, 1, 281, 1, 1, 1, 280, 1, 1, 2, 1, 280, 1, 2, 1, 280, 1, 3, 1, 280, 1, 3, 1, 280, 1, 3, 1, 280, 1, 2, 1, 280, 1, 4, 1, 282, 1, 4, 1, 282, 1, 5, 1, 282, 1, 5, 1, 282, 1, 5, 1, 282, 1, 4, 1, 282, 1, 6, 1, 282, 1, 6, 1, 282, 1, 7, 1, 282, 1, 7, 1, 282, 1, 7, 1, 282, 1, 6, 1, 282, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 1, 1, 1, 1, 1, 432, 280, 284, 1, 1, 1, 1, 1, 1]), new CncFun("ComplVV", [1, 1, 280, 1, 1, 1, 280, 1, 1, 1, 281, 1, 1, 1, 281, 1, 1, 1, 281, 1, 1, 1, 280, 1, 1, 2, 1, 280, 1, 2, 1, 280, 1, 3, 1, 280, 1, 3, 1, 280, 1, 3, 1, 280, 1, 2, 1, 280, 1, 4, 1, 282, 1, 4, 1, 282, 1, 5, 1, 282, 1, 5, 1, 282, 1, 5, 1, 282, 1, 4, 1, 282, 1, 6, 1, 282, 1, 6, 1, 282, 1, 7, 1, 282, 1, 7, 1, 282, 1, 7, 1, 282, 1, 6, 1, 282, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 1, 283, 1, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 8, 1, 280, 1, 1, 1, 1, 1, 1, 1, 280, 284, 433, 434, 435, 436, 437, 438]), new CncFun("UseVA", [1, 1, 9, 1, 1, 1, 9, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 9, 1, 1, 2, 1, 9, 1, 2, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 2, 1, 9, 1, 4, 1, 89, 1, 4, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 4, 1, 89, 1, 6, 1, 89, 1, 6, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 6, 1, 89, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 1, 1, 1, 1, 1, 1, 9, 93, 439, 440, 441, 442, 443, 444]), new CncFun("UseVN", [1, 1, 9, 1, 1, 1, 9, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 9, 1, 1, 2, 1, 9, 1, 2, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 2, 1, 9, 1, 4, 1, 89, 1, 4, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 4, 1, 89, 1, 6, 1, 89, 1, 6, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 6, 1, 89, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 1, 1, 1, 1, 1, 1, 9, 93, 445, 445, 445, 445, 445, 445]), new CncFun("UseVNA", [1, 1, 9, 1, 1, 1, 9, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 9, 1, 1, 2, 1, 9, 1, 2, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 2, 1, 9, 1, 4, 1, 89, 1, 4, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 4, 1, 89, 1, 6, 1, 89, 1, 6, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 6, 1, 89, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 1, 1, 1, 1, 1, 1, 9, 93, 446, 447, 448, 449, 450, 451]), new CncFun("UseVNN", [1, 1, 9, 1, 1, 1, 9, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 9, 1, 1, 2, 1, 9, 1, 2, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 2, 1, 9, 1, 4, 1, 89, 1, 4, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 4, 1, 89, 1, 6, 1, 89, 1, 6, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 6, 1, 89, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 1, 1, 1, 1, 1, 1, 9, 93, 452, 452, 452, 452, 452, 452]), new CncFun("UseV", [1, 1, 9, 1, 1, 1, 9, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 48, 1, 1, 1, 9, 1, 1, 2, 1, 9, 1, 2, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 3, 1, 9, 1, 2, 1, 9, 1, 4, 1, 89, 1, 4, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 5, 1, 89, 1, 4, 1, 89, 1, 6, 1, 89, 1, 6, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 7, 1, 89, 1, 6, 1, 89, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 1, 90, 1, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 8, 1, 9, 1, 1, 1, 1, 1, 1, 1, 9, 93, 1, 1, 1, 1, 1, 1])], [[new SymLit(0, 0)], [], [new SymKS("don't")], [new SymKS("doesn't")], [new SymKS("have")], [new SymKS("has")], [new SymKS("haven't")], [new SymKS("hasn't")], [new SymKS("didn't")], [new SymCat(0, 0)], [new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymKS("itself")], [new SymCat(0, -1), new SymCat(0, -1), new SymKS("itself"), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymKS("itself"), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, 146), new SymCat(0, 151), new SymCat(0, 152), new SymCat(0, 155), new SymCat(0, 150)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("big")], [new SymKS("black")], [new SymKS("blue")], [new SymKS("[adjective]")], [new SymKS("green")], [new SymKS("heavy")], [new SymKS("long")], [new SymKS("red")], [new SymKS("short")], [new SymKS("small")], [new SymKS("thick")], [new SymKS("thin")], [new SymKS("white")], [new SymKS("yellow")], [new SymCat(0, 0), new SymCat(1, 0)], [new SymCat(0, 0), new SymCat(1, 1)], [new SymCat(0, 0), new SymCat(1, 2)], [new SymCat(0, 0), new SymCat(1, 3)], [new SymCat(0, 0), new SymCat(1, 4)], [new SymCat(0, 0), new SymCat(1, 5)], [new SymKS("so")], [new SymKS("too")], [new SymKS("very")], [new SymKS("everywhere")], [new SymKS("here")], [new SymKS("somewhere")], [new SymKS("there")], [new SymCat(0, 2), new SymCat(1, 0)], [new SymCat(0, 5), new SymCat(1, 1)], [new SymCat(0, 1)], [new SymCat(0, 3), new SymCat(1, 0)], [new SymCat(0, 4), new SymCat(1, 0)], [new SymCat(0, 0), new SymCat(1, 1), new SymCat(1, 0), new SymCat(1, 144), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 144), new SymCat(1, 26), new SymCat(1, 27), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 49), new SymCat(1, 48), new SymCat(1, 144), new SymCat(1, 50), new SymCat(1, 51), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 73), new SymCat(1, 72), new SymCat(1, 144), new SymCat(1, 74), new SymCat(1, 75), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 97), new SymCat(1, 96), new SymCat(1, 144), new SymCat(1, 98), new SymCat(1, 99), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 121), new SymCat(1, 120), new SymCat(1, 144), new SymCat(1, 122), new SymCat(1, 123), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 5), new SymCat(1, 4), new SymCat(1, 145), new SymCat(1, 6), new SymCat(1, 7), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 29), new SymCat(1, 28), new SymCat(1, 145), new SymCat(1, 30), new SymCat(1, 31), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 53), new SymCat(1, 52), new SymCat(1, 145), new SymCat(1, 54), new SymCat(1, 55), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 77), new SymCat(1, 76), new SymCat(1, 145), new SymCat(1, 78), new SymCat(1, 79), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 101), new SymCat(1, 100), new SymCat(1, 145), new SymCat(1, 102), new SymCat(1, 103), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 125), new SymCat(1, 124), new SymCat(1, 145), new SymCat(1, 126), new SymCat(1, 127), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 9), new SymCat(1, 8), new SymCat(1, 146), new SymCat(1, 10), new SymCat(1, 11), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 33), new SymCat(1, 32), new SymCat(1, 146), new SymCat(1, 34), new SymCat(1, 35), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 57), new SymCat(1, 56), new SymCat(1, 146), new SymCat(1, 58), new SymCat(1, 59), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 81), new SymCat(1, 80), new SymCat(1, 146), new SymCat(1, 82), new SymCat(1, 83), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 105), new SymCat(1, 104), new SymCat(1, 146), new SymCat(1, 106), new SymCat(1, 107), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 129), new SymCat(1, 128), new SymCat(1, 146), new SymCat(1, 130), new SymCat(1, 131), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 13), new SymCat(1, 12), new SymCat(1, 147), new SymCat(1, 14), new SymCat(1, 15), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 37), new SymCat(1, 36), new SymCat(1, 147), new SymCat(1, 38), new SymCat(1, 39), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 61), new SymCat(1, 60), new SymCat(1, 147), new SymCat(1, 62), new SymCat(1, 63), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 85), new SymCat(1, 84), new SymCat(1, 147), new SymCat(1, 86), new SymCat(1, 87), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 109), new SymCat(1, 108), new SymCat(1, 147), new SymCat(1, 110), new SymCat(1, 111), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 133), new SymCat(1, 132), new SymCat(1, 147), new SymCat(1, 134), new SymCat(1, 135), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 17), new SymCat(1, 16), new SymCat(1, 148), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 41), new SymCat(1, 40), new SymCat(1, 148), new SymCat(1, 42), new SymCat(1, 43), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 65), new SymCat(1, 64), new SymCat(1, 148), new SymCat(1, 66), new SymCat(1, 67), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 89), new SymCat(1, 88), new SymCat(1, 148), new SymCat(1, 90), new SymCat(1, 91), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 113), new SymCat(1, 112), new SymCat(1, 148), new SymCat(1, 114), new SymCat(1, 115), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 137), new SymCat(1, 136), new SymCat(1, 148), new SymCat(1, 138), new SymCat(1, 139), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 21), new SymCat(1, 20), new SymCat(1, 149), new SymCat(1, 22), new SymCat(1, 23), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 45), new SymCat(1, 44), new SymCat(1, 149), new SymCat(1, 46), new SymCat(1, 47), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 69), new SymCat(1, 68), new SymCat(1, 149), new SymCat(1, 70), new SymCat(1, 71), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 93), new SymCat(1, 92), new SymCat(1, 149), new SymCat(1, 94), new SymCat(1, 95), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 117), new SymCat(1, 116), new SymCat(1, 149), new SymCat(1, 118), new SymCat(1, 119), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymCat(0, 0), new SymCat(1, 141), new SymCat(1, 140), new SymCat(1, 149), new SymCat(1, 142), new SymCat(1, 143), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymKS("every")], [new SymCat(0, 1), new SymCat(1, 0)], [new SymCat(0, 2)], [new SymCat(0, 3)], [new SymCat(0, 4)], [new SymCat(0, 5)], [new SymCat(0, 6)], [new SymKS("break")], [new SymKS("breaks")], [new SymKS("broken")], [new SymKS("broke")], [new SymKS("buy")], [new SymKS("buys")], [new SymKS("bought")], [new SymKS("be/am/are")], [new SymKS("is")], [new SymKS("been")], [new SymKS("was/were")], [new SymKS("drink")], [new SymKS("drinks")], [new SymKS("drunk")], [new SymKS("drank")], [new SymKS("eat")], [new SymKS("eats")], [new SymKS("eaten")], [new SymKS("ate")], [new SymKS("fly")], [new SymKS("flies")], [new SymKS("flown")], [new SymKS("flew")], [new SymKS("hate")], [new SymKS("hates")], [new SymKS("hated")], [new SymKS("hear")], [new SymKS("hears")], [new SymKS("heard")], [new SymKS("hunt")], [new SymKS("hunts")], [new SymKS("hunted")], [new SymKS("like")], [new SymKS("likes")], [new SymKS("liked")], [new SymKS("listen")], [new SymKS("listens")], [new SymKS("listened")], [new SymKS("to")], [new SymKS("run")], [new SymKS("runs")], [new SymKS("ran")], [new SymKS("see")], [new SymKS("sees")], [new SymKS("seen")], [new SymKS("saw")], [new SymKS("sit")], [new SymKS("sits")], [new SymKS("sat")], [new SymKS("sleep")], [new SymKS("sleeps")], [new SymKS("slept")], [new SymKS("swim")], [new SymKS("swims")], [new SymKS("swum")], [new SymKS("swam")], [new SymKS("throw")], [new SymKS("throws")], [new SymKS("thrown")], [new SymKS("threw")], [new SymKS("walk")], [new SymKS("walks")], [new SymKS("walked")], [new SymKS("watch")], [new SymKS("watches")], [new SymKS("watched")], [new SymKS("hope")], [new SymKS("hopes")], [new SymKS("hoped")], [new SymKS("know")], [new SymKS("knows")], [new SymKS("known")], [new SymKS("knew")], [new SymKS("say")], [new SymKS("says")], [new SymKS("said")], [new SymKS("want")], [new SymKS("wants")], [new SymKS("wanted")], [new SymKS("animal")], [new SymKS("animals")], [new SymKS("apple")], [new SymKS("apples")], [new SymKS("beer")], [new SymKS("beers")], [new SymKS("bike")], [new SymKS("bikes")], [new SymKS("bird")], [new SymKS("birds")], [new SymKS("boat")], [new SymKS("boats")], [new SymKS("book")], [new SymKS("books")], [new SymKS("car")], [new SymKS("cars")], [new SymKS("cat")], [new SymKS("cats")], [new SymKS("chair")], [new SymKS("chairs")], [new SymKS("cow")], [new SymKS("cows")], [new SymKS("[thing]")], [new SymKS("[thing]s")], [new SymKS("dog")], [new SymKS("dogs")], [new SymKS("fish")], [new SymKS("foot")], [new SymKS("feet")], [new SymKS("forest")], [new SymKS("forests")], [new SymKS("fruit")], [new SymKS("hair")], [new SymKS("hairs")], [new SymKS("hand")], [new SymKS("hands")], [new SymKS("hat")], [new SymKS("hats")], [new SymKS("head")], [new SymKS("heads")], [new SymKS("horse")], [new SymKS("horses")], [new SymKS("house")], [new SymKS("houses")], [new SymKS("milk")], [new SymKS("milks")], [new SymKS("shirt")], [new SymKS("shirts")], [new SymKS("shoe")], [new SymKS("shoes")], [new SymKS("stone")], [new SymKS("stones")], [new SymKS("table")], [new SymKS("tables")], [new SymKS("tree")], [new SymKS("trees")], [new SymKS("water")], [new SymKS("waters")], [new SymKS("wine")], [new SymKS("wines")], [new SymKS("boy")], [new SymKS("boys")], [new SymKS("man")], [new SymKS("men")], [new SymKS("person")], [new SymKS("persons")], [new SymKS("girl")], [new SymKS("girls")], [new SymKS("woman")], [new SymKS("women")], [new SymKS("[something]")], [new SymKS("Berlin")], [new SymKS("Britain")], [new SymKS("[name]")], [new SymKS("Germany")], [new SymKS("Gothenburg")], [new SymKS("London")], [new SymKS("Sweden")], [new SymKS("John")], [new SymKS("Mary")], [new SymKS("by")], [new SymKS("in")], [new SymKS("of")], [new SymKS("with")], [new SymKS("I")], [new SymKS("me")], [new SymKS("we")], [new SymKS("us")], [new SymKS("he")], [new SymKS("him")], [new SymKS("she")], [new SymKS("her")], [new SymKS("they")], [new SymKS("them")], [new SymKS("the")], [new SymKP([new SymKS("a")], [new Alt([new SymKS("a")], ["eu", "Eu", "uni", "up"]), new Alt([new SymKS("an")], ["un"]), new Alt([new SymKS("an")], ["a", "e", "i", "o", "A", "E", "I", "O"]), new Alt([new SymKS("an")], ["SMS", "sms"])])], [new SymKS("that")], [new SymKS("those")], [new SymKS("this")], [new SymKS("these")], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 0)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 4)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 2)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 1)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 5)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 3)], [new SymCat(0, 0), new SymKS(".")], [new SymCat(0, 7)], [new SymCat(0, 8)], [new SymCat(0, 9)], [new SymCat(0, 10)], [new SymCat(0, 11)], [new SymCat(0, 12)], [new SymCat(0, 13)], [new SymCat(0, 14)], [new SymCat(0, 15)], [new SymCat(0, 16)], [new SymCat(0, 17)], [new SymCat(0, 18)], [new SymCat(0, 19)], [new SymCat(0, 20)], [new SymCat(0, 21)], [new SymCat(0, 22)], [new SymCat(0, 23)], [new SymCat(0, 24)], [new SymCat(0, 25)], [new SymCat(0, 26)], [new SymCat(0, 27)], [new SymCat(0, 28)], [new SymCat(0, 29)], [new SymCat(0, 30)], [new SymCat(0, 31)], [new SymCat(0, 32)], [new SymCat(0, 33)], [new SymCat(0, 34)], [new SymCat(0, 35)], [new SymCat(0, 36)], [new SymCat(0, 37)], [new SymCat(0, 38)], [new SymCat(0, 39)], [new SymCat(0, 40)], [new SymCat(0, 41)], [new SymCat(0, 42)], [new SymCat(0, 43)], [new SymCat(0, 44)], [new SymCat(0, 45)], [new SymCat(0, 46)], [new SymCat(0, 47)], [new SymCat(0, 48)], [new SymCat(0, 49)], [new SymCat(0, 50)], [new SymCat(0, 51)], [new SymCat(0, 52)], [new SymCat(0, 53)], [new SymCat(0, 54)], [new SymCat(0, 55)], [new SymCat(0, 56)], [new SymCat(0, 57)], [new SymCat(0, 58)], [new SymCat(0, 59)], [new SymCat(0, 60)], [new SymCat(0, 61)], [new SymCat(0, 62)], [new SymCat(0, 63)], [new SymCat(0, 64)], [new SymCat(0, 65)], [new SymCat(0, 66)], [new SymCat(0, 67)], [new SymCat(0, 68)], [new SymCat(0, 69)], [new SymCat(0, 70)], [new SymCat(0, 71)], [new SymCat(0, 72)], [new SymCat(0, 73)], [new SymCat(0, 74)], [new SymCat(0, 75)], [new SymCat(0, 76)], [new SymCat(0, 77)], [new SymCat(0, 78)], [new SymCat(0, 79)], [new SymCat(0, 80)], [new SymCat(0, 81)], [new SymCat(0, 82)], [new SymCat(0, 83)], [new SymCat(0, 84)], [new SymCat(0, 85)], [new SymCat(0, 86)], [new SymCat(0, 87)], [new SymCat(0, 88)], [new SymCat(0, 89)], [new SymCat(0, 90)], [new SymCat(0, 91)], [new SymCat(0, 92)], [new SymCat(0, 93)], [new SymCat(0, 94)], [new SymCat(0, 95)], [new SymCat(0, 96)], [new SymCat(0, 97)], [new SymCat(0, 98)], [new SymCat(0, 99)], [new SymCat(0, 100)], [new SymCat(0, 101)], [new SymCat(0, 102)], [new SymCat(0, 103)], [new SymCat(0, 104)], [new SymCat(0, 105)], [new SymCat(0, 106)], [new SymCat(0, 107)], [new SymCat(0, 108)], [new SymCat(0, 109)], [new SymCat(0, 110)], [new SymCat(0, 111)], [new SymCat(0, 112)], [new SymCat(0, 113)], [new SymCat(0, 114)], [new SymCat(0, 115)], [new SymCat(0, 116)], [new SymCat(0, 117)], [new SymCat(0, 118)], [new SymCat(0, 119)], [new SymCat(0, 120)], [new SymCat(0, 121)], [new SymCat(0, 122)], [new SymCat(0, 123)], [new SymCat(0, 124)], [new SymCat(0, 125)], [new SymCat(0, 126)], [new SymCat(0, 127)], [new SymCat(0, 128)], [new SymCat(0, 129)], [new SymCat(0, 130)], [new SymCat(0, 131)], [new SymCat(0, 132)], [new SymCat(0, 133)], [new SymCat(0, 134)], [new SymCat(0, 135)], [new SymCat(0, 136)], [new SymCat(0, 137)], [new SymCat(0, 138)], [new SymCat(0, 139)], [new SymCat(0, 140)], [new SymCat(0, 141)], [new SymCat(0, 142)], [new SymCat(0, 143)], [new SymCat(0, 144)], [new SymCat(0, 145)], [new SymCat(0, 146)], [new SymCat(0, 147)], [new SymCat(0, 148)], [new SymCat(0, 149)], [new SymCat(0, 150)], [new SymCat(0, 151)], [new SymCat(0, 152)], [new SymCat(0, 153), new SymCat(1, 0)], [new SymCat(0, 154), new SymCat(1, 0)], [new SymCat(0, 155), new SymCat(1, 0)], [new SymCat(0, 156), new SymCat(1, 0)], [new SymCat(0, 157), new SymCat(1, 0)], [new SymCat(0, 158), new SymCat(1, 0)], [new SymKS("that"), new SymCat(1, 0)], [new SymKS("to"), new SymCat(1, 144), new SymCat(1, 151), new SymCat(1, 152), new SymCat(1, 153), new SymCat(1, 150)], [new SymKS("to"), new SymCat(1, 145), new SymCat(1, 151), new SymCat(1, 152), new SymCat(1, 154), new SymCat(1, 150)], [new SymKS("to"), new SymCat(1, 146), new SymCat(1, 151), new SymCat(1, 152), new SymCat(1, 155), new SymCat(1, 150)], [new SymKS("to"), new SymCat(1, 147), new SymCat(1, 151), new SymCat(1, 152), new SymCat(1, 156), new SymCat(1, 150)], [new SymKS("to"), new SymCat(1, 148), new SymCat(1, 151), new SymCat(1, 152), new SymCat(1, 157), new SymCat(1, 150)], [new SymKS("to"), new SymCat(1, 149), new SymCat(1, 151), new SymCat(1, 152), new SymCat(1, 158), new SymCat(1, 150)], [new SymCat(1, 0)], [new SymCat(1, 1)], [new SymCat(1, 2)], [new SymCat(1, 3)], [new SymCat(1, 4)], [new SymCat(1, 5)], [new SymCat(0, 4), new SymCat(1, 1)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(2, 0)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(2, 1)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(2, 2)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(2, 3)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(2, 4)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(2, 5)], [new SymCat(0, 4), new SymCat(1, 1), new SymCat(0, 5), new SymCat(2, 1)]], { A: { s: 0, e: 0 }, A2: { s: 1, e: 1 }, AP: { s: 2, e: 3 }, AdA: { s: 4, e: 4 }, AdN: { s: 5, e: 5 }, AdV: { s: 6, e: 6 }, Adv: { s: 7, e: 7 }, Adverb: { s: 8, e: 8 }, Ant: { s: 9, e: 10 }, CAdv: { s: 11, e: 11 }, CN: { s: 12, e: 14 }, Card: { s: 15, e: 16 }, Cl: { s: 17, e: 17 }, ClSlash: { s: 18, e: 18 }, Comp: { s: 19, e: 19 }, Conj: { s: 20, e: 21 }, DAP: { s: 22, e: 23 }, Det: { s: 24, e: 27 }, Digits: { s: 28, e: 33 }, Float: { s: -3, e: -3 }, GraspV: { s: 34, e: 35 }, GraspVQ: { s: 36, e: 39 }, GraspVS: { s: 40, e: 43 }, GraspVV: { s: 44, e: 49 }, IAdv: { s: 50, e: 50 }, IComp: { s: 51, e: 51 }, IDet: { s: 52, e: 53 }, IP: { s: 54, e: 55 }, IQuant: { s: 56, e: 56 }, Imp: { s: 57, e: 57 }, Int: { s: -2, e: -2 }, Interj: { s: 58, e: 58 }, N: { s: 59, e: 61 }, N2: { s: 62, e: 64 }, N3: { s: 65, e: 67 }, NP: { s: 68, e: 75 }, Num: { s: 76, e: 79 }, Numeral: { s: 80, e: 81 }, Ord: { s: 82, e: 82 }, PConj: { s: 83, e: 83 }, PN: { s: 84, e: 86 }, Phr: { s: 87, e: 87 }, Pol: { s: 88, e: 90 }, Predet: { s: 91, e: 91 }, Prep: { s: 92, e: 93 }, Pron: { s: 94, e: 101 }, QCl: { s: 102, e: 102 }, QS: { s: 103, e: 103 }, Quant: { s: 104, e: 104 }, RCl: { s: 105, e: 108 }, RP: { s: 109, e: 117 }, RS: { s: 118, e: 121 }, S: { s: 122, e: 122 }, SC: { s: 123, e: 123 }, SSlash: { s: 124, e: 124 }, Start: { s: 125, e: 125 }, String: { s: -1, e: -1 }, Subj: { s: 126, e: 126 }, Temp: { s: 127, e: 134 }, Tense: { s: 135, e: 138 }, Text: { s: 139, e: 139 }, Utt: { s: 140, e: 140 }, V: { s: 141, e: 142 }, V2: { s: 143, e: 144 }, V2A: { s: 145, e: 146 }, V2Q: { s: 147, e: 148 }, V2S: { s: 149, e: 150 }, V2V: { s: 151, e: 156 }, V3: { s: 157, e: 158 }, VA: { s: 159, e: 160 }, VP: { s: 161, e: 162 }, VPSlash: { s: 163, e: 166 }, VQ: { s: 167, e: 168 }, VS: { s: 169, e: 170 }, VV: { s: 171, e: 173 }, Voc: { s: 174, e: 174 } }, 190), GraspGer: new GFConcrete({}, { 0: [new Apply(179, []), new Apply(180, []), new Apply(181, []), new Apply(182, []), new Apply(183, []), new Apply(184, []), new Apply(185, []), new Apply(186, []), new Apply(187, []), new Apply(188, []), new Apply(189, []), new Apply(190, []), new Apply(191, []), new Apply(192, [])], 20: [new Apply(193, [new PArg(21), new PArg(20)]), new Apply(194, [new PArg(0)])], 21: [new Apply(195, []), new Apply(196, []), new Apply(197, [])], 24: [new Apply(198, [new PArg(138946), new PArg(138945)]), new Apply(199, [new PArg(138947), new PArg(138945)]), new Apply(200, [new PArg(138951), new PArg(138945)]), new Apply(201, [new PArg(138953), new PArg(138945)]), new Apply(202, [new PArg(25)])], 25: [new Apply(203, []), new Apply(204, []), new Apply(205, []), new Apply(206, [])], 29: [new Apply(207, [new PArg(20), new PArg(29)]), new Apply(208, [new PArg(132916)])], 30: [new Apply(208, [new PArg(132917)]), new Apply(209, [new PArg(20), new PArg(30)])], 31: [new Apply(208, [new PArg(132918)]), new Apply(210, [new PArg(20), new PArg(31)])], 34: [new Apply(211, [new PArg(138889), new PArg(138940)]), new Apply(212, [new PArg(138889), new PArg(138941)]), new Apply(213, [new PArg(138889), new PArg(138942)]), new Apply(214, [new PArg(138891), new PArg(138940)]), new Apply(215, [new PArg(138891), new PArg(138941)]), new Apply(216, [new PArg(138891), new PArg(138942)]), new Apply(217, [new PArg(138894), new PArg(138940)]), new Apply(218, [new PArg(138894), new PArg(138941)]), new Apply(219, [new PArg(138894), new PArg(138942)]), new Apply(220, [new PArg(138897), new PArg(138940)]), new Apply(221, [new PArg(138897), new PArg(138941)]), new Apply(222, [new PArg(138897), new PArg(138942)]), new Apply(223, [new PArg(138898), new PArg(138940)]), new Apply(224, [new PArg(138898), new PArg(138941)]), new Apply(225, [new PArg(138898), new PArg(138942)]), new Apply(226, [new PArg(138900), new PArg(138940)]), new Apply(227, [new PArg(138900), new PArg(138941)]), new Apply(228, [new PArg(138900), new PArg(138942)]), new Apply(229, [new PArg(138903), new PArg(138940)]), new Apply(230, [new PArg(138903), new PArg(138941)]), new Apply(231, [new PArg(138903), new PArg(138942)]), new Apply(232, [new PArg(138906), new PArg(138940)]), new Apply(233, [new PArg(138906), new PArg(138941)]), new Apply(234, [new PArg(138906), new PArg(138942)])], 54: [new Apply(235, [])], 55: [new Apply(236, [])], 57: [new Apply(237, [new PArg(134061), new PArg(133981)])], 58: [new Apply(238, [])], 60: [new Apply(237, [new PArg(138938), new PArg(133981)])], 61: [new Apply(239, [new PArg(134061), new PArg(133983)])], 64: [new Apply(239, [new PArg(138939), new PArg(133983)])], 123: [new Apply(240, []), new Apply(241, []), new Apply(242, []), new Apply(243, []), new Apply(244, []), new Apply(245, []), new Apply(246, []), new Apply(247, []), new Apply(248, []), new Apply(249, []), new Apply(250, [])], 141: [new Apply(251, [new PArg(141742)]), new Apply(252, [new PArg(144982)]), new Apply(253, []), new Apply(254, []), new Apply(255, []), new Apply(256, []), new Apply(257, [])], 142: [new Apply(258, []), new Apply(259, [])], 159: [new Apply(260, [])], 3381: [new Apply(261, [])], 17637: [new Apply(262, [])], 35781: [new Apply(263, []), new Apply(264, []), new Apply(265, [])], 74661: [new Apply(266, [])], 132907: [new Apply(267, []), new Apply(268, []), new Apply(269, [])], 132911: [new Apply(270, [])], 132916: [new Apply(271, []), new Apply(272, []), new Apply(273, []), new Apply(274, []), new Apply(275, []), new Apply(276, []), new Apply(277, []), new Apply(278, []), new Apply(279, []), new Apply(280, []), new Apply(281, []), new Apply(282, []), new Apply(283, []), new Apply(284, []), new Apply(285, []), new Apply(286, []), new Apply(287, []), new Apply(288, [])], 132917: [new Apply(289, []), new Apply(290, []), new Apply(291, []), new Apply(292, []), new Apply(293, []), new Apply(294, []), new Apply(295, [])], 132918: [new Apply(296, []), new Apply(297, []), new Apply(298, []), new Apply(299, []), new Apply(300, []), new Apply(301, []), new Apply(302, []), new Apply(303, []), new Apply(304, []), new Apply(305, []), new Apply(306, []), new Apply(307, [])], 133945: [new Apply(308, [new PArg(138889), new PArg(24)])], 133947: [new Apply(308, [new PArg(138891), new PArg(24)]), new Apply(309, [new PArg(57), new PArg(29)]), new Apply(310, [new PArg(58), new PArg(29)])], 133950: [new Apply(308, [new PArg(138894), new PArg(24)]), new Apply(311, [new PArg(61), new PArg(29)])], 133953: [new Apply(308, [new PArg(138897), new PArg(24)]), new Apply(312, [new PArg(57), new PArg(30)]), new Apply(313, [new PArg(58), new PArg(30)])], 133954: [new Apply(308, [new PArg(138898), new PArg(24)])], 133956: [new Apply(308, [new PArg(138900), new PArg(24)]), new Apply(314, [new PArg(61), new PArg(30)])], 133959: [new Apply(308, [new PArg(138903), new PArg(24)]), new Apply(315, [new PArg(57), new PArg(31)]), new Apply(316, [new PArg(58), new PArg(31)])], 133962: [new Apply(308, [new PArg(138906), new PArg(24)]), new Apply(317, [new PArg(61), new PArg(31)])], 133963: [new Apply(318, [new PArg(134041)])], 133965: [new Apply(310, [new PArg(60), new PArg(29)]), new Apply(318, [new PArg(134043)])], 133968: [new Apply(319, [new PArg(64), new PArg(29)])], 133971: [new Apply(313, [new PArg(60), new PArg(30)]), new Apply(318, [new PArg(134049)])], 133972: [new Apply(318, [new PArg(134050)])], 133974: [new Apply(318, [new PArg(134052)]), new Apply(320, [new PArg(64), new PArg(30)])], 133977: [new Apply(316, [new PArg(60), new PArg(31)]), new Apply(321, [new PArg(133989)]), new Apply(322, [])], 133980: [new Apply(323, [new PArg(64), new PArg(31)])], 133981: [new Apply(324, [])], 133983: [new Apply(325, [])], 133989: [new Apply(326, []), new Apply(327, []), new Apply(328, []), new Apply(329, []), new Apply(330, []), new Apply(331, []), new Apply(332, []), new Apply(333, []), new Apply(334, [])], 133991: [new Apply(335, [])], 133992: [new Apply(336, [])], 134033: [new Apply(337, [])], 134034: [new Apply(338, [])], 134038: [new Apply(339, [])], 134040: [new Apply(340, [])], 134041: [new Apply(341, [])], 134043: [new Apply(342, [])], 134049: [new Apply(343, [])], 134050: [new Apply(344, [])], 134052: [new Apply(345, [])], 134059: [new Apply(346, [new PArg(34)]), new Apply(347, [new PArg(132907), new PArg(34)]), new Apply(348, [new PArg(132911), new PArg(138940)]), new Apply(348, [new PArg(132911), new PArg(138941)]), new Apply(348, [new PArg(132911), new PArg(138942)])], 134061: [new Apply(349, [])], 134064: [new Apply(350, []), new Apply(351, []), new Apply(352, [])], 134080: [new Apply(353, [new PArg(134102), new PArg(133991), new PArg(34)]), new Apply(354, [new PArg(134106), new PArg(133991), new PArg(34)]), new Apply(355, [new PArg(134103), new PArg(133991), new PArg(34)]), new Apply(356, [new PArg(134102), new PArg(133992), new PArg(34)]), new Apply(357, [new PArg(134106), new PArg(133992), new PArg(34)]), new Apply(358, [new PArg(134103), new PArg(133992), new PArg(34)])], 134100: [new Apply(359, [new PArg(134127)])], 134101: [new Apply(360, []), new Apply(361, []), new Apply(362, [])], 134102: [new Apply(363, [])], 134103: [new Apply(364, [])], 134106: [new Apply(365, [])], 134127: [new Apply(366, [new PArg(134080)])], 138468: [new Apply(367, [new PArg(138468), new PArg(24)]), new Apply(368, [new PArg(138907), new PArg(134080)]), new Apply(369, [new PArg(138954)]), new Apply(370, [new PArg(138954), new PArg(138964)]), new Apply(371, [new PArg(138969), new PArg(138966)]), new Apply(371, [new PArg(138970), new PArg(138968)]), new Apply(372, [new PArg(138986), new PArg(138966)]), new Apply(373, [new PArg(138969), new PArg(138966), new PArg(138964)]), new Apply(373, [new PArg(138970), new PArg(138968), new PArg(138964)]), new Apply(374, [new PArg(138986), new PArg(138966), new PArg(138964)]), new Apply(375, [new PArg(139258), new PArg(138966), new PArg(139238)]), new Apply(375, [new PArg(139259), new PArg(138968), new PArg(139238)]), new Apply(376, [new PArg(139260), new PArg(138966), new PArg(139238)]), new Apply(376, [new PArg(139261), new PArg(138968), new PArg(139238)]), new Apply(377, [new PArg(139419), new PArg(138966), new PArg(138945)])], 138469: [new Apply(367, [new PArg(138469), new PArg(24)]), new Apply(369, [new PArg(138955)]), new Apply(370, [new PArg(138955), new PArg(138964)]), new Apply(371, [new PArg(138997), new PArg(138968)]), new Apply(372, [new PArg(139013), new PArg(138966)]), new Apply(373, [new PArg(138997), new PArg(138968), new PArg(138964)]), new Apply(374, [new PArg(139013), new PArg(138966), new PArg(138964)]), new Apply(376, [new PArg(139504), new PArg(138968), new PArg(139238)]), new Apply(377, [new PArg(139662), new PArg(138966), new PArg(138945)])], 138478: [new Apply(367, [new PArg(138478), new PArg(24)]), new Apply(378, [new PArg(138928), new PArg(138918)])], 138889: [new Coerce(133945), new Coerce(133963)], 138891: [new Coerce(133947), new Coerce(133965)], 138894: [new Coerce(133950), new Coerce(133968)], 138897: [new Coerce(133953), new Coerce(133971)], 138898: [new Coerce(133954), new Coerce(133972)], 138900: [new Coerce(133956), new Coerce(133974)], 138903: [new Coerce(133959), new Coerce(133977)], 138906: [new Coerce(133962), new Coerce(133980)], 138907: [new Coerce(35781)], 138918: [new Coerce(138468), new Coerce(138469), new Coerce(138478)], 138928: [new Coerce(74661)], 138938: [new Coerce(134064)], 138939: [new Coerce(134064)], 138940: [new Coerce(138468)], 138941: [new Coerce(138469)], 138942: [new Coerce(138478)], 138945: [new Coerce(133945), new Coerce(133947), new Coerce(133950), new Coerce(133953), new Coerce(133954), new Coerce(133956), new Coerce(133959), new Coerce(133962), new Coerce(133963), new Coerce(133965), new Coerce(133968), new Coerce(133971), new Coerce(133972), new Coerce(133974), new Coerce(133977), new Coerce(133980)], 138946: [new Coerce(134033)], 138947: [new Coerce(134034)], 138951: [new Coerce(134038)], 138953: [new Coerce(134040)], 138954: [new Coerce(123), new Coerce(141), new Coerce(159)], 138955: [new Coerce(142)], 138964: [new Coerce(20)], 138966: [new Coerce(133963), new Coerce(133965), new Coerce(133968), new Coerce(133971), new Coerce(133972), new Coerce(133974), new Coerce(133977), new Coerce(133980)], 138968: [new Coerce(133945), new Coerce(133947), new Coerce(133950), new Coerce(133953), new Coerce(133954), new Coerce(133956), new Coerce(133959), new Coerce(133962)], 138969: [new Coerce(123), new Coerce(159)], 138970: [new Coerce(123), new Coerce(141), new Coerce(159)], 138986: [new Coerce(141)], 138997: [new Coerce(142)], 139013: [new Coerce(142)], 139238: [new Coerce(133945), new Coerce(133947), new Coerce(133950), new Coerce(133953), new Coerce(133954), new Coerce(133956), new Coerce(133959), new Coerce(133962), new Coerce(133963), new Coerce(133965), new Coerce(133968), new Coerce(133971), new Coerce(133972), new Coerce(133974), new Coerce(133977), new Coerce(133980)], 139258: [new Coerce(123)], 139259: [new Coerce(123)], 139260: [new Coerce(159)], 139261: [new Coerce(141), new Coerce(159)], 139419: [new Coerce(141)], 139504: [new Coerce(142)], 139662: [new Coerce(142)], 141742: [new Coerce(35781)], 144982: [new Coerce(74661)] }, [new CncFun("'lindef A'", [0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef A2'", []), new CncFun("'lindef AP'", [0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef AdA'", [0]), new CncFun("'lindef AdN'", []), new CncFun("'lindef AdV'", []), new CncFun("'lindef Adv'", [0]), new CncFun("'lindef Adverb'", [0]), new CncFun("'lindef Ant'", []), new CncFun("'lindef CAdv'", []), new CncFun("'lindef CN'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef Card'", []), new CncFun("'lindef Cl'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef ClSlash'", []), new CncFun("'lindef Comp'", []), new CncFun("'lindef Conj'", []), new CncFun("'lindef DAP'", []), new CncFun("'lindef Det'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef Digits'", []), new CncFun("'lindef GraspV'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef GraspVQ'", []), new CncFun("'lindef GraspVS'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef GraspVV'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef IAdv'", []), new CncFun("'lindef IComp'", []), new CncFun("'lindef IDet'", []), new CncFun("'lindef IP'", []), new CncFun("'lindef IQuant'", []), new CncFun("'lindef Imp'", []), new CncFun("'lindef Interj'", []), new CncFun("'lindef N'", [0, 0, 0, 0, 0, 0]), new CncFun("'lindef N2'", []), new CncFun("'lindef N3'", []), new CncFun("'lindef NP'", [0, 0, 0, 0, 0]), new CncFun("'lindef Num'", [0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef Numeral'", []), new CncFun("'lindef Ord'", []), new CncFun("'lindef PConj'", []), new CncFun("'lindef PN'", [0, 0, 0]), new CncFun("'lindef Phr'", []), new CncFun("'lindef Pol'", [0]), new CncFun("'lindef Predet'", []), new CncFun("'lindef Prep'", [0, 0]), new CncFun("'lindef Pron'", [0, 0, 0]), new CncFun("'lindef QCl'", []), new CncFun("'lindef QS'", []), new CncFun("'lindef Quant'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef RCl'", []), new CncFun("'lindef RP'", []), new CncFun("'lindef RS'", []), new CncFun("'lindef S'", [0, 0]), new CncFun("'lindef SC'", []), new CncFun("'lindef SSlash'", []), new CncFun("'lindef Start'", [0]), new CncFun("'lindef Subj'", []), new CncFun("'lindef Temp'", [0]), new CncFun("'lindef Tense'", []), new CncFun("'lindef Text'", []), new CncFun("'lindef Utt'", [0]), new CncFun("'lindef V'", []), new CncFun("'lindef V2'", []), new CncFun("'lindef V2A'", []), new CncFun("'lindef V2Q'", []), new CncFun("'lindef V2S'", []), new CncFun("'lindef V2V'", []), new CncFun("'lindef V3'", []), new CncFun("'lindef VA'", []), new CncFun("'lindef VP'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef VPSlash'", []), new CncFun("'lindef VQ'", []), new CncFun("'lindef VS'", []), new CncFun("'lindef VV'", []), new CncFun("'lindef Voc'", []), new CncFun("'lindef A'", [1]), new CncFun("'lindef A2'", [2]), new CncFun("'lindef AP'", [1]), new CncFun("'lindef AdA'", [1]), new CncFun("'lindef AdN'", [2]), new CncFun("'lindef AdV'", [2]), new CncFun("'lindef Adv'", [1]), new CncFun("'lindef Adverb'", [1]), new CncFun("'lindef Ant'", [2]), new CncFun("'lindef CAdv'", [2]), new CncFun("'lindef CN'", [1]), new CncFun("'lindef Card'", [2]), new CncFun("'lindef Cl'", [1]), new CncFun("'lindef ClSlash'", [3]), new CncFun("'lindef Comp'", [2]), new CncFun("'lindef Conj'", [3]), new CncFun("'lindef DAP'", [2]), new CncFun("'lindef Det'", [1]), new CncFun("'lindef Digits'", [2]), new CncFun("'lindef GraspV'", [1]), new CncFun("'lindef GraspVQ'", [2]), new CncFun("'lindef GraspVS'", [1]), new CncFun("'lindef GraspVV'", [1]), new CncFun("'lindef IAdv'", [2]), new CncFun("'lindef IComp'", [2]), new CncFun("'lindef IDet'", [2]), new CncFun("'lindef IP'", [2]), new CncFun("'lindef IQuant'", [2]), new CncFun("'lindef Imp'", [2]), new CncFun("'lindef Interj'", [2]), new CncFun("'lindef N'", [1]), new CncFun("'lindef N2'", [2]), new CncFun("'lindef N3'", [2]), new CncFun("'lindef NP'", [1]), new CncFun("'lindef Num'", [1]), new CncFun("'lindef Numeral'", [2]), new CncFun("'lindef Ord'", [2]), new CncFun("'lindef PConj'", [2]), new CncFun("'lindef PN'", [1]), new CncFun("'lindef Phr'", [2]), new CncFun("'lindef Pol'", [1]), new CncFun("'lindef Predet'", [2]), new CncFun("'lindef Prep'", [1]), new CncFun("'lindef Pron'", [1]), new CncFun("'lindef QCl'", [2]), new CncFun("'lindef QS'", [2]), new CncFun("'lindef Quant'", [1]), new CncFun("'lindef RCl'", [2]), new CncFun("'lindef RP'", [2]), new CncFun("'lindef RS'", [2]), new CncFun("'lindef S'", [1]), new CncFun("'lindef SC'", [2]), new CncFun("'lindef SSlash'", [3]), new CncFun("'lindef Start'", [1]), new CncFun("'lindef Subj'", [2]), new CncFun("'lindef Temp'", [1]), new CncFun("'lindef Tense'", [2]), new CncFun("'lindef Text'", [2]), new CncFun("'lindef Utt'", [1]), new CncFun("'lindef V'", [3]), new CncFun("'lindef V'", [4]), new CncFun("'lindef V'", [5]), new CncFun("'lindef V'", [6]), new CncFun("'lindef V2'", [7]), new CncFun("'lindef V2'", [8]), new CncFun("'lindef V2'", [9]), new CncFun("'lindef V2'", [10]), new CncFun("'lindef V2A'", [7]), new CncFun("'lindef V2A'", [8]), new CncFun("'lindef V2A'", [9]), new CncFun("'lindef V2A'", [10]), new CncFun("'lindef V2Q'", [7]), new CncFun("'lindef V2Q'", [8]), new CncFun("'lindef V2Q'", [9]), new CncFun("'lindef V2Q'", [10]), new CncFun("'lindef V2S'", [7]), new CncFun("'lindef V2S'", [8]), new CncFun("'lindef V2S'", [9]), new CncFun("'lindef V2S'", [10]), new CncFun("'lindef V2V'", [7]), new CncFun("'lindef V2V'", [8]), new CncFun("'lindef V2V'", [9]), new CncFun("'lindef V2V'", [10]), new CncFun("'lindef V3'", [11]), new CncFun("'lindef V3'", [12]), new CncFun("'lindef V3'", [13]), new CncFun("'lindef V3'", [14]), new CncFun("'lindef VA'", [3]), new CncFun("'lindef VA'", [4]), new CncFun("'lindef VA'", [5]), new CncFun("'lindef VA'", [6]), new CncFun("'lindef VP'", [15]), new CncFun("'lindef VPSlash'", [16]), new CncFun("'lindef VQ'", [3]), new CncFun("'lindef VQ'", [4]), new CncFun("'lindef VQ'", [5]), new CncFun("'lindef VQ'", [6]), new CncFun("'lindef VS'", [3]), new CncFun("'lindef VS'", [4]), new CncFun("'lindef VS'", [5]), new CncFun("'lindef VS'", [6]), new CncFun("'lindef VV'", [3]), new CncFun("'lindef VV'", [4]), new CncFun("'lindef VV'", [5]), new CncFun("'lindef VV'", [6]), new CncFun("'lindef Voc'", [2]), new CncFun("big_A", [17, 18, 19, 20, 20, 21, 21, 20, 20]), new CncFun("black_A", [22, 23, 24, 25, 25, 26, 26, 25, 25]), new CncFun("blue_A", [27, 28, 29, 30, 30, 31, 31, 30, 30]), new CncFun("default_A", [32, 33, 34, 35, 35, 36, 36, 35, 35]), new CncFun("green_A", [37, 38, 39, 40, 40, 41, 41, 40, 40]), new CncFun("heavy_A", [42, 43, 44, 45, 45, 46, 46, 45, 45]), new CncFun("long_A", [47, 48, 49, 50, 50, 51, 51, 50, 50]), new CncFun("red_A", [52, 53, 54, 55, 55, 56, 56, 55, 55]), new CncFun("short_A", [57, 58, 59, 60, 60, 61, 61, 60, 60]), new CncFun("small_A", [62, 63, 64, 65, 65, 66, 66, 65, 65]), new CncFun("thick_A", [67, 68, 69, 70, 70, 71, 71, 70, 70]), new CncFun("thin_A", [72, 73, 74, 75, 75, 76, 76, 75, 75]), new CncFun("white_A", [77, 78, 79, 80, 80, 81, 81, 80, 80]), new CncFun("yellow_A", [82, 83, 84, 85, 85, 86, 86, 85, 85]), new CncFun("AdAP", [87, 88, 89, 90, 91, 92, 93, 94, 95]), new CncFun("UseA", [1, 96, 97, 98, 99, 100, 101, 102, 103]), new CncFun("so_AdA", [104]), new CncFun("too_AdA", [105]), new CncFun("very_AdA", [106]), new CncFun("PrepNP", [107]), new CncFun("PrepNP", [108]), new CncFun("PrepNP", [109]), new CncFun("PrepNP", [110]), new CncFun("UseAdverb", [1]), new CncFun("everywhere_Adverb", [111]), new CncFun("here_Adverb", [112]), new CncFun("somewhere_Adverb", [113]), new CncFun("there_Adverb", [114]), new CncFun("ModCN", [115, 116, 117, 118, 119, 120, 121, 122, 123, 124]), new CncFun("UseN", [1, 96, 98, 99, 1, 96, 97, 98, 99, 100]), new CncFun("ModCN", [125, 126, 117, 118, 119, 127, 121, 122, 123, 124]), new CncFun("ModCN", [128, 129, 117, 118, 119, 127, 121, 122, 123, 124]), new CncFun("PredVP", [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141]), new CncFun("PredVP", [130, 131, 132, 133, 142, 143, 144, 145, 138, 139, 140, 141]), new CncFun("PredVP", [130, 131, 132, 133, 146, 147, 148, 149, 138, 139, 140, 141]), new CncFun("PredVP", [150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161]), new CncFun("PredVP", [150, 151, 152, 153, 162, 163, 164, 165, 158, 159, 160, 161]), new CncFun("PredVP", [150, 151, 152, 153, 166, 167, 168, 169, 158, 159, 160, 161]), new CncFun("PredVP", [170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181]), new CncFun("PredVP", [170, 171, 172, 173, 182, 183, 184, 185, 178, 179, 180, 181]), new CncFun("PredVP", [170, 171, 172, 173, 186, 187, 188, 189, 178, 179, 180, 181]), new CncFun("PredVP", [190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201]), new CncFun("PredVP", [190, 191, 192, 193, 202, 203, 204, 205, 198, 199, 200, 201]), new CncFun("PredVP", [190, 191, 192, 193, 206, 207, 208, 209, 198, 199, 200, 201]), new CncFun("PredVP", [210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221]), new CncFun("PredVP", [210, 211, 212, 213, 222, 223, 224, 225, 218, 219, 220, 221]), new CncFun("PredVP", [210, 211, 212, 213, 226, 227, 228, 229, 218, 219, 220, 221]), new CncFun("PredVP", [230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241]), new CncFun("PredVP", [230, 231, 232, 233, 242, 243, 244, 245, 238, 239, 240, 241]), new CncFun("PredVP", [230, 231, 232, 233, 246, 247, 248, 249, 238, 239, 240, 241]), new CncFun("PredVP", [250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261]), new CncFun("PredVP", [250, 251, 252, 253, 262, 263, 264, 265, 258, 259, 260, 261]), new CncFun("PredVP", [250, 251, 252, 253, 266, 267, 268, 269, 258, 259, 260, 261]), new CncFun("PredVP", [270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281]), new CncFun("PredVP", [270, 271, 272, 273, 282, 283, 284, 285, 278, 279, 280, 281]), new CncFun("PredVP", [270, 271, 272, 273, 286, 287, 288, 289, 278, 279, 280, 281]), new CncFun("or_Conj", []), new CncFun("and_Conj", []), new CncFun("DetQuant", [87, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303]), new CncFun("every_Det", [304, 305, 306, 307, 308, 309, 309, 304, 310, 311, 312, 312, 306, 307, 308]), new CncFun("DetQuant", [313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327]), new CncFun("break_V", [328, 329, 330, 328, 328, 331, 331, 332, 332, 329, 330, 328, 328, 331, 331, 332, 332, 328, 333, 333, 333, 333, 333, 333]), new CncFun("buy_V", [334, 335, 336, 334, 334, 337, 337, 338, 338, 335, 336, 334, 334, 337, 337, 338, 338, 339, 333, 333, 333, 333, 333, 333]), new CncFun("drink_V", [340, 341, 342, 340, 340, 343, 343, 344, 344, 341, 342, 340, 340, 343, 343, 344, 344, 345, 333, 333, 333, 333, 333, 333]), new CncFun("eat_V", [346, 347, 348, 346, 346, 349, 349, 350, 350, 347, 348, 346, 346, 349, 349, 350, 350, 351, 333, 333, 333, 333, 333, 333]), new CncFun("hate_V", [352, 353, 354, 352, 352, 355, 355, 356, 356, 353, 354, 352, 352, 355, 355, 356, 356, 357, 333, 333, 333, 333, 333, 333]), new CncFun("hear_V", [358, 359, 360, 358, 358, 361, 361, 362, 362, 359, 360, 358, 358, 361, 361, 362, 362, 363, 333, 333, 333, 333, 333, 333]), new CncFun("hunt_V", [364, 365, 366, 364, 364, 367, 367, 368, 368, 365, 366, 364, 364, 367, 367, 368, 368, 369, 333, 333, 333, 333, 333, 333]), new CncFun("like_V", [370, 371, 371, 370, 370, 372, 372, 373, 373, 371, 371, 370, 370, 372, 372, 373, 373, 374, 333, 333, 333, 333, 333, 333]), new CncFun("see_V", [375, 376, 377, 375, 375, 378, 378, 379, 379, 376, 377, 375, 375, 378, 378, 379, 379, 380, 333, 333, 333, 333, 333, 333]), new CncFun("throw_V", [381, 382, 383, 381, 381, 384, 384, 385, 385, 382, 383, 381, 381, 384, 384, 385, 385, 386, 333, 333, 333, 333, 333, 333]), new CncFun("watch_V", [387, 388, 389, 390, 390, 391, 391, 392, 392, 393, 394, 387, 387, 395, 395, 396, 396, 397, 333, 333, 333, 333, 333, 398]), new CncFun("VerbVS", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413]), new CncFun("VerbVV", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413]), new CncFun("copula", [414, 415, 416, 414, 414, 417, 417, 418, 418, 415, 416, 414, 414, 417, 417, 418, 418, 419, 333, 333, 333, 333, 333, 333]), new CncFun("fly_V", [420, 421, 422, 420, 420, 423, 423, 424, 424, 421, 422, 420, 420, 423, 423, 424, 424, 425, 333, 333, 333, 333, 333, 333]), new CncFun("sit_V", [426, 427, 428, 426, 426, 429, 429, 430, 430, 427, 428, 426, 426, 429, 429, 430, 430, 431, 333, 333, 333, 333, 333, 333]), new CncFun("sleep_V", [432, 433, 434, 432, 432, 435, 435, 436, 436, 433, 434, 432, 432, 435, 435, 436, 436, 437, 333, 333, 333, 333, 333, 333]), new CncFun("swim_V", [438, 439, 440, 438, 438, 441, 441, 442, 442, 439, 440, 438, 438, 441, 441, 442, 442, 443, 333, 333, 333, 333, 333, 333]), new CncFun("run_V", [444, 445, 446, 444, 444, 447, 447, 448, 448, 445, 446, 444, 444, 447, 447, 448, 448, 449, 333, 333, 333, 333, 333, 333]), new CncFun("walk_V", [450, 451, 452, 450, 450, 453, 453, 454, 454, 451, 452, 450, 450, 453, 453, 454, 454, 455, 333, 333, 333, 333, 333, 333]), new CncFun("listen_V", [456, 359, 360, 358, 358, 361, 361, 362, 362, 457, 458, 456, 456, 459, 459, 460, 460, 461, 333, 333, 333, 333, 333, 105]), new CncFun("know_VQ", []), new CncFun("wonder_VQ", []), new CncFun("hope_VS", [462, 463, 464, 462, 462, 465, 465, 466, 466, 463, 464, 462, 462, 465, 465, 466, 466, 467, 333, 333, 333, 333, 333, 333, 462, 463, 464, 462, 462, 465, 465, 466, 466, 463, 464, 462, 462, 465, 465, 466, 466, 467, 333, 333]), new CncFun("know_VS", [468, 77, 77, 468, 468, 469, 469, 470, 470, 77, 77, 468, 468, 469, 469, 470, 470, 471, 333, 333, 333, 333, 333, 333, 468, 77, 77, 468, 468, 469, 469, 470, 470, 77, 77, 468, 468, 469, 469, 470, 470, 471, 333, 333]), new CncFun("say_VS", [472, 473, 474, 472, 472, 475, 475, 476, 476, 473, 474, 472, 472, 475, 475, 476, 476, 477, 333, 333, 333, 333, 333, 333, 472, 473, 474, 472, 472, 475, 475, 476, 476, 473, 474, 472, 472, 475, 475, 476, 476, 477, 333, 333]), new CncFun("want_VV", [478, 479, 479, 478, 478, 480, 480, 481, 481, 479, 479, 478, 478, 480, 480, 481, 481, 482, 333, 333, 333, 333, 333, 333, 478, 479, 479, 478, 478, 480, 480, 481, 481, 479, 479, 478, 478, 480, 480, 481, 481, 482, 333, 333]), new CncFun("when_IAdv", []), new CncFun("where_IAdv", []), new CncFun("why_IAdv", []), new CncFun("whoSg_IP", []), new CncFun("apple_N", [483, 483, 483, 484, 484, 485]), new CncFun("bird_N", [486, 486, 486, 487, 487, 488]), new CncFun("boy_N", [489, 490, 490, 490, 490, 490]), new CncFun("car_N", [491, 491, 491, 491, 491, 491]), new CncFun("chair_N", [492, 492, 492, 493, 493, 494]), new CncFun("default_N", [495, 495, 495, 496, 496, 497]), new CncFun("dog_N", [498, 498, 498, 499, 499, 500]), new CncFun("fish_N", [501, 501, 501, 502, 502, 503]), new CncFun("foot_N", [504, 504, 504, 505, 505, 506]), new CncFun("forest_N", [507, 507, 507, 508, 508, 509]), new CncFun("hat_N", [510, 510, 510, 511, 511, 512]), new CncFun("head_N", [513, 513, 513, 514, 514, 515]), new CncFun("man_N", [516, 516, 516, 517, 517, 518]), new CncFun("shoe_N", [519, 519, 519, 520, 520, 521]), new CncFun("stone_N", [522, 522, 522, 523, 523, 524]), new CncFun("table_N", [525, 525, 525, 526, 526, 527]), new CncFun("tree_N", [528, 528, 528, 529, 529, 530]), new CncFun("wine_N", [531, 531, 531, 532, 532, 533]), new CncFun("cat_N", [534, 534, 534, 535, 535, 535]), new CncFun("cow_N", [536, 536, 536, 537, 537, 538]), new CncFun("fruit_N", [539, 539, 539, 540, 540, 541]), new CncFun("hand_N", [542, 542, 542, 543, 543, 544]), new CncFun("milk_N", [545, 545, 545, 546, 546, 547]), new CncFun("person_N", [548, 548, 548, 549, 549, 549]), new CncFun("woman_N", [550, 550, 550, 551, 551, 551]), new CncFun("animal_N", [552, 552, 552, 553, 553, 554]), new CncFun("beer_N", [555, 555, 555, 556, 556, 557]), new CncFun("bike_N", [558, 558, 558, 559, 559, 560]), new CncFun("boat_N", [561, 561, 561, 562, 562, 563]), new CncFun("book_N", [564, 564, 564, 565, 565, 566]), new CncFun("car_N", [567, 567, 567, 568, 568, 568]), new CncFun("girl_N", [569, 569, 569, 569, 569, 569]), new CncFun("hair_N", [570, 570, 570, 571, 571, 572]), new CncFun("horse_N", [573, 573, 573, 574, 574, 575]), new CncFun("house_N", [576, 576, 576, 577, 577, 578]), new CncFun("shirt_N", [579, 579, 579, 580, 580, 580]), new CncFun("water_N", [581, 581, 581, 581, 581, 582]), new CncFun("AdvNP", [87, 115, 583, 125, 584]), new CncFun("DetCN", [87, 290, 121, 585, 586]), new CncFun("DetCN", [91, 587, 121, 585, 586]), new CncFun("DetCN", [89, 588, 124, 589, 590]), new CncFun("DetCN", [128, 129, 591, 592, 593]), new CncFun("DetCN", [594, 595, 591, 592, 593]), new CncFun("DetCN", [596, 597, 598, 599, 600]), new CncFun("DetCN", [601, 602, 603, 604, 605]), new CncFun("DetCN", [606, 607, 603, 604, 605]), new CncFun("DetCN", [608, 609, 610, 611, 612]), new CncFun("UsePron", [1, 96, 97, 613, 614]), new CncFun("DetCN", [94, 615, 124, 589, 590]), new CncFun("DetCN", [616, 617, 598, 599, 600]), new CncFun("UsePN", [1, 96, 97, 613, 614]), new CncFun("default_NP", [618, 618, 618, 619, 620]), new CncFun("DetCN", [621, 622, 610, 611, 612]), new CncFun("NumSg", [333, 333, 333, 333, 333, 333, 333, 333, 333]), new CncFun("NumPl", [333, 333, 333, 333, 333, 333, 333, 333, 333]), new CncFun("berlin_PN", [623, 623, 623]), new CncFun("britain_PN", [624, 624, 624]), new CncFun("default_PN", [625, 625, 625]), new CncFun("germany_PN", [626, 626, 626]), new CncFun("gothenburg_PN", [627, 627, 627]), new CncFun("john_PN", [628, 628, 628]), new CncFun("london_PN", [629, 629, 629]), new CncFun("mary_PN", [630, 630, 630]), new CncFun("sweden_PN", [631, 631, 631]), new CncFun("Pos", [333]), new CncFun("Neg", [333]), new CncFun("by8agent_Prep", [632, 333]), new CncFun("with_Prep", [633, 333]), new CncFun("in_Prep", [333, 333]), new CncFun("possess_Prep", [333, 333]), new CncFun("i_Pron", [634, 635, 636]), new CncFun("he_Pron", [637, 638, 639]), new CncFun("she_Pron", [640, 640, 641]), new CncFun("we_Pron", [642, 643, 643]), new CncFun("they_Pron", [640, 640, 644]), new CncFun("QuestCl", []), new CncFun("QuestIAdv", []), new CncFun("QuestVP", []), new CncFun("IndefArt", [645, 646, 647, 648, 649, 650, 650, 651, 652, 653, 645, 645, 647, 648, 649, 333, 333, 333, 654, 655, 333, 333, 333, 654, 655, 333, 333, 333, 654, 655]), new CncFun("DefArt", [656, 657, 658, 659, 660, 661, 661, 656, 662, 663, 664, 664, 658, 659, 660, 661, 661, 657, 665, 666, 661, 661, 657, 665, 666, 661, 661, 657, 665, 666]), new CncFun("that_Quant", [667, 668, 669, 670, 671, 672, 672, 667, 673, 674, 675, 675, 669, 670, 671, 672, 672, 668, 676, 677, 672, 672, 668, 676, 677, 672, 672, 668, 676, 677]), new CncFun("this_Quant", [678, 679, 680, 681, 682, 683, 683, 678, 684, 685, 686, 686, 680, 681, 682, 683, 683, 679, 687, 688, 683, 683, 679, 687, 688, 683, 683, 679, 687, 688]), new CncFun("UseCl", [689, 690]), new CncFun("UseCl", [691, 692]), new CncFun("UseCl", [693, 694]), new CncFun("UseCl", [695, 696]), new CncFun("UseCl", [697, 698]), new CncFun("UseCl", [699, 700]), new CncFun("StartUtt", [1]), new CncFun("although_Subj", []), new CncFun("because_Subj", []), new CncFun("when_Subj", []), new CncFun("Pres", [333]), new CncFun("Perf", [333]), new CncFun("Past", [333]), new CncFun("UttS", [701]), new CncFun("AdvVP", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 702, 413, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720]), new CncFun("ComplVS", [703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 333, 723, 333, 724, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333]), new CncFun("UseV", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333, 333]), new CncFun("UseVA", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 333, 725, 333, 725, 333, 725, 333, 725, 333, 725, 333, 725, 333, 725, 333, 725]), new CncFun("UseVN", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726]), new CncFun("UseVN", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333, 726, 333]), new CncFun("UseVNA", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 333, 727, 333, 727, 333, 727, 333, 727, 333, 727, 333, 727, 333, 727, 333, 727]), new CncFun("UseVNA", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 726, 728, 726, 728, 726, 728, 726, 728, 726, 728, 726, 728, 726, 728, 726, 728]), new CncFun("UseVNN", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 333, 729, 333, 729, 333, 729, 333, 729, 333, 729, 333, 729, 333, 729, 333, 729]), new CncFun("UseVNN", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 333, 730, 333, 730, 333, 730, 333, 730, 333, 730, 333, 730, 333, 730, 333, 730]), new CncFun("UseVNN", [1, 96, 97, 98, 99, 100, 101, 102, 103, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 333, 723, 333, 333, 333, 333, 726, 731, 726, 731, 726, 731, 726, 731, 726, 731, 726, 731, 726, 731, 726, 731]), new CncFun("ComplVV", [703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 333, 723, 333, 732, 733, 734, 333, 735, 333, 736, 333, 737, 333, 738, 333, 739, 333, 740, 333, 741, 333, 742])], [[new SymLit(0, 0)], [new SymCat(0, 0)], [new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("es"), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("sich"), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("seiner"), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("es"), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("sich"), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("seiner"), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("es"), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("sich"), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("seiner"), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, 38), new SymCat(0, 39), new SymCat(0, 22), new SymCat(0, 24), new SymCat(0, 20), new SymCat(0, 18), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("groß")], [new SymKS("großer")], [new SymKS("großen")], [new SymKS("große")], [new SymKS("großes")], [new SymKS("schwarz")], [new SymKS("schwarzer")], [new SymKS("schwarzen")], [new SymKS("schwarze")], [new SymKS("schwarzes")], [new SymKS("blau")], [new SymKS("blauer")], [new SymKS("blauen")], [new SymKS("blaue")], [new SymKS("blaues")], [new SymKS("[adjektiv]")], [new SymKS("[adjektiv]er")], [new SymKS("[adjektiv]en")], [new SymKS("[adjektiv]e")], [new SymKS("[adjektiv]es")], [new SymKS("grün")], [new SymKS("grüner")], [new SymKS("grünen")], [new SymKS("grüne")], [new SymKS("grünes")], [new SymKS("schwer")], [new SymKS("schwereer")], [new SymKS("schwereen")], [new SymKS("schweree")], [new SymKS("schwerees")], [new SymKS("lang")], [new SymKS("langer")], [new SymKS("langen")], [new SymKS("lange")], [new SymKS("langes")], [new SymKS("rot")], [new SymKS("roter")], [new SymKS("roten")], [new SymKS("rote")], [new SymKS("rotes")], [new SymKS("kurz")], [new SymKS("kurzer")], [new SymKS("kurzen")], [new SymKS("kurze")], [new SymKS("kurzes")], [new SymKS("klein")], [new SymKS("kleiner")], [new SymKS("kleinen")], [new SymKS("kleine")], [new SymKS("kleines")], [new SymKS("dick")], [new SymKS("dicker")], [new SymKS("dicken")], [new SymKS("dicke")], [new SymKS("dickes")], [new SymKS("dünn")], [new SymKS("dünner")], [new SymKS("dünnen")], [new SymKS("dünne")], [new SymKS("dünnes")], [new SymKS("weiß")], [new SymKS("weißer")], [new SymKS("weißen")], [new SymKS("weiße")], [new SymKS("weißes")], [new SymKS("gelb")], [new SymKS("gelber")], [new SymKS("gelben")], [new SymKS("gelbe")], [new SymKS("gelbes")], [new SymCat(0, 0), new SymCat(1, 0)], [new SymCat(0, 0), new SymCat(1, 1)], [new SymCat(0, 0), new SymCat(1, 2)], [new SymCat(0, 0), new SymCat(1, 3)], [new SymCat(0, 0), new SymCat(1, 4)], [new SymCat(0, 0), new SymCat(1, 5)], [new SymCat(0, 0), new SymCat(1, 6)], [new SymCat(0, 0), new SymCat(1, 7)], [new SymCat(0, 0), new SymCat(1, 8)], [new SymCat(0, 1)], [new SymCat(0, 2)], [new SymCat(0, 3)], [new SymCat(0, 4)], [new SymCat(0, 5)], [new SymCat(0, 6)], [new SymCat(0, 7)], [new SymCat(0, 8)], [new SymKS("so")], [new SymKS("zu")], [new SymKS("sehr")], [new SymCat(0, 0), new SymCat(1, 1), new SymCat(0, 1)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(0, 1)], [new SymCat(0, 0), new SymCat(1, 3), new SymCat(0, 1)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(0, 1)], [new SymKS("überall")], [new SymKS("hier")], [new SymKS("irgendwo")], [new SymKS("da")], [new SymCat(0, 1), new SymCat(1, 0)], [new SymCat(0, 2), new SymCat(1, 1)], [new SymCat(0, 7), new SymCat(1, 2)], [new SymCat(0, 8), new SymCat(1, 3)], [new SymCat(0, 3), new SymCat(1, 4)], [new SymCat(0, 2), new SymCat(1, 5)], [new SymCat(0, 2), new SymCat(1, 6)], [new SymCat(0, 2), new SymCat(1, 7)], [new SymCat(0, 2), new SymCat(1, 8)], [new SymCat(0, 2), new SymCat(1, 9)], [new SymCat(0, 3), new SymCat(1, 0)], [new SymCat(0, 4), new SymCat(1, 1)], [new SymCat(0, 3), new SymCat(1, 5)], [new SymCat(0, 5), new SymCat(1, 0)], [new SymCat(0, 6), new SymCat(1, 1)], [new SymCat(0, 0), new SymCat(1, 1), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 9), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 1), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 9), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("habe"), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("habe"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("habe"), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("habe"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 5), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 13), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 5), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 13), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("bin"), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("bin"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("bin"), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("bin"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("habe"), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 20), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymKS("habe"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("habe"), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 26), new SymCat(1, 21), new SymCat(1, 27), new SymCat(1, 22), new SymCat(1, 25), new SymKS("habe"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 10), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 10), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("hat"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("hat"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 6), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 14), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 6), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 14), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("ist"), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("ist"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("ist"), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("ist"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 20), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymKS("hat"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 28), new SymCat(1, 21), new SymCat(1, 29), new SymCat(1, 22), new SymCat(1, 25), new SymKS("hat"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 12), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 12), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 16), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 16), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 20), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 30), new SymCat(1, 21), new SymCat(1, 31), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 10), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 10), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("hat"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("hat"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 6), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 14), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 6), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 14), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("ist"), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("ist"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("ist"), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("ist"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 20), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymKS("hat"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 32), new SymCat(1, 21), new SymCat(1, 33), new SymCat(1, 22), new SymCat(1, 25), new SymKS("hat"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 3), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 11), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 3), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 11), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 7), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 15), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 7), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 15), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 20), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 34), new SymCat(1, 21), new SymCat(1, 35), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 12), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 12), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 16), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 16), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 20), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 36), new SymCat(1, 21), new SymCat(1, 37), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 10), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 10), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("hat"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("hat"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 6), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 14), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 6), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 14), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("ist"), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("ist"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("ist"), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("ist"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 20), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymKS("hat"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("hat"), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 38), new SymCat(1, 21), new SymCat(1, 39), new SymCat(1, 22), new SymCat(1, 25), new SymKS("hat"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 12), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 12), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("haben"), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 16), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 19), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 16), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("sind"), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 17), new SymKS("sind"), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 20), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymKS("haben"), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 0), new SymCat(1, 40), new SymCat(1, 21), new SymCat(1, 41), new SymCat(1, 22), new SymCat(1, 25), new SymKS("haben"), new SymCat(1, 24), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 23)], [new SymCat(0, 1), new SymCat(1, 1)], [new SymCat(0, 2), new SymCat(1, 2)], [new SymCat(0, 3), new SymCat(1, 2)], [new SymCat(0, 4), new SymCat(1, 2)], [new SymCat(0, 5), new SymCat(1, 3)], [new SymCat(0, 6), new SymCat(1, 4)], [new SymCat(0, 7), new SymCat(1, 5)], [new SymCat(0, 8), new SymCat(1, 5)], [new SymCat(0, 9), new SymCat(1, 5)], [new SymCat(0, 10), new SymCat(1, 6)], [new SymCat(0, 11), new SymCat(1, 7)], [new SymCat(0, 12), new SymCat(1, 8)], [new SymCat(0, 13), new SymCat(1, 8)], [new SymCat(0, 14), new SymCat(1, 8)], [new SymKS("jeder")], [new SymKS("jeden")], [new SymKS("jedem")], [new SymKS("in"), new SymKS("jedem")], [new SymKS("von"), new SymKS("jedem")], [new SymKS("jede")], [new SymKS("in"), new SymKS("jeder")], [new SymKS("von"), new SymKS("jeder")], [new SymKS("jedes")], [new SymCat(0, 15), new SymCat(1, 0)], [new SymCat(0, 16), new SymCat(1, 1)], [new SymCat(0, 17), new SymCat(1, 2)], [new SymCat(0, 18), new SymCat(1, 2)], [new SymCat(0, 19), new SymCat(1, 2)], [new SymCat(0, 20), new SymCat(1, 3)], [new SymCat(0, 21), new SymCat(1, 4)], [new SymCat(0, 22), new SymCat(1, 5)], [new SymCat(0, 23), new SymCat(1, 5)], [new SymCat(0, 24), new SymCat(1, 5)], [new SymCat(0, 25), new SymCat(1, 6)], [new SymCat(0, 26), new SymCat(1, 7)], [new SymCat(0, 27), new SymCat(1, 8)], [new SymCat(0, 28), new SymCat(1, 8)], [new SymCat(0, 29), new SymCat(1, 8)], [new SymKS("zerschlagen")], [new SymKS("zerschlage")], [new SymKS("zerschlägt")], [new SymKS("zerschlug")], [new SymKS("zerschlugen")], [], [new SymKS("kaufen")], [new SymKS("kaufe")], [new SymKS("kauft")], [new SymKS("kaufte")], [new SymKS("kauften")], [new SymKS("gekauft")], [new SymKS("trinken")], [new SymKS("trinke")], [new SymKS("trinkt")], [new SymKS("trank")], [new SymKS("tranken")], [new SymKS("getrunken")], [new SymKS("essen")], [new SymKS("esse")], [new SymKS("ißt")], [new SymKS("aß")], [new SymKS("aßen")], [new SymKS("gegessen")], [new SymKS("hassen")], [new SymKS("hasse")], [new SymKS("hasst")], [new SymKS("hasste")], [new SymKS("hassten")], [new SymKS("gehasst")], [new SymKS("hören")], [new SymKS("höre")], [new SymKS("hört")], [new SymKS("hörte")], [new SymKS("hörten")], [new SymKS("gehört")], [new SymKS("jagen")], [new SymKS("jage")], [new SymKS("jagt")], [new SymKS("jagte")], [new SymKS("jagten")], [new SymKS("gejagt")], [new SymKS("mögen")], [new SymKS("mag")], [new SymKS("mochte")], [new SymKS("mochten")], [new SymKS("gemocht")], [new SymKS("sehen")], [new SymKS("sehe")], [new SymKS("sieht")], [new SymKS("sah")], [new SymKS("sahen")], [new SymKS("gesehen")], [new SymKS("werfen")], [new SymKS("werfe")], [new SymKS("wirft")], [new SymKS("warf")], [new SymKS("warfen")], [new SymKS("geworfen")], [new SymKS("anschauen")], [new SymKS("schaue")], [new SymKS("schaut")], [new SymKS("schauen")], [new SymKS("schaute")], [new SymKS("schauten")], [new SymKS("anschaue")], [new SymKS("anschaut")], [new SymKS("anschaute")], [new SymKS("anschauten")], [new SymKS("angeschaut")], [new SymKS("an")], [new SymCat(0, 9)], [new SymCat(0, 10)], [new SymCat(0, 11)], [new SymCat(0, 12)], [new SymCat(0, 13)], [new SymCat(0, 14)], [new SymCat(0, 15)], [new SymCat(0, 16)], [new SymCat(0, 17)], [new SymCat(0, 18)], [new SymCat(0, 19)], [new SymCat(0, 20)], [new SymCat(0, 21)], [new SymCat(0, 22)], [new SymCat(0, 23)], [new SymKS("sein")], [new SymKS("see")], [new SymKS("ist")], [new SymKS("war")], [new SymKS("waren")], [new SymKS("gewesen")], [new SymKS("fliegen")], [new SymKS("fliege")], [new SymKS("fliegt")], [new SymKS("fliegte")], [new SymKS("fliegten")], [new SymKS("gefliegt")], [new SymKS("sitzen")], [new SymKS("sitze")], [new SymKS("sitzt")], [new SymKS("saß")], [new SymKS("saßen")], [new SymKS("gesessen")], [new SymKS("schlafen")], [new SymKS("schlafe")], [new SymKS("schläft")], [new SymKS("schlief")], [new SymKS("schliefen")], [new SymKS("geschlafen")], [new SymKS("schwimmen")], [new SymKS("schwimme")], [new SymKS("schwimmt")], [new SymKS("schwimmte")], [new SymKS("schwimmten")], [new SymKS("geschwimmt")], [new SymKS("laufen")], [new SymKS("laufe")], [new SymKS("läuft")], [new SymKS("lief")], [new SymKS("liefen")], [new SymKS("gelaufen")], [new SymKS("gehen")], [new SymKS("gehe")], [new SymKS("geht")], [new SymKS("ging")], [new SymKS("gingen")], [new SymKS("gegangen")], [new SymKS("zuhören")], [new SymKS("zuhöre")], [new SymKS("zuhört")], [new SymKS("zuhörte")], [new SymKS("zuhörten")], [new SymKS("zugehört")], [new SymKS("hoffen")], [new SymKS("hoffe")], [new SymKS("hofft")], [new SymKS("hoffte")], [new SymKS("hofften")], [new SymKS("gehofft")], [new SymKS("wissen")], [new SymKS("wusste")], [new SymKS("wussten")], [new SymKS("gewusst")], [new SymKS("sagen")], [new SymKS("sage")], [new SymKS("sagt")], [new SymKS("sagte")], [new SymKS("sagten")], [new SymKS("gesagt")], [new SymKS("wollen")], [new SymKS("will")], [new SymKS("wollte")], [new SymKS("wollten")], [new SymKS("gewollt")], [new SymKS("Apfel")], [new SymKS("Äpfel")], [new SymKS("Äpfeln")], [new SymKS("Vogel")], [new SymKS("Vögel")], [new SymKS("Vögeln")], [new SymKS("Junge")], [new SymKS("Jungen")], [new SymKS("Wagen")], [new SymKS("Stuhl")], [new SymKS("Stühle")], [new SymKS("Stühlen")], [new SymKS("[Ding]")], [new SymKS("[Ding]e")], [new SymKS("[Ding]en")], [new SymKS("Hund")], [new SymKS("Hunde")], [new SymKS("Hunden")], [new SymKS("Fisch")], [new SymKS("Fische")], [new SymKS("Fischen")], [new SymKS("Fuß")], [new SymKS("Füße")], [new SymKS("Füßen")], [new SymKS("Wald")], [new SymKS("Wälder")], [new SymKS("Wäldern")], [new SymKS("Hut")], [new SymKS("Hüte")], [new SymKS("Hüten")], [new SymKS("Kopf")], [new SymKS("Köpfe")], [new SymKS("Köpfen")], [new SymKS("Mann")], [new SymKS("Männer")], [new SymKS("Männern")], [new SymKS("Schuh")], [new SymKS("Schuhe")], [new SymKS("Schuhen")], [new SymKS("Stein")], [new SymKS("Steine")], [new SymKS("Steinen")], [new SymKS("Tisch")], [new SymKS("Tische")], [new SymKS("Tischen")], [new SymKS("Baum")], [new SymKS("Bäume")], [new SymKS("Bäumen")], [new SymKS("Wein")], [new SymKS("Weine")], [new SymKS("Weinen")], [new SymKS("Katze")], [new SymKS("Katzen")], [new SymKS("Kuh")], [new SymKS("Kühe")], [new SymKS("Kühen")], [new SymKS("Frucht")], [new SymKS("Früchte")], [new SymKS("Früchten")], [new SymKS("Hand")], [new SymKS("Hände")], [new SymKS("Händen")], [new SymKS("Milch")], [new SymKS("Milche")], [new SymKS("Milchen")], [new SymKS("Person")], [new SymKS("Personen")], [new SymKS("Frau")], [new SymKS("Frauen")], [new SymKS("Tier")], [new SymKS("Tiere")], [new SymKS("Tieren")], [new SymKS("Bier")], [new SymKS("Biere")], [new SymKS("Bieren")], [new SymKS("Fahrrad")], [new SymKS("Fahrräder")], [new SymKS("Fahrrädern")], [new SymKS("Boot")], [new SymKS("Boote")], [new SymKS("Booten")], [new SymKS("Buch")], [new SymKS("Bücher")], [new SymKS("Büchern")], [new SymKS("Auto")], [new SymKS("Autos")], [new SymKS("Mädchen")], [new SymKS("Haar")], [new SymKS("Haare")], [new SymKS("Haaren")], [new SymKS("Pferd")], [new SymKS("Pferde")], [new SymKS("Pferden")], [new SymKS("Haus")], [new SymKS("Häuser")], [new SymKS("Häusern")], [new SymKS("Hemd")], [new SymKS("Hemden")], [new SymKS("Wasser")], [new SymKS("Wassern")], [new SymCat(0, 2), new SymCat(1, 0)], [new SymCat(0, 4), new SymCat(1, 0)], [new SymCat(0, 3), new SymCat(1, 6)], [new SymCat(0, 4), new SymCat(1, 6)], [new SymCat(0, 1), new SymCat(1, 5)], [new SymCat(0, 1), new SymCat(1, 3)], [new SymCat(0, 3), new SymCat(1, 9)], [new SymCat(0, 4), new SymCat(1, 9)], [new SymCat(0, 7), new SymCat(1, 6)], [new SymCat(0, 8), new SymCat(1, 6)], [new SymCat(0, 9), new SymCat(1, 6)], [new SymCat(0, 5), new SymCat(1, 4)], [new SymCat(0, 6), new SymCat(1, 5)], [new SymCat(0, 5), new SymCat(1, 2)], [new SymCat(0, 6), new SymCat(1, 3)], [new SymCat(0, 7), new SymCat(1, 9)], [new SymCat(0, 8), new SymCat(1, 9)], [new SymCat(0, 9), new SymCat(1, 9)], [new SymCat(0, 10), new SymCat(1, 0)], [new SymCat(0, 11), new SymCat(1, 1)], [new SymCat(0, 12), new SymCat(1, 6)], [new SymCat(0, 13), new SymCat(1, 6)], [new SymCat(0, 14), new SymCat(1, 6)], [new SymCat(0, 10), new SymCat(1, 4)], [new SymCat(0, 11), new SymCat(1, 5)], [new SymCat(0, 10), new SymCat(1, 2)], [new SymCat(0, 11), new SymCat(1, 3)], [new SymCat(0, 12), new SymCat(1, 9)], [new SymCat(0, 13), new SymCat(1, 9)], [new SymCat(0, 14), new SymCat(1, 9)], [new SymKS("in"), new SymCat(0, 2)], [new SymKS("von"), new SymCat(0, 2)], [new SymCat(0, 1), new SymCat(1, 8)], [new SymCat(0, 5), new SymCat(1, 7)], [new SymCat(0, 6), new SymCat(1, 8)], [new SymKS("[irgendwas]")], [new SymKS("in"), new SymKS("[irgendwas]")], [new SymKS("von"), new SymKS("[irgendwas]")], [new SymCat(0, 10), new SymCat(1, 7)], [new SymCat(0, 11), new SymCat(1, 8)], [new SymKS("Berlin")], [new SymKS("England")], [new SymKS("[Nahme]")], [new SymKS("Deutschland")], [new SymKS("Göteburg")], [new SymKS("Johann")], [new SymKS("London")], [new SymKS("Maria")], [new SymKS("Schweden")], [new SymKS("durch")], [new SymKS("mit")], [new SymKS("ich")], [new SymKS("mich")], [new SymKS("mir")], [new SymKS("er")], [new SymKS("ihn")], [new SymKS("ihm")], [new SymKS("sie")], [new SymKS("ihr")], [new SymKS("wir")], [new SymKS("uns")], [new SymKS("ihnen")], [new SymKS("ein")], [new SymKS("einen")], [new SymKS("einem")], [new SymKS("in"), new SymKS("einem")], [new SymKS("von"), new SymKS("einem")], [new SymKS("eine")], [new SymKS("einer")], [new SymKS("in"), new SymKS("einer")], [new SymKS("von"), new SymKS("einer")], [new SymKS("in")], [new SymKS("von")], [new SymKS("der")], [new SymKS("den")], [new SymKS("dem")], [new SymKS("im")], [new SymKS("vom")], [new SymKS("die")], [new SymKS("in"), new SymKS("der")], [new SymKS("von"), new SymKS("der")], [new SymKS("das")], [new SymKS("in"), new SymKS("den")], [new SymKS("von"), new SymKS("den")], [new SymKS("jener")], [new SymKS("jenen")], [new SymKS("jenem")], [new SymKS("in"), new SymKS("jenem")], [new SymKS("von"), new SymKS("jenem")], [new SymKS("jene")], [new SymKS("in"), new SymKS("jener")], [new SymKS("von"), new SymKS("jener")], [new SymKS("jenes")], [new SymKS("in"), new SymKS("jenen")], [new SymKS("von"), new SymKS("jenen")], [new SymKS("dieser")], [new SymKS("diesen")], [new SymKS("diesem")], [new SymKS("in"), new SymKS("diesem")], [new SymKS("von"), new SymKS("diesem")], [new SymKS("diese")], [new SymKS("in"), new SymKS("dieser")], [new SymKS("von"), new SymKS("dieser")], [new SymKS("dieses")], [new SymKS("in"), new SymKS("diesen")], [new SymKS("von"), new SymKS("diesen")], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 0)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 1)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 8)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 9)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 4)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 5)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 2)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 3)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 10)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 11)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 6)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 7)], [new SymCat(0, 0), new SymKS(".")], [new SymCat(0, 22), new SymCat(1, 0)], [new SymCat(0, 24)], [new SymCat(0, 25)], [new SymCat(0, 26)], [new SymCat(0, 27)], [new SymCat(0, 28)], [new SymCat(0, 29)], [new SymCat(0, 30)], [new SymCat(0, 31)], [new SymCat(0, 32)], [new SymCat(0, 33)], [new SymCat(0, 34)], [new SymCat(0, 35)], [new SymCat(0, 36)], [new SymCat(0, 37)], [new SymCat(0, 38)], [new SymCat(0, 39)], [new SymCat(0, 40)], [new SymCat(0, 41)], [new SymCat(0, 42)], [new SymCat(0, 43)], [new SymKS("nicht")], [new SymKS(","), new SymKS("dass"), new SymCat(1, 1)], [new SymCat(1, 0)], [new SymCat(0, 18), new SymCat(1, 1), new SymCat(0, 19)], [new SymCat(0, 18), new SymCat(1, 1), new SymCat(0, 19), new SymCat(2, 0)], [new SymCat(2, 0)], [new SymCat(0, 18), new SymCat(1, 1), new SymCat(0, 19), new SymCat(0, 20), new SymCat(2, 1), new SymCat(0, 21)], [new SymCat(0, 18), new SymCat(1, 1), new SymCat(0, 19), new SymCat(0, 20), new SymCat(2, 2), new SymCat(0, 21)], [new SymCat(0, 20), new SymCat(2, 2), new SymCat(0, 21)], [new SymCat(1, 23)], [new SymCat(1, 20), new SymCat(1, 18), new SymCat(1, 0)], [new SymCat(1, 24)], [new SymCat(1, 26), new SymCat(1, 27), new SymCat(1, 22)], [new SymCat(1, 28), new SymCat(1, 29), new SymCat(1, 22)], [new SymCat(1, 30), new SymCat(1, 31), new SymCat(1, 22)], [new SymCat(1, 32), new SymCat(1, 33), new SymCat(1, 22)], [new SymCat(1, 34), new SymCat(1, 35), new SymCat(1, 22)], [new SymCat(1, 36), new SymCat(1, 37), new SymCat(1, 22)], [new SymCat(1, 38), new SymCat(1, 39), new SymCat(1, 22)], [new SymCat(1, 40), new SymCat(1, 41), new SymCat(1, 22)]], { A: { s: 0, e: 0 }, A2: { s: 1, e: 18 }, AP: { s: 19, e: 20 }, AdA: { s: 21, e: 21 }, AdN: { s: 22, e: 22 }, AdV: { s: 23, e: 23 }, Adv: { s: 24, e: 24 }, Adverb: { s: 25, e: 25 }, Ant: { s: 26, e: 27 }, CAdv: { s: 28, e: 28 }, CN: { s: 29, e: 31 }, Card: { s: 32, e: 33 }, Cl: { s: 34, e: 34 }, ClSlash: { s: 35, e: 52 }, Comp: { s: 53, e: 53 }, Conj: { s: 54, e: 55 }, DAP: { s: 56, e: 56 }, Det: { s: 57, e: 64 }, Digits: { s: 65, e: 66 }, Float: { s: -3, e: -3 }, GraspV: { s: 67, e: 3306 }, GraspVQ: { s: 3307, e: 35706 }, GraspVS: { s: 35707, e: 68106 }, GraspVV: { s: 68107, e: 132906 }, IAdv: { s: 132907, e: 132907 }, IComp: { s: 132908, e: 132908 }, IDet: { s: 132909, e: 132910 }, IP: { s: 132911, e: 132912 }, IQuant: { s: 132913, e: 132913 }, Imp: { s: 132914, e: 132914 }, Int: { s: -2, e: -2 }, Interj: { s: 132915, e: 132915 }, N: { s: 132916, e: 132918 }, N2: { s: 132919, e: 132972 }, N3: { s: 132973, e: 133944 }, NP: { s: 133945, e: 133980 }, Num: { s: 133981, e: 133984 }, Numeral: { s: 133985, e: 133986 }, Ord: { s: 133987, e: 133987 }, PConj: { s: 133988, e: 133988 }, PN: { s: 133989, e: 133989 }, Phr: { s: 133990, e: 133990 }, Pol: { s: 133991, e: 133992 }, Predet: { s: 133993, e: 134022 }, Prep: { s: 134023, e: 134040 }, Pron: { s: 134041, e: 134058 }, QCl: { s: 134059, e: 134059 }, QS: { s: 134060, e: 134060 }, Quant: { s: 134061, e: 134064 }, RCl: { s: 134065, e: 134068 }, RP: { s: 134069, e: 134075 }, RS: { s: 134076, e: 134079 }, S: { s: 134080, e: 134080 }, SC: { s: 134081, e: 134081 }, SSlash: { s: 134082, e: 134099 }, Start: { s: 134100, e: 134100 }, String: { s: -1, e: -1 }, Subj: { s: 134101, e: 134101 }, Temp: { s: 134102, e: 134117 }, Tense: { s: 134118, e: 134125 }, Text: { s: 134126, e: 134126 }, Utt: { s: 134127, e: 134127 }, V: { s: 134128, e: 134137 }, V2: { s: 134138, e: 134317 }, V2A: { s: 134318, e: 134497 }, V2Q: { s: 134498, e: 134677 }, V2S: { s: 134678, e: 134857 }, V2V: { s: 134858, e: 135217 }, V3: { s: 135218, e: 138457 }, VA: { s: 138458, e: 138467 }, VP: { s: 138468, e: 138487 }, VPSlash: { s: 138488, e: 138847 }, VQ: { s: 138848, e: 138857 }, VS: { s: 138858, e: 138867 }, VV: { s: 138868, e: 138887 }, Voc: { s: 138888, e: 138888 } }, 148148), GraspSwe: new GFConcrete({}, { 0: [new Apply(157, []), new Apply(158, []), new Apply(159, []), new Apply(160, []), new Apply(161, []), new Apply(162, []), new Apply(163, []), new Apply(164, []), new Apply(165, []), new Apply(166, []), new Apply(167, []), new Apply(168, []), new Apply(169, []), new Apply(170, [])], 7: [new Apply(171, [new PArg(8), new PArg(7)]), new Apply(172, [new PArg(432)])], 8: [new Apply(173, []), new Apply(174, []), new Apply(175, [])], 11: [new Apply(176, [new PArg(257), new PArg(431)]), new Apply(177, [new PArg(12)])], 12: [new Apply(178, []), new Apply(179, []), new Apply(180, []), new Apply(181, [])], 16: [new Apply(182, [new PArg(215)])], 17: [new Apply(182, [new PArg(216)])], 18: [new Apply(183, [new PArg(7), new PArg(429)])], 19: [new Apply(184, [new PArg(7), new PArg(430)])], 22: [new Apply(185, [new PArg(229), new PArg(426)]), new Apply(186, [new PArg(237), new PArg(426)]), new Apply(187, [new PArg(231), new PArg(426)]), new Apply(188, [new PArg(239), new PArg(426)]), new Apply(189, [new PArg(238), new PArg(426)]), new Apply(190, [new PArg(240), new PArg(426)])], 26: [new Apply(191, [])], 27: [new Apply(192, [])], 34: [new Apply(193, [new PArg(272), new PArg(241)]), new Apply(194, [])], 36: [new Apply(195, [new PArg(274), new PArg(241)])], 37: [new Apply(196, [new PArg(272), new PArg(243)])], 39: [new Apply(197, [new PArg(274), new PArg(243)])], 42: [new Apply(198, [new PArg(440)]), new Apply(199, [new PArg(452)]), new Apply(200, []), new Apply(201, []), new Apply(202, []), new Apply(203, []), new Apply(204, []), new Apply(205, []), new Apply(206, []), new Apply(207, []), new Apply(208, []), new Apply(209, []), new Apply(210, []), new Apply(211, []), new Apply(212, []), new Apply(213, []), new Apply(214, []), new Apply(215, [])], 44: [new Apply(216, []), new Apply(217, []), new Apply(218, [])], 46: [new Apply(198, [new PArg(444)])], 54: [new Apply(219, []), new Apply(220, [])], 90: [new Apply(221, []), new Apply(222, [])], 106: [new Apply(223, [])], 126: [new Apply(224, [])], 198: [new Apply(225, []), new Apply(226, []), new Apply(227, [])], 206: [new Apply(228, [])], 215: [new Apply(229, []), new Apply(230, []), new Apply(231, []), new Apply(232, []), new Apply(233, []), new Apply(234, []), new Apply(235, []), new Apply(236, []), new Apply(237, []), new Apply(238, []), new Apply(239, []), new Apply(240, []), new Apply(241, []), new Apply(242, []), new Apply(243, []), new Apply(244, []), new Apply(245, []), new Apply(246, []), new Apply(247, []), new Apply(248, []), new Apply(249, []), new Apply(250, []), new Apply(251, []), new Apply(252, []), new Apply(253, [])], 216: [new Apply(254, []), new Apply(255, []), new Apply(256, []), new Apply(257, []), new Apply(258, []), new Apply(259, []), new Apply(260, []), new Apply(261, []), new Apply(262, []), new Apply(263, []), new Apply(264, [])], 229: [new Apply(265, [new PArg(229), new PArg(11)]), new Apply(266, [new PArg(258)])], 231: [new Apply(265, [new PArg(231), new PArg(11)]), new Apply(266, [new PArg(260)])], 237: [new Apply(265, [new PArg(237), new PArg(11)]), new Apply(266, [new PArg(266)]), new Apply(267, [new PArg(34), new PArg(16)]), new Apply(268, [new PArg(36), new PArg(16)]), new Apply(269, [new PArg(34), new PArg(18)]), new Apply(270, [new PArg(36), new PArg(18)]), new Apply(271, [new PArg(249)]), new Apply(272, [])], 238: [new Apply(265, [new PArg(238), new PArg(11)]), new Apply(273, [new PArg(34), new PArg(17)]), new Apply(274, [new PArg(36), new PArg(17)]), new Apply(275, [new PArg(34), new PArg(19)]), new Apply(276, [new PArg(36), new PArg(19)])], 239: [new Apply(265, [new PArg(239), new PArg(11)]), new Apply(277, [new PArg(37), new PArg(16)]), new Apply(278, [new PArg(39), new PArg(16)]), new Apply(279, [new PArg(37), new PArg(18)]), new Apply(280, [new PArg(39), new PArg(18)])], 240: [new Apply(265, [new PArg(240), new PArg(11)]), new Apply(281, [new PArg(37), new PArg(17)]), new Apply(282, [new PArg(39), new PArg(17)]), new Apply(283, [new PArg(37), new PArg(19)]), new Apply(284, [new PArg(39), new PArg(19)])], 241: [new Apply(285, [])], 243: [new Apply(286, [])], 249: [new Apply(287, []), new Apply(288, []), new Apply(289, []), new Apply(290, []), new Apply(291, []), new Apply(292, []), new Apply(293, []), new Apply(294, []), new Apply(295, [])], 252: [new Apply(296, [])], 253: [new Apply(297, [])], 257: [new Apply(298, []), new Apply(299, []), new Apply(300, []), new Apply(301, [])], 258: [new Apply(302, [])], 260: [new Apply(303, []), new Apply(304, [])], 266: [new Apply(305, []), new Apply(306, [])], 270: [new Apply(307, [new PArg(22)]), new Apply(308, [new PArg(198), new PArg(22)]), new Apply(309, [new PArg(206), new PArg(426)])], 272: [new Apply(310, [])], 274: [new Apply(311, []), new Apply(312, []), new Apply(313, [])], 304: [new Apply(314, [new PArg(310), new PArg(252), new PArg(22)]), new Apply(315, [new PArg(312), new PArg(252), new PArg(22)]), new Apply(316, [new PArg(311), new PArg(252), new PArg(22)]), new Apply(317, [new PArg(310), new PArg(253), new PArg(22)]), new Apply(318, [new PArg(312), new PArg(253), new PArg(22)]), new Apply(319, [new PArg(311), new PArg(253), new PArg(22)])], 308: [new Apply(320, [new PArg(326)])], 309: [new Apply(321, []), new Apply(322, []), new Apply(323, [])], 310: [new Apply(324, [])], 311: [new Apply(325, [])], 312: [new Apply(326, [])], 326: [new Apply(327, [new PArg(304)])], 381: [new Apply(328, [new PArg(433)]), new Apply(329, [new PArg(434)])], 382: [new Apply(330, [new PArg(418), new PArg(11)])], 385: [new Apply(331, [new PArg(422), new PArg(304)]), new Apply(332, [new PArg(423), new PArg(304)]), new Apply(333, [new PArg(425), new PArg(426)]), new Apply(334, [new PArg(433), new PArg(436)]), new Apply(335, [new PArg(434), new PArg(436)]), new Apply(336, [new PArg(433), new PArg(431)]), new Apply(337, [new PArg(434), new PArg(431)]), new Apply(338, [new PArg(433), new PArg(437), new PArg(436)]), new Apply(339, [new PArg(433), new PArg(438), new PArg(436)]), new Apply(340, [new PArg(433), new PArg(439), new PArg(436)]), new Apply(341, [new PArg(434), new PArg(437), new PArg(436)]), new Apply(342, [new PArg(434), new PArg(438), new PArg(436)]), new Apply(343, [new PArg(434), new PArg(439), new PArg(436)]), new Apply(344, [new PArg(433), new PArg(431), new PArg(431)]), new Apply(345, [new PArg(434), new PArg(431), new PArg(431)])], 386: [new Apply(330, [new PArg(420), new PArg(11)])], 418: [new Coerce(381), new Coerce(382)], 420: [new Coerce(385), new Coerce(386)], 422: [new Coerce(90)], 423: [new Coerce(106)], 425: [new Coerce(126)], 426: [new Coerce(381), new Coerce(382), new Coerce(385), new Coerce(386)], 429: [new Coerce(16), new Coerce(18)], 430: [new Coerce(17), new Coerce(19)], 431: [new Coerce(229), new Coerce(231), new Coerce(237), new Coerce(238), new Coerce(239), new Coerce(240)], 432: [new Coerce(0)], 433: [new Coerce(42), new Coerce(44)], 434: [new Coerce(46)], 436: [new Coerce(7)], 437: [new Coerce(229), new Coerce(237)], 438: [new Coerce(231), new Coerce(239), new Coerce(240)], 439: [new Coerce(238)], 440: [new Coerce(90)], 444: [new Coerce(106)], 452: [new Coerce(126)] }, [new CncFun("'lindef A'", [0, 0, 0, 0, 0]), new CncFun("'lindef A2'", []), new CncFun("'lindef AP'", [0, 0, 0, 0, 0]), new CncFun("'lindef AdA'", [0]), new CncFun("'lindef AdN'", []), new CncFun("'lindef AdV'", []), new CncFun("'lindef Adv'", [0]), new CncFun("'lindef Adverb'", [0]), new CncFun("'lindef Ant'", []), new CncFun("'lindef CAdv'", []), new CncFun("'lindef CN'", [0, 0, 0, 0]), new CncFun("'lindef Card'", []), new CncFun("'lindef Cl'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef ClSlash'", []), new CncFun("'lindef Comp'", []), new CncFun("'lindef Conj'", []), new CncFun("'lindef DAP'", []), new CncFun("'lindef Det'", [0, 0, 0, 0]), new CncFun("'lindef Digits'", []), new CncFun("'lindef GraspV'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef GraspVQ'", []), new CncFun("'lindef GraspVS'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef GraspVV'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef IAdv'", []), new CncFun("'lindef IComp'", []), new CncFun("'lindef IDet'", []), new CncFun("'lindef IP'", []), new CncFun("'lindef IQuant'", []), new CncFun("'lindef Imp'", []), new CncFun("'lindef Interj'", []), new CncFun("'lindef N'", [0, 0, 0, 0]), new CncFun("'lindef N2'", []), new CncFun("'lindef N3'", []), new CncFun("'lindef NP'", [0, 0]), new CncFun("'lindef Num'", [0, 0]), new CncFun("'lindef Numeral'", []), new CncFun("'lindef Ord'", []), new CncFun("'lindef PConj'", []), new CncFun("'lindef PN'", [0]), new CncFun("'lindef Phr'", []), new CncFun("'lindef Pol'", [0]), new CncFun("'lindef Predet'", []), new CncFun("'lindef Prep'", [0]), new CncFun("'lindef Pron'", [0, 0]), new CncFun("'lindef QCl'", []), new CncFun("'lindef QS'", []), new CncFun("'lindef Quant'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef RCl'", []), new CncFun("'lindef RP'", []), new CncFun("'lindef RS'", []), new CncFun("'lindef S'", [0, 0]), new CncFun("'lindef SC'", []), new CncFun("'lindef SSlash'", []), new CncFun("'lindef Start'", [0]), new CncFun("'lindef Subj'", []), new CncFun("'lindef Temp'", [0]), new CncFun("'lindef Tense'", []), new CncFun("'lindef Text'", []), new CncFun("'lindef Utt'", [0]), new CncFun("'lindef V'", []), new CncFun("'lindef V2'", []), new CncFun("'lindef V2A'", []), new CncFun("'lindef V2Q'", []), new CncFun("'lindef V2S'", []), new CncFun("'lindef V2V'", []), new CncFun("'lindef V3'", []), new CncFun("'lindef VA'", []), new CncFun("'lindef VP'", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new CncFun("'lindef VPSlash'", []), new CncFun("'lindef VQ'", []), new CncFun("'lindef VS'", []), new CncFun("'lindef VV'", []), new CncFun("'lindef Voc'", []), new CncFun("'lindef A'", [1]), new CncFun("'lindef A2'", [2]), new CncFun("'lindef AP'", [1]), new CncFun("'lindef AdA'", [1]), new CncFun("'lindef AdN'", [2]), new CncFun("'lindef AdV'", [2]), new CncFun("'lindef Adv'", [1]), new CncFun("'lindef Adverb'", [1]), new CncFun("'lindef Ant'", [2]), new CncFun("'lindef CAdv'", [2]), new CncFun("'lindef CN'", [1]), new CncFun("'lindef Card'", [2]), new CncFun("'lindef Cl'", [1]), new CncFun("'lindef ClSlash'", [3]), new CncFun("'lindef Comp'", [2]), new CncFun("'lindef Conj'", [4]), new CncFun("'lindef DAP'", [2]), new CncFun("'lindef Det'", [1]), new CncFun("'lindef Digits'", [2]), new CncFun("'lindef GraspV'", [1]), new CncFun("'lindef GraspVQ'", [2]), new CncFun("'lindef GraspVS'", [1]), new CncFun("'lindef GraspVV'", [1]), new CncFun("'lindef IAdv'", [2]), new CncFun("'lindef IComp'", [2]), new CncFun("'lindef IDet'", [2]), new CncFun("'lindef IP'", [2]), new CncFun("'lindef IQuant'", [2]), new CncFun("'lindef Imp'", [2]), new CncFun("'lindef Interj'", [2]), new CncFun("'lindef N'", [1]), new CncFun("'lindef N2'", [2]), new CncFun("'lindef N3'", [2]), new CncFun("'lindef NP'", [1]), new CncFun("'lindef Num'", [1]), new CncFun("'lindef Numeral'", [2]), new CncFun("'lindef Ord'", [2]), new CncFun("'lindef PConj'", [2]), new CncFun("'lindef PN'", [1]), new CncFun("'lindef Phr'", [2]), new CncFun("'lindef Pol'", [1]), new CncFun("'lindef Predet'", [2]), new CncFun("'lindef Prep'", [1]), new CncFun("'lindef Pron'", [1]), new CncFun("'lindef QCl'", [2]), new CncFun("'lindef QS'", [2]), new CncFun("'lindef Quant'", [1]), new CncFun("'lindef RCl'", [2]), new CncFun("'lindef RP'", [2]), new CncFun("'lindef RS'", [2]), new CncFun("'lindef S'", [1]), new CncFun("'lindef SC'", [2]), new CncFun("'lindef SSlash'", [3]), new CncFun("'lindef Start'", [1]), new CncFun("'lindef Subj'", [2]), new CncFun("'lindef Temp'", [1]), new CncFun("'lindef Tense'", [2]), new CncFun("'lindef Text'", [2]), new CncFun("'lindef Utt'", [1]), new CncFun("'lindef V'", [4]), new CncFun("'lindef V'", [5]), new CncFun("'lindef V2'", [3]), new CncFun("'lindef V2'", [6]), new CncFun("'lindef V2A'", [3]), new CncFun("'lindef V2A'", [6]), new CncFun("'lindef V2Q'", [3]), new CncFun("'lindef V2Q'", [6]), new CncFun("'lindef V2S'", [3]), new CncFun("'lindef V2S'", [6]), new CncFun("'lindef V2V'", [3]), new CncFun("'lindef V2V'", [6]), new CncFun("'lindef V3'", [7]), new CncFun("'lindef V3'", [8]), new CncFun("'lindef VA'", [4]), new CncFun("'lindef VA'", [5]), new CncFun("'lindef VP'", [9]), new CncFun("'lindef VPSlash'", [10]), new CncFun("'lindef VQ'", [4]), new CncFun("'lindef VQ'", [5]), new CncFun("'lindef VS'", [4]), new CncFun("'lindef VS'", [5]), new CncFun("'lindef VV'", [4]), new CncFun("'lindef VV'", [5]), new CncFun("'lindef Voc'", [2]), new CncFun("big_A", [11, 12, 13, 13, 13]), new CncFun("black_A", [14, 14, 15, 15, 15]), new CncFun("blue_A", [16, 17, 18, 18, 18]), new CncFun("default_A", [19, 20, 21, 21, 21]), new CncFun("green_A", [22, 23, 24, 24, 24]), new CncFun("heavy_A", [25, 26, 27, 27, 27]), new CncFun("long_A", [28, 29, 30, 30, 30]), new CncFun("red_A", [31, 32, 33, 33, 33]), new CncFun("short_A", [34, 35, 36, 36, 36]), new CncFun("small_A", [37, 38, 39, 40, 39]), new CncFun("thick_A", [41, 42, 43, 43, 43]), new CncFun("thin_A", [44, 45, 46, 46, 46]), new CncFun("white_A", [47, 48, 49, 49, 49]), new CncFun("yellow_A", [50, 51, 52, 52, 52]), new CncFun("AdAP", [53, 54, 55, 56, 57]), new CncFun("UseA", [1, 58, 59, 60, 61]), new CncFun("so_AdA", [62]), new CncFun("too_AdA", [63]), new CncFun("very_AdA", [64]), new CncFun("PrepNP", [54]), new CncFun("UseAdverb", [1]), new CncFun("everywhere_Adverb", [65]), new CncFun("here_Adverb", [66]), new CncFun("somewhere_Adverb", [67]), new CncFun("there_Adverb", [68]), new CncFun("UseN", [1, 58, 59, 60]), new CncFun("ModCN", [53, 69, 70, 71]), new CncFun("ModCN", [72, 69, 70, 71]), new CncFun("PredVP", [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84]), new CncFun("PredVP", [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96]), new CncFun("PredVP", [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108]), new CncFun("PredVP", [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]), new CncFun("PredVP", [121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132]), new CncFun("PredVP", [133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144]), new CncFun("or_Conj", []), new CncFun("and_Conj", []), new CncFun("DetQuant", [53, 145, 146, 69]), new CncFun("every_Det", [147, 147, 147, 147]), new CncFun("DetQuant", [53, 145, 148, 149]), new CncFun("DetQuant", [150, 151, 152, 153]), new CncFun("DetQuant", [150, 151, 154, 155]), new CncFun("VerbVS", [1, 58, 59, 60, 61, 156, 157, 158, 159, 160, 161]), new CncFun("VerbVV", [1, 58, 59, 60, 61, 156, 157, 158, 159, 160, 161]), new CncFun("break_V", [162, 163, 164, 165, 166, 163, 167, 168, 169, 169, 170]), new CncFun("buy_V", [171, 172, 173, 174, 175, 176, 177, 178, 169, 169, 169]), new CncFun("copula", [179, 180, 181, 180, 182, 183, 184, 185, 169, 169, 169]), new CncFun("drink_V", [186, 187, 188, 189, 190, 191, 192, 193, 169, 169, 169]), new CncFun("eat_V", [194, 195, 196, 197, 198, 199, 200, 201, 169, 169, 169]), new CncFun("fly_V", [202, 203, 204, 205, 206, 207, 208, 209, 169, 169, 169]), new CncFun("hate_V", [210, 211, 212, 213, 214, 211, 215, 216, 169, 169, 169]), new CncFun("hear_V", [217, 218, 219, 220, 221, 222, 223, 224, 169, 169, 169]), new CncFun("hunt_V", [225, 226, 227, 228, 229, 226, 230, 231, 169, 169, 169]), new CncFun("run_V", [232, 233, 234, 235, 236, 237, 238, 239, 169, 169, 169]), new CncFun("see_V", [240, 241, 242, 243, 244, 241, 245, 246, 169, 169, 169]), new CncFun("sit_V", [247, 248, 249, 250, 251, 252, 253, 254, 169, 169, 169]), new CncFun("sleep_V", [255, 256, 257, 256, 258, 259, 260, 261, 169, 169, 169]), new CncFun("swim_V", [262, 263, 264, 265, 266, 263, 267, 268, 169, 169, 169]), new CncFun("throw_V", [269, 270, 271, 272, 273, 270, 274, 275, 169, 169, 169]), new CncFun("walk_V", [276, 277, 278, 279, 280, 277, 281, 282, 169, 169, 169]), new CncFun("like_V", [283, 284, 285, 286, 287, 288, 289, 290, 169, 291, 169]), new CncFun("listen_V", [292, 293, 294, 295, 296, 293, 297, 298, 169, 299, 169]), new CncFun("watch_V", [300, 301, 302, 303, 304, 301, 305, 306, 169, 299, 169]), new CncFun("know_VQ", []), new CncFun("wonder_VQ", []), new CncFun("know_VS", [307, 308, 309, 310, 311, 312, 313, 314, 169, 169, 169, 307, 308, 309, 310, 311, 312, 313, 314, 169]), new CncFun("say_VS", [315, 316, 317, 318, 319, 320, 321, 322, 169, 169, 169, 315, 316, 317, 318, 319, 320, 321, 322, 169]), new CncFun("hope_VS", [323, 324, 325, 326, 327, 324, 328, 329, 169, 169, 169, 323, 324, 325, 326, 327, 324, 328, 329, 169]), new CncFun("want_VV", [330, 331, 332, 333, 334, 335, 336, 337, 169, 169, 169, 330, 332, 334, 336, 169, 169]), new CncFun("when_IAdv", []), new CncFun("where_IAdv", []), new CncFun("why_IAdv", []), new CncFun("whoSg_IP", []), new CncFun("bike_N", [338, 339, 340, 341]), new CncFun("bird_N", [342, 343, 344, 345]), new CncFun("boat_N", [346, 347, 348, 349]), new CncFun("book_N", [350, 351, 352, 353]), new CncFun("boy_N", [354, 355, 356, 357]), new CncFun("car_N", [358, 359, 360, 361]), new CncFun("cat_N", [362, 363, 364, 365]), new CncFun("chair_N", [366, 367, 368, 369]), new CncFun("cow_N", [370, 371, 372, 373]), new CncFun("dog_N", [374, 375, 376, 377]), new CncFun("fish_N", [378, 379, 380, 381]), new CncFun("foot_N", [382, 383, 384, 385]), new CncFun("forest_N", [386, 387, 388, 389]), new CncFun("fruit_N", [390, 391, 392, 393]), new CncFun("girl_N", [394, 395, 396, 397]), new CncFun("hand_N", [398, 399, 400, 401]), new CncFun("hat_N", [402, 403, 404, 405]), new CncFun("horse_N", [406, 407, 408, 409]), new CncFun("man_N", [410, 411, 412, 413]), new CncFun("milk_N", [414, 415, 416, 417]), new CncFun("person_N", [418, 419, 420, 421]), new CncFun("shirt_N", [422, 423, 424, 425]), new CncFun("shoe_N", [426, 427, 428, 429]), new CncFun("stone_N", [430, 431, 432, 433]), new CncFun("woman_N", [434, 435, 436, 437]), new CncFun("animal_N", [438, 439, 438, 440]), new CncFun("apple_N", [441, 442, 443, 444]), new CncFun("beer_N", [445, 446, 445, 447]), new CncFun("default_N", [448, 449, 450, 451]), new CncFun("hair_N", [452, 453, 452, 454]), new CncFun("head_N", [455, 456, 457, 458]), new CncFun("house_N", [459, 460, 459, 461]), new CncFun("table_N", [462, 463, 462, 464]), new CncFun("tree_N", [465, 466, 465, 467]), new CncFun("water_N", [468, 469, 468, 470]), new CncFun("wine_N", [471, 472, 473, 474]), new CncFun("AdvNP", [53, 72]), new CncFun("UsePron", [1, 58]), new CncFun("DetCN", [53, 53]), new CncFun("DetCN", [54, 54]), new CncFun("DetCN", [146, 146]), new CncFun("DetCN", [475, 475]), new CncFun("UsePN", [1, 1]), new CncFun("default_NP", [476, 476]), new CncFun("DetCN", [72, 72]), new CncFun("DetCN", [145, 145]), new CncFun("DetCN", [477, 477]), new CncFun("DetCN", [69, 69]), new CncFun("DetCN", [55, 55]), new CncFun("DetCN", [56, 56]), new CncFun("DetCN", [70, 70]), new CncFun("DetCN", [478, 478]), new CncFun("DetCN", [479, 479]), new CncFun("DetCN", [480, 480]), new CncFun("DetCN", [481, 481]), new CncFun("DetCN", [482, 482]), new CncFun("NumSg", [169, 169]), new CncFun("NumPl", [169, 169]), new CncFun("berlin_PN", [483]), new CncFun("britain_PN", [484]), new CncFun("default_PN", [485]), new CncFun("germany_PN", [486]), new CncFun("gothenburg_PN", [487]), new CncFun("john_PN", [488]), new CncFun("london_PN", [489]), new CncFun("mary_PN", [490]), new CncFun("sweden_PN", [491]), new CncFun("Pos", [169]), new CncFun("Neg", [169]), new CncFun("by8agent_Prep", [492]), new CncFun("in_Prep", [493]), new CncFun("possess_Prep", [492]), new CncFun("with_Prep", [494]), new CncFun("i_Pron", [495, 496]), new CncFun("they_Pron", [497, 498]), new CncFun("we_Pron", [499, 500]), new CncFun("he_Pron", [501, 502]), new CncFun("she_Pron", [503, 504]), new CncFun("QuestCl", []), new CncFun("QuestIAdv", []), new CncFun("QuestVP", []), new CncFun("IndefArt", [505, 506, 505, 506, 169, 169, 169, 169, 169, 169, 169, 169]), new CncFun("DefArt", [169, 169, 507, 508, 507, 508, 169, 169, 497, 497, 497, 497]), new CncFun("that_Quant", [509, 510, 509, 510, 509, 510, 511, 511, 511, 511, 511, 511]), new CncFun("this_Quant", [512, 513, 512, 513, 512, 513, 514, 514, 514, 514, 514, 514]), new CncFun("UseCl", [515, 516]), new CncFun("UseCl", [517, 518]), new CncFun("UseCl", [519, 520]), new CncFun("UseCl", [521, 522]), new CncFun("UseCl", [523, 524]), new CncFun("UseCl", [525, 526]), new CncFun("StartUtt", [1]), new CncFun("although_Subj", []), new CncFun("because_Subj", []), new CncFun("when_Subj", []), new CncFun("Pres", [169]), new CncFun("Perf", [169]), new CncFun("Past", [169]), new CncFun("UttS", [527]), new CncFun("UseV", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 169, 169, 169, 169, 169, 169]), new CncFun("UseV", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 169, 169, 169, 169, 169, 169]), new CncFun("AdvVP", [1, 58, 59, 60, 61, 156, 157, 158, 159, 160, 161, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549]), new CncFun("ComplVS", [534, 550, 528, 551, 536, 550, 552, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 553, 553, 553, 553, 553, 553]), new CncFun("ComplVS", [535, 550, 528, 554, 537, 550, 555, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 553, 553, 553, 553, 553, 553]), new CncFun("ComplVV", [534, 539, 528, 556, 535, 539, 557, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 558, 559, 560, 561, 562, 563]), new CncFun("UseVA", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 564, 564, 565, 565, 566, 565]), new CncFun("UseVA", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 564, 564, 565, 565, 566, 565]), new CncFun("UseVN", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 567, 567, 567, 567, 567, 567]), new CncFun("UseVN", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 567, 567, 567, 567, 567, 567]), new CncFun("UseVNA", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 568, 568, 568, 568, 568, 568]), new CncFun("UseVNA", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 569, 569, 569, 569, 569, 569]), new CncFun("UseVNA", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 570, 570, 570, 570, 570, 570]), new CncFun("UseVNA", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 568, 568, 568, 568, 568, 568]), new CncFun("UseVNA", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 569, 569, 569, 569, 569, 569]), new CncFun("UseVNA", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 570, 570, 570, 570, 570, 570]), new CncFun("UseVNN", [1, 161, 528, 529, 59, 161, 530, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 571, 571, 571, 571, 571, 571]), new CncFun("UseVNN", [58, 161, 528, 532, 60, 161, 533, 169, 169, 169, 169, 169, 169, 531, 531, 531, 531, 531, 531, 169, 169, 571, 571, 571, 571, 571, 571])], [[new SymLit(0, 0)], [new SymCat(0, 0)], [new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymKS("sig")], [new SymCat(0, -1), new SymCat(0, -1), new SymKS("sig"), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, -1), new SymCat(0, -1), new SymKS("sig"), new SymCat(0, -1), new SymCat(0, -1)], [new SymCat(0, 8), new SymCat(0, 6), new SymCat(0, 22), new SymCat(0, 19), new SymCat(0, 20)], [new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1), new SymCat(0, -1)], [new SymKS("stor")], [new SymKS("stort")], [new SymKS("stora")], [new SymKS("svart")], [new SymKS("svarta")], [new SymKS("blå")], [new SymKS("blått")], [new SymKS("blåa")], [new SymKS("[adjektiv]")], [new SymKS("[adjektiv]t")], [new SymKS("[adjektiv]a")], [new SymKS("grön")], [new SymKS("grönt")], [new SymKS("gröna")], [new SymKS("tung")], [new SymKS("tungt")], [new SymKS("tunga")], [new SymKS("lång")], [new SymKS("långt")], [new SymKS("långa")], [new SymKS("röd")], [new SymKS("rött")], [new SymKS("röda")], [new SymKS("kort")], [new SymKS("kortt")], [new SymKS("korta")], [new SymKS("liten")], [new SymKS("litet")], [new SymKS("små")], [new SymKS("lilla")], [new SymKS("tjock")], [new SymKS("tjockt")], [new SymKS("tjocka")], [new SymKS("tunn")], [new SymKS("tunt")], [new SymKS("tunna")], [new SymKS("vit")], [new SymKS("vitt")], [new SymKS("vita")], [new SymKS("gul")], [new SymKS("gult")], [new SymKS("gula")], [new SymCat(0, 0), new SymCat(1, 0)], [new SymCat(0, 0), new SymCat(1, 1)], [new SymCat(0, 0), new SymCat(1, 2)], [new SymCat(0, 0), new SymCat(1, 3)], [new SymCat(0, 0), new SymCat(1, 4)], [new SymCat(0, 1)], [new SymCat(0, 2)], [new SymCat(0, 3)], [new SymCat(0, 4)], [new SymKS("så")], [new SymKS("för")], [new SymKS("mycket")], [new SymKS("överallt")], [new SymKS("här")], [new SymKS("någonstans")], [new SymKS("där")], [new SymCat(0, 3), new SymCat(1, 1)], [new SymCat(0, 2), new SymCat(1, 2)], [new SymCat(0, 4), new SymCat(1, 3)], [new SymCat(0, 1), new SymCat(1, 0)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 7), new SymCat(1, 1), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 7), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 13), new SymCat(1, 1), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 13), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 7), new SymCat(1, 3), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 7), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 13), new SymCat(1, 3), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 13), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 7), new SymCat(1, 5), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 7), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 13), new SymCat(1, 5), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 13), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 8), new SymCat(1, 1), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 14), new SymCat(1, 1), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 14), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 8), new SymCat(1, 3), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 14), new SymCat(1, 3), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 14), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 8), new SymCat(1, 5), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 8), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 14), new SymCat(1, 5), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 14), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 9), new SymCat(1, 1), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 9), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 15), new SymCat(1, 1), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 15), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 9), new SymCat(1, 3), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 9), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 15), new SymCat(1, 3), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 15), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 9), new SymCat(1, 5), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 9), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 15), new SymCat(1, 5), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 15), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 10), new SymCat(1, 1), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 10), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 16), new SymCat(1, 1), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 16), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 10), new SymCat(1, 3), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 10), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 16), new SymCat(1, 3), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 16), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 10), new SymCat(1, 5), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 10), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 16), new SymCat(1, 5), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 16), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 11), new SymCat(1, 1), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 11), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 17), new SymCat(1, 1), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 17), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 11), new SymCat(1, 3), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 11), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 17), new SymCat(1, 3), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 17), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 11), new SymCat(1, 5), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 11), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 17), new SymCat(1, 5), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 17), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 12), new SymCat(1, 1), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 12), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(1, 18), new SymCat(1, 1), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 18), new SymCat(1, 0), new SymCat(1, 1), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 12), new SymCat(1, 3), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 12), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 2), new SymCat(1, 18), new SymCat(1, 3), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 18), new SymCat(1, 2), new SymCat(1, 3), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 12), new SymCat(1, 5), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 12), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 4), new SymCat(1, 18), new SymCat(1, 5), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 0), new SymCat(1, 18), new SymCat(1, 4), new SymCat(1, 5), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 1), new SymCat(1, 1)], [new SymCat(0, 2), new SymCat(1, 0)], [new SymKS("varje")], [new SymCat(0, 4), new SymCat(1, 0)], [new SymCat(0, 5), new SymCat(1, 1)], [new SymCat(0, 6), new SymCat(1, 0)], [new SymCat(0, 7), new SymCat(1, 1)], [new SymCat(0, 8), new SymCat(1, 0)], [new SymCat(0, 9), new SymCat(1, 1)], [new SymCat(0, 10), new SymCat(1, 0)], [new SymCat(0, 11), new SymCat(1, 1)], [new SymCat(0, 5)], [new SymCat(0, 6)], [new SymCat(0, 7)], [new SymCat(0, 8)], [new SymCat(0, 9)], [new SymCat(0, 10)], [new SymKS("slår")], [new SymKS("slås")], [new SymKS("slog")], [new SymKS("slogs")], [new SymKS("slå")], [new SymKS("slagit")], [new SymKS("slagits")], [], [new SymKS("sönder")], [new SymKS("köper")], [new SymKS("köps")], [new SymKS("köpte")], [new SymKS("köptes")], [new SymKS("köpa")], [new SymKS("köpas")], [new SymKS("köpt")], [new SymKS("köpts")], [new SymKS("är")], [new SymKS("vars")], [new SymKS("var")], [new SymKS("vara")], [new SymKS("varas")], [new SymKS("varit")], [new SymKS("varits")], [new SymKS("dricker")], [new SymKS("dricks")], [new SymKS("drack")], [new SymKS("dracks")], [new SymKS("dricka")], [new SymKS("drickas")], [new SymKS("druckit")], [new SymKS("druckits")], [new SymKS("äter")], [new SymKS("äts")], [new SymKS("åt")], [new SymKS("åts")], [new SymKS("äta")], [new SymKS("ätas")], [new SymKS("ätit")], [new SymKS("ätits")], [new SymKS("flyger")], [new SymKS("flygs")], [new SymKS("flög")], [new SymKS("flögs")], [new SymKS("flyga")], [new SymKS("flygas")], [new SymKS("flugit")], [new SymKS("flugits")], [new SymKS("hatar")], [new SymKS("hatas")], [new SymKS("hatade")], [new SymKS("hatades")], [new SymKS("hata")], [new SymKS("hatat")], [new SymKS("hatats")], [new SymKS("hör")], [new SymKS("hörs")], [new SymKS("hörde")], [new SymKS("hördes")], [new SymKS("höra")], [new SymKS("höras")], [new SymKS("hört")], [new SymKS("hörts")], [new SymKS("jagar")], [new SymKS("jagas")], [new SymKS("jagade")], [new SymKS("jagades")], [new SymKS("jaga")], [new SymKS("jagat")], [new SymKS("jagats")], [new SymKS("springer")], [new SymKS("springs")], [new SymKS("sprang")], [new SymKS("sprangs")], [new SymKS("springa")], [new SymKS("springas")], [new SymKS("sprungit")], [new SymKS("sprungits")], [new SymKS("ser")], [new SymKS("ses")], [new SymKS("såg")], [new SymKS("sågs")], [new SymKS("se")], [new SymKS("sett")], [new SymKS("setts")], [new SymKS("sitter")], [new SymKS("sitts")], [new SymKS("satt")], [new SymKS("satts")], [new SymKS("sitta")], [new SymKS("sittas")], [new SymKS("suttit")], [new SymKS("suttits")], [new SymKS("sover")], [new SymKS("sovs")], [new SymKS("sov")], [new SymKS("sova")], [new SymKS("sovas")], [new SymKS("sovit")], [new SymKS("sovits")], [new SymKS("simmar")], [new SymKS("simmas")], [new SymKS("simmade")], [new SymKS("simmades")], [new SymKS("simma")], [new SymKS("simmat")], [new SymKS("simmats")], [new SymKS("kastar")], [new SymKS("kastas")], [new SymKS("kastade")], [new SymKS("kastades")], [new SymKS("kasta")], [new SymKS("kastat")], [new SymKS("kastats")], [new SymKS("går")], [new SymKS("gås")], [new SymKS("gick")], [new SymKS("gicks")], [new SymKS("gå")], [new SymKS("gått")], [new SymKS("gåtts")], [new SymKS("tycker")], [new SymKS("tycks")], [new SymKS("tyckte")], [new SymKS("tycktes")], [new SymKS("tycka")], [new SymKS("tyckas")], [new SymKS("tyckt")], [new SymKS("tyckts")], [new SymKS("om")], [new SymKS("lyssnar")], [new SymKS("lyssnas")], [new SymKS("lyssnade")], [new SymKS("lyssnades")], [new SymKS("lyssna")], [new SymKS("lyssnat")], [new SymKS("lyssnats")], [new SymKS("på")], [new SymKS("tittar")], [new SymKS("tittas")], [new SymKS("tittade")], [new SymKS("tittades")], [new SymKS("titta")], [new SymKS("tittat")], [new SymKS("tittats")], [new SymKS("vet")], [new SymKS("vets")], [new SymKS("visste")], [new SymKS("visstes")], [new SymKS("veta")], [new SymKS("vetas")], [new SymKS("vetat")], [new SymKS("vetats")], [new SymKS("säger")], [new SymKS("sägs")], [new SymKS("sade")], [new SymKS("sades")], [new SymKS("säga")], [new SymKS("sägas")], [new SymKS("sagt")], [new SymKS("sagts")], [new SymKS("hoppar")], [new SymKS("hoppas")], [new SymKS("hoppade")], [new SymKS("hoppades")], [new SymKS("hoppa")], [new SymKS("hoppat")], [new SymKS("hoppats")], [new SymKS("vill")], [new SymKS("viljs")], [new SymKS("ville")], [new SymKS("villes")], [new SymKS("vilja")], [new SymKS("viljas")], [new SymKS("velat")], [new SymKS("velats")], [new SymKS("cykel")], [new SymKS("cykeln")], [new SymKS("cyklar")], [new SymKS("cyklarna")], [new SymKS("fågel")], [new SymKS("fågeln")], [new SymKS("fåglar")], [new SymKS("fåglarna")], [new SymKS("båt")], [new SymKS("båten")], [new SymKS("båtar")], [new SymKS("båtarna")], [new SymKS("bok")], [new SymKS("boken")], [new SymKS("böcker")], [new SymKS("böckerna")], [new SymKS("pojke")], [new SymKS("pojken")], [new SymKS("pojkar")], [new SymKS("pojkarna")], [new SymKS("bil")], [new SymKS("bilen")], [new SymKS("bilar")], [new SymKS("bilarna")], [new SymKS("katt")], [new SymKS("katten")], [new SymKS("katter")], [new SymKS("katterna")], [new SymKS("stol")], [new SymKS("stolen")], [new SymKS("stolar")], [new SymKS("stolarna")], [new SymKS("ko")], [new SymKS("kon")], [new SymKS("kor")], [new SymKS("korna")], [new SymKS("hund")], [new SymKS("hunden")], [new SymKS("hundar")], [new SymKS("hundarna")], [new SymKS("fisk")], [new SymKS("fisken")], [new SymKS("fiskar")], [new SymKS("fiskarna")], [new SymKS("fot")], [new SymKS("foten")], [new SymKS("fötter")], [new SymKS("fötterna")], [new SymKS("skog")], [new SymKS("skogen")], [new SymKS("skogar")], [new SymKS("skogarna")], [new SymKS("frukt")], [new SymKS("frukten")], [new SymKS("frukter")], [new SymKS("frukterna")], [new SymKS("flicka")], [new SymKS("flickan")], [new SymKS("flickor")], [new SymKS("flickorna")], [new SymKS("hand")], [new SymKS("handen")], [new SymKS("händer")], [new SymKS("händerna")], [new SymKS("hatt")], [new SymKS("hatten")], [new SymKS("hattar")], [new SymKS("hattarna")], [new SymKS("häst")], [new SymKS("hästen")], [new SymKS("hästar")], [new SymKS("hästarna")], [new SymKS("man")], [new SymKS("mannen")], [new SymKS("män")], [new SymKS("männen")], [new SymKS("mjölk")], [new SymKS("mjölken")], [new SymKS("mjölkar")], [new SymKS("mjölkarna")], [new SymKS("person")], [new SymKS("personen")], [new SymKS("personer")], [new SymKS("personerna")], [new SymKS("skjorta")], [new SymKS("skjortan")], [new SymKS("skjortor")], [new SymKS("skjortorna")], [new SymKS("sko")], [new SymKS("skon")], [new SymKS("skor")], [new SymKS("skorna")], [new SymKS("sten")], [new SymKS("stenen")], [new SymKS("stenar")], [new SymKS("stenarna")], [new SymKS("kvinna")], [new SymKS("kvinnan")], [new SymKS("kvinnor")], [new SymKS("kvinnorna")], [new SymKS("djur")], [new SymKS("djuret")], [new SymKS("djuren")], [new SymKS("äpple")], [new SymKS("äpplet")], [new SymKS("äpplen")], [new SymKS("äpplena")], [new SymKS("öl")], [new SymKS("ölet")], [new SymKS("ölen")], [new SymKS("[sak]")], [new SymKS("[saken]")], [new SymKS("[saker]")], [new SymKS("[sakerna]")], [new SymKS("hår")], [new SymKS("håret")], [new SymKS("håren")], [new SymKS("huvud")], [new SymKS("huvudet")], [new SymKS("huvuden")], [new SymKS("huvudena")], [new SymKS("hus")], [new SymKS("huset")], [new SymKS("husen")], [new SymKS("bord")], [new SymKS("bordet")], [new SymKS("borden")], [new SymKS("träd")], [new SymKS("trädet")], [new SymKS("träden")], [new SymKS("vatten")], [new SymKS("vattnet")], [new SymKS("vattnen")], [new SymKS("vin")], [new SymKS("vinet")], [new SymKS("viner")], [new SymKS("vinerna")], [new SymCat(0, 2), new SymCat(1, 1)], [new SymKS("[någonting]")], [new SymCat(0, 3), new SymCat(1, 0)], [new SymCat(0, 2), new SymCat(1, 3)], [new SymCat(0, 1), new SymCat(1, 2)], [new SymCat(0, 1), new SymCat(1, 3)], [new SymCat(0, 3), new SymCat(1, 2)], [new SymCat(0, 3), new SymCat(1, 3)], [new SymKS("Berlin")], [new SymKS("Storbritannien")], [new SymKS("[namn]")], [new SymKS("Tyskland")], [new SymKS("Göteborg")], [new SymKS("Johan")], [new SymKS("London")], [new SymKS("Maria")], [new SymKS("Sverige")], [new SymKS("av")], [new SymKS("i")], [new SymKS("med")], [new SymKS("jag")], [new SymKS("mig")], [new SymKS("de")], [new SymKS("dem")], [new SymKS("vi")], [new SymKS("oss")], [new SymKS("han")], [new SymKS("honom")], [new SymKS("hon")], [new SymKS("henne")], [new SymKS("en")], [new SymKS("ett")], [new SymKS("den")], [new SymKS("det")], [new SymKS("den"), new SymKS("där")], [new SymKS("det"), new SymKS("där")], [new SymKS("de"), new SymKS("där")], [new SymKS("den"), new SymKS("här")], [new SymKS("det"), new SymKS("här")], [new SymKS("de"), new SymKS("här")], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 0)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 1)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 8)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 9)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 4)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 5)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 2)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 3)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 10)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 11)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 6)], [new SymCat(0, 0), new SymCat(1, 0), new SymCat(2, 7)], [new SymCat(0, 0), new SymKS(".")], [new SymKS("har")], [new SymCat(0, 6), new SymCat(0, 10)], [new SymCat(0, 4), new SymCat(0, 10)], [new SymKS("inte")], [new SymCat(0, 7), new SymCat(0, 10)], [new SymCat(0, 5), new SymCat(0, 10)], [new SymCat(0, 11)], [new SymCat(0, 12)], [new SymCat(0, 13)], [new SymCat(0, 14)], [new SymCat(0, 15)], [new SymCat(0, 16)], [new SymCat(0, 17)], [new SymCat(0, 18)], [new SymCat(0, 19), new SymCat(1, 0)], [new SymCat(0, 20)], [new SymCat(0, 21)], [new SymCat(0, 22)], [new SymCat(0, 23)], [new SymCat(0, 24)], [new SymCat(0, 25)], [new SymCat(0, 26)], [new SymCat(0, 19)], [new SymCat(0, 17), new SymCat(0, 19)], [new SymCat(0, 15), new SymCat(0, 19)], [new SymKS("att"), new SymCat(1, 1)], [new SymCat(0, 18), new SymCat(0, 19)], [new SymCat(0, 16), new SymCat(0, 19)], [new SymCat(0, 14), new SymCat(0, 16)], [new SymCat(0, 13), new SymCat(0, 16)], [new SymCat(0, 15), new SymCat(1, 7), new SymCat(1, 6), new SymCat(1, 21), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 15), new SymCat(1, 8), new SymCat(1, 6), new SymCat(1, 22), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 15), new SymCat(1, 9), new SymCat(1, 6), new SymCat(1, 23), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 15), new SymCat(1, 10), new SymCat(1, 6), new SymCat(1, 24), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 15), new SymCat(1, 11), new SymCat(1, 6), new SymCat(1, 25), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(0, 15), new SymCat(1, 12), new SymCat(1, 6), new SymCat(1, 26), new SymCat(1, 19), new SymCat(1, 20)], [new SymCat(1, 0)], [new SymCat(1, 2)], [new SymCat(1, 1)], [new SymCat(0, 8), new SymCat(1, 1)], [new SymCat(0, 8), new SymCat(1, 1), new SymCat(2, 0)], [new SymCat(0, 8), new SymCat(1, 1), new SymCat(2, 2)], [new SymCat(0, 8), new SymCat(1, 1), new SymCat(2, 1)], [new SymCat(0, 8), new SymCat(1, 1), new SymCat(0, 9), new SymCat(2, 1)]], { A: { s: 0, e: 1 }, A2: { s: 2, e: 5 }, AP: { s: 6, e: 7 }, AdA: { s: 8, e: 8 }, AdN: { s: 9, e: 9 }, AdV: { s: 10, e: 10 }, Adv: { s: 11, e: 11 }, Adverb: { s: 12, e: 12 }, Ant: { s: 13, e: 14 }, CAdv: { s: 15, e: 15 }, CN: { s: 16, e: 19 }, Card: { s: 20, e: 21 }, Cl: { s: 22, e: 22 }, ClSlash: { s: 23, e: 24 }, Comp: { s: 25, e: 25 }, Conj: { s: 26, e: 27 }, DAP: { s: 28, e: 33 }, Det: { s: 34, e: 39 }, Digits: { s: 40, e: 41 }, Float: { s: -3, e: -3 }, GraspV: { s: 42, e: 53 }, GraspVQ: { s: 54, e: 89 }, GraspVS: { s: 90, e: 125 }, GraspVV: { s: 126, e: 197 }, IAdv: { s: 198, e: 198 }, IComp: { s: 199, e: 199 }, IDet: { s: 200, e: 205 }, IP: { s: 206, e: 209 }, IQuant: { s: 210, e: 212 }, Imp: { s: 213, e: 213 }, Int: { s: -2, e: -2 }, Interj: { s: 214, e: 214 }, N: { s: 215, e: 216 }, N2: { s: 217, e: 220 }, N3: { s: 221, e: 228 }, NP: { s: 229, e: 240 }, Num: { s: 241, e: 244 }, Numeral: { s: 245, e: 246 }, Ord: { s: 247, e: 247 }, PConj: { s: 248, e: 248 }, PN: { s: 249, e: 250 }, Phr: { s: 251, e: 251 }, Pol: { s: 252, e: 253 }, Predet: { s: 254, e: 256 }, Prep: { s: 257, e: 257 }, Pron: { s: 258, e: 269 }, QCl: { s: 270, e: 270 }, QS: { s: 271, e: 271 }, Quant: { s: 272, e: 274 }, RCl: { s: 275, e: 282 }, RP: { s: 283, e: 295 }, RS: { s: 296, e: 303 }, S: { s: 304, e: 304 }, SC: { s: 305, e: 305 }, SSlash: { s: 306, e: 307 }, Start: { s: 308, e: 308 }, String: { s: -1, e: -1 }, Subj: { s: 309, e: 309 }, Temp: { s: 310, e: 319 }, Tense: { s: 320, e: 324 }, Text: { s: 325, e: 325 }, Utt: { s: 326, e: 326 }, V: { s: 327, e: 329 }, V2: { s: 330, e: 335 }, V2A: { s: 336, e: 341 }, V2Q: { s: 342, e: 347 }, V2S: { s: 348, e: 353 }, V2V: { s: 354, e: 365 }, V3: { s: 366, e: 377 }, VA: { s: 378, e: 380 }, VP: { s: 381, e: 388 }, VPSlash: { s: 389, e: 404 }, VQ: { s: 405, e: 407 }, VS: { s: 408, e: 410 }, VV: { s: 411, e: 416 }, Voc: { s: 417, e: 417 } }, 464) });
///<reference path="GF.ts"/>
///<reference path="generated/grammar.ts"/>
var Grammar = Grasp;
var Languages = ["GraspSwe", "GraspEng", "GraspGer"];
var StartCat = 'Start';
var MapWordsToHTML = {};
var Metadata = {};
// MapWordsToHTML['GraspZbl'] = map_words_to_images;
// Metadata['GraspZbl'] = BlissMetadata;
var DefaultTree1 = parseGFTree("(StartUtt (UttS (UseCl (Pres) (Neg) (PredVP (UsePron (she_Pron)) " + "(UseVN (break_V) (DetCN (DetQuant (DefArt) (NumPl)) " + "(ModCN (UseA (yellow_A)) (UseN (stone_N)))))))))");
var DefaultTree2 = parseGFTree("(StartUtt (UttS (UseCl (Perf) (Pos) (PredVP (UsePN (mary_PN)) " + "(UseVN (eat_V) (AdvNP (DetCN (DetQuant (IndefArt) (NumPl)) " + "(UseN (fish_N))) (UseAdverb (here_Adverb))))))))");
///<reference path="Utilities.ts"/>
///<reference path="muste.ts"/>
///<reference path="lib/jquery.d.ts"/>
///<reference path="muste-init.ts"/>
// /<reference path="GF.ts"/>
var ABSTRACT = 'Abstract';
var CONCRETE = 'Concrete';
var STRIKED = 'striked';
var HIGHLIGHTED = 'highlighted';
var CORRECT = 'correct';
var MATCHING = 'matching';
var NOSPACING = "&+";
var PUNCTUATION = /^[\,\;\.\?\!\)]$/;
var PREFIXPUNCT = /^[¿¡\(]$/;
$(Utilities.BUSY(function () {
    Utilities.START_TIMER("initialize", true);
    initialize_gui();
    initialize_grammar(Grammar);
    Utilities.STOP_TIMER("initialize");
    regenerate_trees();
}));
function initialize_gui() {
    $('#body').click(click_body);
    $('#mainmenu-toggler').click(toggle_mainmenu);
    $('#restart-button').click(Utilities.BUSY(restart));
    $('#connected').click(Utilities.BUSY(toggle_connected));
    $('#debugging').click(toggle_debug);
    var prefix = Utilities.common_prefix(Languages);
    ['L1', 'L2'].forEach(function (L, L_index) {
        Languages.forEach(function (lang, lang_index) {
            $('#' + Utilities.join(L, 'menu')).append($('<input>', { type: 'radio', name: Utilities.join(L, 'group'), id: Utilities.join(L, lang), value: lang, checked: L_index == lang_index, click: Utilities.BUSY(redraw_sentences) })).append($('<label></label>', { 'for': Utilities.join(L, lang), text: lang.slice(prefix.length) }));
        });
    });
}
// http://www.hunlock.com/blogs/Mastering_The_Back_Button_With_Javascript
// window.onbeforeunload = function () {
//    return "Are you sure you want to leave this now?";
// }
// window.location.hash = "no-back-button";
// window.onhashchange = function(){window.location.hash="no-back-button";}
// window.onpopstate = function (event) {
//     if (event.state) {
//         CurrentPage = event.state.page;
//         var trees = event.state.trees;
//         for (var lang in trees) {
//             set_and_show_tree(lang, trees[lang]);
//         }
//     }
// };
function trees_are_connected() {
    return $('#connected').prop('checked');
}
function toggle_connected() {
    console.log("CONNECTED");
    if (trees_are_connected()) {
        set_and_show_tree('L2', $('#L1').data('tree'));
    }
    mark_correct_phrases();
}
function toggle_mainmenu() {
    $('#mainmenu').toggle();
}
function current_language(L) {
    return $('#' + Utilities.join(L, 'menu') + ' :checked').val();
}
function redraw_sentences() {
    set_and_show_tree('L1', $('#L1').data('tree'));
    set_and_show_tree('L2', $('#L2').data('tree'));
    mark_correct_phrases();
}
function click_body(event) {
    var prevented = $(event.target).closest('.prevent-body-click').length > 0;
    if (!prevented) {
        clear_selection();
    }
}
function restart() {
    var sure = true; // confirm("Are you sure you want to restart the game?");
    if (sure) {
        console.log("RESTART");
        regenerate_trees();
    }
}
function toggle_debug() {
    var debugging = $('#debugging').prop('checked');
    console.log("DEBUG", debugging);
    $('.debug').toggle(debugging);
}
function generate_random_tree() {
    return Grammar.abs.generate(StartCat, null, null, function (f) {
        return !startswith(f, "default_");
    });
}
function regenerate_trees() {
    Utilities.START_TIMER("regenerate_trees", true);
    if (trees_are_connected()) {
        var tree = (typeof DefaultTree1 == "object") ? DefaultTree1 : generate_random_tree();
        set_and_show_tree('L1', tree);
        set_and_show_tree('L2', tree);
    }
    else {
        var tree1 = (typeof DefaultTree1 == "object") ? DefaultTree1 : generate_random_tree();
        var tree2 = (typeof DefaultTree2 == "object") ? DefaultTree2 : generate_random_tree();
        set_and_show_tree('L1', tree1);
        set_and_show_tree('L2', tree2);
    }
    $('#score').text(0);
    Utilities.STOP_TIMER("regenerate_trees");
    mark_correct_phrases();
}
function select_tree(data) {
    if (trees_are_connected()) {
        set_and_show_tree('L1', data.tree);
        set_and_show_tree('L2', data.tree);
    }
    else {
        set_and_show_tree(data.lang, data.tree);
    }
    var score = $('#score');
    score.text(parseInt(score.text()) + 1);
    mark_correct_phrases();
}
function mark_correct_phrases() {
    Utilities.START_TIMER("mark-correct", true);
    $('.' + CORRECT).removeClass(CORRECT);
    $('.' + MATCHING).removeClass(MATCHING);
    if (!trees_are_connected()) {
        var t1 = $('#L1').data('tree');
        var t2 = $('#L2').data('tree');
        if (t1.toString() == t2.toString()) {
            $('.L1-').addClass(CORRECT);
            $('.L2-').addClass(CORRECT);
        }
        else {
            var equals = equal_phrases('L1', t1, 'L2', t2);
            $('.phrase').each(function () {
                var L = $(this).data('lang');
                var path = $(this).data('path');
                var refpath = equals[L][path];
                $(this).toggleClass(MATCHING, Boolean(refpath));
            });
        }
    }
    Utilities.STOP_TIMER("mark-correct");
}
function set_and_show_tree(L, tree) {
    clear_selection();
    var lang = current_language(L);
    console.log(L, "/", lang, "-->", tree.toString());
    var lin = Linearise(lang, tree);
    var brackets = bracketise(lin);
    var sentence = map_words_and_spacing(lang, L, lin, brackets, click_word);
    $('#' + Utilities.join(L, 'sentence')).empty().append(sentence);
    var abslin = linearise_abstract(tree);
    $('#' + Utilities.join(L, 'tree')).text(mapwords(abslin).join(" "));
    $('#' + L).data('tree', tree);
    var menus = initialize_menus(lang, tree);
    $('#' + L + ' .phrase').each(function () {
        // var data = $(this).data();
        $(this).data('menu', menus[$(this).data('path')]);
    });
}
function map_words_and_spacing(lang, L, lin, brackets, handler) {
    if (typeof MapWordsToHTML == "object" && lang in MapWordsToHTML) {
        return MapWordsToHTML[lang](Metadata[lang], mapwords(lin), handler);
    }
    else {
        return map_words_to_html(L, lin, brackets, handler);
    }
}
function map_words_to_html(L, lin, bracketed_lin, handler) {
    function bracket_html(n, brackets) {
        var path = brackets.path;
        var phrase = $('<span class="phrase"></span>').addClass(Utilities.join(L, path)).data({ 'path': path, 'start': n, 'lang': L });
        for (var i = 0; i < brackets.tokens.length; i++) {
            var tokn = brackets.tokens[i];
            if (tokn instanceof BracketedLin) {
                var subphrase = bracket_html(n, tokn).appendTo(phrase);
                n = subphrase.data('end');
            }
            else if (tokn instanceof BracketedToken) {
                if (tokn.word !== NOSPACING) {
                    var word = tokn.word;
                    if (n == 0) {
                        word = word.charAt(0).toUpperCase() + word.slice(1);
                    }
                    var debugpath = $('<sub class="debug"></sub>').text(path).toggle($('#debugging').prop('checked'));
                    var w = $('<span class="word"></span>').data({ 'nr': tokn.n, 'L': L, 'path': path }).addClass(Utilities.join("W" + L, path)).html(word).append(debugpath).appendTo(phrase);
                    if (handler) {
                        w.addClass('clickable').click(Utilities.BUSY(handler));
                    }
                    if (n !== tokn.n)
                        console.log("ERROR:", n, tokn.n);
                    n = tokn.n + 1;
                }
            }
            if (i < brackets.tokens.length - 1) {
                var previous = lin[n - 1].word;
                var current = lin[n].word;
                if (!(previous == NOSPACING || current == NOSPACING || PREFIXPUNCT.test(previous) || PUNCTUATION.test(current))) {
                    // SPACING
                    var debugpath = $('<sub class="debug"></sub>').text(path).toggle($('#debugging').prop('checked'));
                    var s = $('<span class="space"></span>').data({ 'nr': n, 'L': L, 'path': path }).addClass(Utilities.join("S" + L, path)).html(' &nbsp; ').append(debugpath).appendTo(phrase);
                    if (handler) {
                        s.addClass('clickable').click(Utilities.BUSY(handler));
                    }
                }
            }
        }
        phrase.data('end', n);
        return phrase;
    }
    return bracket_html(0, bracketed_lin);
}
/*** THIS FUNCTION IS NOT UP-TO-DATE ***/
function map_words_to_images(metadata, words, callback) {
    var sentence = $('<span></span>');
    var prefix, suffix;
    var indicator_elem = $('<span class="indicator">');
    var indicator_wdt = 0;
    for (var i = 0; i < words.length; i++) {
        var previous = words[i - 1], word = words[i], next = words[i + 1];
        if (word == NOSPACING)
            continue;
        var imgsrc = metadata['images'][word];
        var img = (imgsrc ? $('<img>').attr('src', imgsrc).attr('alt', word).attr('title', word) : $('<span>').attr('title', word).text(word));
        var wdt = metadata['widths'][word] || 40; // default width
        if (word in metadata['indicators']) {
            if (!indicator_elem) {
                var indicator_elem = $('<span class="indicator">');
            }
            indicator_elem.append(callback(i, img));
            indicator_wdt += wdt;
        }
        else {
            if (previous != NOSPACING)
                sentence.append($('<span class="leftspace">').html('&nbsp;&nbsp;'));
            var left = (wdt - indicator_wdt) / 2;
            indicator_elem.attr('style', 'left:' + left);
            $('<span class="symbol">').append(indicator_elem).append(callback(i, img)).appendTo(sentence);
            if (next != NOSPACING && next != "question_mark" && next != "exclamation_mark")
                sentence.append($('<span class="rightspace">').html('&nbsp;&nbsp;'));
            indicator_elem = $('<span class="indicator">');
            indicator_wdt = 0;
        }
    }
    return sentence;
}
function clear_selection() {
    $('.' + HIGHLIGHTED).removeClass(HIGHLIGHTED).removeData('span');
    $('.' + STRIKED).removeClass(STRIKED);
    $('#menu').empty().hide();
    $('#mainmenu').hide();
}
function next_span(wordnr, span, maxwidth) {
    if (!span)
        return [wordnr, wordnr];
    var left = span[0], right = span[1];
    if (left > 0 && right > wordnr) {
        return [left - 1, right - 1];
    }
    var width = right - left + 1;
    if (width <= maxwidth) {
        left = wordnr;
        right = wordnr + width;
        if (right >= maxwidth) {
            right = maxwidth - 1;
            left = right - width;
        }
        if (left >= 0) {
            return [left, right];
        }
    }
    return null;
}
function click_word(clicked0) {
    var clicked = $(clicked0);
    var isspace = clicked.hasClass('space');
    var lang = clicked.data('L');
    var wordnr = clicked.data('nr');
    var wordpath = clicked.data('path');
    var maxwidth = $('#' + Utilities.join(lang, 'sentence') + ' .word').length;
    var innermost_phrase = $('.' + Utilities.join(lang, wordpath));
    var span;
    var phrase;
    if (clicked.hasClass(STRIKED)) {
        phrase = clicked.closest('.' + HIGHLIGHTED);
        if (phrase.length) {
            span = phrase.data('span');
        }
    }
    if (span) {
        isspace = false;
    }
    else {
        phrase = innermost_phrase;
        span = isspace ? [wordnr, wordnr - 1] : next_span(wordnr);
    }
    clear_selection();
    var menu;
    while (!(menu && menu.length)) {
        phrase = phrase.parent();
        if (!phrase.hasClass('phrase')) {
            phrase = innermost_phrase;
            if (isspace)
                return;
            span = next_span(wordnr, span, maxwidth);
            if (!span)
                return;
        }
        menu = phrase.data('menu');
        if (menu)
            menu = menu[span.join(":")];
    }
    console.log('SPAN:', span[0] + '-' + span[1], 'PATH:', phrase.data('path'), 'MENU:', menu.length + ' items');
    phrase.addClass(HIGHLIGHTED).data('span', span);
    if (isspace) {
        clicked.addClass(STRIKED);
    }
    else {
        phrase.find('.word').filter(function () {
            var nr = $(this).data('nr');
            return span[0] <= nr && nr <= span[1];
        }).addClass(STRIKED);
        phrase.find('.space').filter(function () {
            var nr = $(this).data('nr');
            return span[0] < nr && nr <= span[1];
        }).addClass(STRIKED);
    }
    for (var itemix = 0; itemix < menu.length; itemix++) {
        var item = menu[itemix];
        var menuitem = $('<span class="clickable">').data({ 'tree': item.tree, 'lang': lang }).click(Utilities.BUSY(function (c) {
            select_tree($(c).data());
        }));
        if (item.lin.length == 0) {
            menuitem.append($('<span></span>').html("&empty;"));
        }
        else {
            var words = mapwords(item.lin).join(' ');
            $('<span></span>').text(words).appendTo(menuitem);
        }
        // menuitem.append($('<small></small>').html(
        //     '&nbsp;' + item.pleft + "(" + item.sleft + "-" + item.sright + ")" + item.pright
        // ));
        $('<li>').append(menuitem).appendTo($('#menu'));
    }
    var top = clicked.offset().top + clicked.height() * 3 / 4;
    var striked = $('.' + STRIKED);
    var left = (striked.offset().left + striked.last().offset().left + striked.last().width() - $('#menu').width()) / 2;
    // var left = clicked.offset().top + (clicked.width() - $('#menu').width()) / 2;
    $('#menu').css({
        'top': top + 'px',
        'left': left + 'px',
        'max-height': (window.innerHeight - top - 6) + 'px'
    }).show();
}
