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
    toString() {
      return this.fqn();
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
        var __ns2 = _G.Namespace.findOrCreate(x);
        return _G.Compiler.NS().bindRoot(__ns2);
      }
    }
  };
  _G._42ns42 = _G.Compiler.currentNS;
  _G._42ns42("dax.lang");
  _G._42ns42("dax.reader");
  _G._42ns42("dax.compiler");
  _G._42ns42("dax.system");
  _G._42ns42("dax.main");
  _G._42ns42("dax.core");
  environment = _G.environment;
  _G._42ns42().intern("environment").bindRoot(environment, () => {
    return environment;
  }, (x) => {
    environment = x;
    return environment;
  });
  _G.environment = environment;
  Namespace = _G.Namespace;
  _G._42ns42().intern("Namespace").bindRoot(Namespace, () => {
    return Namespace;
  }, (x) => {
    Namespace = x;
    return Namespace;
  });
  _G.Namespace = Namespace;
  Sym = _G.Sym;
  _G._42ns42().intern("Sym").bindRoot(Sym, () => {
    return Sym;
  }, (x) => {
    Sym = x;
    return Sym;
  });
  _G.Sym = Sym;
  Var = _G.Var;
  _G._42ns42().intern("Var").bindRoot(Var, () => {
    return Var;
  }, (x) => {
    Var = x;
    return Var;
  });
  _G.Var = Var;
  Unbound = _G.Unbound;
  _G._42ns42().intern("Unbound").bindRoot(Unbound, () => {
    return Unbound;
  }, (x) => {
    Unbound = x;
    return Unbound;
  });
  _G.Unbound = Unbound;
  Mapping = _G.Mapping;
  _G._42ns42().intern("Mapping").bindRoot(Mapping, () => {
    return Mapping;
  }, (x) => {
    Mapping = x;
    return Mapping;
  });
  _G.Mapping = Mapping;
  var nil63 = (x) => {
    return x === undefined || x === null;
  };
  _G._42ns42().intern("nil?").bindRoot(nil63, () => {
    return nil63;
  }, (x) => {
    nil63 = x;
    return nil63;
  });
  _G.nil63 = nil63;
  var is63 = (x) => {
    return ! nil63(x);
  };
  _G._42ns42().intern("is?").bindRoot(is63, () => {
    return is63;
  }, (x) => {
    is63 = x;
    return is63;
  });
  _G.is63 = is63;
  var no = (x) => {
    return nil63(x) || x === false;
  };
  _G._42ns42().intern("no").bindRoot(no, () => {
    return no;
  }, (x) => {
    no = x;
    return no;
  });
  _G.no = no;
  var yes = (x) => {
    return ! no(x);
  };
  _G._42ns42().intern("yes").bindRoot(yes, () => {
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
  _G._42ns42().intern("either").bindRoot(either, () => {
    return either;
  }, (x) => {
    either = x;
    return either;
  });
  _G.either = either;
  var has63 = (l, k) => {
    return l.hasOwnProperty(k);
  };
  _G._42ns42().intern("has?").bindRoot(has63, () => {
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
  _G._42ns42().intern("#").bindRoot(_35, () => {
    return _35;
  }, (x) => {
    _35 = x;
    return _35;
  });
  _G._35 = _35;
  var none63 = (x) => {
    return _35(x) === 0;
  };
  _G._42ns42().intern("none?").bindRoot(none63, () => {
    return none63;
  }, (x) => {
    none63 = x;
    return none63;
  });
  _G.none63 = none63;
  var some63 = (x) => {
    return _35(x) > 0;
  };
  _G._42ns42().intern("some?").bindRoot(some63, () => {
    return some63;
  }, (x) => {
    some63 = x;
    return some63;
  });
  _G.some63 = some63;
  var one63 = (x) => {
    return _35(x) === 1;
  };
  _G._42ns42().intern("one?").bindRoot(one63, () => {
    return one63;
  }, (x) => {
    one63 = x;
    return one63;
  });
  _G.one63 = one63;
  var two63 = (x) => {
    return _35(x) === 2;
  };
  _G._42ns42().intern("two?").bindRoot(two63, () => {
    return two63;
  }, (x) => {
    two63 = x;
    return two63;
  });
  _G.two63 = two63;
  var hd = (l) => {
    return l[0];
  };
  _G._42ns42().intern("hd").bindRoot(hd, () => {
    return hd;
  }, (x) => {
    hd = x;
    return hd;
  });
  _G.hd = hd;
  var type = (x) => {
    return typeof(x);
  };
  _G._42ns42().intern("type").bindRoot(type, () => {
    return type;
  }, (x) => {
    type = x;
    return type;
  });
  _G.type = type;
  var type63 = (x, y) => {
    return type(x) === y;
  };
  _G._42ns42().intern("type?").bindRoot(type63, () => {
    return type63;
  }, (x) => {
    type63 = x;
    return type63;
  });
  _G.type63 = type63;
  var string63 = (x) => {
    return type63(x, "string");
  };
  _G._42ns42().intern("string?").bindRoot(string63, () => {
    return string63;
  }, (x) => {
    string63 = x;
    return string63;
  });
  _G.string63 = string63;
  var number63 = (x) => {
    return type63(x, "number");
  };
  _G._42ns42().intern("number?").bindRoot(number63, () => {
    return number63;
  }, (x) => {
    number63 = x;
    return number63;
  });
  _G.number63 = number63;
  var boolean63 = (x) => {
    return type63(x, "boolean");
  };
  _G._42ns42().intern("boolean?").bindRoot(boolean63, () => {
    return boolean63;
  }, (x) => {
    boolean63 = x;
    return boolean63;
  });
  _G.boolean63 = boolean63;
  var function63 = (x) => {
    return type63(x, "function");
  };
  _G._42ns42().intern("function?").bindRoot(function63, () => {
    return function63;
  }, (x) => {
    function63 = x;
    return function63;
  });
  _G.function63 = function63;
  var symbol63 = (x) => {
    return type63(x, "symbol");
  };
  _G._42ns42().intern("symbol?").bindRoot(symbol63, () => {
    return symbol63;
  }, (x) => {
    symbol63 = x;
    return symbol63;
  });
  _G.symbol63 = symbol63;
  var obj63 = (x) => {
    return is63(x) && type63(x, "object");
  };
  _G._42ns42().intern("obj?").bindRoot(obj63, () => {
    return obj63;
  }, (x) => {
    obj63 = x;
    return obj63;
  });
  _G.obj63 = obj63;
  var array63 = (x) => {
    return Array.isArray(x);
  };
  _G._42ns42().intern("array?").bindRoot(array63, () => {
    return array63;
  }, (x) => {
    array63 = x;
    return array63;
  });
  _G.array63 = array63;
  var atom63 = (x) => {
    return nil63(x) || string63(x) || number63(x) || boolean63(x) || symbol63(x);
  };
  _G._42ns42().intern("atom?").bindRoot(atom63, () => {
    return atom63;
  }, (x) => {
    atom63 = x;
    return atom63;
  });
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
  _G._42ns42().intern("fresh").bindRoot(fresh, () => {
    return fresh;
  }, (x) => {
    fresh = x;
    return fresh;
  });
  _G.fresh = fresh;
  nan = 0 / 0;
  _G._42ns42().intern("nan").bindRoot(nan, () => {
    return nan;
  }, (x) => {
    nan = x;
    return nan;
  });
  _G.nan = nan;
  inf = 1 / 0;
  _G._42ns42().intern("inf").bindRoot(inf, () => {
    return inf;
  }, (x) => {
    inf = x;
    return inf;
  });
  _G.inf = inf;
  _inf = - inf;
  _G._42ns42().intern("-inf").bindRoot(_inf, () => {
    return _inf;
  }, (x) => {
    _inf = x;
    return _inf;
  });
  _G._inf = _inf;
  var nan63 = (n) => {
    return !( n === n);
  };
  _G._42ns42().intern("nan?").bindRoot(nan63, () => {
    return nan63;
  }, (x) => {
    nan63 = x;
    return nan63;
  });
  _G.nan63 = nan63;
  var inf63 = (n) => {
    return n === inf || n === _inf;
  };
  _G._42ns42().intern("inf?").bindRoot(inf63, () => {
    return inf63;
  }, (x) => {
    inf63 = x;
    return inf63;
  });
  _G.inf63 = inf63;
  var clip = (s, from, upto) => {
    return s.substring(from, upto);
  };
  _G._42ns42().intern("clip").bindRoot(clip, () => {
    return clip;
  }, (x) => {
    clip = x;
    return clip;
  });
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
  _G._42ns42().intern("cut").bindRoot(cut, () => {
    return cut;
  }, (x) => {
    cut = x;
    return cut;
  });
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
  _G._42ns42().intern("keys").bindRoot(keys, () => {
    return keys;
  }, (x) => {
    keys = x;
    return keys;
  });
  _G.keys = keys;
  var edge = (x) => {
    return _35(x) - 1;
  };
  _G._42ns42().intern("edge").bindRoot(edge, () => {
    return edge;
  }, (x) => {
    edge = x;
    return edge;
  });
  _G.edge = edge;
  var inner = (x) => {
    return clip(x, 1, edge(x));
  };
  _G._42ns42().intern("inner").bindRoot(inner, () => {
    return inner;
  }, (x) => {
    inner = x;
    return inner;
  });
  _G.inner = inner;
  var tl = (l) => {
    return cut(l, 1);
  };
  _G._42ns42().intern("tl").bindRoot(tl, () => {
    return tl;
  }, (x) => {
    tl = x;
    return tl;
  });
  _G.tl = tl;
  var char = (s, n) => {
    return s.charAt(n);
  };
  _G._42ns42().intern("char").bindRoot(char, () => {
    return char;
  }, (x) => {
    char = x;
    return char;
  });
  _G.char = char;
  var code = (s, n) => {
    return s.charCodeAt(n);
  };
  _G._42ns42().intern("code").bindRoot(code, () => {
    return code;
  }, (x) => {
    code = x;
    return code;
  });
  _G.code = code;
  var stringLiteral63 = (x) => {
    return string63(x) && char(x, 0) === "\"";
  };
  _G._42ns42().intern("string-literal?").bindRoot(stringLiteral63, () => {
    return stringLiteral63;
  }, (x) => {
    stringLiteral63 = x;
    return stringLiteral63;
  });
  _G.stringLiteral63 = stringLiteral63;
  var idLiteral63 = (x) => {
    return string63(x) && char(x, 0) === "|";
  };
  _G._42ns42().intern("id-literal?").bindRoot(idLiteral63, () => {
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
  _G._42ns42().intern("add").bindRoot(add, () => {
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
      var __x2 = l[__i6];
      delete l[__i6];
      return __x2;
    }
  };
  _G._42ns42().intern("drop").bindRoot(drop, () => {
    return drop;
  }, (x) => {
    drop = x;
    return drop;
  });
  _G.drop = drop;
  var last = (l) => {
    return l[edge(l)];
  };
  _G._42ns42().intern("last").bindRoot(last, () => {
    return last;
  }, (x) => {
    last = x;
    return last;
  });
  _G.last = last;
  var almost = (l) => {
    return cut(l, 0, edge(l));
  };
  _G._42ns42().intern("almost").bindRoot(almost, () => {
    return almost;
  }, (x) => {
    almost = x;
    return almost;
  });
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
  _G._42ns42().intern("reverse").bindRoot(reverse, () => {
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
  _G._42ns42().intern("reduce").bindRoot(reduce, () => {
    return reduce;
  }, (x) => {
    reduce = x;
    return reduce;
  });
  _G.reduce = reduce;
  var join = (...ls) => {
    var __ls = unstash(ls);
    var __r173 = fresh(hd(__ls));
    var ____x3 = __ls;
    var ____i8 = 0;
    while (____i8 < _35(____x3)) {
      var __l2 = ____x3[____i8];
      if (__l2) {
        var __n9 = _35(__r173);
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
          __r173[__k11] = __v6;
        }
      }
      ____i8 = ____i8 + 1;
    }
    return __r173;
  };
  _G._42ns42().intern("join").bindRoot(join, () => {
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
  _G._42ns42().intern("find").bindRoot(find, () => {
    return find;
  }, (x) => {
    find = x;
    return find;
  });
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
  _G._42ns42().intern("first").bindRoot(first, () => {
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
  _G._42ns42().intern("in?").bindRoot(in63, () => {
    return in63;
  }, (x) => {
    in63 = x;
    return in63;
  });
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
  _G._42ns42().intern("pair").bindRoot(pair, () => {
    return pair;
  }, (x) => {
    pair = x;
    return pair;
  });
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
  _G._42ns42().intern("sort").bindRoot(sort, () => {
    return sort;
  }, (x) => {
    sort = x;
    return sort;
  });
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
  _G._42ns42().intern("map").bindRoot(map, () => {
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
  _G._42ns42().intern("keep").bindRoot(keep, () => {
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
  _G._42ns42().intern("keys?").bindRoot(keys63, () => {
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
  _G._42ns42().intern("empty?").bindRoot(empty63, () => {
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
  _G._42ns42().intern("stash").bindRoot(stash, () => {
    return stash;
  }, (x) => {
    stash = x;
    return stash;
  });
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
  _G._42ns42().intern("unstash").bindRoot(unstash, () => {
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
  _G._42ns42().intern("destash!").bindRoot(destash33, () => {
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
  _G._42ns42().intern("search").bindRoot(search, () => {
    return search;
  }, (x) => {
    search = x;
    return search;
  });
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
  _G._42ns42().intern("split").bindRoot(split, () => {
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
  _G._42ns42().intern("cat").bindRoot(cat, () => {
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
  _G._42ns42().intern("+").bindRoot(_43, () => {
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
  _G._42ns42().intern("-").bindRoot(_45, () => {
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
  _G._42ns42().intern("*").bindRoot(_42, () => {
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
  _G._42ns42().intern("/").bindRoot(_47, () => {
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
  _G._42ns42().intern("%").bindRoot(_37, () => {
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
  _G._42ns42().intern("pairwise").bindRoot(pairwise, () => {
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
  _G._42ns42().intern("<").bindRoot(_60, () => {
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
  _G._42ns42().intern(">").bindRoot(_62, () => {
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
  _G._42ns42().intern("=").bindRoot(_61, () => {
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
  _G._42ns42().intern("<=").bindRoot(_6061, () => {
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
  _G._42ns42().intern(">=").bindRoot(_6261, () => {
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
  _G._42ns42().intern("number").bindRoot(number, () => {
    return number;
  }, (x) => {
    number = x;
    return number;
  });
  _G.number = number;
  var numberCode63 = (n) => {
    return n >= 48 && n <= 57;
  };
  _G._42ns42().intern("number-code?").bindRoot(numberCode63, () => {
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
  _G._42ns42().intern("numeric?").bindRoot(numeric63, () => {
    return numeric63;
  }, (x) => {
    numeric63 = x;
    return numeric63;
  });
  _G.numeric63 = numeric63;
  var tostring = (x) => {
    return x.toString();
  };
  _G._42ns42().intern("tostring").bindRoot(tostring, () => {
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
  _G._42ns42().intern("escape").bindRoot(escape, () => {
    return escape;
  }, (x) => {
    escape = x;
    return escape;
  });
  _G.escape = escape;
  var simpleId63 = (x) => {
    var __id4 = string63(x);
    var __e21;
    if (__id4) {
      var ____id = (() => {
        try {
          return [true, readString(x)];
        }
        catch (__e98) {
          return [false, __e98];
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
  _G._42ns42().intern("simple-id?").bindRoot(simpleId63, () => {
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
  _G._42ns42().intern("str").bindRoot(str, () => {
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
  _G._42ns42().intern("apply").bindRoot(apply, () => {
    return apply;
  }, (x) => {
    apply = x;
    return apply;
  });
  _G.apply = apply;
  var call = (f, ...__r282) => {
    var ____r282 = unstash(__r282);
    var __f = destash33(f, ____r282);
    var ____id1 = ____r282;
    var __args11 = cut(____id1, 0);
    return apply(__f, __args11);
  };
  _G._42ns42().intern("call").bindRoot(call, () => {
    return call;
  }, (x) => {
    call = x;
    return call;
  });
  _G.call = call;
  var setenv = (k, ...__r285) => {
    var ____r285 = unstash(__r285);
    var __k22 = destash33(k, ____r285);
    var ____id2 = ____r285;
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
  _G._42ns42().intern("setenv").bindRoot(setenv, () => {
    return setenv;
  }, (x) => {
    setenv = x;
    return setenv;
  });
  _G.setenv = setenv;
  var print = (x) => {
    return console.log(x);
  };
  _G._42ns42().intern("print").bindRoot(print, () => {
    return print;
  }, (x) => {
    print = x;
    return print;
  });
  _G.print = print;
  abs = Math.abs;
  _G._42ns42().intern("abs").bindRoot(abs, () => {
    return abs;
  }, (x) => {
    abs = x;
    return abs;
  });
  _G.abs = abs;
  acos = Math.acos;
  _G._42ns42().intern("acos").bindRoot(acos, () => {
    return acos;
  }, (x) => {
    acos = x;
    return acos;
  });
  _G.acos = acos;
  asin = Math.asin;
  _G._42ns42().intern("asin").bindRoot(asin, () => {
    return asin;
  }, (x) => {
    asin = x;
    return asin;
  });
  _G.asin = asin;
  atan = Math.atan;
  _G._42ns42().intern("atan").bindRoot(atan, () => {
    return atan;
  }, (x) => {
    atan = x;
    return atan;
  });
  _G.atan = atan;
  atan2 = Math.atan2;
  _G._42ns42().intern("atan2").bindRoot(atan2, () => {
    return atan2;
  }, (x) => {
    atan2 = x;
    return atan2;
  });
  _G.atan2 = atan2;
  ceil = Math.ceil;
  _G._42ns42().intern("ceil").bindRoot(ceil, () => {
    return ceil;
  }, (x) => {
    ceil = x;
    return ceil;
  });
  _G.ceil = ceil;
  cos = Math.cos;
  _G._42ns42().intern("cos").bindRoot(cos, () => {
    return cos;
  }, (x) => {
    cos = x;
    return cos;
  });
  _G.cos = cos;
  floor = Math.floor;
  _G._42ns42().intern("floor").bindRoot(floor, () => {
    return floor;
  }, (x) => {
    floor = x;
    return floor;
  });
  _G.floor = floor;
  log = Math.log;
  _G._42ns42().intern("log").bindRoot(log, () => {
    return log;
  }, (x) => {
    log = x;
    return log;
  });
  _G.log = log;
  log10 = Math.log10;
  _G._42ns42().intern("log10").bindRoot(log10, () => {
    return log10;
  }, (x) => {
    log10 = x;
    return log10;
  });
  _G.log10 = log10;
  max = Math.max;
  _G._42ns42().intern("max").bindRoot(max, () => {
    return max;
  }, (x) => {
    max = x;
    return max;
  });
  _G.max = max;
  min = Math.min;
  _G._42ns42().intern("min").bindRoot(min, () => {
    return min;
  }, (x) => {
    min = x;
    return min;
  });
  _G.min = min;
  pow = Math.pow;
  _G._42ns42().intern("pow").bindRoot(pow, () => {
    return pow;
  }, (x) => {
    pow = x;
    return pow;
  });
  _G.pow = pow;
  random = Math.random;
  _G._42ns42().intern("random").bindRoot(random, () => {
    return random;
  }, (x) => {
    random = x;
    return random;
  });
  _G.random = random;
  sin = Math.sin;
  _G._42ns42().intern("sin").bindRoot(sin, () => {
    return sin;
  }, (x) => {
    sin = x;
    return sin;
  });
  _G.sin = sin;
  sinh = Math.sinh;
  _G._42ns42().intern("sinh").bindRoot(sinh, () => {
    return sinh;
  }, (x) => {
    sinh = x;
    return sinh;
  });
  _G.sinh = sinh;
  sqrt = Math.sqrt;
  _G._42ns42().intern("sqrt").bindRoot(sqrt, () => {
    return sqrt;
  }, (x) => {
    sqrt = x;
    return sqrt;
  });
  _G.sqrt = sqrt;
  tan = Math.tan;
  _G._42ns42().intern("tan").bindRoot(tan, () => {
    return tan;
  }, (x) => {
    tan = x;
    return tan;
  });
  _G.tan = tan;
  tanh = Math.tanh;
  _G._42ns42().intern("tanh").bindRoot(tanh, () => {
    return tanh;
  }, (x) => {
    tanh = x;
    return tanh;
  });
  _G.tanh = tanh;
  trunc = Math.floor;
  _G._42ns42().intern("trunc").bindRoot(trunc, () => {
    return trunc;
  }, (x) => {
    trunc = x;
    return trunc;
  });
  _G.trunc = trunc;
  _G._42ns42("dax.macros");
  setenv("current-ns", {["_stash"]: true, ["macro"]: (...args) => {
    var __args2 = unstash(args);
    return ["_G", join([".*ns*"], __args2)];
  }});
  setenv("ns", {["_stash"]: true, ["macro"]: (name) => {
    return ["current-ns", escape(name)];
  }});
  setenv("deref", {["_stash"]: true, ["macro"]: (ns, name, ...__r332) => {
    var ____r332 = unstash(__r332);
    var __ns3 = destash33(ns, ____r332);
    var __name = destash33(name, ____r332);
    var ____id5 = ____r332;
    var __args3 = cut(____id5, 0);
    return join([["_G", ".Namespace", ".find", ["quote", __ns3]], [".intern", ["quote", __name]], [".deref"]], __args3);
  }});
  setenv("setq", {["_stash"]: true, ["macro"]: (ns, name, value) => {
    return [["_G", ".Namespace", ".find", ["quote", ns]], [".intern", ["quote", name]], [".deref", value]];
  }});
  setenv("quote", {["_stash"]: true, ["macro"]: (form) => {
    return quoted(form);
  }});
  setenv("quasiquote", {["_stash"]: true, ["macro"]: (form) => {
    return quasiexpand(form, 1);
  }});
  setenv("set", {["_stash"]: true, ["macro"]: (...args) => {
    var __args4 = unstash(args);
    return join(["do"], map((__x11) => {
      var ____id6 = __x11;
      var __lh = ____id6[0];
      var __rh = ____id6[1];
      return ["%set", __lh, __rh];
    }, pair(__args4)));
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
  setenv("case", {["_stash"]: true, ["macro"]: (expr, ...__r340) => {
    var ____r340 = unstash(__r340);
    var __expr = destash33(expr, ____r340);
    var ____id7 = ____r340;
    var __clauses = cut(____id7, 0);
    var __x12 = unique("x");
    var __eq = (_) => {
      if (_ === "else") {
        return true;
      } else {
        return ["=", _, __x12];
      }
    };
    var __cl = (__x13) => {
      var ____id8 = __x13;
      var __a1 = ____id8[0];
      var __body1 = cut(____id8, 1);
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
  setenv("when", {["_stash"]: true, ["macro"]: (cond, ...__r343) => {
    var ____r343 = unstash(__r343);
    var __cond = destash33(cond, ____r343);
    var ____id9 = ____r343;
    var __body2 = cut(____id9, 0);
    return ["if", __cond, join(["do"], __body2)];
  }});
  setenv("unless", {["_stash"]: true, ["macro"]: (cond, ...__r344) => {
    var ____r344 = unstash(__r344);
    var __cond1 = destash33(cond, ____r344);
    var ____id10 = ____r344;
    var __body3 = cut(____id10, 0);
    return ["if", ["not", __cond1], join(["do"], __body3)];
  }});
  setenv("obj", {["_stash"]: true, ["macro"]: (...body) => {
    var __body4 = unstash(body);
    return join(["%object"], mapo((x) => {
      return x;
    }, __body4));
  }});
  setenv("let", {["_stash"]: true, ["macro"]: (bs, ...__r346) => {
    var ____r346 = unstash(__r346);
    var __bs = destash33(bs, ____r346);
    var ____id11 = ____r346;
    var __body5 = cut(____id11, 0);
    if (atom63(__bs)) {
      return join(["let", [__bs, hd(__body5)]], tl(__body5));
    } else {
      if (none63(__bs)) {
        return join(["do"], __body5);
      } else {
        var ____id12 = __bs;
        var __lh1 = ____id12[0];
        var __rh1 = ____id12[1];
        var __bs2 = cut(____id12, 2);
        var ____id13 = bind(__lh1, either(__rh1, "nil"));
        var __id14 = ____id13[0];
        var __val = ____id13[1];
        var __bs1 = cut(____id13, 2);
        var __renames = [];
        if (! idLiteral63(__id14)) {
          var __id111 = unique(__id14);
          __renames = [__id14, __id111];
          __id14 = __id111;
        }
        return ["do", ["%local", __id14, __val], ["let-symbol", __renames, join(["let", join(__bs1, __bs2)], __body5)]];
      }
    }
  }});
  setenv("with", {["_stash"]: true, ["macro"]: (x, v, ...__r347) => {
    var ____r347 = unstash(__r347);
    var __x14 = destash33(x, ____r347);
    var __v16 = destash33(v, ____r347);
    var ____id15 = ____r347;
    var __body6 = cut(____id15, 0);
    return join(["let", [__x14, __v16]], __body6, [__x14]);
  }});
  setenv("let-when", {["_stash"]: true, ["macro"]: (x, v, ...__r348) => {
    var ____r348 = unstash(__r348);
    var __x15 = destash33(x, ____r348);
    var __v17 = destash33(v, ____r348);
    var ____id16 = ____r348;
    var __body7 = cut(____id16, 0);
    var __y4 = unique("y");
    return ["let", __y4, __v17, ["when", ["yes", __y4], join(["let", [__x15, __y4]], __body7)]];
  }});
  setenv("void", {["_stash"]: true, ["macro"]: (...body) => {
    var __body8 = unstash(body);
    return join(["do"], __body8, [["do"]]);
  }});
  setenv("%setenv", {["_stash"]: true, ["macro"]: (name, ...__r349) => {
    var ____r349 = unstash(__r349);
    var __name1 = destash33(name, ____r349);
    var ____id17 = ____r349;
    var __keys1 = cut(____id17, 0);
    return ["void", join(["setenv", ["quote", __name1]], __keys1)];
  }});
  setenv("define-macro", {["_stash"]: true, ["macro"]: (name, args, ...__r350) => {
    var ____r350 = unstash(__r350);
    var __name2 = destash33(name, ____r350);
    var __args5 = destash33(args, ____r350);
    var ____id18 = ____r350;
    var __body9 = cut(____id18, 0);
    return {[0]: "%setenv", [1]: __name2, ["macro"]: join(["fn", __args5], __body9)};
  }});
  setenv("define-special", {["_stash"]: true, ["macro"]: (name, args, ...__r351) => {
    var ____r351 = unstash(__r351);
    var __name3 = destash33(name, ____r351);
    var __args6 = destash33(args, ____r351);
    var ____id19 = ____r351;
    var __body10 = cut(____id19, 0);
    return join({[0]: "%setenv", [1]: __name3, ["special"]: join(["fn", __args6], __body10)}, keys(__body10));
  }});
  setenv("define-symbol-macro", {["_stash"]: true, ["macro"]: (name, expansion) => {
    return {[0]: "%setenv", [1]: name, ["symbol"]: ["quote", expansion]};
  }});
  setenv("define-reader", {["_stash"]: true, ["macro"]: (__x16, ...__r353) => {
    var ____id20 = __x16;
    var __char = ____id20[0];
    var __s11 = ____id20[1];
    var ____r353 = unstash(__r353);
    var ____x16 = destash33(__x16, ____r353);
    var ____id21 = ____r353;
    var __body11 = cut(____id21, 0);
    return ["set", ["read-table", ["brackets", __char]], join(["fn", [__s11]], __body11)];
  }});
  setenv("alter-definition", {["_stash"]: true, ["macro"]: (name) => {
    return [["current-ns"], ".intern", ["quote", name], ".bind-root", name, ["fn", join(), name], ["fn", ["x"], ["set", name, "x"]]];
  }});
  setenv("define", {["_stash"]: true, ["macro"]: (name, x, ...__r355) => {
    var ____r355 = unstash(__r355);
    var __name4 = destash33(name, ____r355);
    var __x17 = destash33(x, ____r355);
    var ____id22 = ____r355;
    var __body12 = cut(____id22, 0);
    setenv(__name4, {["_stash"]: true, ["variable"]: true});
    var __e27;
    if (some63(__body12)) {
      __e27 = join(["%local-function", __name4], bind42(__x17, __body12));
    } else {
      __e27 = ["%local", __name4, __x17];
    }
    var __form = __e27;
    return ["do", __form, ["alter-definition", __name4]];
  }});
  setenv("define-global", {["_stash"]: true, ["macro"]: (name, x, ...__r356) => {
    var ____r356 = unstash(__r356);
    var __name5 = destash33(name, ____r356);
    var __x18 = destash33(x, ____r356);
    var ____id23 = ____r356;
    var __body13 = cut(____id23, 0);
    setenv(__name5, {["_stash"]: true, ["toplevel"]: true, ["variable"]: true});
    var __e28;
    if (some63(__body13)) {
      __e28 = join(["%global-function", __name5], bind42(__x18, __body13));
    } else {
      __e28 = ["%set", __name5, __x18];
    }
    return ["do", __e28, ["alter-definition", __name5], ["%set", ["_G", "." + __name5], __name5]];
  }});
  setenv("with-frame", {["_stash"]: true, ["macro"]: (...body) => {
    var __body14 = unstash(body);
    var __x19 = unique("x");
    return ["do", ["add", ["_G", ".environment"], ["obj"]], ["with", __x19, join(["do"], __body14), ["drop", ["_G", ".environment"]]]];
  }});
  setenv("with-bindings", {["_stash"]: true, ["macro"]: (__x20, ...__r357) => {
    var ____id24 = __x20;
    var __names = ____id24[0];
    var ____r357 = unstash(__r357);
    var ____x20 = destash33(__x20, ____r357);
    var ____id25 = ____r357;
    var __body15 = cut(____id25, 0);
    var __x21 = unique("x");
    return join(["with-frame", ["each", __x21, __names, ["if", ["default-assignment?", __x21], {[0]: "setenv", [1]: ["at", __x21, 1], ["variable"]: true}, {[0]: "setenv", [1]: __x21, ["variable"]: true}]]], __body15);
  }});
  setenv("let-macro", {["_stash"]: true, ["macro"]: (definitions, ...__r358) => {
    var ____r358 = unstash(__r358);
    var __definitions = destash33(definitions, ____r358);
    var ____id26 = ____r358;
    var __body16 = cut(____id26, 0);
    add(_G.environment, {});
    map((m) => {
      return _eval(join(["define-macro"], m));
    }, __definitions);
    var ____x22 = join(["do"], macroexpand(__body16));
    drop(_G.environment);
    return ____x22;
  }});
  setenv("let-symbol", {["_stash"]: true, ["macro"]: (expansions, ...__r360) => {
    var ____r360 = unstash(__r360);
    var __expansions = destash33(expansions, ____r360);
    var ____id27 = ____r360;
    var __body17 = cut(____id27, 0);
    add(_G.environment, {});
    map((__x24) => {
      var ____id28 = __x24;
      var __name6 = ____id28[0];
      var __exp = ____id28[1];
      return _eval(["define-symbol-macro", __name6, __exp]);
    }, pair(__expansions));
    var ____x23 = join(["do"], macroexpand(__body17));
    drop(_G.environment);
    return ____x23;
  }});
  setenv("let-unique", {["_stash"]: true, ["macro"]: (names, ...__r362) => {
    var ____r362 = unstash(__r362);
    var __names1 = destash33(names, ____r362);
    var ____id29 = ____r362;
    var __body18 = cut(____id29, 0);
    var __bs11 = map((n) => {
      return [n, ["unique", ["quote", n]]];
    }, __names1);
    return join(["let", apply(join, __bs11)], __body18);
  }});
  setenv("fn", {["_stash"]: true, ["macro"]: (args, ...__r364) => {
    var ____r364 = unstash(__r364);
    var __args7 = destash33(args, ____r364);
    var ____id30 = ____r364;
    var __body19 = cut(____id30, 0);
    return join(["%function"], bind42(__args7, __body19), keys(__body19));
  }});
  setenv("apply", {["_stash"]: true, ["macro"]: (f, ...__r365) => {
    var ____r365 = unstash(__r365);
    var __f1 = destash33(f, ____r365);
    var ____id31 = ____r365;
    var __args8 = cut(____id31, 0);
    if (_35(__args8) > 1) {
      return ["%call", "apply", __f1, ["join", join(["list"], almost(__args8)), last(__args8)]];
    } else {
      return join(["%call", "apply", __f1], __args8);
    }
  }});
  setenv("guard", {["_stash"]: true, ["macro"]: (expr) => {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  }});
  setenv("each", {["_stash"]: true, ["macro"]: (x, t, ...__r367) => {
    var ____r367 = unstash(__r367);
    var __x25 = destash33(x, ____r367);
    var __t2 = destash33(t, ____r367);
    var ____id32 = ____r367;
    var __body20 = cut(____id32, 0);
    var __o16 = unique("o");
    var __n23 = unique("n");
    var __i28 = unique("i");
    var __e29;
    if (atom63(__x25)) {
      __e29 = [__i28, __x25];
    } else {
      var __e30;
      if (_35(__x25) > 1) {
        __e30 = __x25;
      } else {
        __e30 = [__i28, hd(__x25)];
      }
      __e29 = __e30;
    }
    var ____id33 = __e29;
    var __k25 = ____id33[0];
    var __v18 = ____id33[1];
    return ["let", [__o16, __t2, __k25, "nil"], ["%for", __o16, __k25, ["let", [__v18, [__o16, ["brackets", __k25]]], join(["let", __k25, ["if", ["numeric?", __k25], ["parseInt", __k25], __k25]], __body20)]]];
  }});
  setenv("for", {["_stash"]: true, ["macro"]: (i, to, ...__r368) => {
    var ____r368 = unstash(__r368);
    var __i29 = destash33(i, ____r368);
    var __to = destash33(to, ____r368);
    var ____id34 = ____r368;
    var __body21 = cut(____id34, 0);
    return ["let", __i29, 0, join(["while", ["<", __i29, __to]], __body21, [["inc", __i29]])];
  }});
  setenv("step", {["_stash"]: true, ["macro"]: (v, t, ...__r369) => {
    var ____r369 = unstash(__r369);
    var __v19 = destash33(v, ____r369);
    var __t3 = destash33(t, ____r369);
    var ____id35 = ____r369;
    var __body22 = cut(____id35, 0);
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
      var __e31;
      if (numeric63(____i31)) {
        __e31 = parseInt(____i31);
      } else {
        __e31 = ____i31;
      }
      var ____i311 = __e31;
      __l7[__x27] = true;
    }
    return join(["obj"], __l7);
  }});
  setenv("join!", {["_stash"]: true, ["macro"]: (a, ...__r370) => {
    var ____r370 = unstash(__r370);
    var __a2 = destash33(a, ____r370);
    var ____id36 = ____r370;
    var __bs21 = cut(____id36, 0);
    return ["set", __a2, join(["join", __a2], __bs21)];
  }});
  setenv("cat!", {["_stash"]: true, ["macro"]: (a, ...__r371) => {
    var ____r371 = unstash(__r371);
    var __a3 = destash33(a, ____r371);
    var ____id37 = ____r371;
    var __bs3 = cut(____id37, 0);
    return ["set", __a3, join(["cat", __a3], __bs3)];
  }});
  setenv("inc", {["_stash"]: true, ["macro"]: (n, by) => {
    var __e32;
    if (nil63(by)) {
      __e32 = 1;
    } else {
      __e32 = by;
    }
    return ["set", n, ["+", n, __e32]];
  }});
  setenv("dec", {["_stash"]: true, ["macro"]: (n, by) => {
    var __e33;
    if (nil63(by)) {
      __e33 = 1;
    } else {
      __e33 = by;
    }
    return ["set", n, ["-", n, __e33]];
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
  setenv("class", {["_stash"]: true, ["macro"]: (x, ...__r376) => {
    var ____r376 = unstash(__r376);
    var __x30 = destash33(x, ____r376);
    var ____id38 = ____r376;
    var __body25 = cut(____id38, 0);
    if (atom63(__x30)) {
      return join(["%class", [__x30]], __body25);
    } else {
      return join(["%class", __x30], __body25);
    }
  }});
  setenv(".", {["_stash"]: true, ["macro"]: (...args) => {
    var __args9 = unstash(args);
    if (none63(__args9)) {
      return ["this", ".constructor"];
    } else {
      if (one63(__args9)) {
        return join([".", "this", hd(__args9)], tl(__args9));
      } else {
        var ____id39 = __args9;
        var __name7 = ____id39[0];
        var __a4 = ____id39[1];
        var __bs4 = cut(____id39, 2);
        var __e34;
        if (atom63(__a4)) {
          __e34 = ["quote", compile(__a4)];
        } else {
          var __e35;
          if ("quote" === hd(__a4)) {
            __e35 = ["quote", compile(__a4[1])];
          } else {
            __e35 = __a4;
          }
          __e34 = __e35;
        }
        var __prop = __e34;
        var __expr1 = [__name7, ["brackets", __prop]];
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
            var ____id40 = x;
            var ___ = ____id40[0];
            var __type = ____id40[1];
            var ___var = ____id40[2];
            var __body27 = cut(____id40, 3);
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
    var __args10 = unstash(args);
    return join(["%brackets"], __args10);
  }});
  setenv("braces", {["_stash"]: true, ["macro"]: (...args) => {
    var __args111 = unstash(args);
    return join(["%braces"], __args111);
  }});
  var __exports = {};
  var __self = __exports;
  var __module = {["exports"]: __exports};
  _G._42ns42("dax.compiler");
  var getenv = (k, p) => {
    if (string63(k)) {
      var __i32 = edge(_G.environment);
      while (__i32 >= 0) {
        var __b3 = _G.environment[__i32][k];
        if (is63(__b3)) {
          var __e45;
          if (p) {
            __e45 = __b3[p];
          } else {
            __e45 = __b3;
          }
          return __e45;
        } else {
          __i32 = __i32 - 1;
        }
      }
    }
  };
  _G._42ns42().intern("getenv").bindRoot(getenv, () => {
    return getenv;
  }, (x) => {
    getenv = x;
    return getenv;
  });
  _G.getenv = getenv;
  var macroFunction = (k) => {
    return getenv(k, "macro");
  };
  _G._42ns42().intern("macro-function").bindRoot(macroFunction, () => {
    return macroFunction;
  }, (x) => {
    macroFunction = x;
    return macroFunction;
  });
  var macro63 = (k) => {
    return is63(macroFunction(k));
  };
  _G._42ns42().intern("macro?").bindRoot(macro63, () => {
    return macro63;
  }, (x) => {
    macro63 = x;
    return macro63;
  });
  var special63 = (k) => {
    return is63(getenv(k, "special"));
  };
  _G._42ns42().intern("special?").bindRoot(special63, () => {
    return special63;
  }, (x) => {
    special63 = x;
    return special63;
  });
  var specialForm63 = (form) => {
    return ! atom63(form) && special63(hd(form));
  };
  _G._42ns42().intern("special-form?").bindRoot(specialForm63, () => {
    return specialForm63;
  }, (x) => {
    specialForm63 = x;
    return specialForm63;
  });
  var statement63 = (k) => {
    return special63(k) && getenv(k, "stmt");
  };
  _G._42ns42().intern("statement?").bindRoot(statement63, () => {
    return statement63;
  }, (x) => {
    statement63 = x;
    return statement63;
  });
  var symbolExpansion = (k) => {
    return getenv(k, "symbol");
  };
  _G._42ns42().intern("symbol-expansion").bindRoot(symbolExpansion, () => {
    return symbolExpansion;
  }, (x) => {
    symbolExpansion = x;
    return symbolExpansion;
  });
  var symbolMacro63 = (k) => {
    return is63(symbolExpansion(k));
  };
  _G._42ns42().intern("symbol-macro?").bindRoot(symbolMacro63, () => {
    return symbolMacro63;
  }, (x) => {
    symbolMacro63 = x;
    return symbolMacro63;
  });
  var variable63 = (k) => {
    return is63(getenv(k, "variable"));
  };
  _G._42ns42().intern("variable?").bindRoot(variable63, () => {
    return variable63;
  }, (x) => {
    variable63 = x;
    return variable63;
  });
  var bound63 = (x) => {
    return macro63(x) || special63(x) || symbolMacro63(x) || variable63(x);
  };
  _G._42ns42().intern("bound?").bindRoot(bound63, () => {
    return bound63;
  }, (x) => {
    bound63 = x;
    return bound63;
  });
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
  _G._42ns42().intern("quoted").bindRoot(quoted, () => {
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
  _G._42ns42().intern("literal").bindRoot(literal, () => {
    return literal;
  }, (x) => {
    literal = x;
    return literal;
  });
  var stash42 = (args) => {
    if (keys63(args)) {
      var __l8 = ["%object", "\"_stash\"", true];
      var ____o18 = args;
      var __k26 = undefined;
      for (__k26 in ____o18) {
        var __v20 = ____o18[__k26];
        var __e46;
        if (numeric63(__k26)) {
          __e46 = parseInt(__k26);
        } else {
          __e46 = __k26;
        }
        var __k27 = __e46;
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
  _G._42ns42().intern("stash*").bindRoot(stash42, () => {
    return stash42;
  }, (x) => {
    stash42 = x;
    return stash42;
  });
  var bias = (k) => {
    return k;
  };
  _G._42ns42().intern("bias").bindRoot(bias, () => {
    return bias;
  }, (x) => {
    bias = x;
    return bias;
  });
  var defaultAssignmentOp = "o";
  _G._42ns42().intern("default-assignment-op").bindRoot(defaultAssignmentOp, () => {
    return defaultAssignmentOp;
  }, (x) => {
    defaultAssignmentOp = x;
    return defaultAssignmentOp;
  });
  var defaultAssignment63 = (x) => {
    return ! atom63(x) && hd(x) === defaultAssignmentOp;
  };
  _G._42ns42().intern("default-assignment?").bindRoot(defaultAssignment63, () => {
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
        var __id41 = unique("id");
        var __bs5 = [__id41, rh];
        var ____o19 = lh;
        var __k28 = undefined;
        for (__k28 in ____o19) {
          var __v21 = ____o19[__k28];
          var __e47;
          if (numeric63(__k28)) {
            __e47 = parseInt(__k28);
          } else {
            __e47 = __k28;
          }
          var __k29 = __e47;
          var __e48;
          if (__k29 === "rest") {
            __e48 = ["cut", __id41, _35(lh)];
          } else {
            __e48 = [__id41, ["brackets", ["quote", __k29]]];
          }
          var __x31 = __e48;
          if (is63(__k29)) {
            var __e49;
            if (__v21 === true) {
              __e49 = __k29;
            } else {
              __e49 = __v21;
            }
            var __k30 = __e49;
            __bs5 = join(__bs5, bind(__k30, __x31));
          }
        }
        return __bs5;
      }
    }
  };
  _G._42ns42().intern("bind").bindRoot(bind, () => {
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
      var __r431 = unique("r");
      var ____o20 = args;
      var __k31 = undefined;
      for (__k31 in ____o20) {
        var __v22 = ____o20[__k31];
        var __e50;
        if (numeric63(__k31)) {
          __e50 = parseInt(__k31);
        } else {
          __e50 = __k31;
        }
        var __k32 = __e50;
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
        __bs6 = join(__bs6, [__r431, rest(__r431)]);
        var __n28 = _35(__args12);
        var __i36 = 0;
        while (__i36 < __n28) {
          var __v23 = __args12[__i36];
          __bs6 = join(__bs6, [__v23, ["destash!", __v23, __r431]]);
          __i36 = __i36 + 1;
        }
        __bs6 = join(__bs6, [keys(args), __r431]);
      }
      return [__args12, join(["let", __bs6], body)];
    }
  };
  _G._42ns42().intern("bind*").bindRoot(bind42, () => {
    return bind42;
  }, (x) => {
    bind42 = x;
    return bind42;
  });
  _G.bind42 = bind42;
  var quoting63 = (depth) => {
    return number63(depth);
  };
  _G._42ns42().intern("quoting?").bindRoot(quoting63, () => {
    return quoting63;
  }, (x) => {
    quoting63 = x;
    return quoting63;
  });
  var quasiquoting63 = (depth) => {
    return quoting63(depth) && depth > 0;
  };
  _G._42ns42().intern("quasiquoting?").bindRoot(quasiquoting63, () => {
    return quasiquoting63;
  }, (x) => {
    quasiquoting63 = x;
    return quasiquoting63;
  });
  var canUnquote63 = (depth) => {
    return quoting63(depth) && depth === 1;
  };
  _G._42ns42().intern("can-unquote?").bindRoot(canUnquote63, () => {
    return canUnquote63;
  }, (x) => {
    canUnquote63 = x;
    return canUnquote63;
  });
  var quasisplice63 = (x, depth) => {
    return canUnquote63(depth) && ! atom63(x) && hd(x) === "unquote-splicing";
  };
  _G._42ns42().intern("quasisplice?").bindRoot(quasisplice63, () => {
    return quasisplice63;
  }, (x) => {
    quasisplice63 = x;
    return quasisplice63;
  });
  var expandLocal = (__x33) => {
    var ____id42 = __x33;
    var __x34 = ____id42[0];
    var __name8 = ____id42[1];
    var __value = ____id42[2];
    setenv(__name8, {["_stash"]: true, ["variable"]: true});
    return ["%local", __name8, macroexpand(__value)];
  };
  _G._42ns42().intern("expand-local").bindRoot(expandLocal, () => {
    return expandLocal;
  }, (x) => {
    expandLocal = x;
    return expandLocal;
  });
  var expandFunction = (__x35) => {
    var ____id43 = __x35;
    var __x36 = ____id43[0];
    var __args121 = ____id43[1];
    var __body28 = cut(____id43, 2);
    add(_G.environment, {});
    var ____o21 = __args121;
    var ____i37 = undefined;
    for (____i37 in ____o21) {
      var ____x37 = ____o21[____i37];
      var __e51;
      if (numeric63(____i37)) {
        __e51 = parseInt(____i37);
      } else {
        __e51 = ____i37;
      }
      var ____i371 = __e51;
      if (defaultAssignment63(____x37)) {
        setenv(____x37[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x37, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x38 = join(["%function", __args121], macroexpand(__body28));
    drop(_G.environment);
    return ____x38;
  };
  _G._42ns42().intern("expand-function").bindRoot(expandFunction, () => {
    return expandFunction;
  }, (x) => {
    expandFunction = x;
    return expandFunction;
  });
  var expandTable = (__x39) => {
    var ____id44 = __x39;
    var __x40 = ____id44[0];
    var __args13 = cut(____id44, 1);
    var __expr2 = join([__x40], keys(__args13));
    var ____x41 = __args13;
    var ____i38 = 0;
    while (____i38 < _35(____x41)) {
      var __x42 = ____x41[____i38];
      if (atom63(__x42)) {
        add(__expr2, [__x42, macroexpand(__x42)]);
      } else {
        if (_35(__x42) <= 2) {
          var ____id45 = __x42;
          var __name9 = ____id45[0];
          var __v24 = ____id45[1];
          add(__expr2, [macroexpand(__name9), macroexpand(__v24)]);
        } else {
          var ____id46 = __x42;
          var __prefix = ____id46[0];
          var __name10 = ____id46[1];
          var __args14 = ____id46[2];
          var __body29 = cut(____id46, 3);
          if (some63(__body29)) {
            var ____id47 = bind42(__args14, __body29);
            var __args131 = ____id47[0];
            var __body111 = ____id47[1];
            add(_G.environment, {});
            var ____o22 = __args131;
            var ____i39 = undefined;
            for (____i39 in ____o22) {
              var ____x43 = ____o22[____i39];
              var __e52;
              if (numeric63(____i39)) {
                __e52 = parseInt(____i39);
              } else {
                __e52 = ____i39;
              }
              var ____i391 = __e52;
              if (defaultAssignment63(____x43)) {
                setenv(____x43[1], {["_stash"]: true, ["variable"]: true});
              } else {
                setenv(____x43, {["_stash"]: true, ["variable"]: true});
              }
            }
            var ____x44 = add(__expr2, [__prefix, macroexpand(__name10), __args131, macroexpand(__body111)]);
            drop(_G.environment);
            ____x44;
          } else {
            add(__expr2, [__prefix, macroexpand(__name10), macroexpand(__args14)]);
          }
        }
      }
      ____i38 = ____i38 + 1;
    }
    return __expr2;
  };
  _G._42ns42().intern("expand-table").bindRoot(expandTable, () => {
    return expandTable;
  }, (x) => {
    expandTable = x;
    return expandTable;
  });
  var expandClass = (__x45) => {
    var ____id48 = __x45;
    var __x46 = ____id48[0];
    var __name11 = ____id48[1];
    var __body30 = cut(____id48, 2);
    return join([__x46, __name11], tl(expandTable(join(["%table"], __body30))));
  };
  _G._42ns42().intern("expand-class").bindRoot(expandClass, () => {
    return expandClass;
  }, (x) => {
    expandClass = x;
    return expandClass;
  });
  var expandConditionCase = (__x47) => {
    var ____id49 = __x47;
    var __x48 = ____id49[0];
    var ___var1 = ____id49[1];
    var __form1 = ____id49[2];
    var __clauses1 = cut(____id49, 3);
    return join(["%condition-case", ___var1, macroexpand(__form1)], map((__x49) => {
      var ____id50 = __x49;
      var __which = ____id50[0];
      var __body31 = cut(____id50, 1);
      if (__which === "finally") {
        return join([__which], map(macroexpand, __body31));
      } else {
        add(_G.environment, {});
        var ____o23 = [___var1];
        var ____i40 = undefined;
        for (____i40 in ____o23) {
          var ____x50 = ____o23[____i40];
          var __e53;
          if (numeric63(____i40)) {
            __e53 = parseInt(____i40);
          } else {
            __e53 = ____i40;
          }
          var ____i401 = __e53;
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
  _G._42ns42().intern("expand-condition-case").bindRoot(expandConditionCase, () => {
    return expandConditionCase;
  }, (x) => {
    expandConditionCase = x;
    return expandConditionCase;
  });
  _G.expandConditionCase = expandConditionCase;
  var expandDefinition = (__x52) => {
    var ____id51 = __x52;
    var __x53 = ____id51[0];
    var __name12 = ____id51[1];
    var __args15 = ____id51[2];
    var __body32 = cut(____id51, 3);
    add(_G.environment, {});
    var ____o24 = __args15;
    var ____i41 = undefined;
    for (____i41 in ____o24) {
      var ____x54 = ____o24[____i41];
      var __e54;
      if (numeric63(____i41)) {
        __e54 = parseInt(____i41);
      } else {
        __e54 = ____i41;
      }
      var ____i411 = __e54;
      if (defaultAssignment63(____x54)) {
        setenv(____x54[1], {["_stash"]: true, ["variable"]: true});
      } else {
        setenv(____x54, {["_stash"]: true, ["variable"]: true});
      }
    }
    var ____x55 = join([__x53, __name12, __args15], macroexpand(__body32));
    drop(_G.environment);
    return ____x55;
  };
  _G._42ns42().intern("expand-definition").bindRoot(expandDefinition, () => {
    return expandDefinition;
  }, (x) => {
    expandDefinition = x;
    return expandDefinition;
  });
  var expandMacro = (form) => {
    return macroexpand(expand1(form));
  };
  _G._42ns42().intern("expand-macro").bindRoot(expandMacro, () => {
    return expandMacro;
  }, (x) => {
    expandMacro = x;
    return expandMacro;
  });
  var expand1 = (__x56) => {
    var ____id52 = __x56;
    var __name13 = ____id52[0];
    var __body33 = cut(____id52, 1);
    return apply(macroFunction(__name13), __body33);
  };
  _G._42ns42().intern("expand1").bindRoot(expand1, () => {
    return expand1;
  }, (x) => {
    expand1 = x;
    return expand1;
  });
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
  _G._42ns42().intern("macroexpand").bindRoot(macroexpand, () => {
    return macroexpand;
  }, (x) => {
    macroexpand = x;
    return macroexpand;
  });
  _G.macroexpand = macroexpand;
  var quasiquoteList = (form, depth) => {
    var __xs13 = [["list"]];
    var ____o25 = form;
    var __k33 = undefined;
    for (__k33 in ____o25) {
      var __v25 = ____o25[__k33];
      var __e55;
      if (numeric63(__k33)) {
        __e55 = parseInt(__k33);
      } else {
        __e55 = __k33;
      }
      var __k34 = __e55;
      if (! number63(__k34)) {
        var __e56;
        if (quasisplice63(__v25, depth)) {
          __e56 = quasiexpand(__v25[1]);
        } else {
          __e56 = quasiexpand(__v25, depth);
        }
        var __v26 = __e56;
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
  _G._42ns42().intern("quasiquote-list").bindRoot(quasiquoteList, () => {
    return quasiquoteList;
  }, (x) => {
    quasiquoteList = x;
    return quasiquoteList;
  });
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
  _G._42ns42().intern("quasiexpand").bindRoot(quasiexpand, () => {
    return quasiexpand;
  }, (x) => {
    quasiexpand = x;
    return quasiexpand;
  });
  _G.quasiexpand = quasiexpand;
  var expandIf = (__x61) => {
    var ____id53 = __x61;
    var __a5 = ____id53[0];
    var __b4 = ____id53[1];
    var __c11 = cut(____id53, 2);
    if (is63(__b4)) {
      return [join(["%if", __a5, __b4], expandIf(__c11))];
    } else {
      if (is63(__a5)) {
        return [__a5];
      }
    }
  };
  _G._42ns42().intern("expand-if").bindRoot(expandIf, () => {
    return expandIf;
  }, (x) => {
    expandIf = x;
    return expandIf;
  });
  _G.expandIf = expandIf;
  indentLevel = 0;
  _G._42ns42().intern("indent-level").bindRoot(indentLevel, () => {
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
  _G._42ns42().intern("indentation").bindRoot(indentation, () => {
    return indentation;
  }, (x) => {
    indentation = x;
    return indentation;
  });
  _G.indentation = indentation;
  var reserved = {["="]: true, ["=="]: true, ["+"]: true, ["-"]: true, ["%"]: true, ["*"]: true, ["/"]: true, ["<"]: true, [">"]: true, ["<="]: true, [">="]: true, ["break"]: true, ["case"]: true, ["catch"]: true, ["class"]: true, ["const"]: true, ["continue"]: true, ["debugger"]: true, ["default"]: true, ["delete"]: true, ["do"]: true, ["else"]: true, ["eval"]: true, ["export"]: true, ["extends"]: true, ["finally"]: true, ["for"]: true, ["function"]: true, ["if"]: true, ["import"]: true, ["in"]: true, ["instanceof"]: true, ["new"]: true, ["return"]: true, ["switch"]: true, ["throw"]: true, ["try"]: true, ["typeof"]: true, ["var"]: true, ["void"]: true, ["while"]: true, ["with"]: true};
  _G._42ns42().intern("reserved").bindRoot(reserved, () => {
    return reserved;
  }, (x) => {
    reserved = x;
    return reserved;
  });
  var reserved63 = (x) => {
    return has63(reserved, x);
  };
  _G._42ns42().intern("reserved?").bindRoot(reserved63, () => {
    return reserved63;
  }, (x) => {
    reserved63 = x;
    return reserved63;
  });
  _G.reserved63 = reserved63;
  var validCode63 = (n) => {
    return numberCode63(n) || n >= 65 && n <= 90 || n >= 97 && n <= 122 || n === 95;
  };
  _G._42ns42().intern("valid-code?").bindRoot(validCode63, () => {
    return validCode63;
  }, (x) => {
    validCode63 = x;
    return validCode63;
  });
  var accessor63 = (x) => {
    return string63(x) && _35(x) > 1 && code(x, 0) === 46 && !( code(x, 1) === 46) || obj63(x) && hd(x) === "%brackets";
  };
  _G._42ns42().intern("accessor?").bindRoot(accessor63, () => {
    return accessor63;
  }, (x) => {
    accessor63 = x;
    return accessor63;
  });
  _G.accessor63 = accessor63;
  camelCaseRegex = new RegExp("(?<=[a-z])[-](\\w|$)", "g");
  _G._42ns42().intern("camel-case-regex").bindRoot(camelCaseRegex, () => {
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
  _G._42ns42().intern("camel-case").bindRoot(camelCase, () => {
    return camelCase;
  }, (x) => {
    camelCase = x;
    return camelCase;
  });
  _G.camelCase = camelCase;
  var fqn63 = (x) => {
    var __id98 = string63(x) && ! stringLiteral63(x);
    var __e57;
    if (__id98) {
      var __i45 = search(x, "/");
      __e57 = is63(__i45) && !( __i45 === edge(x));
    } else {
      __e57 = __id98;
    }
    return __e57;
  };
  _G._42ns42().intern("fqn?").bindRoot(fqn63, () => {
    return fqn63;
  }, (x) => {
    fqn63 = x;
    return fqn63;
  });
  var namespace = (x) => {
    if (fqn63(x)) {
      return clip(x, 0, search(x, "/"));
    }
  };
  _G._42ns42().intern("namespace").bindRoot(namespace, () => {
    return namespace;
  }, (x) => {
    namespace = x;
    return namespace;
  });
  var name = (x) => {
    if (fqn63(x)) {
      return clip(x, search(x, "/") + 1);
    } else {
      return x;
    }
  };
  _G._42ns42().intern("name").bindRoot(name, () => {
    return name;
  }, (x) => {
    name = x;
    return name;
  });
  var fqn = (id, x) => {
    return ["_G", ".Namespace", ".find", escape(namespace(id)), ".intern", escape(name(id)), [".deref", x]];
  };
  _G._42ns42().intern("fqn").bindRoot(fqn, () => {
    return fqn;
  }, (x) => {
    fqn = x;
    return fqn;
  });
  var id = (id, raw63) => {
    if (fqn63(id)) {
      return "(" + compile(fqn(id)) + ")";
    } else {
      var __id54 = camelCase(id);
      var __e58;
      if (! raw63 && numberCode63(code(__id54, 0))) {
        __e58 = "_";
      } else {
        __e58 = "";
      }
      var __id121 = __e58;
      var __i46 = 0;
      while (__i46 < _35(__id54)) {
        var __c2 = char(__id54, __i46);
        var __n34 = code(__c2);
        var __e59;
        if (__c2 === "-" && !( __id54 === "-")) {
          __e59 = "_";
        } else {
          var __e60;
          if (validCode63(__n34)) {
            __e60 = __c2;
          } else {
            var __e61;
            if (__i46 === 0) {
              __e61 = "_" + __n34;
            } else {
              __e61 = __n34;
            }
            __e60 = __e61;
          }
          __e59 = __e60;
        }
        var __c12 = __e59;
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
  _G._42ns42().intern("id").bindRoot(id, () => {
    return id;
  }, (x) => {
    id = x;
    return id;
  });
  var validId63 = (x) => {
    return some63(x) && x === id(x);
  };
  _G._42ns42().intern("valid-id?").bindRoot(validId63, () => {
    return validId63;
  }, (x) => {
    validId63 = x;
    return validId63;
  });
  _G.validId63 = validId63;
  var __names3 = {};
  var unique = (x) => {
    if (string63(x)) {
      var __x62 = id(x);
      if (__names3[__x62]) {
        var __i47 = __names3[__x62];
        __names3[__x62] = __names3[__x62] + 1;
        return unique(__x62 + __i47);
      } else {
        __names3[__x62] = 1;
        return "__" + __x62;
      }
    } else {
      return x;
    }
  };
  _G._42ns42().intern("unique").bindRoot(unique, () => {
    return unique;
  }, (x) => {
    unique = x;
    return unique;
  });
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
  _G._42ns42().intern("key").bindRoot(key, () => {
    return key;
  }, (x) => {
    key = x;
    return key;
  });
  _G.key = key;
  var mapo = (f, t) => {
    var __o26 = [];
    var ____o27 = t;
    var __k35 = undefined;
    for (__k35 in ____o27) {
      var __v27 = ____o27[__k35];
      var __e62;
      if (numeric63(__k35)) {
        __e62 = parseInt(__k35);
      } else {
        __e62 = __k35;
      }
      var __k36 = __e62;
      var __x63 = f(__v27);
      if (is63(__x63)) {
        add(__o26, literal(__k36));
        add(__o26, __x63);
      }
    }
    return __o26;
  };
  _G._42ns42().intern("mapo").bindRoot(mapo, () => {
    return mapo;
  }, (x) => {
    mapo = x;
    return mapo;
  });
  _G.mapo = mapo;
  var infix = [{["not"]: {["js"]: "!"}}, {["*"]: true, ["/"]: true, ["%"]: true}, {["cat"]: {["js"]: "+"}}, {["+"]: true, ["-"]: true}, {["<"]: true, [">"]: true, ["<="]: true, [">="]: true}, {["="]: {["js"]: "==="}, ["=="]: {["js"]: "=="}}, {["and"]: {["js"]: "&&"}}, {["or"]: {["js"]: "||"}}];
  _G._42ns42().intern("infix").bindRoot(infix, () => {
    return infix;
  }, (x) => {
    infix = x;
    return infix;
  });
  var unary63 = (form) => {
    return two63(form) && in63(hd(form), ["not", "-"]);
  };
  _G._42ns42().intern("unary?").bindRoot(unary63, () => {
    return unary63;
  }, (x) => {
    unary63 = x;
    return unary63;
  });
  var index = (k) => {
    return k;
  };
  _G._42ns42().intern("index").bindRoot(index, () => {
    return index;
  }, (x) => {
    index = x;
    return index;
  });
  var precedence = (form) => {
    if (!( atom63(form) || unary63(form))) {
      var ____o28 = infix;
      var __k37 = undefined;
      for (__k37 in ____o28) {
        var __v28 = ____o28[__k37];
        var __e63;
        if (numeric63(__k37)) {
          __e63 = parseInt(__k37);
        } else {
          __e63 = __k37;
        }
        var __k38 = __e63;
        var __x64 = hd(form);
        if (__v28[__x64]) {
          return index(__k38);
        }
      }
    }
    return 0;
  };
  _G._42ns42().intern("precedence").bindRoot(precedence, () => {
    return precedence;
  }, (x) => {
    precedence = x;
    return precedence;
  });
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
  _G._42ns42().intern("getop").bindRoot(getop, () => {
    return getop;
  }, (x) => {
    getop = x;
    return getop;
  });
  var infix63 = (x) => {
    return is63(getop(x));
  };
  _G._42ns42().intern("infix?").bindRoot(infix63, () => {
    return infix63;
  }, (x) => {
    infix63 = x;
    return infix63;
  });
  var infixOperator63 = (x) => {
    return obj63(x) && infix63(hd(x));
  };
  _G._42ns42().intern("infix-operator?").bindRoot(infixOperator63, () => {
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
  _G._42ns42().intern("compile-next").bindRoot(compileNext, () => {
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
        var ____id55 = __a6;
        var __x66 = ____id55[0];
        var __ys = cut(____id55, 1);
        var __s3 = compileNext(compile(__x66), __ys, true);
        return compileNext(__s3, tl(args), call63);
      } else {
        var __s4 = "";
        var __c3 = "";
        var __i50 = 0;
        while (__i50 < _35(args)) {
          var __x67 = args[__i50];
          if (defaultAssignment63(__x67)) {
            var ____id56 = __x67;
            var ___1 = ____id56[0];
            var __x111 = ____id56[1];
            var __val1 = ____id56[2];
            __s4 = __s4 + __c3 + compile(__x111) + " = " + compile(__val1);
          } else {
            if (accessor63(__x67) || obj63(__x67) && accessor63(hd(__x67))) {
              return compileNext("(" + __s4 + ")", cut(args, __i50), call63);
            } else {
              __s4 = __s4 + __c3 + compile(__x67);
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
  _G._42ns42().intern("compile-args").bindRoot(compileArgs, () => {
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
      var __e64;
      if (__c4 === "\n") {
        __e64 = "\\n";
      } else {
        var __e65;
        if (__c4 === "\r") {
          __e65 = "";
        } else {
          __e65 = __c4;
        }
        __e64 = __e65;
      }
      __s12 = __s12 + __e64;
      __i51 = __i51 + 1;
    }
    return __s12;
  };
  _G._42ns42().intern("escape-newlines").bindRoot(escapeNewlines, () => {
    return escapeNewlines;
  }, (x) => {
    escapeNewlines = x;
    return escapeNewlines;
  });
  var accessor = (x) => {
    var __prop1 = compileAtom(clip(x, 1), true);
    if (validId63(__prop1)) {
      return "." + __prop1;
    } else {
      return "[" + escape(__prop1) + "]";
    }
  };
  _G._42ns42().intern("accessor").bindRoot(accessor, () => {
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
  _G._42ns42().intern("compile-atom").bindRoot(compileAtom, () => {
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
  _G._42ns42().intern("terminator").bindRoot(terminator, () => {
    return terminator;
  }, (x) => {
    terminator = x;
    return terminator;
  });
  var compileSpecial = (form, stmt63) => {
    var ____id57 = form;
    var __x68 = ____id57[0];
    var __args16 = cut(____id57, 1);
    var ____id58 = getenv(__x68);
    var __special = ____id58["special"];
    var __stmt = ____id58["stmt"];
    var __selfTr63 = ____id58["tr"];
    var __tr = terminator(stmt63 && ! __selfTr63);
    return apply(__special, __args16) + __tr;
  };
  _G._42ns42().intern("compile-special").bindRoot(compileSpecial, () => {
    return compileSpecial;
  }, (x) => {
    compileSpecial = x;
    return compileSpecial;
  });
  var parenthesizeCall63 = (x) => {
    return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
  };
  _G._42ns42().intern("parenthesize-call?").bindRoot(parenthesizeCall63, () => {
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
  _G._42ns42().intern("compile-call").bindRoot(compileCall, () => {
    return compileCall;
  }, (x) => {
    compileCall = x;
    return compileCall;
  });
  _G.compileCall = compileCall;
  var opDelims = (parent, child, ...__r582) => {
    var ____r582 = unstash(__r582);
    var __parent = destash33(parent, ____r582);
    var __child = destash33(child, ____r582);
    var ____id59 = ____r582;
    var __right = ____id59["right"];
    var __e66;
    if (__right) {
      __e66 = _6261;
    } else {
      __e66 = _62;
    }
    if (__e66(precedence(__child), precedence(__parent))) {
      return ["(", ")"];
    } else {
      return ["", ""];
    }
  };
  _G._42ns42().intern("op-delims").bindRoot(opDelims, () => {
    return opDelims;
  }, (x) => {
    opDelims = x;
    return opDelims;
  });
  var compileInfix = (form) => {
    var ____id60 = form;
    var __op = ____id60[0];
    var ____id61 = cut(____id60, 1);
    var __a7 = ____id61[0];
    var __b5 = ____id61[1];
    var ____id62 = opDelims(form, __a7);
    var __ao = ____id62[0];
    var __ac = ____id62[1];
    var ____id63 = opDelims(form, __b5, {["_stash"]: true, ["right"]: true});
    var __bo = ____id63[0];
    var __bc = ____id63[1];
    var __a8 = compile(__a7);
    var __b6 = compile(__b5);
    var __op1 = getop(__op);
    if (unary63(form)) {
      return __op1 + __ao + " " + __a8 + __ac;
    } else {
      return __ao + __a8 + __ac + " " + __op1 + " " + __bo + __b6 + __bc;
    }
  };
  _G._42ns42().intern("compile-infix").bindRoot(compileInfix, () => {
    return compileInfix;
  }, (x) => {
    compileInfix = x;
    return compileInfix;
  });
  var compileFunction = (args, body, ...__r588) => {
    var ____r588 = unstash(__r588);
    var __args17 = destash33(args, ____r588);
    var __body34 = destash33(body, ____r588);
    var ____id64 = ____r588;
    var __name14 = ____id64["name"];
    var __prefix1 = ____id64["prefix"];
    var __infix = ____id64["infix"];
    var __tr1 = ____id64["tr"];
    var __id65 = either(__name14, "");
    var __args18 = compileArgs(__args17);
    indentLevel = indentLevel + 1;
    var ____x69 = compile(__body34, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body35 = ____x69;
    var __ind = indentation();
    var __e67;
    if (__infix) {
      __e67 = " " + __infix;
    } else {
      __e67 = "";
    }
    var __mid = __e67;
    var __e68;
    if (__prefix1) {
      __e68 = __prefix1 + " ";
    } else {
      __e68 = "";
    }
    var __p1 = __e68;
    var __tr2 = either(__tr1, "");
    return __p1 + __id65 + __args18 + __mid + " {\n" + __body35 + __ind + "}" + __tr2;
  };
  _G._42ns42().intern("compile-function").bindRoot(compileFunction, () => {
    return compileFunction;
  }, (x) => {
    compileFunction = x;
    return compileFunction;
  });
  _G.compileFunction = compileFunction;
  var canReturn63 = (form) => {
    return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
  };
  _G._42ns42().intern("can-return?").bindRoot(canReturn63, () => {
    return canReturn63;
  }, (x) => {
    canReturn63 = x;
    return canReturn63;
  });
  var compile = (form, ...__r594) => {
    var ____r594 = unstash(__r594);
    var __form2 = destash33(form, ____r594);
    var ____id66 = ____r594;
    var __stmt1 = ____id66["stmt"];
    if (nil63(__form2)) {
      return "";
    } else {
      if (specialForm63(__form2)) {
        return compileSpecial(__form2, __stmt1);
      } else {
        var __tr3 = terminator(__stmt1);
        var __e69;
        if (__stmt1) {
          __e69 = indentation();
        } else {
          __e69 = "";
        }
        var __ind1 = __e69;
        var __e70;
        if (atom63(__form2)) {
          __e70 = compileAtom(__form2);
        } else {
          var __e71;
          if (infix63(hd(__form2))) {
            __e71 = compileInfix(__form2);
          } else {
            __e71 = compileCall(hd(__form2), tl(__form2));
          }
          __e70 = __e71;
        }
        var __form3 = __e70;
        return __ind1 + __form3 + __tr3;
      }
    }
  };
  _G._42ns42().intern("compile").bindRoot(compile, () => {
    return compile;
  }, (x) => {
    compile = x;
    return compile;
  });
  _G.compile = compile;
  var lowerStatement = (form, tail63) => {
    var __hoist = [];
    var __e36 = lower(form, __hoist, true, tail63);
    var __e72;
    if (some63(__hoist) && is63(__e36)) {
      __e72 = join(["do"], __hoist, [__e36]);
    } else {
      var __e73;
      if (is63(__e36)) {
        __e73 = __e36;
      } else {
        var __e74;
        if (_35(__hoist) > 1) {
          __e74 = join(["do"], __hoist);
        } else {
          __e74 = hd(__hoist);
        }
        __e73 = __e74;
      }
      __e72 = __e73;
    }
    return either(__e72, ["do"]);
  };
  _G._42ns42().intern("lower-statement").bindRoot(lowerStatement, () => {
    return lowerStatement;
  }, (x) => {
    lowerStatement = x;
    return lowerStatement;
  });
  var lowerBody = (body, tail63) => {
    return lowerStatement(join(["do"], body), tail63);
  };
  _G._42ns42().intern("lower-body").bindRoot(lowerBody, () => {
    return lowerBody;
  }, (x) => {
    lowerBody = x;
    return lowerBody;
  });
  var literal63 = (form) => {
    return atom63(form) || hd(form) === "%array" || hd(form) === "%object" || hd(form) === "%table";
  };
  _G._42ns42().intern("literal?").bindRoot(literal63, () => {
    return literal63;
  }, (x) => {
    literal63 = x;
    return literal63;
  });
  var standalone63 = (form) => {
    return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) && !( "%statement" === hd(form)) && !( two63(form) && accessor63(form[1])) || idLiteral63(form);
  };
  _G._42ns42().intern("standalone?").bindRoot(standalone63, () => {
    return standalone63;
  }, (x) => {
    standalone63 = x;
    return standalone63;
  });
  var lowerDo = (args, hoist, stmt63, tail63) => {
    var ____x70 = almost(args);
    var ____i52 = 0;
    while (____i52 < _35(____x70)) {
      var __x71 = ____x70[____i52];
      var ____y5 = lower(__x71, hoist, stmt63);
      if (yes(____y5)) {
        var __e37 = ____y5;
        if (standalone63(__e37)) {
          add(hoist, __e37);
        }
      }
      ____i52 = ____i52 + 1;
    }
    var __e38 = lower(last(args), hoist, stmt63, tail63);
    if (tail63 && canReturn63(__e38)) {
      return ["return", __e38];
    } else {
      return __e38;
    }
  };
  _G._42ns42().intern("lower-do").bindRoot(lowerDo, () => {
    return lowerDo;
  }, (x) => {
    lowerDo = x;
    return lowerDo;
  });
  var lowerSet = (args, hoist, stmt63, tail63) => {
    var ____id67 = args;
    var __lh2 = ____id67[0];
    var __rh2 = ____id67[1];
    var __lh11 = lower(__lh2, hoist);
    var __rh11 = lower(__rh2, hoist);
    add(hoist, ["%set", __lh11, __rh11]);
    if (!( stmt63 && ! tail63)) {
      return __lh11;
    }
  };
  _G._42ns42().intern("lower-set").bindRoot(lowerSet, () => {
    return lowerSet;
  }, (x) => {
    lowerSet = x;
    return lowerSet;
  });
  var lowerIf = (args, hoist, stmt63, tail63) => {
    var ____id68 = args;
    var __cond2 = ____id68[0];
    var __then = ____id68[1];
    var ___else = ____id68[2];
    if (stmt63) {
      var __e76;
      if (is63(___else)) {
        __e76 = [lowerBody([___else], tail63)];
      }
      return add(hoist, join(["%if", lower(__cond2, hoist), lowerBody([__then], tail63)], __e76));
    } else {
      var __e39 = unique("e");
      add(hoist, ["%local", __e39]);
      var __e75;
      if (is63(___else)) {
        __e75 = [lower(["%set", __e39, ___else])];
      }
      add(hoist, join(["%if", lower(__cond2, hoist), lower(["%set", __e39, __then])], __e75));
      return __e39;
    }
  };
  _G._42ns42().intern("lower-if").bindRoot(lowerIf, () => {
    return lowerIf;
  }, (x) => {
    lowerIf = x;
    return lowerIf;
  });
  var lowerShort = (x, args, hoist) => {
    var ____id69 = args;
    var __a9 = ____id69[0];
    var __b7 = ____id69[1];
    var __hoist1 = [];
    var __b11 = lower(__b7, __hoist1);
    if (some63(__hoist1)) {
      var __id70 = unique("id");
      var __e77;
      if (x === "and") {
        __e77 = ["%if", __id70, __b7, __id70];
      } else {
        __e77 = ["%if", __id70, __id70, __b7];
      }
      return lower(["do", ["%local", __id70, __a9], __e77], hoist);
    } else {
      return [x, lower(__a9, hoist), __b11];
    }
  };
  _G._42ns42().intern("lower-short").bindRoot(lowerShort, () => {
    return lowerShort;
  }, (x) => {
    lowerShort = x;
    return lowerShort;
  });
  var lowerTry = (args, hoist, tail63) => {
    return add(hoist, ["%try", lowerBody(args, tail63)]);
  };
  _G._42ns42().intern("lower-try").bindRoot(lowerTry, () => {
    return lowerTry;
  }, (x) => {
    lowerTry = x;
    return lowerTry;
  });
  var lowerConditionCase = (__x72, hoist, stmt63, tail63) => {
    var ____id71 = __x72;
    var ___var2 = ____id71[0];
    var __form4 = ____id71[1];
    var __clauses2 = cut(____id71, 2);
    if (stmt63) {
      return add(hoist, join(["%condition-case", ___var2, lowerBody(["do", __form4], tail63)], map((__x73) => {
        var ____id72 = __x73;
        var __which1 = ____id72[0];
        var __body36 = cut(____id72, 1);
        if (__which1 === "finally") {
          return [__which1, lowerBody(__body36)];
        } else {
          var ____id73 = __body36;
          var __x74 = ____id73[0];
          var __args19 = cut(____id73, 1);
          return [__which1, lower(__x74), lowerBody(__args19, tail63)];
        }
      }, __clauses2)));
    } else {
      var __e40 = unique("e");
      add(hoist, ["%local", __e40]);
      add(hoist, join(["%condition-case", ___var2, lower(["%set", __e40, __form4])], map((__x75) => {
        var ____id74 = __x75;
        var __which2 = ____id74[0];
        var __body37 = cut(____id74, 1);
        if (__which2 === "finally") {
          return [__which2, lowerBody(__body37)];
        } else {
          var ____id75 = __body37;
          var __x76 = ____id75[0];
          var __args20 = cut(____id75, 1);
          return [__which2, lower(__x76), lower(["%set", __e40, join(["do"], __args20)])];
        }
      }, __clauses2)));
      return __e40;
    }
  };
  _G._42ns42().intern("lower-condition-case").bindRoot(lowerConditionCase, () => {
    return lowerConditionCase;
  }, (x) => {
    lowerConditionCase = x;
    return lowerConditionCase;
  });
  _G.lowerConditionCase = lowerConditionCase;
  var lowerWhile = (args, hoist) => {
    var ____id76 = args;
    var __c5 = ____id76[0];
    var __body38 = cut(____id76, 1);
    var __pre = [];
    var __c6 = lower(__c5, __pre);
    var __e78;
    if (none63(__pre)) {
      __e78 = ["while", __c6, lowerBody(__body38)];
    } else {
      __e78 = ["while", true, join(["do"], __pre, [["%if", ["not", __c6], ["break"]], lowerBody(__body38)])];
    }
    return add(hoist, __e78);
  };
  _G._42ns42().intern("lower-while").bindRoot(lowerWhile, () => {
    return lowerWhile;
  }, (x) => {
    lowerWhile = x;
    return lowerWhile;
  });
  var lowerFor = (args, hoist) => {
    var ____id77 = args;
    var __t4 = ____id77[0];
    var __k39 = ____id77[1];
    var __body39 = cut(____id77, 2);
    return add(hoist, ["%for", lower(__t4, hoist), __k39, lowerBody(__body39)]);
  };
  _G._42ns42().intern("lower-for").bindRoot(lowerFor, () => {
    return lowerFor;
  }, (x) => {
    lowerFor = x;
    return lowerFor;
  });
  var lowerTable = (args, hoist, stmt63, tail63) => {
    var __expr3 = join(["%table"], keys(args));
    var ____x77 = args;
    var ____i53 = 0;
    while (____i53 < _35(____x77)) {
      var __x78 = ____x77[____i53];
      if (atom63(__x78)) {
        add(__expr3, __x78);
      } else {
        if (_35(__x78) <= 2) {
          var ____id78 = __x78;
          var __name15 = ____id78[0];
          var __v29 = ____id78[1];
          add(__expr3, [lower(__name15, hoist), lower(__v29, hoist)]);
        } else {
          var ____id79 = __x78;
          var __prefix2 = ____id79[0];
          var __name16 = ____id79[1];
          var __args21 = ____id79[2];
          var __body40 = cut(____id79, 3);
          if (some63(__body40)) {
            add(__expr3, [__prefix2, lower(__name16, hoist), __args21, lowerBody(__body40, true)]);
          } else {
            add(__expr3, [__prefix2, lower(__name16, hoist), lower(__args21, hoist)]);
          }
        }
      }
      ____i53 = ____i53 + 1;
    }
    return __expr3;
  };
  _G._42ns42().intern("lower-table").bindRoot(lowerTable, () => {
    return lowerTable;
  }, (x) => {
    lowerTable = x;
    return lowerTable;
  });
  _G.lowerTable = lowerTable;
  var lowerClass = (__x79, hoist, stmt63, tail63) => {
    var ____id80 = __x79;
    var __x80 = ____id80[0];
    var __body41 = cut(____id80, 1);
    var __body42 = tl(lowerTable(__body41, hoist));
    var ____id81 = __x80;
    var __name17 = ____id81[0];
    var __parent1 = ____id81[1];
    var __parent11 = lower(__parent1, hoist);
    var __expr4 = join(["%class", [__name17, __parent11]], __body42);
    if (stmt63 && ! tail63) {
      return add(hoist, ["%local", __name17, __expr4]);
    } else {
      return __expr4;
    }
  };
  _G._42ns42().intern("lower-class").bindRoot(lowerClass, () => {
    return lowerClass;
  }, (x) => {
    lowerClass = x;
    return lowerClass;
  });
  _G.lowerClass = lowerClass;
  var lowerFunction = (args) => {
    var ____id82 = args;
    var __a10 = ____id82[0];
    var __body43 = cut(____id82, 1);
    return join(["%function", __a10, lowerBody(__body43, true)], keys(args));
  };
  _G._42ns42().intern("lower-function").bindRoot(lowerFunction, () => {
    return lowerFunction;
  }, (x) => {
    lowerFunction = x;
    return lowerFunction;
  });
  var lowerDefinition = (kind, args, hoist) => {
    var ____id83 = args;
    var __name18 = ____id83[0];
    var __args22 = ____id83[1];
    var __body44 = cut(____id83, 2);
    return add(hoist, [kind, __name18, __args22, lowerBody(__body44, true)]);
  };
  _G._42ns42().intern("lower-definition").bindRoot(lowerDefinition, () => {
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
  _G._42ns42().intern("lower-call").bindRoot(lowerCall, () => {
    return lowerCall;
  }, (x) => {
    lowerCall = x;
    return lowerCall;
  });
  var pairwise63 = (form) => {
    return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
  };
  _G._42ns42().intern("pairwise?").bindRoot(pairwise63, () => {
    return pairwise63;
  }, (x) => {
    pairwise63 = x;
    return pairwise63;
  });
  var lowerPairwise = (form) => {
    if (pairwise63(form)) {
      var __e41 = [];
      var ____id84 = form;
      var __x81 = ____id84[0];
      var __args23 = cut(____id84, 1);
      reduce((a, b) => {
        add(__e41, [__x81, a, b]);
        return a;
      }, __args23);
      return join(["and"], reverse(__e41));
    } else {
      return form;
    }
  };
  _G._42ns42().intern("lower-pairwise").bindRoot(lowerPairwise, () => {
    return lowerPairwise;
  }, (x) => {
    lowerPairwise = x;
    return lowerPairwise;
  });
  var lowerInfix63 = (form) => {
    return infix63(hd(form)) && _35(form) > 3;
  };
  _G._42ns42().intern("lower-infix?").bindRoot(lowerInfix63, () => {
    return lowerInfix63;
  }, (x) => {
    lowerInfix63 = x;
    return lowerInfix63;
  });
  var lowerInfix = (form, hoist) => {
    var __form6 = lowerPairwise(form);
    var ____id85 = __form6;
    var __x82 = ____id85[0];
    var __args24 = cut(____id85, 1);
    return lower(reduce((a, b) => {
      return [__x82, b, a];
    }, reverse(__args24)), hoist);
  };
  _G._42ns42().intern("lower-infix").bindRoot(lowerInfix, () => {
    return lowerInfix;
  }, (x) => {
    lowerInfix = x;
    return lowerInfix;
  });
  var lowerSpecial = (__x83, hoist) => {
    var ____id86 = __x83;
    var __name19 = ____id86[0];
    var __args25 = cut(____id86, 1);
    var __args151 = map((x) => {
      return lower(x, hoist);
    }, __args25);
    var __form7 = join([__name19], __args151);
    return add(hoist, __form7);
  };
  _G._42ns42().intern("lower-special").bindRoot(lowerSpecial, () => {
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
            var ____id87 = form;
            var __x84 = ____id87[0];
            var __args26 = cut(____id87, 1);
            if (__x84 === "do") {
              return lowerDo(__args26, hoist, stmt63, tail63);
            } else {
              if (__x84 === "%call") {
                return lower(__args26, hoist, stmt63, tail63);
              } else {
                if (__x84 === "%set") {
                  return lowerSet(__args26, hoist, stmt63, tail63);
                } else {
                  if (__x84 === "%if") {
                    return lowerIf(__args26, hoist, stmt63, tail63);
                  } else {
                    if (__x84 === "%try") {
                      return lowerTry(__args26, hoist, tail63);
                    } else {
                      if (__x84 === "%condition-case") {
                        return lowerConditionCase(__args26, hoist, stmt63, tail63);
                      } else {
                        if (__x84 === "while") {
                          return lowerWhile(__args26, hoist);
                        } else {
                          if (__x84 === "%for") {
                            return lowerFor(__args26, hoist);
                          } else {
                            if (__x84 === "%table") {
                              return lowerTable(__args26, hoist, stmt63, tail63);
                            } else {
                              if (__x84 === "%class") {
                                return lowerClass(__args26, hoist, stmt63, tail63);
                              } else {
                                if (__x84 === "%function") {
                                  return lowerFunction(__args26);
                                } else {
                                  if (__x84 === "%local-function" || __x84 === "%global-function") {
                                    return lowerDefinition(__x84, __args26, hoist);
                                  } else {
                                    if (in63(__x84, ["and", "or"])) {
                                      return lowerShort(__x84, __args26, hoist);
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
  _G._42ns42().intern("lower").bindRoot(lower, () => {
    return lower;
  }, (x) => {
    lower = x;
    return lower;
  });
  _G.lower = lower;
  var expand = (form) => {
    return lower(macroexpand(form));
  };
  _G._42ns42().intern("expand").bindRoot(expand, () => {
    return expand;
  }, (x) => {
    expand = x;
    return expand;
  });
  _G.expand = expand;
  var vm = require("vm");
  _G._42ns42().intern("vm").bindRoot(vm, () => {
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
  _G._42ns42().intern("context").bindRoot(context, () => {
    return context;
  }, (x) => {
    context = x;
    return context;
  });
  var sandbox = context(_G);
  _G._42ns42().intern("sandbox").bindRoot(sandbox, () => {
    return sandbox;
  }, (x) => {
    sandbox = x;
    return sandbox;
  });
  var run = (code, sandbox) => {
    return vm.runInContext(code, sandbox || _G);
  };
  _G._42ns42().intern("run").bindRoot(run, () => {
    return run;
  }, (x) => {
    run = x;
    return run;
  });
  var _eval = (form) => {
    var __code = compile(expand(["%set", "%result", form]));
    return run(__code);
  };
  _G._42ns42().intern("eval").bindRoot(_eval, () => {
    return _eval;
  }, (x) => {
    _eval = x;
    return _eval;
  });
  _G["eval"] = _eval;
  var immediateCall63 = (x) => {
    return obj63(x) && obj63(hd(x)) && hd(hd(x)) === "%function";
  };
  _G._42ns42().intern("immediate-call?").bindRoot(immediateCall63, () => {
    return immediateCall63;
  }, (x) => {
    immediateCall63 = x;
    return immediateCall63;
  });
  _G.immediateCall63 = immediateCall63;
  setenv("%call", {["_stash"]: true, ["special"]: (f, ...__r691) => {
    var ____r691 = unstash(__r691);
    var __f2 = destash33(f, ____r691);
    var ____id88 = ____r691;
    var __args27 = cut(____id88, 0);
    return compileCall(__f2, __args27);
  }});
  setenv("%brackets", {["_stash"]: true, ["special"]: (...args) => {
    var __args28 = unstash(args);
    return "[" + inner(compileArgs(__args28)) + "]";
  }});
  setenv("do", {["_stash"]: true, ["special"]: (...forms) => {
    var __forms = unstash(forms);
    var __s5 = "";
    var ____x85 = __forms;
    var ____i54 = 0;
    while (____i54 < _35(____x85)) {
      var __x86 = ____x85[____i54];
      __s5 = __s5 + compile(__x86, {["_stash"]: true, ["stmt"]: true});
      if (! atom63(__x86)) {
        if (hd(__x86) === "return" || hd(__x86) === "break") {
          break;
        }
      }
      ____i54 = ____i54 + 1;
    }
    return __s5;
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%if", {["_stash"]: true, ["special"]: (cond, cons, alt) => {
    var __cond3 = compile(cond);
    indentLevel = indentLevel + 1;
    var ____x87 = compile(cons, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __cons = ____x87;
    var __e79;
    if (alt) {
      indentLevel = indentLevel + 1;
      var ____x88 = compile(alt, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      __e79 = ____x88;
    }
    var __alt = __e79;
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
    var __e42 = unique("e");
    var __ind5 = indentation();
    indentLevel = indentLevel + 1;
    var ____x91 = compile(form, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body47 = ____x91;
    var __hf = ["return", ["%array", false, __e42]];
    indentLevel = indentLevel + 1;
    var ____x92 = compile(__hf, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __h = ____x92;
    return __ind5 + "try {\n" + __body47 + __ind5 + "}\n" + __ind5 + "catch (" + __e42 + ") {\n" + __h + __ind5 + "}\n";
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%condition-case", {["_stash"]: true, ["special"]: (e, form, ...__r696) => {
    var ____r696 = unstash(__r696);
    var __e43 = destash33(e, ____r696);
    var __form8 = destash33(form, ____r696);
    var ____id89 = ____r696;
    var __clauses3 = cut(____id89, 0);
    var __ind6 = indentation();
    indentLevel = indentLevel + 1;
    var ____x93 = compile(__form8, {["_stash"]: true, ["stmt"]: true});
    indentLevel = indentLevel - 1;
    var __body48 = ____x93;
    var __str = __ind6 + "try {\n" + __body48 + __ind6 + "}";
    var __form9 = [];
    var ____x94 = __clauses3;
    var ____i55 = 0;
    while (____i55 < _35(____x94)) {
      var __x95 = ____x94[____i55];
      if (hd(__x95) === "catch") {
        var ____id90 = __x95;
        var ___2 = ____id90[0];
        var __type1 = ____id90[1];
        var __body49 = ____id90[2];
        var __e80;
        if (boolean63(__type1)) {
          __e80 = __type1;
        } else {
          __e80 = ["instanceof", __e43, __type1];
        }
        add(__form9, __e80);
        add(__form9, __body49);
      }
      ____i55 = ____i55 + 1;
    }
    if (! none63(__form9)) {
      add(__form9, ["%throw", __e43]);
      var __expr5 = hd(expandIf(__form9));
      indentLevel = indentLevel + 1;
      var ____x96 = compile(__expr5, {["_stash"]: true, ["stmt"]: true});
      indentLevel = indentLevel - 1;
      var __h1 = ____x96;
      __str = __str + " catch (" + __e43 + ") {\n" + __h1 + __ind6 + "}";
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
  setenv("%function", {["_stash"]: true, ["special"]: (args, body, ...__r700) => {
    var ____r700 = unstash(__r700);
    var __args29 = destash33(args, ____r700);
    var __body51 = destash33(body, ____r700);
    var ____id91 = ____r700;
    var __infix1 = ____id91["infix"];
    var __prefix3 = ____id91["prefix"];
    var __e81;
    if (__prefix3) {
      __e81 = undefined;
    } else {
      __e81 = "=>";
    }
    return compileFunction(__args29, __body51, {["_stash"]: true, ["infix"]: __e81, ["prefix"]: __prefix3});
  }});
  setenv("%global-function", {["_stash"]: true, ["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("%local-function", {["_stash"]: true, ["special"]: (name, args, body) => {
    return compile(["%local", name, ["%function", args, body]], {["_stash"]: true, ["stmt"]: true});
  }, ["stmt"]: true, ["tr"]: true});
  setenv("return", {["_stash"]: true, ["special"]: (x) => {
    var __e82;
    if (nil63(x)) {
      __e82 = "return";
    } else {
      __e82 = "return " + compile(x);
    }
    var __x98 = __e82;
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
    var __e44 = "throw " + compile(["new", ["Error", x]]);
    return indentation() + __e44;
  }, ["stmt"]: true});
  setenv("%local", {["_stash"]: true, ["special"]: (name, value) => {
    var __id92 = compile(name);
    var __value1 = compile(value);
    var __e83;
    if (is63(value)) {
      __e83 = " = " + __value1;
    } else {
      __e83 = "";
    }
    var __rh3 = __e83;
    var __keyword = "var ";
    var __ind7 = indentation();
    return __ind7 + __keyword + __id92 + __rh3;
  }, ["stmt"]: true});
  setenv("%set", {["_stash"]: true, ["special"]: (lh, rh) => {
    if (fqn63(lh)) {
      return compile(fqn(lh, rh));
    } else {
      var __lh3 = compile(lh);
      var __e84;
      if (nil63(rh)) {
        __e84 = "nil";
      } else {
        __e84 = rh;
      }
      var __rh4 = compile(__e84);
      return indentation() + __lh3 + " = " + __rh4;
    }
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
      var __e85;
      if (numeric63(__k40)) {
        __e85 = parseInt(__k40);
      } else {
        __e85 = __k40;
      }
      var __k41 = __e85;
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
    var ____i57 = 0;
    while (____i57 < _35(____x102)) {
      var ____id93 = ____x102[____i57];
      var __k42 = ____id93[0];
      var __v31 = ____id93[1];
      __s8 = __s8 + __c8 + key(__k42) + __sep + compile(__v31);
      __c8 = ", ";
      ____i57 = ____i57 + 1;
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
    var ____i58 = 0;
    while (____i58 < _35(____x104)) {
      var __x105 = ____x104[____i58];
      if (atom63(__x105)) {
        __s9 = __s9 + __c9 + __ind8 + key(__x105) + __sep1 + compile(__x105);
      } else {
        if (_35(__x105) <= 2) {
          var ____id94 = __x105;
          var __name20 = ____id94[0];
          var __v32 = ____id94[1];
          __s9 = __s9 + __c9 + __ind8 + key(__name20) + __sep1 + compile(__v32);
        } else {
          var ____id95 = __x105;
          var __prefix4 = ____id95[0];
          var __name21 = ____id95[1];
          var __args30 = ____id95[2];
          var __body52 = cut(____id95, 3);
          var __e86;
          if (in63(__prefix4, ["define", "def"])) {
            __e86 = "";
          } else {
            __e86 = __prefix4;
          }
          var __prefix5 = __e86;
          var __e87;
          if (some63(__body52)) {
            __e87 = compileFunction(__args30, join(["do"], __body52), {["_stash"]: true, ["name"]: key(__name21), ["prefix"]: __prefix5});
          } else {
            __e87 = key(__name21) + __sep1 + compile(__args30);
          }
          var __h3 = __e87;
          __s9 = __s9 + __c9 + __ind8 + __h3;
        }
      }
      __c9 = inner(__comma) + "\n";
      ____i58 = ____i58 + 1;
    }
    var ____x103;
    indentLevel = indentLevel - 1;
    return __s9 + "\n" + indentation() + "}";
  }});
  setenv("%class", {["_stash"]: true, ["special"]: (name, ...__r711) => {
    var ____r711 = unstash(__r711);
    var __name22 = destash33(name, ____r711);
    var ____id96 = ____r711;
    var __body53 = cut(____id96, 0);
    var __e88;
    if (atom63(__name22)) {
      __e88 = [__name22];
    } else {
      __e88 = __name22;
    }
    var ____id97 = __e88;
    var __name23 = ____id97[0];
    var __parent2 = ____id97[1];
    var __e89;
    if (__name23) {
      __e89 = [__name23, "\" \""];
    } else {
      __e89 = [];
    }
    var __name24 = __e89;
    var __e90;
    if (__parent2) {
      __e90 = ["\"extends \"", __parent2, "\" \""];
    } else {
      __e90 = [];
    }
    var __ext = __e90;
    return compile(join(["%literal", "\"class \""], __name24, __ext, [join({[0]: "%table", ["comma"]: "\"\""}, __body53)]));
  }});
  setenv("%literal", {["_stash"]: true, ["special"]: (...args) => {
    var __args31 = unstash(args);
    var __s10 = "";
    var ____x106 = __args31;
    var ____i59 = 0;
    while (____i59 < _35(____x106)) {
      var __x107 = ____x106[____i59];
      if (stringLiteral63(__x107)) {
        __s10 = __s10 + _eval(__x107);
      } else {
        __s10 = __s10 + compile(__x107);
      }
      ____i59 = ____i59 + 1;
    }
    return __s10;
  }});
  setenv("%statement", {["_stash"]: true, ["special"]: (...args) => {
    var __args32 = unstash(args);
    var __s111 = indentation();
    var ____x108 = __args32;
    var ____i60 = 0;
    while (____i60 < _35(____x108)) {
      var __x109 = ____x108[____i60];
      if (stringLiteral63(__x109)) {
        __s111 = __s111 + _eval(__x109);
      } else {
        __s111 = __s111 + compile(__x109);
      }
      ____i60 = ____i60 + 1;
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
  _G._42ns42("dax.reader");
  delimiters = {["{"]: true, ["}"]: true, ["["]: true, ["]"]: true, ["("]: true, [")"]: true, [";"]: true, ["\r"]: true, ["\n"]: true};
  _G._42ns42().intern("delimiters").bindRoot(delimiters, () => {
    return delimiters;
  }, (x) => {
    delimiters = x;
    return delimiters;
  });
  _G.delimiters = delimiters;
  whitespace = {[" "]: true, ["\t"]: true, ["\r"]: true, ["\n"]: true};
  _G._42ns42().intern("whitespace").bindRoot(whitespace, () => {
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
  _G._42ns42().intern("stream").bindRoot(stream, () => {
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
  _G._42ns42().intern("peek-char").bindRoot(peekChar, () => {
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
  _G._42ns42().intern("read-char").bindRoot(readChar, () => {
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
  _G._42ns42().intern("skip-non-code").bindRoot(skipNonCode, () => {
    return skipNonCode;
  }, (x) => {
    skipNonCode = x;
    return skipNonCode;
  });
  _G.skipNonCode = skipNonCode;
  readTable = {};
  _G._42ns42().intern("read-table").bindRoot(readTable, () => {
    return readTable;
  }, (x) => {
    readTable = x;
    return readTable;
  });
  _G.readTable = readTable;
  eof = {};
  _G._42ns42().intern("eof").bindRoot(eof, () => {
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
  _G._42ns42().intern("read").bindRoot(read, () => {
    return read;
  }, (x) => {
    read = x;
    return read;
  });
  _G.read = read;
  var readAll = (s) => {
    var __l9 = [];
    while (true) {
      var __form10 = read(s);
      if (__form10 === eof) {
        break;
      }
      add(__l9, __form10);
    }
    return __l9;
  };
  _G._42ns42().intern("read-all").bindRoot(readAll, () => {
    return readAll;
  }, (x) => {
    readAll = x;
    return readAll;
  });
  _G.readAll = readAll;
  var readString = (str, more) => {
    var __x110 = read(stream(str, more));
    if (!( __x110 === eof)) {
      return __x110;
    }
  };
  _G._42ns42().intern("read-string").bindRoot(readString, () => {
    return readString;
  }, (x) => {
    readString = x;
    return readString;
  });
  _G.readString = readString;
  var key63 = (atom) => {
    return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
  };
  _G._42ns42().intern("key?").bindRoot(key63, () => {
    return key63;
  }, (x) => {
    key63 = x;
    return key63;
  });
  var expected = (s, c) => {
    var ____id99 = s;
    var __more = ____id99["more"];
    var __pos = ____id99["pos"];
    var __id100 = __more;
    var __e91;
    if (__id100) {
      __e91 = __id100;
    } else {
      throw new Error("Expected " + c + " at " + __pos);
      __e91 = undefined;
    }
    return __e91;
  };
  _G._42ns42().intern("expected").bindRoot(expected, () => {
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
  _G._42ns42().intern("wrap").bindRoot(wrap, () => {
    return wrap;
  }, (x) => {
    wrap = x;
    return wrap;
  });
  _G.wrap = wrap;
  var hexPrefix63 = (str) => {
    var __e92;
    if (code(str, 0) === 45) {
      __e92 = 1;
    } else {
      __e92 = 0;
    }
    var __i61 = __e92;
    var __id101 = code(str, __i61) === 48;
    var __e93;
    if (__id101) {
      __i61 = __i61 + 1;
      var __n38 = code(str, __i61);
      __e93 = __n38 === 120 || __n38 === 88;
    } else {
      __e93 = __id101;
    }
    return __e93;
  };
  _G._42ns42().intern("hex-prefix?").bindRoot(hexPrefix63, () => {
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
  _G._42ns42().intern("maybe-number").bindRoot(maybeNumber, () => {
    return maybeNumber;
  }, (x) => {
    maybeNumber = x;
    return maybeNumber;
  });
  _G.maybeNumber = maybeNumber;
  var real63 = (x) => {
    return number63(x) && ! nan63(x) && ! inf63(x);
  };
  _G._42ns42().intern("real?").bindRoot(real63, () => {
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
          return __str1;
        }
      }
    }
  };
  readTable["("] = (s) => {
    readChar(s);
    var __r763 = undefined;
    var __l10 = [];
    while (nil63(__r763)) {
      skipNonCode(s);
      var __c14 = peekChar(s);
      if (__c14 === ")") {
        readChar(s);
        __r763 = __l10;
      } else {
        if (nil63(__c14)) {
          __r763 = expected(s, ")");
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
    return __r763;
  };
  readTable[")"] = (s) => {
    throw new Error("Unexpected ) at " + s.pos);
  };
  readTable["["] = (s) => {
    readChar(s);
    var __r766 = undefined;
    var __l111 = [];
    while (nil63(__r766)) {
      skipNonCode(s);
      var __c15 = peekChar(s);
      if (__c15 === "]") {
        readChar(s);
        __r766 = join(["brackets"], __l111);
      } else {
        if (nil63(__c15)) {
          __r766 = expected(s, "]");
        } else {
          var __x112 = read(s);
          add(__l111, __x112);
        }
      }
    }
    return __r766;
  };
  readTable["]"] = (s) => {
    throw new Error("Unexpected ] at " + s.pos);
  };
  readTable["{"] = (s) => {
    readChar(s);
    var __r769 = undefined;
    var __l121 = [];
    while (nil63(__r769)) {
      skipNonCode(s);
      var __c16 = peekChar(s);
      if (__c16 === "}") {
        readChar(s);
        __r769 = join(["braces"], __l121);
      } else {
        if (nil63(__c16)) {
          __r769 = expected(s, "}");
        } else {
          var __x113 = read(s);
          add(__l121, __x113);
        }
      }
    }
    return __r769;
  };
  readTable["}"] = (s) => {
    throw new Error("Unexpected } at " + s.pos);
  };
  readTable["\""] = (s) => {
    readChar(s);
    var __r772 = undefined;
    var __str2 = "\"";
    while (nil63(__r772)) {
      var __c17 = peekChar(s);
      if (__c17 === "\"") {
        __r772 = __str2 + readChar(s);
      } else {
        if (nil63(__c17)) {
          __r772 = expected(s, "\"");
        } else {
          if (__c17 === "\\") {
            __str2 = __str2 + readChar(s);
          }
          __str2 = __str2 + readChar(s);
        }
      }
    }
    return __r772;
  };
  readTable["|"] = (s) => {
    readChar(s);
    var __r774 = undefined;
    var __str3 = "|";
    while (nil63(__r774)) {
      var __c18 = peekChar(s);
      if (__c18 === "|") {
        __r774 = __str3 + readChar(s);
      } else {
        if (nil63(__c18)) {
          __r774 = expected(s, "|");
        } else {
          __str3 = __str3 + readChar(s);
        }
      }
    }
    return __r774;
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
    var __e94;
    if (__c19 === "\\") {
      __e94 = readChar(s);
    } else {
      __e94 = __c19;
    }
    var __c131 = __e94;
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
  _G._42ns42("dax.system");
  var fs = require("fs");
  _G._42ns42().intern("fs").bindRoot(fs, () => {
    return fs;
  }, (x) => {
    fs = x;
    return fs;
  });
  var childProcess = require("child_process");
  _G._42ns42().intern("child-process").bindRoot(childProcess, () => {
    return childProcess;
  }, (x) => {
    childProcess = x;
    return childProcess;
  });
  var path = require("path");
  _G._42ns42().intern("path").bindRoot(path, () => {
    return path;
  }, (x) => {
    path = x;
    return path;
  });
  var process = require("process");
  _G._42ns42().intern("process").bindRoot(process, () => {
    return process;
  }, (x) => {
    process = x;
    return process;
  });
  var readFile = (path, __x114) => {
    var __e95;
    if (is63(__x114)) {
      __e95 = __x114;
    } else {
      __e95 = "text";
    }
    var __mode = __e95;
    if (__mode === "text") {
      return fs.readFileSync(path, "utf8").replace(/\r/g, "");
    } else {
      return fs.readFileSync(path);
    }
  };
  _G._42ns42().intern("read-file").bindRoot(readFile, () => {
    return readFile;
  }, (x) => {
    readFile = x;
    return readFile;
  });
  var writeFile = (path, data) => {
    return fs.writeFileSync(path, data, "utf8");
  };
  _G._42ns42().intern("write-file").bindRoot(writeFile, () => {
    return writeFile;
  }, (x) => {
    writeFile = x;
    return writeFile;
  });
  var fileExists63 = (path) => {
    return fs.existsSync(path, "utf8") && fs.statSync(path).isFile();
  };
  _G._42ns42().intern("file-exists?").bindRoot(fileExists63, () => {
    return fileExists63;
  }, (x) => {
    fileExists63 = x;
    return fileExists63;
  });
  var directoryExists63 = (path) => {
    return fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory();
  };
  _G._42ns42().intern("directory-exists?").bindRoot(directoryExists63, () => {
    return directoryExists63;
  }, (x) => {
    directoryExists63 = x;
    return directoryExists63;
  });
  var pathSeparator = path.sep;
  _G._42ns42().intern("path-separator").bindRoot(pathSeparator, () => {
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
  _G._42ns42().intern("path-join").bindRoot(pathJoin, () => {
    return pathJoin;
  }, (x) => {
    pathJoin = x;
    return pathJoin;
  });
  var getEnvironmentVariable = (name) => {
    return process.env[name];
  };
  _G._42ns42().intern("get-environment-variable").bindRoot(getEnvironmentVariable, () => {
    return getEnvironmentVariable;
  }, (x) => {
    getEnvironmentVariable = x;
    return getEnvironmentVariable;
  });
  var setEnvironmentVariable = (name, value) => {
    process.env[name] = value;
    return process.env[name];
  };
  _G._42ns42().intern("set-environment-variable").bindRoot(setEnvironmentVariable, () => {
    return setEnvironmentVariable;
  }, (x) => {
    setEnvironmentVariable = x;
    return setEnvironmentVariable;
  });
  var write = (x, cb) => {
    var __out = process.stdout;
    return __out.write(x, cb);
  };
  _G._42ns42().intern("write").bindRoot(write, () => {
    return write;
  }, (x) => {
    write = x;
    return write;
  });
  var exit = (code) => {
    return process.exit(code);
  };
  _G._42ns42().intern("exit").bindRoot(exit, () => {
    return exit;
  }, (x) => {
    exit = x;
    return exit;
  });
  var argv = cut(process.argv, 2);
  _G._42ns42().intern("argv").bindRoot(argv, () => {
    return argv;
  }, (x) => {
    argv = x;
    return argv;
  });
  var reload = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
  };
  _G._42ns42().intern("reload").bindRoot(reload, () => {
    return reload;
  }, (x) => {
    reload = x;
    return reload;
  });
  var shell = (command) => {
    return childProcess.execSync(command).toString();
  };
  _G._42ns42().intern("shell").bindRoot(shell, () => {
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
  _G._42ns42("dax.main");
  var reader = _G.reader;
  _G._42ns42().intern("reader").bindRoot(reader, () => {
    return reader;
  }, (x) => {
    reader = x;
    return reader;
  });
  var compiler = _G.compiler;
  _G._42ns42().intern("compiler").bindRoot(compiler, () => {
    return compiler;
  }, (x) => {
    compiler = x;
    return compiler;
  });
  var system = _G.system;
  _G._42ns42().intern("system").bindRoot(system, () => {
    return system;
  }, (x) => {
    system = x;
    return system;
  });
  var evalPrint = (form) => {
    var ____id102 = (() => {
      try {
        return [true, compiler["eval"](form)];
      }
      catch (__e99) {
        return [false, __e99];
      }
    })();
    var __ok1 = ____id102[0];
    var __v34 = ____id102[1];
    if (! __ok1) {
      return print(__v34.stack);
    } else {
      if (is63(__v34)) {
        return print(str(__v34));
      }
    }
  };
  _G._42ns42().intern("eval-print").bindRoot(evalPrint, () => {
    return evalPrint;
  }, (x) => {
    evalPrint = x;
    return evalPrint;
  });
  var rep = (s) => {
    return evalPrint(reader.readString(s));
  };
  _G._42ns42().intern("rep").bindRoot(rep, () => {
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
  _G._42ns42().intern("repl").bindRoot(repl, () => {
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
        var ____x115 = body;
        var ____i62 = 0;
        while (____i62 < _35(____x115)) {
          var __x116 = ____x115[____i62];
          __s13 = __s13 + str(__x116) + "\n\n";
          ____i62 = ____i62 + 1;
        }
        return __s13 + ")";
      }
    }
  };
  _G._42ns42().intern("pp-to-string").bindRoot(ppToString, () => {
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
  _G._42ns42().intern("pp").bindRoot(pp, () => {
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
  _G._42ns42().intern("read-file").bindRoot(readFile, () => {
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
  _G._42ns42().intern("expand-file").bindRoot(expandFile, () => {
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
  _G._42ns42().intern("compile-file").bindRoot(compileFile, () => {
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
    var __x117 = _G.exports;
    compiler.run(__code1);
    _G.exports = __prev;
    return __x117;
  };
  _G._42ns42().intern("load").bindRoot(load, () => {
    return load;
  }, (x) => {
    load = x;
    return load;
  });
  _G.load = load;
  var scriptFile63 = (path) => {
    return !( "-" === char(path, 0) || ".js" === clip(path, _35(path) - 3));
  };
  _G._42ns42().intern("script-file?").bindRoot(scriptFile63, () => {
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
  _G._42ns42().intern("run-file").bindRoot(runFile, () => {
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
  _G._42ns42().intern("usage").bindRoot(usage, () => {
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
        var __pre1 = [];
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
              var __val2 = __argv[__i63];
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
          __i63 = __i63 + 1;
        }
        var ____x118 = __pre1;
        var ____i64 = 0;
        while (____i64 < _35(____x118)) {
          var __file = ____x118[____i64];
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
          var __e96;
          if (__op2 === "expand") {
            __e96 = ppToString(expandFile(__input));
          } else {
            var __e97;
            if (__op2 === "read") {
              __e97 = ppToString(readFile(__input));
            } else {
              __e97 = compileFile(__input);
            }
            __e96 = __e97;
          }
          var __code2 = __e96;
          if (nil63(__output) || __output === "-") {
            return print(__code2);
          } else {
            return system.writeFile(__output, __code2);
          }
        }
      }
    }
  };
  _G._42ns42().intern("main").bindRoot(main, () => {
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
