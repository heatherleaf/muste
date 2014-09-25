
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
var INACTIVE = 'inactive';
var HIGHLIGHTED = 'highlighted';
var CORRECT = 'correct';
var MATCHING = 'matching';

var NOSPACING = "&+";
var PUNCTUATION = /^[\,\;\.\?\!\)]$/;
var PREFIXPUNCT = /^[¿¡\(]$/;


$(BUSY(function() {
    START_TIMER("initialize", true);
    initialize_grammar(Grammar);
    initialize_textspans();
    $('body').click(click_body);
    $('#internal-error').remove();
    STOP_TIMER("initialize");
}));


function click_body() {
    CurrentPath = CurrentSpan = CurrentLanguage = null;
    clear_selection();
}


function initialize_textspans() {
    $('#languages').empty();
    $('#sentences').empty();

    var prefix = common_prefix(Languages);
    if (IncludeAbstract) {
        Languages.push(ABSTRACT);
        Grammar.concretes[ABSTRACT] = {'abstract': Grammar.abstract, 'linearise': linearise_abstract};
    }

    $('<div id="dummy">')
        .appendTo($('#sentences'));
    for (var langix = 0; langix < Languages.length; langix++) {
        var lang = Languages[langix];
        var langtext = startswith(lang, prefix) ? lang.slice(prefix.length) : lang;
        $('<span class="language clickable">')
            .html("&nbsp;" + langtext + "&nbsp;")
            .data(CONCRETE, lang)
            .click(toggle_language)
            .appendTo($('#languages'));
        $('<div id="' + lang + '">')
            .appendTo($('#sentences'))
            .append($('<div class="regenerate clickable">')
                    .html('&#x25EF;') // LARGE CIRCLE
                    // .html('&#x27F2;') // ANTICLOCKWISE GAPPED CIRCLE ARROW (doesn't show on iPad)
                    .data(CONCRETE, lang)
                    .click(regenerate_tree))
            .append($('<p>'));

        if (!ConnectedTrees || langix == Languages.length-1) {
            var tree = Grammar.abstract.generate(StartCat);
            console.log(lang, "-->", strTree(tree));
            select_tree(lang, tree);
        }
    }
    // Only the first 3 languages are shown by default, and not the abstract:
    $('.language').slice(3).addClass(INACTIVE); 
    if (Languages[Languages.length-1] == ABSTRACT) {
        $('.language').last().addClass(INACTIVE);
    }
    showhide_languages();
}


function regenerate_tree() {
    var lang = $(this).data(CONCRETE);
    var tree = Grammar.abstract.generate(StartCat, null, null, function(f){
        return !startswith(f, "default_");
    });
    console.log(lang, "-->", strTree(tree));
    select_tree(lang, tree);
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
        CurrentPage = event.state.page;
        var trees = event.state.trees;
        for (var lang in trees) {
            set_and_show_tree(lang, trees[lang]);
        }
    }
}


function select_tree(lang, tree) {
    var trees = {};
    for (var i = 0; i < Languages.length; i++) {
        var l = Languages[i];
        if (ConnectedTrees || l == lang) {
            set_and_show_tree(l, tree);
        }
        trees[l] = CurrentTree[l];
    }
    if (!ConnectedTrees) {
        mark_correct_phrases();
    }
    CurrentPage++;
    history.pushState({'trees':trees, 'page':CurrentPage}, 
                      "GRASP, page " + CurrentPage, "?page=" + CurrentPage + "#");
}


function mark_correct_phrases() {
    RESET_TIMERS();
    START_TIMER("mark-correct");
    var reference_tree = CurrentTree[Languages[0]];
    var some_correct_tree = false;
    var correct_ref_paths = {};
    for (var i = 1; i < Languages.length; i++) {
        var other_tree = CurrentTree[Languages[i]];
        if (strTree(other_tree) == strTree(reference_tree)) {
            $('#' + Languages[i] + ' .word')
                .addClass(CORRECT);
            some_correct_tree = true;
        } else {
            var equals = equal_phrases(other_tree, reference_tree);
            $('#' + Languages[i] + ' .word')
                .each(function(){
                    var path = $(this).data('path');
                    var refpath = equals[path];
                    $(this).removeClass(CORRECT);
                    $(this).toggleClass(MATCHING, Boolean(refpath));
                    if (refpath) {
                        correct_ref_paths[refpath] = true;
                    }
                });
        }
    }
    if (some_correct_tree) {
        $('#' + Languages[0] + ' .word')
            .addClass(CORRECT);
    } else {
        $('#' + Languages[0] + ' .word')
            .each(function(){
                var refpath = $(this).data('path');
                var is_correct = Boolean(correct_ref_paths[refpath]);
                $(this).removeClass(CORRECT);
                $(this).toggleClass(MATCHING, is_correct);
            });
    }
    STOP_TIMER("mark-correct");
    LOG_TIMERS();
}


function set_and_show_tree(lang, tree) {
    clear_selection();
    var lin = Linearise(lang, tree);
    var sentence = map_words_and_spacing(lang, mapwords(lin), function(i, content){
        return $('<span class="word clickable">')
            .html(content)
            .data('nr', i)
            .data('lang', lang)
            .data('path', lin[i].path)
            .click(click_word);
    });
    $('#' + lang + ' p').empty().append(sentence);
    CurrentTree[lang] = tree;
    CurrentPath = CurrentSpan = CurrentLanguage = null;
    setTimeout(function(){
        RESET_TIMERS();
        CurrentMenus[lang] = initialize_menus(lang, tree);
        LOG_TIMERS();
    }, 0);
}


function map_words_to_html(words, callback) {
    var sentence = $('<div>');
    for (var i = 0; i < words.length; i++) {
        var previous = words[i-1], word = words[i], next = words[i+1];
        if (word == NOSPACING) continue;

        var prefix = " &nbsp;", suffix = "&nbsp; ";
        if (previous == NOSPACING || PREFIXPUNCT.test(previous) || PUNCTUATION.test(word)) 
            prefix = "";
        if (next == NOSPACING || PREFIXPUNCT.test(word) || PUNCTUATION.test(next)) 
            suffix = "";

        sentence.append(callback(i, prefix+word+suffix))
    }
    return sentence;
}


function map_words_to_images(metadata, words, callback) {
    var sentence = $('<div>');
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


function map_words_and_spacing(lang, words, callback) {
    if (typeof MapWordsToHTML == "object" && lang in MapWordsToHTML) {
        return MapWordsToHTML[lang](Metadata[lang], words, callback);
    } else {
        return map_words_to_html(words, callback);
    }
}


function clear_selection() {
    $('.word').removeClass(HIGHLIGHTED).removeClass(STRIKED);
    $('#menu').empty().hide();
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


function click_word(event) {
    event.stopPropagation();
    var clicked = $(this);
    var wordnr = clicked.data('nr');
    var wordlang = clicked.data('lang');
    var wordpath = clicked.data('path');
    if (wordlang !== CurrentLanguage) {
        CurrentLanguage = wordlang;
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
    (ConnectedTrees ? $('.word') : $('#' + CurrentLanguage + ' .word'))
        .each(function() {
            var path = $(this).data('path');
            if (selectedpaths[path]) {
                $(this).addClass(HIGHLIGHTED);
            }
        });

    for (var itemix = 0; itemix < menu.length; itemix++) {
        var item = menu[itemix];
        var menuitem = $('<span class="clickable">')
            .data('tree', item.tree)
            .click(function(){
                select_tree(CurrentLanguage, $(this).data('tree'));
            });
        if (item.lin.length == 0) {
            menuitem.append($('<span>').html("&empty;"));
        } else {
            var words = mapwords(item.lin);
            map_words_and_spacing(CurrentLanguage, words, function(i, content){
                return $('<span>').html(content);
            }).appendTo(menuitem);

        }
        $('<li>').append(menuitem).appendTo($('#menu'));
    }
    var pos = clicked.offset();
    var xadd = (clicked.outerWidth() - $('#menu').outerWidth()) / 2;
    var yadd = clicked.outerHeight() * 2/3;
    $('#menu').css({
        'top': (pos.top + yadd) + 'px',
        'left': (pos.left + xadd) + 'px',
        'max-height': (window.innerHeight - pos.top - yadd*2) + 'px'
    }).show();
}


// Debugging

function toggle_abstract(abs) {
    if (abs == null) abs = !ABSTRACT;
    ABSTRACT = abs;
    $('#ABSTRACT').css('visibility', ABSTRACT ? 'visible' : 'hidden');
}
