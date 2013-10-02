var CurrentPage = 0;
var CurrentTree;
var CurrentMenus;
var ABSTRACT = 'Abstract';
var CONCRETE = 'Concrete';
var STRIKED = 'striked';
var INACTIVE = 'inactive';
var HIGHLIGHTED = 'highlighted';
var NOSPACING = "&+";
$(function() {
  initialize_grammar();
  $('body').click(function() {
    CurrentMenus = null;
    $('.word').removeClass(HIGHLIGHTED).removeClass(STRIKED);
    $('#menu').empty().hide();
  });
  $('#unsupported-browser').remove();
  $('#internal-error').remove();
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
  Grammar.concretes[ABSTRACT] = {
    'abstract': Grammar.abstract,
    'linearise': linearise_abstract
  };
  for (var $__0 = $traceurRuntime.getIterator(languages), $__1; !($__1 = $__0.next()).done;) {
    var lang = $__1.value;
    {
      var langtext = startswith(lang, prefix) ? lang.slice(prefix.length): lang;
      $('<span class="language clickable">').html("&nbsp;" + langtext + "&nbsp;").data(CONCRETE, lang).click(toggle_language).appendTo($('#languages'));
      $('<p id="' + lang + '">').appendTo($('#sentences'));
    }
  }
  $('.language').slice(3).addClass(INACTIVE);
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
window.onpopstate = function(event) {
  if (event.state) {
    console.log("POP state, page: " + strObject(event.state.page) + ", tree: " + strTree(event.state.tree));
    CurrentPage = event.state.page;
    set_and_show_tree(event.state.tree);
  }
};
function select_tree(tree) {
  CurrentPage++;
  history.pushState({
    'tree': tree,
    'page': CurrentPage
  }, "GRASP, page " + CurrentPage, "?page=" + CurrentPage + "#");
  console.log("PUSH state, page: " + strObject(CurrentPage) + ", tree: " + strTree(tree));
  set_and_show_tree(tree);
}
function set_and_show_tree(tree) {
  CurrentTree = tree;
  clear_selection();
  $('.word').remove();
  $('.language').each(function() {
    var lang = $(this).data(CONCRETE);
    var lin = Grammar.concretes[lang].linearise(tree);
    var sentence = map_words_and_spacing(lang, mapwords(lin), function(i, content) {
      return $('<span class="word clickable">').html(content).data('nr', i).data('lang', lang).data('path', lin[i].path).click(click_word);
    });
    $('#' + lang).empty().append(sentence);
  });
}
function map_words_to_html(words, callback) {
  var sentence = $('<div>');
  for (var i = 0; i < words.length; i++) {
    var previous = words[i - 1], word = words[i], next = words[i + 1];
    if (word == NOSPACING) continue;
    var prefix = "&nbsp;", suffix = "&nbsp;";
    if (previous == NOSPACING || previous == '¿' || previous == '¡' || word == '.' || word == '?' || word == '!') prefix = "";
    if (next == NOSPACING || word == '¿' || word == '¡' || next == '.' || next == '?' || next == '!') suffix = "";
    sentence.append(callback(i, prefix + word + suffix));
  }
  return sentence;
}
function map_words_to_images(metadata, words, callback) {
  var sentence = $('<div>');
  var prefix, suffix;
  var indicator_elem = $('<span class="indicator">');
  var indicator_wdt = 0;
  for (var i = 0; i < words.length; i++) {
    var previous = words[i - 1], word = words[i], next = words[i + 1];
    if (word == NOSPACING) continue;
    var img = $('<img>').attr('src', metadata['images'][word]).attr('alt', word).attr('title', word);
    var wdt = metadata['widths'][word];
    if (word in metadata['indicators']) {
      if (!indicator_elem) {
        var indicator_elem = $('<span class="indicator">');
      }
      indicator_elem.append(callback(i, img));
      indicator_wdt += wdt;
    } else {
      if (previous != NOSPACING) sentence.append($('<span class="leftspace">').html('&nbsp;&nbsp;'));
      var left = (wdt - indicator_wdt) / 2;
      indicator_elem.attr('style', 'left:' + left);
      $('<span class="symbol">').append(indicator_elem).append(callback(i, img)).appendTo(sentence);
      if (next != NOSPACING && next != "question_mark" && next != "exclamation_mark") sentence.append($('<span class="rightspace">').html('&nbsp;&nbsp;'));
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
function click_word(event) {
  event.stopPropagation();
  var clicked = $(this);
  var wordnr = clicked.data('nr');
  var lang = clicked.data('lang');
  if (!(clicked.hasClass(STRIKED))) {
    calculate_menus(Grammar.concretes[lang], CurrentTree, wordnr);
  }
  clear_selection();
  if (!(CurrentMenus && CurrentMenus.length > 0)) return;
  var menu = CurrentMenus.shift();
  var pleft = menu[0].pleft, pright = menu[0].pright;
  var selectedpaths = {};
  $('.word').each(function() {
    var nr = $(this).data('nr');
    if ($(this).data('lang') == lang && pleft <= nr && nr <= pright) {
      $(this).addClass(STRIKED);
      var path = $(this).data('path');
      selectedpaths[path] = true;
    }
  });
  $('.word').each(function() {
    var path = $(this).data('path');
    if (selectedpaths[path]) {
      $(this).addClass(HIGHLIGHTED);
    }
  });
  for (var $__1 = $traceurRuntime.getIterator(menu), $__0; !($__0 = $__1.next()).done;) {
    var item = $__0.value;
    {
      var menuitem = $('<span class="clickable">').data('tree', item.tree).click(function() {
        select_tree($(this).data('tree'));
      });
      if (item.sleft > item.sright) {
        menuitem.append($('<span>').html("&empty;"));
      } else {
        var words = mapwords(item.lin.slice(item.sleft, item.sright + 1));
        map_words_and_spacing(lang, words, function(i, content) {
          return $('<span>').html(content);
        }).appendTo(menuitem);
      }
      $('<li>').append(menuitem).appendTo($('#menu'));
    }
  }
  var pos = clicked.offset();
  var xadd = (clicked.outerWidth() - $('#menu').outerWidth()) / 2;
  var yadd = clicked.outerHeight() * 2 / 3;
  $('#menu').css({
    top: (pos.top + yadd) + 'px',
    left: (pos.left + xadd) + 'px'
  }).show();
}
function toggle_abstract(abs) {
  if (abs == null) abs = !ABSTRACT;
  ABSTRACT = abs;
  $('#ABSTRACT').css('visibility', ABSTRACT ? 'visible': 'hidden');
}
