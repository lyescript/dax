var create = (globals) => {
  var _G = Object.assign({}, globals || {});
  _G._G = _G;
  _G.environment = [{}];
  var nil63 = (x) => {
    return x === undefined || x === null;
  };
  _G.nil63 = nil63;
  var is63 = (x) => {
    return ! nil63(x);
  };
  _G.is63 = is63;
  var no = (x) => {
    return nil63(x) || x === false;
  };
  _G.no = no;
  var yes = (x) => {
    return ! no(x);
  };
  _G.yes = yes;
  var either = (x, y) => {
    if (is63(x)) {
      return x;
    } else {
      return y;
    }
  };
  _G.either = either;
  var has63 = (l, k) => {
    return l.hasOwnProperty(k);
  };
  _G.has63 = has63;
  var _35 = (x) => {
    var __n = x.length;
    if (number63(__n)) {
      return __n;
    } else {
      var __n1 = -1;
      var ____o = x;
      var __k = undefined;
      for (__k in ____o) {
        var __v = ____o[__k];
        var __e;
        if (numeric63(__k)) {
          __e = parseInt(__k);
        } else {
          __e = __k;
        }
        var __k1 = __e;
        if (number63(__k1) && __k1 > __n1) {
          __n1 = __k1;
        }
      }
      return __n1 + 1;
    }
  };
  _G._35 = _35;
  var none63 = (x) => {
    return _35(x) === 0;
  };
  _G.none63 = none63;
  var some63 = (x) => {
    return _35(x) > 0;
  };
  _G.some63 = some63;
  var one63 = (x) => {
    return _35(x) === 1;
  };
  _G.one63 = one63;
  var two63 = (x) => {
    return _35(x) === 2;
  };
  _G.two63 = two63;
  var hd = (l) => {
    return l[0];
  };
  _G.hd = hd;
  var type = (x) => {
    return typeof(x);
  };
  _G.type = type;
  var type63 = (x, y) => {
    return type(x) === y;
  };
  _G.type63 = type63;
  var string63 = (x) => {
    return type63(x, "string");
  };
  _G.string63 = string63;
  var number63 = (x) => {
    return type63(x, "number");
  };
  _G.number63 = number63;
  var boolean63 = (x) => {
    return type63(x, "boolean");
  };
  _G.boolean63 = boolean63;
  var function63 = (x) => {
    return type63(x, "function");
  };
  _G.function63 = function63;
  var symbol63 = (x) => {
    return type63(x, "symbol");
  };
  _G.symbol63 = symbol63;
  var obj63 = (x) => {
    return is63(x) && type63(x, "object");
  };
  _G.obj63 = obj63;
  var array63 = (x) => {
    return Array.isArray(x);
  };
  _G.array63 = array63;
  var atom63 = (x) => {
    return nil63(x) || string63(x) || number63(x) || boolean63(x) || symbol63(x);
  };
  _G.atom63 = atom63;
  var fresh = (x) => {
    var ____x = type(x);
    if ("object" === ____x) {
      if (nil63(x)) {
        return undefined;
      } else {
        if (array63(x)) {
          return [];
        } else {
          return {};
        }
      }
    } else {
      if ("undefined" === ____x) {
        return [];
      } else {
        if ("symbol" === ____x) {
          return Symbol();
        } else {
          if ("string" === ____x) {
            return "";
          } else {
            if ("number" === ____x) {
              return 0;
            }
          }
        }
      }
    }
  };
  _G.fresh = fresh;
  nan = 0 / 0;
  _G.nan = nan;
  inf = 1 / 0;
  _G.inf = inf;
  _inf = - inf;
  _G._inf = _inf;
  var nan63 = (n) => {
    return !( n === n);
  };
  _G.nan63 = nan63;
  var inf63 = (n) => {
    return n === inf || n === _inf;
  };
  _G.inf63 = inf63;
  var clip = (s, from, upto) => {
    return s.substring(from, upto);
  };
  _G.clip = clip;
  var cut = (x, from, upto) => {
    var __l = fresh(x);
    var __j = 0;
    var __e1;
    if (nil63(from) || from < 0) {
      __e1 = 0;
    } else {
      __e1 = from;
    }
    var __i1 = __e1;
    var __n3 = _35(x);
    var __e2;
    if (nil63(upto) || upto > __n3) {
      __e2 = __n3;
    } else {
      __e2 = upto;
    }
    var __upto = __e2;
    while (__i1 < __upto) {
      __l[__j] = x[__i1];
      __i1 = __i1 + 1;
      __j = __j + 1;
    }
    var ____o1 = x;
    var __k2 = undefined;
    for (__k2 in ____o1) {
      var __v1 = ____o1[__k2];
      var __e3;
      if (numeric63(__k2)) {
        __e3 = parseInt(__k2);
      } else {
        __e3 = __k2;
      }
      var __k3 = __e3;
      if (! number63(__k3)) {
        __l[__k3] = __v1;
      }
    }
    return __l;
  };
  _G.cut = cut;
  var keys = (x) => {
    var __t = {};
    var ____o2 = x;
    var __k4 = undefined;
    for (__k4 in ____o2) {
      var __v2 = ____o2[__k4];
      var __e4;
      if (numeric63(__k4)) {
        __e4 = parseInt(__k4);
      } else {
        __e4 = __k4;
      }
      var __k5 = __e4;
      if (! number63(__k5)) {
        __t[__k5] = __v2;
      }
    }
    return __t;
  };
  _G.keys = keys;
  var edge = (x) => {
    return _35(x) - 1;
  };
  _G.edge = edge;
  var inner = (x) => {
    return clip(x, 1, edge(x));
  };
  _G.inner = inner;
  var tl = (l) => {
    return cut(l, 1);
  };
  _G.tl = tl;
  var char = (s, n) => {
    return s.charAt(n);
  };
  _G.char = char;
  var code = (s, n) => {
    return s.charCodeAt(n);
  };
  _G.code = code;
  var stringLiteral63 = (x) => {
    return string63(x) && char(x, 0) === "\"";
  };
  _G.stringLiteral63 = stringLiteral63;
  var idLiteral63 = (x) => {
    return string63(x) && char(x, 0) === "|";
  };
  _G.idLiteral63 = idLiteral63;
  var add = (l, x) => {
    if (l.push) {
      l.push(x);
    } else {
      l[_35(l)] = x;
    }
    return undefined;
  };
  _G.add = add;
  var drop = (l) => {
    if (l.pop) {
      return l.pop();
    } else {
      var __i4 = edge(l);
      var __x1 = l[__i4];
      delete l[__i4];
      return __x1;
    }
  };
  _G.drop = drop;
  var last = (l) => {
    return l[edge(l)];
  };
  _G.last = last;
  var almost = (l) => {
    return cut(l, 0, edge(l));
  };
  _G.almost = almost;
  var reverse = (l) => {
    var __l1 = fresh(l);
    var __n6 = edge(l);
    var ____o3 = l;
    var __k6 = undefined;
    for (__k6 in ____o3) {
      var __v3 = ____o3[__k6];
      var __e5;
      if (numeric63(__k6)) {
        __e5 = parseInt(__k6);
      } else {
        __e5 = __k6;
      }
      var __k7 = __e5;
      if (number63(__k7)) {
        __k7 = __n6 - __k7;
      }
      __l1[__k7] = __v3;
    }
    return __l1;
  };
  _G.reverse = reverse;
  var reduce = (f, x) => {
    if (none63(x)) {
      return undefined;
    } else {
      if (one63(x)) {
        return hd(x);
      } else {
        return f(hd(x), reduce(f, tl(x)));
      }
    }
  };
  _G.reduce = reduce;
  var join = (...ls) => {
    var __ls = unstash(ls);
    var __r42 = fresh(hd(__ls));
    var ____x2 = __ls;
    var ____i6 = 0;
    while (____i6 < _35(____x2)) {
      var __l11 = ____x2[____i6];
      if (__l11) {
        var __n8 = _35(__r42);
        var ____o4 = __l11;
        var __k8 = undefined;
        for (__k8 in ____o4) {
          var __v4 = ____o4[__k8];
          var __e6;
          if (numeric63(__k8)) {
            __e6 = parseInt(__k8);
          } else {
            __e6 = __k8;
          }
          var __k9 = __e6;
          if (number63(__k9)) {
            __k9 = __k9 + __n8;
          }
          __r42[__k9] = __v4;
        }
      }
      ____i6 = ____i6 + 1;
    }
    return __r42;
  };
  _G.join = join;
  var find = (f, t) => {
    var ____o5 = t;
    var ____i8 = undefined;
    for (____i8 in ____o5) {
      var __x3 = ____o5[____i8];
      var __e7;
      if (numeric63(____i8)) {
        __e7 = parseInt(____i8);
      } else {
        __e7 = ____i8;
      }
      var ____i81 = __e7;
      var __y = f(__x3);
      if (__y) {
        return __y;
      }
    }
  };
  _G.find = find;
  var first = (f, l) => {
    var ____x4 = l;
    var ____i9 = 0;
    while (____i9 < _35(____x4)) {
      var __x5 = ____x4[____i9];
      var __y1 = f(__x5);
      if (__y1) {
        return __y1;
      }
      ____i9 = ____i9 + 1;
    }
  };
  _G.first = first;
  var in63 = (x, t) => {
    return find((y) => {
      return x === y;
    }, t);
  };
  _G.in63 = in63;
  var pair = (l) => {
    var __l12 = fresh(l);
    var __i10 = 0;
    while (__i10 < _35(l)) {
      add(__l12, [l[__i10], l[__i10 + 1]]);
      __i10 = __i10 + 1;
      __i10 = __i10 + 1;
    }
    return __l12;
  };
  _G.pair = pair;
  var sort = (l, f) => {
    var __e8;
    if (f) {
      __e8 = (a, b) => {
        if (f(a, b)) {
          return -1;
        } else {
          return 1;
        }
      };
    }
    return l.sort(__e8);
  };
  _G.sort = sort;
  var map = (f, x) => {
    var __t1 = fresh(x);
    var ____x6 = x;
    var ____i11 = 0;
    while (____i11 < _35(____x6)) {
      var __v5 = ____x6[____i11];
      var __y2 = f(__v5);
      if (is63(__y2)) {
        add(__t1, __y2);
      }
      ____i11 = ____i11 + 1;
    }
    var ____o6 = x;
    var __k10 = undefined;
    for (__k10 in ____o6) {
      var __v6 = ____o6[__k10];
      var __e9;
      if (numeric63(__k10)) {
        __e9 = parseInt(__k10);
      } else {
        __e9 = __k10;
      }
      var __k11 = __e9;
      if (! number63(__k11)) {
        var __y3 = f(__v6);
        if (is63(__y3)) {
          __t1[__k11] = __y3;
        }
      }
    }
    return __t1;
  };
  _G.map = map;
  var keep = (f, x) => {
    return map((v) => {
      if (yes(f(v))) {
        return v;
      }
    }, x);
  };
  _G.keep = keep;
  var keys63 = (t) => {
    var ____o7 = t;
    var __k12 = undefined;
    for (__k12 in ____o7) {
      var __v7 = ____o7[__k12];
      var __e10;
      if (numeric63(__k12)) {
        __e10 = parseInt(__k12);
      } else {
        __e10 = __k12;
      }
      var __k13 = __e10;
      if (! number63(__k13)) {
        return true;
      }
    }
    return false;
  };
  _G.keys63 = keys63;
  var empty63 = (t) => {
    var ____o8 = t;
    var ____i14 = undefined;
    for (____i14 in ____o8) {
      var __x7 = ____o8[____i14];
      var __e11;
      if (numeric63(____i14)) {
        __e11 = parseInt(____i14);
      } else {
        __e11 = ____i14;
      }
      var ____i141 = __e11;
      return false;
    }
    return true;
  };
  _G.empty63 = empty63;
  var stash = (args) => {
    if (args._stash) {
      return args;
    } else {
      if (keys63(args)) {
        var __l2 = [];
        var ____x8 = args;
        var ____i15 = 0;
        while (____i15 < _35(____x8)) {
          var __x9 = ____x8[____i15];
          add(__l2, __x9);
          ____i15 = ____i15 + 1;
        }
        var __p = keys(args);
        __p._stash = __p._stash || true;
        add(__l2, __p);
        return __l2;
      } else {
        return args;
      }
    }
  };
  _G.stash = stash;
  var unstash = (args) => {
    if (none63(args)) {
      return fresh(args);
    } else {
      var __l3 = last(args);
      if (obj63(__l3) && __l3._stash) {
        var __args1 = almost(args);
        var ____o9 = __l3;
        var __k14 = undefined;
        for (__k14 in ____o9) {
          var __v8 = ____o9[__k14];
          var __e12;
          if (numeric63(__k14)) {
            __e12 = parseInt(__k14);
          } else {
            __e12 = __k14;
          }
          var __k15 = __e12;
          if (!( __k15 === "_stash")) {
            __args1[__k15] = __v8;
          }
        }
        return __args1;
      } else {
        return args;
      }
    }
  };
  _G.unstash = unstash;
  var destash33 = (l, args1) => {
    if (obj63(l) && l._stash) {
      var ____o10 = l;
      var __k16 = undefined;
      for (__k16 in ____o10) {
        var __v9 = ____o10[__k16];
        var __e13;
        if (numeric63(__k16)) {
          __e13 = parseInt(__k16);
        } else {
          __e13 = __k16;
        }
        var __k17 = __e13;
        if (!( __k17 === "_stash")) {
          args1[__k17] = __v9;
        }
      }
    } else {
      return l;
    }
  };
  _G.destash33 = destash33;
  var search = (s, pattern, start) => {
    var __i18 = s.indexOf(pattern, start);
    if (__i18 >= 0) {
      return __i18;
    }
  };
  _G.search = search;
  var split = (s, sep) => {
    if (s === "" || sep === "") {
      return [];
    } else {
      var __l4 = [];
      var __n16 = _35(sep);
      while (true) {
        var __i19 = search(s, sep);
        if (nil63(__i19)) {
          break;
        } else {
          add(__l4, clip(s, 0, __i19));
          s = clip(s, __i19 + __n16);
        }
      }
      add(__l4, s);
      return __l4;
    }
  };
  _G.split = split;
  var cat = (...xs) => {
    var __xs = unstash(xs);
    return either(reduce((a, b) => {
      return a + b;
    }, __xs), "");
  };
  _G.cat = cat;
  var _43 = (...xs) => {
    var __xs1 = unstash(xs);
    return either(reduce((a, b) => {
      return a + b;
    }, __xs1), 0);
  };
  _G._43 = _43;
  var _45 = (...xs) => {
    var __xs2 = unstash(xs);
    return either(reduce((b, a) => {
      return a - b;
    }, reverse(__xs2)), 0);
  };
  _G._45 = _45;
  var _42 = (...xs) => {
    var __xs3 = unstash(xs);
    return either(reduce((a, b) => {
      return a * b;
    }, __xs3), 1);
  };
  _G._42 = _42;
  var _47 = (...xs) => {
    var __xs4 = unstash(xs);
    return either(reduce((b, a) => {
      return a / b;
    }, reverse(__xs4)), 1);
  };
  _G._47 = _47;
  var _37 = (...xs) => {
    var __xs5 = unstash(xs);
    return either(reduce((b, a) => {
      return a % b;
    }, reverse(__xs5)), 0);
  };
  _G._37 = _37;
  var pairwise = (f, xs) => {
    var __i20 = 0;
    while (__i20 < edge(xs)) {
      var __a = xs[__i20];
      var __b = xs[__i20 + 1];
      if (! f(__a, __b)) {
        return false;
      }
      __i20 = __i20 + 1;
    }
    return true;
  };
  _G.pairwise = pairwise;
  var _60 = (...xs) => {
    var __xs6 = unstash(xs);
    return pairwise((a, b) => {
      return a < b;
    }, __xs6);
  };
  _G._60 = _60;
  var _62 = (...xs) => {
    var __xs7 = unstash(xs);
    return pairwise((a, b) => {
      return a > b;
    }, __xs7);
  };
  _G._62 = _62;
  var _61 = (...xs) => {
    var __xs8 = unstash(xs);
    return pairwise((a, b) => {
      return a === b;
    }, __xs8);
  };
  _G._61 = _61;
  var _6061 = (...xs) => {
    var __xs9 = unstash(xs);
    return pairwise((a, b) => {
      return a <= b;
    }, __xs9);
  };
  _G._6061 = _6061;
  var _6261 = (...xs) => {
    var __xs10 = unstash(xs);
    return pairwise((a, b) => {
      return a >= b;
    }, __xs10);
  };
  _G._6261 = _6261;
  var number = (s) => {
    var __n17 = parseFloat(s);
    if (! isNaN(__n17)) {
      return __n17;
    }
  };
  _G.number = number;
  var numberCode63 = (n) => {
    return n >= 48 && n <= 57;
  };
  _G.numberCode63 = numberCode63;
  var numeric63 = (s) => {
    var __n18 = _35(s);
    var __i21 = 0;
    while (__i21 < __n18) {
      if (! numberCode63(code(s, __i21))) {
        return false;
      }
      __i21 = __i21 + 1;
    }
    return some63(s);
  };
  _G.numeric63 = numeric63;
  var tostring = (x) => {
    return x.toString();
  };
  _G.tostring = tostring;
  var escape = (s) => {
    var __s1 = "\"";
    var __i22 = 0;
    while (__i22 < _35(s)) {
      var __c = char(s, __i22);
      var __e14;
      if (__c === "\n") {
        __e14 = "\\n";
      } else {
        var __e15;
        if (__c === "\r") {
          __e15 = "\\r";
        } else {
          var __e16;
          if (__c === "\"") {
            __e16 = "\\\"";
          } else {
            var __e17;
            if (__c === "\\") {
              __e17 = "\\\\";
            } else {
              __e17 = __c;
            }
            __e16 = __e17;
          }
          __e15 = __e16;
        }
        __e14 = __e15;
      }
      var __c1 = __e14;
      __s1 = __s1 + __c1;
      __i22 = __i22 + 1;
    }
    return __s1 + "\"";
  };
  _G.escape = escape;
  var simpleId63 = (x) => {
    var __id3 = string63(x);
    var __e18;
    if (__id3) {
      var ____id = (() => {
        try {
          return [true, readString(x)];
        }
        catch (__e91) {
          return [false, __e91];
        }
      })();
      var __ok = ____id[0];
      var __v10 = ____id[1];
      __e18 = __ok && __v10 === x;
    } else {
      __e18 = __id3;
    }
    return __e18;
  };
  _G.simpleId63 = simpleId63;
  var str = (x, stack) => {
    if (nil63(x)) {
      return "nil";
    } else {
      if (nan63(x)) {
        return "nan";
      } else {
        if (x === inf) {
          return "inf";
        } else {
          if (x === _inf) {
            return "-inf";
          } else {
            if (boolean63(x)) {
              if (x) {
                return "true";
              } else {
                return "false";
              }
            } else {
              if (stringLiteral63(x)) {
                return x;
              } else {
                if (simpleId63(x)) {
                  return x;
                } else {
                  if (string63(x)) {
                    return escape(x);
                  } else {
                    if (atom63(x)) {
                      return tostring(x);
                    } else {
                      if (function63(x)) {
                        return "function";
                      } else {
                        if (stack && in63(x, stack)) {
                          return "circular";
                        } else {
                          var __s = "(";
                          var __sp = "";
                          var __xs11 = [];
                          var __ks = [];
                          var __l5 = stack || [];
                          add(__l5, x);
                          var ____o11 = x;
                          var __k18 = undefined;
                          for (__k18 in ____o11) {
                            var __v11 = ____o11[__k18];
                            var __e19;
                            if (numeric63(__k18)) {
                              __e19 = parseInt(__k18);
                            } else {
                              __e19 = __k18;
                            }
                            var __k19 = __e19;
                            if (number63(__k19)) {
                              __xs11[__k19] = str(__v11, __l5);
                            } else {
                              add(__ks, str(__k19, __l5) + ":");
                              add(__ks, str(__v11, __l5));
                            }
                          }
                          drop(__l5);
                          var ____o12 = join(__xs11, __ks);
                          var ____i24 = undefined;
                          for (____i24 in ____o12) {
                            var __v12 = ____o12[____i24];
                            var __e20;
                            if (numeric63(____i24)) {
                              __e20 = parseInt(____i24);
                            } else {
                              __e20 = ____i24;
                            }
                            var ____i241 = __e20;
                            __s = __s + __sp + __v12;
                            __sp = " ";
                          }
                          return __s + ")";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  _G.str = str;
  var apply = (f, args) => {
    var __args = stash(args);
    return f.apply(f, __args);
  };
  _G.apply = apply;
  var call = (f, ...__r81) => {
    var ____r81 = unstash(__r81);
    var __f = destash33(f, ____r81);
    var ____id1 = ____r81;
    var __args11 = cut(____id1, 0);
    return apply(__f, __args11);
  };
  _G.call = call;
  var setenv = (k, ...__r82) => {
    var ____r82 = unstash(__r82);
    var __k20 = destash33(k, ____r82);
    var ____id2 = ____r82;
    var __keys = cut(____id2, 0);
    if (string63(__k20)) {
      var __e21;
      if (__keys.toplevel) {
        __e21 = hd(_G.environment);
      } else {
        __e21 = last(_G.environment);
      }
      var __frame = __e21;
      var __entry = __frame[__k20] || {};
      var ____o13 = __keys;
      var __k21 = undefined;
      for (__k21 in ____o13) {
        var __v13 = ____o13[__k21];
        var __e22;
        if (numeric63(__k21)) {
          __e22 = parseInt(__k21);
        } else {
          __e22 = __k21;
        }
        var __k22 = __e22;
        __entry[__k22] = __v13;
      }
      __frame[__k20] = __entry;
      return __frame[__k20];
    }
  };
  _G.setenv = setenv;
  var print = (x) => {
    return console.log(x);
  };
  _G.print = print;
  abs = Math.abs;
  _G.abs = abs;
  acos = Math.acos;
  _G.acos = acos;
  asin = Math.asin;
  _G.asin = asin;
  atan = Math.atan;
  _G.atan = atan;
  atan2 = Math.atan2;
  _G.atan2 = atan2;
  ceil = Math.ceil;
  _G.ceil = ceil;
  cos = Math.cos;
  _G.cos = cos;
  floor = Math.floor;
  _G.floor = floor;
  log = Math.log;
  _G.log = log;
  log10 = Math.log10;
  _G.log10 = log10;
  max = Math.max;
  _G.max = max;
  min = Math.min;
  _G.min = min;
  pow = Math.pow;
  _G.pow = pow;
  random = Math.random;
  _G.random = random;
  sin = Math.sin;
  _G.sin = sin;
  sinh = Math.sinh;
  _G.sinh = sinh;
  sqrt = Math.sqrt;
  _G.sqrt = sqrt;
  tan = Math.tan;
  _G.tan = tan;
  tanh = Math.tanh;
  _G.tanh = tanh;
  trunc = Math.floor;
  _G.trunc = trunc;
  setenv("quote", {["_stash"]: true, ["macro"]: (form) => {
    return quoted(form);
  }});
  setenv("quasiquote", {["_stash"]: true, ["macro"]: (form) => {
    return quasiexpand(form, 1);
  }});
  setenv("set", {["_stash"]: true, ["macro"]: (...args) => {
    var __args2 = unstash(args);
    return join(["do"], map((__x10) => {
      var ____id4 = __x10;
      var __lh = ____id4[0];
      var __rh = ____id4[1];
      return ["%set", __lh, __rh];
    }, pair(__args2)));
  }});
  setenv("at", {["_stash"]: true, ["macro"]: (l, i) => {
    return [l, ["brackets", i]];
  }});
  setenv("wipe", {["_stash"]: true, ["macro"]: (place) => {
    return ["%delete", place];
  }});
  setenv("list", {["_stash"]: true, ["macro"]: (...body) => {
    var __body = unstash(body);
    if (keys63(__body)) {
      return join(["%object"], mapo((x) => {
        return x;
      }, __body));
    } else {
      return join(["%array"], __body);
    }
  }});
  setenv("if", {["_stash"]: true, ["macro"]: (...branches) => {
    var __branches = unstash(branches);
    return hd(expandIf(__branches));
  }});
  setenv("case", {["_stash"]: true, ["macro"]: (expr, ...__r90) => {
    var ____r90 = unstash(__r90);
    var __expr = destash33(expr, ____r90);
    var ____id5 = ____r90;
    var __clauses = cut(____id5, 0);
    var __x11 = unique("x");
    var __eq = (_) => {
      if (_ === "else") {
        return true;
      } else {
        return ["=", _, __x11];
      }
    };
    var __cl = (__x12) => {
      var ____id6 = __x12;
      var __a1 = ____id6[0];
      var __body1 = cut(____id6, 1);
      if (string63(__a1) || number63(__a1) || hd(__a1) === "quote") {
        return [__eq(__a1), join(["do"], __body1)];
      } else {
        if (one63(__a1)) {
          return [__eq(hd(__a1)), join(["do"], __body1)];
        } else {
          if (_35(__a1) > 1) {
            return [join(["or"], map(__eq, __a1)), join(["do"], __body1)];
          }
        }
      }
    };
    return ["let", __x11, __expr, join(["if"], apply(join, map(__cl, __clauses)))];
  }});
  setenv("when", {["_stash"]: true, ["macro"]: (cond, ...__r93) => {
    var ____r93 = unstash(__r93);
    var __cond = destash33(cond, ____r93);
    var ____id7 = ____r93;
    var __body2 = cut(____id7, 0);
    return ["if", __cond, join(["do"], __body2)];
  }});
  setenv("unless", {["_stash"]: true, ["macro"]: (cond, ...__r94) => {
    var ____r94 = unstash(__r94);
    var __cond1 = destash33(cond, ____r94);
    var ____id8 = ____r94;
    var __body3 = cut(____id8, 0);
    return ["if", ["not", __cond1], join(["do"], __body3)];
  }});
  setenv("obj", {["_stash"]: true, ["macro"]: (...body) => {
    var __body4 = unstash(body);
    return join(["%object"], mapo((x) => {
      return x;
    }, __body4));
  }});
  setenv("let", {["_stash"]: true, ["macro"]: (bs, ...__r96) => {
    var ____r96 = unstash(__r96);
    var __bs = destash33(bs, ____r96);
    var ____id9 = ____r96;
    var __body5 = cut(____id9, 0);
    if (atom63(__bs)) {
      return join(["let", [__bs, hd(__body5)]], tl(__body5));
    } else {
      if (none63(__bs)) {
        return join(["do"], __body5);
      } else {
        var ____id10 = __bs;
        var __lh1 = ____id10[0];
        var __rh1 = ____id10[1];
        var __bs2 = cut(____id10, 2);
        var ____id11 = bind(__lh1, either(__rh1, "nil"));
        var __id12 = ____id11[0];
        var __val = ____id11[1];
        var __bs1 = cut(____id11, 2);
        var __renames = [];
        if (! idLiteral63(__id12)) {
          var __id111 = unique(__id12);
          __renames = [__id12, __id111];
          __id12 = __id111;
        }
        return ["do", ["%local", __id12, __val], ["let-symbol", __renames, join(["let", join(__bs1, __bs2)], __body5)]];
      }
    }
  }});
  setenv("with", {["_stash"]: true, ["macro"]: (x, v, ...__r97) => {
    var ____r97 = unstash(__r97);
    var __x13 = destash33(x, ____r97);
    var __v14 = destash33(v, ____r97);
    var ____id13 = ____r97;
    var __body6 = cut(____id13, 0);
    return join(["let", [__x13, __v14]], __body6, [__x13]);
  }});
  setenv("let-when", {["_stash"]: true, ["macro"]: (x, v, ...__r98) => {
    var ____r98 = unstash(__r98);
    var __x14 = destash33(x, ____r98);
    var __v15 = destash33(v, ____r98);
    var ____id14 = ____r98;
    var __body7 = cut(____id14, 0);
    var __y4 = unique("y");
    return ["let", __y4, __v15, ["when", ["yes", __y4], join(["let", [__x14, __y4]], __body7)]];
  }});
  setenv("void", {["_stash"]: true, ["macro"]: (...body) => {
    var __body8 = unstash(body);
    return join(["do"], __body8, [["do"]]);
  }});
  setenv("%setenv", {["_stash"]: true, ["macro"]: (name, ...__r99) => {
    var ____r99 = unstash(__r99);
    var __name = destash33(name, ____r99);
    var ____id15 = ____r99;
    var __keys1 = cut(____id15, 0);
    return ["void", join(["setenv", ["quote", __name]], __keys1)];
  }});
  setenv("define-macro", {["_stash"]: true, ["macro"]: (name, args, ...__r100) => {
    var ____r100 = unstash(__r100);
    var __name1 = destash33(name, ____r100);
    var __args3 = destash33(args, ____r100);
    var ____id16 = ____r100;
    var __body9 = cut(____id16, 0);
    return {[0]: "%setenv", [1]: __name1, ["macro"]: join(["fn", __args3], __body9)};
  }});
  setenv("define-special", {["_stash"]: true, ["macro"]: (name, args, ...__r101) => {
    var ____r101 = unstash(__r101);
    var __name2 = destash33(name, ____r101);
    var __args4 = destash33(args, ____r101);
    var ____id17 = ____r101;
    var __body10 = cut(____id17, 0);
    return join({[0]: "%setenv", [1]: __name2, ["special"]: join(["fn", __args4], __body10)}, keys(__body10));
  }});
  setenv("define-symbol-macro", {["_stash"]: true, ["macro"]: (name, expansion) => {
    return {[0]: "%setenv", [1]: name, ["symbol"]: ["quote", expansion]};
  }});
  setenv("define-reader", {["_stash"]: true, ["macro"]: (__x15, ...__r103) => {
    var ____id18 = __x15;
    var __char = ____id18[0];
    var __s11 = ____id18[1];
    var ____r103 = unstash(__r103);
    var ____x15 = destash33(__x15, ____r103);
    var ____id19 = ____r103;
    var __body11 = cut(____id19, 0);
    return ["set", ["read-table", ["brackets", __char]], join(["fn", [__s11]], __body11)];
  }});
  setenv("define", {["_stash"]: true, ["macro"]: (name, x, ...__r104) => {
    var ____r104 = unstash(__r104);
    var __name3 = destash33(name, ____r104);
    var __x16 = destash33(x, ____r104);
    var ____id20 = ____r104;
    var __body12 = cut(____id20, 0);
    setenv(__name3, {["_stash"]: true, ["variable"]: true});
    if (some63(__body12)) {
      return join(["%local-function", __name3], bind42(__x16, __body12));
    } else {
      return ["%local", __name3, __x16];
    }
  }});
  setenv("define-global", {["_stash"]: true, ["macro"]: (name, x, ...__r105) => {
    var ____r105 = unstash(__r105);
    var __name4 = destash33(name, ____r105);
    var __x17 = destash33(x, ____r105);
    var ____id21 = ____r105;
    var __body13 = cut(____id21, 0);
    setenv(__name4, {["_stash"]: true, ["toplevel"]: true, ["variable"]: true});
    if (some63(__body13)) {
      return ["do", join(["%global-function", __name4], bind42(__x17, __body13)), ["%set", ["_G", "." + __name4], __name4]];
    } else {
      return ["do", ["%set", __name4, __x17], ["%set", ["_G", "." + __name4], __name4]];
    }
  }});
  setenv("with-frame", {["_stash"]: true, ["macro"]: (...body) => {
    var __body14 = unstash(body);
    var __x18 = unique("x");
    return ["do", ["add", ["_G", ".environment"], ["obj"]], ["with", __x18, join(["do"], __body14), ["drop", ["_G", ".environment"]]]];
  }});
  setenv("with-bindings", {["_stash"]: true, ["macro"]: (__x19, ...__r106) => {
    var ____id22 = __x19;
    var __names = ____id22[0];
    var ____r106 = unstash(__r106);
    var ____x19 = destash33(__x19, ____r106);
    var ____id23 = ____r106;
    var __body15 = cut(____id23, 0);
    var __x20 = unique("x");
    return join(["with-frame", ["each", __x20, __names, ["if", ["default-assignment?", __x20], {[0]: "setenv", [1]: ["at", __x20, 1], ["variable"]: true}, {[0]: "setenv", [1]: __x20, ["variable"]: true}]]], __body15);
  }});
  setenv("let-macro", {["_stash"]: true, ["macro"]: (definitions, ...__r107) => {
    var ____r107 = unstash(__r107);
    var __definitions = destash33(definitions, ____r107);
    var ____id24 = ____r107;
    var __body16 = cut(____id24, 0);
    add(_G.environment, {});
    map((m) => {
      return _eval(join(["define-macro"], m));
    }, __definitions);
    var ____x21 = join(["do"], macroexpand(__body16));
    drop(_G.environment);
    return ____x21;
  }});
  setenv("let-symbol", {["_stash"]: true, ["macro"]: (expansions, ...__r109) => {
    var ____r109 = unstash(__r109);
    var __expansions = destash33(expansions, ____r109);
    var ____id25 = ____r109;
    var __body17 = cut(____id25, 0);
    add(_G.environment, {});
    map((__x23) => {
      var ____id26 = __x23;
      var __name5 = ____id26[0];
      var __exp = ____id26[1];
      return _eval(["define-symbol-macro", __name5, __exp]);
    }, pair(__expansions));
    var ____x22 = join(["do"], macroexpand(__body17));
    drop(_G.environment);
    return ____x22;
  }});
  setenv("let-unique", {["_stash"]: true, ["macro"]: (names, ...__r111) => {
    var ____r111 = unstash(__r111);
    var __names1 = destash33(names, ____r111);
    var ____id27 = ____r111;
    var __body18 = cut(____id27, 0);
    var __bs11 = map((n) => {
      return [n, ["unique", ["quote", n]]];
    }, __names1);
    return join(["let", apply(join, __bs11)], __body18);
  }});
  setenv("fn", {["_stash"]: true, ["macro"]: (args, ...__r113) => {
    var ____r113 = unstash(__r113);
    var __args5 = destash33(args, ____r113);
    var ____id28 = ____r113;
    var __body19 = cut(____id28, 0);
    return join(["%function"], bind42(__args5, __body19));
  }});
  setenv("apply", {["_stash"]: true, ["macro"]: (f, ...__r114) => {
    var ____r114 = unstash(__r114);
    var __f1 = destash33(f, ____r114);
    var ____id29 = ____r114;
    var __args6 = cut(____id29, 0);
    if (_35(__args6) > 1) {
      return ["%call", "apply", __f1, ["join", join(["list"], almost(__args6)), last(__args6)]];
    } else {
      return join(["%call", "apply", __f1], __args6);
    }
  }});
  setenv("guard", {["_stash"]: true, ["macro"]: (expr) => {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  }});
  setenv("each", {["_stash"]: true, ["macro"]: (x, t, ...__r116) => {
    var ____r116 = unstash(__r116);
    var __x24 = destash33(x, ____r116);
    var __t2 = destash33(t, ____r116);
    var ____id30 = ____r116;
    var __body20 = cut(____id30, 0);
    var __o14 = unique("o");
    var __n22 = unique("n");
    var __i26 = unique("i");
    var __e24;
    if (atom63(__x24)) {
      __e24 = [__i26, __x24];
    } else {
      var __e25;
      if (_35(__x24) > 1) {
        __e25 = __x24;
      } else {
        __e25 = [__i26, hd(__x24)];
      }
      __e24 = __e25;
    }
    var ____id31 = __e24;
    var __k23 = ____id31[0];
    var __v16 = ____id31[1];
    return ["let", [__o14, __t2, __k23, "nil"], ["%for", __o14, __k23, ["let", [__v16, [__o14, ["brackets", __k23]]], join(["let", __k23, ["if", ["numeric?", __k23], ["parseInt", __k23], __k23]], __body20)]]];
  }});
  setenv("for", {["_stash"]: true, ["macro"]: (i, to, ...__r117) => {
    var ____r117 = unstash(__r117);
    var __i27 = destash33(i, ____r117);
    var __to = destash33(to, ____r117);
    var ____id32 = ____r117;
    var __body21 = cut(____id32, 0);
    return ["let", __i27, 0, join(["while", ["<", __i27, __to]], __body21, [["inc", __i27]])];
  }});
  setenv("step", {["_stash"]: true, ["macro"]: (v, t, ...__r118) => {
    var ____r118 = unstash(__r118);
    var __v17 = destash33(v, ____r118);
    var __t3 = destash33(t, ____r118);
    var ____id33 = ____r118;
    var __body22 = cut(____id33, 0);
    var __x25 = unique("x");
    var __i28 = unique("i");
    return ["let", [__x25, __t3], ["for", __i28, ["#", __x25], join(["let", [__v17, ["at", __x25, __i28]]], __body22)]];
  }});
  setenv("set-of", {["_stash"]: true, ["macro"]: (...xs) => {
    var __xs12 = unstash(xs);
    var __l6 = [];
    var ____o15 = __xs12;
    var ____i29 = undefined;
    for (____i29 in ____o15) {
      var __x26 = ____o15[____i29];
      var __e26;
      if (numeric63(____i29)) {
        __e26 = parseInt(____i29);
      } else {
        __e26 = ____i29;
      }
      var ____i291 = __e26;
      __l6[__x26] = true;
    }
    return join(["obj"], __l6);
  }});
  setenv("join!", {["_stash"]: true, ["macro"]: (a, ...__r119) => {
    var ____r119 = unstash(__r119);
    var __a2 = destash33(a, ____r119);
    var ____id34 = ____r119;
    var __bs21 = cut(____id34, 0);
    return ["set", __a2, join(["join", __a2], __bs21)];
  }});
  setenv("cat!", {["_stash"]: true, ["macro"]: (a, ...__r120) => {
    var ____r120 = unstash(__r120);
    var __a3 = destash33(a, ____r120);
    var ____id35 = ____r120;
    var __bs3 = cut(____id35, 0);
    return ["set", __a3, join(["cat", __a3], __bs3)];
  }});
  setenv("inc", {["_stash"]: true, ["macro"]: (n, by) => {
    var __e27;
    if (nil63(by)) {
      __e27 = 1;
    } else {
      __e27 = by;
    }
    return ["set", n, ["+", n, __e27]];
  }});
  setenv("dec", {["_stash"]: true, ["macro"]: (n, by) => {
    var __e28;
    if (nil63(by)) {
      __e28 = 1;
    } else {
      __e28 = by;
    }
    return ["set", n, ["-", n, __e28]];
  }});
  setenv("with-indent", {["_stash"]: true, ["macro"]: (form) => {
    var __x27 = unique("x");
    return ["do", ["inc", "indent-level"], ["with", __x27, form, ["dec", "indent-level"]]];
  }});
  setenv("export", {["_stash"]: true, ["macro"]: (...names) => {
    var __names2 = unstash(names);
    return join(["do"], map((k) => {
      return ["set", ["exports", "." + k], k];
    }, __names2));
  }});
  setenv("when-compiling", {["_stash"]: true, ["macro"]: (...body) => {
    var __body23 = unstash(body);
    return _eval(join(["do"], __body23));
  }});
  setenv("during-compilation", {["_stash"]: true, ["macro"]: (...body) => {
    var __body24 = unstash(body);
    var __x28 = expand(join(["do"], __body24));
    _eval(__x28);
    return __x28;
  }});
  setenv("class", {["_stash"]: true, ["macro"]: (x, ...__r125) => {
    var ____r125 = unstash(__r125);
    var __x29 = destash33(x, ____r125);
    var ____id36 = ____r125;
    var __body25 = cut(____id36, 0);
    if (atom63(__x29)) {
      return join(["%class", [__x29]], __body25);
    } else {
      return join(["%class", __x29], __body25);
    }
  }});
  setenv(".", {["_stash"]: true, ["macro"]: (...args) => {
    var __args7 = unstash(args);
    if (none63(__args7)) {
      return ["this", ".constructor"];
    } else {
      if (one63(__args7)) {
        return join([".", "this", hd(__args7)], tl(__args7));
      } else {
        var ____id37 = __args7;
        var __name6 = ____id37[0];
        var __a4 = ____id37[1];
        var __bs4 = cut(____id37, 2);
        var __e29;
        if (atom63(__a4)) {
          __e29 = ["quote", compile(__a4)];
        } else {
          var __e30;
          if ("quote" === hd(__a4)) {
            __e30 = ["quote", compile(__a4[1])];
          } else {
            __e30 = __a4;
          }
          __e29 = __e30;
        }
        var __prop = __e29;
        var __expr1 = [__name6, ["brackets", __prop]];
        if (! atom63(__a4) && "quote" === hd(__a4) || stringLiteral63(__a4) || none63(__bs4)) {
          return __expr1;
        } else {
          return join([__expr1], __bs4);
        }
      }
    }
  }});
  setenv("try", {["_stash"]: true, ["macro"]: (...body) => {
    var __body26 = unstash(body);
    var __e23 = unique("e");
    return join(["%condition-case", __e23, join(["do"], map((x) => {
      if (!( obj63(x) && in63(hd(x), ["catch", "finally"]))) {
        return x;
      }
    }, __body26))], map((x) => {
      if (obj63(x)) {
        if (hd(x) === "finally") {
          return x;
        } else {
          if (hd(x) === "catch") {
            var ____id38 = x;
            var ___ = ____id38[0];
            var __type = ____id38[1];
            var ___var = ____id38[2];
            var __body27 = cut(____id38, 3);
            return ["catch", __type, join(["let", [___var, __e23]], __body27)];
          }
        }
      }
    }, __body26));
  }});
  setenv("throw", {["_stash"]: true, ["macro"]: (x) => {
    return ["%throw", x];
  }});
  setenv("brackets", {["_stash"]: true, ["macro"]: (...args) => {
    var __args8 = unstash(args);
    return join(["%brackets"], __args8);
  }});
  setenv("braces", {["_stash"]: true, ["macro"]: (...args) => {
    var __args9 = unstash(args);
    return join(["%braces"], __args9);
  }});
  var __exports = {};
  var __self = __exports;
  var __module = {["exports"]: __exports};
  var getenv = (k, p) => {
    if (string63(k)) {
      var __i30 = edge(_G.environment);
      while (__i30 >= 0) {
        var __b1 = _G.environment[__i30][k];
        if (is63(__b1)) {
          var __e40;
          if (p) {
            __e40 = __b1[p];
          } else {
            __e40 = __b1;
          }
          return __e40;
        } else {
          __i30 = __i30 - 1;
        }
      }
    }
  };
  _G.getenv = getenv;
  var macroFunction = (k) => {
    return getenv(k, "macro");
  };
  var macro63 = (k) => {
    return is63(macroFunction(k));
  };
  var special63 = (k) => {
    return is63(getenv(k, "special"));
  };
  var specialForm63 = (form) => {
    return ! atom63(form) && special63(hd(form));
  };
  var statement63 = (k) => {
    return special63(k) && getenv(k, "stmt");
  };
  var symbolExpansion = (k) => {
    return getenv(k, "symbol");
  };
  var symbolMacro63 = (k) => {
    return is63(symbolExpansion(k));
  };
  var variable63 = (k) => {
    return is63(getenv(k, "variable"));
  };
  var bound63 = (x) => {
    return macro63(x) || special63(x) || symbolMacro63(x) || variable63(x);
  };
  _G.bound63 = bound63;
  var quoted = (form) => {
    if (string63(form)) {
      return escape(form);
    } else {
      if (atom63(form)) {
        return form;
      } else {
        if (keys63(form)) {
          return join(["%object"], mapo(quoted, form));
        } else {
          return join(["%array"], map(quoted, form));
        }
      }
    }
  };
  _G.quoted = quoted;
  var literal = (s) => {
    if (stringLiteral63(s)) {
      return s;
    } else {
      return quoted(s);
    }
  };
  var stash42 = (args) => {
    if (keys63(args)) {
      var __l7 = ["%object", "\"_stash\"", true];
      var ____o16 = args;
      var __k24 = undefined;
      for (__k24 in ____o16) {
        var __v18 = ____o16[__k24];
        var __e41;
        if (numeric63(__k24)) {
          __e41 = parseInt(__k24);
        } else {
          __e41 = __k24;
        }
        var __k25 = __e41;
        if (! number63(__k25)) {
          add(__l7, literal(__k25));
          add(__l7, __v18);
        }
      }
      return join(args, [__l7]);
    } else {
      return args;
    }
  };
  var bias = (k) => {
    return k;
  };
  var defaultAssignmentOp = "o";
  var defaultAssignment63 = (x) => {
    return ! atom63(x) && hd(x) === defaultAssignmentOp;
  };
  _G.defaultAssignment63 = defaultAssignment63;
  var bind = (lh, rh) => {
    if (atom63(lh)) {
      return [lh, rh];
    } else {
      if (defaultAssignment63(lh)) {
        return bind(lh[1], ["if", ["is?", rh], rh, lh[2]]);
      } else {
        var __id39 = unique("id");
        var __bs5 = [__id39, rh];
        var ____o17 = lh;
        var __k26 = undefined;
        for (__k26 in ____o17) {
          var __v19 = ____o17[__k26];
          var __e42;
          if (numeric63(__k26)) {
            __e42 = parseInt(__k26);
          } else {
            __e42 = __k26;
          }
          var __k27 = __e42;
          var __e43;
          if (__k27 === "rest") {
            __e43 = ["cut", __id39, _35(lh)];
          } else {
            __e43 = [__id39, ["brackets", ["quote", __k27]]];
          }
          var __x30 = __e43;
          if (is63(__k27)) {
            var __e44;
            if (__v19 === true) {
              __e44 = __k27;
            } else {
              __e44 = __v19;
            }
            var __k28 = __e44;
            __bs5 = join(__bs5, bind(__k28, __x30));
          }
        }
        return __bs5;
      }
    }
  };
  _G.bind = bind;
  var bind42 = (args, body) => {
    var __args12 = [];
    var rest = (r) => {
      __args12.rest = r;
      return ["unstash", r];
    };
    if (atom63(args)) {
      return [__args12, join(["let", [args, rest(args)]], body)];
    } else {
      var __bs6 = [];
      var __r147 = unique("r");
      var ____o18 = args;
      var __k29 = undefined;
      for (__k29 in ____o18) {
        var __v20 = ____o18[__k29];
        var __e45;
        if (numeric63(__k29)) {
          __e45 = parseInt(__k29);
        } else {
          __e45 = __k29;
        }
        var __k30 = __e45;
        if (number63(__k30)) {
          if (atom63(__v20)) {
            add(__args12, __v20);
          } else {
            var __x31 = unique("x");
            add(__args12, __x31);
            __bs6 = join(__bs6, [__v20, __x31]);
          }
        }
      }
      if (keys63(args)) {
        __bs6 = join(__bs6, [__r147, rest(__r147)]);
        var __n27 = _35(__args12);
        var __i34 = 0;
        while (__i34 < __n27) {
          var __v21 = __args12[__i34];
          __bs6 = join(__bs6, [__v21, ["destash!", __v21, __r147]]);
          __i34 = __i34 + 1;
        }
        __bs6 = join(__bs6, [keys(args), __r147]);
      }
      return [__args12, join(["let", __bs6], body)];
    }
  };
  _G.bind42 = bind42;
  var quoting63 = (depth) => {
    return number63(depth);
  };
  var quasiquoting63 = (depth) => {
    return quoting63(depth) && depth > 0;
  };
  var canUnquote63 = (depth) => {
    return quoting63(depth) && depth === 1;
  };
  var quasisplice63 = (x, depth) => {
    return canUnquote63(depth) && ! atom63(x) && hd(x) === "unquote-splicing";
  };
  var expandLocal = (__x32) => {
    var ____id40 = __x32;
    var __x33 = ____id40[0];
    var __name7 = ____id40[1];
    var __value = ____id40[2];
    setenv(__name7, {["_stash"]: true, ["variable"]: true});
    return ["%local", __name7, macroexpand(__value)];
  };
  var expandFunction = (__x34) => {
    var ____id41 = __x34;
    var __x35 = ____id41[0];
    var __args10 = ____id41[1];
    var __body28 = cut(____id41, 2);
    add(_G.environment, {});
    var ____o19 = __args10;
    var ____i35 = undefined;
    for (____i35 in ____o19) {
      var ____x36 = ____o19[____i35];
      var __e46;
      if (numeric63(____i35)) {
        __e46 = parseInt(____i35);
      } else {
        __e46 = ____i35;
      }
      var ____i351 = __e46;
      if (defaultAssignment63(____x36)) {
        setenv(____x36[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x36, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x37 = join(["%function", __args10], macroexpand(__body28));
    drop(_G.environment);
    return ____x37;
  };
  var expandTable = (__x38) => {
    var ____id42 = __x38;
    var __x39 = ____id42[0];
    var __args111 = cut(____id42, 1);
    var __expr2 = join([__x39], keys(__args111));
    var ____x40 = __args111;
    var ____i36 = 0;
    while (____i36 < _35(____x40)) {
      var __x41 = ____x40[____i36];
      if (atom63(__x41)) {
        add(__expr2, [__x41, macroexpand(__x41)]);
      } else {
        if (_35(__x41) <= 2) {
          var ____id43 = __x41;
          var __name8 = ____id43[0];
          var __v22 = ____id43[1];
          add(__expr2, [macroexpand(__name8), macroexpand(__v22)]);
        } else {
          var ____id44 = __x41;
          var __prefix = ____id44[0];
          var __name9 = ____id44[1];
          var __args121 = ____id44[2];
          var __body29 = cut(____id44, 3);
          if (some63(__body29)) {
            var ____id45 = bind42(__args121, __body29);
            var __args13 = ____id45[0];
            var __body111 = ____id45[1];
            add(_G.environment, {});
            var ____o20 = __args13;
            var ____i37 = undefined;
            for (____i37 in ____o20) {
              var ____x42 = ____o20[____i37];
              var __e47;
              if (numeric63(____i37)) {
                __e47 = parseInt(____i37);
              } else {
                __e47 = ____i37;
              }
              var ____i371 = __e47;
              if (defaultAssignment63(____x42)) {
                setenv(____x42[1], {["_stash"]: true, ["variable"]: true});
              } else {
                setenv(____x42, {["_stash"]: true, ["variable"]: true});
              }
            }
            var ____x43 = add(__expr2, [__prefix, macroexpand(__name9), __args13, macroexpand(__body111)]);
            drop(_G.environment);
            ____x43;
          } else {
            add(__expr2, [__prefix, macroexpand(__name9), macroexpand(__args121)]);
          }
        }
      }
      ____i36 = ____i36 + 1;
    }
    return __expr2;
  };
  var expandClass = (__x44) => {
    var ____id46 = __x44;
    var __x45 = ____id46[0];
    var __name10 = ____id46[1];
    var __body30 = cut(____id46, 2);
    return join([__x45, __name10], tl(expandTable(join(["%table"], __body30))));
  };
  var expandConditionCase = (__x46) => {
    var ____id47 = __x46;
    var __x47 = ____id47[0];
    var ___var1 = ____id47[1];
    var __form = ____id47[2];
    var __clauses1 = cut(____id47, 3);
    return join(["%condition-case", ___var1, macroexpand(__form)], map((__x48) => {
      var ____id48 = __x48;
      var __which = ____id48[0];
      var __body31 = cut(____id48, 1);
      if (__which === "finally") {
        return join([__which], map(macroexpand, __body31));
      } else {
        add(_G.environment, {});
        var ____o21 = [___var1];
        var ____i38 = undefined;
        for (____i38 in ____o21) {
          var ____x49 = ____o21[____i38];
          var __e48;
          if (numeric63(____i38)) {
            __e48 = parseInt(____i38);
          } else {
            __e48 = ____i38;
          }
          var ____i381 = __e48;
          if (defaultAssignment63(____x49)) {
            setenv(____x49[1], {["_stash"]: true, ["variable"]: true});
          } else {
            setenv(____x49, {["_stash"]: true, ["variable"]: true});
          }
        }
        var ____x50 = join([__which], map(macroexpand, __body31));
        drop(_G.environment);
        return ____x50;
      }
    }, __clauses1));
  };
  _G.expandConditionCase = expandConditionCase;
  var expandDefinition = (__x51) => {
    var ____id49 = __x51;
    var __x52 = ____id49[0];
    var __name11 = ____id49[1];
    var __args131 = ____id49[2];
    var __body32 = cut(____id49, 3);
    add(_G.environment, {});
    var ____o22 = __args131;
    var ____i39 = undefined;
    for (____i39 in ____o22) {
      var ____x53 = ____o22[____i39];
      var __e49;
      if (numeric63(____i39)) {
        __e49 = parseInt(____i39);
      } else {
        __e49 = ____i39;
      }
      var ____i391 = __e49;
      if (defaultAssignment63(____x53)) {
        setenv(____x53[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x53, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x54 = join([__x52, __name11, __args131], macroexpand(__body32));
    drop(_G.environment);
    return ____x54;
  };
  var expandMacro = (form) => {
    return macroexpand(expand1(form));
  };
  var expand1 = (__x55) => {
    var ____id50 = __x55;
    var __name12 = ____id50[0];
    var __body33 = cut(____id50, 1);
    return apply(macroFunction(__name12), __body33);
  };
  _G.expand1 = expand1;
  var macroexpand = (form) => {
    if (symbolMacro63(form)) {
      return macroexpand(symbolExpansion(form));
    } else {
      if (atom63(form)) {
        return form;
      } else {
        var __x56 = hd(form);
        if (__x56 === "%local") {
          return expandLocal(form);
        } else {
          if (__x56 === "%function") {
            return expandFunction(form);
          } else {
            if (__x56 === "%table") {
              return expandTable(form);
            } else {
              if (__x56 === "%class") {
                return expandClass(form);
              } else {
                if (__x56 === "%condition-case") {
                  return expandConditionCase(form);
                } else {
                  if (__x56 === "%global-function") {
                    return expandDefinition(form);
                  } else {
                    if (__x56 === "%local-function") {
                      return expandDefinition(form);
                    } else {
                      if (macro63(__x56)) {
                        return expandMacro(form);
                      } else {
                        return map(macroexpand, form);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  _G.macroexpand = macroexpand;
  var quasiquoteList = (form, depth) => {
    var __xs13 = [["list"]];
    var ____o23 = form;
    var __k31 = undefined;
    for (__k31 in ____o23) {
      var __v23 = ____o23[__k31];
      var __e50;
      if (numeric63(__k31)) {
        __e50 = parseInt(__k31);
      } else {
        __e50 = __k31;
      }
      var __k32 = __e50;
      if (! number63(__k32)) {
        var __e51;
        if (quasisplice63(__v23, depth)) {
          __e51 = quasiexpand(__v23[1]);
        } else {
          __e51 = quasiexpand(__v23, depth);
        }
        var __v24 = __e51;
        last(__xs13)[__k32] = __v24;
      }
    }
    var ____x57 = form;
    var ____i41 = 0;
    while (____i41 < _35(____x57)) {
      var __x58 = ____x57[____i41];
      if (quasisplice63(__x58, depth)) {
        var __x59 = quasiexpand(__x58[1]);
        add(__xs13, __x59);
        add(__xs13, ["list"]);
      } else {
        add(last(__xs13), quasiexpand(__x58, depth));
      }
      ____i41 = ____i41 + 1;
    }
    var __pruned = keep((x) => {
      return _35(x) > 1 || !( hd(x) === "list") || keys63(x);
    }, __xs13);
    if (one63(__pruned)) {
      return hd(__pruned);
    } else {
      return join(["join"], __pruned);
    }
  };
  var quasiexpand = (form, depth) => {
    if (quasiquoting63(depth)) {
      if (atom63(form)) {
        return ["quote", form];
      } else {
        if (canUnquote63(depth) && hd(form) === "unquote") {
          return quasiexpand(form[1]);
        } else {
          if (hd(form) === "unquote" || hd(form) === "unquote-splicing") {
            return quasiquoteList(form, depth - 1);
          } else {
            if (hd(form) === "quasiquote") {
              return quasiquoteList(form, depth + 1);
            } else {
              return quasiquoteList(form, depth);
            }
          }
        }
      }
    } else {
      if (atom63(form)) {
        return form;
      } else {
        if (hd(form) === "quote") {
          return form;
        } else {
          if (hd(form) === "quasiquote") {
            return quasiexpand(form[1], 1);
          } else {
            return map((x) => {
              return quasiexpand(x, depth);
            }, form);
          }
        }
      }
    }
  };
  _G.quasiexpand = quasiexpand;
  var expandIf = (__x60) => {
    var ____id51 = __x60;
    var __a5 = ____id51[0];
    var __b2 = ____id51[1];
    var __c11 = cut(____id51, 2);
    if (is63(__b2)) {
      return [join(["%if", __a5, __b2], expandIf(__c11))];
    } else {
      if (is63(__a5)) {
        return [__a5];
      }
    }
  };
  _G.expandIf = expandIf;
  indentLevel = 0;
  _G.indentLevel = indentLevel;
  var indentation = () => {
    var __s2 = "";
    var __i42 = 0;
    while (__i42 < indentLevel) {
      __s2 = __s2 + "  ";
      __i42 = __i42 + 1;
    }
    return __s2;
  };
  _G.indentation = indentation;
  var reserved = {["="]: true, ["=="]: true, ["+"]: true, ["-"]: true, ["%"]: true, ["*"]: true, ["/"]: true, ["<"]: true, [">"]: true, ["<="]: true, [">="]: true, ["break"]: true, ["case"]: true, ["catch"]: true, ["class"]: true, ["const"]: true, ["continue"]: true, ["debugger"]: true, ["default"]: true, ["delete"]: true, ["do"]: true, ["else"]: true, ["eval"]: true, ["export"]: true, ["extends"]: true, ["finally"]: true, ["for"]: true, ["function"]: true, ["if"]: true, ["import"]: true, ["in"]: true, ["instanceof"]: true, ["new"]: true, ["return"]: true, ["switch"]: true, ["throw"]: true, ["try"]: true, ["typeof"]: true, ["var"]: true, ["void"]: true, ["while"]: true, ["with"]: true};
  var reserved63 = (x) => {
    return has63(reserved, x);
  };
  _G.reserved63 = reserved63;
  var validCode63 = (n) => {
    return numberCode63(n) || n >= 65 && n <= 90 || n >= 97 && n <= 122 || n === 95;
  };
  var accessor63 = (x) => {
    return string63(x) && _35(x) > 1 && code(x, 0) === 46 && !( code(x, 1) === 46) || obj63(x) && hd(x) === "%brackets";
  };
  _G.accessor63 = accessor63;
  camelCaseRegex = new RegExp("(?<=[a-z])[-](\\w|$)", "g");
  _G.camelCaseRegex = camelCaseRegex;
  var camelCase = (name) => {
    if (string63(name)) {
      return name.replace(camelCaseRegex, (_, x) => {
        return x.toUpperCase();
      });
    } else {
      return name;
    }
  };
  _G.camelCase = camelCase;
  var id = (id, raw63) => {
    var __id52 = camelCase(id);
    var __e52;
    if (! raw63 && numberCode63(code(__id52, 0))) {
      __e52 = "_";
    } else {
      __e52 = "";
    }
    var __id121 = __e52;
    var __i43 = 0;
    while (__i43 < _35(__id52)) {
      var __c2 = char(__id52, __i43);
      var __n33 = code(__c2);
      var __e53;
      if (__c2 === "-" && !( __id52 === "-")) {
        __e53 = "_";
      } else {
        var __e54;
        if (validCode63(__n33)) {
          __e54 = __c2;
        } else {
          var __e55;
          if (__i43 === 0) {
            __e55 = "_" + __n33;
          } else {
            __e55 = __n33;
          }
          __e54 = __e55;
        }
        __e53 = __e54;
      }
      var __c12 = __e53;
      __id121 = __id121 + __c12;
      __i43 = __i43 + 1;
    }
    if (! raw63 && reserved63(__id121)) {
      return "_" + __id121;
    } else {
      return __id121;
    }
  };
  var validId63 = (x) => {
    return some63(x) && x === id(x);
  };
  _G.validId63 = validId63;
  var __names3 = {};
  var unique = (x) => {
    if (string63(x)) {
      var __x61 = id(x);
      if (__names3[__x61]) {
        var __i44 = __names3[__x61];
        __names3[__x61] = __names3[__x61] + 1;
        return unique(__x61 + __i44);
      } else {
        __names3[__x61] = 1;
        return "__" + __x61;
      }
    } else {
      return x;
    }
  };
  _G.unique = unique;
  var key = (k) => {
    if (string63(k) && validId63(k)) {
      return k;
    } else {
      if (stringLiteral63(k) || ! string63(k)) {
        return "[" + compile(k) + "]";
      } else {
        return compile(k);
      }
    }
  };
  _G.key = key;
  var mapo = (f, t) => {
    var __o24 = [];
    var ____o25 = t;
    var __k33 = undefined;
    for (__k33 in ____o25) {
      var __v25 = ____o25[__k33];
      var __e56;
      if (numeric63(__k33)) {
        __e56 = parseInt(__k33);
      } else {
        __e56 = __k33;
      }
      var __k34 = __e56;
      var __x62 = f(__v25);
      if (is63(__x62)) {
        add(__o24, literal(__k34));
        add(__o24, __x62);
      }
    }
    return __o24;
  };
  _G.mapo = mapo;
  var infix = [{["not"]: {["js"]: "!"}}, {["*"]: true, ["/"]: true, ["%"]: true}, {["cat"]: {["js"]: "+"}}, {["+"]: true, ["-"]: true}, {["<"]: true, [">"]: true, ["<="]: true, [">="]: true}, {["="]: {["js"]: "==="}, ["=="]: {["js"]: "=="}}, {["and"]: {["js"]: "&&"}}, {["or"]: {["js"]: "||"}}];
  var unary63 = (form) => {
    return two63(form) && in63(hd(form), ["not", "-"]);
  };
  var index = (k) => {
    return k;
  };
  var precedence = (form) => {
    if (!( atom63(form) || unary63(form))) {
      var ____o26 = infix;
      var __k35 = undefined;
      for (__k35 in ____o26) {
        var __v26 = ____o26[__k35];
        var __e57;
        if (numeric63(__k35)) {
          __e57 = parseInt(__k35);
        } else {
          __e57 = __k35;
        }
        var __k36 = __e57;
        var __x63 = hd(form);
        if (__v26[__x63]) {
          return index(__k36);
        }
      }
    }
    return 0;
  };
  var getop = (op) => {
    return find((level) => {
      var __x64 = level[op];
      if (__x64 === true) {
        return op;
      } else {
        if (is63(__x64)) {
          return __x64.js;
        }
      }
    }, infix);
  };
  var infix63 = (x) => {
    return is63(getop(x));
  };
  var infixOperator63 = (x) => {
    return obj63(x) && infix63(hd(x));
  };
  _G.infixOperator63 = infixOperator63;
  var compileNext = (x, args, call63) => {
    if (none63(args)) {
      if (call63) {
        return x + "()";
      } else {
        return x;
      }
    } else {
      return x + compileArgs(args, call63);
    }
  };
  _G.compileNext = compileNext;
  var compileArgs = (args, call63) => {
    var __a6 = hd(args);
    if (accessor63(__a6)) {
      return compileNext(compile(__a6), tl(args), call63);
    } else {
      if (obj63(__a6) && accessor63(hd(__a6))) {
        var ____id53 = __a6;
        var __x65 = ____id53[0];
        var __ys = cut(____id53, 1);
        var __s3 = compileNext(compile(__x65), __ys, true);
        return compileNext(__s3, tl(args), call63);
      } else {
        var __s4 = "";
        var __c3 = "";
        var __i47 = 0;
        while (__i47 < _35(args)) {
          var __x66 = args[__i47];
          if (defaultAssignment63(__x66)) {
            var ____id54 = __x66;
            var ___1 = ____id54[0];
            var __x111 = ____id54[1];
            var __val1 = ____id54[2];
            __s4 = __s4 + __c3 + compile(__x111) + " = " + compile(__val1);
          } else {
            if (accessor63(__x66) || obj63(__x66) && accessor63(hd(__x66))) {
              return compileNext("(" + __s4 + ")", cut(args, __i47), call63);
            } else {
              __s4 = __s4 + __c3 + compile(__x66);
            }
          }
          __c3 = ", ";
          __i47 = __i47 + 1;
        }
        if (args.rest) {
          __s4 = __s4 + __c3 + "..." + compile(args.rest);
        }
        return "(" + __s4 + ")";
      }
    }
  };
  _G.compileArgs = compileArgs;
  var escapeNewlines = (s) => {
    var __s12 = "";
    var __i48 = 0;
    while (__i48 < _35(s)) {
      var __c4 = char(s, __i48);
      var __e58;
      if (__c4 === "\n") {
        __e58 = "\\n";
      } else {
        var __e59;
        if (__c4 === "\r") {
          __e59 = "";
        } else {
          __e59 = __c4;
        }
        __e58 = __e59;
      }
      __s12 = __s12 + __e58;
      __i48 = __i48 + 1;
    }
    return __s12;
  };
  var accessor = (x) => {
    var __prop1 = compileAtom(clip(x, 1), true);
    if (validId63(__prop1)) {
      return "." + __prop1;
    } else {
      return "[" + escape(__prop1) + "]";
    }
  };
  _G.accessor = accessor;
  var compileAtom = (x, raw63) => {
    if (! raw63 && x === "nil") {
      return "undefined";
    } else {
      if (accessor63(x)) {
        return accessor(x);
      } else {
        if (idLiteral63(x)) {
          return inner(x);
        } else {
          if (stringLiteral63(x)) {
            return escapeNewlines(x);
          } else {
            if (string63(x)) {
              return id(x, raw63);
            } else {
              if (boolean63(x)) {
                if (x) {
                  return "true";
                } else {
                  return "false";
                }
              } else {
                if (nan63(x)) {
                  return "nan";
                } else {
                  if (x === inf) {
                    return "inf";
                  } else {
                    if (x === _inf) {
                      return "-inf";
                    } else {
                      if (number63(x)) {
                        return x + "";
                      } else {
                        throw new Error("Cannot compile atom: " + str(x));
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  var terminator = (stmt63) => {
    if (! stmt63) {
      return "";
    } else {
      return ";\n";
    }
  };
  var compileSpecial = (form, stmt63) => {
    var ____id55 = form;
    var __x67 = ____id55[0];
    var __args14 = cut(____id55, 1);
    var ____id56 = getenv(__x67);
    var __special = ____id56["special"];
    var __stmt = ____id56["stmt"];
    var __selfTr63 = ____id56["tr"];
    var __tr = terminator(stmt63 && ! __selfTr63);
    return apply(__special, __args14) + __tr;
  };
  var parenthesizeCall63 = (x) => {
    return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
  };
  var compileCall = (f, args, parens63) => {
    var __f11 = compile(f);
    var __args141 = compileArgs(stash42(args));
    if (parens63 || parenthesizeCall63(f)) {
      return "(" + __f11 + ")" + __args141;
    } else {
      return __f11 + __args141;
    }
  };
  _G.compileCall = compileCall;
  var opDelims = (parent, child, ...__r194) => {
    var ____r194 = unstash(__r194);
    var __parent = destash33(parent, ____r194);
    var __child = destash33(child, ____r194);
    var ____id57 = ____r194;
    var __right = ____id57["right"];
    var __e60;
    if (__right) {
      __e60 = _6261;
    } else {
      __e60 = _62;
    }
    if (__e60(precedence(__child), precedence(__parent))) {
      return ["(", ")"];
    } else {
      return ["", ""];
    }
  };
  var compileInfix = (form) => {
    var ____id58 = form;
    var __op = ____id58[0];
    var ____id59 = cut(____id58, 1);
    var __a7 = ____id59[0];
    var __b3 = ____id59[1];
    var ____id60 = opDelims(form, __a7);
    var __ao = ____id60[0];
    var __ac = ____id60[1];
    var ____id61 = opDelims(form, __b3, {["_stash"]: true, ["right"]: true});
    var __bo = ____id61[0];
    var __bc = ____id61[1];
    var __a8 = compile(__a7);
    var __b4 = compile(__b3);
    var __op1 = getop(__op);
    if (unary63(form)) {
      return __op1 + __ao + " " + __a8 + __ac;
    } else {
      return __ao + __a8 + __ac + " " + __op1 + " " + __bo + __b4 + __bc;
    }
  };
  var compileFunction = (args, body, ...__r196) => {
    var ____r196 = unstash(__r196);
    var __args15 = destash33(args, ____r196);
    var __body34 = destash33(body, ____r196);
    var ____id62 = ____r196;
    var __name13 = ____id62["name"];
    var __prefix1 = ____id62["prefix"];
    var __infix = ____id62["infix"];
    var __tr1 = ____id62["tr"];
    var __id63 = either(__name13, "");
    var __args16 = compileArgs(__args15);
    indentLevel = indentLevel + 1;
    var ____x68 = compile(__body34, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body35 = ____x68;
    var __ind = indentation();
    var __e61;
    if (__infix) {
      __e61 = " " + __infix;
    } else {
      __e61 = "";
    }
    var __mid = __e61;
    var __e62;
    if (__prefix1) {
      __e62 = __prefix1 + " ";
    } else {
      __e62 = "";
    }
    var __p1 = __e62;
    var __tr2 = either(__tr1, "");
    return __p1 + __id63 + __args16 + __mid + " {\n" + __body35 + __ind + "}" + __tr2;
  };
  _G.compileFunction = compileFunction;
  var canReturn63 = (form) => {
    return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
  };
  var compile = (form, ...__r198) => {
    var ____r198 = unstash(__r198);
    var __form1 = destash33(form, ____r198);
    var ____id64 = ____r198;
    var __stmt1 = ____id64["stmt"];
    if (nil63(__form1)) {
      return "";
    } else {
      if (specialForm63(__form1)) {
        return compileSpecial(__form1, __stmt1);
      } else {
        var __tr3 = terminator(__stmt1);
        var __e63;
        if (__stmt1) {
          __e63 = indentation();
        } else {
          __e63 = "";
        }
        var __ind1 = __e63;
        var __e64;
        if (atom63(__form1)) {
          __e64 = compileAtom(__form1);
        } else {
          var __e65;
          if (infix63(hd(__form1))) {
            __e65 = compileInfix(__form1);
          } else {
            __e65 = compileCall(hd(__form1), tl(__form1));
          }
          __e64 = __e65;
        }
        var __form2 = __e64;
        return __ind1 + __form2 + __tr3;
      }
    }
  };
  _G.compile = compile;
  var lowerStatement = (form, tail63) => {
    var __hoist = [];
    var __e31 = lower(form, __hoist, true, tail63);
    var __e66;
    if (some63(__hoist) && is63(__e31)) {
      __e66 = join(["do"], __hoist, [__e31]);
    } else {
      var __e67;
      if (is63(__e31)) {
        __e67 = __e31;
      } else {
        var __e68;
        if (_35(__hoist) > 1) {
          __e68 = join(["do"], __hoist);
        } else {
          __e68 = hd(__hoist);
        }
        __e67 = __e68;
      }
      __e66 = __e67;
    }
    return either(__e66, ["do"]);
  };
  var lowerBody = (body, tail63) => {
    return lowerStatement(join(["do"], body), tail63);
  };
  var literal63 = (form) => {
    return atom63(form) || hd(form) === "%array" || hd(form) === "%object" || hd(form) === "%table";
  };
  var standalone63 = (form) => {
    return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) && !( "%statement" === hd(form)) && !( two63(form) && accessor63(form[1])) || idLiteral63(form);
  };
  var lowerDo = (args, hoist, stmt63, tail63) => {
    var ____x69 = almost(args);
    var ____i49 = 0;
    while (____i49 < _35(____x69)) {
      var __x70 = ____x69[____i49];
      var ____y5 = lower(__x70, hoist, stmt63);
      if (yes(____y5)) {
        var __e32 = ____y5;
        if (standalone63(__e32)) {
          add(hoist, __e32);
        }
      }
      ____i49 = ____i49 + 1;
    }
    var __e33 = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && canReturn63(__e33)) {
      return ["return", __e33];
    } else {
      return __e33;
    }
  };
  var lowerSet = (args, hoist, stmt63, tail63) => {
    var ____id65 = args;
    var __lh2 = ____id65[0];
    var __rh2 = ____id65[1];
    var __lh11 = lower(__lh2, hoist);
    var __rh11 = lower(__rh2, hoist);
    add(hoist, ["%set", __lh11, __rh11]);
    if (!( stmt63 && ! tail63)) {
      return __lh11;
    }
  };
  var lowerIf = (args, hoist, stmt63, tail63) => {
    var ____id66 = args;
    var __cond2 = ____id66[0];
    var __then = ____id66[1];
    var ___else = ____id66[2];
    if (stmt63) {
      var __e70;
      if (is63(___else)) {
        __e70 = [lowerBody([___else], tail63)];
      }
      return add(hoist, join(["%if", lower(__cond2, hoist), lowerBody([__then], tail63)], __e70));
    } else {
      var __e34 = unique("e");
      add(hoist, ["%local", __e34]);
      var __e69;
      if (is63(___else)) {
        __e69 = [lower(["%set", __e34, ___else])];
      }
      add(hoist, join(["%if", lower(__cond2, hoist), lower(["%set", __e34, __then])], __e69));
      return __e34;
    }
  };
  var lowerShort = (x, args, hoist) => {
    var ____id67 = args;
    var __a9 = ____id67[0];
    var __b5 = ____id67[1];
    var __hoist1 = [];
    var __b11 = lower(__b5, __hoist1);
    if (some63(__hoist1)) {
      var __id68 = unique("id");
      var __e71;
      if (x === "and") {
        __e71 = ["%if", __id68, __b5, __id68];
      } else {
        __e71 = ["%if", __id68, __id68, __b5];
      }
      return lower(["do", ["%local", __id68, __a9], __e71], hoist);
    } else {
      return [x, lower(__a9, hoist), __b11];
    }
  };
  var lowerTry = (args, hoist, tail63) => {
    return add(hoist, ["%try", lowerBody(args, tail63)]);
  };
  var lowerConditionCase = (__x71, hoist, stmt63, tail63) => {
    var ____id69 = __x71;
    var ___var2 = ____id69[0];
    var __form3 = ____id69[1];
    var __clauses2 = cut(____id69, 2);
    if (stmt63) {
      return add(hoist, join(["%condition-case", ___var2, lowerBody(["do", __form3], tail63)], map((__x72) => {
        var ____id70 = __x72;
        var __which1 = ____id70[0];
        var __body36 = cut(____id70, 1);
        if (__which1 === "finally") {
          return [__which1, lowerBody(__body36)];
        } else {
          var ____id71 = __body36;
          var __x73 = ____id71[0];
          var __args17 = cut(____id71, 1);
          return [__which1, lower(__x73), lowerBody(__args17, tail63)];
        }
      }, __clauses2)));
    } else {
      var __e35 = unique("e");
      add(hoist, ["%local", __e35]);
      add(hoist, join(["%condition-case", ___var2, lower(["%set", __e35, __form3])], map((__x74) => {
        var ____id72 = __x74;
        var __which2 = ____id72[0];
        var __body37 = cut(____id72, 1);
        if (__which2 === "finally") {
          return [__which2, lowerBody(__body37)];
        } else {
          var ____id73 = __body37;
          var __x75 = ____id73[0];
          var __args18 = cut(____id73, 1);
          return [__which2, lower(__x75), lower(["%set", __e35, join(["do"], __args18)])];
        }
      }, __clauses2)));
      return __e35;
    }
  };
  _G.lowerConditionCase = lowerConditionCase;
  var lowerWhile = (args, hoist) => {
    var ____id74 = args;
    var __c5 = ____id74[0];
    var __body38 = cut(____id74, 1);
    var __pre = [];
    var __c6 = lower(__c5, __pre);
    var __e72;
    if (none63(__pre)) {
      __e72 = ["while", __c6, lowerBody(__body38)];
    } else {
      __e72 = ["while", true, join(["do"], __pre, [["%if", ["not", __c6], ["break"]], lowerBody(__body38)])];
    }
    return add(hoist, __e72);
  };
  var lowerFor = (args, hoist) => {
    var ____id75 = args;
    var __t4 = ____id75[0];
    var __k37 = ____id75[1];
    var __body39 = cut(____id75, 2);
    return add(hoist, ["%for", lower(__t4, hoist), __k37, lowerBody(__body39)]);
  };
  var lowerTable = (args, hoist, stmt63, tail63) => {
    var __expr3 = join(["%table"], keys(args));
    var ____x76 = args;
    var ____i50 = 0;
    while (____i50 < _35(____x76)) {
      var __x77 = ____x76[____i50];
      if (atom63(__x77)) {
        add(__expr3, __x77);
      } else {
        if (_35(__x77) <= 2) {
          var ____id76 = __x77;
          var __name14 = ____id76[0];
          var __v27 = ____id76[1];
          add(__expr3, [lower(__name14, hoist), lower(__v27, hoist)]);
        } else {
          var ____id77 = __x77;
          var __prefix2 = ____id77[0];
          var __name15 = ____id77[1];
          var __args19 = ____id77[2];
          var __body40 = cut(____id77, 3);
          if (some63(__body40)) {
            add(__expr3, [__prefix2, lower(__name15, hoist), __args19, lowerBody(__body40, true)]);
          } else {
            add(__expr3, [__prefix2, lower(__name15, hoist), lower(__args19, hoist)]);
          }
        }
      }
      ____i50 = ____i50 + 1;
    }
    return __expr3;
  };
  _G.lowerTable = lowerTable;
  var lowerClass = (__x78, hoist, stmt63, tail63) => {
    var ____id78 = __x78;
    var __x79 = ____id78[0];
    var __body41 = cut(____id78, 1);
    var __body42 = tl(lowerTable(__body41, hoist));
    var ____id79 = __x79;
    var __name16 = ____id79[0];
    var __parent1 = ____id79[1];
    var __parent11 = lower(__parent1, hoist);
    var __expr4 = join(["%class", [__name16, __parent11]], __body42);
    if (stmt63 && ! tail63) {
      return add(hoist, ["%local", __name16, __expr4]);
    } else {
      return __expr4;
    }
  };
  _G.lowerClass = lowerClass;
  var lowerFunction = (args) => {
    var ____id80 = args;
    var __a10 = ____id80[0];
    var __body43 = cut(____id80, 1);
    return ["%function", __a10, lowerBody(__body43, true)];
  };
  var lowerDefinition = (kind, args, hoist) => {
    var ____id81 = args;
    var __name17 = ____id81[0];
    var __args20 = ____id81[1];
    var __body44 = cut(____id81, 2);
    return add(hoist, [kind, __name17, __args20, lowerBody(__body44, true)]);
  };
  var lowerCall = (form, hoist) => {
    var __form4 = map((x) => {
      return lower(x, hoist);
    }, form);
    if (some63(__form4)) {
      return __form4;
    }
  };
  var pairwise63 = (form) => {
    return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
  };
  var lowerPairwise = (form) => {
    if (pairwise63(form)) {
      var __e36 = [];
      var ____id82 = form;
      var __x80 = ____id82[0];
      var __args21 = cut(____id82, 1);
      reduce((a, b) => {
        add(__e36, [__x80, a, b]);
        return a;
      }, __args21);
      return join(["and"], reverse(__e36));
    } else {
      return form;
    }
  };
  var lowerInfix63 = (form) => {
    return infix63(hd(form)) && _35(form) > 3;
  };
  var lowerInfix = (form, hoist) => {
    var __form5 = lowerPairwise(form);
    var ____id83 = __form5;
    var __x81 = ____id83[0];
    var __args22 = cut(____id83, 1);
    return lower(reduce((a, b) => {
      return [__x81, b, a];
    }, reverse(__args22)), hoist);
  };
  var lowerSpecial = (__x82, hoist) => {
    var ____id84 = __x82;
    var __name18 = ____id84[0];
    var __args23 = cut(____id84, 1);
    var __args151 = map((x) => {
      return lower(x, hoist);
    }, __args23);
    var __form6 = join([__name18], __args151);
    return add(hoist, __form6);
  };
  var lower = (form, hoist, stmt63, tail63) => {
    if (atom63(form)) {
      return form;
    } else {
      if (empty63(form)) {
        return ["%array"];
      } else {
        if (nil63(hoist)) {
          return lowerStatement(form);
        } else {
          if (lowerInfix63(form)) {
            return lowerInfix(form, hoist);
          } else {
            var ____id85 = form;
            var __x83 = ____id85[0];
            var __args24 = cut(____id85, 1);
            if (__x83 === "do") {
              return lowerDo(__args24, hoist, stmt63, tail63);
            } else {
              if (__x83 === "%call") {
                return lower(__args24, hoist, stmt63, tail63);
              } else {
                if (__x83 === "%set") {
                  return lowerSet(__args24, hoist, stmt63, tail63);
                } else {
                  if (__x83 === "%if") {
                    return lowerIf(__args24, hoist, stmt63, tail63);
                  } else {
                    if (__x83 === "%try") {
                      return lowerTry(__args24, hoist, tail63);
                    } else {
                      if (__x83 === "%condition-case") {
                        return lowerConditionCase(__args24, hoist, stmt63, tail63);
                      } else {
                        if (__x83 === "while") {
                          return lowerWhile(__args24, hoist);
                        } else {
                          if (__x83 === "%for") {
                            return lowerFor(__args24, hoist);
                          } else {
                            if (__x83 === "%table") {
                              return lowerTable(__args24, hoist, stmt63, tail63);
                            } else {
                              if (__x83 === "%class") {
                                return lowerClass(__args24, hoist, stmt63, tail63);
                              } else {
                                if (__x83 === "%function") {
                                  return lowerFunction(__args24);
                                } else {
                                  if (__x83 === "%local-function" || __x83 === "%global-function") {
                                    return lowerDefinition(__x83, __args24, hoist);
                                  } else {
                                    if (in63(__x83, ["and", "or"])) {
                                      return lowerShort(__x83, __args24, hoist);
                                    } else {
                                      if (statement63(__x83)) {
                                        return lowerSpecial(form, hoist);
                                      } else {
                                        return lowerCall(form, hoist);
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  _G.lower = lower;
  var expand = (form) => {
    return lower(macroexpand(form));
  };
  _G.expand = expand;
  var vm = require("vm");
  var context = (ctx) => {
    var __sandbox = vm.createContext(ctx);
    __sandbox._G = __sandbox;
    return __sandbox;
  };
  var sandbox = context(_G);
  var run = (code, sandbox) => {
    return vm.runInContext(code, sandbox || _G);
  };
  var _eval = (form) => {
    var __code = compile(expand(["%set", "%result", form]));
    return run(__code);
  };
  _G["eval"] = _eval;
  var immediateCall63 = (x) => {
    return obj63(x) && obj63(hd(x)) && hd(hd(x)) === "%function";
  };
  _G.immediateCall63 = immediateCall63;
  setenv("%call", {["_stash"]: true, ["special"]: (f, ...__r233) => {
    var ____r233 = unstash(__r233);
    var __f2 = destash33(f, ____r233);
    var ____id86 = ____r233;
    var __args25 = cut(____id86, 0);
    return compileCall(__f2, __args25);
  }});
  setenv("%brackets", {["_stash"]: true, ["special"]: (...args) => {
    var __args26 = unstash(args);
    return "[" + inner(compileArgs(__args26)) + "]";
  }});
  setenv("do", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms = unstash(forms);
    var __s5 = "";
    var ____x84 = __forms;
    var ____i51 = 0;
    while (____i51 < _35(____x84)) {
      var __x85 = ____x84[____i51];
      __s5 = __s5 + compile(__x85, {["_stash"]: true, ["stmt"]: true});
      if (! atom63(__x85)) {
        if (hd(__x85) === "return" || hd(__x85) === "break") {
          break;
        }
      }
      ____i51 = ____i51 + 1;
    }
    return __s5;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%if", {["_stash"]: true, ["special"]: (cond, cons, alt) => {
    var __cond3 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x86 = compile(cons, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __cons = ____x86;
    var __e73;
    if (alt) {
      indentLevel = indentLevel + 1;
      var ____x87 = compile(alt, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      __e73 = ____x87;
    }
    var __alt = __e73;
    var __ind2 = indentation();
    var __s6 = "";
    __s6 = __s6 + __ind2 + "if (" + __cond3 + ") {\n" + __cons + __ind2 + "}";
    if (__alt) {
      __s6 = __s6 + " else {\n" + __alt + __ind2 + "}";
    }
    return __s6 + "\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("while", {["_stash"]: true, ["special"]: (cond, form) => {
    var __cond4 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x88 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body45 = ____x88;
    var __ind3 = indentation();
    return __ind3 + "while (" + __cond4 + ") {\n" + __body45 + __ind3 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%for", {["_stash"]: true, ["special"]: (t, k, form) => {
    var __t5 = compile(t);
    var __ind4 = indentation();
    indentLevel = indentLevel + 1;
    var ____x89 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body46 = ____x89;
    return __ind4 + "for (" + k + " in " + __t5 + ") {\n" + __body46 + __ind4 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%try", {["_stash"]: true, ["special"]: (form) => {
    var __e37 = unique("e");
    var __ind5 = indentation();
    indentLevel = indentLevel + 1;
    var ____x90 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body47 = ____x90;
    var __hf = ["return", ["%array", false, __e37]];
    indentLevel = indentLevel + 1;
    var ____x91 = compile(__hf, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __h = ____x91;
    return __ind5 + "try {\n" + __body47 + __ind5 + "}\n" + __ind5 + "catch (" + __e37 + ") {\n" + __h + __ind5 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%condition-case", {["_stash"]: true, ["special"]: (e, form, ...__r238) => {
    var ____r238 = unstash(__r238);
    var __e38 = destash33(e, ____r238);
    var __form7 = destash33(form, ____r238);
    var ____id87 = ____r238;
    var __clauses3 = cut(____id87, 0);
    var __ind6 = indentation();
    indentLevel = indentLevel + 1;
    var ____x92 = compile(__form7, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body48 = ____x92;
    var __str = __ind6 + "try {\n" + __body48 + __ind6 + "}";
    var __form8 = [];
    var ____x93 = __clauses3;
    var ____i52 = 0;
    while (____i52 < _35(____x93)) {
      var __x94 = ____x93[____i52];
      if (hd(__x94) === "catch") {
        var ____id88 = __x94;
        var ___2 = ____id88[0];
        var __type1 = ____id88[1];
        var __body49 = ____id88[2];
        var __e74;
        if (boolean63(__type1)) {
          __e74 = __type1;
        } else {
          __e74 = ["instanceof", __e38, __type1];
        }
        add(__form8, __e74);
        add(__form8, __body49);
      }
      ____i52 = ____i52 + 1;
    }
    if (! none63(__form8)) {
      add(__form8, ["%throw", __e38]);
      var __expr5 = hd(expandIf(__form8));
      indentLevel = indentLevel + 1;
      var ____x95 = compile(__expr5, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h1 = ____x95;
      __str = __str + " catch (" + __e38 + ") {\n" + __h1 + __ind6 + "}";
    }
    var __clause = first((x) => {
      if (hd(x) === "finally") {
        return x;
      }
    }, __clauses3);
    if (__clause) {
      var __body50 = tl(__clause);
      indentLevel = indentLevel + 1;
      var ____x96 = compile(join(["do"], __body50), {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h2 = ____x96;
      __str = __str + " finally {\n" + __h2 + __ind6 + "}";
    }
    __str = __str + "\n";
    return __str;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%delete", {["_stash"]: true, ["special"]: (place) => {
    return indentation() + "delete " + compile(place);
  }, ["stmt"]: true});
  setenv("break", {["_stash"]: true, ["special"]: () => {
    return indentation() + "break";
  }, ["stmt"]: true});
  setenv("%function", {["_stash"]: true, ["special"]: (args, body) => {
    return compileFunction(args, body, {["_stash"]: true, ["infix"]: "=>"});
  }});
  setenv("%global-function", {["_stash"]: true, ["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%local-function", {["_stash"]: true, ["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("return", {["_stash"]: true, ["special"]: (x) => {
    var __e75;
    if (nil63(x)) {
      __e75 = "return";
    } else {
      __e75 = "return " + compile(x);
    }
    var __x97 = __e75;
    return indentation() + __x97;
  }, ["stmt"]: true});
  setenv("async", {["_stash"]: true, ["special"]: (...x) => {
    var __x98 = unstash(x);
    if (_35(__x98) > 1) {
      return compile(join([["async", hd(__x98)]], tl(__x98)));
    } else {
      return "async " + compile(hd(__x98));
    }
  }});
  setenv("await", {["_stash"]: true, ["special"]: (...x) => {
    var __x99 = unstash(x);
    if (_35(__x99) > 1) {
      return compile(join([["await", hd(__x99)]], tl(__x99)));
    } else {
      return "await (" + compile(hd(__x99)) + ")";
    }
  }});
  setenv("new", {["_stash"]: true, ["special"]: (...x) => {
    var __x100 = unstash(x);
    if (_35(__x100) > 1) {
      return compile(join([["new", hd(__x100)]], tl(__x100)));
    } else {
      return "new " + compile(hd(__x100));
    }
  }});
  setenv("instanceof", {["_stash"]: true, ["special"]: (a, b) => {
    return "(" + compile(a) + " instanceof " + compile(b) + ")";
  }});
  setenv("typeof", {["_stash"]: true, ["special"]: (x) => {
    return "typeof(" + compile(x) + ")";
  }});
  setenv("%throw", {["_stash"]: true, ["special"]: (x) => {
    return indentation() + "throw " + compile(x);
  }, ["stmt"]: true});
  setenv("error", {["_stash"]: true, ["special"]: (x) => {
    var __e39 = "throw " + compile(["new", ["Error", x]]);
    return indentation() + __e39;
  }, ["stmt"]: true});
  setenv("%local", {["_stash"]: true, ["special"]: (name, value) => {
    var __id89 = compile(name);
    var __value1 = compile(value);
    var __e76;
    if (is63(value)) {
      __e76 = " = " + __value1;
    } else {
      __e76 = "";
    }
    var __rh3 = __e76;
    var __keyword = "var ";
    var __ind7 = indentation();
    return __ind7 + __keyword + __id89 + __rh3;
  }, ["stmt"]: true});
  setenv("%set", {["_stash"]: true, ["special"]: (lh, rh) => {
    var __lh3 = compile(lh);
    var __e77;
    if (nil63(rh)) {
      __e77 = "nil";
    } else {
      __e77 = rh;
    }
    var __rh4 = compile(__e77);
    return indentation() + __lh3 + " = " + __rh4;
  }, ["stmt"]: true});
  setenv("get", {["_stash"]: true, ["special"]: (t, k) => {
    var __t11 = compile(t);
    var __k111 = compile(k);
    if (infixOperator63(t)) {
      __t11 = "(" + __t11 + ")";
    }
    if (stringLiteral63(k) && validId63(inner(k))) {
      return __t11 + "." + inner(k);
    } else {
      return __t11 + "[" + __k111 + "]";
    }
  }});
  setenv("%array", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms1 = unstash(forms);
    var __open = "[";
    var __close = "]";
    var __s7 = "";
    var __c7 = "";
    var ____o27 = __forms1;
    var __k38 = undefined;
    for (__k38 in ____o27) {
      var __v28 = ____o27[__k38];
      var __e78;
      if (numeric63(__k38)) {
        __e78 = parseInt(__k38);
      } else {
        __e78 = __k38;
      }
      var __k39 = __e78;
      if (number63(__k39)) {
        __s7 = __s7 + __c7 + compile(__v28);
        __c7 = ", ";
      }
    }
    return __open + __s7 + __close;
  }});
  setenv("%object", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms2 = unstash(forms);
    var __s8 = "{";
    var __c8 = "";
    var __sep = ": ";
    var ____x101 = pair(__forms2);
    var ____i54 = 0;
    while (____i54 < _35(____x101)) {
      var ____id90 = ____x101[____i54];
      var __k40 = ____id90[0];
      var __v29 = ____id90[1];
      __s8 = __s8 + __c8 + key(__k40) + __sep + compile(__v29);
      __c8 = ", ";
      ____i54 = ____i54 + 1;
    }
    return __s8 + "}";
  }});
  setenv("%table", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms3 = unstash(forms);
    var __s9 = "{\n";
    var __c9 = "";
    var __sep1 = ": ";
    var __comma = either(__forms3.comma, ", ");
    indentLevel = indentLevel + 1;
    var __ind8 = indentation();
    var ____x103 = __forms3;
    var ____i55 = 0;
    while (____i55 < _35(____x103)) {
      var __x104 = ____x103[____i55];
      if (atom63(__x104)) {
        __s9 = __s9 + __c9 + __ind8 + key(__x104) + __sep1 + compile(__x104);
      } else {
        if (_35(__x104) <= 2) {
          var ____id91 = __x104;
          var __name19 = ____id91[0];
          var __v30 = ____id91[1];
          __s9 = __s9 + __c9 + __ind8 + key(__name19) + __sep1 + compile(__v30);
        } else {
          var ____id92 = __x104;
          var __prefix3 = ____id92[0];
          var __name20 = ____id92[1];
          var __args27 = ____id92[2];
          var __body51 = cut(____id92, 3);
          var __e79;
          if (in63(__prefix3, ["define", "def"])) {
            __e79 = "";
          } else {
            __e79 = __prefix3;
          }
          var __prefix4 = __e79;
          var __e80;
          if (some63(__body51)) {
            __e80 = compileFunction(__args27, join(["do"], __body51), {["_stash"]: true, ["name"]: key(__name20), ["prefix"]: __prefix4});
          } else {
            __e80 = key(__name20) + __sep1 + compile(__args27);
          }
          var __h3 = __e80;
          __s9 = __s9 + __c9 + __ind8 + __h3;
        }
      }
      __c9 = inner(__comma) + "\n";
      ____i55 = ____i55 + 1;
    }
    var ____x102;
    indentLevel = indentLevel - 1;
    return __s9 + "\n" + indentation() + "}";
  }});
  setenv("%class", {["_stash"]: true, ["special"]: (name, ...__r253) => {
    var ____r253 = unstash(__r253);
    var __name21 = destash33(name, ____r253);
    var ____id93 = ____r253;
    var __body52 = cut(____id93, 0);
    var __e81;
    if (atom63(__name21)) {
      __e81 = [__name21];
    } else {
      __e81 = __name21;
    }
    var ____id94 = __e81;
    var __name22 = ____id94[0];
    var __parent2 = ____id94[1];
    var __e82;
    if (__name22) {
      __e82 = [__name22, "\" \""];
    } else {
      __e82 = [];
    }
    var __name23 = __e82;
    var __e83;
    if (__parent2) {
      __e83 = ["\"extends \"", __parent2, "\" \""];
    } else {
      __e83 = [];
    }
    var __ext = __e83;
    return compile(join(["%literal", "\"class \""], __name23, __ext, [join({[0]: "%table", ["comma"]: "\"\""}, __body52)]));
  }});
  setenv("%literal", {["_stash"]: true, ["special"]: (...args) => {
    var __args28 = unstash(args);
    var __s10 = "";
    var ____x105 = __args28;
    var ____i56 = 0;
    while (____i56 < _35(____x105)) {
      var __x106 = ____x105[____i56];
      if (stringLiteral63(__x106)) {
        __s10 = __s10 + _eval(__x106);
      } else {
        __s10 = __s10 + compile(__x106);
      }
      ____i56 = ____i56 + 1;
    }
    return __s10;
  }});
  setenv("%statement", {["_stash"]: true, ["special"]: (...args) => {
    var __args29 = unstash(args);
    var __s111 = indentation();
    var ____x107 = __args29;
    var ____i57 = 0;
    while (____i57 < _35(____x107)) {
      var __x108 = ____x107[____i57];
      if (stringLiteral63(__x108)) {
        __s111 = __s111 + _eval(__x108);
      } else {
        __s111 = __s111 + compile(__x108);
      }
      ____i57 = ____i57 + 1;
    }
    __s111 = __s111 + "\n";
    return __s111;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%indentation", {["_stash"]: true, ["special"]: () => {
    return indentation();
  }});
  setenv("%spread", {["_stash"]: true, ["special"]: (x) => {
    return "..." + compile(x);
  }});
  __exports.context = context;
  __exports.sandbox = sandbox;
  __exports.run = run;
  __exports["eval"] = _eval;
  __exports.expand = expand;
  __exports.compile = compile;
  _G.compiler = __exports;
  var __exports1 = {};
  var __self1 = __exports1;
  var __module1 = {["exports"]: __exports1};
  delimiters = {["{"]: true, ["}"]: true, ["["]: true, ["]"]: true, ["("]: true, [")"]: true, [";"]: true, ["\r"]: true, ["\n"]: true};
  _G.delimiters = delimiters;
  whitespace = {[" "]: true, ["\t"]: true, ["\r"]: true, ["\n"]: true};
  _G.whitespace = whitespace;
  var stream = (str, more) => {
    var __s121 = {["pos"]: 0, ["string"]: str, ["len"]: _35(str)};
    if (is63(more)) {
      __s121.more = more;
    }
    return __s121;
  };
  _G.stream = stream;
  var peekChar = (s) => {
    if (s.pos < s.len) {
      return char(s.string, s.pos);
    }
  };
  _G.peekChar = peekChar;
  var readChar = (s) => {
    var __c10 = peekChar(s);
    if (__c10) {
      s.pos = s.pos + 1;
      return __c10;
    }
  };
  _G.readChar = readChar;
  var skipNonCode = (s) => {
    while (true) {
      var __c111 = peekChar(s);
      if (nil63(__c111)) {
        break;
      } else {
        if (whitespace[__c111]) {
          readChar(s);
        } else {
          if (__c111 === ";") {
            while (__c111 && !( __c111 === "\n")) {
              __c111 = readChar(s);
            }
            skipNonCode(s);
          } else {
            break;
          }
        }
      }
    }
  };
  _G.skipNonCode = skipNonCode;
  readTable = {};
  _G.readTable = readTable;
  eof = {};
  _G.eof = eof;
  var read = (s) => {
    skipNonCode(s);
    var __c121 = peekChar(s);
    if (is63(__c121)) {
      return (readTable[__c121] || readTable[""])(s);
    } else {
      return eof;
    }
  };
  _G.read = read;
  var readAll = (s) => {
    var __l8 = [];
    while (true) {
      var __form9 = read(s);
      if (__form9 === eof) {
        break;
      }
      add(__l8, __form9);
    }
    return __l8;
  };
  _G.readAll = readAll;
  var readString = (str, more) => {
    var __x109 = read(stream(str, more));
    if (!( __x109 === eof)) {
      return __x109;
    }
  };
  _G.readString = readString;
  var key63 = (atom) => {
    return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
  };
  var expected = (s, c) => {
    var ____id95 = s;
    var __more = ____id95["more"];
    var __pos = ____id95["pos"];
    var __id96 = __more;
    var __e84;
    if (__id96) {
      __e84 = __id96;
    } else {
      throw new Error("Expected " + c + " at " + __pos);
      __e84 = undefined;
    }
    return __e84;
  };
  _G.expected = expected;
  var wrap = (s, x) => {
    var __y6 = read(s);
    if (__y6 === s.more) {
      return __y6;
    } else {
      return [x, __y6];
    }
  };
  _G.wrap = wrap;
  var hexPrefix63 = (str) => {
    var __e85;
    if (code(str, 0) === 45) {
      __e85 = 1;
    } else {
      __e85 = 0;
    }
    var __i58 = __e85;
    var __id97 = code(str, __i58) === 48;
    var __e86;
    if (__id97) {
      __i58 = __i58 + 1;
      var __n37 = code(str, __i58);
      __e86 = __n37 === 120 || __n37 === 88;
    } else {
      __e86 = __id97;
    }
    return __e86;
  };
  _G.hexPrefix63 = hexPrefix63;
  var maybeNumber = (str) => {
    if (hexPrefix63(str)) {
      return parseInt(str, 16);
    } else {
      if (numberCode63(code(str, edge(str))) && !( code(str, 0) === 46)) {
        return number(str);
      }
    }
  };
  _G.maybeNumber = maybeNumber;
  var real63 = (x) => {
    return number63(x) && ! nan63(x) && ! inf63(x);
  };
  _G.real63 = real63;
  readTable[""] = (s) => {
    var __str1 = "";
    while (true) {
      var __c13 = peekChar(s);
      if (__c13 && (! whitespace[__c13] && ! delimiters[__c13])) {
        if (__c13 === "\\") {
          __str1 = __str1 + readChar(s);
        }
        __str1 = __str1 + readChar(s);
      } else {
        break;
      }
    }
    if (__str1 === "true") {
      return true;
    } else {
      if (__str1 === "false") {
        return false;
      } else {
        var __n38 = maybeNumber(__str1);
        if (real63(__n38)) {
          return __n38;
        } else {
          return __str1;
        }
      }
    }
  };
  readTable["("] = (s) => {
    readChar(s);
    var __r271 = undefined;
    var __l9 = [];
    while (nil63(__r271)) {
      skipNonCode(s);
      var __c14 = peekChar(s);
      if (__c14 === ")") {
        readChar(s);
        __r271 = __l9;
      } else {
        if (nil63(__c14)) {
          __r271 = expected(s, ")");
        } else {
          var __x110 = read(s);
          if (key63(__x110)) {
            var __k41 = clip(__x110, 0, edge(__x110));
            var __v31 = read(s);
            __l9[__k41] = __v31;
          } else {
            add(__l9, __x110);
          }
        }
      }
    }
    return __r271;
  };
  readTable[")"] = (s) => {
    throw new Error("Unexpected ) at " + s.pos);
  };
  readTable["["] = (s) => {
    readChar(s);
    var __r274 = undefined;
    var __l10 = [];
    while (nil63(__r274)) {
      skipNonCode(s);
      var __c15 = peekChar(s);
      if (__c15 === "]") {
        readChar(s);
        __r274 = join(["brackets"], __l10);
      } else {
        if (nil63(__c15)) {
          __r274 = expected(s, "]");
        } else {
          var __x1111 = read(s);
          add(__l10, __x1111);
        }
      }
    }
    return __r274;
  };
  readTable["]"] = (s) => {
    throw new Error("Unexpected ] at " + s.pos);
  };
  readTable["{"] = (s) => {
    readChar(s);
    var __r277 = undefined;
    var __l111 = [];
    while (nil63(__r277)) {
      skipNonCode(s);
      var __c16 = peekChar(s);
      if (__c16 === "}") {
        readChar(s);
        __r277 = join(["braces"], __l111);
      } else {
        if (nil63(__c16)) {
          __r277 = expected(s, "}");
        } else {
          var __x112 = read(s);
          add(__l111, __x112);
        }
      }
    }
    return __r277;
  };
  readTable["}"] = (s) => {
    throw new Error("Unexpected } at " + s.pos);
  };
  readTable["\""] = (s) => {
    readChar(s);
    var __r280 = undefined;
    var __str2 = "\"";
    while (nil63(__r280)) {
      var __c17 = peekChar(s);
      if (__c17 === "\"") {
        __r280 = __str2 + readChar(s);
      } else {
        if (nil63(__c17)) {
          __r280 = expected(s, "\"");
        } else {
          if (__c17 === "\\") {
            __str2 = __str2 + readChar(s);
          }
          __str2 = __str2 + readChar(s);
        }
      }
    }
    return __r280;
  };
  readTable["|"] = (s) => {
    readChar(s);
    var __r282 = undefined;
    var __str3 = "|";
    while (nil63(__r282)) {
      var __c18 = peekChar(s);
      if (__c18 === "|") {
        __r282 = __str3 + readChar(s);
      } else {
        if (nil63(__c18)) {
          __r282 = expected(s, "|");
        } else {
          __str3 = __str3 + readChar(s);
        }
      }
    }
    return __r282;
  };
  readTable["'"] = (s) => {
    readChar(s);
    return wrap(s, "quote");
  };
  readTable["`"] = (s) => {
    readChar(s);
    return wrap(s, "quasiquote");
  };
  readTable[","] = (s) => {
    readChar(s);
    if (peekChar(s) === "@") {
      readChar(s);
      return wrap(s, "unquote-splicing");
    } else {
      return wrap(s, "unquote");
    }
  };
  readTable["?"] = (s) => {
    readChar(s);
    var __c19 = readChar(s);
    var __e87;
    if (__c19 === "\\") {
      __e87 = readChar(s);
    } else {
      __e87 = __c19;
    }
    var __c131 = __e87;
    return code(__c131);
  };
  readTable["#"] = (s) => {
    readChar(s);
    var __c20 = peekChar(s);
    if (__c20 === "'") {
      readChar(s);
      return wrap(s, "function");
    } else {
      s.pos = s.pos - 1;
      return readTable[""](s);
    }
  };
  __exports1.stream = stream;
  __exports1.read = read;
  __exports1.readAll = readAll;
  __exports1.readString = readString;
  __exports1.readTable = readTable;
  _G.reader = __exports1;
  var __exports2 = {};
  var __self2 = __exports2;
  var __module2 = {["exports"]: __exports2};
  var fs = require("fs");
  var childProcess = require("child_process");
  var path = require("path");
  var process = require("process");
  var readFile = (path, __x113) => {
    var __e88;
    if (is63(__x113)) {
      __e88 = __x113;
    } else {
      __e88 = "text";
    }
    var __mode = __e88;
    if (__mode === "text") {
      return fs.readFileSync(path, "utf8").replace(/\r/g, "");
    } else {
      return fs.readFileSync(path);
    }
  };
  var writeFile = (path, data) => {
    return fs.writeFileSync(path, data, "utf8");
  };
  var fileExists63 = (path) => {
    return fs.existsSync(path, "utf8") && fs.statSync(path).isFile();
  };
  var directoryExists63 = (path) => {
    return fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory();
  };
  var pathSeparator = path.sep;
  var pathJoin = (...parts) => {
    var __parts = unstash(parts);
    return reduce((x, y) => {
      return x + pathSeparator + y;
    }, __parts) || "";
  };
  var getEnvironmentVariable = (name) => {
    return process.env[name];
  };
  var setEnvironmentVariable = (name, value) => {
    process.env[name] = value;
    return process.env[name];
  };
  var write = (x, cb) => {
    var __out = process.stdout;
    return __out.write(x, cb);
  };
  var exit = (code) => {
    return process.exit(code);
  };
  var argv = cut(process.argv, 2);
  var reload = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
  };
  var shell = (command) => {
    return childProcess.execSync(command).toString();
  };
  __exports2.readFile = readFile;
  __exports2.writeFile = writeFile;
  __exports2.fileExists63 = fileExists63;
  __exports2.directoryExists63 = directoryExists63;
  __exports2.pathSeparator = pathSeparator;
  __exports2.pathJoin = pathJoin;
  __exports2.getEnvironmentVariable = getEnvironmentVariable;
  __exports2.setEnvironmentVariable = setEnvironmentVariable;
  __exports2.write = write;
  __exports2.exit = exit;
  __exports2.argv = argv;
  __exports2.reload = reload;
  __exports2.shell = shell;
  _G.system = __exports2;
  var __exports3 = {};
  var __self3 = __exports3;
  var __module3 = {["exports"]: __exports3};
  var reader = _G.reader;
  var compiler = _G.compiler;
  var system = _G.system;
  var evalPrint = (form) => {
    var ____id98 = (() => {
      try {
        return [true, compiler["eval"](form)];
      }
      catch (__e92) {
        return [false, __e92];
      }
    })();
    var __ok1 = ____id98[0];
    var __v32 = ____id98[1];
    if (! __ok1) {
      return print(__v32.stack);
    } else {
      if (is63(__v32)) {
        return print(str(__v32));
      }
    }
  };
  var rep = (s) => {
    return evalPrint(reader.readString(s));
  };
  var repl = () => {
    var __buf = "";
    var rep1 = (s) => {
      __buf = __buf + s;
      var __more1 = [];
      var __form10 = reader.readString(__buf, __more1);
      if (!( __form10 === __more1)) {
        evalPrint(__form10);
        __buf = "";
        return system.write("> ");
      }
    };
    system.write("> ");
    var ___in = process.stdin;
    ___in.removeAllListeners();
    ___in.setEncoding("utf8");
    return ___in.on("data", rep1);
  };
  var ppToString = (body) => {
    if (atom63(body)) {
      return str(body);
    } else {
      if (empty63(body)) {
        return str(body);
      } else {
        var __s13 = "(";
        var ____x114 = body;
        var ____i59 = 0;
        while (____i59 < _35(____x114)) {
          var __x115 = ____x114[____i59];
          __s13 = __s13 + str(__x115) + "\n\n";
          ____i59 = ____i59 + 1;
        }
        return __s13 + ")";
      }
    }
  };
  _G.ppToString = ppToString;
  var pp = (body) => {
    print(ppToString(body));
    return body;
  };
  _G.pp = pp;
  var readFile = (path) => {
    var __s14 = reader.stream(system.readFile(path));
    var __body53 = reader.readAll(__s14);
    if (one63(__body53)) {
      return hd(__body53);
    } else {
      return join(["do"], __body53);
    }
  };
  _G.readFile = readFile;
  var expandFile = (path) => {
    var __body54 = readFile(path);
    return compiler.expand(__body54);
  };
  _G.expandFile = expandFile;
  var compileFile = (path) => {
    var __body55 = expandFile(path);
    var __form11 = compiler.expand(join(["do"], __body55));
    return compiler.compile(__form11, {["_stash"]: true, ["stmt"]: true});
  };
  _G.compileFile = compileFile;
  var load = (path) => {
    var __code1 = compileFile(path);
    var __prev = _G.exports || {};
    _G.exports = {};
    var __x116 = _G.exports;
    compiler.run(__code1);
    _G.exports = __prev;
    return __x116;
  };
  _G.load = load;
  var scriptFile63 = (path) => {
    return !( "-" === char(path, 0) || ".js" === clip(path, _35(path) - 3));
  };
  var runFile = (path) => {
    if (scriptFile63(path)) {
      return load(path);
    } else {
      return compiler.run(system.readFile(path));
    }
  };
  var usage = () => {
    print("usage: dax [<file> <arguments> | options <object files>]");
    print(" <file>\t\tProgram read from script file");
    print(" <arguments>\tPassed to program in system.argv");
    print(" <object files>\tLoaded before compiling <input>");
    print("options:");
    print(" -c <input>\tCompile input file");
    print(" -x <input>\tExpand input file");
    print(" -a <input>\tRead input file");
    print(" -o <output>\tOutput file");
    return print(" -e <expr>\tExpression to evaluate");
  };
  var main = () => {
    var __arg = hd(system.argv);
    if (__arg && scriptFile63(__arg)) {
      return load(__arg);
    } else {
      if (__arg === "-h" || __arg === "--help") {
        return usage();
      } else {
        var __pre1 = [];
        var __op2 = undefined;
        var __input = undefined;
        var __output = undefined;
        var __expr6 = undefined;
        var __argv = system.argv;
        var __i60 = 0;
        while (__i60 < _35(__argv)) {
          var __a11 = __argv[__i60];
          if (__a11 === "-c" || __a11 === "-x" || __a11 === "-a" || __a11 === "-o" || __a11 === "-t" || __a11 === "-e") {
            if (__i60 === edge(__argv)) {
              print("missing argument for " + __a11);
            } else {
              __i60 = __i60 + 1;
              var __val2 = __argv[__i60];
              if (__a11 === "-c") {
                __input = __val2;
                __op2 = "compile";
              } else {
                if (__a11 === "-x") {
                  __input = __val2;
                  __op2 = "expand";
                } else {
                  if (__a11 === "-a") {
                    __input = __val2;
                    __op2 = "read";
                  } else {
                    if (__a11 === "-o") {
                      __output = __val2;
                    } else {
                      if (__a11 === "-e") {
                        __expr6 = __val2;
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (!( "-" === char(__a11, 0))) {
              add(__pre1, __a11);
            }
          }
          __i60 = __i60 + 1;
        }
        var ____x117 = __pre1;
        var ____i61 = 0;
        while (____i61 < _35(____x117)) {
          var __file = ____x117[____i61];
          runFile(__file);
          ____i61 = ____i61 + 1;
        }
        if (nil63(__input)) {
          if (__expr6) {
            return rep(__expr6);
          } else {
            return repl();
          }
        } else {
          var __e89;
          if (__op2 === "expand") {
            __e89 = ppToString(expandFile(__input));
          } else {
            var __e90;
            if (__op2 === "read") {
              __e90 = ppToString(readFile(__input));
            } else {
              __e90 = compileFile(__input);
            }
            __e89 = __e90;
          }
          var __code2 = __e89;
          if (nil63(__output) || __output === "-") {
            return print(__code2);
          } else {
            return system.writeFile(__output, __code2);
          }
        }
      }
    }
  };
  __exports3.reader = reader;
  __exports3.compiler = compiler;
  __exports3.system = system;
  __exports3.evalPrint = evalPrint;
  __exports3.rep = rep;
  __exports3.repl = repl;
  __exports3.compileFile = compileFile;
  __exports3.load = load;
  __exports3.scriptFile63 = scriptFile63;
  __exports3.runFile = runFile;
  __exports3.usage = usage;
  __exports3.main = main;
  _G.main = __exports3;
  Object.assign(_G, _G.main);
  return _G;
};
var ____x118 = typeof(window);
if ("undefined" === ____x118) {
  module.exports.create = create;
} else {
  if (true) {
(function () {
  var vm = {};
  var contextifiedSandboxes = [];

  function createIFrame() {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    return iframe;
  }

  function createIFrameWithContext(sandbox) {
    var iframe = createIFrame();
    var key;
    document.body.appendChild(iframe);
    if (sandbox) {
      for (key in sandbox) {
        if (sandbox.hasOwnProperty(key)) {
          iframe.contentWindow[key] = sandbox[key];
        }
      }
      contextifiedSandboxes.push(sandbox);
    }
    return iframe;
  }

  function runCodeInNewContext(code, sandbox) {
    var iframe = createIFrameWithContext(sandbox);
    var result = iframe.contentWindow.eval(code);
    document.body.removeChild(iframe);
    return result;
  }

  function runCodeInContext(code, context) {
    if (!context) {
      throw new Error('Context cannot be undefined');
    }
    return context.eval(code);
  }

  function Script(code) {
    this.code = code;
  }

  Script.prototype.runInContext = function (context) {
    return runCodeInContext(this.code, context);
  };

  Script.prototype.runInNewContext = function (sandbox) {
    return runCodeInNewContext(this.code, sandbox);
  };

  Script.prototype.runInThisContext = function () {
    return runCodeInContext(this.code, window);
  };

  vm.Script = Script;

  vm.createContext = function (sandbox) {
    return createIFrameWithContext(sandbox).contentWindow;
  };

  vm.isContext = function (sandbox) {
    return contextifiedSandboxes.indexOf(sandbox) !== -1;
  };

  vm.runInContext = function (code, context) {
    return runCodeInContext(code, context);
  };

  vm.runInDebugContext = function () {
    throw new Error('vm.runInDebugContext(code) does not work in browsers');
  };

  vm.runInNewContext = function (code, sandbox) {
    return runCodeInNewContext(code, sandbox);
  };

  vm.runInThisContext = function (code) {
    return runCodeInContext(code, window);
  };
  
  vm.createScript = function (code) {
    return new vm.Script(code);
  };

  window.vm = window.vm || vm;
})();

;
    if (! window.require) {
      window.require = (x) => {
        return window.DAX.shims[x];
      };
    }
    window.DAX = Object.assign(window.DAX || {}, {["create"]: create, ["shims"]: {["fs"]: {}, ["child_process"]: {}, ["process"]: {["argv"]: []}, ["path"]: {["sep"]: ":"}, ["vm"]: window.vm}});
    window.dax = window.DAX.create(window.dax || {});
  }
}
