
var MAX_DEPTH = 3; 
var MENU_TIMEOUT = 1000;

var FunTyping;
var TypingFuns;
var Linearise;
var GeneratedTrees;


function initialize_grammar(grammar) {
    FunTyping = grammar.abstract.types;
    TypingFuns = grammar.abstract.typing2funs = {};
    for (var fun in FunTyping) {
        var typ = FunTyping[fun].abscat;
        var hashargs = hash(FunTyping[fun].children);
        if (!TypingFuns[typ]) TypingFuns[typ] = {};
        if (!TypingFuns[typ][hashargs]) TypingFuns[typ][hashargs] = [];
        TypingFuns[typ][hashargs].push(fun);
    }
    Linearise = function(lang, tree) {
        return grammar.concretes[lang].linearise(tree)
    };
    GeneratedTrees = generate_all_trees();
}


function bracketise(lin) {
    var stack = [['']];
    var n = 0;
    var path = '';
    while (true) {
        var linpath = n<lin.length && lin[n].path+'w';
        if (startswith(linpath, path)) {
            if (path === linpath) {
                var linword = lin[n].word;
                stack[stack.length-1].push({n:n, word:linword, path:linpath});
                n++;
            } else {
                for (var i = path.length+1; i <= linpath.length; i++) stack.push([linpath.slice(0,i)]);
                path = linpath;
            }
        } else {
            var bracklin = stack.pop();
            stack[stack.length-1].push(bracklin)
            path = path.slice(0, -1);
            if (!path) break;
        }
    }
    if (lin.length !== n || stack.length !== 1) {
        console.log("INTERNAL ERROR: ", lin.length, "!=", n, "//", stack.length, "!=", 1);
    }
    return stack[0];
}


function get_subtrees(tree, path, subtrees) {
    if (!isTree(tree)) return [];
    if (!path) path = "";
    if (!subtrees) subtrees = [];
    subtrees.push({'path':path, 'tree':tree});
    for (var i = 1; i < tree.length; i++) {
        get_subtrees(tree[i], path+i, subtrees);
    }
    return subtrees;
}


function equal_phrases(L1, tree1, L2, tree2) {
    var equals = {}; equals[L1] = {}; equals[L2] = {};
    var subs1 = get_subtrees(tree1);
    var subs2 = get_subtrees(tree2);
    for (var i = 0; i < subs1.length; i++) {
        var s1 = subs1[i];
        for (var j = 0; j < subs2.length; j++) {
            var s2 = subs2[j];
            if (strTree(s1.tree) == strTree(s2.tree)) {
                equals[L1][s1.path] = s2.path;
                equals[L2][s2.path] = s1.path;
                break;
            }
        }
    }
    return equals;
}


function initialize_menus(lang, tree) {
    START_TIMER(lang, true);
    var final_menus = {};
    var lin = Linearise(lang, tree);
    var all_phrase_paths = {};
    for (var i = 0; i < lin.length; i++) {
        var path = lin[i].path;
        for (var j = path.length; j > 0; j--) {
            all_phrase_paths[path.slice(0,j)] = true;
        }
    }
    all_phrase_paths = Object.keys(all_phrase_paths);
    all_phrase_paths.sort(function(a,b){return b.length - a.length});

    var visited = {};
    visited[strTree(tree)] = all_phrase_paths;

    START_TIMER(lang+":similars", true);
    var all_similars = {};
    var all_menus = {};
    var max_cost = 0;
    for (var i = 0; i < all_phrase_paths.length; i++) {
        var phrase_path = all_phrase_paths[i];
        var phrase_tree = getSubtree(tree, phrase_path);
        all_similars[phrase_path] = similar_trees(phrase_tree);
        max_cost = Math.max(max_cost, all_similars[phrase_path].length);
        all_menus[phrase_path] = {};
    }
    STOP_TIMER(lang+":similars");

    START_TIMER(lang+":menugroup", true);
    var ctr = 0; 
    menuloop:
    for (var cost = 1; cost <= max_cost; cost++) {
        for (var i = 0; i < all_phrase_paths.length; i++) {
            var phrase_path = all_phrase_paths[i];
            var phrase_left = restrict_left(lin, phrase_path);
            var phrase_right = restrict_right(lin, phrase_path);
            var phrase_lin = lin.slice(phrase_left, phrase_right + 1);

            var menus = all_menus[phrase_path];
            var similars = all_similars[phrase_path];
            var simphrs = similars[cost];
            if (simphrs) {
                START_TIMER(lang+":cost-" + cost);
                itemloop:
                for (var simix = 0; simix < simphrs.length; simix++) {
                    if (GET_TIMER(lang+":menugroup") > MENU_TIMEOUT) {
                        console.log("TIMEOUT: breaking menuloop, cost " + cost + 
                                    ", path " + phrase_path + ", menu items " + ctr);
                        STOP_TIMER(lang+":cost-" + cost);
                        break menuloop;
                    }
                    START_TIMER(lang+":visited");
                    var sim = simphrs[simix];
                    var simtree = updateCopy(tree, phrase_path, sim.tree);
                    var stree = strTree(simtree);
                    var visitlist = visited[stree];
                    if (!visitlist) {
                        visitlist = visited[stree] = [];
                    } else {
                        for (var sti = 0; sti < visitlist.length; sti++) {
                            if (startswith(visitlist[sti], phrase_path)) {
                                STOP_TIMER(lang+":visited");
                                continue itemloop;
                            }
                        }
                    }
                    visitlist.push(phrase_path);
                    STOP_TIMER(lang+":visited");

                    START_TIMER(lang+":simlin");
                    var simlin = Linearise(lang, simtree);
                    STOP_TIMER(lang+":simlin");

                    var pleft = phrase_left;
                    var pright = phrase_right;
                    var sleft = restrict_left(simlin, phrase_path);
                    var sright = restrict_right(simlin, phrase_path);
                    while (pleft < pright && sleft < sright && lin[pleft].word == simlin[sleft].word) {
                        pleft++; sleft++;
                    }
                    while (pleft < pright && sleft < sright && lin[pright].word == simlin[sright].word) {
                        pright--; sright--;
                    }

                    var phrase_simlin = simlin.slice(sleft, sright + 1);
                    var slin = hash(mapwords(phrase_simlin));
                    var plin = hash(mapwords(lin.slice(pleft, pright+1)));
                    if (plin == slin) continue;

                    var pspan = hash([pleft, pright]);
                    if (!menus[pspan]) menus[pspan] = {};
                    var current = menus[pspan][slin];
                    if (current && current.cost <= cost) continue;
                    menus[pspan][slin] = {'cost':cost, 'tree':simtree, 'lin':phrase_simlin, 'path':phrase_path,
                                          'pleft':pleft, 'pright':pright, 'sleft':sleft, 'sright':sright};
                    ctr++;
                }
                STOP_TIMER(lang+":cost-" + cost);
            }
        }
    }
    STOP_TIMER(lang+":menugroup");

    START_TIMER(lang+":finalize", true);
    for (var i = 0; i < all_phrase_paths.length; i++) {
        var phrase_path = all_phrase_paths[i];
        var ctr = 0;
        final_menus[phrase_path] = {};
        var menus = all_menus[phrase_path];
        for (var pspan in menus) {
            var menu = menus[pspan];
            var slins = Object.keys(menu);
            slins.sort(function(a,b){ 
                var ma = menu[a], mb = menu[b];
                return ma.cost - mb.cost || (ma.sright-ma.sleft) - (mb.sright-mb.sleft) || 
                    mapwords(ma.lin).join().localeCompare(mapwords(mb.lin).join());
            });
            var menu_items = final_menus[phrase_path][pspan] = [];
            for (var n = 0; n < slins.length; n ++) {
                var item = menu[slins[n]];
                menu_items.push(item);
            }
        }
    }
    STOP_TIMER(lang+":finalize");
    STOP_TIMER(lang);
    return final_menus;
}


function similar_trees(tree) {
    var pruned = prune_tree(tree);
    var similars = all_similar_trees(pruned);
    var result = [];
    var ctr = 0;
    for (var cost = 0; cost < similars.length; cost++) {
        if (similars[cost]) {
            for (var i = 0; i < similars[cost].length; i++) {
                var sim = similars[cost][i];
                var new_tree = copyTree(sim.new);
                for (var k = 0; k < sim.selected.length; k++) {
                    var old_path = sim.selected[k].old;
                    var new_path = sim.selected[k].new;
                    var sub = getSubtree(tree, old_path);
                    new_tree = updateCopy(new_tree, new_path, sub);
                }
                if (!result[cost]) result[cost] = [];
                result[cost].push({'tree':new_tree}); // , 'clicked':new_clicked_path});
                ctr++;
            }
        }
    }
    return result;
}


function all_similar_trees(all_pruned) {
    var result = [];
    var ctr = 0;
    for (var pi = 0; pi < all_pruned.length; pi++) {
        var pruned = all_pruned[pi];
        var typ, fun;
        if (isTree(pruned.tree)) {
            fun = pruned.tree[0];
            typ = FunTyping[fun].abscat;
        } else if (startswith(pruned.tree, META)) {
            fun = null;
            typ = pruned.tree.slice(1);
        }

        simloop: 
        for (var si = 0; si < GeneratedTrees[typ].length; si++) {
            var sim = GeneratedTrees[typ][si];
            if (array_eq(pruned.tree, sim.tree)) continue;

            var cost = pruned.cost + sim.cost;

            // this should be optimized
            var selected0 = {};
            for (var simtyp in sim.metas) {
                var simmetas = sim.metas[simtyp];
                var prunedmetas = pruned.metas[simtyp];
                if (!prunedmetas || prunedmetas.length < simmetas.length) {
                    continue simloop;
                }
                selected0[simtyp] = [];
                for (var j = 0; j < simmetas.length; j++) {
                    selected0[simtyp].push({'old':prunedmetas[j].path, 'new':simmetas[j].path});
                }
                for (var j = simmetas.length; j < prunedmetas.length; j++) {
                    cost += prunedmetas[j].cost;
                }
            }
            for (var extyp in pruned.metas) {
                if (!sim.metas[extyp]) {
                    for (var j = 0; j < pruned.metas[extyp].length; j++) {
                        cost += pruned.metas[extyp][j].cost;
                    }
                }
            }
            var selected = [];
            for (var simtyp in selected0) {
                selected = selected.concat(selected0[simtyp]);
            }

            if (!result[cost]) result[cost] = [];
            result[cost].push({'old':pruned.tree, 'new':sim.tree, 'cost':cost, 'selected':selected});
            ctr++;
        }
    }
    return result;
}


function treesize(tree) {
    var size = 0;
    if (isTree(tree)) {
        for (var i = 0; i < tree.length; i++) {
            size += treesize(tree[i]);
        }
    } else {
        size += 1;
    }
    return size;
}


function select_metas(pruned_metas, sim_metas) {
    var result = [];
    if (pruned_metas[pi].type == sim_metas[si].type) {
        result.push({'old':pruned_metas[pi].path, 'new':sim_metas[si].path});
    }
    return result;
}


function prune_tree(tree) {
    function prune(sub, path, depth) {
        var result = [];
        if (depth >= MAX_DEPTH) return result;
        var fun = sub[0];
        var typ = FunTyping[fun].abscat;
        result.push({'tree':META+typ, 'cost':0, 
                     'metas':[{'path':path, 'type':typ, 'tree':sub, 'cost':treesize(sub)}]});
        var allchildren = prunechildren(sub, path, 1, depth + 1);
        for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
            var children = allchildren[childrenix];
            result.push({'tree': [fun].concat(children.trees), 
                         'cost': children.cost + 1,
                         'metas': children.metas});
        }
        return result;
    }
    function prunechildren(args, path, i, depth) {
        var result = [];
        if (i >= args.length) {
            result.push({'trees':[], 'cost':0, 'metas':[]});
        } else {
            var allchild = prune(args[i], path+i, depth);
            var allchildren = prunechildren(args, path, i+1, depth);
            for (var childix = 0; childix < allchild.length; childix++) {
                var child = allchild[childix];
                for (var childrenix = 0; childrenix < allchildren.length; childrenix++) {
                    var children = allchildren[childrenix];
                    result.push({'trees': [child.tree].concat(children.trees), 
                                 'cost': child.cost + children.cost,
                                 'metas': child.metas.concat(children.metas)});
                }
            }
        }
        return result;
    }

    var result = prune(tree, "", 0);
    for (var i = 0; i < result.length; i++) {
        var metas = {};
        for (var j = 0; j < result[i].metas.length; j++) {
            var meta = result[i].metas[j]
            if (!metas[meta.type]) metas[meta.type] = [];
            metas[meta.type].push(meta);
        }
        result[i].metas = metas;
    }
    for (var i = 0; i < result.length; i++) {
        var t = result[i];
    }
    return result;
}


function contains_word(word, words) {
    return new RegExp(" "+word+" ").test(words);
}


function gentrees(typ, path, depth, visited) {
    var result = [];
    if (contains_word(typ, visited)) return result;
    if (depth == 0) {
        // generate a tree of the form: ?t
        result.push({'tree':META+typ, 'cost':0, 'metas':[{'path':path,'type':typ}]});
    }
    var fun = "default_" + typ;
    var args = depth > 0 && FunTyping[fun];
    if (args && args.children) {
        if (args.children.length == 0) {
            result.push({'tree': [fun], 
                         'cost': 1, 
                         'metas': []});
        } else {
            console.warn("Internal error: you shouldn't have got here", fun, args);
        }
    } else {
        var newvisited = visited + " " + typ + " ";
        for (var argshash in TypingFuns[typ] || {}) {
            var funs = TypingFuns[typ][argshash];
            var args = unhash(argshash);
            var metatrees = [];
            var metas = [];
            for (var i = 1; i <= args.length; i++) {
                var argtyp = args[i-1];
                metatrees.push(META+argtyp);
                metas.push({'path':path+i, 'type':argtyp});
            }
            // generate trees of the form: (f ?t1 ... ?tn)
            for (var funix = 0; funix < funs.length; funix++) {
                var fun = funs[funix];
                result.push({'tree':[fun].concat(metatrees), 'cost':1, 'metas':metas});
            }
            // generate trees of the form: (f (t1) ?t2 ... ?tn), (f ?t1 (t2) ?t3 ... ?tn), ...
            for (var argix = 1; argix <= args.length; argix++) {
                var argtyp = args[argix-1];
                var allchildren = gentrees(argtyp, path+argix, depth+1, newvisited);
                for (var chix = 0; chix < allchildren.length; chix++) {
                    var child = allchildren[chix];
                    var childtrees = metatrees.slice(0, argix-1).concat([child.tree]).concat(metatrees.slice(argix));
                    var childmetas = metas.slice(0, argix-1).concat(child.metas).concat(metas.slice(argix));
                    for (var funix = 0; funix < funs.length; funix++) {
                        var fun = funs[funix];
                        result.push({'tree': [fun].concat(childtrees), 
                                     'cost': child.cost + 1,
                                     'metas': childmetas});
                    }
                }
            }
        }
    }
    return result;
}


function generate_all_trees(typ) {
    START_TIMER("generate", true);
    var total_trees = 0;
    var generated_trees = {};
    for (var typ in TypingFuns) {
        var trees = generated_trees[typ] = gentrees(typ, '', 0, '');
        for (var i = 0; i < trees.length; i++) {
            var metas = {};
            for (var j = 0; j < trees[i].metas.length; j++) {
                var meta = trees[i].metas[j]
                if (!metas[meta.type]) metas[meta.type] = [];
                metas[meta.type].push(meta);
            }
            trees[i].metas = metas;
        }
        total_trees += generated_trees[typ].length;
    }
    STOP_TIMER("generate");
    return generated_trees;
}


/* ...simplified...

  UseV2   : V2 -> VP ;
  ComplV2 : V2 -> NP -> VP ;
  CompAP  : AP -> VP ;
  CompAdv : Adv -> VP ;         -- be here
  ComplVS : VS -> S  -> VP ;  -- know that she walks
  ComplVQ : VQ -> QS -> VP ;  -- wonder who walks
  ComplVV : VV -> VP -> VP ;  -- want to walk
  AdvVP : VP -> Adv -> VP ; -- walk in the city

UseV2 v2 <-> ComplV2 v2 ?NP 
UseV2 ?V2 <-> CompAP ?AP
AdvVP vp ?Adv <-> vp
ComplVV ?VV vp <-> vp

  UseCl   : Temp -> Pol -> Cl -> S ;
  PredVP  : NP -> VP -> Cl ;

ComplVS ?VS (UseCl ?Temp ?Pol (PredVP ?NP vp)) <-> vp
PredVP np (ComplVS ?VS (UseCl ?Temp ?Pol cl)) <-> cl
UseCl ?Temp ?Pol (PredVP ?NP (ComplVS ?VS s)) <-> s

ComplVS ?VS ?S <-> UseV2 ?V2

*/


function isTree(tree) {
    return tree instanceof Array;
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


function mapwords(lin) {
    return lin.map(function(token){
        return token.word;
    });
}

