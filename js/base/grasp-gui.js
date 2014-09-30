
var Languages;

var ABSTRACT = 'Abstract';
var CONCRETE = 'Concrete';
var STRIKED = 'striked';
var HIGHLIGHTED = 'highlighted';
var CORRECT = 'correct';
var MATCHING = 'matching';

var NOSPACING = "&+";
var PUNCTUATION = /^[\,\;\.\?\!\)]$/;
var PREFIXPUNCT = /^[¿¡\(]$/;


$(BUSY(function() {
    START_TIMER("initialize", true);
    initialize_gui();
    initialize_grammar(Grammar);
    STOP_TIMER("initialize");
    regenerate_trees();
}));


function join() {
    return Array.prototype.slice.apply(arguments).join('-');
}

function split(s) {
    return s.split('-');
}


function initialize_gui() {
    $('#body')
        .click(click_body);
    $('#mainmenu-toggler')
        .click(toggle_mainmenu);
    $('#restart-button')
        .click(BUSY(restart));
    $('#connected')
        .click(BUSY(toggle_connected));
    $('#debugging')
        .click(toggle_debug);

    var prefix = common_prefix(Languages);

    ['L1', 'L2'].forEach(function(L, L_index) {
        Languages.forEach(function(lang, lang_index){
            $('#' + join(L,'menu'))
                .append($('<input>', 
                          {type: 'radio',
                           name: join(L,'group'),
                           id: join(L,lang), 
                           value: lang, 
                           checked: L_index == lang_index,
                           click: BUSY(redraw_sentences)}))
                .append($('<label></label>',
                          {'for': join(L,lang),
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
    return $('#' + join(L,'menu') + ' :checked').val();
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
    return Grammar.abstract.generate(StartCat, null, null, function(f){
        return !startswith(f, "default_");
    });
}

function regenerate_trees() {
    START_TIMER("regenerate_trees", true);
    if (trees_are_connected()) {
        var tree = generate_random_tree();
        set_and_show_tree('L1', tree);
        set_and_show_tree('L2', tree);
    } else {
        set_and_show_tree('L1', generate_random_tree());
        set_and_show_tree('L2', generate_random_tree());
    }
    $('#score').text(0);
    STOP_TIMER("regenerate_trees");
    mark_correct_phrases();
}

function select_tree(data) {
    if (trees_are_connected()) {
        set_and_show_tree('L1', data.tree);
        set_and_show_tree('L2', data.tree);
    } else {
        set_and_show_tree(data.lang, data.tree);
    }
    var score = $('#score');
    score.text(parseInt(score.text()) + 1);
    mark_correct_phrases();
}

function mark_correct_phrases() {
    START_TIMER("mark-correct", true);
    $('.' + CORRECT).removeClass(CORRECT);
    $('.' + MATCHING).removeClass(MATCHING);
    if (!trees_are_connected()) {
        var t1 = $('#L1').data('tree');
        var t2 = $('#L2').data('tree');
        if (strTree(t1) == strTree(t2)) {
            $('.L1-').addClass(CORRECT);
            $('.L2-').addClass(CORRECT);
        } else {
            var equals = equal_phrases('L1', t1, 'L2', t2);
            $('.phrase').each(function(){
                var L = $(this).data('lang');
                var path = $(this).data('path');
                var refpath = equals[L][path];
                $(this).toggleClass(MATCHING, Boolean(refpath));
            });
        }
    }
    STOP_TIMER("mark-correct");
}

function set_and_show_tree(L, tree) {
    clear_selection();
    var lang = current_language(L);
    console.log(L, "/", lang, "-->", strTree(tree));
    var lin = Linearise(lang, tree);
    var brackets = bracketise(lin);
    var sentence = map_words_and_spacing(lang, L, lin, brackets, click_word);
    $('#' + join(L,'sentence')).empty().append(sentence);

    var abslin = linearise_abstract(tree);
    $('#' + join(L,'tree')).text(mapwords(abslin).join(" "));

    $('#' + L).data('tree', tree);
    var menus = initialize_menus(lang, tree);
    $('#' + L + ' .phrase').each(function(){
        var data = $(this).data();
        $(this).data('menu', menus[$(this).data('path')]);
    });
}


function map_words_and_spacing(lang, L, lin, brackets, handler) {
    if (typeof MapWordsToHTML == "object" && lang in MapWordsToHTML) {
        return MapWordsToHTML[lang](Metadata[lang], words, callback);
    } else {
        return map_words_to_html(L, lin, brackets, handler);
    }
}


function map_words_to_html(L, lin, bracketed_lin, handler) {
    function bracket_html(n, brackets) {
        var path = brackets[0];
        var phrase = $('<span class="phrase"></span>')
            .addClass(join(L, path))
            .data({'path':path, 'start':n, 'lang':L});
        for (var i = 1; i < brackets.length; i++) {
            var tokn = brackets[i];
            if (tokn instanceof Array) {
                var subphrase = bracket_html(n, tokn)
                    .appendTo(phrase);
                n = subphrase.data('end');
            } else if (tokn.word !== NOSPACING) {
                var word = tokn.word;
                if (n == 0) {
                    word = word.charAt(0).toUpperCase() + word.slice(1);
                }
                var debugpath = $('<sub class="debug"></sub>').text(path)
                    .toggle($('#debugging').prop('checked'));
                var w = $('<span class="word"></span>')
                    .data({'nr':tokn.n, 'L':L, 'path':path})
                    .addClass(join("W"+L, path))
                    .html(word)
                    .append(debugpath)
                    .appendTo(phrase);
                if (handler) {
                    w.addClass('clickable').click(BUSY(handler));
                }
                if (n !== tokn.n) console.log("ERROR:", n, tokn.n);
                n = tokn.n + 1;
            }
            if (i < brackets.length-1) {
                var previous = lin[n-1].word, current = lin[n].word;
                if (!(previous == NOSPACING || current == NOSPACING || PREFIXPUNCT.test(previous) || PUNCTUATION.test(current))) {
                    // SPACING
                    $('<span class="space"></span>')
                        .data({'nr':n, 'L':L, 'path':path})
                        .html(' &nbsp; ')
                        .appendTo(phrase);
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


function clear_selection() {
    $('.' + HIGHLIGHTED).removeClass(HIGHLIGHTED).removeData('span');
    $('.' + STRIKED).removeClass(STRIKED);
    $('#menu').empty().hide();
    $('#mainmenu').hide();
}


function next_span(wordnr, span, maxwidth) {
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


function click_word(clicked) {
    var lang = clicked.data('L');
    var wordnr = clicked.data('nr');
    var wordpath = clicked.data('path');
    var maxwidth = $('#' + join(lang,'sentence') + ' .word').length;

    var span, highlighted;
    if (clicked.hasClass(STRIKED)) {
        highlighted = clicked.closest('.' + HIGHLIGHTED);
    } 
    if (highlighted && highlighted.length) {
        span = highlighted.data('span');
    } else {
        highlighted = $('.' + join(lang, wordpath));
        span = next_span(wordnr);
    }

    clear_selection();
    var phrase = highlighted;
    var menu;
    while (!(menu && menu.length)) {
        phrase = phrase.parent();
        if (!phrase.hasClass('phrase')) {
            phrase = highlighted;
            span = next_span(wordnr, span, maxwidth);
            if (!span) return;
        }
        menu = phrase.data('menu');
        if (menu) menu = menu[hash(span)];
    }

    phrase.addClass(HIGHLIGHTED)
        .data('span', span);
    $('#' + join(lang,'sentence') + ' .word')
        .filter(function(){
            var nr = $(this).data('nr');
            return span[0] <= nr && nr <= span[1];
        })
        .addClass(STRIKED);
    $('#' + join(lang,'sentence') + ' .space')
        .filter(function(){
            var nr = $(this).data('nr');
            return span[0] < nr && nr <= span[1];
        })
        .addClass(STRIKED);

    for (var itemix = 0; itemix < menu.length; itemix++) {
        var item = menu[itemix];
        var menuitem = $('<span class="clickable">')
            .data({'tree': item.tree, 'lang': lang})
            .click(BUSY(function(c){
                select_tree(c.data());
            }));
        if (item.lin.length == 0) {
            menuitem.append($('<span></span>').html("&empty;"));
        } else {
            var words = mapwords(item.lin).join(' ');
            $('<span></span>').text(words)
                .appendTo(menuitem);
        }
        $('<li>').append(menuitem).appendTo($('#menu'));
    }

    var top = clicked.offset().top + clicked.height() * 3/4;
    var striked = $('.'+STRIKED);
    var left = (striked.offset().left + striked.last().offset().left +
                striked.last().width() - $('#menu').width()) / 2;
    // var left = clicked.offset().top + (clicked.width() - $('#menu').width()) / 2;
    $('#menu').css({
        'top': top + 'px',
        'left': left + 'px',
        'max-height': (window.innerHeight - top - 6) + 'px'
    }).show();
}

