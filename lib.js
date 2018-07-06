var create = (globals) => {
  var _G = Object.assign({}, globals || {});
  _G._G = _G;
  _G.environment = [{}];
  is63 = (x) => {
    return !( x === undefined || x === null);
  };
  _G.Mapping = class Mapping {
    constructor() {
      this.map = Object.create(null);
      return this;
    }
    get(k) {
      return this.map[k];
    }
    set(k, v) {
      this.map[k] = v;
      return this.map[k];
    }
    has(k) {
      return this.map.hasOwnProperty(k);
    }
    get [Symbol.iterator]() {
      return this.map[Symbol.iterator];
    }
    values() {
      var __l = [];
      var ____o = this.map;
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
        __l.push(__v);
      }
      return __l;
    }
  };
  _G.Sym = class Sym {
    constructor(meta, ns, name) {
      this.meta = meta;
      this.ns = ns;
      this.name = name;
      return this;
    }
    toString() {
      if (this.ns) {
        return this.ns + "/" + this.name;
      } else {
        return this.name;
      }
    }
  };
  _G.Unbound = class Unbound {

  };
  _G.Var = class Var {
    constructor(ns, sym, __x) {
      var __e1;
      if (is63(__x)) {
        __e1 = __x;
      } else {
        __e1 = new _G.Unbound(this);
      }
      var __root = __e1;
      this.ns = ns;
      this.sym = sym;
      this.root = __root;
      return this;
    }
    hasRoot() {
      return ! (this.root instanceof _G.Unbound);
    }
    bindRoot(root) {
      this.root = root;
      return this.root;
    }
    unbindRoot() {
      this.root = new Unbound(this);
      return this.root;
    }
    deref() {
      var __b = this.getThreadBinding();
      if (__b) {
        return __b.val;
      } else {
        return this.root;
      }
    }
    get() {
      return this.deref();
    }
    set(val) {
      var __b1 = this.getThreadBinding();
      if (__b1) {
        __b1.val = val;
        return __b1.val;
      }
      throw new Error("Can't change/establish root binding of: " + this.fqn() + " with set");
    }
    getThreadBinding() {
      return getenv(this.fqn());
    }
    static pushThreadBindings(bindings) {
      return _G.environment.push(bindings);
    }
    static popThreadBindings() {
      return _G.environment.pop();
    }
    fqn() {
      return "#'" + this.ns.name + "/" + this.sym.name;
    }
    toString() {
      return this.fqn();
    }
    str() {
      return this.toString();
    }
  };
  _G.Namespace = class Namespace {
    constructor(name) {
      this.name = name;
      this.mappings = new _G.Mapping;
      this.aliases = new _G.Mapping;
      Namespace.namespaces().set(name, this);
      return this;
    }
    static namespaces() {
      var __id3 = Namespace._namespaces;
      var __e2;
      if (__id3) {
        __e2 = __id3;
      } else {
        Namespace._namespaces = new _G.Mapping;
        __e2 = Namespace._namespaces;
      }
      return __e2;
    }
    static all() {
      return [...Namespace.namespaces().values()];
    }
    static sym(s) {
      if (!( s.ns || s.name)) {
        var __i1 = s.indexOf("/");
        if (__i1 || __i1 === 0) {
          s = new _G.Sym(undefined, s.substr(0, __i1), s.substr(__i1 + 1));
        } else {
          s = new _G.Sym(undefined, undefined, s);
        }
      }
      return s;
    }
    static find(name) {
      return Namespace.namespaces().get(Namespace.sym(name));
    }
    static findOrCreate(name) {
      var __ns = Namespace.namespaces().get(name);
      return __ns || new Namespace(name);
    }
    intern(sym) {
      sym = Namespace.sym(sym);
      if (sym.ns) {
        throw new Error("Can't intern namespace-qualified symbol");
      }
      var __m = this.mappings;
      var __o1 = undefined;
      var __v1 = undefined;
      while (true) {
        __o1 = __m.get(sym);
        if (! ! __o1) {
          break;
        }
        if (! __v1) {
          __v1 = new _G.Var(this, sym);
        }
        __m.set(sym, __v1);
      }
      if ((__o1 instanceof _G.Var) && __o1.ns === this) {
        return __o1;
      }
      if (! __v1) {
        __v1 = new _G.Var(this, sym);
      }
      this.warnOrFailOnReplace(sym, __o1, __v1);
      __m.set(sym, __v1);
      return __v1;
    }
    warnOrFailOnReplace(sym, o, v) {
      if ((o instanceof _G.Var)) {
        var __ns1 = o.ns;
        if (__ns1 === this || (v instanceof _G.Var) && v.ns === RT.DAX_NS) {
          return;
        }
        if (!( __ns1 === RT.DAX_NS)) {
          throw new Error(str(sym) + " already refers to: " + str(o) + " in namespace: " + str(name));
        }
      }
      return print(str(sym) + " already refers to: " + str(o) + " in namespace: " + str(name) + ", being replaced by: " + _43 + str(v));
    }
  };
  _G._42ns42 = _G.Namespace.findOrCreate("dax.core");
  _G.Namespace.findOrCreate("dax.lang");
  _G.Namespace.findOrCreate("dax.reader");
  _G.Namespace.findOrCreate("dax.compiler");
  _G.Namespace.findOrCreate("dax.system");
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
    var __n1 = x.length;
    if (number63(__n1)) {
      return __n1;
    } else {
      var __n2 = -1;
      var ____o2 = x;
      var __k2 = undefined;
      for (__k2 in ____o2) {
        var __v2 = ____o2[__k2];
        var __e3;
        if (numeric63(__k2)) {
          __e3 = parseInt(__k2);
        } else {
          __e3 = __k2;
        }
        var __k3 = __e3;
        if (number63(__k3) && __k3 > __n2) {
          __n2 = __k3;
        }
      }
      return __n2 + 1;
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
    var ____x1 = type(x);
    if ("object" === ____x1) {
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
      if ("undefined" === ____x1) {
        return [];
      } else {
        if ("symbol" === ____x1) {
          return Symbol();
        } else {
          if ("string" === ____x1) {
            return "";
          } else {
            if ("number" === ____x1) {
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
    var __l1 = fresh(x);
    var __j = 0;
    var __e4;
    if (nil63(from) || from < 0) {
      __e4 = 0;
    } else {
      __e4 = from;
    }
    var __i3 = __e4;
    var __n4 = _35(x);
    var __e5;
    if (nil63(upto) || upto > __n4) {
      __e5 = __n4;
    } else {
      __e5 = upto;
    }
    var __upto = __e5;
    while (__i3 < __upto) {
      __l1[__j] = x[__i3];
      __i3 = __i3 + 1;
      __j = __j + 1;
    }
    var ____o3 = x;
    var __k4 = undefined;
    for (__k4 in ____o3) {
      var __v3 = ____o3[__k4];
      var __e6;
      if (numeric63(__k4)) {
        __e6 = parseInt(__k4);
      } else {
        __e6 = __k4;
      }
      var __k5 = __e6;
      if (! number63(__k5)) {
        __l1[__k5] = __v3;
      }
    }
    return __l1;
  };
  _G.cut = cut;
  var keys = (x) => {
    var __t = {};
    var ____o4 = x;
    var __k6 = undefined;
    for (__k6 in ____o4) {
      var __v4 = ____o4[__k6];
      var __e7;
      if (numeric63(__k6)) {
        __e7 = parseInt(__k6);
      } else {
        __e7 = __k6;
      }
      var __k7 = __e7;
      if (! number63(__k7)) {
        __t[__k7] = __v4;
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
      var __i6 = edge(l);
      var __x2 = l[__i6];
      delete l[__i6];
      return __x2;
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
    var __l11 = fresh(l);
    var __n7 = edge(l);
    var ____o5 = l;
    var __k8 = undefined;
    for (__k8 in ____o5) {
      var __v5 = ____o5[__k8];
      var __e8;
      if (numeric63(__k8)) {
        __e8 = parseInt(__k8);
      } else {
        __e8 = __k8;
      }
      var __k9 = __e8;
      if (number63(__k9)) {
        __k9 = __n7 - __k9;
      }
      __l11[__k9] = __v5;
    }
    return __l11;
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
    var __r72 = fresh(hd(__ls));
    var ____x3 = __ls;
    var ____i8 = 0;
    while (____i8 < _35(____x3)) {
      var __l2 = ____x3[____i8];
      if (__l2) {
        var __n9 = _35(__r72);
        var ____o6 = __l2;
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
          if (number63(__k11)) {
            __k11 = __k11 + __n9;
          }
          __r72[__k11] = __v6;
        }
      }
      ____i8 = ____i8 + 1;
    }
    return __r72;
  };
  _G.join = join;
  var find = (f, t) => {
    var ____o7 = t;
    var ____i10 = undefined;
    for (____i10 in ____o7) {
      var __x4 = ____o7[____i10];
      var __e10;
      if (numeric63(____i10)) {
        __e10 = parseInt(____i10);
      } else {
        __e10 = ____i10;
      }
      var ____i101 = __e10;
      var __y = f(__x4);
      if (__y) {
        return __y;
      }
    }
  };
  _G.find = find;
  var first = (f, l) => {
    var ____x5 = l;
    var ____i11 = 0;
    while (____i11 < _35(____x5)) {
      var __x6 = ____x5[____i11];
      var __y1 = f(__x6);
      if (__y1) {
        return __y1;
      }
      ____i11 = ____i11 + 1;
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
    var __i12 = 0;
    while (__i12 < _35(l)) {
      add(__l12, [l[__i12], l[__i12 + 1]]);
      __i12 = __i12 + 1;
      __i12 = __i12 + 1;
    }
    return __l12;
  };
  _G.pair = pair;
  var sort = (l, f) => {
    var __e11;
    if (f) {
      __e11 = (a, b) => {
        if (f(a, b)) {
          return -1;
        } else {
          return 1;
        }
      };
    }
    return l.sort(__e11);
  };
  _G.sort = sort;
  var map = (f, x) => {
    var __t1 = fresh(x);
    var ____x7 = x;
    var ____i13 = 0;
    while (____i13 < _35(____x7)) {
      var __v7 = ____x7[____i13];
      var __y2 = f(__v7);
      if (is63(__y2)) {
        add(__t1, __y2);
      }
      ____i13 = ____i13 + 1;
    }
    var ____o8 = x;
    var __k12 = undefined;
    for (__k12 in ____o8) {
      var __v8 = ____o8[__k12];
      var __e12;
      if (numeric63(__k12)) {
        __e12 = parseInt(__k12);
      } else {
        __e12 = __k12;
      }
      var __k13 = __e12;
      if (! number63(__k13)) {
        var __y3 = f(__v8);
        if (is63(__y3)) {
          __t1[__k13] = __y3;
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
    var ____o9 = t;
    var __k14 = undefined;
    for (__k14 in ____o9) {
      var __v9 = ____o9[__k14];
      var __e13;
      if (numeric63(__k14)) {
        __e13 = parseInt(__k14);
      } else {
        __e13 = __k14;
      }
      var __k15 = __e13;
      if (! number63(__k15)) {
        return true;
      }
    }
    return false;
  };
  _G.keys63 = keys63;
  var empty63 = (t) => {
    var ____o10 = t;
    var ____i16 = undefined;
    for (____i16 in ____o10) {
      var __x8 = ____o10[____i16];
      var __e14;
      if (numeric63(____i16)) {
        __e14 = parseInt(____i16);
      } else {
        __e14 = ____i16;
      }
      var ____i161 = __e14;
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
        var __l3 = [];
        var ____x9 = args;
        var ____i17 = 0;
        while (____i17 < _35(____x9)) {
          var __x10 = ____x9[____i17];
          add(__l3, __x10);
          ____i17 = ____i17 + 1;
        }
        var __p = keys(args);
        __p._stash = __p._stash || true;
        add(__l3, __p);
        return __l3;
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
      var __l4 = last(args);
      if (obj63(__l4) && __l4._stash) {
        var __args1 = almost(args);
        var ____o11 = __l4;
        var __k16 = undefined;
        for (__k16 in ____o11) {
          var __v10 = ____o11[__k16];
          var __e15;
          if (numeric63(__k16)) {
            __e15 = parseInt(__k16);
          } else {
            __e15 = __k16;
          }
          var __k17 = __e15;
          if (!( __k17 === "_stash")) {
            __args1[__k17] = __v10;
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
      var ____o12 = l;
      var __k18 = undefined;
      for (__k18 in ____o12) {
        var __v11 = ____o12[__k18];
        var __e16;
        if (numeric63(__k18)) {
          __e16 = parseInt(__k18);
        } else {
          __e16 = __k18;
        }
        var __k19 = __e16;
        if (!( __k19 === "_stash")) {
          args1[__k19] = __v11;
        }
      }
    } else {
      return l;
    }
  };
  _G.destash33 = destash33;
  var search = (s, pattern, start) => {
    var __i20 = s.indexOf(pattern, start);
    if (__i20 >= 0) {
      return __i20;
    }
  };
  _G.search = search;
  var split = (s, sep) => {
    if (s === "" || sep === "") {
      return [];
    } else {
      var __l5 = [];
      var __n17 = _35(sep);
      while (true) {
        var __i21 = search(s, sep);
        if (nil63(__i21)) {
          break;
        } else {
          add(__l5, clip(s, 0, __i21));
          s = clip(s, __i21 + __n17);
        }
      }
      add(__l5, s);
      return __l5;
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
    var __i22 = 0;
    while (__i22 < edge(xs)) {
      var __a = xs[__i22];
      var __b2 = xs[__i22 + 1];
      if (! f(__a, __b2)) {
        return false;
      }
      __i22 = __i22 + 1;
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
    var __n18 = parseFloat(s);
    if (! isNaN(__n18)) {
      return __n18;
    }
  };
  _G.number = number;
  var numberCode63 = (n) => {
    return n >= 48 && n <= 57;
  };
  _G.numberCode63 = numberCode63;
  var numeric63 = (s) => {
    var __n19 = _35(s);
    var __i23 = 0;
    while (__i23 < __n19) {
      if (! numberCode63(code(s, __i23))) {
        return false;
      }
      __i23 = __i23 + 1;
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
    var __i24 = 0;
    while (__i24 < _35(s)) {
      var __c = char(s, __i24);
      var __e17;
      if (__c === "\n") {
        __e17 = "\\n";
      } else {
        var __e18;
        if (__c === "\r") {
          __e18 = "\\r";
        } else {
          var __e19;
          if (__c === "\"") {
            __e19 = "\\\"";
          } else {
            var __e20;
            if (__c === "\\") {
              __e20 = "\\\\";
            } else {
              __e20 = __c;
            }
            __e19 = __e20;
          }
          __e18 = __e19;
        }
        __e17 = __e18;
      }
      var __c1 = __e17;
      __s1 = __s1 + __c1;
      __i24 = __i24 + 1;
    }
    return __s1 + "\"";
  };
  _G.escape = escape;
  var simpleId63 = (x) => {
    var __id4 = string63(x);
    var __e21;
    if (__id4) {
      var ____id = (() => {
        try {
          return [true, readString(x)];
        }
        catch (__e94) {
          return [false, __e94];
        }
      })();
      var __ok = ____id[0];
      var __v12 = ____id[1];
      __e21 = __ok && __v12 === x;
    } else {
      __e21 = __id4;
    }
    return __e21;
  };
  _G.simpleId63 = simpleId63;
  var str = (x, stack) => {
    if (nil63(x)) {
      return "nil";
    } else {
      if (x.str) {
        return x.str(stack);
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
                            var __l6 = stack || [];
                            add(__l6, x);
                            var ____o13 = x;
                            var __k20 = undefined;
                            for (__k20 in ____o13) {
                              var __v13 = ____o13[__k20];
                              var __e22;
                              if (numeric63(__k20)) {
                                __e22 = parseInt(__k20);
                              } else {
                                __e22 = __k20;
                              }
                              var __k21 = __e22;
                              if (number63(__k21)) {
                                __xs11[__k21] = str(__v13, __l6);
                              } else {
                                add(__ks, str(__k21, __l6) + ":");
                                add(__ks, str(__v13, __l6));
                              }
                            }
                            drop(__l6);
                            var ____o14 = join(__xs11, __ks);
                            var ____i26 = undefined;
                            for (____i26 in ____o14) {
                              var __v14 = ____o14[____i26];
                              var __e23;
                              if (numeric63(____i26)) {
                                __e23 = parseInt(____i26);
                              } else {
                                __e23 = ____i26;
                              }
                              var ____i261 = __e23;
                              __s = __s + __sp + __v14;
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
    }
  };
  _G.str = str;
  var apply = (f, args) => {
    var __args = stash(args);
    return f.apply(f, __args);
  };
  _G.apply = apply;
  var call = (f, ...__r111) => {
    var ____r111 = unstash(__r111);
    var __f = destash33(f, ____r111);
    var ____id1 = ____r111;
    var __args11 = cut(____id1, 0);
    return apply(__f, __args11);
  };
  _G.call = call;
  var setenv = (k, ...__r112) => {
    var ____r112 = unstash(__r112);
    var __k22 = destash33(k, ____r112);
    var ____id2 = ____r112;
    var __keys = cut(____id2, 0);
    if (string63(__k22)) {
      var __e24;
      if (__keys.toplevel) {
        __e24 = hd(_G.environment);
      } else {
        __e24 = last(_G.environment);
      }
      var __frame = __e24;
      var __entry = __frame[__k22] || {};
      var ____o15 = __keys;
      var __k23 = undefined;
      for (__k23 in ____o15) {
        var __v15 = ____o15[__k23];
        var __e25;
        if (numeric63(__k23)) {
          __e25 = parseInt(__k23);
        } else {
          __e25 = __k23;
        }
        var __k24 = __e25;
        __entry[__k24] = __v15;
      }
      __frame[__k22] = __entry;
      return __frame[__k22];
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
    return join(["do"], map((__x11) => {
      var ____id5 = __x11;
      var __lh = ____id5[0];
      var __rh = ____id5[1];
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
  setenv("case", {["_stash"]: true, ["macro"]: (expr, ...__r120) => {
    var ____r120 = unstash(__r120);
    var __expr = destash33(expr, ____r120);
    var ____id6 = ____r120;
    var __clauses = cut(____id6, 0);
    var __x12 = unique("x");
    var __eq = (_) => {
      if (_ === "else") {
        return true;
      } else {
        return ["=", _, __x12];
      }
    };
    var __cl = (__x13) => {
      var ____id7 = __x13;
      var __a1 = ____id7[0];
      var __body1 = cut(____id7, 1);
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
    return ["let", __x12, __expr, join(["if"], apply(join, map(__cl, __clauses)))];
  }});
  setenv("when", {["_stash"]: true, ["macro"]: (cond, ...__r123) => {
    var ____r123 = unstash(__r123);
    var __cond = destash33(cond, ____r123);
    var ____id8 = ____r123;
    var __body2 = cut(____id8, 0);
    return ["if", __cond, join(["do"], __body2)];
  }});
  setenv("unless", {["_stash"]: true, ["macro"]: (cond, ...__r124) => {
    var ____r124 = unstash(__r124);
    var __cond1 = destash33(cond, ____r124);
    var ____id9 = ____r124;
    var __body3 = cut(____id9, 0);
    return ["if", ["not", __cond1], join(["do"], __body3)];
  }});
  setenv("obj", {["_stash"]: true, ["macro"]: (...body) => {
    var __body4 = unstash(body);
    return join(["%object"], mapo((x) => {
      return x;
    }, __body4));
  }});
  setenv("let", {["_stash"]: true, ["macro"]: (bs, ...__r126) => {
    var ____r126 = unstash(__r126);
    var __bs = destash33(bs, ____r126);
    var ____id10 = ____r126;
    var __body5 = cut(____id10, 0);
    if (atom63(__bs)) {
      return join(["let", [__bs, hd(__body5)]], tl(__body5));
    } else {
      if (none63(__bs)) {
        return join(["do"], __body5);
      } else {
        var ____id11 = __bs;
        var __lh1 = ____id11[0];
        var __rh1 = ____id11[1];
        var __bs2 = cut(____id11, 2);
        var ____id12 = bind(__lh1, either(__rh1, "nil"));
        var __id13 = ____id12[0];
        var __val = ____id12[1];
        var __bs1 = cut(____id12, 2);
        var __renames = [];
        if (! idLiteral63(__id13)) {
          var __id111 = unique(__id13);
          __renames = [__id13, __id111];
          __id13 = __id111;
        }
        return ["do", ["%local", __id13, __val], ["let-symbol", __renames, join(["let", join(__bs1, __bs2)], __body5)]];
      }
    }
  }});
  setenv("with", {["_stash"]: true, ["macro"]: (x, v, ...__r127) => {
    var ____r127 = unstash(__r127);
    var __x14 = destash33(x, ____r127);
    var __v16 = destash33(v, ____r127);
    var ____id14 = ____r127;
    var __body6 = cut(____id14, 0);
    return join(["let", [__x14, __v16]], __body6, [__x14]);
  }});
  setenv("let-when", {["_stash"]: true, ["macro"]: (x, v, ...__r128) => {
    var ____r128 = unstash(__r128);
    var __x15 = destash33(x, ____r128);
    var __v17 = destash33(v, ____r128);
    var ____id15 = ____r128;
    var __body7 = cut(____id15, 0);
    var __y4 = unique("y");
    return ["let", __y4, __v17, ["when", ["yes", __y4], join(["let", [__x15, __y4]], __body7)]];
  }});
  setenv("void", {["_stash"]: true, ["macro"]: (...body) => {
    var __body8 = unstash(body);
    return join(["do"], __body8, [["do"]]);
  }});
  setenv("%setenv", {["_stash"]: true, ["macro"]: (name, ...__r129) => {
    var ____r129 = unstash(__r129);
    var __name = destash33(name, ____r129);
    var ____id16 = ____r129;
    var __keys1 = cut(____id16, 0);
    return ["void", join(["setenv", ["quote", __name]], __keys1)];
  }});
  setenv("define-macro", {["_stash"]: true, ["macro"]: (name, args, ...__r130) => {
    var ____r130 = unstash(__r130);
    var __name1 = destash33(name, ____r130);
    var __args3 = destash33(args, ____r130);
    var ____id17 = ____r130;
    var __body9 = cut(____id17, 0);
    return {[0]: "%setenv", [1]: __name1, ["macro"]: join(["fn", __args3], __body9)};
  }});
  setenv("define-special", {["_stash"]: true, ["macro"]: (name, args, ...__r131) => {
    var ____r131 = unstash(__r131);
    var __name2 = destash33(name, ____r131);
    var __args4 = destash33(args, ____r131);
    var ____id18 = ____r131;
    var __body10 = cut(____id18, 0);
    return join({[0]: "%setenv", [1]: __name2, ["special"]: join(["fn", __args4], __body10)}, keys(__body10));
  }});
  setenv("define-symbol-macro", {["_stash"]: true, ["macro"]: (name, expansion) => {
    return {[0]: "%setenv", [1]: name, ["symbol"]: ["quote", expansion]};
  }});
  setenv("define-reader", {["_stash"]: true, ["macro"]: (__x16, ...__r133) => {
    var ____id19 = __x16;
    var __char = ____id19[0];
    var __s11 = ____id19[1];
    var ____r133 = unstash(__r133);
    var ____x16 = destash33(__x16, ____r133);
    var ____id20 = ____r133;
    var __body11 = cut(____id20, 0);
    return ["set", ["read-table", ["brackets", __char]], join(["fn", [__s11]], __body11)];
  }});
  setenv("define", {["_stash"]: true, ["macro"]: (name, x, ...__r134) => {
    var ____r134 = unstash(__r134);
    var __name3 = destash33(name, ____r134);
    var __x17 = destash33(x, ____r134);
    var ____id21 = ____r134;
    var __body12 = cut(____id21, 0);
    setenv(__name3, {["_stash"]: true, ["variable"]: true});
    if (some63(__body12)) {
      return join(["%local-function", __name3], bind42(__x17, __body12));
    } else {
      return ["%local", __name3, __x17];
    }
  }});
  setenv("define-global", {["_stash"]: true, ["macro"]: (name, x, ...__r135) => {
    var ____r135 = unstash(__r135);
    var __name4 = destash33(name, ____r135);
    var __x18 = destash33(x, ____r135);
    var ____id22 = ____r135;
    var __body13 = cut(____id22, 0);
    setenv(__name4, {["_stash"]: true, ["toplevel"]: true, ["variable"]: true});
    if (some63(__body13)) {
      return ["do", join(["%global-function", __name4], bind42(__x18, __body13)), ["%set", ["_G", "." + __name4], __name4]];
    } else {
      return ["do", ["%set", __name4, __x18], ["%set", ["_G", "." + __name4], __name4]];
    }
  }});
  setenv("with-frame", {["_stash"]: true, ["macro"]: (...body) => {
    var __body14 = unstash(body);
    var __x19 = unique("x");
    return ["do", ["add", ["_G", ".environment"], ["obj"]], ["with", __x19, join(["do"], __body14), ["drop", ["_G", ".environment"]]]];
  }});
  setenv("with-bindings", {["_stash"]: true, ["macro"]: (__x20, ...__r136) => {
    var ____id23 = __x20;
    var __names = ____id23[0];
    var ____r136 = unstash(__r136);
    var ____x20 = destash33(__x20, ____r136);
    var ____id24 = ____r136;
    var __body15 = cut(____id24, 0);
    var __x21 = unique("x");
    return join(["with-frame", ["each", __x21, __names, ["if", ["default-assignment?", __x21], {[0]: "setenv", [1]: ["at", __x21, 1], ["variable"]: true}, {[0]: "setenv", [1]: __x21, ["variable"]: true}]]], __body15);
  }});
  setenv("let-macro", {["_stash"]: true, ["macro"]: (definitions, ...__r137) => {
    var ____r137 = unstash(__r137);
    var __definitions = destash33(definitions, ____r137);
    var ____id25 = ____r137;
    var __body16 = cut(____id25, 0);
    add(_G.environment, {});
    map((m) => {
      return _eval(join(["define-macro"], m));
    }, __definitions);
    var ____x22 = join(["do"], macroexpand(__body16));
    drop(_G.environment);
    return ____x22;
  }});
  setenv("let-symbol", {["_stash"]: true, ["macro"]: (expansions, ...__r139) => {
    var ____r139 = unstash(__r139);
    var __expansions = destash33(expansions, ____r139);
    var ____id26 = ____r139;
    var __body17 = cut(____id26, 0);
    add(_G.environment, {});
    map((__x24) => {
      var ____id27 = __x24;
      var __name5 = ____id27[0];
      var __exp = ____id27[1];
      return _eval(["define-symbol-macro", __name5, __exp]);
    }, pair(__expansions));
    var ____x23 = join(["do"], macroexpand(__body17));
    drop(_G.environment);
    return ____x23;
  }});
  setenv("let-unique", {["_stash"]: true, ["macro"]: (names, ...__r141) => {
    var ____r141 = unstash(__r141);
    var __names1 = destash33(names, ____r141);
    var ____id28 = ____r141;
    var __body18 = cut(____id28, 0);
    var __bs11 = map((n) => {
      return [n, ["unique", ["quote", n]]];
    }, __names1);
    return join(["let", apply(join, __bs11)], __body18);
  }});
  setenv("fn", {["_stash"]: true, ["macro"]: (args, ...__r143) => {
    var ____r143 = unstash(__r143);
    var __args5 = destash33(args, ____r143);
    var ____id29 = ____r143;
    var __body19 = cut(____id29, 0);
    return join(["%function"], bind42(__args5, __body19));
  }});
  setenv("apply", {["_stash"]: true, ["macro"]: (f, ...__r144) => {
    var ____r144 = unstash(__r144);
    var __f1 = destash33(f, ____r144);
    var ____id30 = ____r144;
    var __args6 = cut(____id30, 0);
    if (_35(__args6) > 1) {
      return ["%call", "apply", __f1, ["join", join(["list"], almost(__args6)), last(__args6)]];
    } else {
      return join(["%call", "apply", __f1], __args6);
    }
  }});
  setenv("guard", {["_stash"]: true, ["macro"]: (expr) => {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  }});
  setenv("each", {["_stash"]: true, ["macro"]: (x, t, ...__r146) => {
    var ____r146 = unstash(__r146);
    var __x25 = destash33(x, ____r146);
    var __t2 = destash33(t, ____r146);
    var ____id31 = ____r146;
    var __body20 = cut(____id31, 0);
    var __o16 = unique("o");
    var __n23 = unique("n");
    var __i28 = unique("i");
    var __e27;
    if (atom63(__x25)) {
      __e27 = [__i28, __x25];
    } else {
      var __e28;
      if (_35(__x25) > 1) {
        __e28 = __x25;
      } else {
        __e28 = [__i28, hd(__x25)];
      }
      __e27 = __e28;
    }
    var ____id32 = __e27;
    var __k25 = ____id32[0];
    var __v18 = ____id32[1];
    return ["let", [__o16, __t2, __k25, "nil"], ["%for", __o16, __k25, ["let", [__v18, [__o16, ["brackets", __k25]]], join(["let", __k25, ["if", ["numeric?", __k25], ["parseInt", __k25], __k25]], __body20)]]];
  }});
  setenv("for", {["_stash"]: true, ["macro"]: (i, to, ...__r147) => {
    var ____r147 = unstash(__r147);
    var __i29 = destash33(i, ____r147);
    var __to = destash33(to, ____r147);
    var ____id33 = ____r147;
    var __body21 = cut(____id33, 0);
    return ["let", __i29, 0, join(["while", ["<", __i29, __to]], __body21, [["inc", __i29]])];
  }});
  setenv("step", {["_stash"]: true, ["macro"]: (v, t, ...__r148) => {
    var ____r148 = unstash(__r148);
    var __v19 = destash33(v, ____r148);
    var __t3 = destash33(t, ____r148);
    var ____id34 = ____r148;
    var __body22 = cut(____id34, 0);
    var __x26 = unique("x");
    var __i30 = unique("i");
    return ["let", [__x26, __t3], ["for", __i30, ["#", __x26], join(["let", [__v19, ["at", __x26, __i30]]], __body22)]];
  }});
  setenv("set-of", {["_stash"]: true, ["macro"]: (...xs) => {
    var __xs12 = unstash(xs);
    var __l7 = [];
    var ____o17 = __xs12;
    var ____i31 = undefined;
    for (____i31 in ____o17) {
      var __x27 = ____o17[____i31];
      var __e29;
      if (numeric63(____i31)) {
        __e29 = parseInt(____i31);
      } else {
        __e29 = ____i31;
      }
      var ____i311 = __e29;
      __l7[__x27] = true;
    }
    return join(["obj"], __l7);
  }});
  setenv("join!", {["_stash"]: true, ["macro"]: (a, ...__r149) => {
    var ____r149 = unstash(__r149);
    var __a2 = destash33(a, ____r149);
    var ____id35 = ____r149;
    var __bs21 = cut(____id35, 0);
    return ["set", __a2, join(["join", __a2], __bs21)];
  }});
  setenv("cat!", {["_stash"]: true, ["macro"]: (a, ...__r150) => {
    var ____r150 = unstash(__r150);
    var __a3 = destash33(a, ____r150);
    var ____id36 = ____r150;
    var __bs3 = cut(____id36, 0);
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
    var __x28 = unique("x");
    return ["do", ["inc", "indent-level"], ["with", __x28, form, ["dec", "indent-level"]]];
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
    var __x29 = expand(join(["do"], __body24));
    _eval(__x29);
    return __x29;
  }});
  setenv("class", {["_stash"]: true, ["macro"]: (x, ...__r155) => {
    var ____r155 = unstash(__r155);
    var __x30 = destash33(x, ____r155);
    var ____id37 = ____r155;
    var __body25 = cut(____id37, 0);
    if (atom63(__x30)) {
      return join(["%class", [__x30]], __body25);
    } else {
      return join(["%class", __x30], __body25);
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
        var ____id38 = __args7;
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
            var __type = ____id39[1];
            var ___var = ____id39[2];
            var __body27 = cut(____id39, 3);
            return ["catch", __type, join(["let", [___var, __e26]], __body27)];
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
      var __i32 = edge(_G.environment);
      while (__i32 >= 0) {
        var __b3 = _G.environment[__i32][k];
        if (is63(__b3)) {
          var __e43;
          if (p) {
            __e43 = __b3[p];
          } else {
            __e43 = __b3;
          }
          return __e43;
        } else {
          __i32 = __i32 - 1;
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
      var __l8 = ["%object", "\"_stash\"", true];
      var ____o18 = args;
      var __k26 = undefined;
      for (__k26 in ____o18) {
        var __v20 = ____o18[__k26];
        var __e44;
        if (numeric63(__k26)) {
          __e44 = parseInt(__k26);
        } else {
          __e44 = __k26;
        }
        var __k27 = __e44;
        if (! number63(__k27)) {
          add(__l8, literal(__k27));
          add(__l8, __v20);
        }
      }
      return join(args, [__l8]);
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
        var ____o19 = lh;
        var __k28 = undefined;
        for (__k28 in ____o19) {
          var __v21 = ____o19[__k28];
          var __e45;
          if (numeric63(__k28)) {
            __e45 = parseInt(__k28);
          } else {
            __e45 = __k28;
          }
          var __k29 = __e45;
          var __e46;
          if (__k29 === "rest") {
            __e46 = ["cut", __id40, _35(lh)];
          } else {
            __e46 = [__id40, ["brackets", ["quote", __k29]]];
          }
          var __x31 = __e46;
          if (is63(__k29)) {
            var __e47;
            if (__v21 === true) {
              __e47 = __k29;
            } else {
              __e47 = __v21;
            }
            var __k30 = __e47;
            __bs5 = join(__bs5, bind(__k30, __x31));
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
      var __r177 = unique("r");
      var ____o20 = args;
      var __k31 = undefined;
      for (__k31 in ____o20) {
        var __v22 = ____o20[__k31];
        var __e48;
        if (numeric63(__k31)) {
          __e48 = parseInt(__k31);
        } else {
          __e48 = __k31;
        }
        var __k32 = __e48;
        if (number63(__k32)) {
          if (atom63(__v22)) {
            add(__args12, __v22);
          } else {
            var __x32 = unique("x");
            add(__args12, __x32);
            __bs6 = join(__bs6, [__v22, __x32]);
          }
        }
      }
      if (keys63(args)) {
        __bs6 = join(__bs6, [__r177, rest(__r177)]);
        var __n28 = _35(__args12);
        var __i36 = 0;
        while (__i36 < __n28) {
          var __v23 = __args12[__i36];
          __bs6 = join(__bs6, [__v23, ["destash!", __v23, __r177]]);
          __i36 = __i36 + 1;
        }
        __bs6 = join(__bs6, [keys(args), __r177]);
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
  var expandLocal = (__x33) => {
    var ____id41 = __x33;
    var __x34 = ____id41[0];
    var __name7 = ____id41[1];
    var __value = ____id41[2];
    setenv(__name7, {["_stash"]: true, ["variable"]: true});
    return ["%local", __name7, macroexpand(__value)];
  };
  var expandFunction = (__x35) => {
    var ____id42 = __x35;
    var __x36 = ____id42[0];
    var __args10 = ____id42[1];
    var __body28 = cut(____id42, 2);
    add(_G.environment, {});
    var ____o21 = __args10;
    var ____i37 = undefined;
    for (____i37 in ____o21) {
      var ____x37 = ____o21[____i37];
      var __e49;
      if (numeric63(____i37)) {
        __e49 = parseInt(____i37);
      } else {
        __e49 = ____i37;
      }
      var ____i371 = __e49;
      if (defaultAssignment63(____x37)) {
        setenv(____x37[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x37, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x38 = join(["%function", __args10], macroexpand(__body28));
    drop(_G.environment);
    return ____x38;
  };
  var expandTable = (__x39) => {
    var ____id43 = __x39;
    var __x40 = ____id43[0];
    var __args111 = cut(____id43, 1);
    var __expr2 = join([__x40], keys(__args111));
    var ____x41 = __args111;
    var ____i38 = 0;
    while (____i38 < _35(____x41)) {
      var __x42 = ____x41[____i38];
      if (atom63(__x42)) {
        add(__expr2, [__x42, macroexpand(__x42)]);
      } else {
        if (_35(__x42) <= 2) {
          var ____id44 = __x42;
          var __name8 = ____id44[0];
          var __v24 = ____id44[1];
          add(__expr2, [macroexpand(__name8), macroexpand(__v24)]);
        } else {
          var ____id45 = __x42;
          var __prefix = ____id45[0];
          var __name9 = ____id45[1];
          var __args121 = ____id45[2];
          var __body29 = cut(____id45, 3);
          if (some63(__body29)) {
            var ____id46 = bind42(__args121, __body29);
            var __args13 = ____id46[0];
            var __body111 = ____id46[1];
            add(_G.environment, {});
            var ____o22 = __args13;
            var ____i39 = undefined;
            for (____i39 in ____o22) {
              var ____x43 = ____o22[____i39];
              var __e50;
              if (numeric63(____i39)) {
                __e50 = parseInt(____i39);
              } else {
                __e50 = ____i39;
              }
              var ____i391 = __e50;
              if (defaultAssignment63(____x43)) {
                setenv(____x43[1], {["_stash"]: true, ["variable"]: true});
              } else {
                setenv(____x43, {["_stash"]: true, ["variable"]: true});
              }
            }
            var ____x44 = add(__expr2, [__prefix, macroexpand(__name9), __args13, macroexpand(__body111)]);
            drop(_G.environment);
            ____x44;
          } else {
            add(__expr2, [__prefix, macroexpand(__name9), macroexpand(__args121)]);
          }
        }
      }
      ____i38 = ____i38 + 1;
    }
    return __expr2;
  };
  var expandClass = (__x45) => {
    var ____id47 = __x45;
    var __x46 = ____id47[0];
    var __name10 = ____id47[1];
    var __body30 = cut(____id47, 2);
    return join([__x46, __name10], tl(expandTable(join(["%table"], __body30))));
  };
  var expandConditionCase = (__x47) => {
    var ____id48 = __x47;
    var __x48 = ____id48[0];
    var ___var1 = ____id48[1];
    var __form = ____id48[2];
    var __clauses1 = cut(____id48, 3);
    return join(["%condition-case", ___var1, macroexpand(__form)], map((__x49) => {
      var ____id49 = __x49;
      var __which = ____id49[0];
      var __body31 = cut(____id49, 1);
      if (__which === "finally") {
        return join([__which], map(macroexpand, __body31));
      } else {
        add(_G.environment, {});
        var ____o23 = [___var1];
        var ____i40 = undefined;
        for (____i40 in ____o23) {
          var ____x50 = ____o23[____i40];
          var __e51;
          if (numeric63(____i40)) {
            __e51 = parseInt(____i40);
          } else {
            __e51 = ____i40;
          }
          var ____i401 = __e51;
          if (defaultAssignment63(____x50)) {
            setenv(____x50[1], {["_stash"]: true, ["variable"]: true});
          } else {
            setenv(____x50, {["_stash"]: true, ["variable"]: true});
          }
        }
        var ____x51 = join([__which], map(macroexpand, __body31));
        drop(_G.environment);
        return ____x51;
      }
    }, __clauses1));
  };
  _G.expandConditionCase = expandConditionCase;
  var expandDefinition = (__x52) => {
    var ____id50 = __x52;
    var __x53 = ____id50[0];
    var __name11 = ____id50[1];
    var __args131 = ____id50[2];
    var __body32 = cut(____id50, 3);
    add(_G.environment, {});
    var ____o24 = __args131;
    var ____i41 = undefined;
    for (____i41 in ____o24) {
      var ____x54 = ____o24[____i41];
      var __e52;
      if (numeric63(____i41)) {
        __e52 = parseInt(____i41);
      } else {
        __e52 = ____i41;
      }
      var ____i411 = __e52;
      if (defaultAssignment63(____x54)) {
        setenv(____x54[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x54, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x55 = join([__x53, __name11, __args131], macroexpand(__body32));
    drop(_G.environment);
    return ____x55;
  };
  var expandMacro = (form) => {
    return macroexpand(expand1(form));
  };
  var expand1 = (__x56) => {
    var ____id51 = __x56;
    var __name12 = ____id51[0];
    var __body33 = cut(____id51, 1);
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
        var __x57 = hd(form);
        if (__x57 === "%local") {
          return expandLocal(form);
        } else {
          if (__x57 === "%function") {
            return expandFunction(form);
          } else {
            if (__x57 === "%table") {
              return expandTable(form);
            } else {
              if (__x57 === "%class") {
                return expandClass(form);
              } else {
                if (__x57 === "%condition-case") {
                  return expandConditionCase(form);
                } else {
                  if (__x57 === "%global-function") {
                    return expandDefinition(form);
                  } else {
                    if (__x57 === "%local-function") {
                      return expandDefinition(form);
                    } else {
                      if (macro63(__x57)) {
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
    var ____o25 = form;
    var __k33 = undefined;
    for (__k33 in ____o25) {
      var __v25 = ____o25[__k33];
      var __e53;
      if (numeric63(__k33)) {
        __e53 = parseInt(__k33);
      } else {
        __e53 = __k33;
      }
      var __k34 = __e53;
      if (! number63(__k34)) {
        var __e54;
        if (quasisplice63(__v25, depth)) {
          __e54 = quasiexpand(__v25[1]);
        } else {
          __e54 = quasiexpand(__v25, depth);
        }
        var __v26 = __e54;
        last(__xs13)[__k34] = __v26;
      }
    }
    var ____x58 = form;
    var ____i43 = 0;
    while (____i43 < _35(____x58)) {
      var __x59 = ____x58[____i43];
      if (quasisplice63(__x59, depth)) {
        var __x60 = quasiexpand(__x59[1]);
        add(__xs13, __x60);
        add(__xs13, ["list"]);
      } else {
        add(last(__xs13), quasiexpand(__x59, depth));
      }
      ____i43 = ____i43 + 1;
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
  var expandIf = (__x61) => {
    var ____id52 = __x61;
    var __a5 = ____id52[0];
    var __b4 = ____id52[1];
    var __c11 = cut(____id52, 2);
    if (is63(__b4)) {
      return [join(["%if", __a5, __b4], expandIf(__c11))];
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
    var __i44 = 0;
    while (__i44 < indentLevel) {
      __s2 = __s2 + "  ";
      __i44 = __i44 + 1;
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
    var __id53 = camelCase(id);
    var __e55;
    if (! raw63 && numberCode63(code(__id53, 0))) {
      __e55 = "_";
    } else {
      __e55 = "";
    }
    var __id121 = __e55;
    var __i45 = 0;
    while (__i45 < _35(__id53)) {
      var __c2 = char(__id53, __i45);
      var __n34 = code(__c2);
      var __e56;
      if (__c2 === "-" && !( __id53 === "-")) {
        __e56 = "_";
      } else {
        var __e57;
        if (validCode63(__n34)) {
          __e57 = __c2;
        } else {
          var __e58;
          if (__i45 === 0) {
            __e58 = "_" + __n34;
          } else {
            __e58 = __n34;
          }
          __e57 = __e58;
        }
        __e56 = __e57;
      }
      var __c12 = __e56;
      __id121 = __id121 + __c12;
      __i45 = __i45 + 1;
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
      var __x62 = id(x);
      if (__names3[__x62]) {
        var __i46 = __names3[__x62];
        __names3[__x62] = __names3[__x62] + 1;
        return unique(__x62 + __i46);
      } else {
        __names3[__x62] = 1;
        return "__" + __x62;
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
    var __o26 = [];
    var ____o27 = t;
    var __k35 = undefined;
    for (__k35 in ____o27) {
      var __v27 = ____o27[__k35];
      var __e59;
      if (numeric63(__k35)) {
        __e59 = parseInt(__k35);
      } else {
        __e59 = __k35;
      }
      var __k36 = __e59;
      var __x63 = f(__v27);
      if (is63(__x63)) {
        add(__o26, literal(__k36));
        add(__o26, __x63);
      }
    }
    return __o26;
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
      var ____o28 = infix;
      var __k37 = undefined;
      for (__k37 in ____o28) {
        var __v28 = ____o28[__k37];
        var __e60;
        if (numeric63(__k37)) {
          __e60 = parseInt(__k37);
        } else {
          __e60 = __k37;
        }
        var __k38 = __e60;
        var __x64 = hd(form);
        if (__v28[__x64]) {
          return index(__k38);
        }
      }
    }
    return 0;
  };
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
        var ____id54 = __a6;
        var __x66 = ____id54[0];
        var __ys = cut(____id54, 1);
        var __s3 = compileNext(compile(__x66), __ys, true);
        return compileNext(__s3, tl(args), call63);
      } else {
        var __s4 = "";
        var __c3 = "";
        var __i49 = 0;
        while (__i49 < _35(args)) {
          var __x67 = args[__i49];
          if (defaultAssignment63(__x67)) {
            var ____id55 = __x67;
            var ___1 = ____id55[0];
            var __x111 = ____id55[1];
            var __val1 = ____id55[2];
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
      var __e61;
      if (__c4 === "\n") {
        __e61 = "\\n";
      } else {
        var __e62;
        if (__c4 === "\r") {
          __e62 = "";
        } else {
          __e62 = __c4;
        }
        __e61 = __e62;
      }
      __s12 = __s12 + __e61;
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
    var ____id56 = form;
    var __x68 = ____id56[0];
    var __args14 = cut(____id56, 1);
    var ____id57 = getenv(__x68);
    var __special = ____id57["special"];
    var __stmt = ____id57["stmt"];
    var __selfTr63 = ____id57["tr"];
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
  var opDelims = (parent, child, ...__r224) => {
    var ____r224 = unstash(__r224);
    var __parent = destash33(parent, ____r224);
    var __child = destash33(child, ____r224);
    var ____id58 = ____r224;
    var __right = ____id58["right"];
    var __e63;
    if (__right) {
      __e63 = _6261;
    } else {
      __e63 = _62;
    }
    if (__e63(precedence(__child), precedence(__parent))) {
      return ["(", ")"];
    } else {
      return ["", ""];
    }
  };
  var compileInfix = (form) => {
    var ____id59 = form;
    var __op = ____id59[0];
    var ____id60 = cut(____id59, 1);
    var __a7 = ____id60[0];
    var __b5 = ____id60[1];
    var ____id61 = opDelims(form, __a7);
    var __ao = ____id61[0];
    var __ac = ____id61[1];
    var ____id62 = opDelims(form, __b5, {["_stash"]: true, ["right"]: true});
    var __bo = ____id62[0];
    var __bc = ____id62[1];
    var __a8 = compile(__a7);
    var __b6 = compile(__b5);
    var __op1 = getop(__op);
    if (unary63(form)) {
      return __op1 + __ao + " " + __a8 + __ac;
    } else {
      return __ao + __a8 + __ac + " " + __op1 + " " + __bo + __b6 + __bc;
    }
  };
  var compileFunction = (args, body, ...__r226) => {
    var ____r226 = unstash(__r226);
    var __args15 = destash33(args, ____r226);
    var __body34 = destash33(body, ____r226);
    var ____id63 = ____r226;
    var __name13 = ____id63["name"];
    var __prefix1 = ____id63["prefix"];
    var __infix = ____id63["infix"];
    var __tr1 = ____id63["tr"];
    var __id64 = either(__name13, "");
    var __args16 = compileArgs(__args15);
    indentLevel = indentLevel + 1;
    var ____x69 = compile(__body34, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body35 = ____x69;
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
    return __p1 + __id64 + __args16 + __mid + " {\n" + __body35 + __ind + "}" + __tr2;
  };
  _G.compileFunction = compileFunction;
  var canReturn63 = (form) => {
    return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
  };
  var compile = (form, ...__r228) => {
    var ____r228 = unstash(__r228);
    var __form1 = destash33(form, ____r228);
    var ____id65 = ____r228;
    var __stmt1 = ____id65["stmt"];
    if (nil63(__form1)) {
      return "";
    } else {
      if (specialForm63(__form1)) {
        return compileSpecial(__form1, __stmt1);
      } else {
        var __tr3 = terminator(__stmt1);
        var __e66;
        if (__stmt1) {
          __e66 = indentation();
        } else {
          __e66 = "";
        }
        var __ind1 = __e66;
        var __e67;
        if (atom63(__form1)) {
          __e67 = compileAtom(__form1);
        } else {
          var __e68;
          if (infix63(hd(__form1))) {
            __e68 = compileInfix(__form1);
          } else {
            __e68 = compileCall(hd(__form1), tl(__form1));
          }
          __e67 = __e68;
        }
        var __form2 = __e67;
        return __ind1 + __form2 + __tr3;
      }
    }
  };
  _G.compile = compile;
  var lowerStatement = (form, tail63) => {
    var __hoist = [];
    var __e34 = lower(form, __hoist, true, tail63);
    var __e69;
    if (some63(__hoist) && is63(__e34)) {
      __e69 = join(["do"], __hoist, [__e34]);
    } else {
      var __e70;
      if (is63(__e34)) {
        __e70 = __e34;
      } else {
        var __e71;
        if (_35(__hoist) > 1) {
          __e71 = join(["do"], __hoist);
        } else {
          __e71 = hd(__hoist);
        }
        __e70 = __e71;
      }
      __e69 = __e70;
    }
    return either(__e69, ["do"]);
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
    var ____x70 = almost(args);
    var ____i51 = 0;
    while (____i51 < _35(____x70)) {
      var __x71 = ____x70[____i51];
      var ____y5 = lower(__x71, hoist, stmt63);
      if (yes(____y5)) {
        var __e35 = ____y5;
        if (standalone63(__e35)) {
          add(hoist, __e35);
        }
      }
      ____i51 = ____i51 + 1;
    }
    var __e36 = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && canReturn63(__e36)) {
      return ["return", __e36];
    } else {
      return __e36;
    }
  };
  var lowerSet = (args, hoist, stmt63, tail63) => {
    var ____id66 = args;
    var __lh2 = ____id66[0];
    var __rh2 = ____id66[1];
    var __lh11 = lower(__lh2, hoist);
    var __rh11 = lower(__rh2, hoist);
    add(hoist, ["%set", __lh11, __rh11]);
    if (!( stmt63 && ! tail63)) {
      return __lh11;
    }
  };
  var lowerIf = (args, hoist, stmt63, tail63) => {
    var ____id67 = args;
    var __cond2 = ____id67[0];
    var __then = ____id67[1];
    var ___else = ____id67[2];
    if (stmt63) {
      var __e73;
      if (is63(___else)) {
        __e73 = [lowerBody([___else], tail63)];
      }
      return add(hoist, join(["%if", lower(__cond2, hoist), lowerBody([__then], tail63)], __e73));
    } else {
      var __e37 = unique("e");
      add(hoist, ["%local", __e37]);
      var __e72;
      if (is63(___else)) {
        __e72 = [lower(["%set", __e37, ___else])];
      }
      add(hoist, join(["%if", lower(__cond2, hoist), lower(["%set", __e37, __then])], __e72));
      return __e37;
    }
  };
  var lowerShort = (x, args, hoist) => {
    var ____id68 = args;
    var __a9 = ____id68[0];
    var __b7 = ____id68[1];
    var __hoist1 = [];
    var __b11 = lower(__b7, __hoist1);
    if (some63(__hoist1)) {
      var __id69 = unique("id");
      var __e74;
      if (x === "and") {
        __e74 = ["%if", __id69, __b7, __id69];
      } else {
        __e74 = ["%if", __id69, __id69, __b7];
      }
      return lower(["do", ["%local", __id69, __a9], __e74], hoist);
    } else {
      return [x, lower(__a9, hoist), __b11];
    }
  };
  var lowerTry = (args, hoist, tail63) => {
    return add(hoist, ["%try", lowerBody(args, tail63)]);
  };
  var lowerConditionCase = (__x72, hoist, stmt63, tail63) => {
    var ____id70 = __x72;
    var ___var2 = ____id70[0];
    var __form3 = ____id70[1];
    var __clauses2 = cut(____id70, 2);
    if (stmt63) {
      return add(hoist, join(["%condition-case", ___var2, lowerBody(["do", __form3], tail63)], map((__x73) => {
        var ____id71 = __x73;
        var __which1 = ____id71[0];
        var __body36 = cut(____id71, 1);
        if (__which1 === "finally") {
          return [__which1, lowerBody(__body36)];
        } else {
          var ____id72 = __body36;
          var __x74 = ____id72[0];
          var __args17 = cut(____id72, 1);
          return [__which1, lower(__x74), lowerBody(__args17, tail63)];
        }
      }, __clauses2)));
    } else {
      var __e38 = unique("e");
      add(hoist, ["%local", __e38]);
      add(hoist, join(["%condition-case", ___var2, lower(["%set", __e38, __form3])], map((__x75) => {
        var ____id73 = __x75;
        var __which2 = ____id73[0];
        var __body37 = cut(____id73, 1);
        if (__which2 === "finally") {
          return [__which2, lowerBody(__body37)];
        } else {
          var ____id74 = __body37;
          var __x76 = ____id74[0];
          var __args18 = cut(____id74, 1);
          return [__which2, lower(__x76), lower(["%set", __e38, join(["do"], __args18)])];
        }
      }, __clauses2)));
      return __e38;
    }
  };
  _G.lowerConditionCase = lowerConditionCase;
  var lowerWhile = (args, hoist) => {
    var ____id75 = args;
    var __c5 = ____id75[0];
    var __body38 = cut(____id75, 1);
    var __pre = [];
    var __c6 = lower(__c5, __pre);
    var __e75;
    if (none63(__pre)) {
      __e75 = ["while", __c6, lowerBody(__body38)];
    } else {
      __e75 = ["while", true, join(["do"], __pre, [["%if", ["not", __c6], ["break"]], lowerBody(__body38)])];
    }
    return add(hoist, __e75);
  };
  var lowerFor = (args, hoist) => {
    var ____id76 = args;
    var __t4 = ____id76[0];
    var __k39 = ____id76[1];
    var __body39 = cut(____id76, 2);
    return add(hoist, ["%for", lower(__t4, hoist), __k39, lowerBody(__body39)]);
  };
  var lowerTable = (args, hoist, stmt63, tail63) => {
    var __expr3 = join(["%table"], keys(args));
    var ____x77 = args;
    var ____i52 = 0;
    while (____i52 < _35(____x77)) {
      var __x78 = ____x77[____i52];
      if (atom63(__x78)) {
        add(__expr3, __x78);
      } else {
        if (_35(__x78) <= 2) {
          var ____id77 = __x78;
          var __name14 = ____id77[0];
          var __v29 = ____id77[1];
          add(__expr3, [lower(__name14, hoist), lower(__v29, hoist)]);
        } else {
          var ____id78 = __x78;
          var __prefix2 = ____id78[0];
          var __name15 = ____id78[1];
          var __args19 = ____id78[2];
          var __body40 = cut(____id78, 3);
          if (some63(__body40)) {
            add(__expr3, [__prefix2, lower(__name15, hoist), __args19, lowerBody(__body40, true)]);
          } else {
            add(__expr3, [__prefix2, lower(__name15, hoist), lower(__args19, hoist)]);
          }
        }
      }
      ____i52 = ____i52 + 1;
    }
    return __expr3;
  };
  _G.lowerTable = lowerTable;
  var lowerClass = (__x79, hoist, stmt63, tail63) => {
    var ____id79 = __x79;
    var __x80 = ____id79[0];
    var __body41 = cut(____id79, 1);
    var __body42 = tl(lowerTable(__body41, hoist));
    var ____id80 = __x80;
    var __name16 = ____id80[0];
    var __parent1 = ____id80[1];
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
    var ____id81 = args;
    var __a10 = ____id81[0];
    var __body43 = cut(____id81, 1);
    return ["%function", __a10, lowerBody(__body43, true)];
  };
  var lowerDefinition = (kind, args, hoist) => {
    var ____id82 = args;
    var __name17 = ____id82[0];
    var __args20 = ____id82[1];
    var __body44 = cut(____id82, 2);
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
      var __e39 = [];
      var ____id83 = form;
      var __x81 = ____id83[0];
      var __args21 = cut(____id83, 1);
      reduce((a, b) => {
        add(__e39, [__x81, a, b]);
        return a;
      }, __args21);
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
    var ____id84 = __form5;
    var __x82 = ____id84[0];
    var __args22 = cut(____id84, 1);
    return lower(reduce((a, b) => {
      return [__x82, b, a];
    }, reverse(__args22)), hoist);
  };
  var lowerSpecial = (__x83, hoist) => {
    var ____id85 = __x83;
    var __name18 = ____id85[0];
    var __args23 = cut(____id85, 1);
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
            var ____id86 = form;
            var __x84 = ____id86[0];
            var __args24 = cut(____id86, 1);
            if (__x84 === "do") {
              return lowerDo(__args24, hoist, stmt63, tail63);
            } else {
              if (__x84 === "%call") {
                return lower(__args24, hoist, stmt63, tail63);
              } else {
                if (__x84 === "%set") {
                  return lowerSet(__args24, hoist, stmt63, tail63);
                } else {
                  if (__x84 === "%if") {
                    return lowerIf(__args24, hoist, stmt63, tail63);
                  } else {
                    if (__x84 === "%try") {
                      return lowerTry(__args24, hoist, tail63);
                    } else {
                      if (__x84 === "%condition-case") {
                        return lowerConditionCase(__args24, hoist, stmt63, tail63);
                      } else {
                        if (__x84 === "while") {
                          return lowerWhile(__args24, hoist);
                        } else {
                          if (__x84 === "%for") {
                            return lowerFor(__args24, hoist);
                          } else {
                            if (__x84 === "%table") {
                              return lowerTable(__args24, hoist, stmt63, tail63);
                            } else {
                              if (__x84 === "%class") {
                                return lowerClass(__args24, hoist, stmt63, tail63);
                              } else {
                                if (__x84 === "%function") {
                                  return lowerFunction(__args24);
                                } else {
                                  if (__x84 === "%local-function" || __x84 === "%global-function") {
                                    return lowerDefinition(__x84, __args24, hoist);
                                  } else {
                                    if (in63(__x84, ["and", "or"])) {
                                      return lowerShort(__x84, __args24, hoist);
                                    } else {
                                      if (statement63(__x84)) {
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
  setenv("%call", {["_stash"]: true, ["special"]: (f, ...__r263) => {
    var ____r263 = unstash(__r263);
    var __f2 = destash33(f, ____r263);
    var ____id87 = ____r263;
    var __args25 = cut(____id87, 0);
    return compileCall(__f2, __args25);
  }});
  setenv("%brackets", {["_stash"]: true, ["special"]: (...args) => {
    var __args26 = unstash(args);
    return "[" + inner(compileArgs(__args26)) + "]";
  }});
  setenv("do", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms = unstash(forms);
    var __s5 = "";
    var ____x85 = __forms;
    var ____i53 = 0;
    while (____i53 < _35(____x85)) {
      var __x86 = ____x85[____i53];
      __s5 = __s5 + compile(__x86, {["_stash"]: true, ["stmt"]: true});
      if (! atom63(__x86)) {
        if (hd(__x86) === "return" || hd(__x86) === "break") {
          break;
        }
      }
      ____i53 = ____i53 + 1;
    }
    return __s5;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%if", {["_stash"]: true, ["special"]: (cond, cons, alt) => {
    var __cond3 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x87 = compile(cons, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __cons = ____x87;
    var __e76;
    if (alt) {
      indentLevel = indentLevel + 1;
      var ____x88 = compile(alt, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      __e76 = ____x88;
    }
    var __alt = __e76;
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
    var ____x89 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body45 = ____x89;
    var __ind3 = indentation();
    return __ind3 + "while (" + __cond4 + ") {\n" + __body45 + __ind3 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%for", {["_stash"]: true, ["special"]: (t, k, form) => {
    var __t5 = compile(t);
    var __ind4 = indentation();
    indentLevel = indentLevel + 1;
    var ____x90 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body46 = ____x90;
    return __ind4 + "for (" + k + " in " + __t5 + ") {\n" + __body46 + __ind4 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%try", {["_stash"]: true, ["special"]: (form) => {
    var __e40 = unique("e");
    var __ind5 = indentation();
    indentLevel = indentLevel + 1;
    var ____x91 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body47 = ____x91;
    var __hf = ["return", ["%array", false, __e40]];
    indentLevel = indentLevel + 1;
    var ____x92 = compile(__hf, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __h = ____x92;
    return __ind5 + "try {\n" + __body47 + __ind5 + "}\n" + __ind5 + "catch (" + __e40 + ") {\n" + __h + __ind5 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%condition-case", {["_stash"]: true, ["special"]: (e, form, ...__r268) => {
    var ____r268 = unstash(__r268);
    var __e41 = destash33(e, ____r268);
    var __form7 = destash33(form, ____r268);
    var ____id88 = ____r268;
    var __clauses3 = cut(____id88, 0);
    var __ind6 = indentation();
    indentLevel = indentLevel + 1;
    var ____x93 = compile(__form7, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body48 = ____x93;
    var __str = __ind6 + "try {\n" + __body48 + __ind6 + "}";
    var __form8 = [];
    var ____x94 = __clauses3;
    var ____i54 = 0;
    while (____i54 < _35(____x94)) {
      var __x95 = ____x94[____i54];
      if (hd(__x95) === "catch") {
        var ____id89 = __x95;
        var ___2 = ____id89[0];
        var __type1 = ____id89[1];
        var __body49 = ____id89[2];
        var __e77;
        if (boolean63(__type1)) {
          __e77 = __type1;
        } else {
          __e77 = ["instanceof", __e41, __type1];
        }
        add(__form8, __e77);
        add(__form8, __body49);
      }
      ____i54 = ____i54 + 1;
    }
    if (! none63(__form8)) {
      add(__form8, ["%throw", __e41]);
      var __expr5 = hd(expandIf(__form8));
      indentLevel = indentLevel + 1;
      var ____x96 = compile(__expr5, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h1 = ____x96;
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
      var ____x97 = compile(join(["do"], __body50), {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h2 = ____x97;
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
    var __e78;
    if (nil63(x)) {
      __e78 = "return";
    } else {
      __e78 = "return " + compile(x);
    }
    var __x98 = __e78;
    return indentation() + __x98;
  }, ["stmt"]: true});
  setenv("async", {["_stash"]: true, ["special"]: (...x) => {
    var __x99 = unstash(x);
    if (_35(__x99) > 1) {
      return compile(join([["async", hd(__x99)]], tl(__x99)));
    } else {
      return "async " + compile(hd(__x99));
    }
  }});
  setenv("await", {["_stash"]: true, ["special"]: (...x) => {
    var __x100 = unstash(x);
    if (_35(__x100) > 1) {
      return compile(join([["await", hd(__x100)]], tl(__x100)));
    } else {
      return "await (" + compile(hd(__x100)) + ")";
    }
  }});
  setenv("new", {["_stash"]: true, ["special"]: (...x) => {
    var __x101 = unstash(x);
    if (_35(__x101) > 1) {
      return compile(join([["new", hd(__x101)]], tl(__x101)));
    } else {
      return "new " + compile(hd(__x101));
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
    var __e42 = "throw " + compile(["new", ["Error", x]]);
    return indentation() + __e42;
  }, ["stmt"]: true});
  setenv("%local", {["_stash"]: true, ["special"]: (name, value) => {
    var __id90 = compile(name);
    var __value1 = compile(value);
    var __e79;
    if (is63(value)) {
      __e79 = " = " + __value1;
    } else {
      __e79 = "";
    }
    var __rh3 = __e79;
    var __keyword = "var ";
    var __ind7 = indentation();
    return __ind7 + __keyword + __id90 + __rh3;
  }, ["stmt"]: true});
  setenv("%set", {["_stash"]: true, ["special"]: (lh, rh) => {
    var __lh3 = compile(lh);
    var __e80;
    if (nil63(rh)) {
      __e80 = "nil";
    } else {
      __e80 = rh;
    }
    var __rh4 = compile(__e80);
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
    var ____o29 = __forms1;
    var __k40 = undefined;
    for (__k40 in ____o29) {
      var __v30 = ____o29[__k40];
      var __e81;
      if (numeric63(__k40)) {
        __e81 = parseInt(__k40);
      } else {
        __e81 = __k40;
      }
      var __k41 = __e81;
      if (number63(__k41)) {
        __s7 = __s7 + __c7 + compile(__v30);
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
    var ____x102 = pair(__forms2);
    var ____i56 = 0;
    while (____i56 < _35(____x102)) {
      var ____id91 = ____x102[____i56];
      var __k42 = ____id91[0];
      var __v31 = ____id91[1];
      __s8 = __s8 + __c8 + key(__k42) + __sep + compile(__v31);
      __c8 = ", ";
      ____i56 = ____i56 + 1;
    }
    return __s8 + "}";
  }});
  setenv("%table", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms3 = unstash(forms);
    var __s9 = "{\n";
    var __c9 = "";
    var __sep1 = ": ";
    var __comma = either(__forms3.comma, escape(", "));
    indentLevel = indentLevel + 1;
    var __ind8 = indentation();
    var ____x104 = __forms3;
    var ____i57 = 0;
    while (____i57 < _35(____x104)) {
      var __x105 = ____x104[____i57];
      if (atom63(__x105)) {
        __s9 = __s9 + __c9 + __ind8 + key(__x105) + __sep1 + compile(__x105);
      } else {
        if (_35(__x105) <= 2) {
          var ____id92 = __x105;
          var __name19 = ____id92[0];
          var __v32 = ____id92[1];
          __s9 = __s9 + __c9 + __ind8 + key(__name19) + __sep1 + compile(__v32);
        } else {
          var ____id93 = __x105;
          var __prefix3 = ____id93[0];
          var __name20 = ____id93[1];
          var __args27 = ____id93[2];
          var __body51 = cut(____id93, 3);
          var __e82;
          if (in63(__prefix3, ["define", "def"])) {
            __e82 = "";
          } else {
            __e82 = __prefix3;
          }
          var __prefix4 = __e82;
          var __e83;
          if (some63(__body51)) {
            __e83 = compileFunction(__args27, join(["do"], __body51), {["_stash"]: true, ["name"]: key(__name20), ["prefix"]: __prefix4});
          } else {
            __e83 = key(__name20) + __sep1 + compile(__args27);
          }
          var __h3 = __e83;
          __s9 = __s9 + __c9 + __ind8 + __h3;
        }
      }
      __c9 = inner(__comma) + "\n";
      ____i57 = ____i57 + 1;
    }
    var ____x103;
    indentLevel = indentLevel - 1;
    return __s9 + "\n" + indentation() + "}";
  }});
  setenv("%class", {["_stash"]: true, ["special"]: (name, ...__r283) => {
    var ____r283 = unstash(__r283);
    var __name21 = destash33(name, ____r283);
    var ____id94 = ____r283;
    var __body52 = cut(____id94, 0);
    var __e84;
    if (atom63(__name21)) {
      __e84 = [__name21];
    } else {
      __e84 = __name21;
    }
    var ____id95 = __e84;
    var __name22 = ____id95[0];
    var __parent2 = ____id95[1];
    var __e85;
    if (__name22) {
      __e85 = [__name22, "\" \""];
    } else {
      __e85 = [];
    }
    var __name23 = __e85;
    var __e86;
    if (__parent2) {
      __e86 = ["\"extends \"", __parent2, "\" \""];
    } else {
      __e86 = [];
    }
    var __ext = __e86;
    return compile(join(["%literal", "\"class \""], __name23, __ext, [join({[0]: "%table", ["comma"]: "\"\""}, __body52)]));
  }});
  setenv("%literal", {["_stash"]: true, ["special"]: (...args) => {
    var __args28 = unstash(args);
    var __s10 = "";
    var ____x106 = __args28;
    var ____i58 = 0;
    while (____i58 < _35(____x106)) {
      var __x107 = ____x106[____i58];
      if (stringLiteral63(__x107)) {
        __s10 = __s10 + _eval(__x107);
      } else {
        __s10 = __s10 + compile(__x107);
      }
      ____i58 = ____i58 + 1;
    }
    return __s10;
  }});
  setenv("%statement", {["_stash"]: true, ["special"]: (...args) => {
    var __args29 = unstash(args);
    var __s111 = indentation();
    var ____x108 = __args29;
    var ____i59 = 0;
    while (____i59 < _35(____x108)) {
      var __x109 = ____x108[____i59];
      if (stringLiteral63(__x109)) {
        __s111 = __s111 + _eval(__x109);
      } else {
        __s111 = __s111 + compile(__x109);
      }
      ____i59 = ____i59 + 1;
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
    var __x110 = read(stream(str, more));
    if (!( __x110 === eof)) {
      return __x110;
    }
  };
  _G.readString = readString;
  var key63 = (atom) => {
    return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
  };
  var expected = (s, c) => {
    var ____id96 = s;
    var __more = ____id96["more"];
    var __pos = ____id96["pos"];
    var __id97 = __more;
    var __e87;
    if (__id97) {
      __e87 = __id97;
    } else {
      throw new Error("Expected " + c + " at " + __pos);
      __e87 = undefined;
    }
    return __e87;
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
    var __e88;
    if (code(str, 0) === 45) {
      __e88 = 1;
    } else {
      __e88 = 0;
    }
    var __i60 = __e88;
    var __id98 = code(str, __i60) === 48;
    var __e89;
    if (__id98) {
      __i60 = __i60 + 1;
      var __n38 = code(str, __i60);
      __e89 = __n38 === 120 || __n38 === 88;
    } else {
      __e89 = __id98;
    }
    return __e89;
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
        var __n39 = maybeNumber(__str1);
        if (real63(__n39)) {
          return __n39;
        } else {
          return __str1;
        }
      }
    }
  };
  readTable["("] = (s) => {
    readChar(s);
    var __r301 = undefined;
    var __l10 = [];
    while (nil63(__r301)) {
      skipNonCode(s);
      var __c14 = peekChar(s);
      if (__c14 === ")") {
        readChar(s);
        __r301 = __l10;
      } else {
        if (nil63(__c14)) {
          __r301 = expected(s, ")");
        } else {
          var __x1111 = read(s);
          if (key63(__x1111)) {
            var __k43 = clip(__x1111, 0, edge(__x1111));
            var __v33 = read(s);
            __l10[__k43] = __v33;
          } else {
            add(__l10, __x1111);
          }
        }
      }
    }
    return __r301;
  };
  readTable[")"] = (s) => {
    throw new Error("Unexpected ) at " + s.pos);
  };
  readTable["["] = (s) => {
    readChar(s);
    var __r304 = undefined;
    var __l111 = [];
    while (nil63(__r304)) {
      skipNonCode(s);
      var __c15 = peekChar(s);
      if (__c15 === "]") {
        readChar(s);
        __r304 = join(["brackets"], __l111);
      } else {
        if (nil63(__c15)) {
          __r304 = expected(s, "]");
        } else {
          var __x112 = read(s);
          add(__l111, __x112);
        }
      }
    }
    return __r304;
  };
  readTable["]"] = (s) => {
    throw new Error("Unexpected ] at " + s.pos);
  };
  readTable["{"] = (s) => {
    readChar(s);
    var __r307 = undefined;
    var __l121 = [];
    while (nil63(__r307)) {
      skipNonCode(s);
      var __c16 = peekChar(s);
      if (__c16 === "}") {
        readChar(s);
        __r307 = join(["braces"], __l121);
      } else {
        if (nil63(__c16)) {
          __r307 = expected(s, "}");
        } else {
          var __x113 = read(s);
          add(__l121, __x113);
        }
      }
    }
    return __r307;
  };
  readTable["}"] = (s) => {
    throw new Error("Unexpected } at " + s.pos);
  };
  readTable["\""] = (s) => {
    readChar(s);
    var __r310 = undefined;
    var __str2 = "\"";
    while (nil63(__r310)) {
      var __c17 = peekChar(s);
      if (__c17 === "\"") {
        __r310 = __str2 + readChar(s);
      } else {
        if (nil63(__c17)) {
          __r310 = expected(s, "\"");
        } else {
          if (__c17 === "\\") {
            __str2 = __str2 + readChar(s);
          }
          __str2 = __str2 + readChar(s);
        }
      }
    }
    return __r310;
  };
  readTable["|"] = (s) => {
    readChar(s);
    var __r312 = undefined;
    var __str3 = "|";
    while (nil63(__r312)) {
      var __c18 = peekChar(s);
      if (__c18 === "|") {
        __r312 = __str3 + readChar(s);
      } else {
        if (nil63(__c18)) {
          __r312 = expected(s, "|");
        } else {
          __str3 = __str3 + readChar(s);
        }
      }
    }
    return __r312;
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
    var __e90;
    if (__c19 === "\\") {
      __e90 = readChar(s);
    } else {
      __e90 = __c19;
    }
    var __c131 = __e90;
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
  var readFile = (path, __x114) => {
    var __e91;
    if (is63(__x114)) {
      __e91 = __x114;
    } else {
      __e91 = "text";
    }
    var __mode = __e91;
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
    var ____id99 = (() => {
      try {
        return [true, compiler["eval"](form)];
      }
      catch (__e95) {
        return [false, __e95];
      }
    })();
    var __ok1 = ____id99[0];
    var __v34 = ____id99[1];
    if (! __ok1) {
      return print(__v34.stack);
    } else {
      if (is63(__v34)) {
        return print(str(__v34));
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
        var ____x115 = body;
        var ____i61 = 0;
        while (____i61 < _35(____x115)) {
          var __x116 = ____x115[____i61];
          __s13 = __s13 + str(__x116) + "\n\n";
          ____i61 = ____i61 + 1;
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
    var __x117 = _G.exports;
    compiler.run(__code1);
    _G.exports = __prev;
    return __x117;
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
        var __i62 = 0;
        while (__i62 < _35(__argv)) {
          var __a11 = __argv[__i62];
          if (__a11 === "-c" || __a11 === "-x" || __a11 === "-a" || __a11 === "-o" || __a11 === "-t" || __a11 === "-e") {
            if (__i62 === edge(__argv)) {
              print("missing argument for " + __a11);
            } else {
              __i62 = __i62 + 1;
              var __val2 = __argv[__i62];
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
          __i62 = __i62 + 1;
        }
        var ____x118 = __pre1;
        var ____i63 = 0;
        while (____i63 < _35(____x118)) {
          var __file = ____x118[____i63];
          runFile(__file);
          ____i63 = ____i63 + 1;
        }
        if (nil63(__input)) {
          if (__expr6) {
            return rep(__expr6);
          } else {
            return repl();
          }
        } else {
          var __e92;
          if (__op2 === "expand") {
            __e92 = ppToString(expandFile(__input));
          } else {
            var __e93;
            if (__op2 === "read") {
              __e93 = ppToString(readFile(__input));
            } else {
              __e93 = compileFile(__input);
            }
            __e92 = __e93;
          }
          var __code2 = __e92;
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
var ____x119 = typeof(window);
if ("undefined" === ____x119) {
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
