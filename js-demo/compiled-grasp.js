var $__generatorWrap = function(generator) {
  return $traceurRuntime.addIterator({
    next: function(x) {
      switch (generator.GState) {
        case 1:
          throw new Error('"next" on executing generator');
        case 3:
          throw new Error('"next" on closed generator');
        case 0:
          if (x !== undefined) {
            throw new TypeError('Sent value to newborn generator');
          }
        case 2:
          generator.GState = 1;
          if (generator.moveNext(x, 0)) {
            generator.GState = 2;
            return {
              value: generator.current,
              done: false
            };
          }
          generator.GState = 3;
          return {
            value: generator.yieldReturn,
            done: true
          };
      }
    },
    'throw': function(x) {
      switch (generator.GState) {
        case 1:
          throw new Error('"throw" on executing generator');
        case 3:
          throw new Error('"throw" on closed generator');
        case 0:
          generator.GState = 3;
          throw x;
        case 2:
          generator.GState = 1;
          if (generator.moveNext(x, 1)) {
            generator.GState = 2;
            return {
              value: generator.current,
              done: false
            };
          }
          generator.GState = 3;
          return {
            value: generator.yieldReturn,
            done: true
          };
      }
    }
  });
};
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
    for (var $__0 = $traceurRuntime.getIterator(generate_subtrees(phrasetree, MAX_DEPTH)), $__1; !($__1 = $__0.next()).done;) {
      var sub = $__1.value;
      {
        var typ = fun2typing[sub[0]].abscat;
        var args = fun2typing[sub[0]].children;
        if (!(typ in subtrees)) subtrees[typ] = [];
        subtrees[typ].push(sub);
        ctr++;
      }
    }
    console.time("Generating phrases");
    var ctr = 0;
    var simphrases0 = [];
    for (var $__2 = $traceurRuntime.getIterator(generate_tree(phrasetyp, typing2funs, subtrees, MAX_DEPTH)), $__3; !($__3 = $__2.next()).done;) {
      var simphr = $__3.value;
      {
        if (phrasetree[0] != simphr[0]) {
          var dist = treedist(phrasetree, simphr);
          if (dist > 0) {
            if (!simphrases0[dist]) simphrases0[dist] = [];
            simphrases0[dist].push(simphr);
            ctr++;
          }
        }
      }
    }
    console.log("Found " + ctr + " trees");
    console.timeEnd("Generating phrases");
    console.time("Filter phrases");
    var ctr1 = 0, ctr2 = 0;
    var starttime = getTime();
    var simphrases = [];
    filterloop: for (var dist = 1; dist <= simphrases0.length; dist++) {
      simphrases[dist] = [];
      for (var $__6 = $traceurRuntime.getIterator(simphrases0[dist] || []), $__7; !($__7 = $__6.next()).done;) {
        var simphr = $__7.value;
        {
          dloop: for (var d = 1; d < dist; d++) {
            for (var $__4 = $traceurRuntime.getIterator(simphrases[d] || []), $__5; !($__5 = $__4.next()).done;) {
              var dp = $__5.value;
              {
                if (d + treedist(dp, simphr) <= dist) {
                  simphr = null;
                  ctr1++;
                  break dloop;
                }
              }
            }
          }
          if (simphr) {
            simphrases[dist].push(simphr);
            ctr2++;
          }
          if (getTime() - starttime > FILTER_TIMEOUT) {
            console.warn("=== TIMEOUT ===");
            break filterloop;
          }
        }
      }
    }
    console.log("Removed " + ctr1 + " trees, " + ctr2 + " remaining");
    console.timeEnd("Filter phrases");
    console.time("Create menu groups");
    var ctr = 0;
    var starttime = getTime();
    menuloop: for (var dist = 1; dist <= simphrases.length; dist++) {
      for (var $__10 = $traceurRuntime.getIterator(simphrases[dist] || []), $__11; !($__11 = $__10.next()).done;) {
        var simphrase = $__11.value;
        {
          for (var $__8 = $traceurRuntime.getIterator(instantiate_tree(typing2funs, simphrase)), $__9; !($__9 = $__8.next()).done;) {
            var instphrase = $__9.value;
            {
              if (phrasetree[0] == instphrase[0]) continue;
              var simtree = updateCopy(tree, phrasepath, instphrase);
              var simlin = grammar.linearise(simtree);
              var pleft = phraseleft;
              var pright = phraseright;
              var sleft = restrict_left(simlin, phrasepath);
              var sright = restrict_right(simlin, phrasepath);
              while (pleft < pright && sleft < sright && lin[pleft].word == simlin[sleft].word) {
                if (lin[pleft].path == clickedpath) break;
                pleft++;
                sleft++;
              }
              while (pleft <= pright && sleft <= sright && lin[pright].word == simlin[sright].word) {
                if (lin[pright].path == clickedpath) break;
                pright--;
                sright--;
              }
              var plin = hash(mapwords(lin.slice(pleft, pright + 1)));
              var slin = hash(mapwords(simlin.slice(sleft, sright + 1)));
              if (plin == slin) continue;
              var clickedword = false;
              for (var i = pleft; i <= pright; i++) {
                if (lin[i].path == clickedpath) {
                  clickedword = true;
                  break;
                }
              }
              if (!clickedword) continue;
              if (!menus[plin]) menus[plin] = {};
              var current = menus[plin][slin];
              if (current && current.dist <= dist) continue;
              menus[plin][slin] = {
                'dist': dist,
                'tree': simtree,
                'lin': simlin,
                'path': phrasepath,
                'pleft': pleft,
                'pright': pright,
                'sleft': sleft,
                'sright': sright
              };
              ctr++;
              if (getTime() - starttime > MENU_TIMEOUT) {
                console.warn("=== TIMEOUT ===");
                break menuloop;
              }
            }
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
  plins.sort(function(a, b) {
    return unhash(a).length - unhash(b).length;
  });
  for (var $__12 = $traceurRuntime.getIterator(plins), $__13; !($__13 = $__12.next()).done;) {
    var plin = $__13.value;
    {
      var menu = menus[plin];
      var slins = Object.keys(menu);
      slins.sort(function(a, b) {
        var ma = menu[a], mb = menu[b];
        return ma.dist - mb.dist || (ma.sright - ma.sleft) - (mb.sright - mb.sleft);
      });
      slins.splice(MENUS_PER_PHRASE * MAX_MENUSIZE);
      for (var n = 0; n < slins.length; n += MAX_MENUSIZE) {
        var shortmenu = [];
        for (var i = 0; i < MAX_MENUSIZE; i++) {
          if (n + i < slins.length) {
            shortmenu.push(menu[slins[n + i]]);
            ctr++;
          }
        }
        CurrentMenus.push(shortmenu);
      }
    }
  }
  console.log("Returning " + CurrentMenus.length + " menus, in total " + ctr + " menu items");
  console.timeEnd("Calculate menus");
}
function instantiate_tree(typing2funs, tree, notroot) {
  var $that = this;
  var $arguments = arguments;
  var $state = 38;
  var $storedException;
  var $finallyFallThrough;
  var $__10;
  var $__11;
  var $__12;
  var $__13;
  var $__8;
  var $__9;
  var args;
  var child;
  var children;
  var fun;
  var funs;
  var typ;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 38:
          if (isTree(tree)) {
            $state = 16;
            break;
          } else {
            $state = 37;
            break;
          }
        case 16:
          if (tree.length == 0) {
            $state = 0;
            break;
          } else {
            $state = 14;
            break;
          }
        case 0:
          this.current = [];
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 14:
          $__11 = $traceurRuntime.getIterator(instantiate_tree(typing2funs, tree[0], notroot));
          $state = 11;
          break;
        case 11:
          if (!($__10 = $__11.next()).done) {
            $state = 12;
            break;
          } else {
            $state = 3;
            break;
          }
        case 12:
          child = $__10.value;
          $state = 13;
          break;
        case 13:
          $__13 = $traceurRuntime.getIterator(instantiate_tree(typing2funs, tree.slice(1), true));
          $state = 7;
          break;
        case 7:
          if (!($__12 = $__13.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 11;
            break;
          }
        case 8:
          children = $__12.value;
          $state = 9;
          break;
        case 9:
          this.current = [child].concat(children);
          $state = 5;
          return true;
        case 5:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 7;
          break;
        case 37:
          if (ishash(tree)) {
            $state = 25;
            break;
          } else {
            $state = 33;
            break;
          }
        case 25:
          args = unhash(tree);
          $state = 26;
          break;
        case 26:
          typ = args.shift();
          $state = 28;
          break;
        case 28:
          funs = typing2funs[typ][hash(args)];
          $state = 30;
          break;
        case 30:
          if (notroot && args.length == 0) {
            funs = [funs[0]];
          }
          $state = 32;
          break;
        case 32:
          $__9 = $traceurRuntime.getIterator(funs);
          $state = 20;
          break;
        case 20:
          if (!($__8 = $__9.next()).done) {
            $state = 21;
            break;
          } else {
            $state = 3;
            break;
          }
        case 21:
          fun = $__8.value;
          $state = 22;
          break;
        case 22:
          this.current = fun;
          $state = 18;
          return true;
        case 18:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 20;
          break;
        case 33:
          this.current = tree;
          $state = 34;
          return true;
        case 34:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine: " + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}
function generate_subtrees(tree, maxdepth) {
  var $that = this;
  var $arguments = arguments;
  var $state = 16;
  var $storedException;
  var $finallyFallThrough;
  var $__10;
  var $__11;
  var $__8;
  var $__9;
  var child;
  var sub;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 16:
          if (isTree(tree) && maxdepth > 0) {
            $state = 0;
            break;
          } else {
            $state = 15;
            break;
          }
        case 0:
          this.current = tree;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          $__10 = $traceurRuntime.getIterator(tree.slice(1));
          $state = 11;
          break;
        case 11:
          if (!($__11 = $__10.next()).done) {
            $state = 12;
            break;
          } else {
            $state = 15;
            break;
          }
        case 12:
          child = $__11.value;
          $state = 13;
          break;
        case 13:
          $__8 = $traceurRuntime.getIterator(generate_subtrees(child, maxdepth - 1));
          $state = 7;
          break;
        case 7:
          if (!($__9 = $__8.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 11;
            break;
          }
        case 8:
          sub = $__9.value;
          $state = 9;
          break;
        case 9:
          this.current = sub;
          $state = 5;
          return true;
        case 5:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 7;
          break;
        case 15:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine: " + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}
function generate_tree(typ, typing2funs, subtrees, maxdepth) {
  var $that = this;
  var $arguments = arguments;
  var $state = 8;
  var $storedException;
  var $finallyFallThrough;
  var $__10;
  var $__11;
  var $__12;
  var $__13;
  var $__14;
  var $__15;
  var $__16;
  var $__17;
  var $__8;
  var $__9;
  var args;
  var argshash;
  var children;
  var fun;
  var funs;
  var sub;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 8:
          if (typ in subtrees) {
            $state = 6;
            break;
          } else {
            $state = 7;
            break;
          }
        case 6:
          $__11 = $traceurRuntime.getIterator(subtrees[typ]);
          $state = 3;
          break;
        case 3:
          if (!($__10 = $__11.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          sub = $__10.value;
          $state = 5;
          break;
        case 5:
          this.current = sub;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 7:
          if (maxdepth > 0) {
            $state = 35;
            break;
          } else {
            $state = 34;
            break;
          }
        case 35:
          $__14 = [];
          $state = 36;
          break;
        case 36:
          $__15 = typing2funs[typ] || {};
          $state = 38;
          break;
        case 38:
          for (var $__16 in $__15) $__14.push($__16);
          $state = 40;
          break;
        case 40:
          $__17 = 0;
          $state = 32;
          break;
        case 32:
          if ($__17 < $__14.length) {
            $state = 21;
            break;
          } else {
            $state = 34;
            break;
          }
        case 20:
          $__17++;
          $state = 32;
          break;
        case 21:
          argshash = $__14[$__17];
          $state = 22;
          break;
        case 22:
          if (!(argshash in $__15)) {
            $state = 20;
            break;
          } else {
            $state = 24;
            break;
          }
        case 24:
          funs = typing2funs[typ][argshash];
          $state = 27;
          break;
        case 27:
          args = unhash(argshash);
          $state = 29;
          break;
        case 29:
          if (funs.length > 1) {
            funs = [hash([typ].concat(args))];
          }
          $state = 31;
          break;
        case 31:
          $__12 = $traceurRuntime.getIterator(funs);
          $state = 16;
          break;
        case 16:
          if (!($__13 = $__12.next()).done) {
            $state = 17;
            break;
          } else {
            $state = 20;
            break;
          }
        case 17:
          fun = $__13.value;
          $state = 18;
          break;
        case 18:
          $__9 = $traceurRuntime.getIterator(generate_children(args, 0, typing2funs, subtrees, maxdepth - 1));
          $state = 12;
          break;
        case 12:
          if (!($__8 = $__9.next()).done) {
            $state = 13;
            break;
          } else {
            $state = 16;
            break;
          }
        case 13:
          children = $__8.value;
          $state = 14;
          break;
        case 14:
          this.current = [fun].concat(children);
          $state = 10;
          return true;
        case 10:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 12;
          break;
        case 34:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine: " + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}
function generate_children(args, i, typing2funs, subtrees, maxdepth) {
  var $that = this;
  var $arguments = arguments;
  var $state = 16;
  var $storedException;
  var $finallyFallThrough;
  var $__12;
  var $__13;
  var $__8;
  var $__9;
  var child;
  var children;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 16:
          if (i >= args.length) {
            $state = 0;
            break;
          } else {
            $state = 14;
            break;
          }
        case 0:
          this.current = [];
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 14:
          $__8 = $traceurRuntime.getIterator(generate_tree(args[i], typing2funs, subtrees, maxdepth));
          $state = 11;
          break;
        case 11:
          if (!($__9 = $__8.next()).done) {
            $state = 12;
            break;
          } else {
            $state = 3;
            break;
          }
        case 12:
          child = $__9.value;
          $state = 13;
          break;
        case 13:
          $__13 = $traceurRuntime.getIterator(generate_children(args, i + 1, typing2funs, subtrees, maxdepth));
          $state = 7;
          break;
        case 7:
          if (!($__12 = $__13.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 11;
            break;
          }
        case 8:
          children = $__12.value;
          $state = 9;
          break;
        case 9:
          this.current = [child].concat(children);
          $state = 5;
          return true;
        case 5:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 7;
          break;
        case 3:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine: " + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
}
function linearise_abstract(tree) {
  var lin = [];
  function lintree_(tree, path) {
    if (tree instanceof Array) {
      lin.push({
        'word': "(",
        'path': path
      });
      for (var i in tree) {
        lintree_(tree[i], i > 0 ? path + i: path);
      }
      lin.push({
        'word': ")",
        'path': path
      });
    } else {
      lin.push({
        'word': tree,
        'path': path
      });
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
    if (startswith(lin[i].path, path)) return i;
  }
}
function restrict_right(lin, path) {
  for (var i = lin.length - 1; i >= 0; i--) {
    if (startswith(lin[i].path, path)) return i;
  }
}
function mapwords(lin) {
  return lin.map(function(token) {
    return token.word;
  });
}
function treedist(t1, t2) {
  return levenshtein_distance(flatten(t1), flatten(t2));
}
function levenshtein_distance(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  var lev = [];
  var row = lev[0] = [];
  for (var j = 0; j <= len2; j++) {
    row[j] = j;
  }
  for (var i = 0; i <= len1; i++) {
    var row = lev[i] = [];
    row[0] = i;
    for (var j = 1; j <= len2; j++) {
      row[j] = 0;
    }
  }
  for (var i = 0; i < len1; i++) {
    for (var j = 0; j < len2; j++) {
      var c1 = s1[i];
      var c2 = s2[j];
      var a = lev[i][j + 1] + 1;
      var b = lev[i + 1][j] + 1;
      var c = lev[i][j] + (c1 != c2);
      lev[i + 1][j + 1] = Math.min(a, b, c);
    }
  }
  return lev[len1][len2];
}
