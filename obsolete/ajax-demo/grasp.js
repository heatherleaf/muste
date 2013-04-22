
var AjaxURL = 'grasp.cgi';
var AjaxTimeout = 1000; // milliseconds

var LIN = 'LIN', BEFORE = 'BEFORE', ON = 'ON', AFTER = 'AFTER';

var Grammar;
var Tree;
var Lin;
var Focus;
var Position;
var ClickData;

$(function() {
    $.ajaxSetup({
        cache: false,
        async: false,
        timeout: AjaxTimeout,
    });
    initialize_grammars();
    select_grammar(DEFAULT_GRAMMAR);
});

function initialize_grammars() {
    var grammars = Object.keys(TREES);
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
    Grammar = gram;
    debug();
    debug("GRAMMAR:", strObject(Grammar));
    select_tree(parseTree(TREES[gram]));
    $('.grammar').removeClass('selected').attr('href', '#');
    $('#' + gram).addClass('selected').removeAttr('href');
}

function select_tree(tree) {
    $('#menu').empty().hide();
    Tree = tree;
    debug("TREE:", strTree(tree));
    Focus = null;
    input = {tree: strTree(Tree), grammar: Grammar};
    $.ajax({
        url: AjaxURL, 
        dataType: "json",
        data: input
    }).fail(function(jqxhr, status, error) {
        alertError(status, error);
    }).done(function(data) {
        ClickData = data;
        Lin = ClickData[LIN];
        $('#sentence').empty();
        for (var nr = 0; nr <= Lin.length; nr++) {
            var spaceelem = $('<a class="space">')
                .data('nr', nr)
                .html("&nbsp;")
                .appendTo($('#sentence'));
            if (ClickData[BEFORE][nr] || ClickData[AFTER][nr-1]) {
                spaceelem.attr('href', '#')
                    .click(click_space);
            }
            if (nr < Lin.length) {
                var wordelem = $('<a class="word">')
                    .attr('id', 'word-' + nr)
                    .data('nr', nr)
                    .data('path', Lin[nr][1])
                    .html(str_lin([Lin[nr]]))
                    .appendTo($('#sentence'));
                if (ClickData[ON][nr]) {
                    wordelem.attr('href', '#')
                        .click(click_word);
                }
            }
        }
    });
}

function click_word() {
    var nr = $(this).data('nr');
    var path = Lin[nr][1]; // $(this).data('path');
    var menus = ClickData[ON][nr];
    if (is_selected(path, ON)) 
        Focus = Focus.slice(0, -1);
    else
        Focus = path;
    Position = ON;
    while (Focus && !menus[Focus]) {
        Focus = Focus.slice(0, -1);
    }
    show_menu($(this), menus[Focus]);
}

function click_space() {
    var nr = $(this).data('nr');
    var path, menus;
    if (! (Focus && Position == BEFORE)) {
        if (nr > 0 && ClickData[AFTER][nr-1]) {
            path = Lin[nr-1][1];
            menus = ClickData[AFTER][nr-1];
            console.log("AFTER", path, menus);
            if (is_selected(path, AFTER))
                Focus = Focus.slice(0, -1);
            else
                Focus = path;
            Position = AFTER;
            while (Focus && !menus[Focus]) {
                Focus = Focus.slice(0, -1);
            }
        }
    }
    if (! (Focus && Position == AFTER)) {
        if (nr < Lin.length && ClickData[BEFORE][nr]) {
            path = Lin[nr][1];
            menus = ClickData[BEFORE][nr];
            console.log("BEFORE", path, menus);
            if (is_selected(path, BEFORE))
                Focus = Focus.slice(0, -1);
            else
                Focus = path;
            Position = BEFORE;
            while (Focus && !menus[Focus]) {
                Focus = Focus.slice(0, -1);
            }
        }
    }
    show_menu($(this), menus[Focus]);
}

function show_menu(clicked, menu) {
    select_focus();
    $('#menu').empty().hide();
    if (menu) {
        clicked.addClass('selected');
        menu.forEach(function(item, n) {
            var newlin = str_lin(item['new-context-lin']);
            if (!newlin)
                newlin = "--";
            $('<li>').append(
                $('<a href="#">')
                    .html(newlin)
                    .data('tree', item['new-tree'])
                    .click(click_tree)
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

function click_tree() {
    select_tree($(this).data('tree'));
}

function select_focus() {
    $('.word').each(function() {
        var wordpath = $(this).data('path');
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

function str_lin(lin) {
    var span = $('<span>');
    if (lin.length > 0) {
        lin.forEach(function(w){
            $('<span>').text(' ' + w[0])
                // .append($('<sub>').text(w[1]))
                .appendTo(span);
        });
    } else {
        span.html('&empty;');
    }
    return span;
}

function is_selected(path, position) {
    if (Focus) {
        if (!position || position == Position)
            return path.slice(0, Focus.length) == Focus;
    }
    return false;
}

function prettyJSON(obj) {
    if (isDictOrArrayDict(obj)) {
        var result = $('<ul>');
        var keys = Object.keys(obj);
        keys.sort();
        keys.forEach(function(key) {
            var li = $('<li>');
            if (!(obj instanceof Array))
                li.append($('<span>').text(key + ": "));
            li.append(prettyJSON(obj[key]));
            li.appendTo(result);
        });
        return result;
    } else {
        return $('<span>').text(strObject(obj));
    }
}

function isDictOrArrayDict(obj) {
    if (obj instanceof Array)
        return (obj.length > 0 && isDictOrArrayDict(obj[0]));
    else
        return (obj instanceof Object);
}

function isDict(obj) {
    return (obj instanceof Object) && !(obj instanceof Array);
}

//////////////////////////////////////////////////////////////////////
// utilities

function parseTree(descr) {
    var tokens = descr
        .replace(/(\*?)\( */g, " $1(")
        .replace(/\)/g, " ) ")
        .replace(/^ +| +$/g, "")
        .split(/ +/);
    var stack = [[]];
    tokens.forEach(function(token){
        if (token[0] == "(") {
            if (stack.length == 1 && stack[0].length > 0) {
                console.log("PARSE ERROR: Expected end-of-string, found '(': " + descr);
            } else if (token.length == 0) {
                console.log("PARSE ERROR: Expected node, found end-of-string: " + descr);
            } else {
                node = token.slice(1);
                stack.push([node]);
            }
        } else if (token == ")") {
            if (stack.length == 1) {
                var err = (stack[0].length == 0) ? "No matching open bracket" : "Expected end-of-string";
                console.log("PARSE ERROR: " + err + ", found ')': " + descr);
            } else {
                var tree = stack.pop();
                stack[stack.length-1].push(tree);
            }
        } else {
            console.log("PARSE ERROR: Unknown token " + token + ": " + descr);
        }
    });
    if (stack.length > 1) {
        console.log("PARSE ERROR: Expected close bracket, found end-of-string: " + descr);
    } else if (stack[0].length == 0) {
        console.log("PARSE ERROR: Expected open bracket, found end-of-string: " + descr);
    } else {
        return stack[0][0];
    }
}

function strTree(tree, focusnode, prefix, suffix, infix) {
    if (prefix == null) prefix = "*";
    if (suffix == null) suffix = "";
    if (infix == null) infix = "";
    var result = (focusnode === "" ? prefix : "");
    if (tree instanceof Array) {
        result += "(";
        tree.forEach(function(child, n) {
            if (n > 0) 
                result += infix;
	        var newnode = focusnode && focusnode[0] == n ? focusnode.slice(1) : null;
	        result += strTree(child, newnode, prefix, suffix);
        });
        result += ")";
    } else if (tree == null) {
        result += "?";
    } else {
        result += tree;
    }
    if (focusnode === "") 
	    result += suffix;
	return result;
}

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

function debug() {
    if (arguments.length > 0) {
        $('<p>')
            .text(Array.prototype.join.call(arguments, " "))
            .prependTo($('#debug'));
    } else {
        $('<hr>').prependTo($('#debug'));
    }
}

