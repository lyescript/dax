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
        var __e1 = undefined;
        if (numeric63(__k)) {
          __e1 = parseInt(__k);
        } else {
          __e1 = __k;
        }
        var __k1 = __e1;
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
    [Symbol.toPrimitive](hint) {
      if (this.ns) {
        return this.ns + "/" + this.name;
      } else {
        return this.name;
      }
    }
    toString() {
      return str("" + this);
    }
    [Symbol["for"]("str")]() {
      return this.toString();
    }
    compile() {
      return compile("" + this);
    }
    fqn63() {
      return this.name && this.ns;
    }
    eq(y) {
      return name(this) === name(y);
    }
    static intern(ns, name, ...__r975) {
      var ____r975 = unstash(__r975);
      var __ns7 = destash33(ns, ____r975);
      var __name27 = destash33(name, ____r975);
      var ____id106 = ____r975;
      var ____r9361 = cut(____id106, 0);
      var ____r936 = unstash(____r9361);
      var __ns6 = destash33(__ns7, ____r936);
      var __name26 = destash33(__name27, ____r936);
      var ____id105 = ____r936;
      var ____r141 = cut(____id105, 0);
      var ____r14 = unstash(____r141);
      var __ns = destash33(__ns6, ____r14);
      var __name = destash33(__name26, ____r14);
      var ____id = ____r14;
      var __meta = ____id["meta"];
      if (nil63(__name)) {
        __name = __ns;
        __ns = undefined;
      }
      return new Sym(__meta, __ns, __name);
    }
  };
  _G.Unbound = class Unbound {

  };
  _G.Var = class Var {
    constructor(ns, sym, __x) {
      var __e2 = undefined;
      if (is63(__x)) {
        __e2 = __x;
      } else {
        __e2 = new _G.Unbound(this);
      }
      var __root = __e2;
      this.ns = ns;
      this.sym = sym;
      this.root = __root;
      return this;
    }
    hasRoot() {
      return ! (this.root instanceof _G.Unbound);
    }
    bindRoot(root, getter, setter) {
      this.getter = getter;
      this.setter = setter;
      this.root = root;
      return this.root;
    }
    unbindRoot() {
      delete this.getter;
      delete this.setter;
      this.root = new Unbound(this);
      return this.root;
    }
    deref(x) {
      if (arguments.length === 0) {
        var __b = this.getThreadBinding();
        if (__b) {
          return __b.val;
        } else {
          if (this.getter) {
            return this.getter();
          } else {
            return this.root;
          }
        }
      } else {
        if (this.setter) {
          return this.setter(x);
        } else {
          this.root = x;
          return this.root;
        }
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
      return _G.environment[0][this.fqn()];
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
    [Symbol.toPrimitive](hint) {
      return this.fqn();
    }
    toString() {
      return str("" + this);
    }
    [Symbol["for"]("str")]() {
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
      var __id5 = Namespace._namespaces;
      var __e3 = undefined;
      if (__id5) {
        __e3 = __id5;
      } else {
        Namespace._namespaces = new _G.Mapping;
        __e3 = Namespace._namespaces;
      }
      return __e3;
    }
    static all() {
      return [...Namespace.namespaces().values()];
    }
    static sym(s) {
      if (typeof(s) === "string") {
        var __i1 = s.indexOf("/");
        if (__i1) {
          s = new _G.Sym(undefined, s.substr(0, __i1), s.substr(__i1 + 1));
          return s;
        } else {
          s = new _G.Sym(undefined, undefined, s);
          return s;
        }
      } else {
        return s;
      }
    }
    static find(name) {
      return Namespace.namespaces().get(Namespace.sym(name));
    }
    static findOrCreate(name) {
      var __ns1 = Namespace.namespaces().get(name);
      return __ns1 || new Namespace(name);
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
        var __ns2 = o.ns;
        if (__ns2 === this || (v instanceof _G.Var) && v.ns === RT.DAX_NS) {
          return;
        }
        if (!( __ns2 === RT.DAX_NS)) {
          throw new Error(str(sym) + " already refers to: " + str(o) + " in namespace: " + str(name));
        }
      }
      return print(str(sym) + " already refers to: " + str(o) + " in namespace: " + str(name) + ", being replaced by: " + _43 + str(v));
    }
  };
  _G.RT = _G.Namespace.findOrCreate("RT");
  _G.RT.CURRENT_NS = _G.RT.intern("CURRENT_NS");
  _G.RT.CURRENT_NS.bindRoot(_G.Namespace.findOrCreate("dax.core"));
  _G.Compiler = class Compiler {
    static NS() {
      return _G.RT.CURRENT_NS;
    }
    static currentNS(x) {
      if (arguments.length === 0) {
        return _G.Compiler.NS().deref();
      } else {
        var __ns3 = _G.Namespace.findOrCreate(x);
        return _G.Compiler.NS().bindRoot(__ns3);
      }
    }
  };
  _G._42ns42 = _G.Compiler.currentNS;
  var currentNs = (x) => {
    if (is63(x)) {
      return _G._42ns42(x);
    } else {
      return _G._42ns42();
    }
  };
  currentNs().intern("current-ns").bindRoot(currentNs, () => {
    return currentNs;
  }, (x) => {
    currentNs = x;
    return currentNs;
  });
  _G.currentNs = currentNs;
  _G.currentNs("dax.lang");
  _G.currentNs("dax.reader");
  _G.currentNs("dax.compiler");
  _G.currentNs("dax.system");
  _G.currentNs("dax.main");
  _G.currentNs("dax.core");
  environment = _G.environment;
  currentNs().intern("environment").bindRoot(environment, () => {
    return environment;
  }, (x) => {
    environment = x;
    return environment;
  });
  _G.environment = environment;
  Namespace = _G.Namespace;
  currentNs().intern("Namespace").bindRoot(Namespace, () => {
    return Namespace;
  }, (x) => {
    Namespace = x;
    return Namespace;
  });
  _G.Namespace = Namespace;
  Sym = _G.Sym;
  currentNs().intern("Sym").bindRoot(Sym, () => {
    return Sym;
  }, (x) => {
    Sym = x;
    return Sym;
  });
  _G.Sym = Sym;
  Var = _G.Var;
  currentNs().intern("Var").bindRoot(Var, () => {
    return Var;
  }, (x) => {
    Var = x;
    return Var;
  });
  _G.Var = Var;
  Unbound = _G.Unbound;
  currentNs().intern("Unbound").bindRoot(Unbound, () => {
    return Unbound;
  }, (x) => {
    Unbound = x;
    return Unbound;
  });
  _G.Unbound = Unbound;
  Mapping = _G.Mapping;
  currentNs().intern("Mapping").bindRoot(Mapping, () => {
    return Mapping;
  }, (x) => {
    Mapping = x;
    return Mapping;
  });
  _G.Mapping = Mapping;
  var nil63 = (x) => {
    return x === undefined || x === null;
  };
  currentNs().intern("nil?").bindRoot(nil63, () => {
    return nil63;
  }, (x) => {
    nil63 = x;
    return nil63;
  });
  _G.nil63 = nil63;
  var is63 = (x) => {
    return ! nil63(x);
  };
  currentNs().intern("is?").bindRoot(is63, () => {
    return is63;
  }, (x) => {
    is63 = x;
    return is63;
  });
  _G.is63 = is63;
  var no = (x) => {
    return nil63(x) || x === false;
  };
  currentNs().intern("no").bindRoot(no, () => {
    return no;
  }, (x) => {
    no = x;
    return no;
  });
  _G.no = no;
  var yes = (x) => {
    return ! no(x);
  };
  currentNs().intern("yes").bindRoot(yes, () => {
    return yes;
  }, (x) => {
    yes = x;
    return yes;
  });
  _G.yes = yes;
  var either = (x, y) => {
    if (is63(x)) {
      return x;
    } else {
      return y;
    }
  };
  currentNs().intern("either").bindRoot(either, () => {
    return either;
  }, (x) => {
    either = x;
    return either;
  });
  _G.either = either;
  var has63 = (l, k) => {
    return l.hasOwnProperty(k);
  };
  currentNs().intern("has?").bindRoot(has63, () => {
    return has63;
  }, (x) => {
    has63 = x;
    return has63;
  });
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
        var __e4 = undefined;
        if (numeric63(__k2)) {
          __e4 = parseInt(__k2);
        } else {
          __e4 = __k2;
        }
        var __k3 = __e4;
        if (number63(__k3) && __k3 > __n2) {
          __n2 = __k3;
        }
      }
      return __n2 + 1;
    }
  };
  currentNs().intern("#").bindRoot(_35, () => {
    return _35;
  }, (x) => {
    _35 = x;
    return _35;
  });
  _G._35 = _35;
  var none63 = (x) => {
    return _35(x) === 0;
  };
  currentNs().intern("none?").bindRoot(none63, () => {
    return none63;
  }, (x) => {
    none63 = x;
    return none63;
  });
  _G.none63 = none63;
  var some63 = (x) => {
    return _35(x) > 0;
  };
  currentNs().intern("some?").bindRoot(some63, () => {
    return some63;
  }, (x) => {
    some63 = x;
    return some63;
  });
  _G.some63 = some63;
  var one63 = (x) => {
    return _35(x) === 1;
  };
  currentNs().intern("one?").bindRoot(one63, () => {
    return one63;
  }, (x) => {
    one63 = x;
    return one63;
  });
  _G.one63 = one63;
  var two63 = (x) => {
    return _35(x) === 2;
  };
  currentNs().intern("two?").bindRoot(two63, () => {
    return two63;
  }, (x) => {
    two63 = x;
    return two63;
  });
  _G.two63 = two63;
  var hd = (l) => {
    return l[0];
  };
  currentNs().intern("hd").bindRoot(hd, () => {
    return hd;
  }, (x) => {
    hd = x;
    return hd;
  });
  _G.hd = hd;
  var type = (x) => {
    return typeof(x);
  };
  currentNs().intern("type").bindRoot(type, () => {
    return type;
  }, (x) => {
    type = x;
    return type;
  });
  _G.type = type;
  var type63 = (x, y) => {
    return type(x) === y;
  };
  currentNs().intern("type?").bindRoot(type63, () => {
    return type63;
  }, (x) => {
    type63 = x;
    return type63;
  });
  _G.type63 = type63;
  var string63 = (x) => {
    return type63(x, "string");
  };
  currentNs().intern("string?").bindRoot(string63, () => {
    return string63;
  }, (x) => {
    string63 = x;
    return string63;
  });
  _G.string63 = string63;
  var number63 = (x) => {
    return type63(x, "number");
  };
  currentNs().intern("number?").bindRoot(number63, () => {
    return number63;
  }, (x) => {
    number63 = x;
    return number63;
  });
  _G.number63 = number63;
  var boolean63 = (x) => {
    return type63(x, "boolean");
  };
  currentNs().intern("boolean?").bindRoot(boolean63, () => {
    return boolean63;
  }, (x) => {
    boolean63 = x;
    return boolean63;
  });
  _G.boolean63 = boolean63;
  var function63 = (x) => {
    return type63(x, "function");
  };
  currentNs().intern("function?").bindRoot(function63, () => {
    return function63;
  }, (x) => {
    function63 = x;
    return function63;
  });
  _G.function63 = function63;
  var symbol63 = (x) => {
    return type63(x, "symbol");
  };
  currentNs().intern("symbol?").bindRoot(symbol63, () => {
    return symbol63;
  }, (x) => {
    symbol63 = x;
    return symbol63;
  });
  _G.symbol63 = symbol63;
  var obj63 = (x) => {
    return is63(x) && type63(x, "object");
  };
  currentNs().intern("obj?").bindRoot(obj63, () => {
    return obj63;
  }, (x) => {
    obj63 = x;
    return obj63;
  });
  _G.obj63 = obj63;
  var array63 = (x) => {
    return Array.isArray(x);
  };
  currentNs().intern("array?").bindRoot(array63, () => {
    return array63;
  }, (x) => {
    array63 = x;
    return array63;
  });
  _G.array63 = array63;
  var sym63 = (x) => {
    return (x instanceof _G.Sym);
  };
  currentNs().intern("sym?").bindRoot(sym63, () => {
    return sym63;
  }, (x) => {
    sym63 = x;
    return sym63;
  });
  _G.sym63 = sym63;
  var atom63 = (x) => {
    return nil63(x) || string63(x) || number63(x) || boolean63(x) || symbol63(x) || sym63(x);
  };
  currentNs().intern("atom?").bindRoot(atom63, () => {
    return atom63;
  }, (x) => {
    atom63 = x;
    return atom63;
  });
  _G.atom63 = atom63;
  var metable63 = (x) => {
    return obj63(x);
  };
  currentNs().intern("metable?").bindRoot(metable63, () => {
    return metable63;
  }, (x) => {
    metable63 = x;
    return metable63;
  });
  _G.metable63 = metable63;
  var meta = (l) => {
    if (metable63(l)) {
      return l._meta;
    }
  };
  currentNs().intern("meta").bindRoot(meta, () => {
    return meta;
  }, (x) => {
    meta = x;
    return meta;
  });
  _G.meta = meta;
  var meta33 = (l, m) => {
    if (metable63(l)) {
      if (meta(l) === m) {
        return l;
      } else {
        return Object.defineProperty(l, "_meta", {["enumerable"]: false, ["value"]: m});
      }
    } else {
      return l;
    }
  };
  currentNs().intern("meta!").bindRoot(meta33, () => {
    return meta33;
  }, (x) => {
    meta33 = x;
    return meta33;
  });
  _G.meta33 = meta33;
  var meta63 = (l) => {
    return is63(meta(l));
  };
  currentNs().intern("meta?").bindRoot(meta63, () => {
    return meta63;
  }, (x) => {
    meta63 = x;
    return meta63;
  });
  _G.meta63 = meta63;
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
  currentNs().intern("fresh").bindRoot(fresh, () => {
    return fresh;
  }, (x) => {
    fresh = x;
    return fresh;
  });
  _G.fresh = fresh;
  var withMeta = (x, __x2) => {
    var __e5 = undefined;
    if (is63(__x2)) {
      __e5 = __x2;
    } else {
      __e5 = meta(x);
    }
    var __m1 = __e5;
    var __l1 = fresh(x);
    if (is63(x)) {
      meta33(__l1, __m1);
    }
    return __l1;
  };
  currentNs().intern("with-meta").bindRoot(withMeta, () => {
    return withMeta;
  }, (x) => {
    withMeta = x;
    return withMeta;
  });
  _G.withMeta = withMeta;
  nan = 0 / 0;
  currentNs().intern("nan").bindRoot(nan, () => {
    return nan;
  }, (x) => {
    nan = x;
    return nan;
  });
  _G.nan = nan;
  inf = 1 / 0;
  currentNs().intern("inf").bindRoot(inf, () => {
    return inf;
  }, (x) => {
    inf = x;
    return inf;
  });
  _G.inf = inf;
  _inf = - inf;
  currentNs().intern("-inf").bindRoot(_inf, () => {
    return _inf;
  }, (x) => {
    _inf = x;
    return _inf;
  });
  _G._inf = _inf;
  var nan63 = (n) => {
    return !( n === n);
  };
  currentNs().intern("nan?").bindRoot(nan63, () => {
    return nan63;
  }, (x) => {
    nan63 = x;
    return nan63;
  });
  _G.nan63 = nan63;
  var inf63 = (n) => {
    return n === inf || n === _inf;
  };
  currentNs().intern("inf?").bindRoot(inf63, () => {
    return inf63;
  }, (x) => {
    inf63 = x;
    return inf63;
  });
  _G.inf63 = inf63;
  var clip = (s, from, upto) => {
    return s.substring(from, upto);
  };
  currentNs().intern("clip").bindRoot(clip, () => {
    return clip;
  }, (x) => {
    clip = x;
    return clip;
  });
  _G.clip = clip;
  var cut = (x, from, upto) => {
    var __l2 = withMeta(x);
    var __j = 0;
    var __e6 = undefined;
    if (nil63(from) || from < 0) {
      __e6 = 0;
    } else {
      __e6 = from;
    }
    var __i3 = __e6;
    var __n4 = _35(x);
    var __e7 = undefined;
    if (nil63(upto) || upto > __n4) {
      __e7 = __n4;
    } else {
      __e7 = upto;
    }
    var __upto = __e7;
    while (__i3 < __upto) {
      __l2[__j] = x[__i3];
      __i3 = __i3 + 1;
      __j = __j + 1;
    }
    var ____o3 = x;
    var __k4 = undefined;
    for (__k4 in ____o3) {
      var __v3 = ____o3[__k4];
      var __e8 = undefined;
      if (numeric63(__k4)) {
        __e8 = parseInt(__k4);
      } else {
        __e8 = __k4;
      }
      var __k5 = __e8;
      if (! number63(__k5)) {
        __l2[__k5] = __v3;
      }
    }
    return __l2;
  };
  currentNs().intern("cut").bindRoot(cut, () => {
    return cut;
  }, (x) => {
    cut = x;
    return cut;
  });
  _G.cut = cut;
  var keys = (x) => {
    var __t = withMeta({}, meta(x));
    var ____o4 = x;
    var __k6 = undefined;
    for (__k6 in ____o4) {
      var __v4 = ____o4[__k6];
      var __e9 = undefined;
      if (numeric63(__k6)) {
        __e9 = parseInt(__k6);
      } else {
        __e9 = __k6;
      }
      var __k7 = __e9;
      if (! number63(__k7)) {
        __t[__k7] = __v4;
      }
    }
    return __t;
  };
  currentNs().intern("keys").bindRoot(keys, () => {
    return keys;
  }, (x) => {
    keys = x;
    return keys;
  });
  _G.keys = keys;
  var edge = (x) => {
    return _35(x) - 1;
  };
  currentNs().intern("edge").bindRoot(edge, () => {
    return edge;
  }, (x) => {
    edge = x;
    return edge;
  });
  _G.edge = edge;
  var inner = (x) => {
    return clip(x, 1, edge(x));
  };
  currentNs().intern("inner").bindRoot(inner, () => {
    return inner;
  }, (x) => {
    inner = x;
    return inner;
  });
  _G.inner = inner;
  var tl = (l) => {
    return cut(l, 1);
  };
  currentNs().intern("tl").bindRoot(tl, () => {
    return tl;
  }, (x) => {
    tl = x;
    return tl;
  });
  _G.tl = tl;
  var char = (s, n) => {
    return s.charAt(n);
  };
  currentNs().intern("char").bindRoot(char, () => {
    return char;
  }, (x) => {
    char = x;
    return char;
  });
  _G.char = char;
  var code = (s, n) => {
    return s.charCodeAt(n);
  };
  currentNs().intern("code").bindRoot(code, () => {
    return code;
  }, (x) => {
    code = x;
    return code;
  });
  _G.code = code;
  var stringLiteral63 = (x) => {
    return string63(x) && char(x, 0) === "\"";
  };
  currentNs().intern("string-literal?").bindRoot(stringLiteral63, () => {
    return stringLiteral63;
  }, (x) => {
    stringLiteral63 = x;
    return stringLiteral63;
  });
  _G.stringLiteral63 = stringLiteral63;
  var idLiteral63 = (x) => {
    return string63(x) && char(x, 0) === "|";
  };
  currentNs().intern("id-literal?").bindRoot(idLiteral63, () => {
    return idLiteral63;
  }, (x) => {
    idLiteral63 = x;
    return idLiteral63;
  });
  _G.idLiteral63 = idLiteral63;
  var add = (l, x) => {
    if (l.push) {
      l.push(x);
    } else {
      l[_35(l)] = x;
    }
    return undefined;
  };
  currentNs().intern("add").bindRoot(add, () => {
    return add;
  }, (x) => {
    add = x;
    return add;
  });
  _G.add = add;
  var drop = (l) => {
    if (l.pop) {
      return l.pop();
    } else {
      var __i6 = edge(l);
      var __x3 = l[__i6];
      delete l[__i6];
      return __x3;
    }
  };
  currentNs().intern("drop").bindRoot(drop, () => {
    return drop;
  }, (x) => {
    drop = x;
    return drop;
  });
  _G.drop = drop;
  var last = (l) => {
    return l[edge(l)];
  };
  currentNs().intern("last").bindRoot(last, () => {
    return last;
  }, (x) => {
    last = x;
    return last;
  });
  _G.last = last;
  var almost = (l) => {
    return cut(l, 0, edge(l));
  };
  currentNs().intern("almost").bindRoot(almost, () => {
    return almost;
  }, (x) => {
    almost = x;
    return almost;
  });
  _G.almost = almost;
  var reverse = (l) => {
    var __l11 = withMeta(l);
    var __n7 = edge(l);
    var ____o5 = l;
    var __k8 = undefined;
    for (__k8 in ____o5) {
      var __v5 = ____o5[__k8];
      var __e10 = undefined;
      if (numeric63(__k8)) {
        __e10 = parseInt(__k8);
      } else {
        __e10 = __k8;
      }
      var __k9 = __e10;
      if (number63(__k9)) {
        __k9 = __n7 - __k9;
      }
      __l11[__k9] = __v5;
    }
    return __l11;
  };
  currentNs().intern("reverse").bindRoot(reverse, () => {
    return reverse;
  }, (x) => {
    reverse = x;
    return reverse;
  });
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
  currentNs().intern("reduce").bindRoot(reduce, () => {
    return reduce;
  }, (x) => {
    reduce = x;
    return reduce;
  });
  _G.reduce = reduce;
  var join = (...ls) => {
    var __ls = unstash(ls);
    var __r201 = withMeta(hd(__ls));
    var ____x4 = __ls;
    var ____i8 = 0;
    while (____i8 < _35(____x4)) {
      var __l3 = ____x4[____i8];
      if (__l3) {
        var __n9 = _35(__r201);
        var ____o6 = __l3;
        var __k10 = undefined;
        for (__k10 in ____o6) {
          var __v6 = ____o6[__k10];
          var __e11 = undefined;
          if (numeric63(__k10)) {
            __e11 = parseInt(__k10);
          } else {
            __e11 = __k10;
          }
          var __k11 = __e11;
          if (number63(__k11)) {
            __k11 = __k11 + __n9;
          }
          __r201[__k11] = __v6;
        }
      }
      ____i8 = ____i8 + 1;
    }
    return __r201;
  };
  currentNs().intern("join").bindRoot(join, () => {
    return join;
  }, (x) => {
    join = x;
    return join;
  });
  _G.join = join;
  var find = (f, t) => {
    var ____o7 = t;
    var ____i10 = undefined;
    for (____i10 in ____o7) {
      var __x5 = ____o7[____i10];
      var __e12 = undefined;
      if (numeric63(____i10)) {
        __e12 = parseInt(____i10);
      } else {
        __e12 = ____i10;
      }
      var ____i101 = __e12;
      var __y = f(__x5);
      if (__y) {
        return __y;
      }
    }
  };
  currentNs().intern("find").bindRoot(find, () => {
    return find;
  }, (x) => {
    find = x;
    return find;
  });
  _G.find = find;
  var first = (f, l) => {
    var ____x6 = l;
    var ____i11 = 0;
    while (____i11 < _35(____x6)) {
      var __x7 = ____x6[____i11];
      var __y1 = f(__x7);
      if (__y1) {
        return __y1;
      }
      ____i11 = ____i11 + 1;
    }
  };
  currentNs().intern("first").bindRoot(first, () => {
    return first;
  }, (x) => {
    first = x;
    return first;
  });
  _G.first = first;
  var in63 = (x, t) => {
    return find((y) => {
      return x === y;
    }, t);
  };
  currentNs().intern("in?").bindRoot(in63, () => {
    return in63;
  }, (x) => {
    in63 = x;
    return in63;
  });
  _G.in63 = in63;
  var pair = (l) => {
    var __l12 = withMeta(l);
    var __i12 = 0;
    while (__i12 < _35(l)) {
      add(__l12, [l[__i12], l[__i12 + 1]]);
      __i12 = __i12 + 1;
      __i12 = __i12 + 1;
    }
    return __l12;
  };
  currentNs().intern("pair").bindRoot(pair, () => {
    return pair;
  }, (x) => {
    pair = x;
    return pair;
  });
  _G.pair = pair;
  var sort = (l, f) => {
    var __e13 = undefined;
    if (f) {
      __e13 = (a, b) => {
        if (f(a, b)) {
          return -1;
        } else {
          return 1;
        }
      };
    }
    return l.sort(__e13);
  };
  currentNs().intern("sort").bindRoot(sort, () => {
    return sort;
  }, (x) => {
    sort = x;
    return sort;
  });
  _G.sort = sort;
  var map = (f, x) => {
    var __t1 = withMeta(x);
    var ____x8 = x;
    var ____i13 = 0;
    while (____i13 < _35(____x8)) {
      var __v7 = ____x8[____i13];
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
      var __e14 = undefined;
      if (numeric63(__k12)) {
        __e14 = parseInt(__k12);
      } else {
        __e14 = __k12;
      }
      var __k13 = __e14;
      if (! number63(__k13)) {
        var __y3 = f(__v8);
        if (is63(__y3)) {
          __t1[__k13] = __y3;
        }
      }
    }
    return __t1;
  };
  currentNs().intern("map").bindRoot(map, () => {
    return map;
  }, (x) => {
    map = x;
    return map;
  });
  _G.map = map;
  var keep = (f, x) => {
    return map((v) => {
      if (yes(f(v))) {
        return v;
      }
    }, x);
  };
  currentNs().intern("keep").bindRoot(keep, () => {
    return keep;
  }, (x) => {
    keep = x;
    return keep;
  });
  _G.keep = keep;
  var keys63 = (t) => {
    var ____o9 = t;
    var __k14 = undefined;
    for (__k14 in ____o9) {
      var __v9 = ____o9[__k14];
      var __e15 = undefined;
      if (numeric63(__k14)) {
        __e15 = parseInt(__k14);
      } else {
        __e15 = __k14;
      }
      var __k15 = __e15;
      if (! number63(__k15)) {
        return true;
      }
    }
    return false;
  };
  currentNs().intern("keys?").bindRoot(keys63, () => {
    return keys63;
  }, (x) => {
    keys63 = x;
    return keys63;
  });
  _G.keys63 = keys63;
  var empty63 = (t) => {
    var ____o10 = t;
    var ____i16 = undefined;
    for (____i16 in ____o10) {
      var __x9 = ____o10[____i16];
      var __e16 = undefined;
      if (numeric63(____i16)) {
        __e16 = parseInt(____i16);
      } else {
        __e16 = ____i16;
      }
      var ____i161 = __e16;
      return false;
    }
    return true;
  };
  currentNs().intern("empty?").bindRoot(empty63, () => {
    return empty63;
  }, (x) => {
    empty63 = x;
    return empty63;
  });
  _G.empty63 = empty63;
  var stash = (args) => {
    if (args._stash) {
      return args;
    } else {
      if (keys63(args)) {
        var __l4 = meta33([], meta(args));
        var ____x10 = args;
        var ____i17 = 0;
        while (____i17 < _35(____x10)) {
          var __x11 = ____x10[____i17];
          add(__l4, __x11);
          ____i17 = ____i17 + 1;
        }
        var __p = keys(args);
        __p._stash = __p._stash || true;
        add(__l4, __p);
        return __l4;
      } else {
        return args;
      }
    }
  };
  currentNs().intern("stash").bindRoot(stash, () => {
    return stash;
  }, (x) => {
    stash = x;
    return stash;
  });
  _G.stash = stash;
  var unstash = (args) => {
    if (none63(args)) {
      return withMeta(args);
    } else {
      var __l5 = last(args);
      if (obj63(__l5) && __l5._stash) {
        var __args1 = almost(args);
        var ____o11 = __l5;
        var __k16 = undefined;
        for (__k16 in ____o11) {
          var __v10 = ____o11[__k16];
          var __e17 = undefined;
          if (numeric63(__k16)) {
            __e17 = parseInt(__k16);
          } else {
            __e17 = __k16;
          }
          var __k17 = __e17;
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
  currentNs().intern("unstash").bindRoot(unstash, () => {
    return unstash;
  }, (x) => {
    unstash = x;
    return unstash;
  });
  _G.unstash = unstash;
  var destash33 = (l, args1) => {
    if (obj63(l) && l._stash) {
      var ____o12 = l;
      var __k18 = undefined;
      for (__k18 in ____o12) {
        var __v11 = ____o12[__k18];
        var __e18 = undefined;
        if (numeric63(__k18)) {
          __e18 = parseInt(__k18);
        } else {
          __e18 = __k18;
        }
        var __k19 = __e18;
        if (!( __k19 === "_stash")) {
          args1[__k19] = __v11;
        }
      }
    } else {
      return l;
    }
  };
  currentNs().intern("destash!").bindRoot(destash33, () => {
    return destash33;
  }, (x) => {
    destash33 = x;
    return destash33;
  });
  _G.destash33 = destash33;
  var search = (s, pattern, start) => {
    var __i20 = s.indexOf(pattern, start);
    if (__i20 >= 0) {
      return __i20;
    }
  };
  currentNs().intern("search").bindRoot(search, () => {
    return search;
  }, (x) => {
    search = x;
    return search;
  });
  _G.search = search;
  var split = (s, sep) => {
    if (s === "" || sep === "") {
      return meta33([], meta(s));
    } else {
      var __l6 = meta33([], meta(s));
      var __n17 = _35(sep);
      while (true) {
        var __i21 = search(s, sep);
        if (nil63(__i21)) {
          break;
        } else {
          add(__l6, clip(s, 0, __i21));
          s = clip(s, __i21 + __n17);
        }
      }
      add(__l6, s);
      return __l6;
    }
  };
  currentNs().intern("split").bindRoot(split, () => {
    return split;
  }, (x) => {
    split = x;
    return split;
  });
  _G.split = split;
  var cat = (...xs) => {
    var __xs = unstash(xs);
    return either(reduce((a, b) => {
      return a + b;
    }, __xs), "");
  };
  currentNs().intern("cat").bindRoot(cat, () => {
    return cat;
  }, (x) => {
    cat = x;
    return cat;
  });
  _G.cat = cat;
  var _43 = (...xs) => {
    var __xs1 = unstash(xs);
    return either(reduce((a, b) => {
      return a + b;
    }, __xs1), 0);
  };
  currentNs().intern("+").bindRoot(_43, () => {
    return _43;
  }, (x) => {
    _43 = x;
    return _43;
  });
  _G._43 = _43;
  var _45 = (...xs) => {
    var __xs2 = unstash(xs);
    return either(reduce((b, a) => {
      return a - b;
    }, reverse(__xs2)), 0);
  };
  currentNs().intern("-").bindRoot(_45, () => {
    return _45;
  }, (x) => {
    _45 = x;
    return _45;
  });
  _G._45 = _45;
  var _42 = (...xs) => {
    var __xs3 = unstash(xs);
    return either(reduce((a, b) => {
      return a * b;
    }, __xs3), 1);
  };
  currentNs().intern("*").bindRoot(_42, () => {
    return _42;
  }, (x) => {
    _42 = x;
    return _42;
  });
  _G._42 = _42;
  var _47 = (...xs) => {
    var __xs4 = unstash(xs);
    return either(reduce((b, a) => {
      return a / b;
    }, reverse(__xs4)), 1);
  };
  currentNs().intern("/").bindRoot(_47, () => {
    return _47;
  }, (x) => {
    _47 = x;
    return _47;
  });
  _G._47 = _47;
  var _37 = (...xs) => {
    var __xs5 = unstash(xs);
    return either(reduce((b, a) => {
      return a % b;
    }, reverse(__xs5)), 0);
  };
  currentNs().intern("%").bindRoot(_37, () => {
    return _37;
  }, (x) => {
    _37 = x;
    return _37;
  });
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
  currentNs().intern("pairwise").bindRoot(pairwise, () => {
    return pairwise;
  }, (x) => {
    pairwise = x;
    return pairwise;
  });
  _G.pairwise = pairwise;
  var _60 = (...xs) => {
    var __xs6 = unstash(xs);
    return pairwise((a, b) => {
      return a < b;
    }, __xs6);
  };
  currentNs().intern("<").bindRoot(_60, () => {
    return _60;
  }, (x) => {
    _60 = x;
    return _60;
  });
  _G._60 = _60;
  var _62 = (...xs) => {
    var __xs7 = unstash(xs);
    return pairwise((a, b) => {
      return a > b;
    }, __xs7);
  };
  currentNs().intern(">").bindRoot(_62, () => {
    return _62;
  }, (x) => {
    _62 = x;
    return _62;
  });
  _G._62 = _62;
  var _61 = (...xs) => {
    var __xs8 = unstash(xs);
    return pairwise((a, b) => {
      return a === b;
    }, __xs8);
  };
  currentNs().intern("=").bindRoot(_61, () => {
    return _61;
  }, (x) => {
    _61 = x;
    return _61;
  });
  _G._61 = _61;
  var _6061 = (...xs) => {
    var __xs9 = unstash(xs);
    return pairwise((a, b) => {
      return a <= b;
    }, __xs9);
  };
  currentNs().intern("<=").bindRoot(_6061, () => {
    return _6061;
  }, (x) => {
    _6061 = x;
    return _6061;
  });
  _G._6061 = _6061;
  var _6261 = (...xs) => {
    var __xs10 = unstash(xs);
    return pairwise((a, b) => {
      return a >= b;
    }, __xs10);
  };
  currentNs().intern(">=").bindRoot(_6261, () => {
    return _6261;
  }, (x) => {
    _6261 = x;
    return _6261;
  });
  _G._6261 = _6261;
  var number = (s) => {
    var __n18 = parseFloat(s);
    if (! isNaN(__n18)) {
      return __n18;
    }
  };
  currentNs().intern("number").bindRoot(number, () => {
    return number;
  }, (x) => {
    number = x;
    return number;
  });
  _G.number = number;
  var numberCode63 = (n) => {
    return n >= 48 && n <= 57;
  };
  currentNs().intern("number-code?").bindRoot(numberCode63, () => {
    return numberCode63;
  }, (x) => {
    numberCode63 = x;
    return numberCode63;
  });
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
  currentNs().intern("numeric?").bindRoot(numeric63, () => {
    return numeric63;
  }, (x) => {
    numeric63 = x;
    return numeric63;
  });
  _G.numeric63 = numeric63;
  var tostring = (x) => {
    return x.toString();
  };
  currentNs().intern("tostring").bindRoot(tostring, () => {
    return tostring;
  }, (x) => {
    tostring = x;
    return tostring;
  });
  _G.tostring = tostring;
  var escape = (s) => {
    var __s1 = "\"";
    var __i24 = 0;
    while (__i24 < _35(s)) {
      var __c = char(s, __i24);
      var __e19 = undefined;
      if (__c === "\n") {
        __e19 = "\\n";
      } else {
        var __e20 = undefined;
        if (__c === "\r") {
          __e20 = "\\r";
        } else {
          var __e21 = undefined;
          if (__c === "\"") {
            __e21 = "\\\"";
          } else {
            var __e22 = undefined;
            if (__c === "\\") {
              __e22 = "\\\\";
            } else {
              __e22 = __c;
            }
            __e21 = __e22;
          }
          __e20 = __e21;
        }
        __e19 = __e20;
      }
      var __c1 = __e19;
      __s1 = __s1 + __c1;
      __i24 = __i24 + 1;
    }
    return __s1 + "\"";
  };
  currentNs().intern("escape").bindRoot(escape, () => {
    return escape;
  }, (x) => {
    escape = x;
    return escape;
  });
  _G.escape = escape;
  var simpleId63 = (x) => {
    if (sym63(x)) {
      return simpleId63(str(x));
    } else {
      var __id6 = string63(x);
      var __e23 = undefined;
      if (__id6) {
        var ____id1 = (() => {
          try {
            return [true, readString(x)];
          }
          catch (__e106) {
            return [false, __e106];
          }
        })();
        var __ok = ____id1[0];
        var __v12 = ____id1[1];
        __e23 = __ok && eq(__v12, x);
      } else {
        __e23 = __id6;
      }
      return __e23;
    }
  };
  currentNs().intern("simple-id?").bindRoot(simpleId63, () => {
    return simpleId63;
  }, (x) => {
    simpleId63 = x;
    return simpleId63;
  });
  _G.simpleId63 = simpleId63;
  var str = (x, stack) => {
    if (nil63(x)) {
      return "nil";
    } else {
      if (x[Symbol["for"]("str")]) {
        return x[Symbol["for"]("str")](stack);
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
                            var __l7 = stack || [];
                            add(__l7, x);
                            var ____o13 = x;
                            var __k20 = undefined;
                            for (__k20 in ____o13) {
                              var __v13 = ____o13[__k20];
                              var __e24 = undefined;
                              if (numeric63(__k20)) {
                                __e24 = parseInt(__k20);
                              } else {
                                __e24 = __k20;
                              }
                              var __k21 = __e24;
                              if (number63(__k21)) {
                                __xs11[__k21] = str(__v13, __l7);
                              } else {
                                add(__ks, str(__k21, __l7) + ":");
                                add(__ks, str(__v13, __l7));
                              }
                            }
                            drop(__l7);
                            var ____o14 = join(__xs11, __ks);
                            var ____i26 = undefined;
                            for (____i26 in ____o14) {
                              var __v14 = ____o14[____i26];
                              var __e25 = undefined;
                              if (numeric63(____i26)) {
                                __e25 = parseInt(____i26);
                              } else {
                                __e25 = ____i26;
                              }
                              var ____i261 = __e25;
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
  currentNs().intern("str").bindRoot(str, () => {
    return str;
  }, (x) => {
    str = x;
    return str;
  });
  _G.str = str;
  var apply = (f, args) => {
    var __args = stash(args);
    return f.apply(f, __args);
  };
  currentNs().intern("apply").bindRoot(apply, () => {
    return apply;
  }, (x) => {
    apply = x;
    return apply;
  });
  _G.apply = apply;
  var call = (f, ...__r310) => {
    var ____r310 = unstash(__r310);
    var __f = destash33(f, ____r310);
    var ____id2 = ____r310;
    var __args11 = cut(____id2, 0);
    return _G.apply(__f, __args11);
  };
  currentNs().intern("call").bindRoot(call, () => {
    return call;
  }, (x) => {
    call = x;
    return call;
  });
  _G.call = call;
  var setenv = (k, ...__r313) => {
    var ____r313 = unstash(__r313);
    var __k22 = destash33(k, ____r313);
    var ____id3 = ____r313;
    var __keys = cut(____id3, 0);
    if (sym63(__k22)) {
      __k22 = str(__k22);
    }
    if (string63(__k22)) {
      var __e26 = undefined;
      if (__keys.toplevel) {
        __e26 = hd(_G.environment);
      } else {
        __e26 = last(_G.environment);
      }
      var __frame = __e26;
      var __entry = __frame[__k22] || {};
      var ____o15 = __keys;
      var __k23 = undefined;
      for (__k23 in ____o15) {
        var __v15 = ____o15[__k23];
        var __e27 = undefined;
        if (numeric63(__k23)) {
          __e27 = parseInt(__k23);
        } else {
          __e27 = __k23;
        }
        var __k24 = __e27;
        __entry[__k24] = __v15;
      }
      __frame[__k22] = __entry;
      return __frame[__k22];
    }
  };
  currentNs().intern("setenv").bindRoot(setenv, () => {
    return setenv;
  }, (x) => {
    setenv = x;
    return setenv;
  });
  _G.setenv = setenv;
  var fetchenv = (k, ...__r316) => {
    var ____r316 = unstash(__r316);
    var __k25 = destash33(k, ____r316);
    var ____id4 = ____r316;
    var __keys1 = cut(____id4, 0);
    if (sym63(__k25)) {
      __k25 = str(__k25);
    }
    if (string63(__k25)) {
      var __e28 = undefined;
      if (__keys1.toplevel) {
        __e28 = hd(_G.environment);
      } else {
        __e28 = last(_G.environment);
      }
      var __frame1 = __e28;
      var __entry1 = __frame1[__k25] || {};
      __frame1[__k25] = __entry1;
      return __frame1[__k25];
    }
  };
  currentNs().intern("fetchenv").bindRoot(fetchenv, () => {
    return fetchenv;
  }, (x) => {
    fetchenv = x;
    return fetchenv;
  });
  _G.fetchenv = fetchenv;
  var assignenv = (k, p, toplevel63) => {
    if (sym63(k)) {
      k = str(k);
    }
    if (string63(k)) {
      var __e29 = undefined;
      if (keys.toplevel) {
        __e29 = hd(_G.environment);
      } else {
        __e29 = last(_G.environment);
      }
      var __frame2 = __e29;
      var __entry2 = __frame2[k] || {};
      __frame2[k] = p;
      return k;
    }
  };
  currentNs().intern("assignenv").bindRoot(assignenv, () => {
    return assignenv;
  }, (x) => {
    assignenv = x;
    return assignenv;
  });
  _G.assignenv = assignenv;
  var putenv = (name, kind, x, __x12, toplevel63) => {
    var __e30 = undefined;
    if (is63(__x12)) {
      __e30 = __x12;
    } else {
      __e30 = {};
    }
    var __props = __e30;
    if (sym63(name)) {
      name = str(name);
    }
    if (string63(name)) {
      var __p1 = Object.assign({}, __props, {[kind]: x});
      var __ns4 = currentNs();
      var __full = __ns4.name + "/" + name;
      var __val = __ns4.intern(name).deref(__p1);
      _G.environment[edge(_G.environment)][__full] = __p1;
      return __p1;
    }
  };
  currentNs().intern("putenv").bindRoot(putenv, () => {
    return putenv;
  }, (x) => {
    putenv = x;
    return putenv;
  });
  _G.putenv = putenv;
  var setenv37 = (name, kind, x, props, toplevel63) => {
    var __e = assignenv(name, putenv(name, kind, x, props, toplevel63), toplevel63);
    if (__e) {
      return currentNs().intern(__e);
    }
  };
  currentNs().intern("setenv%").bindRoot(setenv37, () => {
    return setenv37;
  }, (x) => {
    setenv37 = x;
    return setenv37;
  });
  _G.setenv37 = setenv37;
  var print = (x) => {
    return console.log(x);
  };
  currentNs().intern("print").bindRoot(print, () => {
    return print;
  }, (x) => {
    print = x;
    return print;
  });
  _G.print = print;
  abs = Math.abs;
  currentNs().intern("abs").bindRoot(abs, () => {
    return abs;
  }, (x) => {
    abs = x;
    return abs;
  });
  _G.abs = abs;
  acos = Math.acos;
  currentNs().intern("acos").bindRoot(acos, () => {
    return acos;
  }, (x) => {
    acos = x;
    return acos;
  });
  _G.acos = acos;
  asin = Math.asin;
  currentNs().intern("asin").bindRoot(asin, () => {
    return asin;
  }, (x) => {
    asin = x;
    return asin;
  });
  _G.asin = asin;
  atan = Math.atan;
  currentNs().intern("atan").bindRoot(atan, () => {
    return atan;
  }, (x) => {
    atan = x;
    return atan;
  });
  _G.atan = atan;
  atan2 = Math.atan2;
  currentNs().intern("atan2").bindRoot(atan2, () => {
    return atan2;
  }, (x) => {
    atan2 = x;
    return atan2;
  });
  _G.atan2 = atan2;
  ceil = Math.ceil;
  currentNs().intern("ceil").bindRoot(ceil, () => {
    return ceil;
  }, (x) => {
    ceil = x;
    return ceil;
  });
  _G.ceil = ceil;
  cos = Math.cos;
  currentNs().intern("cos").bindRoot(cos, () => {
    return cos;
  }, (x) => {
    cos = x;
    return cos;
  });
  _G.cos = cos;
  floor = Math.floor;
  currentNs().intern("floor").bindRoot(floor, () => {
    return floor;
  }, (x) => {
    floor = x;
    return floor;
  });
  _G.floor = floor;
  log = Math.log;
  currentNs().intern("log").bindRoot(log, () => {
    return log;
  }, (x) => {
    log = x;
    return log;
  });
  _G.log = log;
  log10 = Math.log10;
  currentNs().intern("log10").bindRoot(log10, () => {
    return log10;
  }, (x) => {
    log10 = x;
    return log10;
  });
  _G.log10 = log10;
  max = Math.max;
  currentNs().intern("max").bindRoot(max, () => {
    return max;
  }, (x) => {
    max = x;
    return max;
  });
  _G.max = max;
  min = Math.min;
  currentNs().intern("min").bindRoot(min, () => {
    return min;
  }, (x) => {
    min = x;
    return min;
  });
  _G.min = min;
  pow = Math.pow;
  currentNs().intern("pow").bindRoot(pow, () => {
    return pow;
  }, (x) => {
    pow = x;
    return pow;
  });
  _G.pow = pow;
  random = Math.random;
  currentNs().intern("random").bindRoot(random, () => {
    return random;
  }, (x) => {
    random = x;
    return random;
  });
  _G.random = random;
  sin = Math.sin;
  currentNs().intern("sin").bindRoot(sin, () => {
    return sin;
  }, (x) => {
    sin = x;
    return sin;
  });
  _G.sin = sin;
  sinh = Math.sinh;
  currentNs().intern("sinh").bindRoot(sinh, () => {
    return sinh;
  }, (x) => {
    sinh = x;
    return sinh;
  });
  _G.sinh = sinh;
  sqrt = Math.sqrt;
  currentNs().intern("sqrt").bindRoot(sqrt, () => {
    return sqrt;
  }, (x) => {
    sqrt = x;
    return sqrt;
  });
  _G.sqrt = sqrt;
  tan = Math.tan;
  currentNs().intern("tan").bindRoot(tan, () => {
    return tan;
  }, (x) => {
    tan = x;
    return tan;
  });
  _G.tan = tan;
  tanh = Math.tanh;
  currentNs().intern("tanh").bindRoot(tanh, () => {
    return tanh;
  }, (x) => {
    tanh = x;
    return tanh;
  });
  _G.tanh = tanh;
  trunc = Math.floor;
  currentNs().intern("trunc").bindRoot(trunc, () => {
    return trunc;
  }, (x) => {
    trunc = x;
    return trunc;
  });
  _G.trunc = trunc;
  _G.currentNs("dax.macros");
  setenv37("ns", "macro", (name) => {
    _G.nsPrefix = name;
    return ["_G", ".current-ns", ["quote", name]];
  });
  setenv37("deref", "macro", (ns, name, ...__r372) => {
    var ____r372 = unstash(__r372);
    var __ns5 = destash33(ns, ____r372);
    var __name1 = destash33(name, ____r372);
    var ____id7 = ____r372;
    var __args2 = cut(____id7, 0);
    return join([["_G", ".Namespace", ".find", ["quote", __ns5]], [".intern", ["quote", __name1]], [".deref"]], __args2);
  });
  setenv37("setq", "macro", (ns, name, value) => {
    return [["_G", ".Namespace", ".find", ["quote", ns]], [".intern", ["quote", name]], [".deref", value]];
  });
  setenv37("quote", "macro", (form) => {
    return quoted(form);
  });
  setenv37("quasiquote", "macro", (form) => {
    return quasiexpand(form, 1);
  });
  setenv37("set", "macro", (...args) => {
    var __args3 = unstash(args);
    return join(["do"], map((__x13) => {
      var ____id8 = __x13;
      var __lh = ____id8[0];
      var __rh = ____id8[1];
      return ["%set", __lh, __rh];
    }, pair(__args3)));
  });
  setenv37("at", "macro", (l, i) => {
    return [l, ["brackets", i]];
  });
  setenv37("wipe", "macro", (place) => {
    return ["%delete", place];
  });
  setenv37("list", "macro", (...body) => {
    var __body = unstash(body);
    if (keys63(__body)) {
      return join(["%object"], mapo((x) => {
        return x;
      }, __body));
    } else {
      return join(["%array"], __body);
    }
  });
  setenv37("if", "macro", (...branches) => {
    var __branches = unstash(branches);
    return hd(expandIf(__branches));
  });
  setenv37("case", "macro", (expr, ...__r380) => {
    var ____r380 = unstash(__r380);
    var __expr = destash33(expr, ____r380);
    var ____id9 = ____r380;
    var __clauses = cut(____id9, 0);
    var __x14 = unique("x");
    var __eq = (_) => {
      if ((_G.Namespace.find("dax.compiler").intern("eq").deref())(_, "else")) {
        return true;
      } else {
        return ["=", _, __x14];
      }
    };
    var __cl = (__x15) => {
      var ____id10 = __x15;
      var __a1 = ____id10[0];
      var __body1 = cut(____id10, 1);
      if (sym63(__a1) || string63(__a1) || number63(__a1) || (_G.Namespace.find("dax.compiler").intern("eq").deref())(hd(__a1), "quote")) {
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
    return ["let", __x14, __expr, join(["if"], _G.apply(join, map(__cl, __clauses)))];
  });
  setenv37("when", "macro", (cond, ...__r383) => {
    var ____r383 = unstash(__r383);
    var __cond = destash33(cond, ____r383);
    var ____id11 = ____r383;
    var __body2 = cut(____id11, 0);
    return ["if", __cond, join(["do"], __body2)];
  });
  setenv37("unless", "macro", (cond, ...__r384) => {
    var ____r384 = unstash(__r384);
    var __cond1 = destash33(cond, ____r384);
    var ____id12 = ____r384;
    var __body3 = cut(____id12, 0);
    return ["if", ["not", __cond1], join(["do"], __body3)];
  });
  setenv37("obj", "macro", (...body) => {
    var __body4 = unstash(body);
    return join(["%object"], mapo((x) => {
      return x;
    }, __body4));
  });
  setenv37("let", "macro", (bs, ...__r386) => {
    var ____r386 = unstash(__r386);
    var __bs = destash33(bs, ____r386);
    var ____id13 = ____r386;
    var __body5 = cut(____id13, 0);
    if (atom63(__bs)) {
      return join(["let", [__bs, hd(__body5)]], tl(__body5));
    } else {
      if (none63(__bs)) {
        return join(["do"], __body5);
      } else {
        var ____id14 = __bs;
        var __lh1 = ____id14[0];
        var __rh1 = ____id14[1];
        var __bs2 = cut(____id14, 2);
        var ____id15 = bind(__lh1, either(__rh1, "nil"));
        var __id16 = ____id15[0];
        var __val1 = ____id15[1];
        var __bs1 = cut(____id15, 2);
        var __renames = [];
        if (! idLiteral63(__id16)) {
          var __id111 = unique(__id16);
          __renames = [__id16, __id111];
          __id16 = __id111;
        }
        return ["do", ["%local", __id16, __val1], ["let-symbol", __renames, join(["let", join(__bs1, __bs2)], __body5)]];
      }
    }
  });
  setenv37("with", "macro", (x, v, ...__r387) => {
    var ____r387 = unstash(__r387);
    var __x16 = destash33(x, ____r387);
    var __v16 = destash33(v, ____r387);
    var ____id17 = ____r387;
    var __body6 = cut(____id17, 0);
    return join(["let", [__x16, __v16]], __body6, [__x16]);
  });
  setenv37("let-when", "macro", (x, v, ...__r388) => {
    var ____r388 = unstash(__r388);
    var __x17 = destash33(x, ____r388);
    var __v17 = destash33(v, ____r388);
    var ____id18 = ____r388;
    var __body7 = cut(____id18, 0);
    var __y4 = unique("y");
    return ["let", __y4, __v17, ["when", ["yes", __y4], join(["let", [__x17, __y4]], __body7)]];
  });
  setenv37("void", "macro", (...body) => {
    var __body8 = unstash(body);
    return join(["do"], __body8, [["do"]]);
  });
  setenv37("%setenv", "macro", (name, kind, ...__r389) => {
    var ____r389 = unstash(__r389);
    var __name2 = destash33(name, ____r389);
    var __kind = destash33(kind, ____r389);
    var ____id19 = ____r389;
    var __keys2 = cut(____id19, 0);
    var __ks1 = cut(__keys2);
    delete __ks1[__kind];
    return ["void", join(["setenv%", ["quote", __name2], ["quote", __kind], __keys2[__kind]], __ks1)];
  });
  setenv37("define-macro", "macro", (name, args, ...__r390) => {
    var ____r390 = unstash(__r390);
    var __name3 = destash33(name, ____r390);
    var __args4 = destash33(args, ____r390);
    var ____id20 = ____r390;
    var __body9 = cut(____id20, 0);
    return {[0]: "%setenv", [1]: __name3, [2]: "macro", ["macro"]: join(["fn", __args4], __body9)};
  });
  setenv37("define-special", "macro", (name, args, ...__r391) => {
    var ____r391 = unstash(__r391);
    var __name4 = destash33(name, ____r391);
    var __args5 = destash33(args, ____r391);
    var ____id21 = ____r391;
    var __body10 = cut(____id21, 0);
    return join({[0]: "%setenv", [1]: __name4, [2]: "special", ["special"]: join(["fn", __args5], __body10)}, keys(__body10));
  });
  setenv37("define-symbol-macro", "macro", (name, expansion) => {
    return ["void", {[0]: "setenv", [1]: ["quote", name], ["symbol"]: ["quote", expansion]}];
  });
  setenv37("define-reader", "macro", (__x18, ...__r393) => {
    var ____id22 = __x18;
    var __char = ____id22[0];
    var __s11 = ____id22[1];
    var ____r393 = unstash(__r393);
    var ____x18 = destash33(__x18, ____r393);
    var ____id23 = ____r393;
    var __body11 = cut(____id23, 0);
    return ["set", ["read-table", ["brackets", __char]], join(["fn", [__s11]], __body11)];
  });
  setenv37("alter-definition", "macro", (name) => {
    return [["current-ns"], ".intern", ["quote", name], ".bind-root", name, ["fn", join(), name], ["fn", ["x"], ["set", name, "x"]]];
  });
  setenv37("define", "macro", (name, x, ...__r395) => {
    var ____r395 = unstash(__r395);
    var __name5 = destash33(name, ____r395);
    var __x19 = destash33(x, ____r395);
    var ____id24 = ____r395;
    var __body12 = cut(____id24, 0);
    setenv(__name5, {["_stash"]: true, ["variable"]: true});
    var __e32 = undefined;
    if (some63(__body12)) {
      __e32 = join(["%local-function", __name5], bind42(__x19, __body12));
    } else {
      __e32 = ["%local", __name5, __x19];
    }
    var __form = __e32;
    return ["do", __form, ["alter-definition", __name5]];
  });
  setenv37("define-global", "macro", (name, x, ...__r396) => {
    var ____r396 = unstash(__r396);
    var __name6 = destash33(name, ____r396);
    var __x20 = destash33(x, ____r396);
    var ____id25 = ____r396;
    var __body13 = cut(____id25, 0);
    setenv(__name6, {["_stash"]: true, ["toplevel"]: true, ["variable"]: true});
    var __e33 = undefined;
    if (some63(__body13)) {
      __e33 = join(["%global-function", __name6], bind42(__x20, __body13));
    } else {
      __e33 = ["%set", __name6, __x20];
    }
    return ["do", __e33, ["alter-definition", __name6], ["%set", ["_G", "." + __name6], __name6]];
  });
  setenv37("with-frame", "macro", (...body) => {
    var __body14 = unstash(body);
    var __x21 = unique("x");
    return ["do", ["add", ["_G", ".environment"], ["obj"]], ["with", __x21, join(["do"], __body14), ["drop", ["_G", ".environment"]]]];
  });
  setenv37("with-bindings", "macro", (__x22, ...__r397) => {
    var ____id26 = __x22;
    var __names = ____id26[0];
    var ____r397 = unstash(__r397);
    var ____x22 = destash33(__x22, ____r397);
    var ____id27 = ____r397;
    var __body15 = cut(____id27, 0);
    var __x23 = unique("x");
    return join(["with-frame", ["each", __x23, __names, ["if", ["default-assignment?", __x23], {[0]: "setenv", [1]: ["at", __x23, 1], ["variable"]: true}, {[0]: "setenv", [1]: __x23, ["variable"]: true}]]], __body15);
  });
  setenv37("let-macro", "macro", (definitions, ...__r398) => {
    var ____r398 = unstash(__r398);
    var __definitions = destash33(definitions, ____r398);
    var ____id28 = ____r398;
    var __body16 = cut(____id28, 0);
    add(_G.environment, {});
    map((m) => {
      return _eval(join(["define-macro"], m));
    }, __definitions);
    var ____x24 = join(["do"], macroexpand(__body16));
    drop(_G.environment);
    return ____x24;
  });
  setenv37("let-symbol", "macro", (expansions, ...__r400) => {
    var ____r400 = unstash(__r400);
    var __expansions = destash33(expansions, ____r400);
    var ____id29 = ____r400;
    var __body17 = cut(____id29, 0);
    add(_G.environment, {});
    map((__x26) => {
      var ____id30 = __x26;
      var __name7 = ____id30[0];
      var __exp = ____id30[1];
      return _eval(["define-symbol-macro", __name7, __exp]);
    }, pair(__expansions));
    var ____x25 = join(["do"], macroexpand(__body17));
    drop(_G.environment);
    return ____x25;
  });
  setenv37("let-unique", "macro", (names, ...__r402) => {
    var ____r402 = unstash(__r402);
    var __names1 = destash33(names, ____r402);
    var ____id31 = ____r402;
    var __body18 = cut(____id31, 0);
    var __bs11 = map((n) => {
      return [n, ["unique", ["quote", n]]];
    }, __names1);
    return join(["let", _G.apply(join, __bs11)], __body18);
  });
  setenv37("fn", "macro", (args, ...__r404) => {
    var ____r404 = unstash(__r404);
    var __args6 = destash33(args, ____r404);
    var ____id32 = ____r404;
    var __body19 = cut(____id32, 0);
    return join(["%function"], bind42(__args6, __body19), keys(__body19));
  });
  setenv37("apply", "macro", (f, ...__r405) => {
    var ____r405 = unstash(__r405);
    var __f1 = destash33(f, ____r405);
    var ____id33 = ____r405;
    var __args7 = cut(____id33, 0);
    if (_35(__args7) > 1) {
      return ["%call", ["_G", ".apply"], __f1, ["join", join(["list"], almost(__args7)), last(__args7)]];
    } else {
      return join(["%call", ["_G", ".apply"], __f1], __args7);
    }
  });
  setenv37("guard", "macro", (expr) => {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  });
  setenv37("each", "macro", (x, t, ...__r407) => {
    var ____r407 = unstash(__r407);
    var __x27 = destash33(x, ____r407);
    var __t2 = destash33(t, ____r407);
    var ____id34 = ____r407;
    var __body20 = cut(____id34, 0);
    var __o16 = unique("o");
    var __n23 = unique("n");
    var __i28 = unique("i");
    var __e34 = undefined;
    if (atom63(__x27)) {
      __e34 = [__i28, __x27];
    } else {
      var __e35 = undefined;
      if (_35(__x27) > 1) {
        __e35 = __x27;
      } else {
        __e35 = [__i28, hd(__x27)];
      }
      __e34 = __e35;
    }
    var ____id35 = __e34;
    var __k26 = ____id35[0];
    var __v18 = ____id35[1];
    return ["let", [__o16, __t2, __k26, "nil"], ["%for", __o16, __k26, ["let", [__v18, [__o16, ["brackets", __k26]]], join(["let", __k26, ["if", ["numeric?", __k26], ["parseInt", __k26], __k26]], __body20)]]];
  });
  setenv37("for", "macro", (i, to, ...__r408) => {
    var ____r408 = unstash(__r408);
    var __i29 = destash33(i, ____r408);
    var __to = destash33(to, ____r408);
    var ____id36 = ____r408;
    var __body21 = cut(____id36, 0);
    return ["let", __i29, 0, join(["while", ["<", __i29, __to]], __body21, [["inc", __i29]])];
  });
  setenv37("step", "macro", (v, t, ...__r409) => {
    var ____r409 = unstash(__r409);
    var __v19 = destash33(v, ____r409);
    var __t3 = destash33(t, ____r409);
    var ____id37 = ____r409;
    var __body22 = cut(____id37, 0);
    var __x28 = unique("x");
    var __i30 = unique("i");
    return ["let", [__x28, __t3], ["for", __i30, ["#", __x28], join(["let", [__v19, ["at", __x28, __i30]]], __body22)]];
  });
  setenv37("set-of", "macro", (...xs) => {
    var __xs12 = unstash(xs);
    var __l8 = [];
    var ____o17 = __xs12;
    var ____i31 = undefined;
    for (____i31 in ____o17) {
      var __x29 = ____o17[____i31];
      var __e36 = undefined;
      if (numeric63(____i31)) {
        __e36 = parseInt(____i31);
      } else {
        __e36 = ____i31;
      }
      var ____i311 = __e36;
      __l8[__x29] = true;
    }
    return join(["obj"], __l8);
  });
  setenv37("join!", "macro", (a, ...__r410) => {
    var ____r410 = unstash(__r410);
    var __a2 = destash33(a, ____r410);
    var ____id38 = ____r410;
    var __bs21 = cut(____id38, 0);
    return ["set", __a2, join(["join", __a2], __bs21)];
  });
  setenv37("cat!", "macro", (a, ...__r411) => {
    var ____r411 = unstash(__r411);
    var __a3 = destash33(a, ____r411);
    var ____id39 = ____r411;
    var __bs3 = cut(____id39, 0);
    return ["set", __a3, join(["cat", __a3], __bs3)];
  });
  setenv37("inc", "macro", (n, by) => {
    var __e37 = undefined;
    if (nil63(by)) {
      __e37 = 1;
    } else {
      __e37 = by;
    }
    return ["set", n, ["+", n, __e37]];
  });
  setenv37("dec", "macro", (n, by) => {
    var __e38 = undefined;
    if (nil63(by)) {
      __e38 = 1;
    } else {
      __e38 = by;
    }
    return ["set", n, ["-", n, __e38]];
  });
  setenv37("with-indent", "macro", (form) => {
    var __x30 = unique("x");
    return ["do", ["inc", "indent-level"], ["with", __x30, form, ["dec", "indent-level"]]];
  });
  setenv37("export", "macro", (...names) => {
    var __names2 = unstash(names);
    return join(["do"], map((k) => {
      return ["set", ["exports", "." + k], k];
    }, __names2));
  });
  setenv37("when-compiling", "macro", (...body) => {
    var __body23 = unstash(body);
    return _eval(join(["do"], __body23));
  });
  setenv37("during-compilation", "macro", (...body) => {
    var __body24 = unstash(body);
    var __x31 = expand(join(["do"], __body24));
    _eval(__x31);
    return __x31;
  });
  setenv37("class", "macro", (x, ...__r416) => {
    var ____r416 = unstash(__r416);
    var __x32 = destash33(x, ____r416);
    var ____id40 = ____r416;
    var __body25 = cut(____id40, 0);
    if (atom63(__x32)) {
      return join(["%class", [__x32]], __body25);
    } else {
      return join(["%class", __x32], __body25);
    }
  });
  setenv37(".", "macro", (...args) => {
    var __args8 = unstash(args);
    if (none63(__args8)) {
      return ["this", ".constructor"];
    } else {
      if (one63(__args8)) {
        return join([".", "this", hd(__args8)], tl(__args8));
      } else {
        var ____id41 = __args8;
        var __name8 = ____id41[0];
        var __a4 = ____id41[1];
        var __bs4 = cut(____id41, 2);
        var __e39 = undefined;
        if (atom63(__a4)) {
          __e39 = ["quote", compile(__a4)];
        } else {
          var __e40 = undefined;
          if (eq(hd(__a4), "quote")) {
            __e40 = ["quote", compile(__a4[1])];
          } else {
            __e40 = __a4;
          }
          __e39 = __e40;
        }
        var __prop = __e39;
        var __expr1 = [__name8, ["brackets", __prop]];
        if (! atom63(__a4) && eq(hd(__a4), "quote") || stringLiteral63(__a4) || none63(__bs4)) {
          return __expr1;
        } else {
          return join([__expr1], __bs4);
        }
      }
    }
  });
  setenv37("try", "macro", (...body) => {
    var __body26 = unstash(body);
    var __e31 = unique("e");
    return join(["%condition-case", __e31, join(["do"], map((x) => {
      if (!( obj63(x) && (eq(hd(x), "catch") || eq(hd(x), "finally")))) {
        return x;
      }
    }, __body26))], map((x) => {
      if (obj63(x)) {
        if (eq(hd(x), "finally")) {
          return x;
        } else {
          if (eq(hd(x), "catch")) {
            var ____id42 = x;
            var ___ = ____id42[0];
            var __type = ____id42[1];
            var ___var = ____id42[2];
            var __body27 = cut(____id42, 3);
            return ["catch", __type, join(["let", [___var, __e31]], __body27)];
          }
        }
      }
    }, __body26));
  });
  setenv37("throw", "macro", (x) => {
    return ["%throw", x];
  });
  setenv37("brackets", "macro", (...args) => {
    var __args9 = unstash(args);
    return join(["%brackets"], __args9);
  });
  setenv37("braces", "macro", (...args) => {
    var __args10 = unstash(args);
    return join(["%braces"], __args10);
  });
  var __exports = {};
  var __self = __exports;
  var __module = {["exports"]: __exports};
  _G.currentNs("dax.compiler");
  var getenv = (k, p) => {
    var __e50 = undefined;
    if (sym63(k)) {
      __e50 = str(k);
    } else {
      __e50 = k;
    }
    var __k27 = __e50;
    if (string63(__k27)) {
      var __i32 = edge(_G.environment);
      while (__i32 >= 0) {
        var __b3 = _G.environment[__i32][__k27];
        if (is63(__b3)) {
          var __e51 = undefined;
          if (p) {
            __e51 = __b3[p];
          } else {
            __e51 = __b3;
          }
          return __e51;
        } else {
          __i32 = __i32 - 1;
        }
      }
    }
  };
  currentNs().intern("getenv").bindRoot(getenv, () => {
    return getenv;
  }, (x) => {
    getenv = x;
    return getenv;
  });
  _G.getenv = getenv;
  var macroFunction = (k) => {
    return getenv(k, "macro");
  };
  currentNs().intern("macro-function").bindRoot(macroFunction, () => {
    return macroFunction;
  }, (x) => {
    macroFunction = x;
    return macroFunction;
  });
  var macro63 = (k) => {
    return is63(macroFunction(k));
  };
  currentNs().intern("macro?").bindRoot(macro63, () => {
    return macro63;
  }, (x) => {
    macro63 = x;
    return macro63;
  });
  var special63 = (k) => {
    return is63(getenv(k, "special"));
  };
  currentNs().intern("special?").bindRoot(special63, () => {
    return special63;
  }, (x) => {
    special63 = x;
    return special63;
  });
  var specialForm63 = (form) => {
    return ! atom63(form) && special63(hd(form));
  };
  currentNs().intern("special-form?").bindRoot(specialForm63, () => {
    return specialForm63;
  }, (x) => {
    specialForm63 = x;
    return specialForm63;
  });
  var statement63 = (k) => {
    return special63(k) && getenv(k, "stmt");
  };
  currentNs().intern("statement?").bindRoot(statement63, () => {
    return statement63;
  }, (x) => {
    statement63 = x;
    return statement63;
  });
  var symbolExpansion = (k) => {
    return getenv(k, "symbol");
  };
  currentNs().intern("symbol-expansion").bindRoot(symbolExpansion, () => {
    return symbolExpansion;
  }, (x) => {
    symbolExpansion = x;
    return symbolExpansion;
  });
  var symbolMacro63 = (k) => {
    return is63(symbolExpansion(k));
  };
  currentNs().intern("symbol-macro?").bindRoot(symbolMacro63, () => {
    return symbolMacro63;
  }, (x) => {
    symbolMacro63 = x;
    return symbolMacro63;
  });
  var variable63 = (k) => {
    return is63(getenv(k, "variable"));
  };
  currentNs().intern("variable?").bindRoot(variable63, () => {
    return variable63;
  }, (x) => {
    variable63 = x;
    return variable63;
  });
  var bound63 = (x) => {
    return macro63(x) || special63(x) || symbolMacro63(x) || variable63(x);
  };
  currentNs().intern("bound?").bindRoot(bound63, () => {
    return bound63;
  }, (x) => {
    bound63 = x;
    return bound63;
  });
  _G.bound63 = bound63;
  var quoted = (form) => {
    if (sym63(form)) {
      return escape(str(form));
    } else {
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
    }
  };
  currentNs().intern("quoted").bindRoot(quoted, () => {
    return quoted;
  }, (x) => {
    quoted = x;
    return quoted;
  });
  _G.quoted = quoted;
  var literal = (s) => {
    if (stringLiteral63(s)) {
      return s;
    } else {
      return quoted(s);
    }
  };
  currentNs().intern("literal").bindRoot(literal, () => {
    return literal;
  }, (x) => {
    literal = x;
    return literal;
  });
  var stash42 = (args) => {
    if (keys63(args)) {
      var __l9 = ["%object", "\"_stash\"", true];
      var ____o18 = args;
      var __k28 = undefined;
      for (__k28 in ____o18) {
        var __v20 = ____o18[__k28];
        var __e52 = undefined;
        if (numeric63(__k28)) {
          __e52 = parseInt(__k28);
        } else {
          __e52 = __k28;
        }
        var __k29 = __e52;
        if (! number63(__k29)) {
          add(__l9, literal(__k29));
          add(__l9, __v20);
        }
      }
      return join(args, [__l9]);
    } else {
      return args;
    }
  };
  currentNs().intern("stash*").bindRoot(stash42, () => {
    return stash42;
  }, (x) => {
    stash42 = x;
    return stash42;
  });
  var bias = (k) => {
    return k;
  };
  currentNs().intern("bias").bindRoot(bias, () => {
    return bias;
  }, (x) => {
    bias = x;
    return bias;
  });
  var defaultAssignmentOp = "o";
  currentNs().intern("default-assignment-op").bindRoot(defaultAssignmentOp, () => {
    return defaultAssignmentOp;
  }, (x) => {
    defaultAssignmentOp = x;
    return defaultAssignmentOp;
  });
  var defaultAssignment63 = (x) => {
    return ! atom63(x) && eq(hd(x), defaultAssignmentOp);
  };
  currentNs().intern("default-assignment?").bindRoot(defaultAssignment63, () => {
    return defaultAssignment63;
  }, (x) => {
    defaultAssignment63 = x;
    return defaultAssignment63;
  });
  _G.defaultAssignment63 = defaultAssignment63;
  var bind = (lh, rh) => {
    if (atom63(lh)) {
      return [lh, rh];
    } else {
      if (defaultAssignment63(lh)) {
        return bind(lh[1], ["if", ["is?", rh], rh, lh[2]]);
      } else {
        var __id43 = unique("id");
        var __bs5 = [__id43, rh];
        var ____o19 = lh;
        var __k30 = undefined;
        for (__k30 in ____o19) {
          var __v21 = ____o19[__k30];
          var __e53 = undefined;
          if (numeric63(__k30)) {
            __e53 = parseInt(__k30);
          } else {
            __e53 = __k30;
          }
          var __k31 = __e53;
          var __e54 = undefined;
          if (eq(__k31, "rest")) {
            __e54 = ["cut", __id43, _35(lh)];
          } else {
            __e54 = [__id43, ["brackets", ["quote", __k31]]];
          }
          var __x33 = __e54;
          if (is63(__k31)) {
            var __e55 = undefined;
            if (__v21 === true) {
              __e55 = __k31;
            } else {
              __e55 = __v21;
            }
            var __k32 = __e55;
            __bs5 = join(__bs5, bind(__k32, __x33));
          }
        }
        return __bs5;
      }
    }
  };
  currentNs().intern("bind").bindRoot(bind, () => {
    return bind;
  }, (x) => {
    bind = x;
    return bind;
  });
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
      var __r471 = unique("r");
      var ____o20 = args;
      var __k33 = undefined;
      for (__k33 in ____o20) {
        var __v22 = ____o20[__k33];
        var __e56 = undefined;
        if (numeric63(__k33)) {
          __e56 = parseInt(__k33);
        } else {
          __e56 = __k33;
        }
        var __k34 = __e56;
        if (number63(__k34)) {
          if (atom63(__v22)) {
            add(__args12, __v22);
          } else {
            var __x34 = unique("x");
            add(__args12, __x34);
            __bs6 = join(__bs6, [__v22, __x34]);
          }
        }
      }
      if (keys63(args)) {
        __bs6 = join(__bs6, [__r471, rest(__r471)]);
        var __n28 = _35(__args12);
        var __i36 = 0;
        while (__i36 < __n28) {
          var __v23 = __args12[__i36];
          __bs6 = join(__bs6, [__v23, ["destash!", __v23, __r471]]);
          __i36 = __i36 + 1;
        }
        __bs6 = join(__bs6, [keys(args), __r471]);
      }
      return [__args12, join(["let", __bs6], body)];
    }
  };
  currentNs().intern("bind*").bindRoot(bind42, () => {
    return bind42;
  }, (x) => {
    bind42 = x;
    return bind42;
  });
  _G.bind42 = bind42;
  var quoting63 = (depth) => {
    return number63(depth);
  };
  currentNs().intern("quoting?").bindRoot(quoting63, () => {
    return quoting63;
  }, (x) => {
    quoting63 = x;
    return quoting63;
  });
  var quasiquoting63 = (depth) => {
    return quoting63(depth) && depth > 0;
  };
  currentNs().intern("quasiquoting?").bindRoot(quasiquoting63, () => {
    return quasiquoting63;
  }, (x) => {
    quasiquoting63 = x;
    return quasiquoting63;
  });
  var canUnquote63 = (depth) => {
    return quoting63(depth) && depth === 1;
  };
  currentNs().intern("can-unquote?").bindRoot(canUnquote63, () => {
    return canUnquote63;
  }, (x) => {
    canUnquote63 = x;
    return canUnquote63;
  });
  var quasisplice63 = (x, depth) => {
    return canUnquote63(depth) && ! atom63(x) && eq(hd(x), "unquote-splicing");
  };
  currentNs().intern("quasisplice?").bindRoot(quasisplice63, () => {
    return quasisplice63;
  }, (x) => {
    quasisplice63 = x;
    return quasisplice63;
  });
  var expandLocal = (__x35) => {
    var ____id44 = __x35;
    var __x36 = ____id44[0];
    var __name9 = ____id44[1];
    var __value = ____id44[2];
    setenv(__name9, {["_stash"]: true, ["variable"]: true});
    return [__x36, __name9, macroexpand(__value)];
  };
  currentNs().intern("expand-local").bindRoot(expandLocal, () => {
    return expandLocal;
  }, (x) => {
    expandLocal = x;
    return expandLocal;
  });
  var expandFunction = (__x37) => {
    var ____id45 = __x37;
    var __x38 = ____id45[0];
    var __args111 = ____id45[1];
    var __body28 = cut(____id45, 2);
    add(_G.environment, {});
    var ____o21 = __args111;
    var ____i37 = undefined;
    for (____i37 in ____o21) {
      var ____x39 = ____o21[____i37];
      var __e57 = undefined;
      if (numeric63(____i37)) {
        __e57 = parseInt(____i37);
      } else {
        __e57 = ____i37;
      }
      var ____i371 = __e57;
      if (defaultAssignment63(____x39)) {
        setenv(____x39[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x39, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x40 = join([__x38, __args111], macroexpand(__body28));
    drop(_G.environment);
    return ____x40;
  };
  currentNs().intern("expand-function").bindRoot(expandFunction, () => {
    return expandFunction;
  }, (x) => {
    expandFunction = x;
    return expandFunction;
  });
  var expandTable = (__x41) => {
    var ____id46 = __x41;
    var __x42 = ____id46[0];
    var __args121 = cut(____id46, 1);
    var __expr2 = join([__x42], keys(__args121));
    var ____x43 = __args121;
    var ____i38 = 0;
    while (____i38 < _35(____x43)) {
      var __x44 = ____x43[____i38];
      if (atom63(__x44)) {
        add(__expr2, [__x44, macroexpand(__x44)]);
      } else {
        if (_35(__x44) <= 2) {
          var ____id47 = __x44;
          var __name10 = ____id47[0];
          var __v24 = ____id47[1];
          add(__expr2, [macroexpand(__name10), macroexpand(__v24)]);
        } else {
          var ____id48 = __x44;
          var __prefix = ____id48[0];
          var __name11 = ____id48[1];
          var __args13 = ____id48[2];
          var __body29 = cut(____id48, 3);
          if (some63(__body29)) {
            var ____id49 = bind42(__args13, __body29);
            var __args131 = ____id49[0];
            var __body111 = ____id49[1];
            add(_G.environment, {});
            var ____o22 = __args131;
            var ____i39 = undefined;
            for (____i39 in ____o22) {
              var ____x45 = ____o22[____i39];
              var __e58 = undefined;
              if (numeric63(____i39)) {
                __e58 = parseInt(____i39);
              } else {
                __e58 = ____i39;
              }
              var ____i391 = __e58;
              if (defaultAssignment63(____x45)) {
                setenv(____x45[1], {["_stash"]: true, ["variable"]: true});
              } else {
                setenv(____x45, {["_stash"]: true, ["variable"]: true});
              }
            }
            var ____x46 = add(__expr2, [__prefix, macroexpand(__name11), __args131, macroexpand(__body111)]);
            drop(_G.environment);
            ____x46;
          } else {
            add(__expr2, [__prefix, macroexpand(__name11), macroexpand(__args13)]);
          }
        }
      }
      ____i38 = ____i38 + 1;
    }
    return __expr2;
  };
  currentNs().intern("expand-table").bindRoot(expandTable, () => {
    return expandTable;
  }, (x) => {
    expandTable = x;
    return expandTable;
  });
  var expandClass = (__x47) => {
    var ____id50 = __x47;
    var __x48 = ____id50[0];
    var __name12 = ____id50[1];
    var __body30 = cut(____id50, 2);
    return join([__x48, __name12], tl(expandTable(join(["%table"], __body30))));
  };
  currentNs().intern("expand-class").bindRoot(expandClass, () => {
    return expandClass;
  }, (x) => {
    expandClass = x;
    return expandClass;
  });
  var expandConditionCase = (__x49) => {
    var ____id51 = __x49;
    var __x50 = ____id51[0];
    var ___var1 = ____id51[1];
    var __form1 = ____id51[2];
    var __clauses1 = cut(____id51, 3);
    return join([__x50, ___var1, macroexpand(__form1)], map((__x51) => {
      var ____id52 = __x51;
      var __which = ____id52[0];
      var __body31 = cut(____id52, 1);
      if (eq(__which, "finally")) {
        return join([__which], map(macroexpand, __body31));
      } else {
        add(_G.environment, {});
        var ____o23 = [___var1];
        var ____i40 = undefined;
        for (____i40 in ____o23) {
          var ____x52 = ____o23[____i40];
          var __e59 = undefined;
          if (numeric63(____i40)) {
            __e59 = parseInt(____i40);
          } else {
            __e59 = ____i40;
          }
          var ____i401 = __e59;
          if (defaultAssignment63(____x52)) {
            setenv(____x52[1], {["_stash"]: true, ["variable"]: true});
          } else {
            setenv(____x52, {["_stash"]: true, ["variable"]: true});
          }
        }
        var ____x53 = join([__which], map(macroexpand, __body31));
        drop(_G.environment);
        return ____x53;
      }
    }, __clauses1));
  };
  currentNs().intern("expand-condition-case").bindRoot(expandConditionCase, () => {
    return expandConditionCase;
  }, (x) => {
    expandConditionCase = x;
    return expandConditionCase;
  });
  _G.expandConditionCase = expandConditionCase;
  var expandDefinition = (__x54) => {
    var ____id53 = __x54;
    var __x55 = ____id53[0];
    var __name13 = ____id53[1];
    var __args14 = ____id53[2];
    var __body32 = cut(____id53, 3);
    add(_G.environment, {});
    var ____o24 = __args14;
    var ____i41 = undefined;
    for (____i41 in ____o24) {
      var ____x56 = ____o24[____i41];
      var __e60 = undefined;
      if (numeric63(____i41)) {
        __e60 = parseInt(____i41);
      } else {
        __e60 = ____i41;
      }
      var ____i411 = __e60;
      if (defaultAssignment63(____x56)) {
        setenv(____x56[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x56, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x57 = join([__x55, __name13, __args14], macroexpand(__body32));
    drop(_G.environment);
    return ____x57;
  };
  currentNs().intern("expand-definition").bindRoot(expandDefinition, () => {
    return expandDefinition;
  }, (x) => {
    expandDefinition = x;
    return expandDefinition;
  });
  var expandMacro = (form) => {
    return macroexpand(expand1(form));
  };
  currentNs().intern("expand-macro").bindRoot(expandMacro, () => {
    return expandMacro;
  }, (x) => {
    expandMacro = x;
    return expandMacro;
  });
  var expand1 = (__x58) => {
    var ____id54 = __x58;
    var __name14 = ____id54[0];
    var __body33 = cut(____id54, 1);
    return _G.apply(macroFunction(__name14), __body33);
  };
  currentNs().intern("expand1").bindRoot(expand1, () => {
    return expand1;
  }, (x) => {
    expand1 = x;
    return expand1;
  });
  _G.expand1 = expand1;
  var macroexpand1 = (form) => {
    if (symbolMacro63(form)) {
      return macroexpand(symbolExpansion(form));
    } else {
      if (atom63(form)) {
        return form;
      } else {
        var __x59 = hd(form);
        if (eq(__x59, "%local")) {
          return expandLocal(form);
        } else {
          if (eq(__x59, "%function")) {
            return expandFunction(form);
          } else {
            if (eq(__x59, "%table")) {
              return expandTable(form);
            } else {
              if (eq(__x59, "%class")) {
                return expandClass(form);
              } else {
                if (eq(__x59, "%condition-case")) {
                  return expandConditionCase(form);
                } else {
                  if (eq(__x59, "%global-function")) {
                    return expandDefinition(form);
                  } else {
                    if (eq(__x59, "%local-function")) {
                      return expandDefinition(form);
                    } else {
                      if (macro63(__x59)) {
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
  currentNs().intern("macroexpand-1").bindRoot(macroexpand1, () => {
    return macroexpand1;
  }, (x) => {
    macroexpand1 = x;
    return macroexpand1;
  });
  _G.macroexpand1 = macroexpand1;
  var macroexpand = (form) => {
    var __l10 = macroexpand1(form);
    if (meta63(form)) {
      meta33(__l10, meta(form));
    }
    return __l10;
  };
  currentNs().intern("macroexpand").bindRoot(macroexpand, () => {
    return macroexpand;
  }, (x) => {
    macroexpand = x;
    return macroexpand;
  });
  _G.macroexpand = macroexpand;
  var quasiquoteList = (form, depth) => {
    var __xs13 = [["list"]];
    var ____o25 = form;
    var __k35 = undefined;
    for (__k35 in ____o25) {
      var __v25 = ____o25[__k35];
      var __e61 = undefined;
      if (numeric63(__k35)) {
        __e61 = parseInt(__k35);
      } else {
        __e61 = __k35;
      }
      var __k36 = __e61;
      if (! number63(__k36)) {
        var __e62 = undefined;
        if (quasisplice63(__v25, depth)) {
          __e62 = quasiexpand(__v25[1]);
        } else {
          __e62 = quasiexpand(__v25, depth);
        }
        var __v26 = __e62;
        last(__xs13)[__k36] = __v26;
      }
    }
    var ____x60 = form;
    var ____i43 = 0;
    while (____i43 < _35(____x60)) {
      var __x61 = ____x60[____i43];
      if (quasisplice63(__x61, depth)) {
        var __x62 = quasiexpand(__x61[1]);
        add(__xs13, __x62);
        add(__xs13, ["list"]);
      } else {
        add(last(__xs13), quasiexpand(__x61, depth));
      }
      ____i43 = ____i43 + 1;
    }
    var __pruned = keep((x) => {
      return _35(x) > 1 || ! eq(hd(x), "list") || keys63(x);
    }, __xs13);
    if (one63(__pruned)) {
      return hd(__pruned);
    } else {
      return join(["join"], __pruned);
    }
  };
  currentNs().intern("quasiquote-list").bindRoot(quasiquoteList, () => {
    return quasiquoteList;
  }, (x) => {
    quasiquoteList = x;
    return quasiquoteList;
  });
  var sym = (ns, name) => {
    if (is63(search(name, "."))) {
      return name;
    } else {
      if (ns) {
        return ns + "/" + name;
      } else {
        return name;
      }
    }
  };
  currentNs().intern("sym").bindRoot(sym, () => {
    return sym;
  }, (x) => {
    sym = x;
    return sym;
  });
  _G.sym = sym;
  var resolve = (form, __x63) => {
    var __e63 = undefined;
    if (is63(__x63)) {
      __e63 = __x63;
    } else {
      __e63 = _G.nsPrefix;
    }
    var __pre = __e63;
    if (stringLiteral63(form)) {
      return form;
    } else {
      if (accessor63(form)) {
        return form;
      } else {
        if (string63(form)) {
          return sym(__pre, form);
        } else {
          return form;
        }
      }
    }
  };
  currentNs().intern("resolve").bindRoot(resolve, () => {
    return resolve;
  }, (x) => {
    resolve = x;
    return resolve;
  });
  _G.resolve = resolve;
  var quasiexpand = (form, depth) => {
    if (quasiquoting63(depth)) {
      if (atom63(form)) {
        return ["quote", form];
      } else {
        if (canUnquote63(depth) && eq(hd(form), "unquote")) {
          return quasiexpand(form[1]);
        } else {
          if (eq(hd(form), "unquote") || eq(hd(form), "unquote-splicing")) {
            return quasiquoteList(form, depth - 1);
          } else {
            if (eq(hd(form), "quasiquote")) {
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
        if (eq(hd(form), "quote")) {
          return form;
        } else {
          if (eq(hd(form), "quasiquote")) {
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
  currentNs().intern("quasiexpand").bindRoot(quasiexpand, () => {
    return quasiexpand;
  }, (x) => {
    quasiexpand = x;
    return quasiexpand;
  });
  _G.quasiexpand = quasiexpand;
  var expandIf = (__x64) => {
    var ____id55 = __x64;
    var __a5 = ____id55[0];
    var __b4 = ____id55[1];
    var __c11 = cut(____id55, 2);
    if (is63(__b4)) {
      return [join(["%if", __a5, __b4], expandIf(__c11))];
    } else {
      if (is63(__a5)) {
        return [__a5];
      }
    }
  };
  currentNs().intern("expand-if").bindRoot(expandIf, () => {
    return expandIf;
  }, (x) => {
    expandIf = x;
    return expandIf;
  });
  _G.expandIf = expandIf;
  indentLevel = 0;
  currentNs().intern("indent-level").bindRoot(indentLevel, () => {
    return indentLevel;
  }, (x) => {
    indentLevel = x;
    return indentLevel;
  });
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
  currentNs().intern("indentation").bindRoot(indentation, () => {
    return indentation;
  }, (x) => {
    indentation = x;
    return indentation;
  });
  _G.indentation = indentation;
  var reserved = {["="]: true, ["=="]: true, ["+"]: true, ["-"]: true, ["%"]: true, ["*"]: true, ["/"]: true, ["<"]: true, [">"]: true, ["<="]: true, [">="]: true, ["break"]: true, ["case"]: true, ["catch"]: true, ["class"]: true, ["const"]: true, ["continue"]: true, ["debugger"]: true, ["default"]: true, ["delete"]: true, ["do"]: true, ["else"]: true, ["eval"]: true, ["export"]: true, ["extends"]: true, ["finally"]: true, ["for"]: true, ["function"]: true, ["if"]: true, ["import"]: true, ["in"]: true, ["instanceof"]: true, ["new"]: true, ["return"]: true, ["switch"]: true, ["throw"]: true, ["try"]: true, ["typeof"]: true, ["var"]: true, ["void"]: true, ["while"]: true, ["with"]: true};
  currentNs().intern("reserved").bindRoot(reserved, () => {
    return reserved;
  }, (x) => {
    reserved = x;
    return reserved;
  });
  var reserved63 = (x) => {
    return has63(reserved, x);
  };
  currentNs().intern("reserved?").bindRoot(reserved63, () => {
    return reserved63;
  }, (x) => {
    reserved63 = x;
    return reserved63;
  });
  _G.reserved63 = reserved63;
  var validCode63 = (n) => {
    return numberCode63(n) || n >= 65 && n <= 90 || n >= 97 && n <= 122 || n === 95;
  };
  currentNs().intern("valid-code?").bindRoot(validCode63, () => {
    return validCode63;
  }, (x) => {
    validCode63 = x;
    return validCode63;
  });
  var accessor63 = (x) => {
    return string63(x) && _35(x) > 1 && code(x, 0) === 46 && !( code(x, 1) === 46) || sym63(x) && accessor63(str(x)) || obj63(x) && eq(hd(x), "%brackets");
  };
  currentNs().intern("accessor?").bindRoot(accessor63, () => {
    return accessor63;
  }, (x) => {
    accessor63 = x;
    return accessor63;
  });
  _G.accessor63 = accessor63;
  camelCaseRegex = new RegExp("(?<=[a-z])[-](\\w|$)", "g");
  currentNs().intern("camel-case-regex").bindRoot(camelCaseRegex, () => {
    return camelCaseRegex;
  }, (x) => {
    camelCaseRegex = x;
    return camelCaseRegex;
  });
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
  currentNs().intern("camel-case").bindRoot(camelCase, () => {
    return camelCase;
  }, (x) => {
    camelCase = x;
    return camelCase;
  });
  _G.camelCase = camelCase;
  var fqn63 = (x) => {
    if (sym63(x)) {
      return x.fqn63();
    } else {
      var __id100 = string63(x) && ! stringLiteral63(x);
      var __e64 = undefined;
      if (__id100) {
        var __i45 = search(x, "/");
        __e64 = is63(__i45) && !( __i45 === edge(x));
      } else {
        __e64 = __id100;
      }
      return __e64;
    }
  };
  currentNs().intern("fqn?").bindRoot(fqn63, () => {
    return fqn63;
  }, (x) => {
    fqn63 = x;
    return fqn63;
  });
  _G.fqn63 = fqn63;
  var namespace = (x) => {
    if (nil63(x)) {
      return x;
    } else {
      if (has63(x).ns) {
        return x.ns;
      } else {
        if (fqn63(x)) {
          return clip(x, 0, search(x, "/"));
        }
      }
    }
  };
  currentNs().intern("namespace").bindRoot(namespace, () => {
    return namespace;
  }, (x) => {
    namespace = x;
    return namespace;
  });
  _G.namespace = namespace;
  var name = (x) => {
    if (nil63(x)) {
      return x;
    } else {
      if (has63(x, "name")) {
        return x.name;
      } else {
        if (fqn63(x)) {
          return clip(x, search(x, "/") + 1);
        } else {
          return x;
        }
      }
    }
  };
  currentNs().intern("name").bindRoot(name, () => {
    return name;
  }, (x) => {
    name = x;
    return name;
  });
  _G.name = name;
  var eq = (x, y) => {
    if (x && function63(x.eq)) {
      return x.eq(y);
    } else {
      if (fqn63(y)) {
        return x === y;
      } else {
        if (stringLiteral63(y)) {
          return x === y;
        } else {
          if (string63(y)) {
            return name(x) === y;
          } else {
            return x === y;
          }
        }
      }
    }
  };
  currentNs().intern("eq").bindRoot(eq, () => {
    return eq;
  }, (x) => {
    eq = x;
    return eq;
  });
  _G.eq = eq;
  var fqn = (id, x) => {
    if (eq(namespace(id), "js")) {
      return name(id);
    } else {
      return ["_G", ".Namespace", ".find", escape(namespace(id)), ".intern", escape(name(id)), [".deref", x]];
    }
  };
  currentNs().intern("fqn").bindRoot(fqn, () => {
    return fqn;
  }, (x) => {
    fqn = x;
    return fqn;
  });
  var id = (id, raw63) => {
    if (sym63(id)) {
      id = str(id);
    }
    if (fqn63(id)) {
      return "(" + compile(fqn(id)) + ")";
    } else {
      var __id56 = camelCase(id);
      var __e65 = undefined;
      if (! raw63 && numberCode63(code(__id56, 0))) {
        __e65 = "_";
      } else {
        __e65 = "";
      }
      var __id121 = __e65;
      var __i46 = 0;
      while (__i46 < _35(__id56)) {
        var __c2 = char(__id56, __i46);
        var __n34 = code(__c2);
        var __e66 = undefined;
        if (__c2 === "-" && !( __id56 === "-")) {
          __e66 = "_";
        } else {
          var __e67 = undefined;
          if (validCode63(__n34)) {
            __e67 = __c2;
          } else {
            var __e68 = undefined;
            if (__i46 === 0) {
              __e68 = "_" + __n34;
            } else {
              __e68 = __n34;
            }
            __e67 = __e68;
          }
          __e66 = __e67;
        }
        var __c12 = __e66;
        __id121 = __id121 + __c12;
        __i46 = __i46 + 1;
      }
      if (! raw63 && reserved63(__id121)) {
        return "_" + __id121;
      } else {
        return __id121;
      }
    }
  };
  currentNs().intern("id").bindRoot(id, () => {
    return id;
  }, (x) => {
    id = x;
    return id;
  });
  var validId63 = (x) => {
    if (sym63(x)) {
      return validId63(str(x));
    } else {
      return some63(x) && x === id(x);
    }
  };
  currentNs().intern("valid-id?").bindRoot(validId63, () => {
    return validId63;
  }, (x) => {
    validId63 = x;
    return validId63;
  });
  _G.validId63 = validId63;
  var __names3 = {};
  var unique = (x) => {
    if (sym63(x)) {
      x = str(x);
    }
    if (string63(x)) {
      var __x65 = id(x);
      if (__names3[__x65]) {
        var __i47 = __names3[__x65];
        __names3[__x65] = __names3[__x65] + 1;
        return unique(__x65 + __i47);
      } else {
        __names3[__x65] = 1;
        return "__" + __x65;
      }
    } else {
      return x;
    }
  };
  currentNs().intern("unique").bindRoot(unique, () => {
    return unique;
  }, (x) => {
    unique = x;
    return unique;
  });
  _G.unique = unique;
  var key = (k) => {
    if (sym63(k)) {
      k = str(k);
    }
    if (string63(k) && validId63(k)) {
      return k;
    } else {
      var __k111 = compile(k);
      if (string63(__k111) && char(__k111, 0) === "[") {
        return __k111;
      } else {
        if (stringLiteral63(k) || ! string63(k)) {
          return "[" + __k111 + "]";
        } else {
          return __k111;
        }
      }
    }
  };
  currentNs().intern("key").bindRoot(key, () => {
    return key;
  }, (x) => {
    key = x;
    return key;
  });
  _G.key = key;
  var mapo = (f, t) => {
    var __o26 = [];
    var ____o27 = t;
    var __k37 = undefined;
    for (__k37 in ____o27) {
      var __v27 = ____o27[__k37];
      var __e69 = undefined;
      if (numeric63(__k37)) {
        __e69 = parseInt(__k37);
      } else {
        __e69 = __k37;
      }
      var __k38 = __e69;
      var __x66 = f(__v27);
      if (is63(__x66)) {
        add(__o26, literal(__k38));
        add(__o26, __x66);
      }
    }
    return __o26;
  };
  currentNs().intern("mapo").bindRoot(mapo, () => {
    return mapo;
  }, (x) => {
    mapo = x;
    return mapo;
  });
  _G.mapo = mapo;
  var infix = [{["not"]: {["js"]: "!"}}, {["*"]: true, ["/"]: true, ["%"]: true}, {["cat"]: {["js"]: "+"}}, {["+"]: true, ["-"]: true}, {["<"]: true, [">"]: true, ["<="]: true, [">="]: true}, {["="]: {["js"]: "==="}, ["=="]: {["js"]: "=="}}, {["and"]: {["js"]: "&&"}}, {["or"]: {["js"]: "||"}}];
  currentNs().intern("infix").bindRoot(infix, () => {
    return infix;
  }, (x) => {
    infix = x;
    return infix;
  });
  var unary63 = (form) => {
    return two63(form) && in63(name(hd(form)), ["not", "-"]);
  };
  currentNs().intern("unary?").bindRoot(unary63, () => {
    return unary63;
  }, (x) => {
    unary63 = x;
    return unary63;
  });
  var index = (k) => {
    return k;
  };
  currentNs().intern("index").bindRoot(index, () => {
    return index;
  }, (x) => {
    index = x;
    return index;
  });
  var precedence = (form) => {
    if (!( atom63(form) || unary63(form))) {
      var ____o28 = infix;
      var __k39 = undefined;
      for (__k39 in ____o28) {
        var __v28 = ____o28[__k39];
        var __e70 = undefined;
        if (numeric63(__k39)) {
          __e70 = parseInt(__k39);
        } else {
          __e70 = __k39;
        }
        var __k40 = __e70;
        var __x67 = hd(form);
        if (__v28[__x67]) {
          return index(__k40);
        }
      }
    }
    return 0;
  };
  currentNs().intern("precedence").bindRoot(precedence, () => {
    return precedence;
  }, (x) => {
    precedence = x;
    return precedence;
  });
  var getop = (op) => {
    if (! string63(op)) {
      op = str(op);
    }
    return find((level) => {
      var __x68 = level[op];
      if (__x68 === true) {
        return op;
      } else {
        if (is63(__x68)) {
          return __x68.js;
        }
      }
    }, infix);
  };
  currentNs().intern("getop").bindRoot(getop, () => {
    return getop;
  }, (x) => {
    getop = x;
    return getop;
  });
  var infix63 = (x) => {
    return is63(getop(x));
  };
  currentNs().intern("infix?").bindRoot(infix63, () => {
    return infix63;
  }, (x) => {
    infix63 = x;
    return infix63;
  });
  var infixOperator63 = (x) => {
    return obj63(x) && infix63(hd(x));
  };
  currentNs().intern("infix-operator?").bindRoot(infixOperator63, () => {
    return infixOperator63;
  }, (x) => {
    infixOperator63 = x;
    return infixOperator63;
  });
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
  currentNs().intern("compile-next").bindRoot(compileNext, () => {
    return compileNext;
  }, (x) => {
    compileNext = x;
    return compileNext;
  });
  _G.compileNext = compileNext;
  var compileArgs = (args, call63) => {
    var __a6 = hd(args);
    if (accessor63(__a6)) {
      return compileNext(compile(__a6), tl(args), call63);
    } else {
      if (obj63(__a6) && accessor63(hd(__a6))) {
        var ____id57 = __a6;
        var __x69 = ____id57[0];
        var __ys = cut(____id57, 1);
        var __s3 = compileNext(compile(__x69), __ys, true);
        return compileNext(__s3, tl(args), call63);
      } else {
        var __s4 = "";
        var __c3 = "";
        var __i50 = 0;
        while (__i50 < _35(args)) {
          var __x70 = args[__i50];
          if (defaultAssignment63(__x70)) {
            var ____id58 = __x70;
            var ___1 = ____id58[0];
            var __x111 = ____id58[1];
            var __val2 = ____id58[2];
            __s4 = __s4 + __c3 + compile(__x111) + " = " + compile(__val2);
          } else {
            if (accessor63(__x70) || obj63(__x70) && accessor63(hd(__x70))) {
              return compileNext("(" + __s4 + ")", cut(args, __i50), call63);
            } else {
              __s4 = __s4 + __c3 + compile(__x70);
            }
          }
          __c3 = ", ";
          __i50 = __i50 + 1;
        }
        if (args.rest) {
          __s4 = __s4 + __c3 + "..." + compile(args.rest);
        }
        return "(" + __s4 + ")";
      }
    }
  };
  currentNs().intern("compile-args").bindRoot(compileArgs, () => {
    return compileArgs;
  }, (x) => {
    compileArgs = x;
    return compileArgs;
  });
  _G.compileArgs = compileArgs;
  var escapeNewlines = (s) => {
    var __s12 = "";
    var __i51 = 0;
    while (__i51 < _35(s)) {
      var __c4 = char(s, __i51);
      var __e71 = undefined;
      if (__c4 === "\n") {
        __e71 = "\\n";
      } else {
        var __e72 = undefined;
        if (__c4 === "\r") {
          __e72 = "";
        } else {
          __e72 = __c4;
        }
        __e71 = __e72;
      }
      __s12 = __s12 + __e71;
      __i51 = __i51 + 1;
    }
    return __s12;
  };
  currentNs().intern("escape-newlines").bindRoot(escapeNewlines, () => {
    return escapeNewlines;
  }, (x) => {
    escapeNewlines = x;
    return escapeNewlines;
  });
  var accessor = (x) => {
    if (sym63(x)) {
      x = str(x);
    }
    var __prop1 = compileAtom(clip(x, 1), true);
    if (validId63(__prop1)) {
      return "." + __prop1;
    } else {
      return "[" + escape(__prop1) + "]";
    }
  };
  currentNs().intern("accessor").bindRoot(accessor, () => {
    return accessor;
  }, (x) => {
    accessor = x;
    return accessor;
  });
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
                        if (x.compile) {
                          return x.compile(raw63);
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
    }
  };
  currentNs().intern("compile-atom").bindRoot(compileAtom, () => {
    return compileAtom;
  }, (x) => {
    compileAtom = x;
    return compileAtom;
  });
  var terminator = (stmt63) => {
    if (! stmt63) {
      return "";
    } else {
      return ";\n";
    }
  };
  currentNs().intern("terminator").bindRoot(terminator, () => {
    return terminator;
  }, (x) => {
    terminator = x;
    return terminator;
  });
  var compileSpecial = (form, stmt63) => {
    var ____id59 = form;
    var __x71 = ____id59[0];
    var __args15 = cut(____id59, 1);
    var ____id60 = getenv(__x71);
    var __special = ____id60["special"];
    var __stmt = ____id60["stmt"];
    var __selfTr63 = ____id60["tr"];
    var __tr = terminator(stmt63 && ! __selfTr63);
    return _G.apply(__special, __args15) + __tr;
  };
  currentNs().intern("compile-special").bindRoot(compileSpecial, () => {
    return compileSpecial;
  }, (x) => {
    compileSpecial = x;
    return compileSpecial;
  });
  var parenthesizeCall63 = (x) => {
    return ! atom63(x) && eq(hd(x), "%function") || precedence(x) > 0;
  };
  currentNs().intern("parenthesize-call?").bindRoot(parenthesizeCall63, () => {
    return parenthesizeCall63;
  }, (x) => {
    parenthesizeCall63 = x;
    return parenthesizeCall63;
  });
  var compileCall = (f, args, parens63) => {
    var __f11 = compile(f);
    var __args141 = compileArgs(stash42(args));
    if (parens63 || parenthesizeCall63(f)) {
      return "(" + __f11 + ")" + __args141;
    } else {
      return __f11 + __args141;
    }
  };
  currentNs().intern("compile-call").bindRoot(compileCall, () => {
    return compileCall;
  }, (x) => {
    compileCall = x;
    return compileCall;
  });
  _G.compileCall = compileCall;
  var opDelims = (parent, child, ...__r634) => {
    var ____r634 = unstash(__r634);
    var __parent = destash33(parent, ____r634);
    var __child = destash33(child, ____r634);
    var ____id61 = ____r634;
    var __right = ____id61["right"];
    var __e73 = undefined;
    if (__right) {
      __e73 = _6261;
    } else {
      __e73 = _62;
    }
    if (__e73(precedence(__child), precedence(__parent))) {
      return ["(", ")"];
    } else {
      return ["", ""];
    }
  };
  currentNs().intern("op-delims").bindRoot(opDelims, () => {
    return opDelims;
  }, (x) => {
    opDelims = x;
    return opDelims;
  });
  var compileInfix = (form) => {
    var ____id62 = form;
    var __op = ____id62[0];
    var ____id63 = cut(____id62, 1);
    var __a7 = ____id63[0];
    var __b5 = ____id63[1];
    var ____id64 = opDelims(form, __a7);
    var __ao = ____id64[0];
    var __ac = ____id64[1];
    var ____id65 = opDelims(form, __b5, {["_stash"]: true, ["right"]: true});
    var __bo = ____id65[0];
    var __bc = ____id65[1];
    var __a8 = compile(__a7);
    var __b6 = compile(__b5);
    var __op1 = getop(__op);
    if (unary63(form)) {
      return __op1 + __ao + " " + __a8 + __ac;
    } else {
      return __ao + __a8 + __ac + " " + __op1 + " " + __bo + __b6 + __bc;
    }
  };
  currentNs().intern("compile-infix").bindRoot(compileInfix, () => {
    return compileInfix;
  }, (x) => {
    compileInfix = x;
    return compileInfix;
  });
  var compileFunction = (args, body, ...__r640) => {
    var ____r640 = unstash(__r640);
    var __args16 = destash33(args, ____r640);
    var __body34 = destash33(body, ____r640);
    var ____id66 = ____r640;
    var __name15 = ____id66["name"];
    var __prefix1 = ____id66["prefix"];
    var __infix = ____id66["infix"];
    var __tr1 = ____id66["tr"];
    var __id67 = either(__name15, "");
    var __args17 = compileArgs(__args16);
    indentLevel = indentLevel + 1;
    var ____x72 = compile(__body34, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body35 = ____x72;
    var __ind = indentation();
    var __e74 = undefined;
    if (__infix) {
      __e74 = " " + __infix;
    } else {
      __e74 = "";
    }
    var __mid = __e74;
    var __e75 = undefined;
    if (__prefix1) {
      __e75 = __prefix1 + " ";
    } else {
      __e75 = "";
    }
    var __p2 = __e75;
    var __tr2 = either(__tr1, "");
    return __p2 + __id67 + __args17 + __mid + " {\n" + __body35 + __ind + "}" + __tr2;
  };
  currentNs().intern("compile-function").bindRoot(compileFunction, () => {
    return compileFunction;
  }, (x) => {
    compileFunction = x;
    return compileFunction;
  });
  _G.compileFunction = compileFunction;
  var canReturn63 = (form) => {
    return is63(form) && (atom63(form) || ! eq(hd(form), "return") && ! statement63(hd(form)));
  };
  currentNs().intern("can-return?").bindRoot(canReturn63, () => {
    return canReturn63;
  }, (x) => {
    canReturn63 = x;
    return canReturn63;
  });
  var compile = (form, ...__r646) => {
    var ____r646 = unstash(__r646);
    var __form2 = destash33(form, ____r646);
    var ____id68 = ____r646;
    var __stmt1 = ____id68["stmt"];
    if (nil63(__form2)) {
      return "";
    } else {
      if (specialForm63(__form2)) {
        return compileSpecial(__form2, __stmt1);
      } else {
        var __tr3 = terminator(__stmt1);
        var __e76 = undefined;
        if (__stmt1) {
          __e76 = indentation();
        } else {
          __e76 = "";
        }
        var __ind1 = __e76;
        var __e77 = undefined;
        if (atom63(__form2)) {
          __e77 = compileAtom(__form2);
        } else {
          var __e78 = undefined;
          if (infix63(hd(__form2))) {
            __e78 = compileInfix(__form2);
          } else {
            __e78 = compileCall(hd(__form2), tl(__form2));
          }
          __e77 = __e78;
        }
        var __form3 = __e77;
        return __ind1 + __form3 + __tr3;
      }
    }
  };
  currentNs().intern("compile").bindRoot(compile, () => {
    return compile;
  }, (x) => {
    compile = x;
    return compile;
  });
  _G.compile = compile;
  var lowerStatement = (form, tail63) => {
    var __hoist = [];
    var __e41 = lower(form, __hoist, true, tail63);
    var __e79 = undefined;
    if (some63(__hoist) && is63(__e41)) {
      __e79 = join(["do"], __hoist, [__e41]);
    } else {
      var __e80 = undefined;
      if (is63(__e41)) {
        __e80 = __e41;
      } else {
        var __e81 = undefined;
        if (_35(__hoist) > 1) {
          __e81 = join(["do"], __hoist);
        } else {
          __e81 = hd(__hoist);
        }
        __e80 = __e81;
      }
      __e79 = __e80;
    }
    return either(__e79, ["do"]);
  };
  currentNs().intern("lower-statement").bindRoot(lowerStatement, () => {
    return lowerStatement;
  }, (x) => {
    lowerStatement = x;
    return lowerStatement;
  });
  var lowerBody = (body, tail63) => {
    return lowerStatement(join(["do"], body), tail63);
  };
  currentNs().intern("lower-body").bindRoot(lowerBody, () => {
    return lowerBody;
  }, (x) => {
    lowerBody = x;
    return lowerBody;
  });
  var literal63 = (form) => {
    return atom63(form) || eq(hd(form), "%array") || eq(hd(form), "%object") || eq(hd(form), "%table");
  };
  currentNs().intern("literal?").bindRoot(literal63, () => {
    return literal63;
  }, (x) => {
    literal63 = x;
    return literal63;
  });
  var standalone63 = (form) => {
    return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && ! eq("get", hd(form)) && ! eq("%statement", hd(form)) && !( two63(form) && accessor63(form[1])) || idLiteral63(form);
  };
  currentNs().intern("standalone?").bindRoot(standalone63, () => {
    return standalone63;
  }, (x) => {
    standalone63 = x;
    return standalone63;
  });
  var lowerDo = (args, hoist, stmt63, tail63) => {
    var ____x73 = almost(args);
    var ____i52 = 0;
    while (____i52 < _35(____x73)) {
      var __x74 = ____x73[____i52];
      var ____y5 = lower(__x74, hoist, stmt63);
      if (yes(____y5)) {
        var __e42 = ____y5;
        if (standalone63(__e42)) {
          add(hoist, __e42);
        }
      }
      ____i52 = ____i52 + 1;
    }
    var __e43 = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && canReturn63(__e43)) {
      return ["return", __e43];
    } else {
      return __e43;
    }
  };
  currentNs().intern("lower-do").bindRoot(lowerDo, () => {
    return lowerDo;
  }, (x) => {
    lowerDo = x;
    return lowerDo;
  });
  var lowerSet = (args, hoist, stmt63, tail63) => {
    var ____id69 = args;
    var __lh2 = ____id69[0];
    var __rh2 = ____id69[1];
    var __lh11 = lower(__lh2, hoist);
    var __rh11 = lower(__rh2, hoist);
    add(hoist, ["%set", __lh11, __rh11]);
    if (!( stmt63 && ! tail63)) {
      return __lh11;
    }
  };
  currentNs().intern("lower-set").bindRoot(lowerSet, () => {
    return lowerSet;
  }, (x) => {
    lowerSet = x;
    return lowerSet;
  });
  var lowerIf = (args, hoist, stmt63, tail63) => {
    var ____id70 = args;
    var __cond2 = ____id70[0];
    var __then = ____id70[1];
    var ___else = ____id70[2];
    if (stmt63) {
      var __e83 = undefined;
      if (is63(___else)) {
        __e83 = [lowerBody([___else], tail63)];
      }
      return add(hoist, join(["%if", lower(__cond2, hoist), lowerBody([__then], tail63)], __e83));
    } else {
      var __e44 = unique("e");
      add(hoist, ["%local", __e44, "nil"]);
      var __e82 = undefined;
      if (is63(___else)) {
        __e82 = [lower(["%set", __e44, ___else])];
      }
      add(hoist, join(["%if", lower(__cond2, hoist), lower(["%set", __e44, __then])], __e82));
      return __e44;
    }
  };
  currentNs().intern("lower-if").bindRoot(lowerIf, () => {
    return lowerIf;
  }, (x) => {
    lowerIf = x;
    return lowerIf;
  });
  var lowerShort = (x, args, hoist) => {
    var ____id71 = args;
    var __a9 = ____id71[0];
    var __b7 = ____id71[1];
    var __hoist1 = [];
    var __b11 = lower(__b7, __hoist1);
    if (some63(__hoist1)) {
      var __id72 = unique("id");
      var __e84 = undefined;
      if (eq(x, "and")) {
        __e84 = ["%if", __id72, __b7, __id72];
      } else {
        __e84 = ["%if", __id72, __id72, __b7];
      }
      return lower(["do", ["%local", __id72, __a9], __e84], hoist);
    } else {
      return [x, lower(__a9, hoist), __b11];
    }
  };
  currentNs().intern("lower-short").bindRoot(lowerShort, () => {
    return lowerShort;
  }, (x) => {
    lowerShort = x;
    return lowerShort;
  });
  var lowerTry = (args, hoist, tail63) => {
    return add(hoist, ["%try", lowerBody(args, tail63)]);
  };
  currentNs().intern("lower-try").bindRoot(lowerTry, () => {
    return lowerTry;
  }, (x) => {
    lowerTry = x;
    return lowerTry;
  });
  var lowerConditionCase = (__x75, hoist, stmt63, tail63) => {
    var ____id73 = __x75;
    var ___var2 = ____id73[0];
    var __form4 = ____id73[1];
    var __clauses2 = cut(____id73, 2);
    if (stmt63) {
      return add(hoist, join(["%condition-case", ___var2, lowerBody(["do", __form4], tail63)], map((__x76) => {
        var ____id74 = __x76;
        var __which1 = ____id74[0];
        var __body36 = cut(____id74, 1);
        if (eq(__which1, "finally")) {
          return [__which1, lowerBody(__body36)];
        } else {
          var ____id75 = __body36;
          var __x77 = ____id75[0];
          var __args18 = cut(____id75, 1);
          return [__which1, lower(__x77), lowerBody(__args18, tail63)];
        }
      }, __clauses2)));
    } else {
      var __e45 = unique("e");
      add(hoist, ["%local", __e45]);
      add(hoist, join(["%condition-case", ___var2, lower(["%set", __e45, __form4])], map((__x78) => {
        var ____id76 = __x78;
        var __which2 = ____id76[0];
        var __body37 = cut(____id76, 1);
        if (eq(__which2, "finally")) {
          return [__which2, lowerBody(__body37)];
        } else {
          var ____id77 = __body37;
          var __x79 = ____id77[0];
          var __args19 = cut(____id77, 1);
          return [__which2, lower(__x79), lower(["%set", __e45, join(["do"], __args19)])];
        }
      }, __clauses2)));
      return __e45;
    }
  };
  currentNs().intern("lower-condition-case").bindRoot(lowerConditionCase, () => {
    return lowerConditionCase;
  }, (x) => {
    lowerConditionCase = x;
    return lowerConditionCase;
  });
  _G.lowerConditionCase = lowerConditionCase;
  var lowerWhile = (args, hoist) => {
    var ____id78 = args;
    var __c5 = ____id78[0];
    var __body38 = cut(____id78, 1);
    var __pre1 = [];
    var __c6 = lower(__c5, __pre1);
    var __e85 = undefined;
    if (none63(__pre1)) {
      __e85 = ["while", __c6, lowerBody(__body38)];
    } else {
      __e85 = ["while", true, join(["do"], __pre1, [["%if", ["not", __c6], ["break"]], lowerBody(__body38)])];
    }
    return add(hoist, __e85);
  };
  currentNs().intern("lower-while").bindRoot(lowerWhile, () => {
    return lowerWhile;
  }, (x) => {
    lowerWhile = x;
    return lowerWhile;
  });
  var lowerFor = (args, hoist) => {
    var ____id79 = args;
    var __t4 = ____id79[0];
    var __k41 = ____id79[1];
    var __body39 = cut(____id79, 2);
    return add(hoist, ["%for", lower(__t4, hoist), __k41, lowerBody(__body39)]);
  };
  currentNs().intern("lower-for").bindRoot(lowerFor, () => {
    return lowerFor;
  }, (x) => {
    lowerFor = x;
    return lowerFor;
  });
  var lowerTable = (args, hoist, stmt63, tail63) => {
    var __expr3 = join(["%table"], keys(args));
    var ____x80 = args;
    var ____i53 = 0;
    while (____i53 < _35(____x80)) {
      var __x81 = ____x80[____i53];
      if (atom63(__x81)) {
        add(__expr3, __x81);
      } else {
        if (_35(__x81) <= 2) {
          var ____id80 = __x81;
          var __name16 = ____id80[0];
          var __v29 = ____id80[1];
          add(__expr3, [lower(__name16, hoist), lower(__v29, hoist)]);
        } else {
          var ____id81 = __x81;
          var __prefix2 = ____id81[0];
          var __name17 = ____id81[1];
          var __args20 = ____id81[2];
          var __body40 = cut(____id81, 3);
          if (some63(__body40)) {
            add(__expr3, [__prefix2, lower(__name17, hoist), __args20, lowerBody(__body40, true)]);
          } else {
            add(__expr3, [__prefix2, lower(__name17, hoist), lower(__args20, hoist)]);
          }
        }
      }
      ____i53 = ____i53 + 1;
    }
    return __expr3;
  };
  currentNs().intern("lower-table").bindRoot(lowerTable, () => {
    return lowerTable;
  }, (x) => {
    lowerTable = x;
    return lowerTable;
  });
  _G.lowerTable = lowerTable;
  var lowerClass = (__x82, hoist, stmt63, tail63) => {
    var ____id82 = __x82;
    var __x83 = ____id82[0];
    var __body41 = cut(____id82, 1);
    var __body42 = tl(lowerTable(__body41, hoist));
    var ____id83 = __x83;
    var __name18 = ____id83[0];
    var __parent1 = ____id83[1];
    var __parent11 = lower(__parent1, hoist);
    var __expr4 = join(["%class", [__name18, __parent11]], __body42);
    if (stmt63 && ! tail63) {
      return add(hoist, ["%local", __name18, __expr4]);
    } else {
      return __expr4;
    }
  };
  currentNs().intern("lower-class").bindRoot(lowerClass, () => {
    return lowerClass;
  }, (x) => {
    lowerClass = x;
    return lowerClass;
  });
  _G.lowerClass = lowerClass;
  var lowerFunction = (args) => {
    var ____id84 = args;
    var __a10 = ____id84[0];
    var __body43 = cut(____id84, 1);
    return join(["%function", __a10, lowerBody(__body43, true)], keys(args));
  };
  currentNs().intern("lower-function").bindRoot(lowerFunction, () => {
    return lowerFunction;
  }, (x) => {
    lowerFunction = x;
    return lowerFunction;
  });
  var lowerDefinition = (kind, args, hoist) => {
    var ____id85 = args;
    var __name19 = ____id85[0];
    var __args21 = ____id85[1];
    var __body44 = cut(____id85, 2);
    return add(hoist, [kind, __name19, __args21, lowerBody(__body44, true)]);
  };
  currentNs().intern("lower-definition").bindRoot(lowerDefinition, () => {
    return lowerDefinition;
  }, (x) => {
    lowerDefinition = x;
    return lowerDefinition;
  });
  var lowerCall = (form, hoist) => {
    var __form5 = map((x) => {
      return lower(x, hoist);
    }, form);
    if (some63(__form5)) {
      return __form5;
    }
  };
  currentNs().intern("lower-call").bindRoot(lowerCall, () => {
    return lowerCall;
  }, (x) => {
    lowerCall = x;
    return lowerCall;
  });
  var pairwise63 = (form) => {
    return in63(name(hd(form)), ["<", "<=", "=", ">=", ">"]);
  };
  currentNs().intern("pairwise?").bindRoot(pairwise63, () => {
    return pairwise63;
  }, (x) => {
    pairwise63 = x;
    return pairwise63;
  });
  var lowerPairwise = (form) => {
    if (pairwise63(form)) {
      var __e46 = [];
      var ____id86 = form;
      var __x84 = ____id86[0];
      var __args22 = cut(____id86, 1);
      reduce((a, b) => {
        add(__e46, [__x84, a, b]);
        return a;
      }, __args22);
      return join(["and"], reverse(__e46));
    } else {
      return form;
    }
  };
  currentNs().intern("lower-pairwise").bindRoot(lowerPairwise, () => {
    return lowerPairwise;
  }, (x) => {
    lowerPairwise = x;
    return lowerPairwise;
  });
  var lowerInfix63 = (form) => {
    return infix63(hd(form)) && _35(form) > 3;
  };
  currentNs().intern("lower-infix?").bindRoot(lowerInfix63, () => {
    return lowerInfix63;
  }, (x) => {
    lowerInfix63 = x;
    return lowerInfix63;
  });
  var lowerInfix = (form, hoist) => {
    var __form6 = lowerPairwise(form);
    var ____id87 = __form6;
    var __x85 = ____id87[0];
    var __args23 = cut(____id87, 1);
    return lower(reduce((a, b) => {
      return [__x85, b, a];
    }, reverse(__args23)), hoist);
  };
  currentNs().intern("lower-infix").bindRoot(lowerInfix, () => {
    return lowerInfix;
  }, (x) => {
    lowerInfix = x;
    return lowerInfix;
  });
  var lowerSpecial = (__x86, hoist) => {
    var ____id88 = __x86;
    var __name20 = ____id88[0];
    var __args24 = cut(____id88, 1);
    var __args151 = map((x) => {
      return lower(x, hoist);
    }, __args24);
    var __form7 = join([__name20], __args151);
    return add(hoist, __form7);
  };
  currentNs().intern("lower-special").bindRoot(lowerSpecial, () => {
    return lowerSpecial;
  }, (x) => {
    lowerSpecial = x;
    return lowerSpecial;
  });
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
            var ____id89 = form;
            var __x87 = ____id89[0];
            var __args25 = cut(____id89, 1);
            if (eq(__x87, "do")) {
              return lowerDo(__args25, hoist, stmt63, tail63);
            } else {
              if (eq(__x87, "%call")) {
                return lower(__args25, hoist, stmt63, tail63);
              } else {
                if (eq(__x87, "%set")) {
                  return lowerSet(__args25, hoist, stmt63, tail63);
                } else {
                  if (eq(__x87, "%if")) {
                    return lowerIf(__args25, hoist, stmt63, tail63);
                  } else {
                    if (eq(__x87, "%try")) {
                      return lowerTry(__args25, hoist, tail63);
                    } else {
                      if (eq(__x87, "%condition-case")) {
                        return lowerConditionCase(__args25, hoist, stmt63, tail63);
                      } else {
                        if (eq(__x87, "while")) {
                          return lowerWhile(__args25, hoist);
                        } else {
                          if (eq(__x87, "%for")) {
                            return lowerFor(__args25, hoist);
                          } else {
                            if (eq(__x87, "%table")) {
                              return lowerTable(__args25, hoist, stmt63, tail63);
                            } else {
                              if (eq(__x87, "%class")) {
                                return lowerClass(__args25, hoist, stmt63, tail63);
                              } else {
                                if (eq(__x87, "%function")) {
                                  return lowerFunction(__args25);
                                } else {
                                  if (eq(__x87, "%local-function") || eq(__x87, "%global-function")) {
                                    return lowerDefinition(__x87, __args25, hoist);
                                  } else {
                                    if (in63(name(__x87), ["and", "or"])) {
                                      return lowerShort(__x87, __args25, hoist);
                                    } else {
                                      if (statement63(__x87)) {
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
  currentNs().intern("lower").bindRoot(lower, () => {
    return lower;
  }, (x) => {
    lower = x;
    return lower;
  });
  _G.lower = lower;
  var expand = (form) => {
    return lower(macroexpand(form));
  };
  currentNs().intern("expand").bindRoot(expand, () => {
    return expand;
  }, (x) => {
    expand = x;
    return expand;
  });
  _G.expand = expand;
  var vm = require("vm");
  currentNs().intern("vm").bindRoot(vm, () => {
    return vm;
  }, (x) => {
    vm = x;
    return vm;
  });
  var context = (ctx) => {
    var __sandbox = vm.createContext(ctx);
    __sandbox._G = __sandbox;
    return __sandbox;
  };
  currentNs().intern("context").bindRoot(context, () => {
    return context;
  }, (x) => {
    context = x;
    return context;
  });
  var sandbox = context(_G);
  currentNs().intern("sandbox").bindRoot(sandbox, () => {
    return sandbox;
  }, (x) => {
    sandbox = x;
    return sandbox;
  });
  var run = (code, sandbox) => {
    return vm.runInContext(code, sandbox || _G);
  };
  currentNs().intern("run").bindRoot(run, () => {
    return run;
  }, (x) => {
    run = x;
    return run;
  });
  var _eval = (form) => {
    var __code = compile(expand(["%set", "%result", form]));
    return run(__code);
  };
  currentNs().intern("eval").bindRoot(_eval, () => {
    return _eval;
  }, (x) => {
    _eval = x;
    return _eval;
  });
  _G["eval"] = _eval;
  var immediateCall63 = (x) => {
    return obj63(x) && obj63(hd(x)) && eq(hd(hd(x)), "%function");
  };
  currentNs().intern("immediate-call?").bindRoot(immediateCall63, () => {
    return immediateCall63;
  }, (x) => {
    immediateCall63 = x;
    return immediateCall63;
  });
  _G.immediateCall63 = immediateCall63;
  setenv37("%call", "special", (f, ...__r743) => {
    var ____r743 = unstash(__r743);
    var __f2 = destash33(f, ____r743);
    var ____id90 = ____r743;
    var __args26 = cut(____id90, 0);
    return compileCall(__f2, __args26);
  });
  setenv37("%brackets", "special", (...args) => {
    var __args27 = unstash(args);
    return "[" + inner(compileArgs(__args27)) + "]";
  });
  setenv37("do", "special", (...forms) => {
    var __forms = unstash(forms);
    var __s5 = "";
    var ____x88 = __forms;
    var ____i54 = 0;
    while (____i54 < _35(____x88)) {
      var __x89 = ____x88[____i54];
      __s5 = __s5 + compile(__x89, {["_stash"]: true, ["stmt"]: true});
      if (! atom63(__x89)) {
        if (eq(hd(__x89), "return") || eq(hd(__x89), "break")) {
          break;
        }
      }
      ____i54 = ____i54 + 1;
    }
    return __s5;
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%if", "special", (cond, cons, alt) => {
    var __cond3 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x90 = compile(cons, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __cons = ____x90;
    var __e86 = undefined;
    if (alt) {
      indentLevel = indentLevel + 1;
      var ____x91 = compile(alt, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      __e86 = ____x91;
    }
    var __alt = __e86;
    var __ind2 = indentation();
    var __s6 = "";
    __s6 = __s6 + __ind2 + "if (" + __cond3 + ") {\n" + __cons + __ind2 + "}";
    if (__alt) {
      __s6 = __s6 + " else {\n" + __alt + __ind2 + "}";
    }
    return __s6 + "\n";
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("while", "special", (cond, form) => {
    var __cond4 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x92 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body45 = ____x92;
    var __ind3 = indentation();
    return __ind3 + "while (" + __cond4 + ") {\n" + __body45 + __ind3 + "}\n";
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%for", "special", (t, k, form) => {
    var __t5 = compile(t);
    var __ind4 = indentation();
    indentLevel = indentLevel + 1;
    var ____x93 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body46 = ____x93;
    return __ind4 + "for (" + k + " in " + __t5 + ") {\n" + __body46 + __ind4 + "}\n";
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%try", "special", (form) => {
    var __e47 = unique("e");
    var __ind5 = indentation();
    indentLevel = indentLevel + 1;
    var ____x94 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body47 = ____x94;
    var __hf = ["return", ["%array", false, __e47]];
    indentLevel = indentLevel + 1;
    var ____x95 = compile(__hf, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __h = ____x95;
    return __ind5 + "try {\n" + __body47 + __ind5 + "}\n" + __ind5 + "catch (" + __e47 + ") {\n" + __h + __ind5 + "}\n";
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%condition-case", "special", (e, form, ...__r748) => {
    var ____r748 = unstash(__r748);
    var __e48 = destash33(e, ____r748);
    var __form8 = destash33(form, ____r748);
    var ____id91 = ____r748;
    var __clauses3 = cut(____id91, 0);
    var __ind6 = indentation();
    indentLevel = indentLevel + 1;
    var ____x96 = compile(__form8, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body48 = ____x96;
    var __str = __ind6 + "try {\n" + __body48 + __ind6 + "}";
    var __form9 = [];
    var ____x97 = __clauses3;
    var ____i55 = 0;
    while (____i55 < _35(____x97)) {
      var __x98 = ____x97[____i55];
      if (eq(hd(__x98), "catch")) {
        var ____id92 = __x98;
        var ___2 = ____id92[0];
        var __type1 = ____id92[1];
        var __body49 = ____id92[2];
        var __e87 = undefined;
        if (boolean63(__type1)) {
          __e87 = __type1;
        } else {
          __e87 = ["instanceof", __e48, __type1];
        }
        add(__form9, __e87);
        add(__form9, __body49);
      }
      ____i55 = ____i55 + 1;
    }
    if (! none63(__form9)) {
      add(__form9, ["%throw", __e48]);
      var __expr5 = hd(expandIf(__form9));
      indentLevel = indentLevel + 1;
      var ____x99 = compile(__expr5, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h1 = ____x99;
      __str = __str + " catch (" + __e48 + ") {\n" + __h1 + __ind6 + "}";
    }
    var __clause = first((x) => {
      if (eq(hd(x), "finally")) {
        return x;
      }
    }, __clauses3);
    if (__clause) {
      var __body50 = tl(__clause);
      indentLevel = indentLevel + 1;
      var ____x100 = compile(join(["do"], __body50), {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h2 = ____x100;
      __str = __str + " finally {\n" + __h2 + __ind6 + "}";
    }
    __str = __str + "\n";
    return __str;
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%delete", "special", (place) => {
    return indentation() + "delete " + compile(place);
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("break", "special", () => {
    return indentation() + "break";
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("%function", "special", (args, body, ...__r752) => {
    var ____r752 = unstash(__r752);
    var __args28 = destash33(args, ____r752);
    var __body51 = destash33(body, ____r752);
    var ____id93 = ____r752;
    var __infix1 = ____id93["infix"];
    var __prefix3 = ____id93["prefix"];
    var __e88 = undefined;
    if (__prefix3) {
      __e88 = undefined;
    } else {
      __e88 = "=>";
    }
    return compileFunction(__args28, __body51, {["_stash"]: true, ["infix"]: __e88, ["prefix"]: __prefix3});
  });
  setenv37("%global-function", "special", (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%local-function", "special", (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("return", "special", (x) => {
    var __e89 = undefined;
    if (nil63(x)) {
      __e89 = "return";
    } else {
      __e89 = "return " + compile(x);
    }
    var __x101 = __e89;
    return indentation() + __x101;
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("async", "special", (...x) => {
    var __x102 = unstash(x);
    if (_35(__x102) > 1) {
      return compile(join([["async", hd(__x102)]], tl(__x102)));
    } else {
      return "async " + compile(hd(__x102));
    }
  });
  setenv37("await", "special", (...x) => {
    var __x103 = unstash(x);
    if (_35(__x103) > 1) {
      return compile(join([["await", hd(__x103)]], tl(__x103)));
    } else {
      return "await (" + compile(hd(__x103)) + ")";
    }
  });
  setenv37("new", "special", (...x) => {
    var __x104 = unstash(x);
    if (_35(__x104) > 1) {
      return compile(join([["new", hd(__x104)]], tl(__x104)));
    } else {
      return "new " + compile(hd(__x104));
    }
  });
  setenv37("instanceof", "special", (a, b) => {
    return "(" + compile(a) + " instanceof " + compile(b) + ")";
  });
  setenv37("typeof", "special", (x) => {
    return "typeof(" + compile(x) + ")";
  });
  setenv37("%throw", "special", (x) => {
    return indentation() + "throw " + compile(x);
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("error", "special", (x) => {
    var __e49 = "throw " + compile(["new", ["Error", x]]);
    return indentation() + __e49;
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("%local", "special", (name, value) => {
    var __id94 = compile(name);
    var __value1 = compile(value);
    var __e90 = undefined;
    if (is63(value)) {
      __e90 = " = " + __value1;
    } else {
      __e90 = "";
    }
    var __rh3 = __e90;
    var __keyword = "var ";
    var __ind7 = indentation();
    return __ind7 + __keyword + __id94 + __rh3;
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("%set", "special", (lh, rh) => {
    if (fqn63(lh)) {
      return compile(fqn(lh, rh));
    } else {
      var __lh3 = compile(lh);
      var __e91 = undefined;
      if (nil63(rh)) {
        __e91 = "nil";
      } else {
        __e91 = rh;
      }
      var __rh4 = compile(__e91);
      return indentation() + __lh3 + " = " + __rh4;
    }
  }, {["_stash"]: true, ["stmt"]: true});
  setenv37("get", "special", (t, k) => {
    var __t11 = compile(t);
    var __k121 = compile(k);
    if (infixOperator63(t)) {
      __t11 = "(" + __t11 + ")";
    }
    if (stringLiteral63(k) && validId63(inner(k))) {
      return __t11 + "." + inner(k);
    } else {
      return __t11 + "[" + __k121 + "]";
    }
  });
  setenv37("%array", "special", (...forms) => {
    var __forms1 = unstash(forms);
    var __open = "[";
    var __close = "]";
    var __s7 = "";
    var __c7 = "";
    var ____o29 = __forms1;
    var __k42 = undefined;
    for (__k42 in ____o29) {
      var __v30 = ____o29[__k42];
      var __e92 = undefined;
      if (numeric63(__k42)) {
        __e92 = parseInt(__k42);
      } else {
        __e92 = __k42;
      }
      var __k43 = __e92;
      if (number63(__k43)) {
        __s7 = __s7 + __c7 + compile(__v30);
        __c7 = ", ";
      }
    }
    return __open + __s7 + __close;
  });
  setenv37("%object", "special", (...forms) => {
    var __forms2 = unstash(forms);
    var __s8 = "{";
    var __c8 = "";
    var __sep = ": ";
    var ____x105 = pair(__forms2);
    var ____i57 = 0;
    while (____i57 < _35(____x105)) {
      var ____id95 = ____x105[____i57];
      var __k44 = ____id95[0];
      var __v31 = ____id95[1];
      __s8 = __s8 + __c8 + key(__k44) + __sep + compile(__v31);
      __c8 = ", ";
      ____i57 = ____i57 + 1;
    }
    return __s8 + "}";
  });
  setenv37("%table", "special", (...forms) => {
    var __forms3 = unstash(forms);
    var __s9 = "{\n";
    var __c9 = "";
    var __sep1 = ": ";
    var __comma = either(__forms3.comma, escape(", "));
    indentLevel = indentLevel + 1;
    var __ind8 = indentation();
    var ____x107 = __forms3;
    var ____i58 = 0;
    while (____i58 < _35(____x107)) {
      var __x108 = ____x107[____i58];
      if (atom63(__x108)) {
        __s9 = __s9 + __c9 + __ind8 + key(__x108) + __sep1 + compile(__x108);
      } else {
        if (_35(__x108) <= 2) {
          var ____id96 = __x108;
          var __name21 = ____id96[0];
          var __v32 = ____id96[1];
          __s9 = __s9 + __c9 + __ind8 + key(__name21) + __sep1 + compile(__v32);
        } else {
          var ____id97 = __x108;
          var __prefix4 = ____id97[0];
          var __name22 = ____id97[1];
          var __args29 = ____id97[2];
          var __body52 = cut(____id97, 3);
          var __e93 = undefined;
          if (in63((_G.Namespace.find("dax.compiler").intern("name").deref())(__prefix4), ["define", "def"])) {
            __e93 = "";
          } else {
            __e93 = __prefix4;
          }
          var __prefix5 = __e93;
          var __e94 = undefined;
          if (some63(__body52)) {
            __e94 = compileFunction(__args29, join(["do"], __body52), {["_stash"]: true, ["name"]: key(__name22), ["prefix"]: __prefix5});
          } else {
            __e94 = key(__name22) + __sep1 + compile(__args29);
          }
          var __h3 = __e94;
          __s9 = __s9 + __c9 + __ind8 + __h3;
        }
      }
      __c9 = inner(__comma) + "\n";
      ____i58 = ____i58 + 1;
    }
    var ____x106;
    indentLevel = indentLevel - 1;
    return __s9 + "\n" + indentation() + "}";
  });
  setenv37("%class", "special", (name, ...__r763) => {
    var ____r763 = unstash(__r763);
    var __name23 = destash33(name, ____r763);
    var ____id98 = ____r763;
    var __body53 = cut(____id98, 0);
    var __e95 = undefined;
    if (atom63(__name23)) {
      __e95 = [__name23];
    } else {
      __e95 = __name23;
    }
    var ____id99 = __e95;
    var __name24 = ____id99[0];
    var __parent2 = ____id99[1];
    var __e96 = undefined;
    if (__name24) {
      __e96 = [__name24, "\" \""];
    } else {
      __e96 = [];
    }
    var __name25 = __e96;
    var __e97 = undefined;
    if (__parent2) {
      __e97 = ["\"extends \"", __parent2, "\" \""];
    } else {
      __e97 = [];
    }
    var __ext = __e97;
    return compile(join(["%literal", "\"class \""], __name25, __ext, [join({[0]: "%table", ["comma"]: "\"\""}, __body53)]));
  });
  setenv37("%literal", "special", (...args) => {
    var __args30 = unstash(args);
    var __s10 = "";
    var ____x109 = __args30;
    var ____i59 = 0;
    while (____i59 < _35(____x109)) {
      var __x110 = ____x109[____i59];
      if (stringLiteral63(__x110)) {
        __s10 = __s10 + _eval(__x110);
      } else {
        __s10 = __s10 + compile(__x110);
      }
      ____i59 = ____i59 + 1;
    }
    return __s10;
  });
  setenv37("%statement", "special", (...args) => {
    var __args31 = unstash(args);
    var __s111 = indentation();
    var ____x1111 = __args31;
    var ____i60 = 0;
    while (____i60 < _35(____x1111)) {
      var __x112 = ____x1111[____i60];
      if (stringLiteral63(__x112)) {
        __s111 = __s111 + _eval(__x112);
      } else {
        __s111 = __s111 + compile(__x112);
      }
      ____i60 = ____i60 + 1;
    }
    __s111 = __s111 + "\n";
    return __s111;
  }, {["_stash"]: true, ["stmt"]: true, ["tr"]: true});
  setenv37("%indentation", "special", () => {
    return indentation();
  });
  setenv37("%spread", "special", (x) => {
    return "..." + compile(x);
  });
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
  _G.currentNs("dax.reader");
  delimiters = {["{"]: true, ["}"]: true, ["["]: true, ["]"]: true, ["("]: true, [")"]: true, [";"]: true, ["\r"]: true, ["\n"]: true};
  currentNs().intern("delimiters").bindRoot(delimiters, () => {
    return delimiters;
  }, (x) => {
    delimiters = x;
    return delimiters;
  });
  _G.delimiters = delimiters;
  whitespace = {[" "]: true, ["\t"]: true, ["\r"]: true, ["\n"]: true};
  currentNs().intern("whitespace").bindRoot(whitespace, () => {
    return whitespace;
  }, (x) => {
    whitespace = x;
    return whitespace;
  });
  _G.whitespace = whitespace;
  var stream = (str, more) => {
    var __s121 = {["pos"]: 0, ["string"]: str, ["len"]: _35(str)};
    if (is63(more)) {
      __s121.more = more;
    }
    return __s121;
  };
  currentNs().intern("stream").bindRoot(stream, () => {
    return stream;
  }, (x) => {
    stream = x;
    return stream;
  });
  _G.stream = stream;
  var peekChar = (s) => {
    if (s.pos < s.len) {
      return char(s.string, s.pos);
    }
  };
  currentNs().intern("peek-char").bindRoot(peekChar, () => {
    return peekChar;
  }, (x) => {
    peekChar = x;
    return peekChar;
  });
  _G.peekChar = peekChar;
  var readChar = (s) => {
    var __c10 = peekChar(s);
    if (__c10) {
      s.pos = s.pos + 1;
      return __c10;
    }
  };
  currentNs().intern("read-char").bindRoot(readChar, () => {
    return readChar;
  }, (x) => {
    readChar = x;
    return readChar;
  });
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
  currentNs().intern("skip-non-code").bindRoot(skipNonCode, () => {
    return skipNonCode;
  }, (x) => {
    skipNonCode = x;
    return skipNonCode;
  });
  _G.skipNonCode = skipNonCode;
  readTable = {};
  currentNs().intern("read-table").bindRoot(readTable, () => {
    return readTable;
  }, (x) => {
    readTable = x;
    return readTable;
  });
  _G.readTable = readTable;
  eof = {};
  currentNs().intern("eof").bindRoot(eof, () => {
    return eof;
  }, (x) => {
    eof = x;
    return eof;
  });
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
  currentNs().intern("read").bindRoot(read, () => {
    return read;
  }, (x) => {
    read = x;
    return read;
  });
  _G.read = read;
  var readAll = (s) => {
    var __l111 = [];
    while (true) {
      var __form10 = read(s);
      if (__form10 === eof) {
        break;
      }
      add(__l111, __form10);
    }
    return __l111;
  };
  currentNs().intern("read-all").bindRoot(readAll, () => {
    return readAll;
  }, (x) => {
    readAll = x;
    return readAll;
  });
  _G.readAll = readAll;
  var readString = (str, more) => {
    var __x113 = read(stream(str, more));
    if (!( __x113 === eof)) {
      return __x113;
    }
  };
  currentNs().intern("read-string").bindRoot(readString, () => {
    return readString;
  }, (x) => {
    readString = x;
    return readString;
  });
  _G.readString = readString;
  var key63 = (atom) => {
    return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
  };
  currentNs().intern("key?").bindRoot(key63, () => {
    return key63;
  }, (x) => {
    key63 = x;
    return key63;
  });
  var expected = (s, c) => {
    var ____id101 = s;
    var __more = ____id101["more"];
    var __pos = ____id101["pos"];
    var __id102 = __more;
    var __e98 = undefined;
    if (__id102) {
      __e98 = __id102;
    } else {
      throw new Error("Expected " + c + " at " + __pos);
      __e98 = undefined;
    }
    return __e98;
  };
  currentNs().intern("expected").bindRoot(expected, () => {
    return expected;
  }, (x) => {
    expected = x;
    return expected;
  });
  _G.expected = expected;
  var wrap = (s, x) => {
    var __y6 = read(s);
    if (__y6 === s.more) {
      return __y6;
    } else {
      return [x, __y6];
    }
  };
  currentNs().intern("wrap").bindRoot(wrap, () => {
    return wrap;
  }, (x) => {
    wrap = x;
    return wrap;
  });
  _G.wrap = wrap;
  var hexPrefix63 = (str) => {
    var __e99 = undefined;
    if (code(str, 0) === 45) {
      __e99 = 1;
    } else {
      __e99 = 0;
    }
    var __i61 = __e99;
    var __id103 = code(str, __i61) === 48;
    var __e100 = undefined;
    if (__id103) {
      __i61 = __i61 + 1;
      var __n38 = code(str, __i61);
      __e100 = __n38 === 120 || __n38 === 88;
    } else {
      __e100 = __id103;
    }
    return __e100;
  };
  currentNs().intern("hex-prefix?").bindRoot(hexPrefix63, () => {
    return hexPrefix63;
  }, (x) => {
    hexPrefix63 = x;
    return hexPrefix63;
  });
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
  currentNs().intern("maybe-number").bindRoot(maybeNumber, () => {
    return maybeNumber;
  }, (x) => {
    maybeNumber = x;
    return maybeNumber;
  });
  _G.maybeNumber = maybeNumber;
  var real63 = (x) => {
    return number63(x) && ! nan63(x) && ! inf63(x);
  };
  currentNs().intern("real?").bindRoot(real63, () => {
    return real63;
  }, (x) => {
    real63 = x;
    return real63;
  });
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
          return Namespace.sym(__str1);
        }
      }
    }
  };
  readTable["("] = (s) => {
    var __r815 = undefined;
    var __l121 = [];
    var __mt = {["start"]: s.pos};
    meta33(__l121, __mt);
    readChar(s);
    while (nil63(__r815)) {
      skipNonCode(s);
      var __c14 = peekChar(s);
      if (__c14 === ")") {
        readChar(s);
        __r815 = __l121;
      } else {
        if (nil63(__c14)) {
          __r815 = expected(s, ")");
        } else {
          var __x114 = read(s);
          var __e101 = undefined;
          if (sym63(__x114)) {
            __e101 = "" + __x114;
          } else {
            __e101 = __x114;
          }
          var __x121 = __e101;
          if (key63(__x121)) {
            var __k45 = clip(__x121, 0, edge(__x121));
            var __v33 = read(s);
            __l121[__k45] = __v33;
          } else {
            add(__l121, __x114);
          }
        }
      }
    }
    __mt.stop = s.pos;
    return __r815;
  };
  readTable[")"] = (s) => {
    throw new Error("Unexpected ) at " + s.pos);
  };
  readTable["["] = (s) => {
    readChar(s);
    var __r818 = undefined;
    var __l13 = [];
    while (nil63(__r818)) {
      skipNonCode(s);
      var __c15 = peekChar(s);
      if (__c15 === "]") {
        readChar(s);
        __r818 = join(["brackets"], __l13);
      } else {
        if (nil63(__c15)) {
          __r818 = expected(s, "]");
        } else {
          var __x115 = read(s);
          add(__l13, __x115);
        }
      }
    }
    return __r818;
  };
  readTable["]"] = (s) => {
    throw new Error("Unexpected ] at " + s.pos);
  };
  readTable["{"] = (s) => {
    readChar(s);
    var __r821 = undefined;
    var __l14 = [];
    while (nil63(__r821)) {
      skipNonCode(s);
      var __c16 = peekChar(s);
      if (__c16 === "}") {
        readChar(s);
        __r821 = join(["braces"], __l14);
      } else {
        if (nil63(__c16)) {
          __r821 = expected(s, "}");
        } else {
          var __x116 = read(s);
          add(__l14, __x116);
        }
      }
    }
    return __r821;
  };
  readTable["}"] = (s) => {
    throw new Error("Unexpected } at " + s.pos);
  };
  readTable["\""] = (s) => {
    readChar(s);
    var __r824 = undefined;
    var __str2 = "\"";
    while (nil63(__r824)) {
      var __c17 = peekChar(s);
      if (__c17 === "\"") {
        __r824 = __str2 + readChar(s);
      } else {
        if (nil63(__c17)) {
          __r824 = expected(s, "\"");
        } else {
          if (__c17 === "\\") {
            __str2 = __str2 + readChar(s);
          }
          __str2 = __str2 + readChar(s);
        }
      }
    }
    return __r824;
  };
  readTable["|"] = (s) => {
    readChar(s);
    var __r826 = undefined;
    var __str3 = "|";
    while (nil63(__r826)) {
      var __c18 = peekChar(s);
      if (__c18 === "|") {
        __r826 = __str3 + readChar(s);
      } else {
        if (nil63(__c18)) {
          __r826 = expected(s, "|");
        } else {
          __str3 = __str3 + readChar(s);
        }
      }
    }
    return __r826;
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
    var __e102 = undefined;
    if (__c19 === "\\") {
      __e102 = readChar(s);
    } else {
      __e102 = __c19;
    }
    var __c131 = __e102;
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
  _G.currentNs("dax.system");
  var fs = require("fs");
  currentNs().intern("fs").bindRoot(fs, () => {
    return fs;
  }, (x) => {
    fs = x;
    return fs;
  });
  var childProcess = require("child_process");
  currentNs().intern("child-process").bindRoot(childProcess, () => {
    return childProcess;
  }, (x) => {
    childProcess = x;
    return childProcess;
  });
  var path = require("path");
  currentNs().intern("path").bindRoot(path, () => {
    return path;
  }, (x) => {
    path = x;
    return path;
  });
  var process = require("process");
  currentNs().intern("process").bindRoot(process, () => {
    return process;
  }, (x) => {
    process = x;
    return process;
  });
  var readFile = (path, __x117) => {
    var __e103 = undefined;
    if (is63(__x117)) {
      __e103 = __x117;
    } else {
      __e103 = "text";
    }
    var __mode = __e103;
    if (eq(__mode, "text")) {
      return fs.readFileSync(path, "utf8").replace(/\r/g, "");
    } else {
      return fs.readFileSync(path);
    }
  };
  currentNs().intern("read-file").bindRoot(readFile, () => {
    return readFile;
  }, (x) => {
    readFile = x;
    return readFile;
  });
  var writeFile = (path, data) => {
    return fs.writeFileSync(path, data, "utf8");
  };
  currentNs().intern("write-file").bindRoot(writeFile, () => {
    return writeFile;
  }, (x) => {
    writeFile = x;
    return writeFile;
  });
  var fileExists63 = (path) => {
    return fs.existsSync(path, "utf8") && fs.statSync(path).isFile();
  };
  currentNs().intern("file-exists?").bindRoot(fileExists63, () => {
    return fileExists63;
  }, (x) => {
    fileExists63 = x;
    return fileExists63;
  });
  var directoryExists63 = (path) => {
    return fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory();
  };
  currentNs().intern("directory-exists?").bindRoot(directoryExists63, () => {
    return directoryExists63;
  }, (x) => {
    directoryExists63 = x;
    return directoryExists63;
  });
  var pathSeparator = path.sep;
  currentNs().intern("path-separator").bindRoot(pathSeparator, () => {
    return pathSeparator;
  }, (x) => {
    pathSeparator = x;
    return pathSeparator;
  });
  var pathJoin = (...parts) => {
    var __parts = unstash(parts);
    return reduce((x, y) => {
      return x + pathSeparator + y;
    }, __parts) || "";
  };
  currentNs().intern("path-join").bindRoot(pathJoin, () => {
    return pathJoin;
  }, (x) => {
    pathJoin = x;
    return pathJoin;
  });
  var getEnvironmentVariable = (name) => {
    return process.env[name];
  };
  currentNs().intern("get-environment-variable").bindRoot(getEnvironmentVariable, () => {
    return getEnvironmentVariable;
  }, (x) => {
    getEnvironmentVariable = x;
    return getEnvironmentVariable;
  });
  var setEnvironmentVariable = (name, value) => {
    process.env[name] = value;
    return process.env[name];
  };
  currentNs().intern("set-environment-variable").bindRoot(setEnvironmentVariable, () => {
    return setEnvironmentVariable;
  }, (x) => {
    setEnvironmentVariable = x;
    return setEnvironmentVariable;
  });
  var write = (x, cb) => {
    var __out = process.stdout;
    return __out.write(x, cb);
  };
  currentNs().intern("write").bindRoot(write, () => {
    return write;
  }, (x) => {
    write = x;
    return write;
  });
  var exit = (code) => {
    return process.exit(code);
  };
  currentNs().intern("exit").bindRoot(exit, () => {
    return exit;
  }, (x) => {
    exit = x;
    return exit;
  });
  var argv = cut(process.argv, 2);
  currentNs().intern("argv").bindRoot(argv, () => {
    return argv;
  }, (x) => {
    argv = x;
    return argv;
  });
  var reload = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
  };
  currentNs().intern("reload").bindRoot(reload, () => {
    return reload;
  }, (x) => {
    reload = x;
    return reload;
  });
  var shell = (command) => {
    return childProcess.execSync(command).toString();
  };
  currentNs().intern("shell").bindRoot(shell, () => {
    return shell;
  }, (x) => {
    shell = x;
    return shell;
  });
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
  _G.currentNs("dax.main");
  var reader = _G.reader;
  currentNs().intern("reader").bindRoot(reader, () => {
    return reader;
  }, (x) => {
    reader = x;
    return reader;
  });
  var compiler = _G.compiler;
  currentNs().intern("compiler").bindRoot(compiler, () => {
    return compiler;
  }, (x) => {
    compiler = x;
    return compiler;
  });
  var system = _G.system;
  currentNs().intern("system").bindRoot(system, () => {
    return system;
  }, (x) => {
    system = x;
    return system;
  });
  var evalPrint = (form) => {
    var ____id104 = (() => {
      try {
        return [true, compiler["eval"](form)];
      }
      catch (__e107) {
        return [false, __e107];
      }
    })();
    var __ok1 = ____id104[0];
    var __v34 = ____id104[1];
    if (! __ok1) {
      return print(__v34.stack);
    } else {
      if (is63(__v34)) {
        return print(str(__v34));
      }
    }
  };
  currentNs().intern("eval-print").bindRoot(evalPrint, () => {
    return evalPrint;
  }, (x) => {
    evalPrint = x;
    return evalPrint;
  });
  var rep = (s) => {
    return evalPrint(reader.readString(s));
  };
  currentNs().intern("rep").bindRoot(rep, () => {
    return rep;
  }, (x) => {
    rep = x;
    return rep;
  });
  var repl = () => {
    var __buf = "";
    var rep1 = (s) => {
      __buf = __buf + s;
      var __more1 = [];
      var __form11 = reader.readString(__buf, __more1);
      if (!( __form11 === __more1)) {
        evalPrint(__form11);
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
  currentNs().intern("repl").bindRoot(repl, () => {
    return repl;
  }, (x) => {
    repl = x;
    return repl;
  });
  var ppToString = (body) => {
    if (atom63(body)) {
      return str(body);
    } else {
      if (empty63(body)) {
        return str(body);
      } else {
        var __s13 = "(";
        var ____x118 = body;
        var ____i62 = 0;
        while (____i62 < _35(____x118)) {
          var __x119 = ____x118[____i62];
          __s13 = __s13 + str(__x119) + "\n\n";
          ____i62 = ____i62 + 1;
        }
        return __s13 + ")";
      }
    }
  };
  currentNs().intern("pp-to-string").bindRoot(ppToString, () => {
    return ppToString;
  }, (x) => {
    ppToString = x;
    return ppToString;
  });
  _G.ppToString = ppToString;
  var pp = (body) => {
    print(ppToString(body));
    return body;
  };
  currentNs().intern("pp").bindRoot(pp, () => {
    return pp;
  }, (x) => {
    pp = x;
    return pp;
  });
  _G.pp = pp;
  var readFile = (path) => {
    var __s14 = reader.stream(system.readFile(path));
    var __body54 = reader.readAll(__s14);
    if (one63(__body54)) {
      return hd(__body54);
    } else {
      return join(["do"], __body54);
    }
  };
  currentNs().intern("read-file").bindRoot(readFile, () => {
    return readFile;
  }, (x) => {
    readFile = x;
    return readFile;
  });
  _G.readFile = readFile;
  var expandFile = (path) => {
    var __body55 = readFile(path);
    return compiler.expand(__body55);
  };
  currentNs().intern("expand-file").bindRoot(expandFile, () => {
    return expandFile;
  }, (x) => {
    expandFile = x;
    return expandFile;
  });
  _G.expandFile = expandFile;
  var compileFile = (path) => {
    var __body56 = expandFile(path);
    var __form12 = compiler.expand(join(["do"], __body56));
    return compiler.compile(__form12, {["_stash"]: true, ["stmt"]: true});
  };
  currentNs().intern("compile-file").bindRoot(compileFile, () => {
    return compileFile;
  }, (x) => {
    compileFile = x;
    return compileFile;
  });
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
  currentNs().intern("load").bindRoot(load, () => {
    return load;
  }, (x) => {
    load = x;
    return load;
  });
  _G.load = load;
  var scriptFile63 = (path) => {
    return !( "-" === char(path, 0) || ".js" === clip(path, _35(path) - 3));
  };
  currentNs().intern("script-file?").bindRoot(scriptFile63, () => {
    return scriptFile63;
  }, (x) => {
    scriptFile63 = x;
    return scriptFile63;
  });
  var runFile = (path) => {
    if (scriptFile63(path)) {
      return load(path);
    } else {
      return compiler.run(system.readFile(path));
    }
  };
  currentNs().intern("run-file").bindRoot(runFile, () => {
    return runFile;
  }, (x) => {
    runFile = x;
    return runFile;
  });
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
  currentNs().intern("usage").bindRoot(usage, () => {
    return usage;
  }, (x) => {
    usage = x;
    return usage;
  });
  var main = () => {
    var __arg = hd(system.argv);
    if (__arg && scriptFile63(__arg)) {
      return load(__arg);
    } else {
      if (__arg === "-h" || __arg === "--help") {
        return usage();
      } else {
        var __pre2 = [];
        var __op2 = undefined;
        var __input = undefined;
        var __output = undefined;
        var __expr6 = undefined;
        var __argv = system.argv;
        var __i63 = 0;
        while (__i63 < _35(__argv)) {
          var __a11 = __argv[__i63];
          if (__a11 === "-c" || __a11 === "-x" || __a11 === "-a" || __a11 === "-o" || __a11 === "-t" || __a11 === "-e") {
            if (__i63 === edge(__argv)) {
              print("missing argument for " + __a11);
            } else {
              __i63 = __i63 + 1;
              var __val3 = __argv[__i63];
              if (__a11 === "-c") {
                __input = __val3;
                __op2 = "compile";
              } else {
                if (__a11 === "-x") {
                  __input = __val3;
                  __op2 = "expand";
                } else {
                  if (__a11 === "-a") {
                    __input = __val3;
                    __op2 = "read";
                  } else {
                    if (__a11 === "-o") {
                      __output = __val3;
                    } else {
                      if (__a11 === "-e") {
                        __expr6 = __val3;
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (!( "-" === char(__a11, 0))) {
              add(__pre2, __a11);
            }
          }
          __i63 = __i63 + 1;
        }
        var ____x1211 = __pre2;
        var ____i64 = 0;
        while (____i64 < _35(____x1211)) {
          var __file = ____x1211[____i64];
          runFile(__file);
          ____i64 = ____i64 + 1;
        }
        if (nil63(__input)) {
          if (__expr6) {
            return rep(__expr6);
          } else {
            return repl();
          }
        } else {
          var __e104 = undefined;
          if (eq(__op2, "expand")) {
            __e104 = ppToString(expandFile(__input));
          } else {
            var __e105 = undefined;
            if (eq(__op2, "read")) {
              __e105 = ppToString(readFile(__input));
            } else {
              __e105 = compileFile(__input);
            }
            __e104 = __e105;
          }
          var __code2 = __e104;
          if (nil63(__output) || __output === "-") {
            return print(__code2);
          } else {
            return system.writeFile(__output, __code2);
          }
        }
      }
    }
  };
  currentNs().intern("main").bindRoot(main, () => {
    return main;
  }, (x) => {
    main = x;
    return main;
  });
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
