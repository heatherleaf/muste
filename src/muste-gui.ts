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


$(Utilities.BUSY(function() {
    Utilities.START_TIMER("initialize", true);
    initialize_gui();
    initialize_grammar(Grammar);
    Utilities.STOP_TIMER("initialize");
    regenerate_trees();
}));


function initialize_gui() : void {
    $('#body')
        .click(click_body);
    $('#mainmenu-toggler')
        .click(toggle_mainmenu);
    $('#restart-button')
        .click(Utilities.BUSY(restart));
    $('#connected')
        .click(Utilities.BUSY(toggle_connected));
    $('#debugging')
        .click(toggle_debug);

    var prefix : string = Utilities.common_prefix(Languages);

    ['L1', 'L2'].forEach(function(L, L_index) {
        Languages.forEach(function(lang, lang_index){
            $('#' + Utilities.join(L,'menu'))
                .append($('<input>',
                          {type: 'radio',
                           name: Utilities.join(L,'group'),
                           id: Utilities.join(L,lang),
                           value: lang,
                           checked: L_index == lang_index,
                           click: Utilities.BUSY(redraw_sentences)}))
                .append($('<label></label>',
                          {'for': Utilities.join(L,lang),
                           text: lang.slice(prefix.length)
                          }));
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


function trees_are_connected() : boolean {
    return $('#connected').prop('checked');
}

function toggle_connected() : void {
    console.log("CONNECTED");
    if (trees_are_connected()) {
        set_and_show_tree('L2', $('#L1').data('tree'));
    }
    mark_correct_phrases();
}

function toggle_mainmenu() : void {
    $('#mainmenu').toggle();
}

function current_language(L) : string {
    return $('#' + Utilities.join(L,'menu') + ' :checked').val();
}

function redraw_sentences() : void {
    set_and_show_tree('L1', $('#L1').data('tree'));
    set_and_show_tree('L2', $('#L2').data('tree'));
    mark_correct_phrases();
}

function click_body(event) : void {
    var prevented : boolean = $(event.target).closest('.prevent-body-click').length > 0;
    if (!prevented) {
        clear_selection();
    }
}

function restart() : void {
    var sure : boolean = true; // confirm("Are you sure you want to restart the game?");
    if (sure) {
        console.log("RESTART");
        regenerate_trees();
    }
}

function toggle_debug() : void {
    var debugging : boolean = $('#debugging').prop('checked');
    console.log("DEBUG", debugging);
    $('.debug').toggle(debugging);
}

function generate_random_tree() : GFTree {
    return Grammar.abs.generate(StartCat, null, null, function(f){
        return !startswith(f, "default_");
    });
}

function regenerate_trees() : void {
    Utilities.START_TIMER("regenerate_trees", true);
    if (trees_are_connected()) {
        var tree : GFTree = (typeof DefaultTree1 == "object") ? DefaultTree1 : generate_random_tree();
        set_and_show_tree('L1', tree);
        set_and_show_tree('L2', tree);
    } else {
        var tree1 : GFTree = (typeof DefaultTree1 == "object") ? DefaultTree1 : generate_random_tree();
        var tree2 : GFTree = (typeof DefaultTree2 == "object") ? DefaultTree2 : generate_random_tree();
        set_and_show_tree('L1', tree1);
        set_and_show_tree('L2', tree2);
    }
    $('#score').text(0);
    Utilities.STOP_TIMER("regenerate_trees");
    mark_correct_phrases();
}

function select_tree(data : {lang:string;tree:GFTree}) : void {
    if (trees_are_connected()) {
        set_and_show_tree('L1', data.tree);
        set_and_show_tree('L2', data.tree);
    } else {
        set_and_show_tree(data.lang, data.tree);
    }
    var score : JQuery = $('#score');
    score.text(parseInt(score.text()) + 1);
    mark_correct_phrases();
}

function mark_correct_phrases() : void {
    Utilities.START_TIMER("mark-correct", true);
    $('.' + CORRECT).removeClass(CORRECT);
    $('.' + MATCHING).removeClass(MATCHING);
    if (!trees_are_connected()) {
        var t1 : GFTree = $('#L1').data('tree');
        var t2 : GFTree = $('#L2').data('tree');
        if (t1.toString() == t2.toString()) {
            $('.L1-').addClass(CORRECT);
            $('.L2-').addClass(CORRECT);
        } else {
            var equals : {[L:string] : {[path:string] : string}}
                = equal_phrases('L1', t1, 'L2', t2);
            $('.phrase').each(function(){
                var L : string = $(this).data('lang');
                var path : string = $(this).data('path');
                var refpath : string = equals[L][path];
                $(this).toggleClass(MATCHING, Boolean(refpath));
            });
        }
    }
    Utilities.STOP_TIMER("mark-correct");
}

function set_and_show_tree(L : string, tree : GFTree) : void {
    clear_selection();
    var lang : string = current_language(L);
    console.log(L, "/", lang, "-->", tree.toString());
    var lin : LinToken[] = Linearise(lang, tree);
    var brackets : BracketedLin = bracketise(lin);
    var sentence : JQuery = map_words_and_spacing(lang, L, lin, brackets, click_word);
    $('#' + Utilities.join(L,'sentence')).empty().append(sentence);

    var abslin : LinToken[] = linearise_abstract(tree);
    $('#' + Utilities.join(L,'tree')).text(mapwords(abslin).join(" "));

    $('#' + L).data('tree', tree);
    var menus : {[phrase:string] : {[span:string] : MenuItem[]}} = initialize_menus(lang, tree);
    $('#' + L + ' .phrase').each(function(){
        // var data = $(this).data();
        $(this).data('menu', menus[$(this).data('path')]);
    });
}


function map_words_and_spacing(
    lang : string, L : string, lin : LinToken[], brackets : BracketedLin, handler : (c) => void
) : JQuery
{
    if (typeof MapWordsToHTML == "object" && lang in MapWordsToHTML) {
        return MapWordsToHTML[lang](Metadata[lang], mapwords(lin), handler);
    } else {
        return map_words_to_html(L, lin, brackets, handler);
    }
}


function map_words_to_html(
    L : string, lin : LinToken[], bracketed_lin : BracketedLin, handler : (c) => void
) : JQuery
{
    function bracket_html(n : number, brackets : BracketedLin) : JQuery {
        var path : string = brackets.path;
        var phrase : JQuery = $('<span class="phrase"></span>')
            .addClass(Utilities.join(L, path))
            .data({'path':path, 'start':n, 'lang':L});
        for (var i = 0; i < brackets.tokens.length; i++) {
            var tokn : (BracketedLin | BracketedToken) = brackets.tokens[i];
            if (tokn instanceof BracketedLin) {
                var subphrase = bracket_html(n, tokn)
                    .appendTo(phrase);
                n = subphrase.data('end');
            } else if (tokn instanceof BracketedToken) {
                if (tokn.word !== NOSPACING) {
                    var word : string = tokn.word;
                    if (n == 0) {
                        word = word.charAt(0).toUpperCase() + word.slice(1);
                    }
                    var debugpath : JQuery = $('<sub class="debug"></sub>').text(path)
                        .toggle($('#debugging').prop('checked'));
                    var w : JQuery = $('<span class="word"></span>')
                        .data({'nr':tokn.n, 'L':L, 'path':path})
                        .addClass(Utilities.join("W"+L, path))
                        .html(word)
                        .append(debugpath)
                        .appendTo(phrase);
                    if (handler) {
                        w.addClass('clickable').click(Utilities.BUSY(handler));
                    }
                    if (n !== tokn.n) console.log("ERROR:", n, tokn.n);
                    n = tokn.n + 1;
                }
            }
            if (i < brackets.tokens.length-1) {
                var previous : string = lin[n-1].word;
                var current : string = lin[n].word;
                if (!(previous == NOSPACING || current == NOSPACING ||
                      PREFIXPUNCT.test(previous) || PUNCTUATION.test(current)))
                {
                    // SPACING
                    var debugpath : JQuery = $('<sub class="debug"></sub>').text(path)
                        .toggle($('#debugging').prop('checked'));
                    var s : JQuery = $('<span class="space"></span>')
                        .data({'nr':n, 'L':L, 'path':path})
                        .addClass(Utilities.join("S"+L, path))
                        .html(' &nbsp; ')
                        .append(debugpath)
                        .appendTo(phrase);
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
        var previous = words[i-1], word = words[i], next = words[i+1];
        if (word == NOSPACING) continue;

        var imgsrc = metadata['images'][word];
        var img = (imgsrc ? $('<img>').attr('src', imgsrc).attr('alt', word).attr('title', word)
                   : $('<span>').attr('title', word).text(word));
        var wdt = metadata['widths'][word] || 40; // default width

        if (word in metadata['indicators']) {
            if (!indicator_elem) {
                var indicator_elem = $('<span class="indicator">');
            }
            indicator_elem.append(callback(i, img));
            indicator_wdt += wdt;
        } else {
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


function clear_selection() : void {
    $('.' + HIGHLIGHTED).removeClass(HIGHLIGHTED).removeData('span');
    $('.' + STRIKED).removeClass(STRIKED);
    $('#menu').empty().hide();
    $('#mainmenu').hide();
}


function next_span(
    wordnr : number, span? : [number,number], maxwidth? : number
) : [number,number]
{
    if (!span) return [wordnr, wordnr];
    var left = span[0], right = span[1];
    if (left > 0 && right > wordnr) {
        return [left-1, right-1];
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


function click_word(clicked0 : JQuery) : void {
    var clicked : JQuery = $(clicked0);
    var isspace : boolean = clicked.hasClass('space');
    var lang : string = clicked.data('L');
    var wordnr : number = clicked.data('nr');
    var wordpath : string = clicked.data('path');
    var maxwidth : number = $('#' + Utilities.join(lang,'sentence') + ' .word').length;
    var innermost_phrase : JQuery = $('.' + Utilities.join(lang, wordpath));

    var span : [number,number];
    var phrase : JQuery;
    if (clicked.hasClass(STRIKED)) {
        phrase = clicked.closest('.' + HIGHLIGHTED);
        if (phrase.length) {
            span = phrase.data('span');
        }
    }

    if (span) {
        isspace = false;
    } else {
        phrase = innermost_phrase;
        span = isspace ? [wordnr,wordnr-1] : next_span(wordnr);
    }

    clear_selection();
    var menu : MenuItem[];
    while (!(menu && menu.length)) {
        phrase = phrase.parent();
        if (!phrase.hasClass('phrase')) {
            phrase = innermost_phrase;
            if (isspace) return;
            span = next_span(wordnr, span, maxwidth);
            if (!span) return;
        }
        menu = phrase.data('menu');
        if (menu) menu = menu[span.join(":")];
        // if (menu) menu = menu[Utilities.hash(span)];
    }
    console.log('SPAN:', span[0] + '-' + span[1],
                'PATH:', phrase.data('path'),
                'MENU:', menu.length + ' items');

    phrase.addClass(HIGHLIGHTED)
        .data('span', span);
    if (isspace) {
        clicked.addClass(STRIKED);
    } else {
        phrase.find('.word')
            .filter(function(){
                var nr = $(this).data('nr');
                return span[0] <= nr && nr <= span[1];
            })
            .addClass(STRIKED);
        phrase.find('.space')
            .filter(function(){
                var nr = $(this).data('nr');
                return span[0] < nr && nr <= span[1];
            })
            .addClass(STRIKED);
    }

    for (var itemix = 0; itemix < menu.length; itemix++) {
        var item : MenuItem = menu[itemix];
        var menuitem : JQuery = $('<span class="clickable">')
            .data({'tree': item.tree, 'lang': lang})
            .click(Utilities.BUSY(function(c){
                select_tree($(c).data());
            }));
        if (item.lin.length == 0) {
            menuitem.append($('<span></span>').html("&empty;"));
        } else {
            var words : string = mapwords(item.lin).join(' ');
            $('<span></span>').text(words)
                .appendTo(menuitem);
        }
        // menuitem.append($('<small></small>').html(
        //     '&nbsp;' + item.pleft + "(" + item.sleft + "-" + item.sright + ")" + item.pright
        // ));
        $('<li>').append(menuitem).appendTo($('#menu'));
    }

    var top : number = clicked.offset().top + clicked.height() * 3/4;
    var striked : JQuery = $('.'+STRIKED);
    var left : number = (striked.offset().left + striked.last().offset().left +
                         striked.last().width() - $('#menu').width()) / 2;
    // var left = clicked.offset().top + (clicked.width() - $('#menu').width()) / 2;
    $('#menu').css({
        'top': top + 'px',
        'left': left + 'px',
        'max-height': (window.innerHeight - top - 6) + 'px'
    }).show();
}
