///<reference path="Utilities.ts"/>
///<reference path="GF.ts"/>

var MAX_DEPTH = 3; 
var MENU_TIMEOUT = 1000;

var FunTyping : {[fun:string] : Type};
var TypingFuns : {[cat:string] : {[args:string] : string[]}};
var Linearise : (string, GFTree) => LinToken[];
var GeneratedTrees : {[type:string] : GeneratedTree[]};


interface MetaInfo {
    path : string;
    type : string;
    cost : number;
}

interface GeneratedTree {
    cost  : number;
    tree  : GFTree;
    metas : {[type:string] : MetaInfo[]};
}

interface SubTree {
    tree : GFTree;
    path : string;
}

interface MenuItem {
    cost   : number;
    tree   : GFTree;
    lin    : LinToken[];
    path   : string;
    pleft  : number;
    pright : number;
    sleft  : number;
    sright : number;
}


function initialize_grammar(grammar : GFGrammar) : void {
    FunTyping = grammar.abs.types;
    TypingFuns = grammar.abs.typing2funs;
    Linearise = function(lang, tree) {
        return grammar.cncs[lang].linearise(tree)
    };
    GeneratedTrees = generate_all_trees();
}


class BracketedLin {
    constructor(public path : string,
                public tokens : (BracketedLin | BracketedToken)[]
               ) {}
}

class BracketedToken {
    constructor(public word:string, public n:number) {}
}

function bracketise(lin : LinToken[]) : BracketedLin {
    var stack : BracketedLin[] = [new BracketedLin("", [])];
    var n : number = 0;
    var path : string = '';
    while (true) {
        var linpath : string = n < lin.length && lin[n].path+'w';
        if (startswith(linpath, path)) {
            if (path === linpath) {
                var linword : string = lin[n].word;
                stack[stack.length-1].tokens.push(new BracketedToken(linword, n));
                n++;
            } else {
                for (var i = path.length+1; i <= linpath.length; i++) {
                    stack.push(new BracketedLin(linpath.slice(0,i), []));
                }
                path = linpath;
            }
        } else {
            var bracklin : BracketedLin = stack.pop();
            stack[stack.length-1].tokens.push(bracklin)
            path = path.slice(0, -1);
            if (!path) break;
        }
    }
    if (lin.length !== n || stack.length !== 1) {
        console.log("INTERNAL ERROR: ", lin.length, "!=", n, "//", stack.length, "!=", 1);
    }
    return stack[0];
}

function get_subtrees(tree : GFTree,
                      path? : string,
                      subtrees? : SubTree[]
                     ) : SubTree[]
{
    if (!path) path = "";
    if (!subtrees) subtrees = [];
    subtrees.push({'path':path, 'tree':tree});
    for (var i = 0; i < tree.children.length; i++) {
        get_subtrees(tree.children[i], path+i, subtrees);
    }
    return subtrees;
}


function equal_phrases(
    L1 : string, tree1 : GFTree, L2 : string, tree2 : GFTree
) : {[lang:string] : {[path:string] : string}}
{
    var equals : {[lang:string] : {[path:string] : string}} = {};
    equals[L1] = {}; equals[L2] = {};
    var subs1 = get_subtrees(tree1);
    var subs2 = get_subtrees(tree2);
    for (var i = 0; i < subs1.length; i++) {
        var s1 : SubTree = subs1[i];
        for (var j = 0; j < subs2.length; j++) {
            var s2 : SubTree = subs2[j];
            if (s1.tree.toString() == s2.tree.toString()) {
                equals[L1][s1.path] = s2.path;
                equals[L2][s2.path] = s1.path;
                break;
            }
        }
    }
    return equals;
}


function initialize_menus(
    lang : string, tree : GFTree
) : {[phrase:string] : {[span:string] : MenuItem[]}}
{
    Utilities.START_TIMER(lang, true);
    var final_menus : {[phrase:string] : {[span:string] : MenuItem[]}} = {};
    var lin : LinToken[] = Linearise(lang, tree);
    var all_phrase_paths_D : {[path:string] : boolean} = {};
    for (var i = 0; i < lin.length; i++) {
        var path = lin[i].path;
        for (var j = path.length; j > 0; j--) {
            all_phrase_paths_D[path.slice(0,j)] = true;
        }
    }
    var all_phrase_paths : string[] = Object.keys(all_phrase_paths_D);
    all_phrase_paths.sort(function(a,b){return b.length - a.length});

    var visited : {[tree:string] : string[]} = {};
    visited[tree.toString()] = all_phrase_paths;

    Utilities.START_TIMER(lang+":similars", true);
    var all_similars : {[path:string] : GFTree[][]} = {};
    var all_menus : {[phrase:string] : {[span:string] : {[slin:string] : MenuItem}}} = {};
    var max_cost = 0;
    for (var i = 0; i < all_phrase_paths.length; i++) {
        var phrase_path : string = all_phrase_paths[i];
        var phrase_tree : GFTree = tree.getSubtree(phrase_path);
        all_similars[phrase_path] = similar_trees(phrase_tree);
        max_cost = Math.max(max_cost, all_similars[phrase_path].length);
        all_menus[phrase_path] = {};
    }
    Utilities.STOP_TIMER(lang+":similars");

    Utilities.START_TIMER(lang+":menugroup", true);
    var ctr = 0; 
    menuloop:
    for (var cost = 1; cost <= max_cost; cost++) {
        for (var i = 0; i < all_phrase_paths.length; i++) {
            var phrase_path : string = all_phrase_paths[i];
            var phrase_left : number = restrict_left(lin, phrase_path);
            var phrase_right : number = restrict_right(lin, phrase_path);
            var phrase_lin : LinToken[] = lin.slice(phrase_left, phrase_right + 1);

            var menus : {[span:string] : {[slin:string] : MenuItem}} = all_menus[phrase_path];
            var similars : GFTree[][] = all_similars[phrase_path];
            var simphrs : GFTree[] = similars[cost];
            if (simphrs) {
                Utilities.START_TIMER(lang+":cost-" + cost);
                itemloop:
                for (var simix = 0; simix < simphrs.length; simix++) {
                    if (Utilities.GET_TIMER(lang+":menugroup") > MENU_TIMEOUT) {
                        console.log("TIMEOUT: breaking menuloop, cost " + cost + 
                                    ", path " + phrase_path + ", menu items " + ctr);
                        Utilities.STOP_TIMER(lang+":cost-" + cost);
                        break menuloop;
                    }
                    Utilities.START_TIMER(lang+":visited");
                    var sim : GFTree = simphrs[simix];
                    var simtree : GFTree = tree.updateCopy(phrase_path, sim);
                    var stree : string = simtree.toString();
                    var visitlist = visited[stree];
                    if (!visitlist) {
                        visitlist = visited[stree] = [];
                    } else {
                        for (var sti = 0; sti < visitlist.length; sti++) {
                            if (startswith(visitlist[sti], phrase_path)) {
                                Utilities.STOP_TIMER(lang+":visited");
                                continue itemloop;
                            }
                        }
                    }
                    visitlist.push(phrase_path);
                    Utilities.STOP_TIMER(lang+":visited");

                    Utilities.START_TIMER(lang+":simlin");
                    var simlin : LinToken[] = Linearise(lang, simtree);
                    Utilities.STOP_TIMER(lang+":simlin");

                    var pleft : number = phrase_left;
                    var pright : number = phrase_right;
                    var sleft : number = restrict_left(simlin, phrase_path);
                    var sright : number = restrict_right(simlin, phrase_path);
                    // TODO: use <= instead of < to get insertion menus!
                    while (pleft <= pright && sleft <= sright && lin[pleft].word == simlin[sleft].word) {
                        pleft++; sleft++;
                    }
                    while (pleft <= pright && sleft <= sright && lin[pright].word == simlin[sright].word) {
                        pright--; sright--;
                    }

                    var phrase_simlin : LinToken[] = simlin.slice(sleft, sright + 1);
                    var slin : string = Utilities.hash(mapwords(phrase_simlin));
                    var plin : string = Utilities.hash(mapwords(lin.slice(pleft, pright+1)));
                    if (plin == slin) continue;

                    var pspan : string = pleft + ":" + pright;
                    // var pspan : string = Utilities.hash([pleft, pright]);
                    if (!menus[pspan]) menus[pspan] = {};
                    var current : MenuItem = menus[pspan][slin];
                    if (current && current.cost <= cost) continue;
                    menus[pspan][slin] = {
                        'cost':cost, 'tree':simtree, 'lin':phrase_simlin, 'path':phrase_path,
                        'pleft':pleft, 'pright':pright, 'sleft':sleft, 'sright':sright,
                    };
                    ctr++;
                }
                Utilities.STOP_TIMER(lang+":cost-" + cost);
            }
        }
    }
    Utilities.STOP_TIMER(lang+":menugroup");

    Utilities.START_TIMER(lang+":finalize", true);
    for (var i = 0; i < all_phrase_paths.length; i++) {
        var phrase_path = all_phrase_paths[i];
        var ctr = 0;
        final_menus[phrase_path] = {};
        var menus = all_menus[phrase_path];
        for (var ppspan in menus) {
            var menu = menus[ppspan];
            var slins = Object.keys(menu);
            slins.sort(function(a,b){ 
                var ma = menu[a], mb = menu[b];
                return ma.cost - mb.cost || (ma.sright-ma.sleft) - (mb.sright-mb.sleft) || 
                    mapwords(ma.lin).join().localeCompare(mapwords(mb.lin).join());
            });
            var menu_items : MenuItem[] = final_menus[phrase_path][ppspan] = [];
            for (var n = 0; n < slins.length; n ++) {
                var item = menu[slins[n]];
                menu_items.push(item);
            }
        }
    }
    Utilities.STOP_TIMER(lang+":finalize");
    Utilities.STOP_TIMER(lang);
    return final_menus;
}


function similar_trees(tree : GFTree) : GFTree[][] {
    var all_pruned : GeneratedTree[] = prune_tree(tree);

    var result : GFTree[][] = [];
    for (var pi = 0; pi < all_pruned.length; pi++) {
        var pruned : GeneratedTree = all_pruned[pi];
        var fun : string = pruned.tree.node;
        var typ : string = pruned.tree.isMeta();
        if (!typ) {
            typ = FunTyping[fun].abscat;
        }

        simloop: 
        for (var si = 0; si < GeneratedTrees[typ].length; si++) {
            var simtree : GeneratedTree = GeneratedTrees[typ][si];
            var cost : number = pruned.cost + simtree.cost;

            // this should be optimized
            var new_tree = simtree.tree;
            for (var simtyp in simtree.metas) {
                var simmetas : MetaInfo[] = simtree.metas[simtyp];
                var prunedmetas : MetaInfo[] = pruned.metas[simtyp];
                if (!prunedmetas || prunedmetas.length < simmetas.length) {
                    continue simloop;
                }
                for (var j = 0; j < prunedmetas.length; j++) {
                    if (j < simmetas.length) {
                        var old_path : string = prunedmetas[j].path;
                        var new_path : string = simmetas[j].path;
                        var sub : GFTree = tree.getSubtree(old_path);
                        new_tree = new_tree.updateCopy(new_path, sub);
                    } else {
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

            if (!result[cost]) result[cost] = [];
            result[cost].push(new_tree); 
        }
    }
    return result;
}




interface TempGenTree {
    tree  : GFTree;
    cost  : number;
    metas : MetaInfo[];
}


function prune_tree(tree : GFTree) : GeneratedTree[] {

    function prune(sub : GFTree, path : string, depth : number
                  ) : TempGenTree[]
    {
        if (depth >= MAX_DEPTH) return [];
        var fun : string = sub.node;
        var typ = FunTyping[fun].abscat;
        return prunechildren(sub, path, 0, depth + 1).concat(
            {'tree':GFTree.meta(typ),
             'cost':0, 
             'metas':[{'path':path, 'type':typ, 'cost':sub.size()}]
            });
    }

    function prunechildren(sub : GFTree, path : string, i : number, depth : number
                          ) : TempGenTree[]
    {
        var result : TempGenTree[] = [];
        if (i >= sub.children.length) {
            result.push({'tree':sub, 'cost':1, 'metas':[]});
        } else {
            var allchild = prune(sub.children[i], path+i, depth);
            var allchildren = prunechildren(sub, path, i+1, depth);
            for (var childix = 0; childix < allchild.length; childix++) {
                var child = allchild[childix];
                for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
                    var children = allchildren[childrenix];
                    result.push({'tree': sub.updateCopy(i+'', child.tree),
                                 'cost': child.cost + children.cost,
                                 'metas': child.metas.concat(children.metas)});
                }
            }
        }
        return result;
    }

    var result0 : TempGenTree[] = prune(tree, "", 0);
    var result : GeneratedTree[] = [];
    for (var i = 0; i < result0.length; i++) {
        var metas : {[type:string] : MetaInfo[]} = {};
        for (var j = 0; j < result0[i].metas.length; j++) {
            var meta = result0[i].metas[j]
            if (!metas[meta.type]) metas[meta.type] = [];
            metas[meta.type].push(meta);
        }
        result.push({tree: result0[i].tree,
                     cost: result0[i].cost,
                     metas: metas});
    }
    return result;
}



function gentrees(typ : string, path : string, depth : number, visited : string
                 ) : TempGenTree[]
{
    var result : TempGenTree[] = [];
    if (contains_word(typ, visited)) return result;
    if (depth == 0) {
        // generate a tree of the form: ?t
        result.push({'tree':GFTree.meta(typ),
                     'cost':0,
                     'metas':[{'path':path,'type':typ, cost:0}]});
    }
    var fun = "default_" + typ;
    var fargs : Type = depth > 0 && FunTyping[fun];
    if (fargs && fargs.children) {
        if (fargs.children.length == 0) {
            result.push({'tree': new GFTree(fun, []), 
                         'cost': 1, 
                         'metas': []});
        } else {
            console.warn("Internal error: you shouldn't have got here", fun, fargs);
        }
    } else {
        var newvisited = visited + " " + typ + " ";
        for (var argshash in TypingFuns[typ] || {}) {
            var funs : string[] = TypingFuns[typ][argshash];
            var targs : string[] = Utilities.unhash(argshash);
            var metatrees : GFTree[] = [];
            var metas : MetaInfo[] = [];
            for (var i = 0; i < targs.length; i++) {
                var argtyp = targs[i];
                metatrees.push(GFTree.meta(argtyp));
                metas.push({'path':path+i, 'type':argtyp, cost:0});
            }
            // generate trees of the form: (f ?t1 ... ?tn)
            for (var funix = 0; funix < funs.length; funix++) {
                var fun : string = funs[funix];
                result.push({'tree':new GFTree(fun, metatrees), 'cost':1, 'metas':metas});
            }
            // generate trees of the form: (f (t1) ?t2 ... ?tn), (f ?t1 (t2) ?t3 ... ?tn), ...
            for (var argix = 0; argix < targs.length; argix++) {
                var argtyp = targs[argix];
                var allchildren = gentrees(argtyp, path+argix, depth+1, newvisited);
                for (var chix = 0; chix < allchildren.length; chix++) {
                    var child = allchildren[chix];
                    var childtrees : GFTree[]
                        = metatrees.slice(0, argix).concat([child.tree]).concat(metatrees.slice(argix+1));
                    var childmetas : MetaInfo[]
                        = metas.slice(0, argix).concat(child.metas).concat(metas.slice(argix+1));
                    for (var funix = 0; funix < funs.length; funix++) {
                        var fun : string = funs[funix];
                        result.push({'tree': new GFTree(fun, childtrees), 
                                     'cost': child.cost + 1,
                                     'metas': childmetas});
                    }
                }
            }
        }
    }
    return result;
}


function generate_all_trees() : {[type:string] : GeneratedTree[]}
{
    Utilities.START_TIMER("generate", true);
    var total_trees = 0;
    var generated_trees : {[type:string] : GeneratedTree[]} = {};
    for (var typ in TypingFuns) {
        var trees0 : TempGenTree[] = gentrees(typ, '', 0, '');
        var trees : GeneratedTree[] = generated_trees[typ] = [];
        for (var i = 0; i < trees0.length; i++) {
            var metas : {[type:string] : MetaInfo[]} = {};
            for (var j = 0; j < trees0[i].metas.length; j++) {
                var meta = trees0[i].metas[j]
                if (!metas[meta.type]) metas[meta.type] = [];
                metas[meta.type].push(meta);
            }
            var treeinfo = {tree: trees0[i].tree,
                            cost: trees0[i].cost, 
                            metas: metas};
            trees.push(treeinfo);
        }
        total_trees += generated_trees[typ].length;
    }
    Utilities.STOP_TIMER("generate");
    return generated_trees;
}



function contains_word(word : string, words : string) : boolean {
    return new RegExp(" "+word+" ").test(words);
}


function restrict_left(lin : LinToken[], path : string) : number {
    for (var i = 0; i < lin.length; i++) {
        if (startswith(lin[i].path, path))
            return i;
    }
}


function restrict_right(lin : LinToken[], path : string) : number {
    for (var i = lin.length - 1; i >= 0; i--) {
        if (startswith(lin[i].path, path))
            return i;
    }
}


function linearise_abstract(tree : GFTree) : LinToken[] {
    // flattened abstract tree
    var lin = [];
    function lintree_(tree, path) {
        if (tree instanceof Array) {
            lin.push({'word':"(", 'path':path});
            for (var i in tree) {
                lintree_(tree[i], i>0 ? path+i : path);
            }
            lin.push({'word':")", 'path':path});
        } else {
            lin.push({'word':tree, 'path':path});
        }
    }
    lintree_(tree, "");
    return lin;
}


function mapwords(lin : LinToken[]) : string[] {
    return lin.map((token) => token.word);
}

