
var MAX_DEPTH = 3;
var MAX_MENUSIZE = 10;
var MENUS_PER_PHRASE = 2;
var FILTER_TIMEOUT = 100;
var MENU_TIMEOUT = 100;

function calculate_menus(grammar, tree, wordnr) {
    var fun2typing = grammar.abstract.types;
    var typing2funs = grammar.abstract.typing2funs;

    console.time("Calculate menus");
    var lin = grammar.linearise(tree);
    var clickedpath = lin[wordnr].path;
    var menus = {};
    for (var k = clickedpath.length; k >= 0; k--) {
        var phrasepath = clickedpath.slice(0, k);
        var phrasetree = getSubtree(tree, phrasepath);
        var phrasetyp = fun2typing[phrasetree[0]].abscat;
        var phraseleft = restrict_left(lin, phrasepath);
        var phraseright = restrict_right(lin, phrasepath);
        console.log("Subtree[%s]: %s", phrasepath, strTree(phrasetree));
        console.group("Linearisation: " + strLin(lin, phrasepath));

        var subtrees = {};
        for (var sub of generate_subtrees(phrasetree, MAX_DEPTH)) {
            var typ = fun2typing[sub[0]].abscat;
            var args = fun2typing[sub[0]].children;
            if (!(typ in subtrees)) subtrees[typ] = [];
            subtrees[typ].push(sub);
            ctr++;
        }

        console.time("Generating phrases");
        var ctr = 0;
        var simphrases0 = [];
        for (var simphr of generate_tree(phrasetyp, typing2funs, subtrees, MAX_DEPTH)) {
            if (phrasetree[0] != simphr[0]) {
                var dist = treedist(phrasetree, simphr);
                if (dist > 0) {
                    if (!simphrases0[dist]) simphrases0[dist] = [];
                    simphrases0[dist].push(simphr);
                    ctr++;
                }
            }
        }
        console.log("Found " + ctr + " trees");
        console.timeEnd("Generating phrases");

        console.time("Filter phrases");
        var ctr1 = 0, ctr2 = 0; 
        var starttime = getTime();
        var simphrases = [];
        filterloop:
        for (var dist = 1; dist <= simphrases0.length; dist++) {
            simphrases[dist] = [];
            for (var simphr of simphrases0[dist] || []) {
                dloop:
                for (var d = 1; d < dist; d++) {
                     for (var dp of simphrases[d] || []) {
                         if (d + treedist(dp, simphr) <= dist) {
                             simphr = null;
                             ctr1++;
                             break dloop;
                         }
                     }
                }
                if (simphr) {
                    simphrases[dist].push(simphr);
                    ctr2++;
                }
                if (getTime() - starttime > FILTER_TIMEOUT) {
                    console.warn("=== TIMEOUT ===")
                    break filterloop;
                }
            }
        }
        console.log("Removed " + ctr1 + " trees, " + ctr2 + " remaining");
        console.timeEnd("Filter phrases");

        console.time("Create menu groups");
        var ctr = 0; 
        var starttime = getTime();
        menuloop:
        for (var dist = 1; dist <= simphrases.length; dist++) {
            for (var simphrase of simphrases[dist] || []) {
                for (var instphrase of instantiate_tree(typing2funs, simphrase)) {
                    if (phrasetree[0] == instphrase[0]) 
                        continue;
                    var simtree = updateCopy(tree, phrasepath, instphrase);
                    var simlin = grammar.linearise(simtree);

                    var pleft = phraseleft;
                    var pright = phraseright;
                    var sleft = restrict_left(simlin, phrasepath);
                    var sright = restrict_right(simlin, phrasepath);
                    while (pleft < pright && sleft < sright && lin[pleft].word == simlin[sleft].word) {
                        if (lin[pleft].path == clickedpath) break;
                        pleft++; sleft++;
                    }
                    while (pleft <= pright && sleft <= sright && lin[pright].word == simlin[sright].word) {
                        if (lin[pright].path == clickedpath) break;
                        pright--; sright--;
                    }

                    var plin = hash(mapwords(lin.slice(pleft, pright+1)));
                    var slin = hash(mapwords(simlin.slice(sleft, sright+1)));
                    if (plin == slin) continue;

                    var clickedword = false;
                    for (var i = pleft; i <= pright; i++) {
                        if (lin[i].path == clickedpath) { clickedword = true; break }
                    }
                    if (!clickedword) continue;

                    if (!menus[plin]) menus[plin] = {};
                    var current = menus[plin][slin];
                    if (current && current.dist <= dist) 
                        continue;
                    menus[plin][slin] = {'dist':dist, 'tree':simtree, 'lin':simlin, 'path':phrasepath,
                                         'pleft':pleft, 'pright':pright, 'sleft':sleft, 'sright':sright};
                    ctr++;
                    if (getTime() - starttime > MENU_TIMEOUT) {
                        console.warn("=== TIMEOUT ===");
                        break menuloop;
                    }
                }
            }
        }
        console.log("Added " + ctr + " menu items");
        console.timeEnd("Create menu groups");
        console.groupEnd();
    }

    var ctr = 0;
    CurrentMenus = [];
    var plins = Object.keys(menus);
    plins.sort(function(a,b){ return unhash(a).length - unhash(b).length });
    for (var plin of plins) {
        var menu = menus[plin];
        var slins = Object.keys(menu);
        slins.sort(function(a,b){ 
            var ma = menu[a], mb = menu[b];
            return ma.dist - mb.dist || (ma.sright-ma.sleft) - (mb.sright-mb.sleft);
        });
        slins.splice(MENUS_PER_PHRASE * MAX_MENUSIZE);
        for (var n = 0; n < slins.length; n += MAX_MENUSIZE) {
            var shortmenu = [];
            for (var i = 0; i < MAX_MENUSIZE; i++) {
                if (n+i < slins.length) {
                    shortmenu.push(menu[slins[n+i]]);
                    ctr++;
                }
            }
            CurrentMenus.push(shortmenu);
        }
    }
    console.log("Returning " + CurrentMenus.length + " menus, in total " + ctr + " menu items");
    console.timeEnd("Calculate menus");
}

function instantiate_tree(typing2funs, tree, notroot) {
    if (isTree(tree)) {
        if (tree.length == 0) {
            yield [];
        } else {
            for (var child of instantiate_tree(typing2funs, tree[0], notroot)) {
                for (var children of instantiate_tree(typing2funs, tree.slice(1), true)) {
                    yield [child].concat(children);
                }
            }
        }
    } else if (ishash(tree)) {
        var args = unhash(tree);
        var typ = args.shift();
        var funs = typing2funs[typ][hash(args)];
        if (notroot && args.length == 0) {
            funs = [funs[0]];
        }
        for (var fun of funs) {
            yield fun;
        }
    } else {
        yield tree;
    }
}

function generate_subtrees(tree, maxdepth) {
    if (isTree(tree) && maxdepth > 0) {
        yield tree;
        for (var child of tree.slice(1)) {
            for (var sub of generate_subtrees(child, maxdepth-1)) {
                yield sub;
            }
        }
    }
}


function generate_tree(typ, typing2funs, subtrees, maxdepth) { // also visited?
    if (typ in subtrees) {
        for (var sub of subtrees[typ]) {
            yield sub;
        }
    }
    if (maxdepth > 0) { // && !(typ in visited)
        for (var argshash in typing2funs[typ] || {}) {
            var funs = typing2funs[typ][argshash];
            var args = unhash(argshash);
            if (funs.length > 1) {
                funs = [hash([typ].concat(args))];
            }
            for (var fun of funs) {
                for (var children of generate_children(args, 0, typing2funs, subtrees, maxdepth - 1)) {
                    yield [fun].concat(children);
                }
            }
        }
    }
}

function generate_children(args, i, typing2funs, subtrees, maxdepth) {
    if (i >= args.length) {
        yield [];
    } else {
        for (var child of generate_tree(args[i], typing2funs, subtrees, maxdepth)) {
            for (var children of generate_children(args, i + 1, typing2funs, subtrees, maxdepth)) {
                yield [child].concat(children);
            }
        }
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

function mapwords(lin) {
    return lin.map(function(token){
        return token.word;
    });
}

function treedist(t1, t2) {
    return levenshtein_distance(flatten(t1), flatten(t2));
}

function levenshtein_distance(s1, s2) {
    // set up a 2-D array
    var len1 = s1.length;
    var len2 = s2.length;
    var lev = [];
    var row = lev[0] = [];
    for (var j = 0; j <= len2; j++) {
        row[j] = j; // row 0: 0,1,2,3,4,...
    }
    for (var i = 0; i <= len1; i++) {
        var row = lev[i] = [];
        row[0] = i; // column 0: 0,1,2,3,4,...
        for (var j = 1; j <= len2; j++) {
            row[j] = 0;
        }
    }

    // iterate over the array
    for (var i = 0; i < len1; i++) {
        for (var j = 0; j < len2; j++) {
            var c1 = s1[i];
            var c2 = s2[j];

            // skipping a character in s1
            var a = lev[i][j+1] + 1;
            // skipping a character in s2
            var b = lev[i+1][j] + 1;
            // substitution
            var c = lev[i][j] + (c1 != c2);

            // pick the cheapest
            lev[i+1][j+1] = Math.min(a, b, c);
        }
    }
    return lev[len1][len2];
}
