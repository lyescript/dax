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
    var __r43 = fresh(hd(ls));
    var ____x2 = ls;
    var ____i6 = 0;
    while (____i6 < _35(____x2)) {
      var __l11 = ____x2[____i6];
      if (__l11) {
        var __n8 = _35(__r43);
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
          __r43[__k9] = __v4;
        }
      }
      ____i6 = ____i6 + 1;
    }
    return __r43;
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
      return args;
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
  var search = (s, pattern, start) => {
    var __i17 = s.indexOf(pattern, start);
    if (__i17 >= 0) {
      return __i17;
    }
  };
  _G.search = search;
  var split = (s, sep) => {
    if (s === "" || sep === "") {
      return [];
    } else {
      var __l4 = [];
      var __n15 = _35(sep);
      while (true) {
        var __i18 = search(s, sep);
        if (nil63(__i18)) {
          break;
        } else {
          add(__l4, clip(s, 0, __i18));
          s = clip(s, __i18 + __n15);
        }
      }
      add(__l4, s);
      return __l4;
    }
  };
  _G.split = split;
  var cat = (...xs) => {
    return either(reduce((a, b) => {
      return a + b;
    }, xs), "");
  };
  _G.cat = cat;
  var _43 = (...xs) => {
    return either(reduce((a, b) => {
      return a + b;
    }, xs), 0);
  };
  _G._43 = _43;
  var _45 = (...xs) => {
    return either(reduce((b, a) => {
      return a - b;
    }, reverse(xs)), 0);
  };
  _G._45 = _45;
  var _42 = (...xs) => {
    return either(reduce((a, b) => {
      return a * b;
    }, xs), 1);
  };
  _G._42 = _42;
  var _47 = (...xs) => {
    return either(reduce((b, a) => {
      return a / b;
    }, reverse(xs)), 1);
  };
  _G._47 = _47;
  var _37 = (...xs) => {
    return either(reduce((b, a) => {
      return a % b;
    }, reverse(xs)), 0);
  };
  _G._37 = _37;
  var pairwise = (f, xs) => {
    var __i19 = 0;
    while (__i19 < edge(xs)) {
      var __a = xs[__i19];
      var __b = xs[__i19 + 1];
      if (! f(__a, __b)) {
        return false;
      }
      __i19 = __i19 + 1;
    }
    return true;
  };
  _G.pairwise = pairwise;
  var _60 = (...xs) => {
    return pairwise((a, b) => {
      return a < b;
    }, xs);
  };
  _G._60 = _60;
  var _62 = (...xs) => {
    return pairwise((a, b) => {
      return a > b;
    }, xs);
  };
  _G._62 = _62;
  var _61 = (...xs) => {
    return pairwise((a, b) => {
      return a === b;
    }, xs);
  };
  _G._61 = _61;
  var _6061 = (...xs) => {
    return pairwise((a, b) => {
      return a <= b;
    }, xs);
  };
  _G._6061 = _6061;
  var _6261 = (...xs) => {
    return pairwise((a, b) => {
      return a >= b;
    }, xs);
  };
  _G._6261 = _6261;
  var number = (s) => {
    var __n16 = parseFloat(s);
    if (! isNaN(__n16)) {
      return __n16;
    }
  };
  _G.number = number;
  var numberCode63 = (n) => {
    return n >= 48 && n <= 57;
  };
  _G.numberCode63 = numberCode63;
  var numeric63 = (s) => {
    var __n17 = _35(s);
    var __i20 = 0;
    while (__i20 < __n17) {
      if (! numberCode63(code(s, __i20))) {
        return false;
      }
      __i20 = __i20 + 1;
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
    var __i21 = 0;
    while (__i21 < _35(s)) {
      var __c = char(s, __i21);
      var __e13;
      if (__c === "\n") {
        __e13 = "\\n";
      } else {
        var __e14;
        if (__c === "\r") {
          __e14 = "\\r";
        } else {
          var __e15;
          if (__c === "\"") {
            __e15 = "\\\"";
          } else {
            var __e16;
            if (__c === "\\") {
              __e16 = "\\\\";
            } else {
              __e16 = __c;
            }
            __e15 = __e16;
          }
          __e14 = __e15;
        }
        __e13 = __e14;
      }
      var __c1 = __e13;
      __s1 = __s1 + __c1;
      __i21 = __i21 + 1;
    }
    return __s1 + "\"";
  };
  _G.escape = escape;
  var simpleId63 = (x) => {
    var __id1 = string63(x);
    var __e17;
    if (__id1) {
      var ____id = (() => {
        try {
          return [true, readString(x)];
        }
        catch (__e96) {
          return [false, __e96];
        }
      })();
      var __ok = ____id[0];
      var __v9 = ____id[1];
      __e17 = __ok && __v9 === x;
    } else {
      __e17 = __id1;
    }
    return __e17;
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
                          var __xs = [];
                          var __ks = [];
                          var __l5 = stack || [];
                          add(__l5, x);
                          var ____o10 = x;
                          var __k16 = undefined;
                          for (__k16 in ____o10) {
                            var __v10 = ____o10[__k16];
                            var __e18;
                            if (numeric63(__k16)) {
                              __e18 = parseInt(__k16);
                            } else {
                              __e18 = __k16;
                            }
                            var __k17 = __e18;
                            if (number63(__k17)) {
                              __xs[__k17] = str(__v10, __l5);
                            } else {
                              add(__ks, str(__k17, __l5) + ":");
                              add(__ks, str(__v10, __l5));
                            }
                          }
                          drop(__l5);
                          var ____o11 = join(__xs, __ks);
                          var ____i23 = undefined;
                          for (____i23 in ____o11) {
                            var __v11 = ____o11[____i23];
                            var __e19;
                            if (numeric63(____i23)) {
                              __e19 = parseInt(____i23);
                            } else {
                              __e19 = ____i23;
                            }
                            var ____i231 = __e19;
                            __s = __s + __sp + __v11;
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
  var call = (f, ...args) => {
    return apply(f, args);
  };
  _G.call = call;
  var setenv = (k, keys) => {
    if (string63(k)) {
      var __e20;
      if (keys.toplevel) {
        __e20 = hd(_G.environment);
      } else {
        __e20 = last(_G.environment);
      }
      var __frame = __e20;
      var __entry = __frame[k] || {};
      var ____o12 = keys;
      var __k18 = undefined;
      for (__k18 in ____o12) {
        var __v12 = ____o12[__k18];
        var __e21;
        if (numeric63(__k18)) {
          __e21 = parseInt(__k18);
        } else {
          __e21 = __k18;
        }
        var __k19 = __e21;
        __entry[__k19] = __v12;
      }
      __frame[k] = __entry;
      return __frame[k];
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
  setenv("quote", {["macro"]: (form) => {
    return quoted(form);
  }});
  setenv("quasiquote", {["macro"]: (form) => {
    return quasiexpand(form, 1);
  }});
  setenv("set", {["macro"]: (...args) => {
    return join(["do"], map((__x10) => {
      var ____id2 = __x10;
      var __lh = ____id2[0];
      var __rh = ____id2[1];
      return ["%set", __lh, __rh];
    }, pair(args)));
  }});
  setenv("at", {["macro"]: (l, i) => {
    return [l, ["brackets", i]];
  }});
  setenv("wipe", {["macro"]: (place) => {
    return ["%delete", place];
  }});
  setenv("list", {["macro"]: (...body) => {
    body = unstash(body);
    if (keys63(body)) {
      return join(["%object"], mapo((x) => {
        return x;
      }, body));
    } else {
      return join(["%array"], body);
    }
  }});
  setenv("if", {["macro"]: (...branches) => {
    return hd(expandIf(branches));
  }});
  setenv("case", {["macro"]: (expr, ...clauses) => {
    var __x11 = unique("x");
    var __eq = (_) => {
      if (_ === "else") {
        return true;
      } else {
        return ["=", _, __x11];
      }
    };
    var __cl = (__x12) => {
      var ____id3 = __x12;
      var __a1 = ____id3[0];
      var __body = cut(____id3, 1);
      if (string63(__a1) || number63(__a1) || hd(__a1) === "quote") {
        return [__eq(__a1), join(["do"], __body)];
      } else {
        if (one63(__a1)) {
          return [__eq(hd(__a1)), join(["do"], __body)];
        } else {
          if (_35(__a1) > 1) {
            return [join(["or"], map(__eq, __a1)), join(["do"], __body)];
          }
        }
      }
    };
    return ["let", __x11, expr, join(["if"], apply(join, map(__cl, clauses)))];
  }});
  setenv("when", {["macro"]: (cond, ...body) => {
    return ["if", cond, join(["do"], body)];
  }});
  setenv("unless", {["macro"]: (cond, ...body) => {
    return ["if", ["not", cond], join(["do"], body)];
  }});
  setenv("obj", {["macro"]: (...body) => {
    body = unstash(body);
    return join(["%object"], mapo((x) => {
      return x;
    }, body));
  }});
  setenv("let", {["macro"]: (bs, ...body) => {
    if (atom63(bs)) {
      return join(["let", [bs, hd(body)]], tl(body));
    } else {
      if (none63(bs)) {
        return join(["do"], body);
      } else {
        var ____id4 = bs;
        var __lh1 = ____id4[0];
        var __rh1 = ____id4[1];
        var __bs2 = cut(____id4, 2);
        var ____id5 = bind(__lh1, either(__rh1, "nil"));
        var __id6 = ____id5[0];
        var __val = ____id5[1];
        var __bs1 = cut(____id5, 2);
        var __renames = [];
        if (! idLiteral63(__id6)) {
          var __id11 = unique(__id6);
          __renames = [__id6, __id11];
          __id6 = __id11;
        }
        return ["do", ["%local", __id6, __val], ["let-symbol", __renames, join(["let", join(__bs1, __bs2)], body)]];
      }
    }
  }});
  setenv("with", {["macro"]: (x, v, ...body) => {
    return join(["let", [x, v]], body, [x]);
  }});
  setenv("let-when", {["macro"]: (x, v, ...body) => {
    var __y4 = unique("y");
    return ["let", __y4, v, ["when", ["yes", __y4], join(["let", [x, __y4]], body)]];
  }});
  setenv("void", {["macro"]: (...body) => {
    return join(["do"], body, [["do"]]);
  }});
  setenv("%setenv", {["macro"]: (name, __x13) => {
    var __e23;
    if (is63(__x13)) {
      __e23 = __x13;
    } else {
      __e23 = {};
    }
    var __keys = __e23;
    return ["void", ["setenv", ["quote", name], join(["obj"], __keys)]];
  }});
  setenv("define-macro", {["macro"]: (name, args, ...body) => {
    return ["%setenv", name, {["macro"]: join(["fn", args], body)}];
  }});
  var parseBody = (body) => {
    var __doc = undefined;
    var __props = {};
    var __x14 = hd(body);
    if (_35(body) > 1 && stringLiteral63(__x14)) {
      __doc = __x14;
      body = tl(body);
    }
    var __x15 = hd(body);
    if (obj63(__x15) && hd(__x15) === "declare") {
      var ____x16 = tl(__x15);
      var ____i25 = 0;
      while (____i25 < _35(____x16)) {
        var ____id7 = ____x16[____i25];
        var __k20 = ____id7[0];
        var __v13 = ____id7[1];
        __props[__k20] = __v13;
        ____i25 = ____i25 + 1;
      }
      body = tl(body);
    }
    body = lower(join(["do"], body));
    return [__doc, __props, body];
  };
  _G.parseBody = parseBody;
  setenv("define-special", {["macro"]: (name, args, ...body) => {
    var ____id8 = parseBody(body);
    var __doc1 = ____id8[0];
    var __props1 = ____id8[1];
    var __body1 = ____id8[2];
    return ["%setenv", name, join({["special"]: join(["fn", args], body)}, keys(body), __props1)];
  }});
  setenv("define-symbol-macro", {["macro"]: (name, expansion) => {
    return ["%setenv", name, {["symbol"]: ["quote", expansion]}];
  }});
  setenv("define-reader", {["macro"]: (__x17, ...body) => {
    var ____id9 = __x17;
    var __char = ____id9[0];
    var __s11 = ____id9[1];
    return ["set", ["read-table", ["brackets", __char]], join(["fn", [__s11]], body)];
  }});
  setenv("define", {["macro"]: (name, x, ...body) => {
    setenv(name, {["_stash"]: true, ["variable"]: true});
    if (some63(body)) {
      return join(["%local-function", name], bind42(x, body));
    } else {
      return ["%local", name, x];
    }
  }});
  setenv("define-global", {["macro"]: (name, x, ...body) => {
    setenv(name, {["_stash"]: true, ["toplevel"]: true, ["variable"]: true});
    if (some63(body)) {
      return ["do", join(["%global-function", name], bind42(x, body)), ["%set", ["_G", "." + name], name]];
    } else {
      return ["do", ["%set", name, x], ["%set", ["_G", "." + name], name]];
    }
  }});
  setenv("with-frame", {["macro"]: (...body) => {
    var __x18 = unique("x");
    return ["do", ["add", ["_G", ".environment"], ["obj"]], ["with", __x18, join(["do"], body), ["drop", ["_G", ".environment"]]]];
  }});
  setenv("with-bindings", {["macro"]: (__x19, ...body) => {
    var ____id10 = __x19;
    var __names = ____id10[0];
    var __x20 = unique("x");
    return join(["with-frame", ["each", __x20, __names, ["if", ["default-assignment?", __x20], {[0]: "setenv", [1]: ["at", __x20, 1], ["variable"]: true}, {[0]: "setenv", [1]: __x20, ["variable"]: true}]]], body);
  }});
  setenv("let-macro", {["macro"]: (definitions, ...body) => {
    add(_G.environment, {});
    map((m) => {
      return _eval(join(["define-macro"], m));
    }, definitions);
    var ____x21 = join(["do"], macroexpand(body));
    drop(_G.environment);
    return ____x21;
  }});
  setenv("let-symbol", {["macro"]: (expansions, ...body) => {
    add(_G.environment, {});
    map((__x23) => {
      var ____id111 = __x23;
      var __name = ____id111[0];
      var __exp = ____id111[1];
      return _eval(["define-symbol-macro", __name, __exp]);
    }, pair(expansions));
    var ____x22 = join(["do"], macroexpand(body));
    drop(_G.environment);
    return ____x22;
  }});
  setenv("let-unique", {["macro"]: (names, ...body) => {
    var __bs = map((n) => {
      return [n, ["unique", ["quote", n]]];
    }, names);
    return join(["let", apply(join, __bs)], body);
  }});
  setenv("fn", {["macro"]: (args, ...body) => {
    return join(["%function"], bind42(args, body));
  }});
  setenv("apply", {["macro"]: (f, ...args) => {
    if (_35(args) > 1) {
      return ["%call", "apply", f, ["join", join(["list"], almost(args)), last(args)]];
    } else {
      return join(["%call", "apply", f], args);
    }
  }});
  setenv("guard", {["macro"]: (expr) => {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  }});
  setenv("each", {["macro"]: (x, t, ...body) => {
    var __o13 = unique("o");
    var __n21 = unique("n");
    var __i26 = unique("i");
    var __e24;
    if (atom63(x)) {
      __e24 = [__i26, x];
    } else {
      var __e25;
      if (_35(x) > 1) {
        __e25 = x;
      } else {
        __e25 = [__i26, hd(x)];
      }
      __e24 = __e25;
    }
    var ____id12 = __e24;
    var __k21 = ____id12[0];
    var __v14 = ____id12[1];
    return ["let", [__o13, t, __k21, "nil"], ["%for", __o13, __k21, ["let", [__v14, [__o13, ["brackets", __k21]]], join(["let", __k21, ["if", ["numeric?", __k21], ["parseInt", __k21], __k21]], body)]]];
  }});
  setenv("for", {["macro"]: (i, to, ...body) => {
    return ["let", i, 0, join(["while", ["<", i, to]], body, [["inc", i]])];
  }});
  setenv("step", {["macro"]: (v, t, ...body) => {
    var __x24 = unique("x");
    var __i27 = unique("i");
    return ["let", [__x24, t], ["for", __i27, ["#", __x24], join(["let", [v, ["at", __x24, __i27]]], body)]];
  }});
  setenv("set-of", {["macro"]: (...xs) => {
    var __l6 = [];
    var ____o14 = xs;
    var ____i28 = undefined;
    for (____i28 in ____o14) {
      var __x25 = ____o14[____i28];
      var __e26;
      if (numeric63(____i28)) {
        __e26 = parseInt(____i28);
      } else {
        __e26 = ____i28;
      }
      var ____i281 = __e26;
      __l6[__x25] = true;
    }
    return join(["obj"], __l6);
  }});
  setenv("join!", {["macro"]: (a, ...bs) => {
    return ["set", a, join(["join", a], bs)];
  }});
  setenv("cat!", {["macro"]: (a, ...bs) => {
    return ["set", a, join(["cat", a], bs)];
  }});
  setenv("inc", {["macro"]: (n, by) => {
    var __e27;
    if (nil63(by)) {
      __e27 = 1;
    } else {
      __e27 = by;
    }
    return ["set", n, ["+", n, __e27]];
  }});
  setenv("dec", {["macro"]: (n, by) => {
    var __e28;
    if (nil63(by)) {
      __e28 = 1;
    } else {
      __e28 = by;
    }
    return ["set", n, ["-", n, __e28]];
  }});
  setenv("with-indent", {["macro"]: (form) => {
    var __x26 = unique("x");
    return ["do", ["inc", "indent-level"], ["with", __x26, form, ["dec", "indent-level"]]];
  }});
  setenv("export", {["macro"]: (...names) => {
    return join(["do"], map((k) => {
      return ["set", ["exports", "." + k], k];
    }, names));
  }});
  setenv("when-compiling", {["macro"]: (...body) => {
    return _eval(join(["do"], body));
  }});
  setenv("during-compilation", {["macro"]: (...body) => {
    var __x27 = expand(join(["do"], body));
    _eval(__x27);
    return __x27;
  }});
  setenv("class", {["macro"]: (x, ...body) => {
    if (atom63(x)) {
      return join(["%class", [x]], body);
    } else {
      return join(["%class", x], body);
    }
  }});
  setenv(".", {["macro"]: (...args) => {
    if (none63(args)) {
      return ["this", ".constructor"];
    } else {
      if (one63(args)) {
        return join([".", "this", hd(args)], tl(args));
      } else {
        var ____id13 = args;
        var __name1 = ____id13[0];
        var __a2 = ____id13[1];
        var __bs11 = cut(____id13, 2);
        var __e29;
        if (atom63(__a2)) {
          __e29 = ["quote", compile(__a2)];
        } else {
          var __e30;
          if ("quote" === hd(__a2)) {
            __e30 = ["quote", compile(__a2[1])];
          } else {
            __e30 = __a2;
          }
          __e29 = __e30;
        }
        var __prop = __e29;
        var __expr = [__name1, ["brackets", __prop]];
        if (! atom63(__a2) && "quote" === hd(__a2) || stringLiteral63(__a2) || none63(__bs11)) {
          return __expr;
        } else {
          return join([__expr], __bs11);
        }
      }
    }
  }});
  setenv("try", {["macro"]: (...body) => {
    var __e22 = unique("e");
    return join(["%condition-case", __e22, join(["do"], map((x) => {
      if (!( obj63(x) && in63(hd(x), ["catch", "finally"]))) {
        return x;
      }
    }, body))], map((x) => {
      if (obj63(x)) {
        if (hd(x) === "finally") {
          return x;
        } else {
          if (hd(x) === "catch") {
            var ____id14 = x;
            var ___ = ____id14[0];
            var __type = ____id14[1];
            var ___var = ____id14[2];
            var __body11 = cut(____id14, 3);
            return ["catch", __type, join(["let", [___var, __e22]], __body11)];
          }
        }
      }
    }, body));
  }});
  setenv("throw", {["macro"]: (x) => {
    return ["%throw", x];
  }});
  setenv("brackets", {["macro"]: (...args) => {
    return join(["%brackets"], args);
  }});
  setenv("braces", {["macro"]: (...args) => {
    return join(["%braces"], args);
  }});
  var __exports = {};
  var __self = __exports;
  var __module = {["exports"]: __exports};
  var getenv = (k, p) => {
    if (string63(k)) {
      var __i29 = edge(_G.environment);
      while (__i29 >= 0) {
        var __b1 = _G.environment[__i29][k];
        if (is63(__b1)) {
          var __e39;
          if (p) {
            __e39 = __b1[p];
          } else {
            __e39 = __b1;
          }
          return __e39;
        } else {
          __i29 = __i29 - 1;
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
      var ____o15 = args;
      var __k22 = undefined;
      for (__k22 in ____o15) {
        var __v15 = ____o15[__k22];
        var __e40;
        if (numeric63(__k22)) {
          __e40 = parseInt(__k22);
        } else {
          __e40 = __k22;
        }
        var __k23 = __e40;
        if (! number63(__k23)) {
          add(__l7, literal(__k23));
          add(__l7, __v15);
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
        var __id15 = unique("id");
        var __bs21 = [__id15, rh];
        var ____o16 = lh;
        var __k24 = undefined;
        for (__k24 in ____o16) {
          var __v16 = ____o16[__k24];
          var __e41;
          if (numeric63(__k24)) {
            __e41 = parseInt(__k24);
          } else {
            __e41 = __k24;
          }
          var __k25 = __e41;
          var __e42;
          if (__k25 === "rest") {
            __e42 = ["cut", __id15, _35(lh)];
          } else {
            __e42 = [__id15, ["brackets", ["quote", __k25]]];
          }
          var __x28 = __e42;
          if (is63(__k25)) {
            var __e43;
            if (__v16 === true) {
              __e43 = __k25;
            } else {
              __e43 = __v16;
            }
            var __k26 = __e43;
            __bs21 = join(__bs21, bind(__k26, __x28));
          }
        }
        return __bs21;
      }
    }
  };
  _G.bind = bind;
  var bind42 = (args, body) => {
    var __e44;
    if (atom63(args)) {
      __e44 = {["rest"]: args};
    } else {
      __e44 = args;
    }
    var __args11 = __e44;
    var __args12 = {["rest"]: __args11.rest};
    var __bs3 = [];
    var __r172 = unique("r");
    var ____x29 = __args11;
    var ____i32 = 0;
    while (____i32 < _35(____x29)) {
      var __v17 = ____x29[____i32];
      if (atom63(__v17)) {
        add(__args12, __v17);
      } else {
        var __x30 = unique("x");
        add(__args12, __x30);
        __bs3 = join(__bs3, [__v17, __x30]);
      }
      ____i32 = ____i32 + 1;
    }
    return [__args12, join(["let", __bs3], cleaveInfix(body))];
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
  var expandLocal = (__x31) => {
    var ____id16 = __x31;
    var __x32 = ____id16[0];
    var __name2 = ____id16[1];
    var __value = ____id16[2];
    setenv(__name2, {["_stash"]: true, ["variable"]: true});
    return ["%local", __name2, macroexpand(__value)];
  };
  var expandFunction = (__x33) => {
    var ____id17 = __x33;
    var __x34 = ____id17[0];
    var __args2 = ____id17[1];
    var __body2 = cut(____id17, 2);
    add(_G.environment, {});
    var ____o17 = __args2;
    var ____i33 = undefined;
    for (____i33 in ____o17) {
      var ____x35 = ____o17[____i33];
      var __e45;
      if (numeric63(____i33)) {
        __e45 = parseInt(____i33);
      } else {
        __e45 = ____i33;
      }
      var ____i331 = __e45;
      if (defaultAssignment63(____x35)) {
        setenv(____x35[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x35, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x36 = join(["%function", __args2], macroexpand(__body2));
    drop(_G.environment);
    return ____x36;
  };
  var expandTable = (__x37) => {
    var ____id18 = __x37;
    var __x38 = ____id18[0];
    var __args3 = cut(____id18, 1);
    var __expr1 = join([__x38], keys(__args3));
    var ____x39 = __args3;
    var ____i34 = 0;
    while (____i34 < _35(____x39)) {
      var __x40 = ____x39[____i34];
      if (atom63(__x40)) {
        add(__expr1, [__x40, macroexpand(__x40)]);
      } else {
        if (_35(__x40) <= 2) {
          var ____id19 = __x40;
          var __name3 = ____id19[0];
          var __v18 = ____id19[1];
          add(__expr1, [macroexpand(__name3), macroexpand(__v18)]);
        } else {
          var ____id20 = __x40;
          var __prefix = ____id20[0];
          var __name4 = ____id20[1];
          var __args4 = ____id20[2];
          var __body3 = cut(____id20, 3);
          if (some63(__body3)) {
            add(_G.environment, {});
            var ____o18 = __args4;
            var ____i35 = undefined;
            for (____i35 in ____o18) {
              var ____x41 = ____o18[____i35];
              var __e46;
              if (numeric63(____i35)) {
                __e46 = parseInt(____i35);
              } else {
                __e46 = ____i35;
              }
              var ____i351 = __e46;
              if (defaultAssignment63(____x41)) {
                setenv(____x41[1], {["_stash"]: true, ["variable"]: true});
              } else {
                setenv(____x41, {["_stash"]: true, ["variable"]: true});
              }
            }
            var ____x42 = add(__expr1, join([__prefix, macroexpand(__name4), __args4], macroexpand(__body3)));
            drop(_G.environment);
            ____x42;
          } else {
            add(__expr1, [__prefix, macroexpand(__name4), macroexpand(__args4)]);
          }
        }
      }
      ____i34 = ____i34 + 1;
    }
    return __expr1;
  };
  var expandClass = (__x43) => {
    var ____id21 = __x43;
    var __x44 = ____id21[0];
    var __name5 = ____id21[1];
    var __body4 = cut(____id21, 2);
    return join([__x44, __name5], tl(expandTable(join(["%table"], __body4))));
  };
  var expandConditionCase = (__x45) => {
    var ____id22 = __x45;
    var __x46 = ____id22[0];
    var ___var1 = ____id22[1];
    var __form = ____id22[2];
    var __clauses = cut(____id22, 3);
    return join(["%condition-case", ___var1, macroexpand(__form)], map((__x47) => {
      var ____id23 = __x47;
      var __which = ____id23[0];
      var __body5 = cut(____id23, 1);
      if (__which === "finally") {
        return join([__which], map(macroexpand, __body5));
      } else {
        add(_G.environment, {});
        var ____o19 = [___var1];
        var ____i36 = undefined;
        for (____i36 in ____o19) {
          var ____x48 = ____o19[____i36];
          var __e47;
          if (numeric63(____i36)) {
            __e47 = parseInt(____i36);
          } else {
            __e47 = ____i36;
          }
          var ____i361 = __e47;
          if (defaultAssignment63(____x48)) {
            setenv(____x48[1], {["_stash"]: true, ["variable"]: true});
          } else {
            setenv(____x48, {["_stash"]: true, ["variable"]: true});
          }
        }
        var ____x49 = join([__which], map(macroexpand, __body5));
        drop(_G.environment);
        return ____x49;
      }
    }, __clauses));
  };
  _G.expandConditionCase = expandConditionCase;
  var expandDefinition = (__x50) => {
    var ____id24 = __x50;
    var __x51 = ____id24[0];
    var __name6 = ____id24[1];
    var __args5 = ____id24[2];
    var __body6 = cut(____id24, 3);
    add(_G.environment, {});
    var ____o20 = __args5;
    var ____i37 = undefined;
    for (____i37 in ____o20) {
      var ____x52 = ____o20[____i37];
      var __e48;
      if (numeric63(____i37)) {
        __e48 = parseInt(____i37);
      } else {
        __e48 = ____i37;
      }
      var ____i371 = __e48;
      if (defaultAssignment63(____x52)) {
        setenv(____x52[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x52, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x53 = join([__x51, __name6, __args5], macroexpand(__body6));
    drop(_G.environment);
    return ____x53;
  };
  var expandMacro = (form) => {
    return macroexpand(expand1(form));
  };
  var expand1 = (__x54) => {
    var ____id25 = __x54;
    var __name7 = ____id25[0];
    var __body7 = cut(____id25, 1);
    return apply(macroFunction(__name7), __body7);
  };
  _G.expand1 = expand1;
  var macroexpand = (form) => {
    if (symbolMacro63(form)) {
      return macroexpand(symbolExpansion(form));
    } else {
      if (atom63(form)) {
        return form;
      } else {
        var __x55 = hd(form);
        if (__x55 === "%local") {
          return expandLocal(form);
        } else {
          if (__x55 === "%function") {
            return expandFunction(form);
          } else {
            if (__x55 === "%table") {
              return expandTable(form);
            } else {
              if (__x55 === "%class") {
                return expandClass(form);
              } else {
                if (__x55 === "%condition-case") {
                  return expandConditionCase(form);
                } else {
                  if (__x55 === "%global-function") {
                    return expandDefinition(form);
                  } else {
                    if (__x55 === "%local-function") {
                      return expandDefinition(form);
                    } else {
                      if (macro63(__x55)) {
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
    var __xs1 = [["list"]];
    var ____o21 = form;
    var __k27 = undefined;
    for (__k27 in ____o21) {
      var __v19 = ____o21[__k27];
      var __e49;
      if (numeric63(__k27)) {
        __e49 = parseInt(__k27);
      } else {
        __e49 = __k27;
      }
      var __k28 = __e49;
      if (! number63(__k28)) {
        var __e50;
        if (quasisplice63(__v19, depth)) {
          __e50 = quasiexpand(__v19[1]);
        } else {
          __e50 = quasiexpand(__v19, depth);
        }
        var __v20 = __e50;
        last(__xs1)[__k28] = __v20;
      }
    }
    var ____x56 = form;
    var ____i39 = 0;
    while (____i39 < _35(____x56)) {
      var __x57 = ____x56[____i39];
      if (quasisplice63(__x57, depth)) {
        var __x58 = quasiexpand(__x57[1]);
        add(__xs1, __x58);
        add(__xs1, ["list"]);
      } else {
        add(last(__xs1), quasiexpand(__x57, depth));
      }
      ____i39 = ____i39 + 1;
    }
    var __pruned = keep((x) => {
      return _35(x) > 1 || !( hd(x) === "list") || keys63(x);
    }, __xs1);
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
  var expandIf = (__x59) => {
    var ____id26 = __x59;
    var __a3 = ____id26[0];
    var __b2 = ____id26[1];
    var __c11 = cut(____id26, 2);
    if (is63(__b2)) {
      return [join(["%if", __a3, __b2], expandIf(__c11))];
    } else {
      if (is63(__a3)) {
        return [__a3];
      }
    }
  };
  _G.expandIf = expandIf;
  indentLevel = 0;
  _G.indentLevel = indentLevel;
  var indentation = () => {
    var __s2 = "";
    var __i40 = 0;
    while (__i40 < indentLevel) {
      __s2 = __s2 + "  ";
      __i40 = __i40 + 1;
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
    var __id27 = camelCase(id);
    var __e51;
    if (! raw63 && numberCode63(code(__id27, 0))) {
      __e51 = "_";
    } else {
      __e51 = "";
    }
    var __id121 = __e51;
    var __i41 = 0;
    while (__i41 < _35(__id27)) {
      var __c2 = char(__id27, __i41);
      var __n30 = code(__c2);
      var __e52;
      if (__c2 === "-" && !( __id27 === "-")) {
        __e52 = "_";
      } else {
        var __e53;
        if (validCode63(__n30)) {
          __e53 = __c2;
        } else {
          var __e54;
          if (__i41 === 0) {
            __e54 = "_" + __n30;
          } else {
            __e54 = __n30;
          }
          __e53 = __e54;
        }
        __e52 = __e53;
      }
      var __c12 = __e52;
      __id121 = __id121 + __c12;
      __i41 = __i41 + 1;
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
  var __names1 = {};
  var unique = (x) => {
    if (string63(x)) {
      var __x60 = id(x);
      if (__names1[__x60]) {
        var __i42 = __names1[__x60];
        __names1[__x60] = __names1[__x60] + 1;
        return unique(__x60 + __i42);
      } else {
        __names1[__x60] = 1;
        return "__" + __x60;
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
    var __o22 = [];
    var ____o23 = t;
    var __k29 = undefined;
    for (__k29 in ____o23) {
      var __v21 = ____o23[__k29];
      var __e55;
      if (numeric63(__k29)) {
        __e55 = parseInt(__k29);
      } else {
        __e55 = __k29;
      }
      var __k30 = __e55;
      var __x61 = f(__v21);
      if (is63(__x61)) {
        add(__o22, literal(__k30));
        add(__o22, __x61);
      }
    }
    return __o22;
  };
  _G.mapo = mapo;
  infix = [{["not"]: {["js"]: "!"}}, {["*"]: true, ["/"]: true, ["%"]: true}, {["cat"]: {["js"]: "+"}}, {["-"]: true}, {["+"]: true}, {["<"]: true, [">"]: true, ["<="]: true, [">="]: true}, {["="]: {["js"]: "==="}, ["=="]: {["js"]: "=="}}, {["and"]: {["js"]: "&&"}}, {["or"]: {["js"]: "||"}}, {[":="]: {["js"]: "="}}];
  _G.infix = infix;
  var unary63 = (form) => {
    return two63(form) && in63(hd(form), ["not", "-"]);
  };
  _G.unary63 = unary63;
  var index = (v, l) => {
    var __i44 = 0;
    while (__i44 < _35(l)) {
      var __x62 = l[__i44];
      if (v === __x62) {
        return __i44;
      }
      __i44 = __i44 + 1;
    }
    return -1;
  };
  _G.index = index;
  var replaceInfix = (form, ops) => {
    if (atom63(form)) {
      return form;
    } else {
      var __i45 = _35(form);
      var ____o24 = ops;
      var __k31 = undefined;
      for (__k31 in ____o24) {
        var __v22 = ____o24[__k31];
        var __e56;
        if (numeric63(__k31)) {
          __e56 = parseInt(__k31);
        } else {
          __e56 = __k31;
        }
        var __k32 = __e56;
        var __j1 = index(__k32, form);
        if (__j1 > 0) {
          __i45 = min(__i45, __j1);
        }
      }
      if (__i45 < _35(form)) {
        return [form[__i45], parseInfix(cut(form, 0, __i45)), parseInfix(cut(form, __i45 + 1))];
      } else {
        if (one63(form)) {
          return hd(form);
        } else {
          return form;
        }
      }
    }
  };
  _G.replaceInfix = replaceInfix;
  var parseInfix = (form) => {
    var ____x63 = reverse(infix);
    var ____i47 = 0;
    while (____i47 < _35(____x63)) {
      var __ops = ____x63[____i47];
      form = replaceInfix(form, __ops);
      ____i47 = ____i47 + 1;
    }
    return form;
  };
  _G.parseInfix = parseInfix;
  var precedence = (form) => {
    if (!( atom63(form) || unary63(form))) {
      var ____o25 = infix;
      var __k33 = undefined;
      for (__k33 in ____o25) {
        var __v23 = ____o25[__k33];
        var __e57;
        if (numeric63(__k33)) {
          __e57 = parseInt(__k33);
        } else {
          __e57 = __k33;
        }
        var __k34 = __e57;
        var __x64 = hd(form);
        if (__v23[__x64]) {
          return __k34;
        }
      }
    }
    return 0;
  };
  _G.precedence = precedence;
  var getop = (op) => {
    return find((level) => {
      var __x65 = level[op];
      if (__x65 === true) {
        return op;
      } else {
        if (is63(__x65)) {
          return __x65.js;
        }
      }
    }, infix);
  };
  _G.getop = getop;
  var infix63 = (x) => {
    return is63(getop(x));
  };
  _G.infix63 = infix63;
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
    var __a4 = hd(args);
    if (accessor63(__a4)) {
      return compileNext(compile(__a4), tl(args), call63);
    } else {
      if (obj63(__a4) && accessor63(hd(__a4))) {
        var ____id28 = __a4;
        var __x66 = ____id28[0];
        var __ys = cut(____id28, 1);
        var __s3 = compileNext(compile(__x66), __ys, true);
        return compileNext(__s3, tl(args), call63);
      } else {
        var __s4 = "";
        var __c3 = "";
        var __i49 = 0;
        while (__i49 < _35(args)) {
          var __x67 = args[__i49];
          if (defaultAssignment63(__x67)) {
            var ____id29 = __x67;
            var ___1 = ____id29[0];
            var __x111 = ____id29[1];
            var __val1 = ____id29[2];
            __s4 = __s4 + __c3 + compile(__x111) + " = " + compile(__val1);
          } else {
            if (accessor63(__x67) || obj63(__x67) && accessor63(hd(__x67))) {
              return compileNext("(" + __s4 + ")", cut(args, __i49), call63);
            } else {
              __s4 = __s4 + __c3 + compile(__x67);
            }
          }
          __c3 = ", ";
          __i49 = __i49 + 1;
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
    var __i50 = 0;
    while (__i50 < _35(s)) {
      var __c4 = char(s, __i50);
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
      __i50 = __i50 + 1;
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
    var ____id30 = form;
    var __x68 = ____id30[0];
    var __args6 = cut(____id30, 1);
    var ____id31 = getenv(__x68);
    var __special = ____id31["special"];
    var __stmt = ____id31["stmt"];
    var __selfTr63 = ____id31["tr"];
    var __tr = terminator(stmt63 && ! __selfTr63);
    return apply(__special, __args6) + __tr;
  };
  var parenthesizeCall63 = (x) => {
    return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
  };
  var compileCall = (f, args, parens63) => {
    var __f1 = compile(f);
    var __args13 = compileArgs(stash42(args));
    if (parens63 || parenthesizeCall63(f)) {
      return "(" + __f1 + ")" + __args13;
    } else {
      return __f1 + __args13;
    }
  };
  _G.compileCall = compileCall;
  var parseBalanced = (xs, __x69, __x70) => {
    var __e60;
    if (is63(__x69)) {
      __e60 = __x69;
    } else {
      __e60 = "(";
    }
    var __open = __e60;
    var __e61;
    if (is63(__x70)) {
      __e61 = __x70;
    } else {
      __e61 = ")";
    }
    var __close = __e61;
    var __i51 = 0;
    var __l8 = fresh(xs);
    while (some63(xs)) {
      var __x71 = hd(xs);
      xs = tl(xs);
      if (__x71 === __open) {
        var ____id32 = parseBalanced(xs, __open, __close);
        var __form1 = ____id32[0];
        var __ys1 = ____id32[1];
        add(__l8, __form1);
        xs = __ys1;
      } else {
        if (__x71 === __close) {
          return [__l8, xs];
        } else {
          add(__l8, __x71);
        }
      }
    }
    return __l8;
  };
  _G.parseBalanced = parseBalanced;
  var opDelims = (parent, child, __x72) => {
    var __e62;
    if (is63(__x72)) {
      __e62 = __x72;
    } else {
      __e62 = {};
    }
    var ____id33 = __e62;
    var __right = ____id33["right"];
    var __e63;
    if (__right) {
      __e63 = _6261;
    } else {
      __e63 = _62;
    }
    if (__e63(precedence(child), precedence(parent))) {
      return ["(", ")"];
    } else {
      return ["", ""];
    }
  };
  var compileInfix = (form) => {
    var ____id34 = form;
    var __op = ____id34[0];
    var ____id35 = cut(____id34, 1);
    var __a5 = ____id35[0];
    var __b3 = ____id35[1];
    var ____id36 = opDelims(form, __a5);
    var __ao = ____id36[0];
    var __ac = ____id36[1];
    var ____id37 = opDelims(form, __b3, {["_stash"]: true, ["right"]: true});
    var __bo = ____id37[0];
    var __bc = ____id37[1];
    var __a6 = compile(__a5);
    var __b4 = compile(__b3);
    var __op1 = getop(__op);
    if (unary63(form)) {
      return __op1 + __ao + " " + __a6 + __ac;
    } else {
      return __ao + __a6 + __ac + " " + __op1 + " " + __bo + __b4 + __bc;
    }
  };
  var compileFunction = (args, body, __x73) => {
    var ____id38 = __x73;
    var __name8 = ____id38["name"];
    var __prefix1 = ____id38["prefix"];
    var __infix = ____id38["infix"];
    var __tr1 = ____id38["tr"];
    var __id39 = either(__name8, "");
    var __args7 = compileArgs(args);
    indentLevel = indentLevel + 1;
    var ____x74 = compile(body, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body8 = ____x74;
    var __ind = indentation();
    var __e64;
    if (__infix) {
      __e64 = " " + __infix;
    } else {
      __e64 = "";
    }
    var __mid = __e64;
    var __e65;
    if (__prefix1) {
      __e65 = __prefix1 + " ";
    } else {
      __e65 = "";
    }
    var __p1 = __e65;
    var __tr2 = either(__tr1, "");
    return __p1 + __id39 + __args7 + __mid + " {\n" + __body8 + __ind + "}" + __tr2;
  };
  _G.compileFunction = compileFunction;
  var canReturn63 = (form) => {
    return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
  };
  var compile = (form, __x75) => {
    var __e66;
    if (is63(__x75)) {
      __e66 = __x75;
    } else {
      __e66 = {};
    }
    var ____id40 = __e66;
    var __stmt1 = ____id40["stmt"];
    if (nil63(form)) {
      return "";
    } else {
      if (specialForm63(form)) {
        return compileSpecial(form, __stmt1);
      } else {
        var __tr3 = terminator(__stmt1);
        var __e67;
        if (__stmt1) {
          __e67 = indentation();
        } else {
          __e67 = "";
        }
        var __ind1 = __e67;
        var __e68;
        if (atom63(form)) {
          __e68 = compileAtom(form);
        } else {
          var __e69;
          if (infixOperator63(form)) {
            __e69 = compileInfix(form);
          } else {
            __e69 = compileCall(hd(form), tl(form));
          }
          __e68 = __e69;
        }
        var __form2 = __e68;
        return __ind1 + __form2 + __tr3;
      }
    }
  };
  _G.compile = compile;
  var lowerStatement = (form, tail63) => {
    var __hoist = [];
    var __e31 = lower(form, __hoist, true, tail63);
    var __e70;
    if (some63(__hoist) && is63(__e31)) {
      __e70 = join(["do"], __hoist, [__e31]);
    } else {
      var __e71;
      if (is63(__e31)) {
        __e71 = __e31;
      } else {
        var __e72;
        if (_35(__hoist) > 1) {
          __e72 = join(["do"], __hoist);
        } else {
          __e72 = hd(__hoist);
        }
        __e71 = __e72;
      }
      __e70 = __e71;
    }
    return either(__e70, ["do"]);
  };
  var lowerBody = (body, tail63) => {
    return lowerStatement(join(["do"], body), tail63);
  };
  var literal63 = (form) => {
    return atom63(form) || hd(form) === "%array" || hd(form) === "%object" || hd(form) === "%table";
  };
  var standalone63 = (form) => {
    return ! atom63(form) && ! infixOperator63(form) && ! literal63(form) && !( "get" === hd(form)) && !( "%statement" === hd(form)) && !( two63(form) && accessor63(form[1])) || idLiteral63(form);
  };
  var infixRun = (form) => {
    var __i52 = -1;
    var __j2 = 0;
    while (__j2 < _35(form)) {
      if (__j2 % 2 === 1) {
        if (! infix63(form[__j2])) {
          break;
        }
        __i52 = __j2 + 1;
      }
      __j2 = __j2 + 1;
    }
    return __i52 + 1;
  };
  _G.infixRun = infixRun;
  var cleaveInfix = (form) => {
    var __i53 = infixRun(form);
    if (__i53 > 0) {
      return keep(some63, apply(join, [[parseInfix(cut(form, 0, __i53))], cleaveInfix(cut(form, __i53))]));
    } else {
      return form;
    }
  };
  _G.cleaveInfix = cleaveInfix;
  var lowerDo = (args, hoist, stmt63, tail63) => {
    var ____x76 = almost(args);
    var ____i54 = 0;
    while (____i54 < _35(____x76)) {
      var __x77 = ____x76[____i54];
      var ____y5 = lower(__x77, hoist, stmt63);
      if (yes(____y5)) {
        var __e32 = ____y5;
        if (standalone63(__e32)) {
          add(hoist, __e32);
        }
      }
      ____i54 = ____i54 + 1;
    }
    var __e33 = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && canReturn63(__e33)) {
      return ["return", __e33];
    } else {
      return __e33;
    }
  };
  var lowerSet = (args, hoist, stmt63, tail63) => {
    var ____id41 = args;
    var __lh2 = ____id41[0];
    var __rh2 = ____id41[1];
    var __lh11 = lower(__lh2, hoist);
    var __rh11 = lower(__rh2, hoist);
    add(hoist, ["%set", __lh11, __rh11]);
    if (!( stmt63 && ! tail63)) {
      return __lh11;
    }
  };
  var lowerIf = (args, hoist, stmt63, tail63) => {
    var ____id42 = args;
    var __cond = ____id42[0];
    var __then = ____id42[1];
    var ___else = ____id42[2];
    if (stmt63) {
      var __e74;
      if (is63(___else)) {
        __e74 = [lowerBody([___else], tail63)];
      }
      return add(hoist, join(["%if", lower(__cond, hoist), lowerBody([__then], tail63)], __e74));
    } else {
      var __e34 = unique("e");
      add(hoist, ["%local", __e34]);
      var __e73;
      if (is63(___else)) {
        __e73 = [lower(["%set", __e34, ___else])];
      }
      add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e34, __then])], __e73));
      return __e34;
    }
  };
  var lowerShort = (x, args, hoist) => {
    var ____id43 = args;
    var __a7 = ____id43[0];
    var __b5 = ____id43[1];
    var __hoist1 = [];
    var __b11 = lower(__b5, __hoist1);
    if (some63(__hoist1)) {
      var __id44 = unique("id");
      var __e75;
      if (x === "and") {
        __e75 = ["%if", __id44, __b5, __id44];
      } else {
        __e75 = ["%if", __id44, __id44, __b5];
      }
      return lower(["do", ["%local", __id44, __a7], __e75], hoist);
    } else {
      return [x, lower(__a7, hoist), __b11];
    }
  };
  var lowerTry = (args, hoist, tail63) => {
    return add(hoist, ["%try", lowerBody(args, tail63)]);
  };
  var lowerConditionCase = (__x78, hoist, stmt63, tail63) => {
    var ____id45 = __x78;
    var ___var2 = ____id45[0];
    var __form3 = ____id45[1];
    var __clauses1 = cut(____id45, 2);
    if (stmt63) {
      return add(hoist, join(["%condition-case", ___var2, lowerBody(["do", __form3], tail63)], map((__x79) => {
        var ____id46 = __x79;
        var __which1 = ____id46[0];
        var __body9 = cut(____id46, 1);
        if (__which1 === "finally") {
          return [__which1, lowerBody(__body9)];
        } else {
          var ____id47 = __body9;
          var __x80 = ____id47[0];
          var __args8 = cut(____id47, 1);
          return [__which1, lower(__x80), lowerBody(__args8, tail63)];
        }
      }, __clauses1)));
    } else {
      var __e35 = unique("e");
      add(hoist, ["%local", __e35]);
      add(hoist, join(["%condition-case", ___var2, lower(["%set", __e35, __form3])], map((__x81) => {
        var ____id48 = __x81;
        var __which2 = ____id48[0];
        var __body10 = cut(____id48, 1);
        if (__which2 === "finally") {
          return [__which2, lowerBody(__body10)];
        } else {
          var ____id49 = __body10;
          var __x82 = ____id49[0];
          var __args9 = cut(____id49, 1);
          return [__which2, lower(__x82), lower(["%set", __e35, join(["do"], __args9)])];
        }
      }, __clauses1)));
      return __e35;
    }
  };
  _G.lowerConditionCase = lowerConditionCase;
  var lowerWhile = (args, hoist) => {
    var ____id50 = args;
    var __c5 = ____id50[0];
    var __body111 = cut(____id50, 1);
    var __pre = [];
    var __c6 = lower(__c5, __pre);
    var __e76;
    if (none63(__pre)) {
      __e76 = ["while", __c6, lowerBody(__body111)];
    } else {
      __e76 = ["while", true, join(["do"], __pre, [["%if", ["not", __c6], ["break"]], lowerBody(__body111)])];
    }
    return add(hoist, __e76);
  };
  var lowerFor = (args, hoist) => {
    var ____id51 = args;
    var __t2 = ____id51[0];
    var __k35 = ____id51[1];
    var __body12 = cut(____id51, 2);
    return add(hoist, ["%for", lower(__t2, hoist), __k35, lowerBody(__body12)]);
  };
  var lowerTable = (args, hoist, stmt63, tail63) => {
    var __expr2 = join(["%table"], keys(args));
    var ____x83 = args;
    var ____i55 = 0;
    while (____i55 < _35(____x83)) {
      var __x84 = ____x83[____i55];
      if (atom63(__x84)) {
        add(__expr2, __x84);
      } else {
        if (_35(__x84) <= 2) {
          var ____id52 = __x84;
          var __name9 = ____id52[0];
          var __v24 = ____id52[1];
          add(__expr2, [lower(__name9, hoist), lower(__v24, hoist)]);
        } else {
          var ____id53 = __x84;
          var __prefix2 = ____id53[0];
          var __name10 = ____id53[1];
          var __args10 = ____id53[2];
          var __body13 = cut(____id53, 3);
          if (some63(__body13)) {
            add(__expr2, [__prefix2, lower(__name10, hoist), __args10, lowerBody(__body13, true)]);
          } else {
            add(__expr2, [__prefix2, lower(__name10, hoist), lower(__args10, hoist)]);
          }
        }
      }
      ____i55 = ____i55 + 1;
    }
    return __expr2;
  };
  _G.lowerTable = lowerTable;
  var lowerClass = (__x85, hoist, stmt63, tail63) => {
    var ____id54 = __x85;
    var __x86 = ____id54[0];
    var __body14 = cut(____id54, 1);
    var __body15 = tl(lowerTable(__body14, hoist));
    var ____id55 = __x86;
    var __name11 = ____id55[0];
    var __parent = ____id55[1];
    var __parent1 = lower(__parent, hoist);
    var __expr3 = join(["%class", [__name11, __parent1]], __body15);
    if (stmt63 && ! tail63) {
      return add(hoist, ["%local", __name11, __expr3]);
    } else {
      return __expr3;
    }
  };
  _G.lowerClass = lowerClass;
  var lowerFunction = (args) => {
    var ____id56 = args;
    var __a8 = ____id56[0];
    var __body16 = cut(____id56, 1);
    return ["%function", __a8, lowerBody(__body16, true)];
  };
  var lowerDefinition = (kind, args, hoist) => {
    var ____id57 = args;
    var __name12 = ____id57[0];
    var __args111 = ____id57[1];
    var __body17 = cut(____id57, 2);
    return add(hoist, [kind, __name12, __args111, lowerBody(__body17, true)]);
  };
  var lowerCall = (form, hoist) => {
    var __e77;
    if (infix63(form[1]) && _35(form) > 2) {
      __e77 = parseInfix(form);
    } else {
      __e77 = form;
    }
    var __form4 = __e77;
    var __form5 = map((x) => {
      return lower(x, hoist);
    }, __form4);
    if (some63(__form5)) {
      return __form5;
    }
  };
  var pairwise63 = (form) => {
    return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
  };
  _G.pairwise63 = pairwise63;
  var lowerPairwise = (form) => {
    if (pairwise63(form)) {
      var __e36 = [];
      var ____id58 = form;
      var __x87 = ____id58[0];
      var __args121 = cut(____id58, 1);
      reduce((a, b) => {
        add(__e36, [__x87, a, b]);
        return a;
      }, __args121);
      return join(["and"], reverse(__e36));
    } else {
      return form;
    }
  };
  var lowerInfix63 = (form) => {
    return infixOperator63(form) && _35(form) > 3;
  };
  var lowerInfix = (form, hoist) => {
    var __form6 = lowerPairwise(form);
    var ____id59 = __form6;
    var __x88 = ____id59[0];
    var __args131 = cut(____id59, 1);
    return lower(reduce((a, b) => {
      return [__x88, b, a];
    }, reverse(__args131)), hoist);
  };
  var lowerSpecial = (__x89, hoist) => {
    var ____id60 = __x89;
    var __name13 = ____id60[0];
    var __args14 = cut(____id60, 1);
    var __args141 = map((x) => {
      return lower(x, hoist);
    }, __args14);
    var __form7 = join([__name13], __args141);
    return add(hoist, __form7);
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
            var ____id61 = form;
            var __x90 = ____id61[0];
            var __args15 = cut(____id61, 1);
            if (__x90 === "do") {
              return lowerDo(__args15, hoist, stmt63, tail63);
            } else {
              if (__x90 === "%call") {
                return lower(__args15, hoist, stmt63, tail63);
              } else {
                if (__x90 === "%set") {
                  return lowerSet(__args15, hoist, stmt63, tail63);
                } else {
                  if (__x90 === ":=") {
                    return lowerSet(__args15, hoist, stmt63, tail63);
                  } else {
                    if (__x90 === "%if") {
                      return lowerIf(__args15, hoist, stmt63, tail63);
                    } else {
                      if (__x90 === "%try") {
                        return lowerTry(__args15, hoist, tail63);
                      } else {
                        if (__x90 === "%condition-case") {
                          return lowerConditionCase(__args15, hoist, stmt63, tail63);
                        } else {
                          if (__x90 === "while") {
                            return lowerWhile(__args15, hoist);
                          } else {
                            if (__x90 === "%for") {
                              return lowerFor(__args15, hoist);
                            } else {
                              if (__x90 === "%table") {
                                return lowerTable(__args15, hoist, stmt63, tail63);
                              } else {
                                if (__x90 === "%class") {
                                  return lowerClass(__args15, hoist, stmt63, tail63);
                                } else {
                                  if (__x90 === "%function") {
                                    return lowerFunction(__args15);
                                  } else {
                                    if (__x90 === "%local-function" || __x90 === "%global-function") {
                                      return lowerDefinition(__x90, __args15, hoist);
                                    } else {
                                      if (in63(__x90, ["and", "or"])) {
                                        return lowerShort(__x90, __args15, hoist);
                                      } else {
                                        if (statement63(__x90)) {
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
  setenv("declare", {["special"]: (args) => {
    return "";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("function", {["special"]: (x) => {
    return compile(x);
  }});
  setenv("%call", {["special"]: (f, ...args) => {
    return compileCall(f, args);
  }});
  setenv("%brackets", {["special"]: (...args) => {
    return "[" + inner(compileArgs(args)) + "]";
  }});
  setenv("do", {["special"]: (...forms) => {
    var __s5 = "";
    var ____x91 = forms;
    var ____i56 = 0;
    while (____i56 < _35(____x91)) {
      var __x92 = ____x91[____i56];
      __s5 = __s5 + compile(__x92, {["_stash"]: true, ["stmt"]: true});
      if (! atom63(__x92)) {
        if (hd(__x92) === "return" || hd(__x92) === "break") {
          break;
        }
      }
      ____i56 = ____i56 + 1;
    }
    return __s5;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%if", {["special"]: (cond, cons, alt) => {
    var __cond1 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x93 = compile(cons, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __cons = ____x93;
    var __e78;
    if (alt) {
      indentLevel = indentLevel + 1;
      var ____x94 = compile(alt, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      __e78 = ____x94;
    }
    var __alt = __e78;
    var __ind2 = indentation();
    var __s6 = "";
    __s6 = __s6 + __ind2 + "if (" + __cond1 + ") {\n" + __cons + __ind2 + "}";
    if (__alt) {
      __s6 = __s6 + " else {\n" + __alt + __ind2 + "}";
    }
    return __s6 + "\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("while", {["special"]: (cond, form) => {
    var __cond2 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x95 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body18 = ____x95;
    var __ind3 = indentation();
    return __ind3 + "while (" + __cond2 + ") {\n" + __body18 + __ind3 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%for", {["special"]: (t, k, form) => {
    var __t3 = compile(t);
    var __ind4 = indentation();
    indentLevel = indentLevel + 1;
    var ____x96 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body19 = ____x96;
    return __ind4 + "for (" + k + " in " + __t3 + ") {\n" + __body19 + __ind4 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%try", {["special"]: (form) => {
    var __e37 = unique("e");
    var __ind5 = indentation();
    indentLevel = indentLevel + 1;
    var ____x97 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body20 = ____x97;
    var __hf = ["return", ["%array", false, __e37]];
    indentLevel = indentLevel + 1;
    var ____x98 = compile(__hf, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __h = ____x98;
    return __ind5 + "try {\n" + __body20 + __ind5 + "}\n" + __ind5 + "catch (" + __e37 + ") {\n" + __h + __ind5 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%condition-case", {["special"]: (e, form, ...clauses) => {
    var __ind6 = indentation();
    indentLevel = indentLevel + 1;
    var ____x99 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body21 = ____x99;
    var __str = __ind6 + "try {\n" + __body21 + __ind6 + "}";
    var __form8 = [];
    var ____x100 = clauses;
    var ____i57 = 0;
    while (____i57 < _35(____x100)) {
      var __x101 = ____x100[____i57];
      if (hd(__x101) === "catch") {
        var ____id62 = __x101;
        var ___2 = ____id62[0];
        var __type1 = ____id62[1];
        var __body22 = ____id62[2];
        var __e79;
        if (boolean63(__type1)) {
          __e79 = __type1;
        } else {
          __e79 = ["instanceof", e, __type1];
        }
        add(__form8, __e79);
        add(__form8, __body22);
      }
      ____i57 = ____i57 + 1;
    }
    if (! none63(__form8)) {
      add(__form8, ["%throw", e]);
      var __expr4 = hd(expandIf(__form8));
      indentLevel = indentLevel + 1;
      var ____x102 = compile(__expr4, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h1 = ____x102;
      __str = __str + " catch (" + e + ") {\n" + __h1 + __ind6 + "}";
    }
    var __clause = first((x) => {
      if (hd(x) === "finally") {
        return x;
      }
    }, clauses);
    if (__clause) {
      var __body23 = tl(__clause);
      indentLevel = indentLevel + 1;
      var ____x103 = compile(join(["do"], __body23), {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h2 = ____x103;
      __str = __str + " finally {\n" + __h2 + __ind6 + "}";
    }
    __str = __str + "\n";
    return __str;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%delete", {["special"]: (place) => {
    return indentation() + "delete " + compile(place);
  }, ["stmt"]: true});
  setenv("break", {["special"]: () => {
    return indentation() + "break";
  }, ["stmt"]: true});
  setenv("%function", {["special"]: (args, body) => {
    return compileFunction(args, body, join(keys(body), {["infix"]: "=>"}));
  }});
  setenv("%global-function", {["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%local-function", {["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("return", {["special"]: (x) => {
    var __e80;
    if (nil63(x)) {
      __e80 = "return";
    } else {
      __e80 = "return " + compile(x);
    }
    var __x104 = __e80;
    return indentation() + __x104;
  }, ["stmt"]: true});
  setenv("async", {["special"]: (...x) => {
    if (_35(x) > 1) {
      return compile(join([["async", hd(x)]], tl(x)));
    } else {
      return "async " + compile(hd(x));
    }
  }});
  setenv("await", {["special"]: (...x) => {
    if (_35(x) > 1) {
      return compile(join([["await", hd(x)]], tl(x)));
    } else {
      return "await (" + compile(hd(x)) + ")";
    }
  }});
  setenv("new", {["special"]: (...x) => {
    if (_35(x) > 1) {
      return compile(join([["new", hd(x)]], tl(x)));
    } else {
      return "new " + compile(hd(x));
    }
  }});
  setenv("instanceof", {["special"]: (a, b) => {
    return "(" + compile(a) + " instanceof " + compile(b) + ")";
  }});
  setenv("typeof", {["special"]: (x) => {
    return "typeof(" + compile(x) + ")";
  }});
  setenv("%throw", {["special"]: (x) => {
    return indentation() + "throw " + compile(x);
  }, ["stmt"]: true});
  setenv("error", {["special"]: (x) => {
    var __e38 = "throw " + compile(["new", ["Error", x]]);
    return indentation() + __e38;
  }, ["stmt"]: true});
  setenv("%local", {["special"]: (name, value) => {
    var __id63 = compile(name);
    var __value1 = compile(value);
    var __e81;
    if (is63(value)) {
      __e81 = " = " + __value1;
    } else {
      __e81 = "";
    }
    var __rh3 = __e81;
    var __keyword = "var ";
    var __ind7 = indentation();
    return __ind7 + __keyword + __id63 + __rh3;
  }, ["stmt"]: true});
  setenv("%set", {["special"]: (lh, rh) => {
    var __lh3 = compile(lh);
    var __e82;
    if (nil63(rh)) {
      __e82 = "nil";
    } else {
      __e82 = rh;
    }
    var __rh4 = compile(__e82);
    return indentation() + __lh3 + " = " + __rh4;
  }, ["stmt"]: true});
  setenv("get", {["special"]: (t, k) => {
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
  setenv("%array", {["special"]: (...forms) => {
    var __open1 = "[";
    var __close1 = "]";
    var __s7 = "";
    var __c7 = "";
    var ____o26 = forms;
    var __k36 = undefined;
    for (__k36 in ____o26) {
      var __v25 = ____o26[__k36];
      var __e83;
      if (numeric63(__k36)) {
        __e83 = parseInt(__k36);
      } else {
        __e83 = __k36;
      }
      var __k37 = __e83;
      if (number63(__k37)) {
        __s7 = __s7 + __c7 + compile(__v25);
        __c7 = ", ";
      }
    }
    return __open1 + __s7 + __close1;
  }});
  setenv("%object", {["special"]: (...forms) => {
    var __s8 = "{";
    var __c8 = "";
    var __sep = ": ";
    var ____x105 = pair(forms);
    var ____i59 = 0;
    while (____i59 < _35(____x105)) {
      var ____id64 = ____x105[____i59];
      var __k38 = ____id64[0];
      var __v26 = ____id64[1];
      __s8 = __s8 + __c8 + key(__k38) + __sep + compile(__v26);
      __c8 = ", ";
      ____i59 = ____i59 + 1;
    }
    return __s8 + "}";
  }});
  setenv("%table", {["special"]: (...forms) => {
    var __s9 = "{\n";
    var __c9 = "";
    var __sep1 = ": ";
    var __comma = ", ";
    if (hd(forms) === escape("")) {
      __comma = "";
      forms = tl(forms);
    }
    indentLevel = indentLevel + 1;
    var __ind8 = indentation();
    var ____x107 = forms;
    var ____i60 = 0;
    while (____i60 < _35(____x107)) {
      var __x108 = ____x107[____i60];
      if (atom63(__x108)) {
        __s9 = __s9 + __c9 + __ind8 + key(__x108) + __sep1 + compile(__x108);
      } else {
        if (_35(__x108) <= 2) {
          var ____id65 = __x108;
          var __name14 = ____id65[0];
          var __v27 = ____id65[1];
          __s9 = __s9 + __c9 + __ind8 + key(__name14) + __sep1 + compile(__v27);
        } else {
          var ____id66 = __x108;
          var __prefix3 = ____id66[0];
          var __name15 = ____id66[1];
          var __args16 = ____id66[2];
          var __body24 = cut(____id66, 3);
          var __e84;
          if (in63(__prefix3, ["define", "def"])) {
            __e84 = "";
          } else {
            __e84 = __prefix3;
          }
          var __prefix4 = __e84;
          var __e85;
          if (some63(__body24)) {
            __e85 = compileFunction(__args16, join(["do"], __body24), {["name"]: key(__name15), ["prefix"]: __prefix4});
          } else {
            __e85 = key(__name15) + __sep1 + compile(__args16);
          }
          var __h3 = __e85;
          __s9 = __s9 + __c9 + __ind8 + __h3;
        }
      }
      __c9 = inner(__comma) + "\n";
      ____i60 = ____i60 + 1;
    }
    var ____x106;
    indentLevel = indentLevel - 1;
    return __s9 + "\n" + indentation() + "}";
  }});
  setenv("%class", {["special"]: (name, ...body) => {
    var __e86;
    if (atom63(name)) {
      __e86 = [name];
    } else {
      __e86 = name;
    }
    var ____id67 = __e86;
    var __name16 = ____id67[0];
    var __parent11 = ____id67[1];
    var __e87;
    if (__name16) {
      __e87 = [__name16, "\" \""];
    } else {
      __e87 = [];
    }
    var __name17 = __e87;
    var __e88;
    if (__parent11) {
      __e88 = ["\"extends \"", __parent11, "\" \""];
    } else {
      __e88 = [];
    }
    var __ext = __e88;
    return compile(join(["%literal", "\"class \""], __name17, __ext, [join(["%table", "\"\""], body)]));
  }});
  setenv("%literal", {["special"]: (...args) => {
    var __s10 = "";
    var ____x109 = args;
    var ____i61 = 0;
    while (____i61 < _35(____x109)) {
      var __x110 = ____x109[____i61];
      if (stringLiteral63(__x110)) {
        __s10 = __s10 + _eval(__x110);
      } else {
        __s10 = __s10 + compile(__x110);
      }
      ____i61 = ____i61 + 1;
    }
    return __s10;
  }});
  setenv("%statement", {["special"]: (...args) => {
    var __s111 = indentation();
    var ____x1111 = args;
    var ____i62 = 0;
    while (____i62 < _35(____x1111)) {
      var __x112 = ____x1111[____i62];
      if (stringLiteral63(__x112)) {
        __s111 = __s111 + _eval(__x112);
      } else {
        __s111 = __s111 + compile(__x112);
      }
      ____i62 = ____i62 + 1;
    }
    __s111 = __s111 + "\n";
    return __s111;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%indentation", {["special"]: () => {
    return indentation();
  }});
  setenv("%spread", {["special"]: (x) => {
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
    var __l9 = [];
    while (true) {
      var __form9 = read(s);
      if (__form9 === eof) {
        break;
      }
      add(__l9, __form9);
    }
    return __l9;
  };
  _G.readAll = readAll;
  var readString = (str, more) => {
    var __x113 = read(stream(str, more));
    if (!( __x113 === eof)) {
      return __x113;
    }
  };
  _G.readString = readString;
  var key63 = (atom) => {
    return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
  };
  var expected = (s, c) => {
    var ____id68 = s;
    var __more = ____id68["more"];
    var __pos = ____id68["pos"];
    var __id69 = __more;
    var __e89;
    if (__id69) {
      __e89 = __id69;
    } else {
      throw new Error("Expected " + c + " at " + __pos);
      __e89 = undefined;
    }
    return __e89;
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
    var __e90;
    if (code(str, 0) === 45) {
      __e90 = 1;
    } else {
      __e90 = 0;
    }
    var __i63 = __e90;
    var __id70 = code(str, __i63) === 48;
    var __e91;
    if (__id70) {
      __i63 = __i63 + 1;
      var __n35 = code(str, __i63);
      __e91 = __n35 === 120 || __n35 === 88;
    } else {
      __e91 = __id70;
    }
    return __e91;
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
        var __n36 = maybeNumber(__str1);
        if (real63(__n36)) {
          return __n36;
        } else {
          return __str1;
        }
      }
    }
  };
  readTable["("] = (s) => {
    readChar(s);
    var __r313 = undefined;
    var __l10 = [];
    while (nil63(__r313)) {
      skipNonCode(s);
      var __c14 = peekChar(s);
      if (__c14 === ")") {
        readChar(s);
        __r313 = __l10;
      } else {
        if (nil63(__c14)) {
          __r313 = expected(s, ")");
        } else {
          var __x114 = read(s);
          if (key63(__x114)) {
            var __k39 = clip(__x114, 0, edge(__x114));
            var __v28 = read(s);
            __l10[__k39] = __v28;
          } else {
            add(__l10, __x114);
          }
        }
      }
    }
    return __r313;
  };
  readTable[")"] = (s) => {
    throw new Error("Unexpected ) at " + s.pos);
  };
  readTable["["] = (s) => {
    readChar(s);
    var __r316 = undefined;
    var __l111 = [];
    while (nil63(__r316)) {
      skipNonCode(s);
      var __c15 = peekChar(s);
      if (__c15 === "]") {
        readChar(s);
        __r316 = join(["brackets"], __l111);
      } else {
        if (nil63(__c15)) {
          __r316 = expected(s, "]");
        } else {
          var __x115 = read(s);
          add(__l111, __x115);
        }
      }
    }
    return __r316;
  };
  readTable["]"] = (s) => {
    throw new Error("Unexpected ] at " + s.pos);
  };
  readTable["{"] = (s) => {
    readChar(s);
    var __r319 = undefined;
    var __l121 = [];
    while (nil63(__r319)) {
      skipNonCode(s);
      var __c16 = peekChar(s);
      if (__c16 === "}") {
        readChar(s);
        __r319 = join(["braces"], __l121);
      } else {
        if (nil63(__c16)) {
          __r319 = expected(s, "}");
        } else {
          var __x116 = read(s);
          add(__l121, __x116);
        }
      }
    }
    return __r319;
  };
  readTable["}"] = (s) => {
    throw new Error("Unexpected } at " + s.pos);
  };
  readTable["\""] = (s) => {
    readChar(s);
    var __r322 = undefined;
    var __str2 = "\"";
    while (nil63(__r322)) {
      var __c17 = peekChar(s);
      if (__c17 === "\"") {
        __r322 = __str2 + readChar(s);
      } else {
        if (nil63(__c17)) {
          __r322 = expected(s, "\"");
        } else {
          if (__c17 === "\\") {
            __str2 = __str2 + readChar(s);
          }
          __str2 = __str2 + readChar(s);
        }
      }
    }
    return __r322;
  };
  readTable["|"] = (s) => {
    readChar(s);
    var __r324 = undefined;
    var __str3 = "|";
    while (nil63(__r324)) {
      var __c18 = peekChar(s);
      if (__c18 === "|") {
        __r324 = __str3 + readChar(s);
      } else {
        if (nil63(__c18)) {
          __r324 = expected(s, "|");
        } else {
          __str3 = __str3 + readChar(s);
        }
      }
    }
    return __r324;
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
    var __e92;
    if (__c19 === "\\") {
      __e92 = readChar(s);
    } else {
      __e92 = __c19;
    }
    var __c131 = __e92;
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
  var readFile = (path, __x117) => {
    var __e93;
    if (is63(__x117)) {
      __e93 = __x117;
    } else {
      __e93 = "text";
    }
    var __mode = __e93;
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
    return reduce((x, y) => {
      return x + pathSeparator + y;
    }, parts) || "";
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
    var ____id71 = (() => {
      try {
        return [true, compiler["eval"](form)];
      }
      catch (__e97) {
        return [false, __e97];
      }
    })();
    var __ok1 = ____id71[0];
    var __v29 = ____id71[1];
    if (! __ok1) {
      return print(__v29.stack);
    } else {
      if (is63(__v29)) {
        return print(str(__v29));
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
        var ____x118 = body;
        var ____i64 = 0;
        while (____i64 < _35(____x118)) {
          var __x119 = ____x118[____i64];
          __s13 = __s13 + str(__x119) + "\n\n";
          ____i64 = ____i64 + 1;
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
    var __body25 = reader.readAll(__s14);
    if (one63(__body25)) {
      return hd(__body25);
    } else {
      return join(["do"], __body25);
    }
  };
  _G.readFile = readFile;
  var expandFile = (path) => {
    var __body26 = readFile(path);
    return compiler.expand(__body26);
  };
  _G.expandFile = expandFile;
  var compileFile = (path) => {
    var __body27 = expandFile(path);
    var __form11 = compiler.expand(join(["do"], __body27));
    return compiler.compile(__form11, {["_stash"]: true, ["stmt"]: true});
  };
  _G.compileFile = compileFile;
  var load = (path) => {
    var __code1 = compileFile(path);
    var __prev = _G.exports || {};
    _G.exports = {};
    var __x120 = _G.exports;
    compiler.run(__code1);
    _G.exports = __prev;
    return __x120;
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
        var __expr5 = undefined;
        var __argv = system.argv;
        var __i65 = 0;
        while (__i65 < _35(__argv)) {
          var __a9 = __argv[__i65];
          if (__a9 === "-c" || __a9 === "-x" || __a9 === "-a" || __a9 === "-o" || __a9 === "-t" || __a9 === "-e") {
            if (__i65 === edge(__argv)) {
              print("missing argument for " + __a9);
            } else {
              __i65 = __i65 + 1;
              var __val2 = __argv[__i65];
              if (__a9 === "-c") {
                __input = __val2;
                __op2 = "compile";
              } else {
                if (__a9 === "-x") {
                  __input = __val2;
                  __op2 = "expand";
                } else {
                  if (__a9 === "-a") {
                    __input = __val2;
                    __op2 = "read";
                  } else {
                    if (__a9 === "-o") {
                      __output = __val2;
                    } else {
                      if (__a9 === "-e") {
                        __expr5 = __val2;
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (!( "-" === char(__a9, 0))) {
              add(__pre1, __a9);
            }
          }
          __i65 = __i65 + 1;
        }
        var ____x121 = __pre1;
        var ____i66 = 0;
        while (____i66 < _35(____x121)) {
          var __file = ____x121[____i66];
          runFile(__file);
          ____i66 = ____i66 + 1;
        }
        if (nil63(__input)) {
          if (__expr5) {
            return rep(__expr5);
          } else {
            return repl();
          }
        } else {
          var __e94;
          if (__op2 === "expand") {
            __e94 = ppToString(expandFile(__input));
          } else {
            var __e95;
            if (__op2 === "read") {
              __e95 = ppToString(readFile(__input));
            } else {
              __e95 = compileFile(__input);
            }
            __e94 = __e95;
          }
          var __code2 = __e94;
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
var ____x122 = typeof(window);
if ("undefined" === ____x122) {
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
