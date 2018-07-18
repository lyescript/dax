var create = (globals) => {
  var _G = Object.assign({}, globals || {});
  _G._G = _G;
  _G.environment = [{}];
  _G.caller = function () {
    return arguments.callee.caller;
  };
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
    var __e9;
    if (string63(x)) {
      __e9 = [];
    } else {
      __e9 = x;
    }
    var __t1 = fresh(__e9);
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
      var __e10;
      if (numeric63(__k10)) {
        __e10 = parseInt(__k10);
      } else {
        __e10 = __k10;
      }
      var __k11 = __e10;
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
      var __e11;
      if (numeric63(__k12)) {
        __e11 = parseInt(__k12);
      } else {
        __e11 = __k12;
      }
      var __k13 = __e11;
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
      var __e12;
      if (numeric63(____i14)) {
        __e12 = parseInt(____i14);
      } else {
        __e12 = ____i14;
      }
      var ____i141 = __e12;
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
          var __e13;
          if (numeric63(__k14)) {
            __e13 = parseInt(__k14);
          } else {
            __e13 = __k14;
          }
          var __k15 = __e13;
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
        var __e14;
        if (numeric63(__k16)) {
          __e14 = parseInt(__k16);
        } else {
          __e14 = __k16;
        }
        var __k17 = __e14;
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
      var __e15;
      if (__c === "\n") {
        __e15 = "\\n";
      } else {
        var __e16;
        if (__c === "\r") {
          __e16 = "\\r";
        } else {
          var __e17;
          if (__c === "\"") {
            __e17 = "\\\"";
          } else {
            var __e18;
            if (__c === "\\") {
              __e18 = "\\\\";
            } else {
              __e18 = __c;
            }
            __e17 = __e18;
          }
          __e16 = __e17;
        }
        __e15 = __e16;
      }
      var __c1 = __e15;
      __s1 = __s1 + __c1;
      __i22 = __i22 + 1;
    }
    return __s1 + "\"";
  };
  _G.escape = escape;
  var simpleId63 = (x) => {
    var __id3 = string63(x);
    var __e19;
    if (__id3) {
      var ____id = (() => {
        try {
          return [true, readString(x)];
        }
        catch (__e113) {
          return [false, __e113];
        }
      })();
      var __ok = ____id[0];
      var __v10 = ____id[1];
      __e19 = __ok && __v10 === x;
    } else {
      __e19 = __id3;
    }
    return __e19;
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
                            var __e20;
                            if (numeric63(__k18)) {
                              __e20 = parseInt(__k18);
                            } else {
                              __e20 = __k18;
                            }
                            var __k19 = __e20;
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
                            var __e21;
                            if (numeric63(____i24)) {
                              __e21 = parseInt(____i24);
                            } else {
                              __e21 = ____i24;
                            }
                            var ____i241 = __e21;
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
  var string = (...args) => {
    var __args = unstash(args);
    var __s11 = "";
    var ____x10 = __args;
    var ____i25 = 0;
    while (____i25 < _35(____x10)) {
      var __x11 = ____x10[____i25];
      var __e22;
      if (number63(__x11)) {
        __e22 = String.fromCharCode(__x11);
      } else {
        var __e23;
        if (string63(__x11)) {
          __e23 = __x11;
        } else {
          __e23 = str(__x11);
        }
        __e22 = __e23;
      }
      __s11 = __s11 + __e22;
      ____i25 = ____i25 + 1;
    }
    return __s11;
  };
  _G.string = string;
  var apply = (f, args) => {
    var __args11 = stash(args);
    return f.apply(f, __args11);
  };
  _G.apply = apply;
  var indirectFunction = (f) => {
    while (string63(f)) {
      f = _G[compile(f)];
    }
    return f;
  };
  _G.indirectFunction = indirectFunction;
  var call = (f, ...__r82) => {
    var ____r82 = unstash(__r82);
    var __f = destash33(f, ____r82);
    var ____id1 = ____r82;
    var __args2 = cut(____id1, 0);
    return apply(indirectFunction(__f), __args2);
  };
  _G.call = call;
  var setenv = (k, ...__r83) => {
    var ____r83 = unstash(__r83);
    var __k20 = destash33(k, ____r83);
    var ____id2 = ____r83;
    var __keys = cut(____id2, 0);
    if (string63(__k20)) {
      var __e24;
      if (__keys.toplevel) {
        __e24 = hd(_G.environment);
      } else {
        __e24 = last(_G.environment);
      }
      var __frame = __e24;
      var __entry = __frame[__k20] || {};
      var ____o13 = __keys;
      var __k21 = undefined;
      for (__k21 in ____o13) {
        var __v13 = ____o13[__k21];
        var __e25;
        if (numeric63(__k21)) {
          __e25 = parseInt(__k21);
        } else {
          __e25 = __k21;
        }
        var __k22 = __e25;
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
    var __args3 = unstash(args);
    return join(["do"], map((__x12) => {
      var ____id4 = __x12;
      var __lh = ____id4[0];
      var __rh = ____id4[1];
      return ["%set", __lh, __rh];
    }, pair(__args3)));
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
  setenv("case", {["_stash"]: true, ["macro"]: (expr, ...__r91) => {
    var ____r91 = unstash(__r91);
    var __expr = destash33(expr, ____r91);
    var ____id5 = ____r91;
    var __clauses = cut(____id5, 0);
    var __x13 = unique("x");
    var __eq = (_) => {
      if (_ === "else") {
        return true;
      } else {
        return ["=", _, __x13];
      }
    };
    var __cl = (__x14) => {
      var ____id6 = __x14;
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
    return ["let", __x13, __expr, join(["if"], apply(join, map(__cl, __clauses)))];
  }});
  setenv("when", {["_stash"]: true, ["macro"]: (cond, ...__r94) => {
    var ____r94 = unstash(__r94);
    var __cond = destash33(cond, ____r94);
    var ____id7 = ____r94;
    var __body2 = cut(____id7, 0);
    return ["if", __cond, join(["do"], __body2)];
  }});
  setenv("unless", {["_stash"]: true, ["macro"]: (cond, ...__r95) => {
    var ____r95 = unstash(__r95);
    var __cond1 = destash33(cond, ____r95);
    var ____id8 = ____r95;
    var __body3 = cut(____id8, 0);
    return ["if", ["not", __cond1], join(["do"], __body3)];
  }});
  setenv("obj", {["_stash"]: true, ["macro"]: (...body) => {
    var __body4 = unstash(body);
    return join(["%object"], mapo((x) => {
      return x;
    }, __body4));
  }});
  setenv("let", {["_stash"]: true, ["macro"]: (bs, ...__r97) => {
    var ____r97 = unstash(__r97);
    var __bs = destash33(bs, ____r97);
    var ____id9 = ____r97;
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
  setenv("with", {["_stash"]: true, ["macro"]: (x, v, ...__r98) => {
    var ____r98 = unstash(__r98);
    var __x15 = destash33(x, ____r98);
    var __v14 = destash33(v, ____r98);
    var ____id13 = ____r98;
    var __body6 = cut(____id13, 0);
    return join(["let", [__x15, __v14]], __body6, [__x15]);
  }});
  setenv("let-when", {["_stash"]: true, ["macro"]: (x, v, ...__r99) => {
    var ____r99 = unstash(__r99);
    var __x16 = destash33(x, ____r99);
    var __v15 = destash33(v, ____r99);
    var ____id14 = ____r99;
    var __body7 = cut(____id14, 0);
    var __y4 = unique("y");
    return ["let", __y4, __v15, ["when", ["yes", __y4], join(["let", [__x16, __y4]], __body7)]];
  }});
  setenv("void", {["_stash"]: true, ["macro"]: (...body) => {
    var __body8 = unstash(body);
    return join(["do"], __body8, [["do"]]);
  }});
  setenv("%setenv", {["_stash"]: true, ["macro"]: (name, ...__r100) => {
    var ____r100 = unstash(__r100);
    var __name = destash33(name, ____r100);
    var ____id15 = ____r100;
    var __keys1 = cut(____id15, 0);
    return ["void", join(["setenv", ["quote", __name]], __keys1)];
  }});
  setenv("define-macro", {["_stash"]: true, ["macro"]: (name, args, ...__r101) => {
    var ____r101 = unstash(__r101);
    var __name1 = destash33(name, ____r101);
    var __args4 = destash33(args, ____r101);
    var ____id16 = ____r101;
    var __body9 = cut(____id16, 0);
    return {[0]: "%setenv", [1]: __name1, ["macro"]: join(["fn", __args4], __body9)};
  }});
  setenv("define-special", {["_stash"]: true, ["macro"]: (name, args, ...__r102) => {
    var ____r102 = unstash(__r102);
    var __name2 = destash33(name, ____r102);
    var __args5 = destash33(args, ____r102);
    var ____id17 = ____r102;
    var __body10 = cut(____id17, 0);
    return join({[0]: "%setenv", [1]: __name2, ["special"]: join(["fn", __args5], __body10)}, keys(__body10));
  }});
  setenv("define-symbol-macro", {["_stash"]: true, ["macro"]: (name, expansion) => {
    return {[0]: "%setenv", [1]: name, ["symbol"]: ["quote", expansion]};
  }});
  setenv("define-reader", {["_stash"]: true, ["macro"]: (__x17, ...__r104) => {
    var ____id18 = __x17;
    var __char = ____id18[0];
    var __s2 = ____id18[1];
    var ____r104 = unstash(__r104);
    var ____x17 = destash33(__x17, ____r104);
    var ____id19 = ____r104;
    var __body11 = cut(____id19, 0);
    return ["set", ["read-table", ["brackets", __char]], join(["fn", [__s2]], __body11)];
  }});
  setenv("define", {["_stash"]: true, ["macro"]: (name, x, ...__r105) => {
    var ____r105 = unstash(__r105);
    var __name3 = destash33(name, ____r105);
    var __x18 = destash33(x, ____r105);
    var ____id20 = ____r105;
    var __body12 = cut(____id20, 0);
    setenv(__name3, {["_stash"]: true, ["variable"]: true});
    if (some63(__body12)) {
      return join(["%local-function", __name3], bind42(__x18, __body12));
    } else {
      return ["%local", __name3, __x18];
    }
  }});
  setenv("define-global", {["_stash"]: true, ["macro"]: (name, x, ...__r106) => {
    var ____r106 = unstash(__r106);
    var __name4 = destash33(name, ____r106);
    var __x19 = destash33(x, ____r106);
    var ____id21 = ____r106;
    var __body13 = cut(____id21, 0);
    setenv(__name4, {["_stash"]: true, ["toplevel"]: true, ["variable"]: true});
    if (some63(__body13)) {
      return ["do", join(["%global-function", __name4], bind42(__x19, __body13)), ["%set", ["_G", "." + __name4], __name4]];
    } else {
      return ["do", ["%set", __name4, __x19], ["%set", ["_G", "." + __name4], __name4]];
    }
  }});
  setenv("with-frame", {["_stash"]: true, ["macro"]: (...body) => {
    var __body14 = unstash(body);
    var __x20 = unique("x");
    return ["do", ["add", ["_G", ".environment"], ["obj"]], ["with", __x20, join(["do"], __body14), ["drop", ["_G", ".environment"]]]];
  }});
  setenv("with-bindings", {["_stash"]: true, ["macro"]: (__x21, ...__r107) => {
    var ____id22 = __x21;
    var __names = ____id22[0];
    var ____r107 = unstash(__r107);
    var ____x21 = destash33(__x21, ____r107);
    var ____id23 = ____r107;
    var __body15 = cut(____id23, 0);
    var __x22 = unique("x");
    return join(["with-frame", ["each", __x22, __names, ["if", ["default-assignment?", __x22], {[0]: "setenv", [1]: ["at", __x22, 1], ["variable"]: true}, {[0]: "setenv", [1]: __x22, ["variable"]: true}]]], __body15);
  }});
  setenv("let-macro", {["_stash"]: true, ["macro"]: (definitions, ...__r108) => {
    var ____r108 = unstash(__r108);
    var __definitions = destash33(definitions, ____r108);
    var ____id24 = ____r108;
    var __body16 = cut(____id24, 0);
    add(_G.environment, {});
    map((m) => {
      return _eval(join(["define-macro"], m));
    }, __definitions);
    var ____x23 = join(["do"], macroexpand(__body16));
    drop(_G.environment);
    return ____x23;
  }});
  setenv("let-symbol", {["_stash"]: true, ["macro"]: (expansions, ...__r110) => {
    var ____r110 = unstash(__r110);
    var __expansions = destash33(expansions, ____r110);
    var ____id25 = ____r110;
    var __body17 = cut(____id25, 0);
    add(_G.environment, {});
    map((__x25) => {
      var ____id26 = __x25;
      var __name5 = ____id26[0];
      var __exp = ____id26[1];
      return _eval(["define-symbol-macro", __name5, __exp]);
    }, pair(__expansions));
    var ____x24 = join(["do"], macroexpand(__body17));
    drop(_G.environment);
    return ____x24;
  }});
  setenv("let-unique", {["_stash"]: true, ["macro"]: (names, ...__r112) => {
    var ____r112 = unstash(__r112);
    var __names1 = destash33(names, ____r112);
    var ____id27 = ____r112;
    var __body18 = cut(____id27, 0);
    var __bs11 = map((n) => {
      return [n, ["unique", ["quote", n]]];
    }, __names1);
    return join(["let", apply(join, __bs11)], __body18);
  }});
  setenv("fn", {["_stash"]: true, ["macro"]: (args, ...__r114) => {
    var ____r114 = unstash(__r114);
    var __args6 = destash33(args, ____r114);
    var ____id28 = ____r114;
    var __body19 = cut(____id28, 0);
    return join(["%function"], bind42(__args6, __body19));
  }});
  setenv("apply", {["_stash"]: true, ["macro"]: (f, ...__r115) => {
    var ____r115 = unstash(__r115);
    var __f1 = destash33(f, ____r115);
    var ____id29 = ____r115;
    var __args7 = cut(____id29, 0);
    if (_35(__args7) > 1) {
      return ["%call", "apply", __f1, ["join", join(["list"], almost(__args7)), last(__args7)]];
    } else {
      return join(["%call", "apply", __f1], __args7);
    }
  }});
  setenv("guard", {["_stash"]: true, ["macro"]: (expr) => {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  }});
  setenv("each", {["_stash"]: true, ["macro"]: (x, t, ...__r117) => {
    var ____r117 = unstash(__r117);
    var __x26 = destash33(x, ____r117);
    var __t2 = destash33(t, ____r117);
    var ____id30 = ____r117;
    var __body20 = cut(____id30, 0);
    var __o14 = unique("o");
    var __n22 = unique("n");
    var __i27 = unique("i");
    var __e27;
    if (atom63(__x26)) {
      __e27 = [__i27, __x26];
    } else {
      var __e28;
      if (_35(__x26) > 1) {
        __e28 = __x26;
      } else {
        __e28 = [__i27, hd(__x26)];
      }
      __e27 = __e28;
    }
    var ____id31 = __e27;
    var __k23 = ____id31[0];
    var __v16 = ____id31[1];
    return ["let", [__o14, __t2, __k23, "nil"], ["%for", __o14, __k23, ["let", [__v16, [__o14, ["brackets", __k23]]], join(["let", __k23, ["if", ["numeric?", __k23], ["parseInt", __k23], __k23]], __body20)]]];
  }});
  setenv("for", {["_stash"]: true, ["macro"]: (i, to, ...__r118) => {
    var ____r118 = unstash(__r118);
    var __i28 = destash33(i, ____r118);
    var __to = destash33(to, ____r118);
    var ____id32 = ____r118;
    var __body21 = cut(____id32, 0);
    return ["let", __i28, 0, join(["while", ["<", __i28, __to]], __body21, [["inc", __i28]])];
  }});
  setenv("step", {["_stash"]: true, ["macro"]: (v, t, ...__r119) => {
    var ____r119 = unstash(__r119);
    var __v17 = destash33(v, ____r119);
    var __t3 = destash33(t, ____r119);
    var ____id33 = ____r119;
    var __body22 = cut(____id33, 0);
    var __x27 = unique("x");
    var __i29 = unique("i");
    return ["let", [__x27, __t3], ["for", __i29, ["#", __x27], join(["let", [__v17, ["at", __x27, __i29]]], __body22)]];
  }});
  setenv("set-of", {["_stash"]: true, ["macro"]: (...xs) => {
    var __xs12 = unstash(xs);
    var __l6 = [];
    var ____o15 = __xs12;
    var ____i30 = undefined;
    for (____i30 in ____o15) {
      var __x28 = ____o15[____i30];
      var __e29;
      if (numeric63(____i30)) {
        __e29 = parseInt(____i30);
      } else {
        __e29 = ____i30;
      }
      var ____i301 = __e29;
      __l6[__x28] = true;
    }
    return join(["obj"], __l6);
  }});
  setenv("join!", {["_stash"]: true, ["macro"]: (a, ...__r120) => {
    var ____r120 = unstash(__r120);
    var __a2 = destash33(a, ____r120);
    var ____id34 = ____r120;
    var __bs21 = cut(____id34, 0);
    return ["set", __a2, join(["join", __a2], __bs21)];
  }});
  setenv("cat!", {["_stash"]: true, ["macro"]: (a, ...__r121) => {
    var ____r121 = unstash(__r121);
    var __a3 = destash33(a, ____r121);
    var ____id35 = ____r121;
    var __bs3 = cut(____id35, 0);
    return ["set", __a3, join(["cat", __a3], __bs3)];
  }});
  setenv("inc", {["_stash"]: true, ["macro"]: (n, by) => {
    var __e30;
    if (nil63(by)) {
      __e30 = 1;
    } else {
      __e30 = by;
    }
    return ["set", n, ["+", n, __e30]];
  }});
  setenv("dec", {["_stash"]: true, ["macro"]: (n, by) => {
    var __e31;
    if (nil63(by)) {
      __e31 = 1;
    } else {
      __e31 = by;
    }
    return ["set", n, ["-", n, __e31]];
  }});
  setenv("with-indent", {["_stash"]: true, ["macro"]: (form) => {
    var __x29 = unique("x");
    return ["do", ["inc", "indent-level"], ["with", __x29, form, ["dec", "indent-level"]]];
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
    var __x30 = expand(join(["do"], __body24));
    _eval(__x30);
    return __x30;
  }});
  setenv("class", {["_stash"]: true, ["macro"]: (x, ...__r126) => {
    var ____r126 = unstash(__r126);
    var __x31 = destash33(x, ____r126);
    var ____id36 = ____r126;
    var __body25 = cut(____id36, 0);
    if (atom63(__x31)) {
      __x31 = [__x31];
    }
    if (hd(__body25) === "extends") {
      var ____id37 = __body25;
      var ___extends = ____id37[0];
      var __type = ____id37[1];
      var __body111 = cut(____id37, 2);
      add(__x31, __type);
      __body25 = __body111;
    }
    return join(["%class", __x31], __body25);
  }});
  setenv(".", {["_stash"]: true, ["macro"]: (...args) => {
    var __args8 = unstash(args);
    if (none63(__args8)) {
      return ["this", ".constructor"];
    } else {
      if (one63(__args8)) {
        return join([".", "this", hd(__args8)], tl(__args8));
      } else {
        var ____id38 = __args8;
        var __name6 = ____id38[0];
        var __a4 = ____id38[1];
        var __bs4 = cut(____id38, 2);
        var __e32;
        if (atom63(__a4)) {
          __e32 = ["quote", compile(__a4)];
        } else {
          var __e33;
          if ("quote" === hd(__a4)) {
            __e33 = ["quote", compile(__a4[1])];
          } else {
            __e33 = __a4;
          }
          __e32 = __e33;
        }
        var __prop = __e32;
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
    var __e26 = unique("e");
    return join(["%condition-case", __e26, join(["do"], map((x) => {
      if (!( obj63(x) && in63(hd(x), ["catch", "finally"]))) {
        return x;
      }
    }, __body26))], map((x) => {
      if (obj63(x)) {
        if (hd(x) === "finally") {
          return x;
        } else {
          if (hd(x) === "catch") {
            var ____id39 = x;
            var ___ = ____id39[0];
            var __type1 = ____id39[1];
            var ___var = ____id39[2];
            var __body27 = cut(____id39, 3);
            return ["catch", __type1, join(["let", [___var, __e26]], __body27)];
          }
        }
      }
    }, __body26));
  }});
  setenv("throw", {["_stash"]: true, ["macro"]: (x) => {
    return ["%throw", x];
  }});
  setenv("brackets", {["_stash"]: true, ["macro"]: (...args) => {
    var __args9 = unstash(args);
    return join(["%brackets"], __args9);
  }});
  setenv("braces", {["_stash"]: true, ["macro"]: (...args) => {
    var __args10 = unstash(args);
    return join(["%braces"], __args10);
  }});
  var __exports = {};
  var __self = __exports;
  var __module = {["exports"]: __exports};
  var getenv = (k, p) => {
    if (string63(k)) {
      var __i31 = edge(_G.environment);
      while (__i31 >= 0) {
        var __b1 = _G.environment[__i31][k];
        if (is63(__b1)) {
          var __e42;
          if (p) {
            __e42 = __b1[p];
          } else {
            __e42 = __b1;
          }
          return __e42;
        } else {
          __i31 = __i31 - 1;
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
        var __e43;
        if (numeric63(__k24)) {
          __e43 = parseInt(__k24);
        } else {
          __e43 = __k24;
        }
        var __k25 = __e43;
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
        var __id40 = unique("id");
        var __bs5 = [__id40, rh];
        var ____o17 = lh;
        var __k26 = undefined;
        for (__k26 in ____o17) {
          var __v19 = ____o17[__k26];
          var __e44;
          if (numeric63(__k26)) {
            __e44 = parseInt(__k26);
          } else {
            __e44 = __k26;
          }
          var __k27 = __e44;
          var __e45;
          if (__k27 === "rest") {
            __e45 = ["cut", __id40, _35(lh)];
          } else {
            __e45 = [__id40, ["brackets", ["quote", __k27]]];
          }
          var __x32 = __e45;
          if (is63(__k27)) {
            var __e46;
            if (__v19 === true) {
              __e46 = __k27;
            } else {
              __e46 = __v19;
            }
            var __k28 = __e46;
            __bs5 = join(__bs5, bind(__k28, __x32));
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
      var __r148 = unique("r");
      var ____o18 = args;
      var __k29 = undefined;
      for (__k29 in ____o18) {
        var __v20 = ____o18[__k29];
        var __e47;
        if (numeric63(__k29)) {
          __e47 = parseInt(__k29);
        } else {
          __e47 = __k29;
        }
        var __k30 = __e47;
        if (number63(__k30)) {
          if (atom63(__v20)) {
            add(__args12, __v20);
          } else {
            var __x33 = unique("x");
            add(__args12, __x33);
            __bs6 = join(__bs6, [__v20, __x33]);
          }
        }
      }
      if (keys63(args)) {
        __bs6 = join(__bs6, [__r148, rest(__r148)]);
        var __n27 = _35(__args12);
        var __i35 = 0;
        while (__i35 < __n27) {
          var __v21 = __args12[__i35];
          __bs6 = join(__bs6, [__v21, ["destash!", __v21, __r148]]);
          __i35 = __i35 + 1;
        }
        __bs6 = join(__bs6, [keys(args), __r148]);
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
  var expandLocal = (__x34) => {
    var ____id41 = __x34;
    var __x35 = ____id41[0];
    var __name7 = ____id41[1];
    var __value = ____id41[2];
    setenv(__name7, {["_stash"]: true, ["variable"]: true});
    return ["%local", __name7, macroexpand(__value)];
  };
  var expandFunction = (__x36) => {
    var ____id42 = __x36;
    var __x37 = ____id42[0];
    var __args111 = ____id42[1];
    var __body28 = cut(____id42, 2);
    add(_G.environment, {});
    var ____o19 = __args111;
    var ____i36 = undefined;
    for (____i36 in ____o19) {
      var ____x38 = ____o19[____i36];
      var __e48;
      if (numeric63(____i36)) {
        __e48 = parseInt(____i36);
      } else {
        __e48 = ____i36;
      }
      var ____i361 = __e48;
      if (defaultAssignment63(____x38)) {
        setenv(____x38[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x38, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x39 = join(["%function", __args111], macroexpand(__body28));
    drop(_G.environment);
    return ____x39;
  };
  var expandTable = (__x40) => {
    var ____id43 = __x40;
    var __x41 = ____id43[0];
    var __args121 = cut(____id43, 1);
    var __expr2 = join([__x41], keys(__args121));
    var ____x42 = __args121;
    var ____i37 = 0;
    while (____i37 < _35(____x42)) {
      var __x43 = ____x42[____i37];
      if (atom63(__x43)) {
        add(__expr2, [__x43, macroexpand(__x43)]);
      } else {
        if (_35(__x43) <= 2) {
          var ____id44 = __x43;
          var __name8 = ____id44[0];
          var __v22 = ____id44[1];
          add(__expr2, [macroexpand(__name8), macroexpand(__v22)]);
        } else {
          var ____id45 = __x43;
          var __prefix = ____id45[0];
          var __name9 = ____id45[1];
          var __args13 = ____id45[2];
          var __body29 = cut(____id45, 3);
          if (some63(__body29)) {
            add(_G.environment, {});
            var ____o20 = __args13;
            var ____i38 = undefined;
            for (____i38 in ____o20) {
              var ____x44 = ____o20[____i38];
              var __e49;
              if (numeric63(____i38)) {
                __e49 = parseInt(____i38);
              } else {
                __e49 = ____i38;
              }
              var ____i381 = __e49;
              if (defaultAssignment63(____x44)) {
                setenv(____x44[1], {["_stash"]: true, ["variable"]: true});
              } else {
                setenv(____x44, {["_stash"]: true, ["variable"]: true});
              }
            }
            var ____x45 = add(__expr2, join([__prefix, macroexpand(__name9), __args13], macroexpand(__body29)));
            drop(_G.environment);
            ____x45;
          } else {
            add(__expr2, [__prefix, macroexpand(__name9), macroexpand(__args13)]);
          }
        }
      }
      ____i37 = ____i37 + 1;
    }
    return __expr2;
  };
  var expandClass = (__x46) => {
    var ____id46 = __x46;
    var __x47 = ____id46[0];
    var __name10 = ____id46[1];
    var __body30 = cut(____id46, 2);
    return join([__x47, __name10], tl(expandTable(join(["%table"], __body30))));
  };
  var expandConditionCase = (__x48) => {
    var ____id47 = __x48;
    var __x49 = ____id47[0];
    var ___var1 = ____id47[1];
    var __form = ____id47[2];
    var __clauses1 = cut(____id47, 3);
    return join(["%condition-case", ___var1, macroexpand(__form)], map((__x50) => {
      var ____id48 = __x50;
      var __which = ____id48[0];
      var __body31 = cut(____id48, 1);
      if (__which === "finally") {
        return join([__which], map(macroexpand, __body31));
      } else {
        add(_G.environment, {});
        var ____o21 = [___var1];
        var ____i39 = undefined;
        for (____i39 in ____o21) {
          var ____x51 = ____o21[____i39];
          var __e50;
          if (numeric63(____i39)) {
            __e50 = parseInt(____i39);
          } else {
            __e50 = ____i39;
          }
          var ____i391 = __e50;
          if (defaultAssignment63(____x51)) {
            setenv(____x51[1], {["_stash"]: true, ["variable"]: true});
          } else {
            setenv(____x51, {["_stash"]: true, ["variable"]: true});
          }
        }
        var ____x52 = join([__which], map(macroexpand, __body31));
        drop(_G.environment);
        return ____x52;
      }
    }, __clauses1));
  };
  _G.expandConditionCase = expandConditionCase;
  var expandDefinition = (__x53) => {
    var ____id49 = __x53;
    var __x54 = ____id49[0];
    var __name11 = ____id49[1];
    var __args14 = ____id49[2];
    var __body32 = cut(____id49, 3);
    add(_G.environment, {});
    var ____o22 = __args14;
    var ____i40 = undefined;
    for (____i40 in ____o22) {
      var ____x55 = ____o22[____i40];
      var __e51;
      if (numeric63(____i40)) {
        __e51 = parseInt(____i40);
      } else {
        __e51 = ____i40;
      }
      var ____i401 = __e51;
      if (defaultAssignment63(____x55)) {
        setenv(____x55[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x55, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x56 = join([__x54, __name11, __args14], macroexpand(__body32));
    drop(_G.environment);
    return ____x56;
  };
  var expandMacro = (form) => {
    return macroexpand(expand1(form));
  };
  var expand1 = (__x57) => {
    var ____id50 = __x57;
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
        var __x58 = hd(form);
        if (__x58 === "%local") {
          return expandLocal(form);
        } else {
          if (__x58 === "%function") {
            return expandFunction(form);
          } else {
            if (__x58 === "%table") {
              return expandTable(form);
            } else {
              if (__x58 === "%class") {
                return expandClass(form);
              } else {
                if (__x58 === "%condition-case") {
                  return expandConditionCase(form);
                } else {
                  if (__x58 === "%global-function") {
                    return expandDefinition(form);
                  } else {
                    if (__x58 === "%local-function") {
                      return expandDefinition(form);
                    } else {
                      if (macro63(__x58)) {
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
      var __e52;
      if (numeric63(__k31)) {
        __e52 = parseInt(__k31);
      } else {
        __e52 = __k31;
      }
      var __k32 = __e52;
      if (! number63(__k32)) {
        var __e53;
        if (quasisplice63(__v23, depth)) {
          __e53 = quasiexpand(__v23[1]);
        } else {
          __e53 = quasiexpand(__v23, depth);
        }
        var __v24 = __e53;
        last(__xs13)[__k32] = __v24;
      }
    }
    var ____x59 = form;
    var ____i42 = 0;
    while (____i42 < _35(____x59)) {
      var __x60 = ____x59[____i42];
      if (quasisplice63(__x60, depth)) {
        var __x61 = quasiexpand(__x60[1]);
        add(__xs13, __x61);
        add(__xs13, ["list"]);
      } else {
        add(last(__xs13), quasiexpand(__x60, depth));
      }
      ____i42 = ____i42 + 1;
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
  var expandIf = (__x62) => {
    var ____id51 = __x62;
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
    var __s3 = "";
    var __i43 = 0;
    while (__i43 < indentLevel) {
      __s3 = __s3 + "  ";
      __i43 = __i43 + 1;
    }
    return __s3;
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
  var symbolName = (id, raw63) => {
    var __id52 = camelCase(id);
    var __e54;
    if (! raw63 && numberCode63(code(__id52, 0))) {
      __e54 = "_";
    } else {
      __e54 = "";
    }
    var __id121 = __e54;
    var __i44 = 0;
    while (__i44 < _35(__id52)) {
      var __c2 = char(__id52, __i44);
      var __n33 = code(__c2);
      var __e55;
      if (__c2 === "-" && !( __id52 === "-")) {
        __e55 = "_";
      } else {
        var __e56;
        if (validCode63(__n33)) {
          __e56 = __c2;
        } else {
          var __e57;
          if (__i44 === 0) {
            __e57 = "_" + __n33;
          } else {
            __e57 = __n33;
          }
          __e56 = __e57;
        }
        __e55 = __e56;
      }
      var __c12 = __e55;
      __id121 = __id121 + __c12;
      __i44 = __i44 + 1;
    }
    if (! raw63 && reserved63(__id121)) {
      return "_" + __id121;
    } else {
      return __id121;
    }
  };
  _G.symbolName = symbolName;
  var validId63 = (x) => {
    return some63(x) && x === symbolName(x);
  };
  _G.validId63 = validId63;
  var __names3 = {};
  var unique = (x) => {
    if (string63(x)) {
      var __x63 = symbolName(x);
      if (__names3[__x63]) {
        var __i45 = __names3[__x63];
        __names3[__x63] = __names3[__x63] + 1;
        return unique(__x63 + __i45);
      } else {
        __names3[__x63] = 1;
        return "__" + __x63;
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
      var __e58;
      if (numeric63(__k33)) {
        __e58 = parseInt(__k33);
      } else {
        __e58 = __k33;
      }
      var __k34 = __e58;
      var __x64 = f(__v25);
      if (is63(__x64)) {
        add(__o24, literal(__k34));
        add(__o24, __x64);
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
        var __e59;
        if (numeric63(__k35)) {
          __e59 = parseInt(__k35);
        } else {
          __e59 = __k35;
        }
        var __k36 = __e59;
        var __x65 = hd(form);
        if (__v26[__x65]) {
          return index(__k36);
        }
      }
    }
    return 0;
  };
  var getop = (op) => {
    return find((level) => {
      var __x66 = level[op];
      if (__x66 === true) {
        return op;
      } else {
        if (is63(__x66)) {
          return __x66.js;
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
        var __x67 = ____id53[0];
        var __ys = cut(____id53, 1);
        var __s4 = compileNext(compile(__x67), __ys, true);
        return compileNext(__s4, tl(args), call63);
      } else {
        var __s5 = "";
        var __c3 = "";
        var __i48 = 0;
        while (__i48 < _35(args)) {
          var __x68 = args[__i48];
          if (defaultAssignment63(__x68)) {
            var ____id54 = __x68;
            var ___1 = ____id54[0];
            var __x111 = ____id54[1];
            var __val1 = ____id54[2];
            __s5 = __s5 + __c3 + compile(__x111) + " = " + compile(__val1);
          } else {
            if (accessor63(__x68) || obj63(__x68) && accessor63(hd(__x68))) {
              return compileNext("(" + __s5 + ")", cut(args, __i48), call63);
            } else {
              __s5 = __s5 + __c3 + compile(__x68);
            }
          }
          __c3 = ", ";
          __i48 = __i48 + 1;
        }
        if (args.rest) {
          __s5 = __s5 + __c3 + "..." + compile(args.rest);
        }
        return "(" + __s5 + ")";
      }
    }
  };
  _G.compileArgs = compileArgs;
  var escapeNewlines = (s) => {
    var __s12 = "";
    var __i49 = 0;
    while (__i49 < _35(s)) {
      var __c4 = char(s, __i49);
      var __e60;
      if (__c4 === "\n") {
        __e60 = "\\n";
      } else {
        var __e61;
        if (__c4 === "\r") {
          __e61 = "";
        } else {
          __e61 = __c4;
        }
        __e60 = __e61;
      }
      __s12 = __s12 + __e60;
      __i49 = __i49 + 1;
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
              return symbolName(x, raw63);
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
    var __x69 = ____id55[0];
    var __args15 = cut(____id55, 1);
    var ____id56 = getenv(__x69);
    var __special = ____id56["special"];
    var __stmt = ____id56["stmt"];
    var __selfTr63 = ____id56["tr"];
    var __tr = terminator(stmt63 && ! __selfTr63);
    return apply(__special, __args15) + __tr;
  };
  var parenthesizeCall63 = (x) => {
    return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
  };
  var construct63 = (x) => {
    return string63(x) && _35(x) > 1 && code(x, edge(x)) === 46 && ! search(x, "..");
  };
  _G.construct63 = construct63;
  var compileConstruct = (x) => {
    if (construct63(x)) {
      return "new " + compile(clip(x, 0, edge(x)));
    } else {
      return compile(x);
    }
  };
  _G.compileConstruct = compileConstruct;
  var compileCall = (f, args, parens63) => {
    var __f11 = compileConstruct(f);
    var __args131 = compileArgs(stash42(args));
    if (parens63 || parenthesizeCall63(f)) {
      return "(" + __f11 + ")" + __args131;
    } else {
      return __f11 + __args131;
    }
  };
  _G.compileCall = compileCall;
  var opDelims = (parent, child, ...__r197) => {
    var ____r197 = unstash(__r197);
    var __parent = destash33(parent, ____r197);
    var __child = destash33(child, ____r197);
    var ____id57 = ____r197;
    var __right = ____id57["right"];
    var __e62;
    if (__right) {
      __e62 = _6261;
    } else {
      __e62 = _62;
    }
    if (__e62(precedence(__child), precedence(__parent))) {
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
  var compileFunction = (args, body, ...__r199) => {
    var ____r199 = unstash(__r199);
    var __args16 = destash33(args, ____r199);
    var __body34 = destash33(body, ____r199);
    var ____id62 = ____r199;
    var __name13 = ____id62["name"];
    var __prefix1 = ____id62["prefix"];
    var __infix = ____id62["infix"];
    var __tr1 = ____id62["tr"];
    var __id63 = either(__name13, "");
    var __args17 = compileArgs(__args16);
    indentLevel = indentLevel + 1;
    var ____x70 = compile(__body34, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body35 = ____x70;
    var __ind = indentation();
    var __e63;
    if (__infix) {
      __e63 = " " + __infix;
    } else {
      __e63 = "";
    }
    var __mid = __e63;
    var __e64;
    if (__prefix1) {
      __e64 = __prefix1 + " ";
    } else {
      __e64 = "";
    }
    var __p1 = __e64;
    var __tr2 = either(__tr1, "");
    return __p1 + __id63 + __args17 + __mid + " {\n" + __body35 + __ind + "}" + __tr2;
  };
  _G.compileFunction = compileFunction;
  var canReturn63 = (form) => {
    return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
  };
  var compile = (form, ...__r201) => {
    var ____r201 = unstash(__r201);
    var __form1 = destash33(form, ____r201);
    var ____id64 = ____r201;
    var __stmt1 = ____id64["stmt"];
    if (nil63(__form1)) {
      return "";
    } else {
      if (specialForm63(__form1)) {
        return compileSpecial(__form1, __stmt1);
      } else {
        var __tr3 = terminator(__stmt1);
        var __e65;
        if (__stmt1) {
          __e65 = indentation();
        } else {
          __e65 = "";
        }
        var __ind1 = __e65;
        var __e66;
        if (atom63(__form1)) {
          __e66 = compileAtom(__form1);
        } else {
          var __e67;
          if (infix63(hd(__form1))) {
            __e67 = compileInfix(__form1);
          } else {
            __e67 = compileCall(hd(__form1), tl(__form1));
          }
          __e66 = __e67;
        }
        var __form2 = __e66;
        return __ind1 + __form2 + __tr3;
      }
    }
  };
  _G.compile = compile;
  var lowerStatement = (form, tail63) => {
    var __hoist = [];
    var __e34 = lower(form, __hoist, true, tail63);
    var __e68;
    if (some63(__hoist) && is63(__e34)) {
      __e68 = join(["do"], __hoist, [__e34]);
    } else {
      var __e69;
      if (is63(__e34)) {
        __e69 = __e34;
      } else {
        var __e70;
        if (_35(__hoist) > 1) {
          __e70 = join(["do"], __hoist);
        } else {
          __e70 = hd(__hoist);
        }
        __e69 = __e70;
      }
      __e68 = __e69;
    }
    return either(__e68, ["do"]);
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
    var ____x71 = almost(args);
    var ____i50 = 0;
    while (____i50 < _35(____x71)) {
      var __x72 = ____x71[____i50];
      var ____y5 = lower(__x72, hoist, stmt63);
      if (yes(____y5)) {
        var __e35 = ____y5;
        if (standalone63(__e35)) {
          add(hoist, __e35);
        }
      }
      ____i50 = ____i50 + 1;
    }
    var __e36 = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && canReturn63(__e36)) {
      return ["return", __e36];
    } else {
      return __e36;
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
      var __e72;
      if (is63(___else)) {
        __e72 = [lowerBody([___else], tail63)];
      }
      return add(hoist, join(["%if", lower(__cond2, hoist), lowerBody([__then], tail63)], __e72));
    } else {
      var __e37 = unique("e");
      add(hoist, ["%local", __e37]);
      var __e71;
      if (is63(___else)) {
        __e71 = [lower(["%set", __e37, ___else])];
      }
      add(hoist, join(["%if", lower(__cond2, hoist), lower(["%set", __e37, __then])], __e71));
      return __e37;
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
      var __e73;
      if (x === "and") {
        __e73 = ["%if", __id68, __b5, __id68];
      } else {
        __e73 = ["%if", __id68, __id68, __b5];
      }
      return lower(["do", ["%local", __id68, __a9], __e73], hoist);
    } else {
      return [x, lower(__a9, hoist), __b11];
    }
  };
  var lowerTry = (args, hoist, tail63) => {
    return add(hoist, ["%try", lowerBody(args, tail63)]);
  };
  var lowerConditionCase = (__x73, hoist, stmt63, tail63) => {
    var ____id69 = __x73;
    var ___var2 = ____id69[0];
    var __form3 = ____id69[1];
    var __clauses2 = cut(____id69, 2);
    if (stmt63) {
      return add(hoist, join(["%condition-case", ___var2, lowerBody(["do", __form3], tail63)], map((__x74) => {
        var ____id70 = __x74;
        var __which1 = ____id70[0];
        var __body36 = cut(____id70, 1);
        if (__which1 === "finally") {
          return [__which1, lowerBody(__body36)];
        } else {
          var ____id71 = __body36;
          var __x75 = ____id71[0];
          var __args18 = cut(____id71, 1);
          return [__which1, lower(__x75), lowerBody(__args18, tail63)];
        }
      }, __clauses2)));
    } else {
      var __e38 = unique("e");
      add(hoist, ["%local", __e38]);
      add(hoist, join(["%condition-case", ___var2, lower(["%set", __e38, __form3])], map((__x76) => {
        var ____id72 = __x76;
        var __which2 = ____id72[0];
        var __body37 = cut(____id72, 1);
        if (__which2 === "finally") {
          return [__which2, lowerBody(__body37)];
        } else {
          var ____id73 = __body37;
          var __x77 = ____id73[0];
          var __args19 = cut(____id73, 1);
          return [__which2, lower(__x77), lower(["%set", __e38, join(["do"], __args19)])];
        }
      }, __clauses2)));
      return __e38;
    }
  };
  _G.lowerConditionCase = lowerConditionCase;
  var lowerWhile = (args, hoist) => {
    var ____id74 = args;
    var __c5 = ____id74[0];
    var __body38 = cut(____id74, 1);
    var __pre = [];
    var __c6 = lower(__c5, __pre);
    var __e74;
    if (none63(__pre)) {
      __e74 = ["while", __c6, lowerBody(__body38)];
    } else {
      __e74 = ["while", true, join(["do"], __pre, [["%if", ["not", __c6], ["break"]], lowerBody(__body38)])];
    }
    return add(hoist, __e74);
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
    var ____x78 = args;
    var ____i51 = 0;
    while (____i51 < _35(____x78)) {
      var __x79 = ____x78[____i51];
      if (atom63(__x79)) {
        add(__expr3, __x79);
      } else {
        if (_35(__x79) <= 2) {
          var ____id76 = __x79;
          var __name14 = ____id76[0];
          var __v27 = ____id76[1];
          add(__expr3, [lower(__name14, hoist), lower(__v27, hoist)]);
        } else {
          var ____id77 = __x79;
          var __prefix2 = ____id77[0];
          var __name15 = ____id77[1];
          var __args20 = ____id77[2];
          var __body40 = cut(____id77, 3);
          if (some63(__body40)) {
            add(__expr3, [__prefix2, lower(__name15, hoist), __args20, lowerBody(__body40, true)]);
          } else {
            add(__expr3, [__prefix2, lower(__name15, hoist), lower(__args20, hoist)]);
          }
        }
      }
      ____i51 = ____i51 + 1;
    }
    return __expr3;
  };
  _G.lowerTable = lowerTable;
  var lowerClass = (__x80, hoist, stmt63, tail63) => {
    var ____id78 = __x80;
    var __x81 = ____id78[0];
    var __body41 = cut(____id78, 1);
    var __body42 = tl(lowerTable(__body41, hoist));
    var ____id79 = __x81;
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
    return join(["%function", __a10, lowerBody(__body43, true)], keys(__body43));
  };
  var lowerDefinition = (kind, args, hoist) => {
    var ____id81 = args;
    var __name17 = ____id81[0];
    var __args21 = ____id81[1];
    var __body44 = cut(____id81, 2);
    return add(hoist, [kind, __name17, __args21, lowerBody(__body44, true)]);
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
      var __e39 = [];
      var ____id82 = form;
      var __x82 = ____id82[0];
      var __args22 = cut(____id82, 1);
      reduce((a, b) => {
        add(__e39, [__x82, a, b]);
        return a;
      }, __args22);
      return join(["and"], reverse(__e39));
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
    var __x83 = ____id83[0];
    var __args23 = cut(____id83, 1);
    return lower(reduce((a, b) => {
      return [__x83, b, a];
    }, reverse(__args23)), hoist);
  };
  var lowerSpecial = (__x84, hoist) => {
    var ____id84 = __x84;
    var __name18 = ____id84[0];
    var __args24 = cut(____id84, 1);
    var __args141 = map((x) => {
      return lower(x, hoist);
    }, __args24);
    var __form6 = join([__name18], __args141);
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
            var __x85 = ____id85[0];
            var __args25 = cut(____id85, 1);
            if (__x85 === "do") {
              return lowerDo(__args25, hoist, stmt63, tail63);
            } else {
              if (__x85 === "%call") {
                return lower(__args25, hoist, stmt63, tail63);
              } else {
                if (__x85 === "%set") {
                  return lowerSet(__args25, hoist, stmt63, tail63);
                } else {
                  if (__x85 === "%if") {
                    return lowerIf(__args25, hoist, stmt63, tail63);
                  } else {
                    if (__x85 === "%try") {
                      return lowerTry(__args25, hoist, tail63);
                    } else {
                      if (__x85 === "%condition-case") {
                        return lowerConditionCase(__args25, hoist, stmt63, tail63);
                      } else {
                        if (__x85 === "while") {
                          return lowerWhile(__args25, hoist);
                        } else {
                          if (__x85 === "%for") {
                            return lowerFor(__args25, hoist);
                          } else {
                            if (__x85 === "%table") {
                              return lowerTable(__args25, hoist, stmt63, tail63);
                            } else {
                              if (__x85 === "%class") {
                                return lowerClass(__args25, hoist, stmt63, tail63);
                              } else {
                                if (__x85 === "%function") {
                                  return lowerFunction(__args25);
                                } else {
                                  if (__x85 === "%local-function" || __x85 === "%global-function") {
                                    return lowerDefinition(__x85, __args25, hoist);
                                  } else {
                                    if (in63(__x85, ["and", "or"])) {
                                      return lowerShort(__x85, __args25, hoist);
                                    } else {
                                      if (statement63(__x85)) {
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
  var run = (code, sandbox, options) => {
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
  setenv("%id", {["_stash"]: true, ["special"]: (x) => {
    return escape(symbolName(inner(x)));
  }});
  setenv("%call", {["_stash"]: true, ["special"]: (f, ...__r237) => {
    var ____r237 = unstash(__r237);
    var __f2 = destash33(f, ____r237);
    var ____id86 = ____r237;
    var __args26 = cut(____id86, 0);
    return compileCall(__f2, __args26);
  }});
  setenv("%brackets", {["_stash"]: true, ["special"]: (...args) => {
    var __args27 = unstash(args);
    return "[" + inner(compileArgs(__args27)) + "]";
  }});
  setenv("do", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms = unstash(forms);
    var __s6 = "";
    var ____x86 = __forms;
    var ____i52 = 0;
    while (____i52 < _35(____x86)) {
      var __x87 = ____x86[____i52];
      __s6 = __s6 + compile(__x87, {["_stash"]: true, ["stmt"]: true});
      if (! atom63(__x87)) {
        if (hd(__x87) === "return" || hd(__x87) === "break") {
          break;
        }
      }
      ____i52 = ____i52 + 1;
    }
    return __s6;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%if", {["_stash"]: true, ["special"]: (cond, cons, alt) => {
    var __cond3 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x88 = compile(cons, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __cons = ____x88;
    var __e75;
    if (alt) {
      indentLevel = indentLevel + 1;
      var ____x89 = compile(alt, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      __e75 = ____x89;
    }
    var __alt = __e75;
    var __ind2 = indentation();
    var __s7 = "";
    __s7 = __s7 + __ind2 + "if (" + __cond3 + ") {\n" + __cons + __ind2 + "}";
    if (__alt) {
      __s7 = __s7 + " else {\n" + __alt + __ind2 + "}";
    }
    return __s7 + "\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("while", {["_stash"]: true, ["special"]: (cond, form) => {
    var __cond4 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x90 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body45 = ____x90;
    var __ind3 = indentation();
    return __ind3 + "while (" + __cond4 + ") {\n" + __body45 + __ind3 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%for", {["_stash"]: true, ["special"]: (t, k, form) => {
    var __t5 = compile(t);
    var __ind4 = indentation();
    indentLevel = indentLevel + 1;
    var ____x91 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body46 = ____x91;
    return __ind4 + "for (" + k + " in " + __t5 + ") {\n" + __body46 + __ind4 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%try", {["_stash"]: true, ["special"]: (form) => {
    var __e40 = unique("e");
    var __ind5 = indentation();
    indentLevel = indentLevel + 1;
    var ____x92 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body47 = ____x92;
    var __hf = ["return", ["%array", false, __e40]];
    indentLevel = indentLevel + 1;
    var ____x93 = compile(__hf, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __h = ____x93;
    return __ind5 + "try {\n" + __body47 + __ind5 + "}\n" + __ind5 + "catch (" + __e40 + ") {\n" + __h + __ind5 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%condition-case", {["_stash"]: true, ["special"]: (e, form, ...__r242) => {
    var ____r242 = unstash(__r242);
    var __e41 = destash33(e, ____r242);
    var __form7 = destash33(form, ____r242);
    var ____id87 = ____r242;
    var __clauses3 = cut(____id87, 0);
    var __ind6 = indentation();
    indentLevel = indentLevel + 1;
    var ____x94 = compile(__form7, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body48 = ____x94;
    var __str = __ind6 + "try {\n" + __body48 + __ind6 + "}";
    var __form8 = [];
    var ____x95 = __clauses3;
    var ____i53 = 0;
    while (____i53 < _35(____x95)) {
      var __x96 = ____x95[____i53];
      if (hd(__x96) === "catch") {
        var ____id88 = __x96;
        var ___2 = ____id88[0];
        var __type2 = ____id88[1];
        var __body49 = ____id88[2];
        var __e76;
        if (boolean63(__type2)) {
          __e76 = __type2;
        } else {
          __e76 = ["instanceof", __e41, __type2];
        }
        add(__form8, __e76);
        add(__form8, __body49);
      }
      ____i53 = ____i53 + 1;
    }
    if (! none63(__form8)) {
      add(__form8, ["%throw", __e41]);
      var __expr5 = hd(expandIf(__form8));
      indentLevel = indentLevel + 1;
      var ____x97 = compile(__expr5, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h1 = ____x97;
      __str = __str + " catch (" + __e41 + ") {\n" + __h1 + __ind6 + "}";
    }
    var __clause = first((x) => {
      if (hd(x) === "finally") {
        return x;
      }
    }, __clauses3);
    if (__clause) {
      var __body50 = tl(__clause);
      indentLevel = indentLevel + 1;
      var ____x98 = compile(join(["do"], __body50), {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h2 = ____x98;
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
  setenv("%function", {["_stash"]: true, ["special"]: (args, body, ...__r246) => {
    var ____r246 = unstash(__r246);
    var __args28 = destash33(args, ____r246);
    var __body51 = destash33(body, ____r246);
    var ____id89 = ____r246;
    var __props = cut(____id89, 0);
    if (! __props.prefix) {
      __props.infix = __props.infix || "=>";
    }
    return apply(compileFunction, join([__args28, __body51], __props));
  }});
  setenv("%global-function", {["_stash"]: true, ["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%local-function", {["_stash"]: true, ["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("return", {["_stash"]: true, ["special"]: (x) => {
    var __e77;
    if (nil63(x)) {
      __e77 = "return";
    } else {
      __e77 = "return " + compile(x);
    }
    var __x99 = __e77;
    return indentation() + __x99;
  }, ["stmt"]: true});
  setenv("async", {["_stash"]: true, ["special"]: (...x) => {
    var __x100 = unstash(x);
    if (_35(__x100) > 1) {
      return compile(join([["async", hd(__x100)]], tl(__x100)));
    } else {
      return "async " + compile(hd(__x100));
    }
  }});
  setenv("await", {["_stash"]: true, ["special"]: (...x) => {
    var __x101 = unstash(x);
    if (_35(__x101) > 1) {
      return compile(join([["await", hd(__x101)]], tl(__x101)));
    } else {
      return "await (" + compile(hd(__x101)) + ")";
    }
  }});
  setenv("new", {["_stash"]: true, ["special"]: (...args) => {
    var __args29 = unstash(args);
    return "new " + compile(__args29);
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
    return indentation() + compile(["%throw", ["Error.", x]]);
  }, ["stmt"]: true});
  setenv("%local", {["_stash"]: true, ["special"]: (name, value) => {
    var __id90 = compile(name);
    var __value1 = compile(value);
    var __e78;
    if (is63(value)) {
      __e78 = " = " + __value1;
    } else {
      __e78 = "";
    }
    var __rh3 = __e78;
    var __keyword = "var ";
    var __ind7 = indentation();
    return __ind7 + __keyword + __id90 + __rh3;
  }, ["stmt"]: true});
  setenv("%set", {["_stash"]: true, ["special"]: (lh, rh) => {
    var __lh3 = compile(lh);
    var __e79;
    if (nil63(rh)) {
      __e79 = "nil";
    } else {
      __e79 = rh;
    }
    var __rh4 = compile(__e79);
    return indentation() + __lh3 + " = " + __rh4;
  }, ["stmt"]: true});
  setenv("get", {["_stash"]: true, ["special"]: (t, k) => {
    if (accessor63(k)) {
      return compile([t, k]);
    } else {
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
    }
  }});
  setenv("%array", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms1 = unstash(forms);
    var __open = "[";
    var __close = "]";
    var __s8 = "";
    var __c7 = "";
    var ____o27 = __forms1;
    var __k38 = undefined;
    for (__k38 in ____o27) {
      var __v28 = ____o27[__k38];
      var __e80;
      if (numeric63(__k38)) {
        __e80 = parseInt(__k38);
      } else {
        __e80 = __k38;
      }
      var __k39 = __e80;
      if (number63(__k39)) {
        __s8 = __s8 + __c7 + compile(__v28);
        __c7 = ", ";
      }
    }
    return __open + __s8 + __close;
  }});
  setenv("%object", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms2 = unstash(forms);
    var __s9 = "{";
    var __c8 = "";
    var __sep = ": ";
    var ____x102 = pair(__forms2);
    var ____i55 = 0;
    while (____i55 < _35(____x102)) {
      var ____id91 = ____x102[____i55];
      var __k40 = ____id91[0];
      var __v29 = ____id91[1];
      __s9 = __s9 + __c8 + key(__k40) + __sep + compile(__v29);
      __c8 = ", ";
      ____i55 = ____i55 + 1;
    }
    return __s9 + "}";
  }});
  setenv("%table", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms3 = unstash(forms);
    var __s10 = "{\n";
    var __c9 = "";
    var __sep1 = ": ";
    var __comma = either(__forms3.comma, ", ");
    indentLevel = indentLevel + 1;
    var __ind8 = indentation();
    var ____x104 = __forms3;
    var ____i56 = 0;
    while (____i56 < _35(____x104)) {
      var __x105 = ____x104[____i56];
      if (atom63(__x105)) {
        __s10 = __s10 + __c9 + __ind8 + key(__x105) + __sep1 + compile(__x105);
      } else {
        if (_35(__x105) <= 2) {
          var ____id92 = __x105;
          var __name19 = ____id92[0];
          var __v30 = ____id92[1];
          __s10 = __s10 + __c9 + __ind8 + key(__name19) + __sep1 + compile(__v30);
        } else {
          var ____id93 = __x105;
          var __prefix3 = ____id93[0];
          var __name20 = ____id93[1];
          var __args30 = ____id93[2];
          var __body52 = cut(____id93, 3);
          var __e81;
          if (in63(__prefix3, ["define", "def"])) {
            __e81 = "";
          } else {
            __e81 = __prefix3;
          }
          var __prefix4 = __e81;
          var __e82;
          if (some63(__body52)) {
            __e82 = compileFunction(__args30, join(["do"], __body52), {["_stash"]: true, ["name"]: key(__name20), ["prefix"]: __prefix4});
          } else {
            __e82 = key(__name20) + __sep1 + compile(__args30);
          }
          var __h3 = __e82;
          __s10 = __s10 + __c9 + __ind8 + __h3;
        }
      }
      __c9 = inner(__comma) + "\n";
      ____i56 = ____i56 + 1;
    }
    var ____x103;
    indentLevel = indentLevel - 1;
    return __s10 + "\n" + indentation() + "}";
  }});
  setenv("%class", {["_stash"]: true, ["special"]: (name, ...__r257) => {
    var ____r257 = unstash(__r257);
    var __name21 = destash33(name, ____r257);
    var ____id94 = ____r257;
    var __body53 = cut(____id94, 0);
    var __e83;
    if (atom63(__name21)) {
      __e83 = [__name21];
    } else {
      __e83 = __name21;
    }
    var ____id95 = __e83;
    var __name22 = ____id95[0];
    var __parent2 = ____id95[1];
    var __e84;
    if (__name22) {
      __e84 = [__name22, "\" \""];
    } else {
      __e84 = [];
    }
    var __name23 = __e84;
    var __e85;
    if (__parent2) {
      __e85 = ["\"extends \"", __parent2, "\" \""];
    } else {
      __e85 = [];
    }
    var __ext = __e85;
    return compile(join(["%literal", "\"class \""], __name23, __ext, [join({[0]: "%table", ["comma"]: "\"\""}, __body53)]));
  }});
  setenv("%literal", {["_stash"]: true, ["special"]: (...args) => {
    var __args31 = unstash(args);
    var __s111 = "";
    var ____x106 = __args31;
    var ____i57 = 0;
    while (____i57 < _35(____x106)) {
      var __x107 = ____x106[____i57];
      if (stringLiteral63(__x107)) {
        __s111 = __s111 + _eval(__x107);
      } else {
        __s111 = __s111 + compile(__x107);
      }
      ____i57 = ____i57 + 1;
    }
    return __s111;
  }});
  setenv("%statement", {["_stash"]: true, ["special"]: (...args) => {
    var __args32 = unstash(args);
    var __s121 = indentation();
    var ____x108 = __args32;
    var ____i58 = 0;
    while (____i58 < _35(____x108)) {
      var __x109 = ____x108[____i58];
      if (stringLiteral63(__x109)) {
        __s121 = __s121 + _eval(__x109);
      } else {
        __s121 = __s121 + compile(__x109);
      }
      ____i58 = ____i58 + 1;
    }
    __s121 = __s121 + "\n";
    return __s121;
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
  allBuffers = [];
  _G.allBuffers = allBuffers;
  var buffer63 = (x) => {
    return obj63(x) && has63(x, "pos") && has63(x, "string") && has63(x, "len");
  };
  _G.buffer63 = buffer63;
  var stream = (str, more, eos, ...__r261) => {
    var ____r261 = unstash(__r261);
    var __str1 = destash33(str, ____r261);
    var __more = destash33(more, ____r261);
    var __eos = destash33(eos, ____r261);
    var ____id96 = ____r261;
    var __props1 = cut(____id96, 0);
    return join({["pos"]: 0, ["string"]: __str1, ["len"]: _35(__str1), ["more"]: __more, ["eos"]: __eos}, __props1);
  };
  _G.stream = stream;
  var getBuffer = (name) => {
    var ____x110 = allBuffers;
    var ____i59 = 0;
    while (____i59 < _35(____x110)) {
      var __x1111 = ____x110[____i59];
      if (__x1111.name === name) {
        return __x1111;
      }
      ____i59 = ____i59 + 1;
    }
  };
  _G.getBuffer = getBuffer;
  var directoryName63 = (filename) => {
    return char(filename, edge(filename)) === require("path").sep;
  };
  _G.directoryName63 = directoryName63;
  var fileNameAsDirectory = (filename) => {
    if (directoryName63(filename)) {
      return filename;
    } else {
      return filename + require("path").sep;
    }
  };
  _G.fileNameAsDirectory = fileNameAsDirectory;
  var directoryFileName = (filename) => {
    while (directoryName63(filename)) {
      filename = clip(filename, 0, edge(filename));
    }
    return filename;
  };
  _G.directoryFileName = directoryFileName;
  var abbreviateFileName = (filename) => {
    var __h4 = userHomedir();
    if (filename.startsWith(__h4)) {
      return filename.replace(__h4, "~");
    } else {
      return filename;
    }
  };
  _G.abbreviateFileName = abbreviateFileName;
  var fileNameDirectory = (filename) => {
    if (directoryName63(filename)) {
      return filename;
    } else {
      return fileNameAsDirectory(require("path").dirname(filename));
    }
  };
  _G.fileNameDirectory = fileNameDirectory;
  var fileNameNondirectory = (filename) => {
    if (directoryName63(filename)) {
      return "";
    } else {
      return directoryFileName(require("path").basename(filename));
    }
  };
  _G.fileNameNondirectory = fileNameNondirectory;
  var userHomedir = () => {
    var __os = require("os");
    if (function63(__os.userInfo)) {
      try {
        var __homedir = __os.userInfo().homedir;
        if (__homedir) {
          return __homedir;
        }
      } catch (__e86) {
        if (true) {
          var __e87 = __e86;
          if (!( __e87.code === "ENOENT")) {
            throw __e87;
          }
        } else {
          throw __e86;
        }
      }
    }
    if (function63(__os.homedir)) {
      return __os.homedir();
    } else {
      return require("process").env.HOME;
    }
  };
  _G.userHomedir = userHomedir;
  var fileNameAbsolute63 = (filename) => {
    return char(filename, 0) === "~" || require("path").isAbsolute(filename);
  };
  _G.fileNameAbsolute63 = fileNameAbsolute63;
  var fileRelativeName = (filename, directory) => {
    if (! is63(directory)) {
      directory = currentDirectory();
    }
    return require("path").relative(directory, filename);
  };
  _G.fileRelativeName = fileRelativeName;
  var currentDirectory = () => {
    return require("process").cwd();
  };
  _G.currentDirectory = currentDirectory;
  var expandFileName = (filename, directory) => {
    if (! is63(directory)) {
      directory = currentDirectory();
    }
    var __s13 = filename;
    if (! fileNameAbsolute63(__s13)) {
      __s13 = require("path").join(directory, __s13);
    }
    if (char(__s13, 0) === "~") {
      __s13 = userHomedir() + clip(__s13, 1);
    }
    return __s13;
  };
  _G.expandFileName = expandFileName;
  var findBufferVisiting = (filename, predicate) => {
    var ____x112 = allBuffers;
    var ____i60 = 0;
    while (____i60 < _35(____x112)) {
      var __x113 = ____x112[____i60];
      if (bufferFileName(__x113) === filename) {
        if (predicate && predicate(__x113) || nil63(predicate)) {
          return __x113;
        }
      }
      ____i60 = ____i60 + 1;
    }
  };
  _G.findBufferVisiting = findBufferVisiting;
  var getFileBuffer = (filename) => {
    return findBufferVisiting(expandFileName(filename));
  };
  _G.getFileBuffer = getFileBuffer;
  var getBufferCreate = (name) => {
    var __id98 = getBuffer(name);
    var __e89;
    if (__id98) {
      __e89 = __id98;
    } else {
      var __s14 = stream("", {["_stash"]: true, ["name"]: name});
      add(allBuffers, __s14);
      __e89 = __s14;
    }
    return __e89;
  };
  _G.getBufferCreate = getBufferCreate;
  activeBuffer = getBufferCreate("*scratch*");
  _G.activeBuffer = activeBuffer;
  var currentBuffer = () => {
    return activeBuffer;
  };
  _G.currentBuffer = currentBuffer;
  var bufferName = (buffer) => {
    var __b6 = buffer || currentBuffer();
    return __b6.name;
  };
  _G.bufferName = bufferName;
  var bufferFileName = (buffer) => {
    var __b7 = buffer || currentBuffer();
    return __b7.file;
  };
  _G.bufferFileName = bufferFileName;
  var setVisitedFileName = (filename) => {
    var __b8 = currentBuffer();
    __b8.file = filename;
    return __b8.file;
  };
  _G.setVisitedFileName = setVisitedFileName;
  var point = () => {
    return activeBuffer.pos + 1;
  };
  _G.point = point;
  var pointMin = () => {
    return (activeBuffer.start || 0) + 1;
  };
  _G.pointMin = pointMin;
  var pointMax = () => {
    return (activeBuffer.end || activeBuffer.len) + 1;
  };
  _G.pointMax = pointMax;
  var bufferEnd = (flag) => {
    if (flag > 1) {
      return pointMax();
    } else {
      return pointMin();
    }
  };
  _G.bufferEnd = bufferEnd;
  var bufferSize = (buffer) => {
    var __b9 = buffer || currentBuffer();
    return __b9.len;
  };
  _G.bufferSize = bufferSize;
  var gotoChar = (n) => {
    var __n37 = n;
    __n37 = max(pointMin(), __n37);
    __n37 = min(pointMax(), __n37);
    activeBuffer.pos = __n37 - 1;
    return n;
  };
  _G.gotoChar = gotoChar;
  var charAfter = (position) => {
    var __p2 = either(position, point());
    if (__p2 < pointMin() || __p2 >= pointMax()) {
      return undefined;
    } else {
      var __b10 = currentBuffer();
      return char(__b10.string, __p2 - 1);
    }
  };
  _G.charAfter = charAfter;
  var charBefore = (position) => {
    var __p3 = either(position, point());
    if (__p3 <= pointMin() || __p3 > pointMax()) {
      return undefined;
    } else {
      var __b111 = currentBuffer();
      return char(__b111.string, __p3 - 2);
    }
  };
  _G.charBefore = charBefore;
  var lineInfo = (buffer, pos) => {
    var __b12 = buffer || currentBuffer();
    var __s15 = __b12.string;
    var __p4 = either(pos, __b12.pos + 1);
    var __row = 1;
    var __col = 0;
    var __i61 = 0;
    while (__i61 < __p4 - 1) {
      var __c10 = char(__s15, __i61);
      if (is63(__c10)) {
        if (__c10 === "\n") {
          __col = 0;
          __row = __row + 1;
        } else {
          __col = __col + 1;
        }
      }
      __i61 = __i61 + 1;
    }
    return {["line"]: __row, ["column"]: __col};
  };
  _G.lineInfo = lineInfo;
  var bufferLine = (buffer, pt) => {
    if (nil63(buffer)) {
      buffer = currentBuffer();
    }
    return lineInfo(buffer, pt).line;
  };
  _G.bufferLine = bufferLine;
  var bufferColumn = (buffer, pt) => {
    if (nil63(buffer)) {
      buffer = currentBuffer();
    }
    return lineInfo(buffer, pt).column;
  };
  _G.bufferColumn = bufferColumn;
  var narrowToRegion = (start, end) => {
    var __b13 = currentBuffer();
    __b13.start = start - 1;
    __b13.end = end - 1;
    __b13.pos = max(__b13.pos, __b13.start);
    __b13.pos = min(__b13.pos, __b13.end);
    return undefined;
  };
  _G.narrowToRegion = narrowToRegion;
  var bufferNarrowed63 = (buffer) => {
    var __b14 = buffer || currentBuffer();
    return is63(__b14.start) || is63(__b14.end);
  };
  _G.bufferNarrowed63 = bufferNarrowed63;
  var widen = () => {
    var __b15 = currentBuffer();
    delete __b15.start;
    delete __b15.end;
  };
  _G.widen = widen;
  var setBuffer = (bufferOrName) => {
    if (string63(bufferOrName)) {
      var __id99 = getBuffer(bufferOrName);
      var __e90;
      if (__id99) {
        __e90 = __id99;
      } else {
                throw new Error("No buffer named " + bufferOrName);
        __e90 = undefined;
      }
      activeBuffer = __e90;
      return activeBuffer;
    } else {
      if (buffer63(bufferOrName)) {
        activeBuffer = bufferOrName;
        return activeBuffer;
      } else {
        if (nil63(bufferOrName)) {
          activeBuffer = currentBuffer();
          return activeBuffer;
        } else {
                    throw new Error("Must be a buffer or string: " + str(bufferOrName));
        }
      }
    }
  };
  _G.setBuffer = setBuffer;
  var switchToBuffer = (bufferOrName) => {
    return setBuffer(bufferOrName);
  };
  _G.switchToBuffer = switchToBuffer;
  var insertChar = (character, count, inherit) => {
    var __n38 = either(count, 1);
    var __b16 = currentBuffer();
    var __s16 = clip(__b16.string, 0, __b16.pos);
    var __i62 = 0;
    while (__i62 < __n38) {
      __s16 = __s16 + string(character);
      __i62 = __i62 + 1;
    }
    __s16 = __s16 + clip(__b16.string, __b16.pos);
    __b16.string = __s16;
    __b16.pos = __b16.pos + __n38;
    __b16.len = __b16.len + __n38;
    if (bufferNarrowed63(__b16)) {
      __b16.end = __b16.end + __n38;
    }
    return undefined;
  };
  _G.insertChar = insertChar;
  var deleteCharAt = (pt) => {
    gotoChar(pt);
    if (point() >= pointMin() && point() < pointMax()) {
      var __b17 = currentBuffer();
      var __p5 = point() - 1;
      __b17.string = clip(__b17.string, 0, __p5) + clip(__b17.string, __p5 + 1);
      __b17.len = __b17.len - 1;
      if (bufferNarrowed63(__b17)) {
        __b17.end = __b17.end - 1;
      }
    }
    return undefined;
  };
  _G.deleteCharAt = deleteCharAt;
  var deleteChar = (count, killp) => {
    if (count < 0) {
      var __i63 = 0;
      while (__i63 < - count) {
        deleteCharAt(point() - 1);
        __i63 = __i63 + 1;
      }
    } else {
      if (count > 0) {
        var __i64 = 0;
        while (__i64 < count) {
          deleteCharAt(point(), __i64);
          __i64 = __i64 + 1;
        }
      }
    }
  };
  _G.deleteChar = deleteChar;
  var deleteRegion = (start, end) => {
    gotoChar(start);
    var __i65 = 0;
    while (__i65 < end - start) {
      deleteChar(1);
      __i65 = __i65 + 1;
    }
  };
  _G.deleteRegion = deleteRegion;
  var insert = (...args) => {
    var __args33 = unstash(args);
    var __b18 = currentBuffer();
    var ____x114 = __args33;
    var ____i66 = 0;
    while (____i66 < _35(____x114)) {
      var __x115 = ____x114[____i66];
      if (string63(__x115)) {
        var ____x116 = __x115;
        var ____i67 = 0;
        while (____i67 < _35(____x116)) {
          var __c111 = ____x116[____i67];
          insertChar(__c111);
          ____i67 = ____i67 + 1;
        }
      } else {
        insertChar(__x115);
      }
      ____i66 = ____i66 + 1;
    }
  };
  _G.insert = insert;
  setenv("save-current-buffer", {["_stash"]: true, ["macro"]: (...body) => {
    var __body54 = unstash(body);
    var __prev = unique("prev");
    return ["let", [__prev, ["current-buffer"]], ["try", join(["do"], __body54), ["finally", ["set-buffer", __prev]]]];
  }});
  setenv("with-current-buffer", {["_stash"]: true, ["macro"]: (bufferOrName, ...__r301) => {
    var ____r301 = unstash(__r301);
    var __bufferOrName = destash33(bufferOrName, ____r301);
    var ____id97 = ____r301;
    var __body55 = cut(____id97, 0);
    return join(["save-current-buffer", ["set-buffer", __bufferOrName]], __body55);
  }});
  setenv("save-excursion", {["_stash"]: true, ["macro"]: (...body) => {
    var __body56 = unstash(body);
    var __b19 = unique("b");
    var __pt = unique("pt");
    return ["let", [__b19, ["current-buffer"], __pt, ["point"]], ["try", join(["do"], __body56), ["finally", ["with-current-buffer", __b19, ["goto-char", __pt]]]]];
  }});
  setenv("save-restriction", {["_stash"]: true, ["macro"]: (...body) => {
    var __body57 = unstash(body);
    var __b20 = unique("b");
    var __start = unique("start");
    var __end = unique("end");
    return ["let", [__b20, ["current-buffer"], __start, [__b20, ".start"], __end, [__b20, ".end"]], ["try", join(["do"], __body57), ["finally", ["set", [__b20, ".start"], __start, [__b20, ".end"], __end]]]];
  }});
  var bufferString = (buffer) => {
    var ____prev1 = currentBuffer();
    try {
      setBuffer(buffer || currentBuffer());
      var __b21 = currentBuffer();
      return clip(__b21.string, pointMin() - 1, pointMax() - 1);
    } finally {
      setBuffer(____prev1);
    }
  };
  _G.bufferString = bufferString;
  modeLineFormat = "%b L%l:%c";
  _G.modeLineFormat = modeLineFormat;
  var formatModeLine = (format, face, window, buffer) => {
    format = either(format, _G.modeLineFormat);
    buffer = buffer || currentBuffer();
    var __i68 = search(format, "%");
    while (is63(__i68)) {
      __i68 = __i68 + 1;
      var __c121 = char(format, __i68);
      var ____x117 = __c121;
      var __e91;
      if ("b" === ____x117) {
        __e91 = str(bufferName(buffer));
      } else {
        var __e92;
        if ("c" === ____x117) {
          __e92 = str(bufferColumn(buffer));
        } else {
          var __e93;
          if ("f" === ____x117) {
            __e93 = bufferFileName(buffer);
          } else {
            var __e94;
            if ("i" === ____x117) {
              __e94 = str(pointMax() - pointMin());
            } else {
              var __e95;
              if ("l" === ____x117) {
                __e95 = str(bufferLine(buffer));
              } else {
                var __e96;
                if ("n" === ____x117) {
                  var __e99;
                  if (bufferNarrowed63(buffer)) {
                    __e99 = "Narrow";
                  }
                  __e96 = __e99;
                } else {
                  var __e97;
                  if ("%" === ____x117) {
                    __e97 = "%";
                  } else {
                    var __e98;
                    if (true) {
                                            throw new Error("Unknown format mode line spec: " + __c121);
                      __e98 = undefined;
                    }
                    __e97 = __e98;
                  }
                  __e96 = __e97;
                }
                __e95 = __e96;
              }
              __e94 = __e95;
            }
            __e93 = __e94;
          }
          __e92 = __e93;
        }
        __e91 = __e92;
      }
      var __s17 = __e91;
      if (nil63(__s17)) {
        __s17 = "";
      }
      __i68 = __i68 + 1;
      format = clip(format, 0, __i68 - 2) + __s17 + clip(format, __i68);
      __i68 = __i68 - 2;
      __i68 = __i68 + _35(__s17);
      __i68 = search(format, "%", __i68);
    }
    return format;
  };
  _G.formatModeLine = formatModeLine;
  var peekChar = (s) => {
    if (s.pos < s.len) {
      return char(s.string, s.pos);
    }
  };
  _G.peekChar = peekChar;
  var readChar = (s) => {
    var __c13 = peekChar(s);
    if (__c13) {
      s.pos = s.pos + 1;
      return __c13;
    }
  };
  _G.readChar = readChar;
  var skipNonCode = (s) => {
    while (true) {
      var __c14 = peekChar(s);
      if (nil63(__c14)) {
        break;
      } else {
        if (whitespace[__c14]) {
          readChar(s);
        } else {
          if (__c14 === ";") {
            while (__c14 && !( __c14 === "\n")) {
              __c14 = readChar(s);
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
    var __c15 = peekChar(s);
    if (is63(__c15)) {
      return (readTable[__c15] || readTable[""])(s);
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
  var readString = (str, more, __x118) => {
    var __e100;
    if (is63(__x118)) {
      __e100 = __x118;
    } else {
      __e100 = _G.eos;
    }
    var __eos1 = __e100;
    var __x119 = read(stream(str, more, __eos1));
    if (!( __x119 === eof)) {
      return __x119;
    }
  };
  _G.readString = readString;
  var key63 = (atom) => {
    return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
  };
  var expected = (s, c) => {
    var __id100 = s.more;
    var __e101;
    if (__id100) {
      __e101 = __id100;
    } else {
            throw new Error("Expected " + c + " at " + s.pos);
      __e101 = undefined;
    }
    return __e101;
  };
  _G.expected = expected;
  var unexpected = (s, c) => {
    var __id101 = s.eos;
    var __e102;
    if (__id101) {
      __e102 = __id101;
    } else {
            throw new Error("Unexpected " + c + " at " + s.pos);
      __e102 = undefined;
    }
    return __e102;
  };
  _G.unexpected = unexpected;
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
    var __e103;
    if (code(str, 0) === 45) {
      __e103 = 1;
    } else {
      __e103 = 0;
    }
    var __i69 = __e103;
    var __id102 = code(str, __i69) === 48;
    var __e104;
    if (__id102) {
      __i69 = __i69 + 1;
      var __n39 = code(str, __i69);
      __e104 = __n39 === 120 || __n39 === 88;
    } else {
      __e104 = __id102;
    }
    return __e104;
  };
  _G.hexPrefix63 = hexPrefix63;
  var octalPrefix63 = (str) => {
    return code(str, 0) === 48 && numberCode63(code(str, 1) || 0);
  };
  var maybeNumber = (str) => {
    if (hexPrefix63(str)) {
      return parseInt(str, 16);
    } else {
      if (octalPrefix63(str)) {
        return parseInt(str, 8);
      } else {
        if (numberCode63(code(str, edge(str))) && !( code(str, 0) === 46)) {
          return number(str);
        }
      }
    }
  };
  var real63 = (x) => {
    return number63(x) && ! nan63(x) && ! inf63(x);
  };
  _G.real63 = real63;
  readTable[""] = (s) => {
    var __str2 = "";
    while (true) {
      var __c16 = peekChar(s);
      if (__c16 && (! whitespace[__c16] && ! delimiters[__c16])) {
        if (__c16 === "\\") {
          __str2 = __str2 + readChar(s);
        }
        __str2 = __str2 + readChar(s);
      } else {
        break;
      }
    }
    if (__str2 === "true") {
      return true;
    } else {
      if (__str2 === "false") {
        return false;
      } else {
        var __n40 = maybeNumber(__str2);
        if (real63(__n40)) {
          return __n40;
        } else {
          return __str2;
        }
      }
    }
  };
  readTable["("] = (s) => {
    readChar(s);
    var __r320 = undefined;
    var __l9 = [];
    while (nil63(__r320)) {
      skipNonCode(s);
      var __c17 = peekChar(s);
      if (__c17 === ")") {
        readChar(s);
        __r320 = __l9;
      } else {
        if (nil63(__c17)) {
          __r320 = expected(s, ")");
        } else {
          var __x120 = read(s);
          if (key63(__x120)) {
            var __k41 = clip(__x120, 0, edge(__x120));
            var __v31 = read(s);
            __l9[__k41] = __v31;
          } else {
            add(__l9, __x120);
          }
        }
      }
    }
    return __r320;
  };
  readTable[")"] = (s) => {
    return unexpected(s, ")");
  };
  readTable["["] = (s) => {
    readChar(s);
    var __r323 = undefined;
    var __l10 = [];
    while (nil63(__r323)) {
      skipNonCode(s);
      var __c18 = peekChar(s);
      if (__c18 === "]") {
        readChar(s);
        __r323 = join(["brackets"], __l10);
      } else {
        if (nil63(__c18)) {
          __r323 = expected(s, "]");
        } else {
          var __x121 = read(s);
          add(__l10, __x121);
        }
      }
    }
    return __r323;
  };
  readTable["]"] = (s) => {
    return unexpected(s, "]");
  };
  readTable["{"] = (s) => {
    readChar(s);
    var __r326 = undefined;
    var __l111 = [];
    while (nil63(__r326)) {
      skipNonCode(s);
      var __c19 = peekChar(s);
      if (__c19 === "}") {
        readChar(s);
        __r326 = join(["braces"], __l111);
      } else {
        if (nil63(__c19)) {
          __r326 = expected(s, "}");
        } else {
          var __x122 = read(s);
          add(__l111, __x122);
        }
      }
    }
    return __r326;
  };
  readTable["}"] = (s) => {
    return unexpected(s, "}");
  };
  readTable["\""] = (s) => {
    readChar(s);
    var __r329 = undefined;
    var __str3 = "\"";
    while (nil63(__r329)) {
      var __c20 = peekChar(s);
      if (__c20 === "\"") {
        __r329 = __str3 + readChar(s);
      } else {
        if (nil63(__c20)) {
          __r329 = expected(s, "\"");
        } else {
          if (__c20 === "\\") {
            __str3 = __str3 + readChar(s);
          }
          __str3 = __str3 + readChar(s);
        }
      }
    }
    return __r329;
  };
  readTable["|"] = (s) => {
    readChar(s);
    var __r331 = undefined;
    var __str4 = "|";
    while (nil63(__r331)) {
      var __c21 = peekChar(s);
      if (__c21 === "|") {
        __r331 = __str4 + readChar(s);
      } else {
        if (nil63(__c21)) {
          __r331 = expected(s, "|");
        } else {
          __str4 = __str4 + readChar(s);
        }
      }
    }
    return __r331;
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
    var __c22 = readChar(s);
    var __e105;
    if (__c22 === "\\") {
      __e105 = readChar(s);
    } else {
      __e105 = __c22;
    }
    var __c131 = __e105;
    return code(__c131);
  };
  readTable["#"] = (s) => {
    readChar(s);
    var __c23 = peekChar(s);
    if (__c23 === "'") {
      readChar(s);
      return wrap(s, "function");
    } else {
      if (__c23 === ";") {
        readChar(s);
        read(s);
        return read(s);
      } else {
        s.pos = s.pos - 1;
        return readTable[""](s);
      }
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
  var readFile = (path, __x123) => {
    var __e106;
    if (is63(__x123)) {
      __e106 = __x123;
    } else {
      __e106 = "text";
    }
    var __mode = __e106;
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
  var path = require("path");
  inquirer = require("inquirer");
  _G.inquirer = inquirer;
  BottomBar = inquirer.ui.BottomBar;
  _G.BottomBar = BottomBar;
  bottomBar = undefined;
  _G.bottomBar = bottomBar;
  inquirer.registerPrompt("command", require("inquirer-command-prompt"));
  inquirer.registerPrompt("command", require("inquirer-fuzzy-path"));
  var findFileNoselect = (name) => {
    var __filepath = path.resolve(name);
    var __id104 = getFileBuffer(__filepath);
    var __e109;
    if (__id104) {
      __e109 = __id104;
    } else {
      var __b22 = getBufferCreate(__filepath);
      var ____prev2 = currentBuffer();
      var __e110;
      try {
        setBuffer(__b22);
        setVisitedFileName(__filepath);
        insert(system.readFile(__filepath));
        __e110 = gotoChar(1);
      } finally {
        setBuffer(____prev2);
      }
      __e109 = __b22;
    }
    return __e109;
  };
  _G.findFileNoselect = findFileNoselect;
  var findFile = (name) => {
    return switchToBuffer(findFileNoselect(name));
  };
  _G.findFile = findFile;
  var evalPrint = (form) => {
    var ____id103 = (() => {
      try {
        return [true, compiler["eval"](form)];
      }
      catch (__e114) {
        return [false, __e114];
      }
    })();
    var __ok1 = ____id103[0];
    var __v32 = ____id103[1];
    if (! __ok1) {
      return print(__v32.stack);
    } else {
      if (is63(__v32)) {
        return print(str(__v32));
      }
    }
  };
  var rep = (s) => {
    return evalPrint(reader.readString(s, _G.eof, _G.eos));
  };
  buf = "";
  _G.buf = buf;
  var rep1 = (s) => {
    buf = buf + s;
    var __more1 = [];
    var __eos2 = [];
    var __form10 = reader.readString(buf, __more1, __eos2);
    if (!( __form10 === __more1)) {
      if (!( __form10 === __eos2)) {
        evalPrint(__form10);
      }
      buf = "";
      return system.write("> ");
    }
  };
  _G.rep1 = rep1;
  var repl = () => {
    system.write("> ");
    var ___in = process.stdin;
    ___in.removeListener("data", rep1);
    ___in.setEncoding("utf8");
    return ___in.on("data", rep1);
  };
  _G.repl = repl;
  var repl2 = () => {
    _G.bottomBar = new BottomBar({["_stash"]: true, ["bottomBar"]: "foo"});
    process.stdin.on("data", (s) => {
      _G.bottomBar.updateBottomBar("");
      return undefined;
    });
    setInterval(() => {
      return _G.bottomBar.updateBottomBar("");
    }, 300);
    return inquirer.prompt([{["type"]: "fuzzypath", ["name"]: "path", ["pathFilter"]: (isDirectory, nodePath) => {
      return isDirectory;
    }, ["rootPath"]: ".", ["message"]: "Select path: ", ["default"]: "node_modules", ["suggestOnly"]: false, ["validate"]: (x) => {
      return require("fs").existsSync(x);
    }}]);
  };
  _G.repl2 = repl2;
  var prompt = (args) => {
    process.stdin.removeListener("data", rep1);
    return inquirer.prompt(args).then((answers) => {
      print(str(answers));
      _G.answers = answers;
      return repl();
    });
  };
  _G.prompt = prompt;
  var ppToString = (body) => {
    if (atom63(body)) {
      return str(body);
    } else {
      if (empty63(body)) {
        return str(body);
      } else {
        var __s18 = "(";
        var ____x124 = body;
        var ____i70 = 0;
        while (____i70 < _35(____x124)) {
          var __x125 = ____x124[____i70];
          __s18 = __s18 + str(__x125) + "\n\n";
          ____i70 = ____i70 + 1;
        }
        return __s18 + ")";
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
    var __s19 = reader.stream(system.readFile(path));
    var __body58 = reader.readAll(__s19);
    if (one63(__body58)) {
      return hd(__body58);
    } else {
      return join(["do"], __body58);
    }
  };
  _G.readFile = readFile;
  var expandFile = (path) => {
    var __body59 = readFile(path);
    return compiler.expand(__body59);
  };
  _G.expandFile = expandFile;
  var compileFile = (path) => {
    var __body60 = expandFile(path);
    var __form11 = compiler.expand(join(["do"], __body60));
    return compiler.compile(__form11, {["_stash"]: true, ["stmt"]: true});
  };
  _G.compileFile = compileFile;
  var load = (path) => {
    var __code1 = compileFile(path);
    var __prev3 = _G.exports || {};
    _G.exports = {};
    var __x126 = _G.exports;
    compiler.run(__code1);
    _G.exports = __prev3;
    return __x126;
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
        var __i71 = 0;
        while (__i71 < _35(__argv)) {
          var __a11 = __argv[__i71];
          if (__a11 === "-c" || __a11 === "-x" || __a11 === "-a" || __a11 === "-o" || __a11 === "-t" || __a11 === "-e") {
            if (__i71 === edge(__argv)) {
              print("missing argument for " + __a11);
            } else {
              __i71 = __i71 + 1;
              var __val2 = __argv[__i71];
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
          __i71 = __i71 + 1;
        }
        var ____x127 = __pre1;
        var ____i72 = 0;
        while (____i72 < _35(____x127)) {
          var __file = ____x127[____i72];
          runFile(__file);
          ____i72 = ____i72 + 1;
        }
        if (nil63(__input)) {
          if (__expr6) {
            return rep(__expr6);
          } else {
            return repl();
          }
        } else {
          var __e111;
          if (__op2 === "expand") {
            __e111 = ppToString(expandFile(__input));
          } else {
            var __e112;
            if (__op2 === "read") {
              __e112 = ppToString(readFile(__input));
            } else {
              __e112 = compileFile(__input);
            }
            __e111 = __e112;
          }
          var __code2 = __e111;
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
var ____x128 = typeof(window);
if ("undefined" === ____x128) {
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
