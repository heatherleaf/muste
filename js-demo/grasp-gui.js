
var CurrentPage = 0;
var CurrentTree;
var CurrentMenus;

var ABSTRACT = 'Abstract';
var CONCRETE = 'Concrete';
var STRIKED = 'striked';
var INACTIVE = 'inactive';
var HIGHLIGHTED = 'highlighted';

$(function() {
    initialize_grammar();
    $('body').click(function(){
        CurrentMenus = null;
        $('.word').removeClass(HIGHLIGHTED).removeClass(STRIKED);
        $('#menu').empty().hide();
    });
});

function initialize_grammar() {
    var fun2typing = Grammar.abstract.types;
    var typing2funs = Grammar.abstract.typing2funs = {};
    for (var fun in fun2typing) {
        var typ = fun2typing[fun].abscat;
        var hashargs = hash(fun2typing[fun].children);
        if (!typing2funs[typ]) typing2funs[typ] = {};
        if (!typing2funs[typ][hashargs]) typing2funs[typ][hashargs] = [];
        typing2funs[typ][hashargs].push(fun);
    }

    $('#languages').empty();
    $('#sentences').empty();

    var languages = Object.keys(Grammar.concretes);
    var prefix = common_prefix(languages);
    languages.push(ABSTRACT);
    Grammar.concretes[ABSTRACT] = {'abstract': Grammar.abstract, 'linearise': linearise_abstract};
    for each (var lang in languages) {
        var langtext = startswith(lang, prefix) ? lang.slice(prefix.length) : lang;
        $('<a href="#" class="language">')
            .html("&nbsp;" + langtext + "&nbsp;")
            .data(CONCRETE, lang)
            .click(toggle_language)
            .appendTo($('#languages'));
        $('<p id="' + lang + '">')
            .appendTo($('#sentences'));
    }
    $('.language').last().addClass(INACTIVE);
    showhide_languages();

    select_tree(parseGFTree(InitialTree));
}

function toggle_language(event) {
    event.stopPropagation();
    $(this).toggleClass(INACTIVE);
    showhide_languages();
}

function showhide_languages() {
    clear_selection();
    $('.language').each(function() {
        var inactive = $(this).hasClass(INACTIVE);
        var lang = $(this).data(CONCRETE);
        $('#' + lang).toggle(!inactive);
    });
}

window.onpopstate = function (event) {
    if (event.state) {
        console.log("POP state, page: " + strObject(event.state.page) + ", tree: " + strTree(event.state.tree));
        CurrentPage = event.state.page;
        set_and_show_tree(event.state.tree);
    }
}

function select_tree(tree) {
    CurrentPage++;
    history.pushState({'tree':tree, 'page':CurrentPage}, 
                      "GRASP, page " + CurrentPage, 
                      "?page=" + CurrentPage + "#");
    console.log("PUSH state, page: " + strObject(CurrentPage) + ", tree: " + strTree(tree));
    set_and_show_tree(tree);
}

function set_and_show_tree(tree) {
    CurrentTree = tree;
    clear_selection();
    $('.word').remove();
    $('.language').each(function(){
        var lang = $(this).data(CONCRETE);
        var lin = Grammar.concretes[lang].linearise(tree);
        for (var nr = 0; nr < lin.length; nr++) {
            var word = lin[nr].word;
            if (word == "&+") {
                // TODO: handle the token &+ in a good way
                continue;
            }
            var wordelem = $('<a class="word" href="#">')
                .data('nr', nr)
                .data('lang', lang)
                .data('path', lin[nr].path)
                .click(click_word)
                .appendTo($('#' + lang));
            var img = get_image(word);
            if (img) {
                word = '<img src="' + img + '">';
            }
            wordelem.html("&nbsp;" + word + "&nbsp;");
        }
    });
}

function get_image(word) {
    if (typeof(word) == "string" && word.slice(-4) == '.png')
        return ImagePath + word;
}

function clear_selection() {
    $('.word').removeClass(HIGHLIGHTED).removeClass(STRIKED);
    $('#menu').empty().hide();
}

function click_word(event) {
    event.stopPropagation();
    var clicked = $(this);
    var wordnr = clicked.data('nr');
    var lang = clicked.data('lang');
    if (!(clicked.hasClass(STRIKED))) {
        calculate_menus(Grammar.concretes[lang], CurrentTree, wordnr);
    }

    clear_selection();
    if (!(CurrentMenus && CurrentMenus.length > 0)) 
        return;

    var menu = CurrentMenus.shift();
    var pleft = menu[0].pleft, pright = menu[0].pright;
    var selectedpaths = {};
    $('.word').each(function() {
        var nr = $(this).data('nr');
        if ($(this).data('lang') == lang && pleft <= nr && nr <= pright) {
            $(this).addClass(STRIKED);
            var path = $(this).data('path')
            selectedpaths[path] = true;
        }
    });
    $('.word').each(function() {
        var path = $(this).data('path');
        if (selectedpaths[path]) {
            $(this).addClass(HIGHLIGHTED);
        }
    });

    for each (var item in menu) {
        // item = {dist, tree, lin, path, pleft, pright, sleft, sright};
        var menuitem = $('<a href="#">')
            .data('tree', item.tree)
            .click(function(){
                select_tree($(this).data('tree'));
            });
        if (item.sleft > item.sright) {
            menuitem.append($('<span>').html("&empty;")); // &ndash;
        } else {
            var words = mapwords(item.lin.slice(item.sleft, item.sright+1));
            for each (var w in words) {
                if (w == "&+") {
                    // TODO: handle the token &+ in a good way
                    continue;
                }
                var img = get_image(w);
                if (img) {
                    menuitem.append($('<img src="' + img + '">'));
                } else {
                    // if (!w) w = "&empty;"; // &ndash;
                    // if (w == '...') w = "&hellip;";
                    menuitem.append($('<span>').html(w));
                }
                menuitem.append(' ');
            }
        }
        $('<li>').append(menuitem).appendTo($('#menu'));
    }
    var pos = clicked.position();
    var xadd = (clicked.outerWidth() - $('#menu').outerWidth()) / 2;
    var yadd = clicked.outerHeight() * 2/3;
    $('#menu').css({
        top: (pos.top + yadd) + 'px',
        left: (pos.left + xadd) + 'px'
    }).show();
}

// Debugging

function toggle_abstract(abs) {
    if (abs == null) abs = !ABSTRACT;
    ABSTRACT = abs;
    $('#ABSTRACT').css('visibility', ABSTRACT ? 'visible' : 'hidden');
}
