(function ()
  nexus = {}
end)();
(function ()
  local function nil63(x)
    return(x == nil)
  end
  local function is63(x)
    return(not nil63(x))
  end
  local math = math
  local abs = math.abs
  local acos = math.acos
  local asin = math.asin
  local atan = math.atan
  local atan2 = math.atan2
  local ceil = math.ceil
  local cos = math.cos
  local floor = math.floor
  local log = math.log
  local log10 = math.log10
  local max = math.max
  local min = math.min
  local pow = math.pow
  local random = math.random
  local sin = math.sin
  local sinh = math.sinh
  local sqrt = math.sqrt
  local tan = math.tan
  local tanh = math.tanh
  local function length(x)
    return(#x)
  end
  local function none63(x)
    return(length(x) == 0)
  end
  local function some63(x)
    return(length(x) > 0)
  end
  local function in63(x, l)
    local _g22 = l
    local _g23 = 0
    while _g23 < length(_g22) do
      local y = _g22[_g23 + 1]
      if x == y then
        return(true)
      end
      _g23 = _g23 + 1
    end
  end
  local function hd(l)
    return(l[1])
  end
  local function sd(l)
    return(l[2])
  end
  local function td(l)
    return(l[3])
  end
  local function string63(x)
    return(type(x) == "string")
  end
  local function number63(x)
    return(type(x) == "number")
  end
  local function boolean63(x)
    return(type(x) == "boolean")
  end
  local function function63(x)
    return(type(x) == "function")
  end
  local function composite63(x)
    return(type(x) == "table")
  end
  local function atom63(x)
    return(not composite63(x))
  end
  local function table63(x)
    return(composite63(x) and nil63(hd(x)))
  end
  local function list63(x)
    return(composite63(x) and is63(hd(x)))
  end
  local function substring(str, from, upto)
    return(string.sub(str, from + 1, upto))
  end
  local function sublist(l, from, upto)
    local i = from or 0
    local j = 0
    local _g24 = upto or length(l)
    local l2 = {}
    while i < _g24 do
      l2[j + 1] = l[i + 1]
      i = i + 1
      j = j + 1
    end
    return(l2)
  end
  local function sub(x, from, upto)
    local _g25 = from or 0
    if string63(x) then
      return(substring(x, _g25, upto))
    else
      local l = sublist(x, _g25, upto)
      local _g26 = x
      local k = nil
      for k in next, _g26 do
        if not number63(k) then
          local v = _g26[k]
          l[k] = v
        end
      end
      return(l)
    end
  end
  local function inner(x)
    return(sub(x, 1, length(x) - 1))
  end
  local function tl(l)
    return(sub(l, 1))
  end
  local function char(str, n)
    return(sub(str, n, n + 1))
  end
  local function code(str, n)
    local _g27
    if n then
      _g27 = n + 1
    end
    return(string.byte(str, _g27))
  end
  local function string_literal63(x)
    return(string63(x) and char(x, 0) == "\"")
  end
  local function id_literal63(x)
    return(string63(x) and char(x, 0) == "|")
  end
  local function add(l, x)
    return(table.insert(l, x))
  end
  local function drop(l)
    return(table.remove(l))
  end
  local function last(l)
    return(l[length(l) - 1 + 1])
  end
  local function reverse(l)
    local l1 = sub(l, length(l))
    local i = length(l) - 1
    while i >= 0 do
      add(l1, l[i + 1])
      i = i - 1
    end
    return(l1)
  end
  local function join(l1, l2)
    if nil63(l2) and nil63(l1) then
      return({})
    else
      if nil63(l1) then
        return(join({}, l2))
      else
        if nil63(l2) then
          return(join(l1, {}))
        else
          local l = {}
          local skip63 = false
          if not skip63 then
            local i = 0
            local len = length(l1)
            while i < len do
              l[i + 1] = l1[i + 1]
              i = i + 1
            end
            while i < len + length(l2) do
              l[i + 1] = l2[i - len + 1]
              i = i + 1
            end
          end
          local _g28 = l1
          local k = nil
          for k in next, _g28 do
            if not number63(k) then
              local v = _g28[k]
              l[k] = v
            end
          end
          local _g29 = l2
          local k = nil
          for k in next, _g29 do
            if not number63(k) then
              local v = _g29[k]
              l[k] = v
            end
          end
          return(l)
        end
      end
    end
  end
  local function reduce(f, x)
    if none63(x) then
      return(x)
    else
      if length(x) == 1 then
        return(hd(x))
      else
        return(f(hd(x), reduce(f, tl(x))))
      end
    end
  end
  local function keep(f, l)
    local l1 = {}
    local _g30 = l
    local _g31 = 0
    while _g31 < length(_g30) do
      local x = _g30[_g31 + 1]
      if f(x) then
        add(l1, x)
      end
      _g31 = _g31 + 1
    end
    return(l1)
  end
  local function find(f, l)
    local _g32 = l
    local _g33 = 0
    while _g33 < length(_g32) do
      local x = _g32[_g33 + 1]
      local _g34 = f(x)
      if _g34 then
        return(_g34)
      end
      _g33 = _g33 + 1
    end
  end
  local function pairwise(l)
    local i = 0
    local l1 = {}
    while i < length(l) do
      add(l1, {l[i + 1], l[i + 1 + 1]})
      i = i + 2
    end
    return(l1)
  end
  local function sort(l, f)
    table.sort(l, f)
    return(l)
  end
  local function iterate(f, count)
    local i = 0
    while i < count do
      f(i)
      i = i + 1
    end
  end
  local function replicate(n, x)
    local l = {}
    iterate(function ()
      return(add(l, x))
    end, n)
    return(l)
  end
  local function splice(x)
    return({_splice = true, value = x})
  end
  local function splice63(x)
    return(table63(x) and x._splice)
  end
  local function mapl(f, l)
    local l1 = {}
    local _g35 = l
    local _g36 = 0
    while _g36 < length(_g35) do
      local x = _g35[_g36 + 1]
      local _g37 = f(x)
      if splice63(_g37) then
        l1 = join(l1, _g37.value)
      else
        if is63(_g37) then
          add(l1, _g37)
        end
      end
      _g36 = _g36 + 1
    end
    return(l1)
  end
  local function map(f, t)
    local l = mapl(f, t)
    local _g38 = t
    local k = nil
    for k in next, _g38 do
      if not number63(k) then
        local v = _g38[k]
        local x = f(v)
        if splice63(x) then
          l[k] = x.value
        else
          if is63(x) then
            l[k] = x
          end
        end
      end
    end
    return(l)
  end
  local function flat(x)
    if atom63(x) then
      return(x)
    else
      return(map(function (a)
        if list63(a) then
          return(splice(flat(a)))
        else
          return(a)
        end
      end, x))
    end
  end
  local function flat1(x)
    if atom63(x) then
      return(x)
    else
      return(map(function (a)
        if list63(a) then
          return(splice(a))
        else
          return(a)
        end
      end, x))
    end
  end
  local function keys63(t)
    local k63 = false
    local _g39 = t
    local k = nil
    for k in next, _g39 do
      if not number63(k) then
        local v = _g39[k]
        k63 = true
        break
      end
    end
    return(k63)
  end
  local function empty63(t)
    return(none63(t) and not keys63(t))
  end
  local function stash(args)
    if keys63(args) then
      local p = {_stash = true}
      local _g40 = args
      local k = nil
      for k in next, _g40 do
        if not number63(k) then
          local v = _g40[k]
          p[k] = v
        end
      end
      return(join(args, {p}))
    else
      return(args)
    end
  end
  local function unstash(args)
    if none63(args) then
      return({})
    else
      local l = last(args)
      if table63(l) and l._stash then
        local args1 = sub(args, 0, length(args) - 1)
        local _g41 = l
        local k = nil
        for k in next, _g41 do
          if not number63(k) then
            local v = _g41[k]
            if not (k == "_stash") then
              args1[k] = v
            end
          end
        end
        return(args1)
      else
        return(args)
      end
    end
  end
  local function extend(t, ...)
    local xs = unstash({...})
    local _g42 = sub(xs, 0)
    return(join(t, _g42))
  end
  local function exclude(t, ...)
    local keys = unstash({...})
    local _g43 = sub(keys, 0)
    local t1 = sublist(t)
    local _g44 = t
    local k = nil
    for k in next, _g44 do
      if not number63(k) then
        local v = _g44[k]
        if not _g43[k] then
          t1[k] = v
        end
      end
    end
    return(t1)
  end
  local function search(str, pattern, start)
    local _g46
    if start then
      _g46 = start + 1
    end
    local _g45 = _g46
    local i = string.find(str, pattern, start, true)
    return(i and i - 1)
  end
  local function split(str, sep)
    if str == "" or sep == "" then
      return({})
    else
      local strs = {}
      while true do
        local i = search(str, sep)
        if nil63(i) then
          break
        else
          add(strs, sub(str, 0, i))
          str = sub(str, i + 1)
        end
      end
      add(strs, str)
      return(strs)
    end
  end
  local function cat(...)
    local xs = unstash({...})
    local _g47 = sub(xs, 0)
    if none63(_g47) then
      return("")
    else
      return(reduce(function (a, b)
        return(a .. b)
      end, _g47))
    end
  end
  local function _43(...)
    local xs = unstash({...})
    local _g48 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a + b)
    end, _g48))
  end
  local function _(...)
    local xs = unstash({...})
    local _g49 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b - a)
    end, reverse(_g49)))
  end
  local function _42(...)
    local xs = unstash({...})
    local _g50 = sub(xs, 0)
    return(reduce(function (a, b)
      return(a * b)
    end, _g50))
  end
  local function _47(...)
    local xs = unstash({...})
    local _g51 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b / a)
    end, reverse(_g51)))
  end
  local function _37(...)
    local xs = unstash({...})
    local _g52 = sub(xs, 0)
    return(reduce(function (a, b)
      return(b % a)
    end, reverse(_g52)))
  end
  local function _62(a, b)
    return(a > b)
  end
  local function _60(a, b)
    return(a < b)
  end
  local function _61(a, b)
    return(a == b)
  end
  local function _6261(a, b)
    return(a >= b)
  end
  local function _6061(a, b)
    return(a <= b)
  end
  local function read_file(path)
    local f = io.open(path)
    return(f.read(f, "*a"))
  end
  local function write_file(path, data)
    local f = io.open(path, "w")
    return(f.write(f, data))
  end
  local function write(x)
    return(io.write(x))
  end
  local function exit(code)
    return(os.exit(code))
  end
  local function number(str)
    return(tonumber(str))
  end
  local function string(x)
    if nil63(x) then
      return("nil")
    else
      if boolean63(x) then
        if x then
          return("true")
        else
          return("false")
        end
      else
        if function63(x) then
          return("#<function>")
        else
          if atom63(x) then
            return(x .. "")
          else
            local str = "("
            local x1 = sub(x)
            local _g53 = x
            local k = nil
            for k in next, _g53 do
              if not number63(k) then
                local v = _g53[k]
                add(x1, k .. ":")
                add(x1, v)
              end
            end
            local _g54 = x1
            local i = 0
            while i < length(_g54) do
              local y = _g54[i + 1]
              str = str .. string(y)
              if i < length(x1) - 1 then
                str = str .. " "
              end
              i = i + 1
            end
            return(str .. ")")
          end
        end
      end
    end
  end
  local function apply(f, args)
    local _g55 = stash(args)
    return(f(unpack(_g55)))
  end
  local id_count = 0
  local function make_id()
    id_count = id_count + 1
    return("_g" .. id_count)
  end
  local function _37message_handler(msg)
    local i = search(msg, ": ")
    return(sub(msg, i + 2))
  end
  local function toplevel63()
    return(length(environment) == 1)
  end
  local function module_key(spec)
    if atom63(spec) then
      return(string(spec))
    else
      return(reduce(function (a, b)
        return(module_key(a) .. "/" .. module_key(b))
      end, spec))
    end
  end
  local function module(spec)
    return(modules[module_key(spec)])
  end
  local function setenv(k, ...)
    local keys = unstash({...})
    local _g56 = sub(keys, 0)
    if string63(k) then
      local frame = last(environment)
      local x = frame[k] or {}
      local _g57 = _g56
      local k1 = nil
      for k1 in next, _g57 do
        if not number63(k1) then
          local v = _g57[k1]
          x[k1] = v
        end
      end
      if toplevel63() then
        local m = module(current_module)
        m.export[k] = x
      end
      frame[k] = x
    end
  end
  local _g58 = {}
  nexus["lumen/runtime"] = _g58
  _g58["%"] = _37
  _g58["%message-handler"] = _37message_handler
  _g58["*"] = _42
  _g58["+"] = _43
  _g58["-"] = _
  _g58["/"] = _47
  _g58["<"] = _60
  _g58["<="] = _6061
  _g58["="] = _61
  _g58[">"] = _62
  _g58[">="] = _6261
  _g58.abs = abs
  _g58.acos = acos
  _g58.add = add
  _g58.apply = apply
  _g58.asin = asin
  _g58.atan = atan
  _g58.atan2 = atan2
  _g58["atom?"] = atom63
  _g58["boolean?"] = boolean63
  _g58.cat = cat
  _g58.ceil = ceil
  _g58.char = char
  _g58.code = code
  _g58["composite?"] = composite63
  _g58.cos = cos
  _g58.drop = drop
  _g58["empty?"] = empty63
  _g58.exclude = exclude
  _g58.exit = exit
  _g58.extend = extend
  _g58.find = find
  _g58.flat = flat
  _g58.flat1 = flat1
  _g58.floor = floor
  _g58["function?"] = function63
  _g58.hd = hd
  _g58["id-count"] = id_count
  _g58["id-literal?"] = id_literal63
  _g58["in?"] = in63
  _g58.inner = inner
  _g58["is?"] = is63
  _g58.iterate = iterate
  _g58.join = join
  _g58.keep = keep
  _g58["keys?"] = keys63
  _g58.last = last
  _g58.length = length
  _g58["list?"] = list63
  _g58.log = log
  _g58.log10 = log10
  _g58["make-id"] = make_id
  _g58.map = map
  _g58.mapl = mapl
  _g58.math = math
  _g58.max = max
  _g58.min = min
  _g58.module = module
  _g58["module-key"] = module_key
  _g58["nil?"] = nil63
  _g58["none?"] = none63
  _g58.number = number
  _g58["number?"] = number63
  _g58.pairwise = pairwise
  _g58.pow = pow
  _g58.random = random
  _g58["read-file"] = read_file
  _g58.reduce = reduce
  _g58.replicate = replicate
  _g58.reverse = reverse
  _g58.sd = sd
  _g58.search = search
  _g58.setenv = setenv
  _g58.sin = sin
  _g58.sinh = sinh
  _g58["some?"] = some63
  _g58.sort = sort
  _g58.splice = splice
  _g58["splice?"] = splice63
  _g58.split = split
  _g58.sqrt = sqrt
  _g58.stash = stash
  _g58.string = string
  _g58["string-literal?"] = string_literal63
  _g58["string?"] = string63
  _g58.sub = sub
  _g58.sublist = sublist
  _g58.substring = substring
  _g58["table?"] = table63
  _g58.tan = tan
  _g58.tanh = tanh
  _g58.td = td
  _g58.tl = tl
  _g58["toplevel?"] = toplevel63
  _g58.unstash = unstash
  _g58.write = write
  _g58["write-file"] = write_file
end)();
(function ()
  local _g63 = nexus["lumen/runtime"]
  local _37 = _g63["%"]
  local _37message_handler = _g63["%message-handler"]
  local _42 = _g63["*"]
  local _43 = _g63["+"]
  local _ = _g63["-"]
  local _47 = _g63["/"]
  local _60 = _g63["<"]
  local _6061 = _g63["<="]
  local _61 = _g63["="]
  local _62 = _g63[">"]
  local _6261 = _g63[">="]
  local abs = _g63.abs
  local acos = _g63.acos
  local add = _g63.add
  local apply = _g63.apply
  local asin = _g63.asin
  local atan = _g63.atan
  local atan2 = _g63.atan2
  local atom63 = _g63["atom?"]
  local boolean63 = _g63["boolean?"]
  local cat = _g63.cat
  local ceil = _g63.ceil
  local char = _g63.char
  local code = _g63.code
  local composite63 = _g63["composite?"]
  local cos = _g63.cos
  local drop = _g63.drop
  local empty63 = _g63["empty?"]
  local exclude = _g63.exclude
  local exit = _g63.exit
  local extend = _g63.extend
  local find = _g63.find
  local flat = _g63.flat
  local flat1 = _g63.flat1
  local floor = _g63.floor
  local function63 = _g63["function?"]
  local hd = _g63.hd
  local id_literal63 = _g63["id-literal?"]
  local in63 = _g63["in?"]
  local inner = _g63.inner
  local is63 = _g63["is?"]
  local iterate = _g63.iterate
  local join = _g63.join
  local keep = _g63.keep
  local keys63 = _g63["keys?"]
  local last = _g63.last
  local length = _g63.length
  local list63 = _g63["list?"]
  local log = _g63.log
  local log10 = _g63.log10
  local make_id = _g63["make-id"]
  local map = _g63.map
  local max = _g63.max
  local min = _g63.min
  local module = _g63.module
  local module_key = _g63["module-key"]
  local nil63 = _g63["nil?"]
  local none63 = _g63["none?"]
  local number = _g63.number
  local number63 = _g63["number?"]
  local pairwise = _g63.pairwise
  local pow = _g63.pow
  local random = _g63.random
  local read_file = _g63["read-file"]
  local reduce = _g63.reduce
  local replicate = _g63.replicate
  local reverse = _g63.reverse
  local sd = _g63.sd
  local search = _g63.search
  local setenv = _g63.setenv
  local sin = _g63.sin
  local sinh = _g63.sinh
  local some63 = _g63["some?"]
  local sort = _g63.sort
  local splice = _g63.splice
  local split = _g63.split
  local sqrt = _g63.sqrt
  local stash = _g63.stash
  local string = _g63.string
  local string_literal63 = _g63["string-literal?"]
  local string63 = _g63["string?"]
  local sub = _g63.sub
  local sublist = _g63.sublist
  local substring = _g63.substring
  local table63 = _g63["table?"]
  local tan = _g63.tan
  local tanh = _g63.tanh
  local td = _g63.td
  local tl = _g63.tl
  local toplevel63 = _g63["toplevel?"]
  local unstash = _g63.unstash
  local write = _g63.write
  local write_file = _g63["write-file"]
  local function getenv(k, ...)
    local keys = unstash({...})
    local _g66 = sub(keys, 0)
    if string63(k) then
      local b = find(function (e)
        return(e[k])
      end, reverse(environment))
      if table63(b) then
        local _g67 = nil
        local _g68 = _g66
        local x = nil
        for x in next, _g68 do
          if not number63(x) then
            local _g59 = _g68[x]
            _g67 = x
          end
        end
        if _g67 then
          return(b[_g67])
        else
          return(b)
        end
      end
    end
  end
  local function macro_function(k)
    return(getenv(k, {_stash = true, macro = true}))
  end
  local function macro63(k)
    return(is63(macro_function(k)))
  end
  local function special63(k)
    return(is63(getenv(k, {_stash = true, special = true})))
  end
  local function special_form63(form)
    return(list63(form) and special63(hd(form)))
  end
  local function statement63(k)
    return(special63(k) and getenv(k, {_stash = true, stmt = true}))
  end
  local function symbol_expansion(k)
    return(getenv(k, {_stash = true, symbol = true}))
  end
  local function symbol63(k)
    return(is63(symbol_expansion(k)))
  end
  local function variable63(k)
    local b = find(function (frame)
      return(frame[k] or frame._scope)
    end, reverse(environment))
    return(table63(b) and is63(b.variable))
  end
  local function global63(k)
    return(getenv(k, {_stash = true, global = true}))
  end
  local function bound63(x)
    return(macro63(x) or special63(x) or symbol63(x) or variable63(x) or global63(x))
  end
  local function escape(str)
    local str1 = "\""
    local i = 0
    while i < length(str) do
      local c = char(str, i)
      local _g69
      if c == "\n" then
        _g69 = "\\n"
      else
        local _g70
        if c == "\"" then
          _g70 = "\\\""
        else
          local _g71
          if c == "\\" then
            _g71 = "\\\\"
          else
            _g71 = c
          end
          _g70 = _g71
        end
        _g69 = _g70
      end
      local c1 = _g69
      str1 = str1 .. c1
      i = i + 1
    end
    return(str1 .. "\"")
  end
  local function quoted(form)
    if string63(form) then
      return(escape(form))
    else
      if atom63(form) then
        return(form)
      else
        return(join({"list"}, map(quoted, form)))
      end
    end
  end
  local function stash42(args)
    if keys63(args) then
      local l = {"%object", "_stash", true}
      local _g72 = args
      local k = nil
      for k in next, _g72 do
        if not number63(k) then
          local v = _g72[k]
          add(l, k)
          add(l, v)
        end
      end
      return(join(args, {l}))
    else
      return(args)
    end
  end
  local function bind(lh, rh)
    if composite63(lh) and list63(rh) then
      local id = make_id()
      return(join({{id, rh}}, bind(lh, id)))
    else
      if atom63(lh) then
        return({{lh, rh}})
      else
        local bs = {}
        local r = lh.rest
        local _g73 = lh
        local i = 0
        while i < length(_g73) do
          local x = _g73[i + 1]
          bs = join(bs, bind(x, {"at", rh, i}))
          i = i + 1
        end
        if r then
          bs = join(bs, bind(r, {"sub", rh, length(lh)}))
        end
        local _g74 = lh
        local k = nil
        for k in next, _g74 do
          if not number63(k) then
            local v = _g74[k]
            if v == true then
              v = k
            end
            if not (k == "rest") then
              bs = join(bs, bind(v, {"get", rh, {"quote", k}}))
            end
          end
        end
        return(bs)
      end
    end
  end
  local function bind42(args, body)
    local args1 = {}
    local function rest()
      if target == "js" then
        return({"unstash", {{"get", {"get", {"get", "Array", {"quote", "prototype"}}, {"quote", "slice"}}, {"quote", "call"}}, "arguments", length(args1)}})
      else
        add(args1, "|...|")
        return({"unstash", {"list", "|...|"}})
      end
    end
    if atom63(args) then
      return({args1, {join({"let", {args, rest()}}, body)}})
    else
      local bs = {}
      local r = args.rest or keys63(args) and make_id()
      local _g75 = args
      local _g76 = 0
      while _g76 < length(_g75) do
        local arg = _g75[_g76 + 1]
        if atom63(arg) then
          add(args1, arg)
        else
          if list63(arg) or keys63(arg) then
            local v = make_id()
            add(args1, v)
            bs = join(bs, {arg, v})
          end
        end
        _g76 = _g76 + 1
      end
      if r then
        bs = join(bs, {r, rest()})
      end
      if keys63(args) then
        bs = join(bs, {sub(args, length(args)), r})
      end
      if none63(bs) then
        return({args1, body})
      else
        return({args1, {join({"let", bs}, body)}})
      end
    end
  end
  local function quoting63(depth)
    return(number63(depth))
  end
  local function quasiquoting63(depth)
    return(quoting63(depth) and depth > 0)
  end
  local function can_unquote63(depth)
    return(quoting63(depth) and depth == 1)
  end
  local function quasisplice63(x, depth)
    return(list63(x) and can_unquote63(depth) and hd(x) == "unquote-splicing")
  end
  local function macroexpand(form)
    if symbol63(form) then
      return(macroexpand(symbol_expansion(form)))
    else
      if atom63(form) then
        return(form)
      else
        local x = hd(form)
        if x == "%function" then
          local _g60 = form[1]
          local args = form[2]
          local body = sub(form, 2)
          add(environment, {_scope = true})
          local _g79 = args
          local _g80 = 0
          while _g80 < length(_g79) do
            local _g77 = _g79[_g80 + 1]
            setenv(_g77, {_stash = true, variable = true})
            _g80 = _g80 + 1
          end
          local _g78 = join({"%function", map(macroexpand, args)}, macroexpand(body))
          drop(environment)
          return(_g78)
        else
          if x == "%local-function" or x == "%global-function" then
            local _g61 = form[1]
            local name = form[2]
            local _g81 = form[3]
            local _g82 = sub(form, 3)
            add(environment, {_scope = true})
            local _g85 = _g81
            local _g86 = 0
            while _g86 < length(_g85) do
              local _g83 = _g85[_g86 + 1]
              setenv(_g83, {_stash = true, variable = true})
              _g86 = _g86 + 1
            end
            local _g84 = join({x, name, map(macroexpand, _g81)}, macroexpand(_g82))
            drop(environment)
            return(_g84)
          else
            if macro63(x) then
              return(macroexpand(apply(macro_function(x), tl(form))))
            else
              return(map(macroexpand, form))
            end
          end
        end
      end
    end
  end
  local quasiexpand
  local quasiquote_list
  quasiquote_list = function (form, depth)
    local xs = {{"list"}}
    local _g87 = form
    local k = nil
    for k in next, _g87 do
      if not number63(k) then
        local v = _g87[k]
        local _g92
        if quasisplice63(v, depth) then
          _g92 = quasiexpand(v[2])
        else
          _g92 = quasiexpand(v, depth)
        end
        local _g88 = _g92
        last(xs)[k] = _g88
      end
    end
    local _g89 = form
    local _g90 = 0
    while _g90 < length(_g89) do
      local x = _g89[_g90 + 1]
      if quasisplice63(x, depth) then
        local _g91 = quasiexpand(x[2])
        add(xs, _g91)
        add(xs, {"list"})
      else
        add(last(xs), quasiexpand(x, depth))
      end
      _g90 = _g90 + 1
    end
    local pruned = keep(function (x)
      return(length(x) > 1 or not (hd(x) == "list") or keys63(x))
    end, xs)
    return(join({"join*"}, pruned))
  end
  quasiexpand = function (form, depth)
    if quasiquoting63(depth) then
      if atom63(form) then
        return({"quote", form})
      else
        if can_unquote63(depth) and hd(form) == "unquote" then
          return(quasiexpand(form[2]))
        else
          if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
            return(quasiquote_list(form, depth - 1))
          else
            if hd(form) == "quasiquote" then
              return(quasiquote_list(form, depth + 1))
            else
              return(quasiquote_list(form, depth))
            end
          end
        end
      end
    else
      if atom63(form) then
        return(form)
      else
        if hd(form) == "quote" then
          return(form)
        else
          if hd(form) == "quasiquote" then
            return(quasiexpand(form[2], 1))
          else
            return(map(function (x)
              return(quasiexpand(x, depth))
            end, form))
          end
        end
      end
    end
  end
  indent_level = 0
  local function indentation()
    return(apply(cat, replicate(indent_level, "  ")))
  end
  local reserved = {["%"] = true, ["*"] = true, ["+"] = true, ["-"] = true, ["/"] = true, ["<"] = true, ["<="] = true, ["="] = true, ["=="] = true, [">"] = true, [">="] = true, ["and"] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["elseif"] = true, ["end"] = true, ["false"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["in"] = true, ["instanceof"] = true, ["local"] = true, ["new"] = true, ["nil"] = true, ["not"] = true, ["or"] = true, ["repeat"] = true, ["return"] = true, ["switch"] = true, ["then"] = true, ["this"] = true, ["throw"] = true, ["true"] = true, ["try"] = true, ["typeof"] = true, ["until"] = true, ["var"] = true, ["void"] = true, ["while"] = true, ["with"] = true}
  local function reserved63(x)
    return(reserved[x])
  end
  local function numeric63(n)
    return(n > 47 and n < 58)
  end
  local function valid_char63(n)
    return(numeric63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95)
  end
  local function valid_id63(id)
    if none63(id) then
      return(false)
    else
      if special63(id) then
        return(false)
      else
        if reserved63(id) then
          return(false)
        else
          local i = 0
          while i < length(id) do
            local n = code(id, i)
            local valid63 = valid_char63(n)
            if not valid63 or i == 0 and numeric63(n) then
              return(false)
            end
            i = i + 1
          end
          return(true)
        end
      end
    end
  end
  local function id(id)
    local id1 = ""
    local i = 0
    while i < length(id) do
      local c = char(id, i)
      local n = code(c)
      local _g98
      if c == "-" then
        _g98 = "_"
      else
        local _g99
        if valid_char63(n) then
          _g99 = c
        else
          local _g100
          if i == 0 then
            _g100 = "_" .. n
          else
            _g100 = n
          end
          _g99 = _g100
        end
        _g98 = _g99
      end
      local c1 = _g98
      id1 = id1 .. c1
      i = i + 1
    end
    return(id1)
  end
  local function sortk(l, k)
    return(sort(l, function (a, b)
      return(k(a) < k(b))
    end))
  end
  local function imported(spec, ...)
    local _g101 = unstash({...})
    local all = _g101.all
    local m = make_id()
    local k = module_key(spec)
    local imports = {}
    if nexus[k] then
      local _g102 = module(spec).export
      local n = nil
      for n in next, _g102 do
        if not number63(n) then
          local b = _g102[n]
          if b.variable and (all or b.export) then
            add(imports, {"%local", n, {"get", m, {"quote", n}}})
          end
        end
      end
    end
    if some63(imports) then
      return(join({{"%local", m, {"get", "nexus", {"quote", k}}}}, sortk(imports, sd)))
    end
  end
  local function exported()
    local m = make_id()
    local k = module_key(current_module)
    local exports = {}
    local _g103 = module(current_module).export
    local n = nil
    for n in next, _g103 do
      if not number63(n) then
        local b = _g103[n]
        if b.variable then
          add(exports, {"set", {"get", m, {"quote", n}}, n})
        end
      end
    end
    if some63(exports) then
      return(join({{"%local", m, {"table"}}, {"set", {"get", "nexus", {"quote", k}}, m}}, sortk(exports, td)))
    else
      return({})
    end
  end
  local function quote_binding(b)
    if is63(b.symbol) then
      return(extend(b, {_stash = true, symbol = {"quote", b.symbol}}))
    else
      if b.macro and b.form then
        return(exclude(extend(b, {_stash = true, macro = b.form}), {_stash = true, form = true}))
      else
        if b.special and b.form then
          return(exclude(extend(b, {_stash = true, special = b.form}), {_stash = true, form = true}))
        else
          if is63(b.variable) then
            return(b)
          else
            if is63(b.global) then
              return(b)
            end
          end
        end
      end
    end
  end
  local function mapo(f, t)
    local o = {}
    local _g104 = t
    local k = nil
    for k in next, _g104 do
      if not number63(k) then
        local v = _g104[k]
        local x = f(v)
        if is63(x) then
          add(o, k)
          add(o, x)
        end
      end
    end
    return(o)
  end
  local function quote_frame(t)
    return(join({"%object"}, mapo(function (b)
      return(join({"table"}, quote_binding(b)))
    end, t)))
  end
  local function quote_environment(env)
    return(join({"list"}, map(quote_frame, env)))
  end
  local function quote_module(m)
    local _g105 = {"table"}
    _g105.alias = quoted(m.alias)
    _g105.export = quote_frame(m.export)
    _g105.import = quoted(m.import)
    return(_g105)
  end
  local function quote_modules()
    return(join({"table"}, map(quote_module, modules)))
  end
  local function initial_environment()
    return({{["define-module"] = getenv("define-module")}})
  end
  local _g106 = {}
  nexus["lumen/utilities"] = _g106
  _g106.bind = bind
  _g106["bind*"] = bind42
  _g106["bound?"] = bound63
  _g106["can-unquote?"] = can_unquote63
  _g106.escape = escape
  _g106.exported = exported
  _g106.getenv = getenv
  _g106["global?"] = global63
  _g106.id = id
  _g106.imported = imported
  _g106.indentation = indentation
  _g106["initial-environment"] = initial_environment
  _g106["macro-function"] = macro_function
  _g106["macro?"] = macro63
  _g106.macroexpand = macroexpand
  _g106.mapo = mapo
  _g106["numeric?"] = numeric63
  _g106.quasiexpand = quasiexpand
  _g106["quasiquote-list"] = quasiquote_list
  _g106["quasiquoting?"] = quasiquoting63
  _g106["quasisplice?"] = quasisplice63
  _g106["quote-binding"] = quote_binding
  _g106["quote-environment"] = quote_environment
  _g106["quote-frame"] = quote_frame
  _g106["quote-module"] = quote_module
  _g106["quote-modules"] = quote_modules
  _g106.quoted = quoted
  _g106["quoting?"] = quoting63
  _g106.reserved = reserved
  _g106["reserved?"] = reserved63
  _g106.sortk = sortk
  _g106["special-form?"] = special_form63
  _g106["special?"] = special63
  _g106["stash*"] = stash42
  _g106["statement?"] = statement63
  _g106["symbol-expansion"] = symbol_expansion
  _g106["symbol?"] = symbol63
  _g106["toplevel?"] = toplevel63
  _g106["valid-char?"] = valid_char63
  _g106["valid-id?"] = valid_id63
  _g106["variable?"] = variable63
end)();
(function ()
  local _g108 = nexus["lumen/runtime"]
  local _37 = _g108["%"]
  local _37message_handler = _g108["%message-handler"]
  local _42 = _g108["*"]
  local _43 = _g108["+"]
  local _ = _g108["-"]
  local _47 = _g108["/"]
  local _60 = _g108["<"]
  local _6061 = _g108["<="]
  local _61 = _g108["="]
  local _62 = _g108[">"]
  local _6261 = _g108[">="]
  local abs = _g108.abs
  local acos = _g108.acos
  local add = _g108.add
  local apply = _g108.apply
  local asin = _g108.asin
  local atan = _g108.atan
  local atan2 = _g108.atan2
  local atom63 = _g108["atom?"]
  local boolean63 = _g108["boolean?"]
  local cat = _g108.cat
  local ceil = _g108.ceil
  local char = _g108.char
  local code = _g108.code
  local composite63 = _g108["composite?"]
  local cos = _g108.cos
  local drop = _g108.drop
  local empty63 = _g108["empty?"]
  local exclude = _g108.exclude
  local exit = _g108.exit
  local extend = _g108.extend
  local find = _g108.find
  local flat = _g108.flat
  local flat1 = _g108.flat1
  local floor = _g108.floor
  local function63 = _g108["function?"]
  local hd = _g108.hd
  local id_literal63 = _g108["id-literal?"]
  local in63 = _g108["in?"]
  local inner = _g108.inner
  local is63 = _g108["is?"]
  local iterate = _g108.iterate
  local join = _g108.join
  local keep = _g108.keep
  local keys63 = _g108["keys?"]
  local last = _g108.last
  local length = _g108.length
  local list63 = _g108["list?"]
  local log = _g108.log
  local log10 = _g108.log10
  local make_id = _g108["make-id"]
  local map = _g108.map
  local max = _g108.max
  local min = _g108.min
  local module = _g108.module
  local module_key = _g108["module-key"]
  local nil63 = _g108["nil?"]
  local none63 = _g108["none?"]
  local number = _g108.number
  local number63 = _g108["number?"]
  local pairwise = _g108.pairwise
  local pow = _g108.pow
  local random = _g108.random
  local read_file = _g108["read-file"]
  local reduce = _g108.reduce
  local replicate = _g108.replicate
  local reverse = _g108.reverse
  local sd = _g108.sd
  local search = _g108.search
  local setenv = _g108.setenv
  local sin = _g108.sin
  local sinh = _g108.sinh
  local some63 = _g108["some?"]
  local sort = _g108.sort
  local splice = _g108.splice
  local split = _g108.split
  local sqrt = _g108.sqrt
  local stash = _g108.stash
  local string = _g108.string
  local string_literal63 = _g108["string-literal?"]
  local string63 = _g108["string?"]
  local sub = _g108.sub
  local sublist = _g108.sublist
  local substring = _g108.substring
  local table63 = _g108["table?"]
  local tan = _g108.tan
  local tanh = _g108.tanh
  local td = _g108.td
  local tl = _g108.tl
  local toplevel63 = _g108["toplevel?"]
  local unstash = _g108.unstash
  local write = _g108.write
  local write_file = _g108["write-file"]
  local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\n"] = true}
  local whitespace = {[" "] = true, ["\n"] = true, ["\t"] = true}
  local function make_stream(str)
    return({len = length(str), pos = 0, string = str})
  end
  local function peek_char(s)
    if s.pos < s.len then
      return(char(s.string, s.pos))
    end
  end
  local function read_char(s)
    local c = peek_char(s)
    if c then
      s.pos = s.pos + 1
      return(c)
    end
  end
  local function skip_non_code(s)
    while true do
      local c = peek_char(s)
      if nil63(c) then
        break
      else
        if whitespace[c] then
          read_char(s)
        else
          if c == ";" then
            while c and not (c == "\n") do
              c = read_char(s)
            end
            skip_non_code(s)
          else
            break
          end
        end
      end
    end
  end
  local read_table = {}
  local eof = {}
  local function read(s)
    skip_non_code(s)
    local c = peek_char(s)
    if is63(c) then
      return((read_table[c] or read_table[""])(s))
    else
      return(eof)
    end
  end
  local function read_all(s)
    local l = {}
    while true do
      local form = read(s)
      if form == eof then
        break
      end
      add(l, form)
    end
    return(l)
  end
  local function read_from_string(str)
    return(read(make_stream(str)))
  end
  local function key63(atom)
    return(string63(atom) and length(atom) > 1 and char(atom, length(atom) - 1) == ":")
  end
  local function flag63(atom)
    return(string63(atom) and length(atom) > 1 and char(atom, 0) == ":")
  end
  read_table[""] = function (s)
    local str = ""
    local dot63 = false
    while true do
      local c = peek_char(s)
      if c and (not whitespace[c] and not delimiters[c]) then
        if c == "." then
          dot63 = true
        end
        str = str .. c
        read_char(s)
      else
        break
      end
    end
    local n = number(str)
    if is63(n) then
      return(n)
    else
      if str == "true" then
        return(true)
      else
        if str == "false" then
          return(false)
        else
          if str == "_" then
            return(make_id())
          else
            if dot63 then
              return(reduce(function (a, b)
                return({"get", b, {"quote", a}})
              end, reverse(split(str, "."))))
            else
              return(str)
            end
          end
        end
      end
    end
  end
  read_table["("] = function (s)
    read_char(s)
    local l = {}
    while true do
      skip_non_code(s)
      local c = peek_char(s)
      if c and not (c == ")") then
        local x = read(s)
        if key63(x) then
          local k = sub(x, 0, length(x) - 1)
          local v = read(s)
          l[k] = v
        else
          if flag63(x) then
            l[sub(x, 1)] = true
          else
            add(l, x)
          end
        end
      else
        if c then
          read_char(s)
          break
        else
          error("Expected ) at " .. s.pos)
        end
      end
    end
    return(l)
  end
  read_table[")"] = function (s)
    error("Unexpected ) at " .. s.pos)
  end
  read_table["\""] = function (s)
    read_char(s)
    local str = "\""
    while true do
      local c = peek_char(s)
      if c and not (c == "\"") then
        if c == "\\" then
          str = str .. read_char(s)
        end
        str = str .. read_char(s)
      else
        if c then
          read_char(s)
          break
        else
          error("Expected \" at " .. s.pos)
        end
      end
    end
    return(str .. "\"")
  end
  read_table["|"] = function (s)
    read_char(s)
    local str = "|"
    while true do
      local c = peek_char(s)
      if c and not (c == "|") then
        str = str .. read_char(s)
      else
        if c then
          read_char(s)
          break
        else
          error("Expected | at " .. s.pos)
        end
      end
    end
    return(str .. "|")
  end
  read_table["'"] = function (s)
    read_char(s)
    return({"quote", read(s)})
  end
  read_table["`"] = function (s)
    read_char(s)
    return({"quasiquote", read(s)})
  end
  read_table[","] = function (s)
    read_char(s)
    if peek_char(s) == "@" then
      read_char(s)
      return({"unquote-splicing", read(s)})
    else
      return({"unquote", read(s)})
    end
  end
  local _g119 = {}
  nexus["lumen/reader"] = _g119
  _g119.delimiters = delimiters
  _g119.eof = eof
  _g119["flag?"] = flag63
  _g119["key?"] = key63
  _g119["make-stream"] = make_stream
  _g119["peek-char"] = peek_char
  _g119.read = read
  _g119["read-all"] = read_all
  _g119["read-char"] = read_char
  _g119["read-from-string"] = read_from_string
  _g119["read-table"] = read_table
  _g119["skip-non-code"] = skip_non_code
  _g119.whitespace = whitespace
end)();
(function ()
  local _g121 = nexus["lumen/utilities"]
  local bind = _g121.bind
  local bind42 = _g121["bind*"]
  local bound63 = _g121["bound?"]
  local exported = _g121.exported
  local getenv = _g121.getenv
  local id = _g121.id
  local imported = _g121.imported
  local indentation = _g121.indentation
  local initial_environment = _g121["initial-environment"]
  local macro_function = _g121["macro-function"]
  local macro63 = _g121["macro?"]
  local macroexpand = _g121.macroexpand
  local mapo = _g121.mapo
  local quasiexpand = _g121.quasiexpand
  local quote_environment = _g121["quote-environment"]
  local quote_modules = _g121["quote-modules"]
  local quoted = _g121.quoted
  local reserved63 = _g121["reserved?"]
  local sortk = _g121.sortk
  local special_form63 = _g121["special-form?"]
  local special63 = _g121["special?"]
  local stash42 = _g121["stash*"]
  local statement63 = _g121["statement?"]
  local symbol_expansion = _g121["symbol-expansion"]
  local symbol63 = _g121["symbol?"]
  local toplevel63 = _g121["toplevel?"]
  local valid_id63 = _g121["valid-id?"]
  local variable63 = _g121["variable?"]
  local _g122 = nexus["lumen/reader"]
  local make_stream = _g122["make-stream"]
  local read = _g122.read
  local read_all = _g122["read-all"]
  local read_from_string = _g122["read-from-string"]
  local read_table = _g122["read-table"]
  local _g123 = nexus["lumen/runtime"]
  local _37 = _g123["%"]
  local _37message_handler = _g123["%message-handler"]
  local _42 = _g123["*"]
  local _43 = _g123["+"]
  local _ = _g123["-"]
  local _47 = _g123["/"]
  local _60 = _g123["<"]
  local _6061 = _g123["<="]
  local _61 = _g123["="]
  local _62 = _g123[">"]
  local _6261 = _g123[">="]
  local abs = _g123.abs
  local acos = _g123.acos
  local add = _g123.add
  local apply = _g123.apply
  local asin = _g123.asin
  local atan = _g123.atan
  local atan2 = _g123.atan2
  local atom63 = _g123["atom?"]
  local boolean63 = _g123["boolean?"]
  local cat = _g123.cat
  local ceil = _g123.ceil
  local char = _g123.char
  local code = _g123.code
  local composite63 = _g123["composite?"]
  local cos = _g123.cos
  local drop = _g123.drop
  local empty63 = _g123["empty?"]
  local exclude = _g123.exclude
  local exit = _g123.exit
  local extend = _g123.extend
  local find = _g123.find
  local flat = _g123.flat
  local flat1 = _g123.flat1
  local floor = _g123.floor
  local function63 = _g123["function?"]
  local hd = _g123.hd
  local id_literal63 = _g123["id-literal?"]
  local in63 = _g123["in?"]
  local inner = _g123.inner
  local is63 = _g123["is?"]
  local iterate = _g123.iterate
  local join = _g123.join
  local keep = _g123.keep
  local keys63 = _g123["keys?"]
  local last = _g123.last
  local length = _g123.length
  local list63 = _g123["list?"]
  local log = _g123.log
  local log10 = _g123.log10
  local make_id = _g123["make-id"]
  local map = _g123.map
  local max = _g123.max
  local min = _g123.min
  local module = _g123.module
  local module_key = _g123["module-key"]
  local nil63 = _g123["nil?"]
  local none63 = _g123["none?"]
  local number = _g123.number
  local number63 = _g123["number?"]
  local pairwise = _g123.pairwise
  local pow = _g123.pow
  local random = _g123.random
  local read_file = _g123["read-file"]
  local reduce = _g123.reduce
  local replicate = _g123.replicate
  local reverse = _g123.reverse
  local sd = _g123.sd
  local search = _g123.search
  local setenv = _g123.setenv
  local sin = _g123.sin
  local sinh = _g123.sinh
  local some63 = _g123["some?"]
  local sort = _g123.sort
  local splice = _g123.splice
  local split = _g123.split
  local sqrt = _g123.sqrt
  local stash = _g123.stash
  local string = _g123.string
  local string_literal63 = _g123["string-literal?"]
  local string63 = _g123["string?"]
  local sub = _g123.sub
  local sublist = _g123.sublist
  local substring = _g123.substring
  local table63 = _g123["table?"]
  local tan = _g123.tan
  local tanh = _g123.tanh
  local td = _g123.td
  local tl = _g123.tl
  local toplevel63 = _g123["toplevel?"]
  local unstash = _g123.unstash
  local write = _g123.write
  local write_file = _g123["write-file"]
  local _g129 = {}
  _g129.js = "!"
  _g129.lua = "not "
  local _g127 = {}
  local _g130 = {}
  _g130.js = "!"
  _g130.lua = "not "
  _g127["not"] = _g130
  local _g132 = {}
  _g132["%"] = true
  _g132["*"] = true
  _g132["/"] = true
  local _g134 = {}
  _g134["+"] = true
  _g134["-"] = true
  local _g138 = {}
  _g138.js = "+"
  _g138.lua = ".."
  local _g136 = {}
  local _g139 = {}
  _g139.js = "+"
  _g139.lua = ".."
  _g136.cat = _g139
  local _g141 = {}
  _g141["<"] = true
  _g141["<="] = true
  _g141[">"] = true
  _g141[">="] = true
  local _g147 = {}
  _g147.js = "==="
  _g147.lua = "=="
  local _g145 = {}
  _g145.js = "!="
  _g145.lua = "~="
  local _g143 = {}
  local _g148 = {}
  _g148.js = "==="
  _g148.lua = "=="
  _g143["="] = _g148
  local _g149 = {}
  _g149.js = "!="
  _g149.lua = "~="
  _g143["~="] = _g149
  local _g153 = {}
  _g153.js = "&&"
  _g153.lua = "and"
  local _g151 = {}
  local _g154 = {}
  _g154.js = "&&"
  _g154.lua = "and"
  _g151["and"] = _g154
  local _g158 = {}
  _g158.js = "||"
  _g158.lua = "or"
  local _g156 = {}
  local _g159 = {}
  _g159.js = "||"
  _g159.lua = "or"
  _g156["or"] = _g159
  local infix = {_g127, _g132, _g134, _g136, _g141, _g143, _g151, _g156}
  local function unary63(form)
    local op = form[1]
    local args = sub(form, 1)
    return(length(args) == 1 and in63(op, {"not", "-"}))
  end
  local function precedence(form)
    if list63(form) and not unary63(form) then
      local _g160 = infix
      local i = 0
      while i < length(_g160) do
        local level = _g160[i + 1]
        if level[hd(form)] then
          return(i)
        end
        i = i + 1
      end
    end
    return(0)
  end
  local function getop(op)
    return(find(function (level)
      local x = level[op]
      if x == true then
        return(op)
      else
        if is63(x) then
          return(x[target])
        end
      end
    end, infix))
  end
  local function infix63(x)
    return(is63(getop(x)))
  end
  local compile
  local function compile_args(args)
    local str = "("
    local _g161 = args
    local i = 0
    while i < length(_g161) do
      local arg = _g161[i + 1]
      str = str .. compile(arg)
      if i < length(args) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. ")")
  end
  local function compile_atom(x)
    if x == "nil" and target == "lua" then
      return(x)
    else
      if x == "nil" then
        return("undefined")
      else
        if id_literal63(x) then
          return(inner(x))
        else
          if string_literal63(x) then
            return(x)
          else
            if string63(x) then
              return(id(x))
            else
              if boolean63(x) then
                if x then
                  return("true")
                else
                  return("false")
                end
              else
                if number63(x) then
                  return(x .. "")
                else
                  error("Cannot compile atom: " .. string(x))
                end
              end
            end
          end
        end
      end
    end
  end
  local function terminator(stmt63)
    if not stmt63 then
      return("")
    else
      if target == "js" then
        return(";\n")
      else
        return("\n")
      end
    end
  end
  local function compile_special(form, stmt63)
    local x = form[1]
    local args = sub(form, 1)
    local _g162 = getenv(x)
    local self_tr63 = _g162.tr
    local stmt = _g162.stmt
    local special = _g162.special
    local tr = terminator(stmt63 and not self_tr63)
    return(apply(special, args) .. tr)
  end
  local function parenthesize_call63(x)
    return(list63(x) and (hd(x) == "%function" or precedence(x) > 0))
  end
  local function compile_call(form)
    local f = hd(form)
    local f1 = compile(f)
    local args = compile_args(stash42(tl(form)))
    if parenthesize_call63(f) then
      return("(" .. f1 .. ")" .. args)
    else
      return(f1 .. args)
    end
  end
  local function op_delims(parent, child, ...)
    local _g163 = unstash({...})
    local right = _g163.right
    local _g164
    if right then
      _g164 = _6261
    else
      _g164 = _62
    end
    if _g164(precedence(child), precedence(parent)) then
      return({"(", ")"})
    else
      return({"", ""})
    end
  end
  local function compile_infix(form)
    local op = form[1]
    local _g165 = sub(form, 1)
    local a = _g165[1]
    local b = _g165[2]
    local _g166 = op_delims(form, a)
    local ao = _g166[1]
    local ac = _g166[2]
    local _g167 = op_delims(form, b, {_stash = true, right = true})
    local bo = _g167[1]
    local bc = _g167[2]
    local _g168 = compile(a)
    local _g169 = compile(b)
    local _g170 = getop(op)
    if unary63(form) then
      return(_g170 .. ao .. _g168 .. ac)
    else
      return(ao .. _g168 .. ac .. " " .. _g170 .. " " .. bo .. _g169 .. bc)
    end
  end
  local function compile_function(args, body, ...)
    local _g171 = unstash({...})
    local name = _g171.name
    local prefix = _g171.prefix
    local _g176
    if name then
      _g176 = compile(name)
    else
      _g176 = ""
    end
    local id = _g176
    local _g172 = prefix or ""
    local _g173 = compile_args(args)
    indent_level = indent_level + 1
    local _g175 = compile(body, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g174 = _g175
    local ind = indentation()
    local _g177
    if target == "js" then
      _g177 = ""
    else
      _g177 = "end"
    end
    local tr = _g177
    if name then
      tr = tr .. "\n"
    end
    if target == "js" then
      return("function " .. id .. _g173 .. " {\n" .. _g174 .. ind .. "}" .. tr)
    else
      return(_g172 .. "function " .. id .. _g173 .. "\n" .. _g174 .. ind .. tr)
    end
  end
  local function can_return63(form)
    return(is63(form) and (atom63(form) or not (hd(form) == "return") and not statement63(hd(form))))
  end
  compile = function (form, ...)
    local _g178 = unstash({...})
    local stmt = _g178.stmt
    if nil63(form) then
      return("")
    else
      if special_form63(form) then
        return(compile_special(form, stmt))
      else
        local tr = terminator(stmt)
        local _g180
        if stmt then
          _g180 = indentation()
        else
          _g180 = ""
        end
        local ind = _g180
        local _g181
        if atom63(form) then
          _g181 = compile_atom(form)
        else
          local _g182
          if infix63(hd(form)) then
            _g182 = compile_infix(form)
          else
            _g182 = compile_call(form)
          end
          _g181 = _g182
        end
        local _g179 = _g181
        return(ind .. _g179 .. tr)
      end
    end
  end
  local lower
  local function lower_statement(form, tail63)
    local hoist = {}
    local e = lower(form, hoist, true, tail63)
    if some63(hoist) and is63(e) then
      return(join({"do"}, join(hoist, {e})))
    else
      if is63(e) then
        return(e)
      else
        if length(hoist) > 1 then
          return(join({"do"}, hoist))
        else
          return(hd(hoist))
        end
      end
    end
  end
  local function lower_body(body, tail63)
    return(lower_statement(join({"do"}, body), tail63))
  end
  local function lower_do(args, hoist, stmt63, tail63)
    local _g183 = sub(args, 0, length(args) - 1)
    local _g184 = 0
    while _g184 < length(_g183) do
      local x = _g183[_g184 + 1]
      add(hoist, lower(x, hoist, stmt63))
      _g184 = _g184 + 1
    end
    local e = lower(last(args), hoist, stmt63, tail63)
    if tail63 and can_return63(e) then
      return({"return", e})
    else
      return(e)
    end
  end
  local function lower_if(args, hoist, stmt63, tail63)
    local cond = args[1]
    local _g185 = args[2]
    local _g186 = args[3]
    if stmt63 or tail63 then
      local _g188
      if _g186 then
        _g188 = {lower_body({_g186}, tail63)}
      end
      return(add(hoist, join({"%if", lower(cond, hoist), lower_body({_g185}, tail63)}, _g188)))
    else
      local e = make_id()
      add(hoist, {"%local", e})
      local _g187
      if _g186 then
        _g187 = {lower({"set", e, _g186})}
      end
      add(hoist, join({"%if", lower(cond, hoist), lower({"set", e, _g185})}, _g187))
      return(e)
    end
  end
  local function lower_short(x, args, hoist)
    local a = args[1]
    local b = args[2]
    local hoist1 = {}
    local b1 = lower(b, hoist1)
    if some63(hoist1) then
      local id = make_id()
      local _g189
      if x == "and" then
        _g189 = {"%if", id, b, id}
      else
        _g189 = {"%if", id, id, b}
      end
      return(lower({"do", {"%local", id, a}, _g189}, hoist))
    else
      return({x, lower(a, hoist), b1})
    end
  end
  local function lower_try(args, hoist, tail63)
    return(add(hoist, {"%try", lower_body(args, tail63)}))
  end
  local function lower_while(args, hoist)
    local c = args[1]
    local body = sub(args, 1)
    return(add(hoist, {"while", lower(c, hoist), lower_body(body)}))
  end
  local function lower_for(args, hoist)
    local t = args[1]
    local k = args[2]
    local body = sub(args, 2)
    return(add(hoist, {"%for", lower(t, hoist), k, lower_body(body)}))
  end
  local function lower_function(args)
    local a = args[1]
    local body = sub(args, 1)
    return({"%function", a, lower_body(body, true)})
  end
  local function lower_definition(kind, args, hoist)
    local name = args[1]
    local _g190 = args[2]
    local body = sub(args, 2)
    return(add(hoist, {kind, name, _g190, lower_body(body, true)}))
  end
  local function lower_call(form, hoist)
    local _g191 = map(function (x)
      return(lower(x, hoist))
    end, form)
    if some63(_g191) then
      return(_g191)
    end
  end
  local function lower_infix63(form)
    return(infix63(hd(form)) and length(form) > 3)
  end
  local function lower_infix(form, hoist)
    local x = form[1]
    local args = sub(form, 1)
    return(lower(reduce(function (a, b)
      return({x, b, a})
    end, reverse(args)), hoist))
  end
  local function lower_special(form, hoist)
    local e = lower_call(form, hoist)
    if e then
      return(add(hoist, e))
    end
  end
  lower = function (form, hoist, stmt63, tail63)
    if atom63(form) then
      return(form)
    else
      if empty63(form) then
        return({"%array"})
      else
        if nil63(hoist) then
          return(lower_statement(form))
        else
          if lower_infix63(form) then
            return(lower_infix(form, hoist))
          else
            local x = form[1]
            local args = sub(form, 1)
            if x == "do" then
              return(lower_do(args, hoist, stmt63, tail63))
            else
              if x == "%if" then
                return(lower_if(args, hoist, stmt63, tail63))
              else
                if x == "%try" then
                  return(lower_try(args, hoist, tail63))
                else
                  if x == "while" then
                    return(lower_while(args, hoist))
                  else
                    if x == "%for" then
                      return(lower_for(args, hoist))
                    else
                      if x == "%function" then
                        return(lower_function(args))
                      else
                        if in63(x, {"%local-function", "%global-function"}) then
                          return(lower_definition(x, args, hoist))
                        else
                          if in63(x, {"and", "or"}) then
                            return(lower_short(x, args, hoist))
                          else
                            if statement63(x) then
                              return(lower_special(form, hoist))
                            else
                              return(lower_call(form, hoist))
                            end
                          end
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
  local function process(form)
    return(lower(macroexpand(form)))
  end
  current_module = nil
  local function module_path(spec)
    return(module_key(spec) .. ".l")
  end
  local function encapsulate(body)
    local _g192 = map(process, body)
    local epilog = map(process, exported())
    return({{"%function", {}, join({"do"}, join(_g192, epilog))}})
  end
  local function compile_file(file)
    local str = read_file(file)
    local body = read_all(make_stream(str))
    local form = encapsulate(body)
    return(compile(form) .. ";\n")
  end
  _37result = nil
  local function run(x)
    local f = load(compile("%result") .. "=" .. x)
    if f then
      f()
      return(_37result)
    else
      local f,e = load(x)
      if f then
        return(f())
      else
        error(e .. " in " .. x)
      end
    end
  end
  local compiling63 = false
  local compiler_output = ""
  local function _37compile_module(spec)
    local path = module_path(spec)
    local mod0 = current_module
    local env0 = environment
    current_module = spec
    environment = initial_environment()
    local compiled = compile_file(path)
    current_module = mod0
    environment = env0
    if compiling63 then
      compiler_output = compiler_output .. compiled
    else
      return(run(compiled))
    end
  end
  local function open_module(spec, ...)
    local _g193 = unstash({...})
    local all = _g193.all
    local m = module(spec)
    local frame = last(environment)
    local _g194 = m.export
    local k = nil
    for k in next, _g194 do
      if not number63(k) then
        local v = _g194[k]
        if v.export or all then
          frame[k] = v
        end
      end
    end
  end
  local function load_module(spec, ...)
    local _g195 = unstash({...})
    local all = _g195.all
    if not module(spec) then
      _37compile_module(spec)
    end
    return(open_module(spec, {_stash = true, all = all}))
  end
  local function in_module(spec)
    load_module(spec, {_stash = true, all = true})
    local m = module(spec)
    map(open_module, m.import)
    current_module = spec
  end
  local function compile_module(spec)
    compiling63 = true
    _37compile_module(spec)
    return(compiler_output)
  end
  local function prologue()
    local m = module(current_module)
    return(join(imported(current_module, {_stash = true, all = true}), map(function (x)
      return(splice(imported(x)))
    end, m.import)))
  end
  local function eval(form)
    local previous = target
    target = "lua"
    local _g196 = {join({"%function", {}}, join(prologue(), {form}))}
    local compiled = compile(process(_g196))
    target = previous
    return(run(compiled))
  end
  local _g197 = {}
  nexus["lumen/compiler"] = _g197
  _g197["%compile-module"] = _37compile_module
  _g197["can-return?"] = can_return63
  _g197.compile = compile
  _g197["compile-args"] = compile_args
  _g197["compile-atom"] = compile_atom
  _g197["compile-call"] = compile_call
  _g197["compile-file"] = compile_file
  _g197["compile-function"] = compile_function
  _g197["compile-infix"] = compile_infix
  _g197["compile-module"] = compile_module
  _g197["compile-special"] = compile_special
  _g197["compiler-output"] = compiler_output
  _g197["compiling?"] = compiling63
  _g197.encapsulate = encapsulate
  _g197.eval = eval
  _g197.getop = getop
  _g197["in-module"] = in_module
  _g197.infix = infix
  _g197["infix?"] = infix63
  _g197["load-module"] = load_module
  _g197.lower = lower
  _g197["lower-body"] = lower_body
  _g197["lower-call"] = lower_call
  _g197["lower-definition"] = lower_definition
  _g197["lower-do"] = lower_do
  _g197["lower-for"] = lower_for
  _g197["lower-function"] = lower_function
  _g197["lower-if"] = lower_if
  _g197["lower-infix"] = lower_infix
  _g197["lower-infix?"] = lower_infix63
  _g197["lower-short"] = lower_short
  _g197["lower-special"] = lower_special
  _g197["lower-statement"] = lower_statement
  _g197["lower-try"] = lower_try
  _g197["lower-while"] = lower_while
  _g197["module-path"] = module_path
  _g197["op-delims"] = op_delims
  _g197["open-module"] = open_module
  _g197["parenthesize-call?"] = parenthesize_call63
  _g197.precedence = precedence
  _g197.process = process
  _g197.prologue = prologue
  _g197.run = run
  _g197.terminator = terminator
  _g197["unary?"] = unary63
end)();
(function ()
  local _g199 = nexus["lumen/utilities"]
  local bind = _g199.bind
  local bind42 = _g199["bind*"]
  local bound63 = _g199["bound?"]
  local exported = _g199.exported
  local getenv = _g199.getenv
  local id = _g199.id
  local imported = _g199.imported
  local indentation = _g199.indentation
  local initial_environment = _g199["initial-environment"]
  local macro_function = _g199["macro-function"]
  local macro63 = _g199["macro?"]
  local macroexpand = _g199.macroexpand
  local mapo = _g199.mapo
  local quasiexpand = _g199.quasiexpand
  local quote_environment = _g199["quote-environment"]
  local quote_modules = _g199["quote-modules"]
  local quoted = _g199.quoted
  local reserved63 = _g199["reserved?"]
  local sortk = _g199.sortk
  local special_form63 = _g199["special-form?"]
  local special63 = _g199["special?"]
  local stash42 = _g199["stash*"]
  local statement63 = _g199["statement?"]
  local symbol_expansion = _g199["symbol-expansion"]
  local symbol63 = _g199["symbol?"]
  local toplevel63 = _g199["toplevel?"]
  local valid_id63 = _g199["valid-id?"]
  local variable63 = _g199["variable?"]
  local _g200 = nexus["lumen/compiler"]
  local compile = _g200.compile
  local compile_function = _g200["compile-function"]
  local compile_module = _g200["compile-module"]
  local eval = _g200.eval
  local in_module = _g200["in-module"]
  local load_module = _g200["load-module"]
  local open_module = _g200["open-module"]
  local _g201 = nexus["lumen/runtime"]
  local _37 = _g201["%"]
  local _37message_handler = _g201["%message-handler"]
  local _42 = _g201["*"]
  local _43 = _g201["+"]
  local _ = _g201["-"]
  local _47 = _g201["/"]
  local _60 = _g201["<"]
  local _6061 = _g201["<="]
  local _61 = _g201["="]
  local _62 = _g201[">"]
  local _6261 = _g201[">="]
  local abs = _g201.abs
  local acos = _g201.acos
  local add = _g201.add
  local apply = _g201.apply
  local asin = _g201.asin
  local atan = _g201.atan
  local atan2 = _g201.atan2
  local atom63 = _g201["atom?"]
  local boolean63 = _g201["boolean?"]
  local cat = _g201.cat
  local ceil = _g201.ceil
  local char = _g201.char
  local code = _g201.code
  local composite63 = _g201["composite?"]
  local cos = _g201.cos
  local drop = _g201.drop
  local empty63 = _g201["empty?"]
  local exclude = _g201.exclude
  local exit = _g201.exit
  local extend = _g201.extend
  local find = _g201.find
  local flat = _g201.flat
  local flat1 = _g201.flat1
  local floor = _g201.floor
  local function63 = _g201["function?"]
  local hd = _g201.hd
  local id_literal63 = _g201["id-literal?"]
  local in63 = _g201["in?"]
  local inner = _g201.inner
  local is63 = _g201["is?"]
  local iterate = _g201.iterate
  local join = _g201.join
  local keep = _g201.keep
  local keys63 = _g201["keys?"]
  local last = _g201.last
  local length = _g201.length
  local list63 = _g201["list?"]
  local log = _g201.log
  local log10 = _g201.log10
  local make_id = _g201["make-id"]
  local map = _g201.map
  local max = _g201.max
  local min = _g201.min
  local module = _g201.module
  local module_key = _g201["module-key"]
  local nil63 = _g201["nil?"]
  local none63 = _g201["none?"]
  local number = _g201.number
  local number63 = _g201["number?"]
  local pairwise = _g201.pairwise
  local pow = _g201.pow
  local random = _g201.random
  local read_file = _g201["read-file"]
  local reduce = _g201.reduce
  local replicate = _g201.replicate
  local reverse = _g201.reverse
  local sd = _g201.sd
  local search = _g201.search
  local setenv = _g201.setenv
  local sin = _g201.sin
  local sinh = _g201.sinh
  local some63 = _g201["some?"]
  local sort = _g201.sort
  local splice = _g201.splice
  local split = _g201.split
  local sqrt = _g201.sqrt
  local stash = _g201.stash
  local string = _g201.string
  local string_literal63 = _g201["string-literal?"]
  local string63 = _g201["string?"]
  local sub = _g201.sub
  local sublist = _g201.sublist
  local substring = _g201.substring
  local table63 = _g201["table?"]
  local tan = _g201.tan
  local tanh = _g201.tanh
  local td = _g201.td
  local tl = _g201.tl
  local toplevel63 = _g201["toplevel?"]
  local unstash = _g201.unstash
  local write = _g201.write
  local write_file = _g201["write-file"]
end)();
(function ()
  local _g377 = nexus["lumen/utilities"]
  local bind = _g377.bind
  local bind42 = _g377["bind*"]
  local bound63 = _g377["bound?"]
  local exported = _g377.exported
  local getenv = _g377.getenv
  local id = _g377.id
  local imported = _g377.imported
  local indentation = _g377.indentation
  local initial_environment = _g377["initial-environment"]
  local macro_function = _g377["macro-function"]
  local macro63 = _g377["macro?"]
  local macroexpand = _g377.macroexpand
  local mapo = _g377.mapo
  local quasiexpand = _g377.quasiexpand
  local quote_environment = _g377["quote-environment"]
  local quote_modules = _g377["quote-modules"]
  local quoted = _g377.quoted
  local reserved63 = _g377["reserved?"]
  local sortk = _g377.sortk
  local special_form63 = _g377["special-form?"]
  local special63 = _g377["special?"]
  local stash42 = _g377["stash*"]
  local statement63 = _g377["statement?"]
  local symbol_expansion = _g377["symbol-expansion"]
  local symbol63 = _g377["symbol?"]
  local toplevel63 = _g377["toplevel?"]
  local valid_id63 = _g377["valid-id?"]
  local variable63 = _g377["variable?"]
  local _g378 = nexus["lumen/compiler"]
  local compile = _g378.compile
  local compile_function = _g378["compile-function"]
  local compile_module = _g378["compile-module"]
  local eval = _g378.eval
  local in_module = _g378["in-module"]
  local load_module = _g378["load-module"]
  local open_module = _g378["open-module"]
  local _g379 = nexus["lumen/runtime"]
  local _37 = _g379["%"]
  local _37message_handler = _g379["%message-handler"]
  local _42 = _g379["*"]
  local _43 = _g379["+"]
  local _ = _g379["-"]
  local _47 = _g379["/"]
  local _60 = _g379["<"]
  local _6061 = _g379["<="]
  local _61 = _g379["="]
  local _62 = _g379[">"]
  local _6261 = _g379[">="]
  local abs = _g379.abs
  local acos = _g379.acos
  local add = _g379.add
  local apply = _g379.apply
  local asin = _g379.asin
  local atan = _g379.atan
  local atan2 = _g379.atan2
  local atom63 = _g379["atom?"]
  local boolean63 = _g379["boolean?"]
  local cat = _g379.cat
  local ceil = _g379.ceil
  local char = _g379.char
  local code = _g379.code
  local composite63 = _g379["composite?"]
  local cos = _g379.cos
  local drop = _g379.drop
  local empty63 = _g379["empty?"]
  local exclude = _g379.exclude
  local exit = _g379.exit
  local extend = _g379.extend
  local find = _g379.find
  local flat = _g379.flat
  local flat1 = _g379.flat1
  local floor = _g379.floor
  local function63 = _g379["function?"]
  local hd = _g379.hd
  local id_literal63 = _g379["id-literal?"]
  local in63 = _g379["in?"]
  local inner = _g379.inner
  local is63 = _g379["is?"]
  local iterate = _g379.iterate
  local join = _g379.join
  local keep = _g379.keep
  local keys63 = _g379["keys?"]
  local last = _g379.last
  local length = _g379.length
  local list63 = _g379["list?"]
  local log = _g379.log
  local log10 = _g379.log10
  local make_id = _g379["make-id"]
  local map = _g379.map
  local max = _g379.max
  local min = _g379.min
  local module = _g379.module
  local module_key = _g379["module-key"]
  local nil63 = _g379["nil?"]
  local none63 = _g379["none?"]
  local number = _g379.number
  local number63 = _g379["number?"]
  local pairwise = _g379.pairwise
  local pow = _g379.pow
  local random = _g379.random
  local read_file = _g379["read-file"]
  local reduce = _g379.reduce
  local replicate = _g379.replicate
  local reverse = _g379.reverse
  local sd = _g379.sd
  local search = _g379.search
  local setenv = _g379.setenv
  local sin = _g379.sin
  local sinh = _g379.sinh
  local some63 = _g379["some?"]
  local sort = _g379.sort
  local splice = _g379.splice
  local split = _g379.split
  local sqrt = _g379.sqrt
  local stash = _g379.stash
  local string = _g379.string
  local string_literal63 = _g379["string-literal?"]
  local string63 = _g379["string?"]
  local sub = _g379.sub
  local sublist = _g379.sublist
  local substring = _g379.substring
  local table63 = _g379["table?"]
  local tan = _g379.tan
  local tanh = _g379.tanh
  local td = _g379.td
  local tl = _g379.tl
  local toplevel63 = _g379["toplevel?"]
  local unstash = _g379.unstash
  local write = _g379.write
  local write_file = _g379["write-file"]
  target = "lua"
end)();
(function ()
  local _g681 = nexus["lumen/utilities"]
  local bind = _g681.bind
  local bind42 = _g681["bind*"]
  local bound63 = _g681["bound?"]
  local exported = _g681.exported
  local getenv = _g681.getenv
  local id = _g681.id
  local imported = _g681.imported
  local indentation = _g681.indentation
  local initial_environment = _g681["initial-environment"]
  local macro_function = _g681["macro-function"]
  local macro63 = _g681["macro?"]
  local macroexpand = _g681.macroexpand
  local mapo = _g681.mapo
  local quasiexpand = _g681.quasiexpand
  local quote_environment = _g681["quote-environment"]
  local quote_modules = _g681["quote-modules"]
  local quoted = _g681.quoted
  local reserved63 = _g681["reserved?"]
  local sortk = _g681.sortk
  local special_form63 = _g681["special-form?"]
  local special63 = _g681["special?"]
  local stash42 = _g681["stash*"]
  local statement63 = _g681["statement?"]
  local symbol_expansion = _g681["symbol-expansion"]
  local symbol63 = _g681["symbol?"]
  local toplevel63 = _g681["toplevel?"]
  local valid_id63 = _g681["valid-id?"]
  local variable63 = _g681["variable?"]
  local _g682 = nexus["lumen/compiler"]
  local compile = _g682.compile
  local compile_function = _g682["compile-function"]
  local compile_module = _g682["compile-module"]
  local eval = _g682.eval
  local in_module = _g682["in-module"]
  local load_module = _g682["load-module"]
  local open_module = _g682["open-module"]
  local _g683 = nexus["lumen/runtime"]
  local _37 = _g683["%"]
  local _37message_handler = _g683["%message-handler"]
  local _42 = _g683["*"]
  local _43 = _g683["+"]
  local _ = _g683["-"]
  local _47 = _g683["/"]
  local _60 = _g683["<"]
  local _6061 = _g683["<="]
  local _61 = _g683["="]
  local _62 = _g683[">"]
  local _6261 = _g683[">="]
  local abs = _g683.abs
  local acos = _g683.acos
  local add = _g683.add
  local apply = _g683.apply
  local asin = _g683.asin
  local atan = _g683.atan
  local atan2 = _g683.atan2
  local atom63 = _g683["atom?"]
  local boolean63 = _g683["boolean?"]
  local cat = _g683.cat
  local ceil = _g683.ceil
  local char = _g683.char
  local code = _g683.code
  local composite63 = _g683["composite?"]
  local cos = _g683.cos
  local drop = _g683.drop
  local empty63 = _g683["empty?"]
  local exclude = _g683.exclude
  local exit = _g683.exit
  local extend = _g683.extend
  local find = _g683.find
  local flat = _g683.flat
  local flat1 = _g683.flat1
  local floor = _g683.floor
  local function63 = _g683["function?"]
  local hd = _g683.hd
  local id_literal63 = _g683["id-literal?"]
  local in63 = _g683["in?"]
  local inner = _g683.inner
  local is63 = _g683["is?"]
  local iterate = _g683.iterate
  local join = _g683.join
  local keep = _g683.keep
  local keys63 = _g683["keys?"]
  local last = _g683.last
  local length = _g683.length
  local list63 = _g683["list?"]
  local log = _g683.log
  local log10 = _g683.log10
  local make_id = _g683["make-id"]
  local map = _g683.map
  local max = _g683.max
  local min = _g683.min
  local module = _g683.module
  local module_key = _g683["module-key"]
  local nil63 = _g683["nil?"]
  local none63 = _g683["none?"]
  local number = _g683.number
  local number63 = _g683["number?"]
  local pairwise = _g683.pairwise
  local pow = _g683.pow
  local random = _g683.random
  local read_file = _g683["read-file"]
  local reduce = _g683.reduce
  local replicate = _g683.replicate
  local reverse = _g683.reverse
  local sd = _g683.sd
  local search = _g683.search
  local setenv = _g683.setenv
  local sin = _g683.sin
  local sinh = _g683.sinh
  local some63 = _g683["some?"]
  local sort = _g683.sort
  local splice = _g683.splice
  local split = _g683.split
  local sqrt = _g683.sqrt
  local stash = _g683.stash
  local string = _g683.string
  local string_literal63 = _g683["string-literal?"]
  local string63 = _g683["string?"]
  local sub = _g683.sub
  local sublist = _g683.sublist
  local substring = _g683.substring
  local table63 = _g683["table?"]
  local tan = _g683.tan
  local tanh = _g683.tanh
  local td = _g683.td
  local tl = _g683.tl
  local toplevel63 = _g683["toplevel?"]
  local unstash = _g683.unstash
  local write = _g683.write
  local write_file = _g683["write-file"]
  modules = {lumen = {alias = {{"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}, export = {}, import = {{"lumen", "special"}}}, ["lumen/boot"] = {export = {["%initial-environment"] = {macro = function ()
    return(quote_environment(initial_environment()))
  end}, ["%initial-modules"] = {macro = function ()
    return(quote_modules())
  end}, modules = {export = true, global = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/compiler"] = {export = {["%compile-module"] = {variable = true}, ["%result"] = {export = true, global = true}, ["can-return?"] = {variable = true}, compile = {export = true, variable = true}, ["compile-args"] = {variable = true}, ["compile-atom"] = {variable = true}, ["compile-call"] = {variable = true}, ["compile-file"] = {variable = true}, ["compile-function"] = {export = true, variable = true}, ["compile-infix"] = {variable = true}, ["compile-module"] = {export = true, variable = true}, ["compile-special"] = {variable = true}, ["compiler-output"] = {variable = true}, ["compiling?"] = {variable = true}, ["current-module"] = {export = true, global = true}, encapsulate = {variable = true}, eval = {export = true, variable = true}, getop = {variable = true}, ["in-module"] = {export = true, variable = true}, infix = {variable = true}, ["infix?"] = {variable = true}, ["load-module"] = {export = true, variable = true}, lower = {variable = true}, ["lower-body"] = {variable = true}, ["lower-call"] = {variable = true}, ["lower-definition"] = {variable = true}, ["lower-do"] = {variable = true}, ["lower-for"] = {variable = true}, ["lower-function"] = {variable = true}, ["lower-if"] = {variable = true}, ["lower-infix"] = {variable = true}, ["lower-infix?"] = {variable = true}, ["lower-short"] = {variable = true}, ["lower-special"] = {variable = true}, ["lower-statement"] = {variable = true}, ["lower-try"] = {variable = true}, ["lower-while"] = {variable = true}, ["module-path"] = {variable = true}, ["op-delims"] = {variable = true}, ["open-module"] = {export = true, variable = true}, ["parenthesize-call?"] = {variable = true}, precedence = {variable = true}, process = {variable = true}, prologue = {variable = true}, run = {variable = true}, terminator = {variable = true}, ["unary?"] = {variable = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "reader"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/core"] = {export = {at = {export = true, macro = function (l, i)
    if target == "lua" and number63(i) then
      i = i + 1
    else
      if target == "lua" then
        i = {"+", i, 1}
      end
    end
    return({"get", l, i})
  end}, ["cat!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g756 = sub(bs, 0)
    return({"set", a, join({"cat", a}, _g756)})
  end}, dec = {export = true, macro = function (n, by)
    return({"set", n, {"-", n, by or 1}})
  end}, define = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g730 = sub(body, 0)
    setenv(name, {_stash = true, variable = true})
    if some63(_g730) then
      local _g731 = bind42(x, _g730)
      local args = _g731[1]
      local _g732 = _g731[2]
      return(join({"%local-function", name, args}, _g732))
    else
      return({"%local", name, x})
    end
  end}, ["define*"] = {export = true, macro = function (name, x, ...)
    local body = unstash({...})
    local _g739 = sub(body, 0)
    setenv(name, {_stash = true, export = true, global = true})
    if some63(_g739) then
      local _g740 = bind42(x, _g739)
      local args = _g740[1]
      local _g741 = _g740[2]
      return(join({"%global-function", name, args}, _g741))
    else
      if target == "js" then
        return({"set", {"get", "global", {"quote", id(name)}}, x})
      else
        return({"set", name, x})
      end
    end
  end}, ["define-macro"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g726 = sub(body, 0)
    local form = join({"fn", args}, _g726)
    local _g727 = {"setenv", {"quote", name}}
    _g727.form = {"quote", form}
    _g727.macro = form
    eval(_g727)
    return(nil)
  end}, ["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g763 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g763.alias
    local exp = _g763.export
    local imp = _g763.import
    local _g764 = imp or {}
    local _g765 = 0
    while _g765 < length(_g764) do
      local k = _g764[_g765 + 1]
      load_module(k)
      local _g766 = module(k).alias or {}
      local _g767 = 0
      while _g767 < length(_g766) do
        local a = _g766[_g767 + 1]
        add(imp, a)
        _g767 = _g767 + 1
      end
      imports = join(imports, imported(k))
      _g765 = _g765 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g768 = exp or {}
    local _g769 = 0
    while _g769 < length(_g768) do
      local k = _g768[_g769 + 1]
      setenv(k, {_stash = true, export = true})
      _g769 = _g769 + 1
    end
    return(join({"do"}, imports))
  end}, ["define-special"] = {export = true, macro = function (name, args, ...)
    local body = unstash({...})
    local _g760 = sub(body, 0)
    local form = join({"fn", args}, _g760)
    local keys = sub(_g760, length(_g760))
    local _g761 = {"setenv", {"quote", name}}
    _g761.form = {"quote", form}
    _g761.special = form
    eval(join(_g761, keys))
    return(nil)
  end}, ["define-symbol"] = {export = true, macro = function (name, expansion)
    setenv(name, {_stash = true, symbol = expansion})
    return(nil)
  end}, each = {export = true, macro = function (b, t, ...)
    local body = unstash({...})
    local _g753 = sub(body, 0)
    local k = b[1]
    local v = b[2]
    local t1 = make_id()
    local _g786
    if nil63(v) then
      local _g787
      if b.i then
        _g787 = "i"
      else
        _g787 = make_id()
      end
      local i = _g787
      _g786 = {"let", {i, 0}, {"while", {"<", i, {"length", t1}}, join({"let", {k, {"at", t1, i}}}, _g753), {"inc", i}}}
    else
      local _g754 = {"target"}
      _g754.js = {"isNaN", {"parseInt", k}}
      _g754.lua = {"not", {"number?", k}}
      _g786 = {"let", {k, "nil"}, {"%for", t1, k, {"when", _g754, join({"let", {v, {"get", t1, k}}}, _g753)}}}
    end
    return({"let", {t1, t}, _g786})
  end}, fn = {export = true, macro = function (args, ...)
    local body = unstash({...})
    local _g733 = sub(body, 0)
    local _g734 = bind42(args, _g733)
    local _g735 = _g734[1]
    local _g736 = _g734[2]
    return(join({"%function", _g735}, _g736))
  end}, guard = {export = true, macro = function (expr)
    if target == "js" then
      return({{"fn", {}, {"%try", {"list", true, expr}}}})
    else
      local e = make_id()
      local x = make_id()
      local ex = "|" .. e .. "," .. x .. "|"
      return({"let", {ex, {"xpcall", {"fn", {}, expr}, "%message-handler"}}, {"list", e, x}})
    end
  end}, ["if"] = {export = true, macro = function (...)
    local branches = unstash({...})
    local function step(_g742)
      local a = _g742[1]
      local b = _g742[2]
      local c = sub(_g742, 2)
      if is63(b) then
        return({join({"%if", a, b}, step(c))})
      else
        if is63(a) then
          return({a})
        end
      end
    end
    return(hd(step(branches)))
  end}, inc = {export = true, macro = function (n, by)
    return({"set", n, {"+", n, by or 1}})
  end}, ["join!"] = {export = true, macro = function (a, ...)
    local bs = unstash({...})
    local _g747 = sub(bs, 0)
    return({"set", a, join({"join*", a}, _g747)})
  end}, ["join*"] = {export = true, macro = function (...)
    local xs = unstash({...})
    return(reduce(function (a, b)
      return({"join", a, b})
    end, xs))
  end}, language = {export = true, macro = function ()
    return({"quote", target})
  end}, let = {export = true, macro = function (bindings, ...)
    local body = unstash({...})
    local _g748 = sub(body, 0)
    local i = 0
    local renames = {}
    local locals = {}
    map(function (_g749)
      local lh = _g749[1]
      local rh = _g749[2]
      local _g750 = bind(lh, rh)
      local _g751 = 0
      while _g751 < length(_g750) do
        local _g752 = _g750[_g751 + 1]
        local id = _g752[1]
        local val = _g752[2]
        if bound63(id) or reserved63(id) or toplevel63() then
          local rename = make_id()
          add(renames, id)
          add(renames, rename)
          id = rename
        else
          setenv(id, {_stash = true, variable = true})
        end
        add(locals, {"%local", id, val})
        _g751 = _g751 + 1
      end
    end, pairwise(bindings))
    return(join({"do"}, join(locals, {join({"let-symbol", renames}, _g748)})))
  end}, ["let-macro"] = {export = true, macro = function (definitions, ...)
    local body = unstash({...})
    local _g737 = sub(body, 0)
    add(environment, {})
    map(function (m)
      return(macroexpand(join({"define-macro"}, m)))
    end, definitions)
    local _g738 = join({"do"}, macroexpand(_g737))
    drop(environment)
    return(_g738)
  end}, ["let-symbol"] = {export = true, macro = function (expansions, ...)
    local body = unstash({...})
    local _g757 = sub(body, 0)
    add(environment, {})
    map(function (_g759)
      local name = _g759[1]
      local exp = _g759[2]
      return(macroexpand({"define-symbol", name, exp}))
    end, pairwise(expansions))
    local _g758 = join({"do"}, macroexpand(_g757))
    drop(environment)
    return(_g758)
  end}, list = {export = true, macro = function (...)
    local body = unstash({...})
    local l = join({"%array"}, body)
    if not keys63(body) then
      return(l)
    else
      local id = make_id()
      local init = {}
      local _g755 = body
      local k = nil
      for k in next, _g755 do
        if not number63(k) then
          local v = _g755[k]
          add(init, {k, {"set", {"get", id, {"quote", k}}, v}})
        end
      end
      return(join({"let", {id, l}}, join(map(sd, sortk(init, hd)), {id})))
    end
  end}, pr = {export = true, macro = function (...)
    local xs = unstash({...})
    local _g725 = map(function (x)
      return(splice({{"string", x}, "\" \""}))
    end, xs)
    return({"print", join({"cat"}, _g725)})
  end}, quasiquote = {export = true, macro = function (form)
    return(quasiexpand(form, 1))
  end}, quote = {export = true, macro = function (form)
    return(quoted(form))
  end}, ["set-of"] = {export = true, macro = function (...)
    local elements = unstash({...})
    local l = {}
    local _g728 = elements
    local _g729 = 0
    while _g729 < length(_g728) do
      local e = _g728[_g729 + 1]
      l[e] = true
      _g729 = _g729 + 1
    end
    return(join({"table"}, l))
  end}, table = {export = true, macro = function (...)
    local body = unstash({...})
    return(join({"%object"}, mapo(function (x)
      return(x)
    end, body)))
  end}, target = {export = true, global = true, macro = function (...)
    local clauses = unstash({...})
    return(clauses[target])
  end}, unless = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g762 = sub(body, 0)
    return({"if", {"not", cond}, join({"do"}, _g762)})
  end}, when = {export = true, macro = function (cond, ...)
    local body = unstash({...})
    local _g722 = sub(body, 0)
    return({"if", cond, join({"do"}, _g722)})
  end}, ["with-bindings"] = {export = true, macro = function (_g743, ...)
    local names = _g743[1]
    local body = unstash({...})
    local _g744 = sub(body, 0)
    local x = make_id()
    local _g746 = {"setenv", x}
    _g746.variable = true
    local _g745 = {"with-frame", {"each", {x}, names, _g746}}
    _g745.scope = true
    return(join(_g745, _g744))
  end}, ["with-frame"] = {export = true, macro = function (...)
    local body = unstash({...})
    local _g723 = sub(body, 0)
    local scope = body.scope
    local x = make_id()
    local _g724 = {"table"}
    _g724._scope = scope
    return({"do", {"add", "environment", _g724}, {"let", {x, join({"do"}, _g723)}, {"drop", "environment"}, x}})
  end}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/main"] = {export = {save = {macro = function (...)
    local specs = unstash({...})
    local _g772 = sub(specs, 0)
    map(compile_module, _g772)
    return(nil)
  end}}, import = {{"lumen"}, {"lumen", "reader"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/reader"] = {export = {["define-reader"] = {export = true, macro = function (_g770, ...)
    local char = _g770[1]
    local stream = _g770[2]
    local body = unstash({...})
    local _g771 = sub(body, 0)
    return({"set", {"get", "read-table", char}, join({"fn", {stream}}, _g771)})
  end}, delimiters = {variable = true}, eof = {variable = true}, ["flag?"] = {variable = true}, ["key?"] = {variable = true}, ["make-stream"] = {export = true, variable = true}, ["peek-char"] = {variable = true}, read = {export = true, variable = true}, ["read-all"] = {export = true, variable = true}, ["read-char"] = {variable = true}, ["read-from-string"] = {export = true, variable = true}, ["read-table"] = {export = true, variable = true}, ["skip-non-code"] = {variable = true}, whitespace = {variable = true}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/runtime"] = {export = {["%"] = {export = true, variable = true}, ["%message-handler"] = {export = true, variable = true}, ["*"] = {export = true, variable = true}, ["+"] = {export = true, variable = true}, ["-"] = {export = true, variable = true}, ["/"] = {export = true, variable = true}, ["<"] = {export = true, variable = true}, ["<="] = {export = true, variable = true}, ["="] = {export = true, variable = true}, [">"] = {export = true, variable = true}, [">="] = {export = true, variable = true}, abs = {export = true, variable = true}, acos = {export = true, variable = true}, add = {export = true, variable = true}, apply = {export = true, variable = true}, asin = {export = true, variable = true}, atan = {export = true, variable = true}, atan2 = {export = true, variable = true}, ["atom?"] = {export = true, variable = true}, ["boolean?"] = {export = true, variable = true}, cat = {export = true, variable = true}, ceil = {export = true, variable = true}, char = {export = true, variable = true}, code = {export = true, variable = true}, ["composite?"] = {export = true, variable = true}, cos = {export = true, variable = true}, drop = {export = true, variable = true}, ["empty?"] = {export = true, variable = true}, exclude = {export = true, variable = true}, exit = {export = true, variable = true}, extend = {export = true, variable = true}, find = {export = true, variable = true}, flat = {export = true, variable = true}, flat1 = {export = true, variable = true}, floor = {export = true, variable = true}, ["function?"] = {export = true, variable = true}, hd = {export = true, variable = true}, ["id-count"] = {variable = true}, ["id-literal?"] = {export = true, variable = true}, ["in?"] = {export = true, variable = true}, inner = {export = true, variable = true}, ["is?"] = {export = true, variable = true}, iterate = {export = true, variable = true}, join = {export = true, variable = true}, keep = {export = true, variable = true}, ["keys?"] = {export = true, variable = true}, last = {export = true, variable = true}, length = {export = true, variable = true}, ["list?"] = {export = true, variable = true}, log = {export = true, variable = true}, log10 = {export = true, variable = true}, ["make-id"] = {export = true, variable = true}, map = {export = true, variable = true}, mapl = {variable = true}, math = {variable = true}, max = {export = true, variable = true}, min = {export = true, variable = true}, module = {export = true, variable = true}, ["module-key"] = {export = true, variable = true}, ["nil?"] = {export = true, variable = true}, ["none?"] = {export = true, variable = true}, number = {export = true, variable = true}, ["number?"] = {export = true, variable = true}, pairwise = {export = true, variable = true}, pow = {export = true, variable = true}, random = {export = true, variable = true}, ["read-file"] = {export = true, variable = true}, reduce = {export = true, variable = true}, replicate = {export = true, variable = true}, reverse = {export = true, variable = true}, sd = {export = true, variable = true}, search = {export = true, variable = true}, setenv = {export = true, variable = true}, sin = {export = true, variable = true}, sinh = {export = true, variable = true}, ["some?"] = {export = true, variable = true}, sort = {export = true, variable = true}, splice = {export = true, variable = true}, ["splice?"] = {variable = true}, split = {export = true, variable = true}, sqrt = {export = true, variable = true}, stash = {export = true, variable = true}, string = {export = true, variable = true}, ["string-literal?"] = {export = true, variable = true}, ["string?"] = {export = true, variable = true}, sub = {export = true, variable = true}, sublist = {export = true, variable = true}, substring = {export = true, variable = true}, ["table?"] = {export = true, variable = true}, tan = {export = true, variable = true}, tanh = {export = true, variable = true}, td = {export = true, variable = true}, tl = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, unstash = {export = true, variable = true}, write = {export = true, variable = true}, ["write-file"] = {export = true, variable = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/special"] = {export = {["%array"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local _g776
    if target == "lua" then
      _g776 = "{"
    else
      _g776 = "["
    end
    local open = _g776
    local _g777
    if target == "lua" then
      _g777 = "}"
    else
      _g777 = "]"
    end
    local close = _g777
    local str = ""
    local _g715 = forms
    local i = 0
    while i < length(_g715) do
      local x = _g715[i + 1]
      str = str .. compile(x)
      if i < length(forms) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(open .. str .. close)
  end}, ["%for"] = {export = true, foo = true, special = function (t, k, form)
    local _g701 = compile(t)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g702 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g702
    if target == "lua" then
      return(ind .. "for " .. k .. " in next, " .. _g701 .. " do\n" .. body .. ind .. "end\n")
    else
      return(ind .. "for (" .. k .. " in " .. _g701 .. ") {\n" .. body .. ind .. "}\n")
    end
  end, stmt = true, tr = true}, ["%function"] = {export = true, foo = true, special = function (args, body)
    return(compile_function(args, body))
  end}, ["%global-function"] = {export = true, foo = true, special = function (name, args, body)
    if target == "lua" then
      local x = compile_function(args, body, {_stash = true, name = name})
      return(indentation() .. x)
    else
      return(compile({"set", name, {"%function", args, body}}, {_stash = true, stmt = true}))
    end
  end, stmt = true, tr = true}, ["%if"] = {export = true, foo = true, special = function (cond, cons, alt)
    local _g703 = compile(cond)
    indent_level = indent_level + 1
    local _g706 = compile(cons, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local _g704 = _g706
    local _g773
    if alt then
      indent_level = indent_level + 1
      local _g707 = compile(alt, {_stash = true, stmt = true})
      indent_level = indent_level - 1
      _g773 = _g707
    end
    local _g705 = _g773
    local ind = indentation()
    local str = ""
    if target == "js" then
      str = str .. ind .. "if (" .. _g703 .. ") {\n" .. _g704 .. ind .. "}"
    else
      str = str .. ind .. "if " .. _g703 .. " then\n" .. _g704
    end
    if _g705 and target == "js" then
      str = str .. " else {\n" .. _g705 .. ind .. "}"
    else
      if _g705 then
        str = str .. ind .. "else\n" .. _g705
      end
    end
    if target == "lua" then
      return(str .. ind .. "end\n")
    else
      return(str .. "\n")
    end
  end, stmt = true, tr = true}, ["%local"] = {export = true, foo = true, special = function (name, value)
    local id = compile(name)
    local value1 = compile(value)
    local _g778
    if is63(value) then
      _g778 = " = " .. value1
    else
      _g778 = ""
    end
    local rh = _g778
    local _g779
    if target == "js" then
      _g779 = "var "
    else
      _g779 = "local "
    end
    local keyword = _g779
    local ind = indentation()
    return(ind .. keyword .. id .. rh)
  end, stmt = true}, ["%local-function"] = {export = true, foo = true, special = function (name, args, body)
    local x = compile_function(args, body, {_stash = true, name = name, prefix = "local "})
    return(indentation() .. x)
  end, stmt = true, tr = true}, ["%object"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = "{"
    local _g780
    if target == "lua" then
      _g780 = " = "
    else
      _g780 = ": "
    end
    local sep = _g780
    local pairs = sortk(pairwise(forms), hd)
    local _g716 = pairs
    local i = 0
    while i < length(_g716) do
      local _g717 = _g716[i + 1]
      local k = _g717[1]
      local v = _g717[2]
      if not string63(k) then
        error("Illegal key: " .. string(k))
      end
      local _g718 = compile(v)
      local _g781
      if valid_id63(k) then
        _g781 = k
      else
        local _g782
        if target == "js" and string_literal63(k) then
          _g782 = k
        else
          local _g783
          if target == "js" then
            _g783 = quoted(k)
          else
            local _g784
            if string_literal63(k) then
              _g784 = "[" .. k .. "]"
            else
              _g784 = "[" .. quoted(k) .. "]"
            end
            _g783 = _g784
          end
          _g782 = _g783
        end
        _g781 = _g782
      end
      local _g719 = _g781
      str = str .. _g719 .. sep .. _g718
      if i < length(pairs) - 1 then
        str = str .. ", "
      end
      i = i + 1
    end
    return(str .. "}")
  end}, ["%try"] = {export = true, foo = true, special = function (form)
    local ind = indentation()
    indent_level = indent_level + 1
    local _g708 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g708
    local e = make_id()
    local hf = {"return", {"%array", false, {"get", e, "\"message\""}}}
    indent_level = indent_level + 1
    local _g709 = compile(hf, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local h = _g709
    return(ind .. "try {\n" .. body .. ind .. "}\n" .. ind .. "catch (" .. e .. ") {\n" .. h .. ind .. "}\n")
  end, stmt = true, tr = true}, ["break"] = {export = true, foo = true, special = function ()
    return(indentation() .. "break")
  end, stmt = true}, ["do"] = {export = true, foo = true, special = function (...)
    local forms = unstash({...})
    local str = ""
    local _g720 = forms
    local _g721 = 0
    while _g721 < length(_g720) do
      local x = _g720[_g721 + 1]
      str = str .. compile(x, {_stash = true, stmt = true})
      _g721 = _g721 + 1
    end
    return(str)
  end, stmt = true, tr = true}, ["error"] = {export = true, foo = true, special = function (x)
    local _g785
    if target == "js" then
      _g785 = "throw new " .. compile({"Error", x})
    else
      _g785 = "error(" .. compile(x) .. ")"
    end
    local e = _g785
    return(indentation() .. e)
  end, stmt = true}, ["get"] = {export = true, foo = true, special = function (t, k)
    local _g700 = compile(t)
    local k1 = compile(k)
    if target == "lua" and char(_g700, 0) == "{" then
      _g700 = "(" .. _g700 .. ")"
    end
    if string_literal63(k) and valid_id63(inner(k)) then
      return(_g700 .. "." .. inner(k))
    else
      return(_g700 .. "[" .. k1 .. "]")
    end
  end}, ["not"] = {}, ["return"] = {export = true, foo = true, special = function (x)
    local _g774
    if nil63(x) then
      _g774 = "return"
    else
      _g774 = "return(" .. compile(x) .. ")"
    end
    local _g710 = _g774
    return(indentation() .. _g710)
  end, stmt = true}, ["set"] = {export = true, foo = true, special = function (lh, rh)
    local _g711 = compile(lh)
    local _g775
    if nil63(rh) then
      _g775 = "nil"
    else
      _g775 = rh
    end
    local _g712 = compile(_g775)
    return(indentation() .. _g711 .. " = " .. _g712)
  end, stmt = true}, ["while"] = {export = true, foo = true, special = function (cond, form)
    local _g713 = compile(cond)
    indent_level = indent_level + 1
    local _g714 = compile(form, {_stash = true, stmt = true})
    indent_level = indent_level - 1
    local body = _g714
    local ind = indentation()
    if target == "js" then
      return(ind .. "while (" .. _g713 .. ") {\n" .. body .. ind .. "}\n")
    else
      return(ind .. "while " .. _g713 .. " do\n" .. body .. ind .. "end\n")
    end
  end, stmt = true, tr = true}}, import = {{"lumen"}, {"lumen", "utilities"}, {"lumen", "compiler"}, {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}, ["lumen/system"] = {export = {nexus = {export = true, global = true}}, import = {{"lumen", "special"}, {"lumen", "core"}}}, ["lumen/utilities"] = {export = {bind = {export = true, variable = true}, ["bind*"] = {export = true, variable = true}, ["bound?"] = {export = true, variable = true}, ["can-unquote?"] = {variable = true}, escape = {variable = true}, exported = {export = true, variable = true}, getenv = {export = true, variable = true}, ["global?"] = {variable = true}, id = {export = true, variable = true}, imported = {export = true, variable = true}, ["indent-level"] = {export = true, global = true}, indentation = {export = true, variable = true}, ["initial-environment"] = {export = true, variable = true}, ["macro-function"] = {export = true, variable = true}, ["macro?"] = {export = true, variable = true}, macroexpand = {export = true, variable = true}, mapo = {export = true, variable = true}, ["numeric?"] = {variable = true}, quasiexpand = {export = true, variable = true}, ["quasiquote-list"] = {variable = true}, ["quasiquoting?"] = {variable = true}, ["quasisplice?"] = {variable = true}, ["quote-binding"] = {variable = true}, ["quote-environment"] = {export = true, variable = true}, ["quote-frame"] = {variable = true}, ["quote-module"] = {variable = true}, ["quote-modules"] = {export = true, variable = true}, quoted = {export = true, variable = true}, ["quoting?"] = {variable = true}, reserved = {variable = true}, ["reserved?"] = {export = true, variable = true}, sortk = {export = true, variable = true}, ["special-form?"] = {export = true, variable = true}, ["special?"] = {export = true, variable = true}, ["stash*"] = {export = true, variable = true}, ["statement?"] = {export = true, variable = true}, ["symbol-expansion"] = {export = true, variable = true}, ["symbol?"] = {export = true, variable = true}, ["toplevel?"] = {export = true, variable = true}, ["valid-char?"] = {variable = true}, ["valid-id?"] = {export = true, variable = true}, ["variable?"] = {export = true, variable = true}, ["with-indent"] = {export = true, macro = function (form)
    local result = make_id()
    return({"do", {"inc", "indent-level"}, {"let", {result, form}, {"dec", "indent-level"}, result}})
  end}}, import = {"lumen", {"lumen", "runtime"}, {"lumen", "special"}, {"lumen", "core"}}}}
  environment = {{["define-module"] = {export = true, macro = function (spec, ...)
    local body = unstash({...})
    local _g788 = sub(body, 0)
    local imports = {}
    local aliased = {}
    local alias = _g788.alias
    local exp = _g788.export
    local imp = _g788.import
    local _g789 = imp or {}
    local _g790 = 0
    while _g790 < length(_g789) do
      local k = _g789[_g790 + 1]
      load_module(k)
      local _g791 = module(k).alias or {}
      local _g792 = 0
      while _g792 < length(_g791) do
        local a = _g791[_g792 + 1]
        add(imp, a)
        _g792 = _g792 + 1
      end
      imports = join(imports, imported(k))
      _g790 = _g790 + 1
    end
    modules[module_key(spec)] = {alias = alias, export = {}, import = imp}
    local _g793 = exp or {}
    local _g794 = 0
    while _g794 < length(_g793) do
      local k = _g793[_g794 + 1]
      setenv(k, {_stash = true, export = true})
      _g794 = _g794 + 1
    end
    return(join({"do"}, imports))
  end}}}
end)();
(function ()
  local _g3 = nexus["lumen/reader"]
  local make_stream = _g3["make-stream"]
  local read = _g3.read
  local read_all = _g3["read-all"]
  local read_from_string = _g3["read-from-string"]
  local read_table = _g3["read-table"]
  local _g4 = nexus["lumen/compiler"]
  local compile = _g4.compile
  local compile_function = _g4["compile-function"]
  local compile_module = _g4["compile-module"]
  local eval = _g4.eval
  local in_module = _g4["in-module"]
  local load_module = _g4["load-module"]
  local open_module = _g4["open-module"]
  local _g5 = nexus["lumen/runtime"]
  local _37 = _g5["%"]
  local _37message_handler = _g5["%message-handler"]
  local _42 = _g5["*"]
  local _43 = _g5["+"]
  local _ = _g5["-"]
  local _47 = _g5["/"]
  local _60 = _g5["<"]
  local _6061 = _g5["<="]
  local _61 = _g5["="]
  local _62 = _g5[">"]
  local _6261 = _g5[">="]
  local abs = _g5.abs
  local acos = _g5.acos
  local add = _g5.add
  local apply = _g5.apply
  local asin = _g5.asin
  local atan = _g5.atan
  local atan2 = _g5.atan2
  local atom63 = _g5["atom?"]
  local boolean63 = _g5["boolean?"]
  local cat = _g5.cat
  local ceil = _g5.ceil
  local char = _g5.char
  local code = _g5.code
  local composite63 = _g5["composite?"]
  local cos = _g5.cos
  local drop = _g5.drop
  local empty63 = _g5["empty?"]
  local exclude = _g5.exclude
  local exit = _g5.exit
  local extend = _g5.extend
  local find = _g5.find
  local flat = _g5.flat
  local flat1 = _g5.flat1
  local floor = _g5.floor
  local function63 = _g5["function?"]
  local hd = _g5.hd
  local id_literal63 = _g5["id-literal?"]
  local in63 = _g5["in?"]
  local inner = _g5.inner
  local is63 = _g5["is?"]
  local iterate = _g5.iterate
  local join = _g5.join
  local keep = _g5.keep
  local keys63 = _g5["keys?"]
  local last = _g5.last
  local length = _g5.length
  local list63 = _g5["list?"]
  local log = _g5.log
  local log10 = _g5.log10
  local make_id = _g5["make-id"]
  local map = _g5.map
  local max = _g5.max
  local min = _g5.min
  local module = _g5.module
  local module_key = _g5["module-key"]
  local nil63 = _g5["nil?"]
  local none63 = _g5["none?"]
  local number = _g5.number
  local number63 = _g5["number?"]
  local pairwise = _g5.pairwise
  local pow = _g5.pow
  local random = _g5.random
  local read_file = _g5["read-file"]
  local reduce = _g5.reduce
  local replicate = _g5.replicate
  local reverse = _g5.reverse
  local sd = _g5.sd
  local search = _g5.search
  local setenv = _g5.setenv
  local sin = _g5.sin
  local sinh = _g5.sinh
  local some63 = _g5["some?"]
  local sort = _g5.sort
  local splice = _g5.splice
  local split = _g5.split
  local sqrt = _g5.sqrt
  local stash = _g5.stash
  local string = _g5.string
  local string_literal63 = _g5["string-literal?"]
  local string63 = _g5["string?"]
  local sub = _g5.sub
  local sublist = _g5.sublist
  local substring = _g5.substring
  local table63 = _g5["table?"]
  local tan = _g5.tan
  local tanh = _g5.tanh
  local td = _g5.td
  local tl = _g5.tl
  local toplevel63 = _g5["toplevel?"]
  local unstash = _g5.unstash
  local write = _g5.write
  local write_file = _g5["write-file"]
  local function rep(str)
    local _g797,_g798 = xpcall(function ()
      return(eval(read_from_string(str)))
    end, _37message_handler)
    local _g796 = {_g797, _g798}
    local _g1 = _g796[1]
    local x = _g796[2]
    if is63(x) then
      return(print(string(x) .. " "))
    end
  end
  local function repl()
    local function step(str)
      rep(str)
      return(write("> "))
    end
    write("> ")
    while true do
      local str = io.read()
      if str then
        step(str)
      else
        break
      end
    end
  end
  local function usage()
    print(string("usage: lumen [options] <module>") .. " ")
    print(string("options:") .. " ")
    print(string("  -o <output>\tOutput file") .. " ")
    print(string("  -t <target>\tTarget language (default: lua)") .. " ")
    print(string("  -e <expr>\tExpression to evaluate") .. " ")
    return(exit())
  end
  local function main()
    local args = arg
    if hd(args) == "-h" or hd(args) == "--help" then
      usage()
    end
    local spec = nil
    local output = nil
    local target1 = nil
    local expr = nil
    local _g799 = args
    local i = 0
    while i < length(_g799) do
      local arg = _g799[i + 1]
      if arg == "-o" or arg == "-t" or arg == "-e" then
        if i == length(args) - 1 then
          print(string("missing argument for") .. " " .. string(arg) .. " ")
        else
          i = i + 1
          local val = args[i + 1]
          if arg == "-o" then
            output = val
          else
            if arg == "-t" then
              target1 = val
            else
              if arg == "-e" then
                expr = val
              end
            end
          end
        end
      else
        if nil63(spec) and "-" ~= char(arg, 0) then
          spec = arg
        end
      end
      i = i + 1
    end
    if output then
      if target1 then
        target = target1
      end
      return(write_file(output, compile_module(spec)))
    else
      in_module(spec or {"lumen", "main"})
      if expr then
        return(rep(expr))
      else
        return(repl())
      end
    end
  end
  main()
  local _g800 = {}
  nexus["lumen/main"] = _g800
  _g800.main = main
  _g800.rep = rep
  _g800.repl = repl
  _g800.usage = usage
end)();
