
var CurrentPage = 0;
var CurrentTree = {};
var CurrentMenus = {};
var CurrentPath;
var CurrentSpan;
var CurrentLanguage;

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
    redraw_sentences();
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
        set_and_show_tree('L2', CurrentTree['L1']);
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
    set_and_show_tree('L1', CurrentTree['L1']);
    set_and_show_tree('L2', CurrentTree['L2']);
}

function click_body(event) {
    var prevented = $(event.target).closest('.prevent-body-click').length > 0;
    if (!prevented) {
        CurrentPath = CurrentSpan = CurrentLanguage = null;
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
    console.log("DEBUG", debugging, $('.debug'));
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
    STOP_TIMER("regenerate_trees");
    mark_correct_phrases();
}

function select_tree(L, tree) {
    if (trees_are_connected()) {
        set_and_show_tree('L1', tree);
        set_and_show_tree('L2', tree);
    } else {
        set_and_show_tree(L, tree);
    }
    mark_correct_phrases();
}

function mark_correct_phrases() {
    START_TIMER("mark-correct", true);
    $('.word').removeClass(CORRECT).removeClass(MATCHING);
    if (!trees_are_connected()) {
        var t1 = CurrentTree['L1'];
        var t2 = CurrentTree['L2'];
        if (strTree(t1) == strTree(t2)) {
            $('.word').addClass(CORRECT);
        } else {
            var equals = equal_phrases(t1, t2);
            $('.word').each(function(){
                var path = $(this).data('path');
                var refpath = equals[path];
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
    var sentence = map_words_and_spacing(lang, L, lin, click_word);
// function(i, content){
//         return $('<span class="word clickable">')
//             .html(content)
//             .data('nr', i)
//             .data('L', L)
//             .data('path', lin[i].path)
//             .click(click_word);
//     });
    $('#' + join(L,'sentence')).empty().append(sentence);

    var abslin = linearise_abstract(tree);
    var absentence = map_words_and_spacing(null, L, abslin);
    // var absentence = map_words_and_spacing(null, mapwords(abslin), function(i, content){
    //     return $('<span class="word">')
    //         .html(content)
    //         .data('nr', i)
    //         .data('L', L)
    //         .data('path', abslin[i].path);
    // });
    $('#' + join(L,'tree')).empty().append(absentence);

    CurrentTree[L] = tree;
    CurrentPath = CurrentSpan = CurrentLanguage = null;
    // BUSY(function(){
    CurrentMenus[L] = initialize_menus(lang, tree);
    // })();
}


function map_words_and_spacing(lang, L, lin, handler) {
    if (typeof MapWordsToHTML == "object" && lang in MapWordsToHTML) {
        return MapWordsToHTML[lang](Metadata[lang], words, callback);
    } else {
        return map_words_to_html(L, lin, handler);
    }
}


function map_words_to_html(L, lin, handler) {
    var words = mapwords(lin);
    var sentence = $('<span></span>');
    for (var i = 0; i <= words.length; i++) {
        var previous = words[i-1], word = words[i], next = words[i+1];
        if (word == NOSPACING) continue;

        if (!(previous == NOSPACING || PREFIXPUNCT.test(previous) || PUNCTUATION.test(word))) {
            var path = (lin[i] || lin[i-1]).path;
            var w = $('<span class="word space"></span>')
                .data({'nr':i, 'L':L, 'path':path})
                .html(' &nbsp; ')
                .appendTo(sentence);
            if (handler) {
                w.addClass('clickable').click(BUSY(handler));
            }
        }

        if (word) {
            var path = lin[i].path;
            var w = $('<span class="word"></span>')
                .data({'nr':i, 'L':L, 'path':path})
                .html(word)
                .appendTo(sentence);
            if (handler) {
                w.addClass('clickable').click(BUSY(handler));
            }
            $('<sub class="debug"></sub>')
                .text(path)
                .appendTo(sentence);
        }
    }
    return sentence;
}


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
    $('.word').removeClass(HIGHLIGHTED).removeClass(STRIKED);
    $('.span').children().unwrap();
    $('#menu').empty().hide();
    $('#mainmenu').hide();
}


function next_span(wordnr, span) {
    if (!span) return [wordnr,wordnr];
    var left = span[0], right = span[1];
    var width = right - left;
    if (right <= wordnr) {
        left = wordnr;
        right = left + width + 1;
    } else {
        left--; right--;
    }
    if (left < 0) {
        return null;
    } else {
        return [left, right];
    }
}


function click_word(clicked) {
    // var clicked = $(event.target); // $(this);
    console.log("C", clicked);
    var wordnr = clicked.data('nr');
    var wordL = clicked.data('L');
    var wordpath = clicked.data('path');
    // console.log(wordnr, wordL, wordpath);
    if (wordL !== CurrentLanguage) {
        CurrentLanguage = wordL;
    }
    if (!(CurrentPath && startswith(wordpath, CurrentPath))) {
        CurrentPath = wordpath + "#";
    }
    if (!(CurrentSpan && CurrentSpan[0] <= wordnr && wordnr <= CurrentSpan[1])) {
        CurrentSpan = next_span(wordnr);
    }

    clear_selection();
    while (true) {
        if (!(CurrentPath && CurrentSpan)) {
            CurrentPath = CurrentSpan = CurrentLanguage = null;
            return;
        }
        CurrentPath = CurrentPath.slice(0, CurrentPath.length-1);
        var menu = CurrentMenus[CurrentLanguage][CurrentPath];
        if (menu) menu = menu[hash(CurrentSpan)];
        if (menu && menu.length > 0) break;
        if (!CurrentPath) {
            CurrentPath = wordpath + "#";
            CurrentSpan = next_span(wordnr, CurrentSpan);
        }
    }

    var selectedpaths = {};

    $('#' + CurrentLanguage + ' .word')
        .each(function() {
            var nr = $(this).data('nr');
            if (CurrentSpan[0] <= nr && nr <= CurrentSpan[1]) {
                $(this).addClass(STRIKED);
                var path = $(this).data('path')
                selectedpaths[path] = true;
            }
        });

    $('.highlighted').children().unwrap();
    $('#' + join(CurrentLanguage,'sentence') + ' .word')
        .filter(function(){
            var nr = $(this).data('nr');
            return CurrentSpan[0] <= nr && nr <= CurrentSpan[1];
        })
        .wrapAll('<span class="highlighted"></span>');


    // (trees_are_connected() ? $('.word') : $('#' + CurrentLanguage + ' .word'))
    //     .each(function() {
    //         var path = $(this).data('path');
    //         if (selectedpaths[path]) {
    //             $(this).addClass(HIGHLIGHTED);
    //         }
    //     });

    for (var itemix = 0; itemix < menu.length; itemix++) {
        var item = menu[itemix];
        var menuitem = $('<span class="clickable">')
            .data('tree', item.tree)
            .click(BUSY(function(c){
                select_tree(CurrentLanguage, c.data('tree'));
            }));
        if (item.lin.length == 0) {
            menuitem.append($('<span>').html("&empty;"));
        } else {
            // var words = mapwords(item.lin);
            map_words_and_spacing(null, CurrentLanguage, item.lin)
            // map_words_and_spacing(CurrentLanguage, words, function(i, content){
            //     return $('<span>').html(content);
            // })
                    .appendTo(menuitem);

        }
        $('<li>').append(menuitem).appendTo($('#menu'));
    }
    var pos = clicked.offset();
    var xadd = (clicked.outerWidth() - $('#menu').outerWidth()) / 2;
    var yadd = clicked.outerHeight() * 3/4;
    $('#menu').css({
        'top': (pos.top + yadd) + 'px',
        'left': (pos.left + xadd) + 'px',
        'max-height': (window.innerHeight - pos.top - yadd*2) + 'px'
    }).show();
}

