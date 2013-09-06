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
function GFGrammar(abstract, concretes) {
  this.abstract = abstract;
  this.concretes = concretes;
  for (var cnc in concretes) {
    this.concretes[cnc].abstract = abstract;
  }
}
function GFAbstract(startcat, types) {
  this.startcat = startcat;
  this.types = types;
}
function GFConcrete(flags, productions, functions, sequences, categories, nr_cats) {
  this.abstract = undefined;
  this.flags = flags;
  this.productions = {};
  for (var i in productions) this.productions[mkCat(i)] = productions[i];
  this.functions = {};
  for (var i = 0; i < functions.length; i++) this.functions[mkFun(i)] = functions[i];
  this.sequences = {};
  for (var i = 0; i < sequences.length; i++) this.sequences[mkSeq(i)] = sequences[i];
  this.categories = {};
  this.inversecats = {};
  for (var abscat in categories) {
    this.categories[abscat] = [];
    for (var i = categories[abscat].s; i <= categories[abscat].e; i++) {
      this.categories[abscat].push(mkCat(i));
      this.inversecats[mkCat(i)] = abscat;
    }
  }
  this.nr_cats = nr_cats;
  this.coercions = {};
  this.lincats = {};
  this.linfuns = {};
  this.max_arity = 1;
  for (var cat in this.productions) {
    setdefault(this.coercions, cat, []).push(cat);
    var prods = this.productions[cat];
    for (var i = 0; i < prods.length; i++) {
      var prod = prods[i];
      if (prod instanceof Coerce) {
        setdefault(this.coercions, prod.cat, []).push(cat);
      } else {
        var cncfun = this.functions[prod.fun];
        var lf = setdefault(this.linfuns, cncfun.absfun, {});
        var children = [];
        for (var j = 0; j < prod.children.length; j++) children.push(prod.children[j].parg);
        setdefault(lf, children, []).push({
          fun: prod.fun,
          cat: cat,
          seqs: cncfun.seqs
        });
        var arity = cncfun.seqs.length;
        setdefault(this.lincats, cat, arity);
        if (this.lincats[cat] != arity) alert("Mismatching linfun arities for cat: " + cat);
        if (arity > this.max_arity) this.max_arity = arity;
      }
    }
  }
}
GFAbstract.prototype.typecheck = function(tree, ntype) {
  var ftype = this.types[tree[0]];
  if (!ftype) throw (new TypeError("Function not found: " + tree[0]));
  if (ntype && ntype != ftype.abscat) throw (new TypeError("Function type mismatch: " + tree[0] + ":" + ntype + " (should be " + ftype.abscat + ")"));
  if (ftype.children.length != tree.length - 1) throw (new TypeError("Children mismatch: " + tree[0] + " has " + (tree.length - 1) + " children (should be " + ftype.children.length + ")"));
  for (var i = 1; i < tree.length; i++) this.typecheck(tree.children[i], ftype.children[i - 1]);
};
GFGrammar.prototype.linearise = function(language, tree) {
  return this.concretes[language].linearise(tree);
};
GFConcrete.prototype.linearise = function(tree) {
  for (var $__0 = $traceurRuntime.getIterator(_linearise_nondet(this, tree, "")), $__1; !($__1 = $__0.next()).done;) {
    var catlin = $__1.value;
    {
      return _expand_tokens(catlin.lin[0]);
    }
  }
};
function _expand_tokens(lin) {
  if (!(lin instanceof Array)) {
    throw TypeError("Linearisation must be Array: " + strObject(lin));
  } else if (lin.length == 0) {
    return lin;
  } else if (lin[0].arg) {
    var newlin = [];
    for (var i = lin.length - 1; i >= 0; i--) {
      var path = lin[i].path;
      var arg = lin[i].arg;
      var tokens = arg.tokens;
      if (arg.alts && newlin.length) {
        altloop: for (var $__2 = $traceurRuntime.getIterator(arg.alts), $__3; !($__3 = $__2.next()).done;) {
          var alt = $__3.value;
          {
            for (var $__1 = $traceurRuntime.getIterator(alt.follows), $__0; !($__0 = $__1.next()).done;) {
              var prefix = $__0.value;
              {
                if (startswith(newlin[0].word, prefix)) {
                  tokens = alt.tokens;
                  break altloop;
                }
              }
            }
          }
        }
      }
      for (var j = tokens.length - 1; j >= 0; j--) {
        newlin.push({
          'word': tokens[j],
          'path': path
        });
      }
    }
    return newlin.reverse();
  } else {
    lin.map(function(sublin) {
      return _expand_tokens(sublin);
    });
  }
}
function _linearise_nondet(concrete, tree, path) {
  var $that = this;
  var $arguments = arguments;
  var $state = 35;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var $__10;
  var $__11;
  var $__2;
  var $__3;
  var $__4;
  var $__5;
  var $__6;
  var $__7;
  var $__8;
  var $__9;
  var arg;
  var arity;
  var cat;
  var children;
  var childtype;
  var fcs;
  var k;
  var lin;
  var linfuns;
  var phrase;
  var seq;
  var seqnr;
  var token;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 35:
          if (tree instanceof Array) {
            $state = 16;
            break;
          } else {
            $state = 34;
            break;
          }
        case 16:
          linfuns = concrete.linfuns[tree[0]];
          $state = 17;
          break;
        case 17:
          $__8 = $traceurRuntime.getIterator(_linearise_children_nondet(concrete, tree, 1, path));
          $state = 11;
          break;
        case 11:
          if (!($__9 = $__8.next()).done) {
            $state = 12;
            break;
          } else {
            $state = 15;
            break;
          }
        case 12:
          children = $__9.value;
          $state = 13;
          break;
        case 13:
          $__6 = $traceurRuntime.getIterator(linfuns[children.cats] || []);
          $state = 3;
          break;
        case 3:
          if (!($__7 = $__6.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 11;
            break;
          }
        case 8:
          fcs = $__7.value;
          $state = 9;
          break;
        case 9:
          lin = [];
          $state = 5;
          break;
        case 5:
          for ($__4 = $traceurRuntime.getIterator(fcs.seqs); !($__5 = $__4.next()).done;) {
            seqnr = $__5.value;
            {
              phrase = [];
              seq = concrete.sequences[seqnr];
              for ($__0 = $traceurRuntime.getIterator(seq); !($__1 = $__0.next()).done;) {
                arg = $__1.value;
                {
                  if (arg instanceof SymCat) {
                    for ($__3 = $traceurRuntime.getIterator(children.lins[arg.arg][arg.param]); !($__2 = $__3.next()).done;) {
                      token = $__2.value;
                      {
                        phrase.push(token);
                      }
                    }
                  } else {
                    phrase.push({
                      'arg': arg,
                      'path': path
                    });
                  }
                }
              }
              lin.push(phrase);
            }
          }
          $state = 7;
          break;
        case 7:
          this.current = {
            'cat': fcs.cat,
            'lin': lin
          };
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 34:
          if (startswith(tree, "?")) {
            $state = 32;
            break;
          } else {
            $state = 15;
            break;
          }
        case 32:
          childtype = tree.slice(1);
          $state = 33;
          break;
        case 33:
          $__10 = $traceurRuntime.getIterator(concrete.categories[childtype]);
          $state = 21;
          break;
        case 21:
          if (!($__11 = $__10.next()).done) {
            $state = 28;
            break;
          } else {
            $state = 15;
            break;
          }
        case 28:
          cat = $__11.value;
          $state = 29;
          break;
        case 29:
          arity = concrete.lincats[cat];
          $state = 23;
          break;
        case 23:
          lin = [];
          $state = 25;
          break;
        case 25:
          for (k = 0; k < arity; k++) {
            lin.push([{
              'word': "[" + tree + "]",
              'path': path + i
            }]);
          }
          $state = 27;
          break;
        case 27:
          this.current = {
            'cat': cat,
            'lin': lin
          };
          $state = 19;
          return true;
        case 19:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 21;
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
function _linearise_children_nondet(concrete, tree, i, path) {
  var $that = this;
  var $arguments = arguments;
  var $state = 24;
  var $storedException;
  var $finallyFallThrough;
  var $__10;
  var $__11;
  var $__6;
  var $__7;
  var $__8;
  var $__9;
  var cats;
  var child;
  var children;
  var cocats;
  var lins;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 24:
          if (i >= tree.length) {
            $state = 0;
            break;
          } else {
            $state = 22;
            break;
          }
        case 0:
          this.current = {
            'cats': [],
            'lins': []
          };
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 22:
          $__7 = $traceurRuntime.getIterator(_linearise_nondet(concrete, tree[i], path + i));
          $state = 19;
          break;
        case 19:
          if (!($__6 = $__7.next()).done) {
            $state = 20;
            break;
          } else {
            $state = 3;
            break;
          }
        case 20:
          child = $__6.value;
          $state = 21;
          break;
        case 21:
          $__9 = $traceurRuntime.getIterator(_linearise_children_nondet(concrete, tree, i + 1, path));
          $state = 11;
          break;
        case 11:
          if (!($__8 = $__9.next()).done) {
            $state = 16;
            break;
          } else {
            $state = 19;
            break;
          }
        case 16:
          children = $__8.value;
          $state = 17;
          break;
        case 17:
          lins = [child.lin].concat(children.lins);
          $state = 13;
          break;
        case 13:
          cats = [child.cat].concat(children.cats);
          $state = 15;
          break;
        case 15:
          $__11 = $traceurRuntime.getIterator(_coerce_cats(concrete, cats, 0));
          $state = 7;
          break;
        case 7:
          if (!($__10 = $__11.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 11;
            break;
          }
        case 8:
          cocats = $__10.value;
          $state = 9;
          break;
        case 9:
          this.current = {
            'cats': cocats,
            'lins': lins
          };
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
function _coerce_cats(concrete, cats, i) {
  var $that = this;
  var $arguments = arguments;
  var $state = 16;
  var $storedException;
  var $finallyFallThrough;
  var $__6;
  var $__7;
  var $__8;
  var $__9;
  var cocat;
  var cocats;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 16:
          if (i >= cats.length) {
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
          $__8 = $traceurRuntime.getIterator(concrete.coercions[cats[i]]);
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
          cocat = $__9.value;
          $state = 13;
          break;
        case 13:
          $__6 = $traceurRuntime.getIterator(_coerce_cats(concrete, cats, i + 1));
          $state = 7;
          break;
        case 7:
          if (!($__7 = $__6.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 11;
            break;
          }
        case 8:
          cocats = $__7.value;
          $state = 9;
          break;
        case 9:
          this.current = [cocat].concat(cocats);
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
function _linearise_child_nondet(concrete, tree, i, path) {
  var $that = this;
  var $arguments = arguments;
  var $state = 27;
  var $storedException;
  var $finallyFallThrough;
  var $__6;
  var $__7;
  var $__8;
  var $__9;
  var arity;
  var cat;
  var child;
  var childtype;
  var k;
  var lin;
  var result;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 27:
          child = tree[i];
          $state = 28;
          break;
        case 28:
          if (!child || startswith(child, "?")) {
            $state = 14;
            break;
          } else {
            $state = 24;
            break;
          }
        case 14:
          childtype = concrete.abstract.types[tree[0]].children[i - 1];
          $state = 15;
          break;
        case 15:
          if (!child) {
            child = "?" + childtype;
          }
          $state = 17;
          break;
        case 17:
          $__9 = $traceurRuntime.getIterator(concrete.categories[childtype]);
          $state = 3;
          break;
        case 3:
          if (!($__8 = $__9.next()).done) {
            $state = 10;
            break;
          } else {
            $state = 13;
            break;
          }
        case 10:
          cat = $__8.value;
          $state = 11;
          break;
        case 11:
          arity = concrete.lincats[cat];
          $state = 5;
          break;
        case 5:
          lin = [];
          $state = 7;
          break;
        case 7:
          for (k = 0; k < arity; k++) {
            lin.push([{
              'word': "[" + child + "]",
              'path': path + i
            }]);
          }
          $state = 9;
          break;
        case 9:
          this.current = {
            'cat': cat,
            'lin': lin
          };
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 24:
          $__7 = $traceurRuntime.getIterator(_linearise_nondet(concrete, tree[i], path + i));
          $state = 21;
          break;
        case 21:
          if (!($__6 = $__7.next()).done) {
            $state = 22;
            break;
          } else {
            $state = 13;
            break;
          }
        case 22:
          result = $__6.value;
          $state = 23;
          break;
        case 23:
          this.current = result;
          $state = 19;
          return true;
        case 19:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 21;
          break;
        case 13:
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
function strLin(lin, focus, prefix, suffix) {
  if (prefix == null) prefix = "*";
  if (suffix == null) suffix = prefix;
  return lin.map(function(w) {
    if (startswith(w.path, focus)) {
      return prefix + w.word + "/" + w.path + suffix;
    } else {
      return w.word + "/" + w.path;
    }
  }).join(" ");
}
function GFTree(node, children) {
  if (children) {
    return [node].concat(children);
  } else {
    return [node];
  }
}
function strTree(tree, focuspath, prefix, suffix) {
  if (prefix == null) prefix = "*";
  if (suffix == null) suffix = prefix;
  var result;
  if (tree instanceof Array) {
    result = tree.map(function(child, n) {
      var newpath = focuspath && focuspath[0] == n ? focuspath.slice(1): null;
      return strTree(child, newpath, prefix, suffix);
    });
    result = "(" + result.join(" ") + ")";
  } else if (tree == null) {
    result = "?";
  } else {
    result = "" + tree;
  }
  if (focuspath === "") return prefix + result + suffix; else return result;
}
function copyTree(tree) {
  if (tree instanceof Array) {
    return tree.map(copyTree);
  } else {
    return tree;
  }
}
function getSubtree(tree, path) {
  var subtree = tree;
  for (var i = 0; i < path.length; i++) {
    var n = path[i];
    subtree = subtree[n];
    if (!subtree) return;
  }
  return subtree;
}
;
function updateSubtree(tree, path, update) {
  var n = path[path.length - 1];
  path = path.slice(0, - 1);
  var parent = getSubtree(tree, path);
  if (update instanceof Function) {
    parent[n] = update(parent[n]);
  } else {
    parent[n] = update;
  }
}
function updateCopy(tree, path, update) {
  if (path.length > 0) {
    var newtree = copyTree(tree);
    updateSubtree(newtree, path, update);
    return newtree;
  } else if (update instanceof Function) {
    return update(parent[n]);
  } else {
    return update;
  }
}
function parseGFTree(descr) {
  return parseFocusedGFTree(descr).tree;
}
function parseFocusedGFTree(descr) {
  var tokens = descr.replace(/(\*?)\( */g, " $1(").replace(/\)/g, " ) ").replace(/^ +| +$/g, "").split(/ +/);
  var focus = null;
  var stack = [[]];
  tokens.forEach(function(token) {
    if (token[0] == "*") {
      focus = stack.map(function(t) {
        return t.length;
      }).join("").slice(1);
      token = token.slice(1);
    }
    if (token[0] == "(") {
      if (stack.length == 1 && stack[0].length > 0) {
        console.log("PARSE ERROR: Expected end-of-string, found '(': " + descr);
      } else if (token.length <= 1) {
        console.log("PARSE ERROR: Expected node, found end-of-string: " + descr);
      } else {
        node = token.slice(1);
        stack.push(GFTree(node));
      }
    } else if (token == ")") {
      if (stack.length == 1) {
        var err = (stack[0].children.length == 0) ? "No matching open bracket": "Expected end-of-string";
        console.log("PARSE ERROR: " + err + ", found ')': " + descr);
      } else {
        var tree = stack.pop();
        stack[stack.length - 1].push(tree);
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
    return {
      tree: stack[0][0],
      focus: focus
    };
  }
}
function productlist(pools) {
  var results = [[]];
  foreach(pools, function(pool) {
    var oldresults = results;
    results = [];
    foreach(oldresults, function(oldres) {
      foreach(pool, function(k) {
        results.push(oldres.concat(k));
      });
    });
  });
  return results;
}
function setdefault(dict, key, defval) {
  if (dict[key] == null) dict[key] = defval;
  return dict[key];
}
function foreach(sequence, fun) {
  if (sequence != null) {
    for (var i = 0; i < sequence.length; i++) {
      fun(sequence[i], i, sequence);
    }
  }
}
function startswith(str, prefix) {
  if (typeof str == "string" && typeof prefix == "string") return str.slice(0, prefix.length) == prefix;
}
function commonPrefix(s1, s2) {
  var len = Math.min(s1.length, s2.length);
  for (var i = 0; i < len; i++) {
    if (s1[i] !== s2[i]) return s1.slice(0, i);
  }
  return s1.slice(0, len);
}
function mkFun(i) {
  return "F" + i;
}
function mkCat(i) {
  return "C" + i;
}
function mkSeq(i) {
  return "S" + i;
}
function Type(children, abscat) {
  this.children = children;
  this.abscat = abscat;
}
function Coerce(cat) {
  this.cat = mkCat(cat);
}
function PArg(cat) {
  this.parg = mkCat(cat);
}
function Apply(fun, children) {
  this.fun = mkFun(fun);
  this.children = children;
}
function CncFun(absfun, seqs) {
  this.absfun = absfun;
  this.seqs = [];
  for (var i = 0; i < seqs.length; i++) this.seqs.push(mkSeq(seqs[i]));
}
function SymLit(arg, param) {
  this.arg = arg;
  this.param = param;
}
function SymCat(arg, param) {
  this.arg = arg;
  this.param = param;
}
function SymKS() {
  this.tokens = [];
  for (var i = 0; i < arguments.length; i++) {
    this.tokens.push(arguments[i]);
  }
}
function SymKP(tokens, alts) {
  this.tokens = tokens;
  this.alts = alts;
}
function Alt(tokens, follows) {
  this.tokens = tokens;
  this.follows = follows;
}
