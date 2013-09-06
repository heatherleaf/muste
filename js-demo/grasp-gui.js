
var CurrentPage = 0;
var CurrentTree;
var CurrentMenus;

var ABSTRACT = 'Abstract';
var CONCRETE = 'Concrete';
var STRIKED = 'striked';
var INACTIVE = 'inactive';
var HIGHLIGHTED = 'highlighted';

var BIND = "&+";

$(function() {
    initialize_grammar();
    $('body').click(function(){
        CurrentMenus = null;
        $('.word').removeClass(HIGHLIGHTED).removeClass(STRIKED);
        $('#menu').empty().hide();
    });
    $('#firefox-only').hide();
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
        $('<span class="language clickable">')
            .html("&nbsp;" + langtext + "&nbsp;")
            .data(CONCRETE, lang)
            .click(toggle_language)
            .appendTo($('#languages'));
        $('<p id="' + lang + '">')
            .appendTo($('#sentences'));
    }
    // Only the first 4 languages are shown by default:
    $('.language').slice(4).addClass(INACTIVE); 
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
        var words = map_images_and_spacing(mapwords(lin));
        for (var i = 0; i < words.length; i++) {
            var wordelem = $('<span class="word clickable">')
                .html(words[i])
                .data('nr', i)
                .data('lang', lang)
                .data('path', lin[i].path)
                .click(click_word)
                .appendTo($('#' + lang));
        }
    });
}

function map_images_and_spacing(words) {
    var newwords = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var img = get_image(word);
        if (img) {
            word = '<img src="' + img + '">';
        }
        // handling the special token BIND, and spacing before/after punctuation
        if (word == BIND) { 
            newwords[i] = "";
            continue;
        } 
        var prefix = "&nbsp;", suffix = "&nbsp;";
        var prev = words[i-1], next = words[i+1];
        if (prev == BIND || prev == '¿' || prev == '¡' ||
            word == '.' || word == '?' || word == '!') {
            prefix = "";
        } 
        if (next == BIND || word == '¿' || word == '¡' ||
            next == '.' || next == '?' ||  next == '!') {
            suffix = "";
        }
        newwords[i] = prefix + word + suffix;
    }
    return newwords;
}

function get_image(word) {
    if (typeof(word) == "string" && word.slice(-4) == '.png')
        return ImagePath + word;
}
// we need to define where images can be found, e.g.:
// var ImagePath = 'bliss_h78_transp_png/';

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
        var menuitem = $('<span class="clickable">')
            .data('tree', item.tree)
            .click(function(){
                select_tree($(this).data('tree'));
            });
        if (item.sleft > item.sright) {
            menuitem.append($('<span>').html("&empty;")); // &ndash;
        } else {
            var words = mapwords(item.lin.slice(item.sleft, item.sright+1));
            words = map_images_and_spacing(words);
            for each (var w in words) {
                // if (!w) w = "&empty;"; // &ndash;
                // if (w == '...') w = "&hellip;";
                menuitem.append($('<span>').html(w));
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
