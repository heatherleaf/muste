
var BEFORE = 'BEFORE', ON = 'ON', AFTER = 'AFTER';

var Grammar;
var Tree;
var Lins;
var Selected;
var Position;
var ClickData;

$(function() {
    initialize_grammars();
    select_grammar(DEFAULT_GRAMMAR);
});

function initialize_grammars() {
    var grammars = Object.keys(GRAMMARS);
    grammars.sort();
    grammars.forEach(function(gram) {
        $('<a href="#" class="grammar">')
            .attr('id', gram)
            .text(gram)
            .click(function(){select_grammar(gram)})
            .appendTo($('#grammars'));
    });
}

function select_grammar(gram) {
    debug();
    debug("GRAMMAR:", gram);
    Grammar = gram;
    select_tree(parseGFTree(TREES[gram]));
    $('.grammar').removeClass('selected').attr('href', '#');
    $('#' + gram).addClass('selected').removeAttr('href');
}

function select_tree(tree) {
    debug("TREE:", strTree(tree));
    Tree = tree;
    Lins = {};
    Selected = null;
    $('#menu').empty().hide();
    $('#sentences').empty();
    var languages = Object.keys(GRAMMARS[Grammar].concretes);
    languages.forEach(function(lang){
        Lins[lang] = GRAMMARS[Grammar].concretes[lang].linearise(tree);
        // debug(lang, strLin(Lins[lang]));
        var sent = $('<p>').appendTo($('#sentences'));
        for (var nr = 0; nr <= Lins[lang].length; nr++) {
            var spaceelem = $('<a class="space" href="#">')
                .data('nr', nr)
                .data('lang', lang)
                .html("&nbsp;")
                .click(click_space)
                .appendTo(sent);
            if (nr < Lins[lang].length) {
                var wordelem = $('<a class="word" href="#">')
                    .attr('id', 'word-' + nr)
                    .data('nr', nr)
                    .data('lang', lang)
                    .text(Lins[lang][nr].word)
                    .click(click_word)
                    .appendTo(sent);
            }
        }
    });
}

function debug() {
    if (arguments.length > 0) {
        $('<p>')
            .text(Array.prototype.join.call(arguments, " "))
            .prependTo($('#debug'));
    } else {
        $('<hr>').prependTo($('#debug'));
    }
}

function click_word() {
    var wordnr = $(this).data('nr');
    var lang = $(this).data('lang');
    // debug("CLICK WORD:", wordnr, "/", lang);
    var menu = find_next_menu(lang, wordnr, ON);
    show_menu($(this), menu);
}

function click_space() {
    var spacenr = $(this).data('nr');
    var lang = $(this).data('lang');
    // debug("CLICK SPACE:", spacenr, "/", lang);
    var menu;
    if (spacenr > 0 && !(Selected && Position == BEFORE)) {
        menu = find_next_menu(lang, spacenr-1, AFTER);
    }
    if (spacenr < Lins[lang].length && !(Selected && Position == AFTER)) {
        menu = find_next_menu(lang, spacenr, BEFORE);
    }
    show_menu($(this), menu);
}

function find_next_menu(lang, wordnr, position) {
    Position = position;
    var path = Lins[lang][wordnr].node;
    if (!is_selected(path, position)) 
        Selected = path;
    var menu;
    // debug("@", wordnr, ":", path, "->", Selected, "/", menu);
    while (Selected && !(menu && menu.length)) {
        Selected = Selected.slice(0, -1);
        menu = click_somewhere(lang, wordnr, position);
        // debug("F", Selected, "->", menu.length);
    }
    return menu;
}

function show_menu(clicked, menu) {
    // debug("M", Selected, Position, menu ? menu.length : "/");
    select_focus();
    $('#menu').empty().hide();
    if (Selected && menu) {
        clicked.addClass('selected');
        menu.forEach(function(item) {
            $('<li>').append(
                $('<a href="#">')
                    .html(item['menu-item'].join(" "))
                    .data('tree', item['new-tree'])
                    .click(function(){
                        select_tree($(this).data('tree'));
                    })
            ).appendTo($('#menu'));
        });
        var pos = clicked.position();
        var xadd = (clicked.outerWidth() - $('#menu').outerWidth()) / 2;
        var yadd = clicked.outerHeight() * 2/3;
        $('#menu').css({
            top: (pos.top + yadd) + 'px',
            left: (pos.left + xadd) + 'px'
        }).show();
    }
}

function select_focus() {
    $('.word').each(function() {
        var nr = $(this).data('nr');
        var lang = $(this).data('lang');
        var wordpath = Lins[lang][nr].node;
        $(this).toggleClass('selected', is_selected(wordpath));
    });
    // $('.space').removeClass('selected');
    $('.space').each(function() {
        var nr = $(this).data('nr');
        var selected = ($('#word-' + nr).hasClass('selected') &&
                        $('#word-' + (nr-1)).hasClass('selected'));
        $(this).toggleClass('selected', selected);
    });
}

function is_selected(path, position) {
    if (Selected) {
        if (!position || position == Position) {
            return path.slice(0, Selected.length) == Selected;
        }
    }
    return false;
}

//////////////////////////////////////////////////////////////////////
// CLICK

function click_somewhere(lang, wordnr, pos) {
    var result = {};
    var clicked = Lins[lang][wordnr].node;
    var clicked_lin = restricted_lin(Lins[lang], clicked);
    var selected_clicked = clicked.slice(Selected.length);
    var selected_tree = getSubtree(Tree, Selected);
    var selected_lin = restricted_lin(Lins[lang], Selected);
    var choices = [];
    if (pos == ON ||
        pos == BEFORE && strLin(selected_lin.slice(0, clicked_lin.length)) == strLin(clicked_lin) ||
        pos == AFTER && strLin(selected_lin.slice(-clicked_lin.length)) == strLin(clicked_lin)) 
    {
        [replace_gftree, wrap_gftree, unwrap_gftree].forEach(function(treeoper){
            var newtrees = [];
            treeoper(selected_tree, selected_clicked).forEach(function(new_selected_tree_clicked){
                var new_selected_tree = new_selected_tree_clicked.tree;
                var new_selected_clicked = new_selected_tree_clicked.path;
                var new_clicked;
                if (Selected && new_selected_clicked)
                    new_clicked = Selected + new_selected_clicked;
                var new_tree = updateCopy(Tree, Selected, new_selected_tree);
                var new_lin = GRAMMARS[Grammar].concretes[lang].linearise(new_tree);
                var new_selected_lin = restricted_lin(new_lin, Selected);
                var old_selected_lin = restricted_lin(Lins[lang], Selected);
                var new_clicked_lin;
                var menu_item;
                if (pos == ON) {
                    new_clicked_lin = restricted_lin(new_lin, new_clicked);
                    if (mapwords(new_clicked_lin).join(" ") == mapwords(clicked_lin).join(" "))
                        return;
                    menu_item = mapwords(new_selected_lin);
                    if (!new_clicked) {
                        // TOOD: word removed...
                        // menu_item.push("&hellip;");
                    }
                } else if (new_clicked) {
                    var clicked_selected_words = new_selected_lin.map(function(token){
                        return startswith(token.node, new_clicked);
                    });
                    if (pos == AFTER)
                        clicked_selected_words.reverse();
                    var first_clicked_word = clicked_selected_words.indexOf(true);
                    if (first_clicked_word <= 0)
                        return;
                    if (pos == AFTER) {
                        new_clicked_lin = new_selected_lin.slice(-first_clicked_word);
                    } else {
                        new_clicked_lin = new_selected_lin.slice(0, first_clicked_word);
                    }
                    new_clicked = common_prefix(new_clicked_lin.map(function(token){
                        return token.node;
                    }));
                    new_clicked_lin = restricted_lin(new_lin, new_clicked);
                    menu_item = mapwords(new_clicked_lin);
                    if (pos == AFTER) {
                        menu_item.unshift("&hellip;");
                    } else {
                        menu_item.push("&hellip;");
                    }
                } else {
                    return;
                }
                if (!menu_item.length) {
                    menu_item = ["&empty;"]; // &ndash;
                }
                choices.push({
                    'new-tree': new_tree, 
                    'menu-item': menu_item
                    // 'new-clicked': new_clicked, 
                    // 'old-clicked': clicked,
                    // 'new-clicked-lin': new_clicked_lin, 
                    // 'new-selected-lin': new_selected_lin, 
                    // 'old-selected-lin': old_selected_lin
                });
            });
        });
    }
    return choices;
}

function restricted_lin(lin, focus) {
    if (!focus) 
        return [];
    return lin.filter(function(token){
        return startswith(token.node, focus);
    });
}

function common_prefix(sequences) {
    if (!sequences.length)
        return [];
    var minlen = Math.min.apply(this, sequences.map(function(seq){return seq.length}));
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

function mapwords(lin) {
    return lin.map(function(token){
        return token.word;
    });
}

// tree operations

function equal_typing(t1, t2) {
    return t1.abscat + ":" + t1.children == t2.abscat + ":" + t2.children;
}

function replace_gftree(tree, focus) {
    var result = [];
    var fun = tree.node;
    var funtypes = GRAMMARS[Grammar].abstract.types;
    var typing = funtypes[fun];
    for (var newfun in funtypes) {
        var newtyping = funtypes[newfun];
        if (fun != newfun && equal_typing(typing, newtyping)) {
            var newtree = new GFTree(newfun, null, tree.children);
            result.push({'tree': newtree, 
                         'path': focus});
        }
    }
    var focuschild;
    if (focus)
        focuschild = focus[0];
    for (var childnr = 0; childnr < tree.children.length; childnr++) {
        if (childnr != focuschild) {
            replace_gftree(tree.children[childnr], null)
                .forEach(function(newchildfocus){
                    var newchildren = (tree.children.slice(0, childnr)
                                       .concat([newchildfocus.tree])
                                       .concat(tree.children.slice(childnr + 1)));
                    var newtree = new GFTree(tree.node, null, newchildren);
                    result.push({'tree': newtree, 
                                 'path': focus});
                });
        }
    }
    return result;
}

function unwrap_gftree(tree, focus) {
    var result = [];
    if (focus) {
        var focuschild = focus[0];
        var funtypes = GRAMMARS[Grammar].abstract.types;
        var typing = funtypes[tree.node];
        var cat = typing.abscat;
        var args = typing.children;
        for (var childnr = 0; childnr < args.length; childnr++) {
            if (cat == args[childnr]) {
                var newfocus;
                if (childnr == focuschild) 
                    newfocus = focus.slice(1);
                result.push({'tree': tree.children[childnr], 
                             'path': newfocus});
            }
        }
    }
    return result;
}

function wrap_gftree(tree, focus) {
    var result = [];
    var funtypes = GRAMMARS[Grammar].abstract.types;
    var cat = funtypes[tree.node].abscat;
    for (var wrapper in funtypes) {
        var typing = funtypes[wrapper];
        var args = typing.children;
        if (cat == typing.abscat && args.length == 2 && (cat == args[0] || cat == args[1])) {
            var newcat = (args[0] == args[1] ? cat :
                          cat == args[1] ? args[0] : args[1]);
            generate_tree(newcat, 10, "")
                .forEach(function(newtree){
                    [[tree,newtree], [newtree,tree]].forEach(function(children,i){
                        if (cat == args[i])
                            result.push({'tree': new GFTree(wrapper, null, children), 
                                         'path': i.toString() + focus});
                    });
                });
        }
    }
    return result;
}

function generate_tree(cat, maxdepth, visited) {
    var result = [];
    if (maxdepth > 0) {
        var funtypes = GRAMMARS[Grammar].abstract.types;
        for (var fun in funtypes) {
            var typing = funtypes[fun];
            var re = new RegExp(' ' + fun + ' ');
            if (cat == typing.abscat && !re.test(visited)) {
                generate_children(typing.children, 0, maxdepth-1, visited + ' ' + fun + ' ')
                    .forEach(function(children){
                        result.push(new GFTree(fun, null, children));
                    });
            }
        }
    }
    return result;
}

function generate_children(args, childnr, maxdepth, visited) {
    var result = [];
    if (childnr >= args.length) {
        result.push([]);
        // } else if (childnr > 0) {
        // only generate a tree for the first child,
        // the other children become meta variables:
        // yield (None,) * (len(args) - 1)
    } else {
        generate_tree(args[childnr], maxdepth, visited)
            .forEach(function(child){
                // generate_children(grammar, args, maxdepth, visited, childnr+1)
                //     .forEach(function(children){
                //         result.push([child].concat(children));
                //     });
                // only the first child will get several choices,
                // the other children will only generate one tree:
                var all_children = generate_children(args, childnr+1, maxdepth, visited);
                if (all_children.length >= 1) {
                    result.push([child].concat(all_children[0]));
                }
            });
    }
    return result;
}


//////////////////////////////////////////////////////////////////////
// utilities

function alertError(title, description) {
    alert("*** " + title + "***\n" + description);
}

function strObject(obj) {
    if (obj == null) {
	    return "" + obj;
    } else if (obj instanceof Array) {
	    var result = obj.map(function(o){
	        return strObject(o);
	    });
	    return "[" + result.join(", ") + "]";
    } else if (obj instanceof Object) {
	    var result = [];
	    for (var key in obj) {
	        result.push(key + ": " + strObject(obj[key]));
	    }
	    return "{" + result.join(", ") + "}";
    } else if (typeof obj == "string") {
	    return '"' + obj + '"'
    } else {
	    return "" + obj;
    }
}

