(ns dax.compiler)

(define-global getenv (k p)
  (when (string? k)
    (let i (edge (_G .environment))
      (while (>= i 0)
        (let b (_G .environment [i] [k])
          (if (is? b)
              (return (if p (b [p]) b))
            (dec i)))))))

(define macro-function (k)
  (getenv k 'macro))

(define macro? (k)
  (is? (macro-function k)))

(define special? (k)
  (is? (getenv k 'special)))

(define special-form? (form)
  (and (not (atom? form)) (special? (hd form))))

(define statement? (k)
  (and (special? k) (getenv k 'stmt)))

(define symbol-expansion (k)
  (getenv k 'symbol))

(define symbol-macro? (k)
  (is? (symbol-expansion k)))

(define variable? (k)
  (is? (getenv k 'variable)))

(define-global bound? (x)
  (or (macro? x)
      (special? x)
      (symbol-macro? x)
      (variable? x)))

(define-global quoted (form)
  (if (string? form) (escape form)
      (atom? form) form
      (keys? form)
      `(%object ,@(mapo quoted form))
    `(%array ,@(map quoted form))))

(define literal (s)
  (if (string-literal? s) s (quoted s)))

(define stash* (args)
  (if (keys? args)
      (let l '(%object "_stash" true)
        (each (k v) args
          (unless (number? k)
            (add l (literal k))
            (add l v)))
        (join args (list l)))
    args))

(define bias (k)
  k)

(define default-assignment-op 'o)

(define-global default-assignment? (x)
  (and (not (atom? x))
       (= (hd x) default-assignment-op)))

(define-global bind (lh rh)
  (if (atom? lh) `(,lh ,rh)
      (default-assignment? lh)
      (bind (at lh 1) `(if (is? ,rh) ,rh ,(at lh 2)))
    (let-unique (id)
      (with bs (list id rh)
        (each (k v) lh
          (let x (if (= k 'rest)
                     `(cut ,id ,(# lh))
                   `(,id [',k]))
            (when (is? k)
              (let k (if (= v true) k v)
                (join! bs (bind k x))))))))))

(define-global bind* (args body)
  (let args1 (list)
    (%local-function rest (r)
      (set (args1 .rest) r)
      `(unstash ,r))
    (if (atom? args)
        (list args1 `(let ,(list args (rest args)) ,@body))
      (let bs (list)
        (let-unique (r)
          (each (k v) args
            (when (number? k)
              (if (atom? v) (add args1 v)
                (let-unique (x)
                  (add args1 x)
                  (join! bs (list v x))))))
          (when (keys? args)
            (join! bs (list r (rest r)))
            (let n (# args1)
              (for i n
                (let v (at args1 i)
                  (join! bs (list v `(destash! ,v ,r))))))
            (join! bs (list (keys args) r))))
        (list args1 `(let ,bs ,@body))))))

(define quoting? (depth)
  (number? depth))

(define quasiquoting? (depth)
  (and (quoting? depth) (> depth 0)))

(define can-unquote? (depth)
  (and (quoting? depth) (= depth 1)))

(define quasisplice? (x depth)
  (and (can-unquote? depth)
       (not (atom? x))
       (= (hd x) 'unquote-splicing)))

(define expand-local ((x name value))
  (setenv name variable: true)
  `(%local ,name ,(macroexpand value)))

(define expand-function ((x args rest: body))
  (with-bindings (args)
    `(%function ,args ,@(macroexpand body))))

(define expand-table ((x rest: args))
  (with expr `(,x ,@(keys args))
    (step x args
      (if (atom? x) (add expr `(,x ,(macroexpand x)))
          (<= (# x) 2)
          (let ((name v) x)
            (add expr `(,(macroexpand name) ,(macroexpand v))))
        (let ((prefix name args rest: body) x)
          (if (some? body)
              (let ((args1 body1) (bind* args body))
                (with-bindings (args1)
                  (add expr `(,prefix ,(macroexpand name) ,args1 ,(macroexpand body1)))))
            (add expr `(,prefix ,(macroexpand name) ,(macroexpand args)))))))))

(define expand-class ((x name rest: body))
  `(,x ,name ,@(tl (expand-table `(%table ,@body)))))

(define-global expand-condition-case ((x var form rest: clauses))
  `(%condition-case ,var
     ,(macroexpand form)
     ,@(map (fn ((which rest: body))
              (if (= which 'finally)
                  `(,which ,@(map macroexpand body))
                (with-bindings ((list var))
                  `(,which ,@(map macroexpand body)))))
            clauses)))

(define expand-definition ((x name args rest: body))
  (with-bindings (args)
    `(,x ,name ,args ,@(macroexpand body))))

(define expand-macro (form)
  (macroexpand (expand1 form)))

(define-global expand1 ((name rest: body))
  (apply (macro-function name) body))

(define-global macroexpand (form)
  (if (symbol-macro? form)
      (macroexpand (symbol-expansion form))
      (atom? form) form
    (let x (hd form)
      (if (= x '%local) (expand-local form)
          (= x '%function) (expand-function form)
          (= x '%table) (expand-table form)
          (= x '%class) (expand-class form)
          (= x '%condition-case) (expand-condition-case form)
          (= x '%global-function) (expand-definition form)
          (= x '%local-function) (expand-definition form)
          (macro? x) (expand-macro form)
        (map macroexpand form)))))

(define quasiquote-list (form depth)
  (let xs (list '(list))
    (each (k v) form
      (unless (number? k)
        (let v (if (quasisplice? v depth)
                   ;; don't splice, just expand
                   (quasiexpand (at v 1))
                 (quasiexpand v depth))
          (set ((last xs) [k]) v))))
    ;; collect sibling lists
    (step x form
      (if (quasisplice? x depth)
          (let x (quasiexpand (at x 1))
            (add xs x)
            (add xs '(list)))
        (add (last xs) (quasiexpand x depth))))
    (let pruned
        (keep (fn (x)
                (or (> (# x) 1)
                    (not (= (hd x) 'list))
                    (keys? x)))
              xs)
      (if (one? pruned)
          (hd pruned)
        `(join ,@pruned)))))

(define-global quasiexpand (form depth)
  (if (quasiquoting? depth)
      (if (atom? form) (list 'quote form)
          ;; unquote
          (and (can-unquote? depth)
               (= (hd form) 'unquote))
          (quasiexpand (at form 1))
          ;; decrease quasiquoting depth
          (or (= (hd form) 'unquote)
              (= (hd form) 'unquote-splicing))
          (quasiquote-list form (- depth 1))
          ;; increase quasiquoting depth
          (= (hd form) 'quasiquote)
          (quasiquote-list form (+ depth 1))
        (quasiquote-list form depth))
      (atom? form) form
      (= (hd form) 'quote) form
      (= (hd form) 'quasiquote)
      ;; start quasiquoting
      (quasiexpand (at form 1) 1)
    (map (fn (x) (quasiexpand x depth)) form)))

(define-global expand-if ((a b rest: c))
  (if (is? b) `((%if ,a ,b ,@(expand-if c)))
      (is? a) (list a)))

(define-global indent-level 0)

(define-global indentation ()
  (with s ""
    (for i indent-level
      (cat! s "  "))))

(define reserved
  (set-of "=" "==" "+" "-" "%" "*" "/" "<" ">" "<=" ">="
          ;; js
          "break" "case" "catch" "class" "const" "continue"
          "debugger" "default" "delete" "do" "else" "eval"
          "export" "extends" "finally" "for" "function" "if"
          "import" "in" "instanceof" "new" "return" "switch"
          "throw" "try" "typeof" "var" "void" "while" "with"))

(define-global reserved? (x)
  (has? reserved x))

(define valid-code? (n)
  (or (number-code? n)
      (and (>= n ?A) (<= n ?Z))
      (and (>= n ?a) (<= n ?z))
      (= n ?_)))

(define-global accessor? (x)
  (or (and (string? x)
           (> (# x) 1)
           (= (code x 0) ?.)
           (not (= (code x 1) ?.)))
      (and (obj? x)
           (= (hd x) '%brackets))))

(define-global camel-case-regex
  (new RegExp "(?<=[a-z])[-](\\w|$)" "g"))

(define-global camel-case (name)
  (if (string? name)
      (name .replace camel-case-regex
            (fn (_ x) (x (.to-upper-case))))
    name))

(define fqn? (x)
  (and (string? x)
       (not (string-literal? x))
       (let i (search x "/")
         (and (is? i)
              (not (= i (edge x)))))))

(define namespace (x)
  (when (fqn? x)
    (clip x 0 (search x "/"))))

(define name (x)
  (if (fqn? x)
      (clip x (+ (search x "/") 1))
    x))

(define fqn (id x)
  `(_G .Namespace .find ,(escape (namespace id))
       .intern ,(escape (name id))
       (.deref ,x)))

(define id (id raw?)
  (if (fqn? id)
      (cat "(" (compile (fqn id)) ")")
    (let (id (camel-case id)
          id1 (if (and (not raw?) (number-code? (code id 0))) "_" ""))
      (for i (# id)
        (let (c (char id i)
              n (code c)
              c1 (if (and (= c "-")
                          (not (= id "-")))
                     "_"
                     (valid-code? n) c
                     (= i 0) (cat "_" n)
                   n))
          (cat! id1 c1)))
      (if (and (not raw?) (reserved? id1))
          (cat "_" id1)
          id1))))

(define-global valid-id? (x)
  (and (some? x) (= x (id x))))

(let (names (obj))
  (define-global unique (x)
    (if (string? x)
        (let x (id x)
          (if (names [x])
              (let i (names [x])
                (inc (names [x]))
                (unique (cat x i)))
            (do (set (names [x]) 1)
                (cat "__" x))))
      x)))

(define-global key (k)
  (if (and (string? k)
           (valid-id? k))
      k
      (or (string-literal? k)
          (not (string? k)))
      (cat "[" (compile k) "]")
    (compile k)))

(define-global mapo (f t)
  (with o (list)
    (each (k v) t
      (let x (f v)
        (when (is? x)
          (add o (literal k))
          (add o x))))))

(define infix
  `((not: (js: !))
    (*: true /: true %: true)
    (cat: (js: +))
    (+: true -: true)
    (<: true >: true <=: true >=: true)
    (=: (js: ===) ==: (js: ==))
    (and: (js: &&))
    (or: (js: ,"||"))))

(define unary? (form)
  (and (two? form) (in? (hd form) '(not -))))

(define index (k)
  k)

(define precedence (form)
  (unless (or (atom? form) (unary? form))
    (each (k v) infix
      (let x (hd form)
        (if (v [x]) (return (index k))))))
  0)

(define getop (op)
  (find (fn (level)
          (let x (level [op])
            (if (= x true) op
                (is? x) (x .js))))
        infix))

(define infix? (x)
  (is? (getop x)))

(define-global infix-operator? (x)
  (and (obj? x) (infix? (hd x))))

(define-global compile-next (x args call?)
  (if (none? args)
      (if call? (cat x "()") x)
    (cat x (compile-args args call?))))

(define-global compile-args (args call?)
  (let a (hd args)
    (if (accessor? a)
        (compile-next (compile a) (tl args) call?)
        (and (obj? a) (accessor? (hd a)))
        (let ((x rest: ys) a
              s (compile-next (compile x) ys true))
          (compile-next s (tl args) call?))
      (let (s "" c "")
        (for i (# args)
          (let x (at args i)
            (if (default-assignment? x)
                (let ((_ x1 val) x)
                  (cat! s c (compile x1) " = " (compile val)))
                (or (accessor? x)
                    (and (obj? x) (accessor? (hd x))))
                (return (compile-next (cat "(" s ")") (cut args i) call?))
              (cat! s c (compile x)))
            (set c ", ")))
        (when (args .rest)
          (cat! s c "..." (compile (args .rest))))
        (cat "(" s ")")))))

(define escape-newlines (s)
  (with s1 ""
    (for i (# s)
      (let c (char s i)
        (cat! s1 (if (= c "\n") "\\n"
                     (= c "\r") ""
                   c))))))

(define-global accessor (x)
  (let prop (compile-atom (clip x 1) true)
    (if (valid-id? prop)
        (cat "." prop)
      (cat "[" (escape prop) "]"))))

(define compile-atom (x raw?)
  (if (and (not raw?) (= x "nil")) "undefined"
      (accessor? x) (accessor x)
      (id-literal? x) (inner x)
      (string-literal? x) (escape-newlines x)
      (string? x) (id x raw?)
      (boolean? x) (if x "true" "false")
      (nan? x) "nan"
      (= x inf) "inf"
      (= x -inf) "-inf"
      (number? x) (cat x "")
    (error (cat "Cannot compile atom: " (str x)))))

(define terminator (stmt?)
  (if (not stmt?) "" ";\n"))

(define compile-special (form stmt?)
  (let ((x rest: args) form
        (special: true stmt: true tr: self-tr?) (getenv x)
        tr (terminator (and stmt? (not self-tr?))))
    (cat (apply special args) tr)))

(define parenthesize-call? (x)
  (or (and (not (atom? x))
           (= (hd x) '%function))
      (> (precedence x) 0)))

(define-global compile-call (f args parens?)
  (let (f1 (compile f)
        args1 (compile-args (stash* args)))
    (if (or parens? (parenthesize-call? f))
        (cat "(" f1 ")" args1)
      (cat f1 args1))))

(define op-delims (parent child right: true)
  (if ((if right >= >)
       (precedence child)
       (precedence parent))
      (list "(" ")")
    (list "" "")))

(define compile-infix (form)
  (let ((op rest: (a b)) form
        (ao ac) (op-delims form a)
        (bo bc) (op-delims form b right: true)
        a (compile a)
        b (compile b)
        op (getop op))
    (if (unary? form)
        (cat op ao " " a ac)
      (cat ao a ac " " op " " bo b bc))))

(define-global compile-function (args body name: true prefix: true infix: true tr: true)
  (let (id (either name "")
        args (compile-args args)
        body (with-indent (compile body stmt: true))
        ind (indentation)
        mid (if infix (cat " " infix) "")
        p (if prefix (cat prefix " ") "")
        tr (either tr ""))
    (cat p id args mid " {\n" body ind "}" tr)))

(define can-return? (form)
  (and (is? form)
       (or (atom? form)
           (and (not (= (hd form) 'return))
                (not (statement? (hd form)))))))

(define-global compile (form stmt: true)
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt)
    (let (tr (terminator stmt)
          ind (if stmt (indentation) "")
          form (if (atom? form) (compile-atom form)
                   (infix? (hd form)) (compile-infix form)
                 (compile-call (hd form) (tl form))))
      (cat ind form tr))))

(define lower-statement (form tail?)
  (either
    (let (hoist (list) e (lower form hoist true tail?))
      (if (and (some? hoist) (is? e))
          `(do ,@hoist ,e)
          (is? e) e
          (> (# hoist) 1) `(do ,@hoist)
        (hd hoist)))
    '(do)))

(define lower-body (body tail?)
  (lower-statement `(do ,@body) tail?))

(define literal? (form)
  (or (atom? form)
      (= (hd form) '%array)
      (= (hd form) '%object)
      (= (hd form) '%table)))

(define standalone? (form)
  (or (and (not (atom? form))
           (not (infix? (hd form)))
           (not (literal? form))
           (not (= 'get (hd form)))
           (not (= '%statement (hd form)))
           (not (and (two? form) (accessor? (at form 1)))))
      (id-literal? form)))

(define lower-do (args hoist stmt? tail?)
  (step x (almost args)
    (let-when e (lower x hoist stmt?)
      (when (standalone? e)
        (add hoist e))))
  (let e (lower (last args) hoist stmt? tail?)
    (if (and tail? (can-return? e))
        `(return ,e)
      e)))

(define lower-set (args hoist stmt? tail?)
  (let ((lh rh) args
        lh1 (lower lh hoist)
        rh1 (lower rh hoist))
    (add hoist `(%set ,lh1 ,rh1))
    (unless (and stmt? (not tail?))
      lh1)))

(define lower-if (args hoist stmt? tail?)
  (let ((cond then else) args)
    (if stmt?
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower-body (list then) tail?)
                   ,@(if (is? else) (list (lower-body (list else) tail?)))))
      (let-unique (e)
        (add hoist `(%local ,e))
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower `(%set ,e ,then))
                   ,@(if (is? else)
                         (list (lower `(%set ,e ,else))))))
        e))))

(define lower-short (x args hoist)
  (let ((a b) args
        hoist1 (list)
        b1 (lower b hoist1))
    (if (some? hoist1)
        (let-unique (id)
          (lower `(do (%local ,id ,a)
                      ,(if (= x 'and)
                           `(%if ,id ,b ,id)
                         `(%if ,id ,id ,b)))
                 hoist))
      `(,x ,(lower a hoist) ,b1))))

(define lower-try (args hoist tail?)
  (add hoist `(%try ,(lower-body args tail?))))

(define-global lower-condition-case ((var form rest: clauses) hoist stmt? tail?)
  (if stmt? (add hoist
    `(%condition-case ,var
       ,(lower-body `(do ,form) tail?)
       ,@(map (fn ((which rest: body))
                (if (= which 'finally)
                    `(,which ,(lower-body body))
                  (let ((x rest: args) body)
                  `(,which ,(lower x) ,(lower-body args tail?)))))
              clauses)))
    (let-unique (e)
      (add hoist `(%local ,e))
      (add hoist `(%condition-case ,var
                    ,(lower `(%set ,e ,form))
                    ,@(map (fn ((which rest: body))
                             (if (= which 'finally)
                                 `(,which ,(lower-body body))
                               (let ((x rest: args) body)
                                 `(,which ,(lower x) ,(lower `(%set ,e (do ,@args)))))))
                           clauses)))
      e)))

(define lower-while (args hoist)
  (let ((c rest: body) args
        pre (list)
        c (lower c pre))
    (add hoist
      (if (none? pre)
          `(while ,c
            ,(lower-body body))
        `(while true
           (do ,@pre
               (%if (not ,c) (break))
               ,(lower-body body)))))))

(define lower-for (args hoist)
  (let ((t k rest: body) args)
    (add hoist
         `(%for ,(lower t hoist) ,k
            ,(lower-body body)))))

(define-global lower-table (args hoist stmt? tail?)
  (with expr `(%table ,@(keys args))
    (step x args
      (if (atom? x) (add expr x)
          (<= (# x) 2)
          (let ((name v) x)
            (add expr `(,(lower name hoist) ,(lower v hoist))))
        (let ((prefix name args rest: body) x)
          (if (some? body)
              (add expr `(,prefix ,(lower name hoist) ,args ,(lower-body body true)))
            (add expr `(,prefix ,(lower name hoist) ,(lower args hoist)))))))))

(define-global lower-class ((x rest: body) hoist stmt? tail?)
  (let (body (tl (lower-table body hoist))
        (name parent) x
        parent1 (lower parent hoist)
        expr `(%class ,(list name parent1) ,@body))
    (if (and stmt? (not tail?))
        (add hoist `(%local ,name ,expr))
      expr)))

(define lower-function (args)
  (let ((a rest: body) args)
    `(%function ,a ,(lower-body body true) ,@(keys args))))

(define lower-definition (kind args hoist)
  (let ((name args rest: body) args)
    (add hoist `(,kind ,name ,args ,(lower-body body true)))))

(define lower-call (form hoist)
  (let form (map (fn (x) (lower x hoist)) form)
    (if (some? form) form)))

(define pairwise? (form)
  (in? (hd form) '(< <= = >= >)))

(define lower-pairwise (form)
  (if (pairwise? form)
      (let (e (list) (x rest: args) form)
        (reduce (fn (a b)
                  (add e `(,x ,a ,b)) a)
                args)
        `(and ,@(reverse e)))
    form))

(define lower-infix? (form)
  (and (infix? (hd form)) (> (# form) 3)))

(define lower-infix (form hoist)
  (let (form (lower-pairwise form)
        (x rest: args) form)
    (lower (reduce (fn (a b)
                     (list x b a))
                   (reverse args))
           hoist)))

(define lower-special ((name rest: args) hoist)
  (let (args1 (map (fn (x) (lower x hoist)) args)
        form `(,name ,@args1))
    (add hoist form)))

(define-global lower (form hoist stmt? tail?)
  (if (atom? form) form
      (empty? form) '(%array)
      (nil? hoist) (lower-statement form)
      (lower-infix? form) (lower-infix form hoist)
    (let ((x rest: args) form)
      (if (= x 'do) (lower-do args hoist stmt? tail?)
          (= x '%call) (lower args hoist stmt? tail?)
          (= x '%set) (lower-set args hoist stmt? tail?)
          (= x '%if) (lower-if args hoist stmt? tail?)
          (= x '%try) (lower-try args hoist tail?)
          (= x '%condition-case) (lower-condition-case args hoist stmt? tail?)
          (= x 'while) (lower-while args hoist)
          (= x '%for) (lower-for args hoist)
          (= x '%table) (lower-table args hoist stmt? tail?)
          (= x '%class) (lower-class args hoist stmt? tail?)
          (= x '%function) (lower-function args)
          (or (= x '%local-function)
              (= x '%global-function))
          (lower-definition x args hoist)
          (in? x '(and or))
          (lower-short x args hoist)
          (statement? x) (lower-special form hoist)
        (lower-call form hoist)))))

(define-global expand (form)
  (lower (macroexpand form)))

(define vm (require 'vm))

(define context (ctx)
  (with sandbox (vm .createContext ctx)
    (set (sandbox ._G) sandbox)))

(define sandbox (context _G))

(define run (code sandbox)
  (vm .runInContext code (or sandbox _G)))

(define-global eval (form)
  (let code (compile (expand `(%set %result ,form)))
    (run code)))

(define-global immediate-call? (x)
  (and (obj? x) (obj? (hd x)) (= (hd (hd x)) '%function)))

(define-special %call (f rest: args)
  (compile-call f args))

(define-special %brackets args
  (cat "[" (inner (compile-args args)) "]"))

(define-special do forms stmt: true tr: true
  (with s ""
    (step x forms
      (cat! s (compile x stmt: true))
      (unless (atom? x)
        (if (or (= (hd x) 'return)
                (= (hd x) 'break))
            (break))))))

(define-special %if (cond cons alt) stmt: true tr: true
  (let (cond (compile cond)
        cons (with-indent (compile cons stmt: true))
        alt (if alt (with-indent (compile alt stmt: true)))
        ind (indentation)
        s "")
    (cat! s ind "if (" cond ") {\n" cons ind "}")
    (if alt (cat! s " else {\n" alt ind "}"))
    (cat s "\n")))

(define-special while (cond form) stmt: true tr: true
  (let (cond (compile cond)
        body (with-indent (compile form stmt: true))
        ind (indentation))
    (cat ind "while (" cond ") {\n" body ind "}\n")))

(define-special %for (t k form) stmt: true tr: true
  (let (t (compile t)
        ind (indentation)
        body (with-indent (compile form stmt: true)))
    (cat ind "for (" k " in " t ") {\n" body ind "}\n")))

(define-special %try (form) stmt: true tr: true
  (let-unique (e)
    (let (ind (indentation)
          body (with-indent (compile form stmt: true))
          hf `(return (%array false ,e))
          h (with-indent (compile hf stmt: true)))
      (cat ind "try {\n" body ind "}\n"
           ind "catch (" e ") {\n" h ind "}\n"))))

(define-special %condition-case (e form rest: clauses) stmt: true tr: true
  (let (ind (indentation)
        body (with-indent (compile form stmt: true)))
    (with str (cat ind "try {\n" body ind "}")
      (let form '()
        (step x clauses
          (when (= (hd x) 'catch)
            (let ((_ type body) x)
              (add form (if (boolean? type) type `(instanceof ,e ,type)))
              (add form body))))
        (unless (none? form)
          (add form `(%throw ,e))
          (let (expr (hd (expand-if form))
                h (with-indent (compile expr stmt: true)))
            (cat! str " catch (" e ") {\n" h ind "}"))))
      (let clause (first (fn (x) (if (= (hd x) 'finally) x)) clauses)
        (when clause
          (let (body (tl clause)
                h (with-indent (compile `(do ,@body) stmt: true)))
            (cat! str " finally {\n" h ind "}"))))
      (cat! str "\n"))))

(define-special %delete (place) stmt: true
  (cat (indentation) "delete " (compile place)))

(define-special break () stmt: true
  (cat (indentation) "break"))

(define-special %function (args body infix: infix prefix: prefix)
  (compile-function args body infix: (if prefix nil "=>") prefix: prefix))

(define-special %global-function (name args body) stmt: true tr: true
  (compile `(%local ,name (%function ,args ,body)) stmt: true))

(define-special %local-function (name args body) stmt: true tr: true
  (compile `(%local ,name (%function ,args ,body)) stmt: true))

(define-special return (x) stmt: true
  (let x (if (nil? x)
             "return"
           (cat "return " (compile x)))
    (cat (indentation) x)))

(define-special async x
  (if (> (# x) 1)
      (compile `((async ,(hd x)) ,@(tl x)))
    (cat "async " (compile (hd x)))))

(define-special await x
  (if (> (# x) 1)
      (compile `((await ,(hd x)) ,@(tl x)))
    (cat "await (" (compile (hd x)) ")")))

(define-special new x
  (if (> (# x) 1)
      (compile `((new ,(hd x)) ,@(tl x)))
    (cat "new " (compile (hd x)))))

(define-special instanceof (a b)
  (cat "(" (compile a) " instanceof " (compile b) ")"))

(define-special typeof (x)
  (cat "typeof(" (compile x) ")"))

(define-special %throw (x) stmt: true
  (cat (indentation) "throw " (compile x)))

(define-special error (x) stmt: true
  (let e (cat "throw " (compile `(new (Error ,x))))
    (cat (indentation) e)))

(define-special %local (name value) stmt: true
  (let (id (compile name)
        value1 (compile value)
        rh (if (is? value) (cat " = " value1) "")
        keyword "var "
        ind (indentation))
    (cat ind keyword id rh)))

(define-special %set (lh rh) stmt: true
  (if (fqn? lh)
      (compile (fqn lh rh))
    (let (lh (compile lh)
          rh (compile (if (nil? rh) 'nil rh)))
      (cat (indentation) lh " = " rh))))

(define-special get (t k)
  (let (t1 (compile t)
        k1 (compile k))
    (when (infix-operator? t)
      (set t1 (cat "(" t1 ")")))
    (if (and (string-literal? k)
             (valid-id? (inner k)))
        (cat t1 "." (inner k))
      (cat t1 "[" k1 "]"))))

(define-special %array forms
  (let (open "[" close "]"
        s "" c "")
    (each (k v) forms
      (when (number? k)
        (cat! s c (compile v))
        (set c ", ")))
    (cat open s close)))

(define-special %object forms
  (let (s "{" c "" sep ": ")
    (step (k v) (pair forms)
      (cat! s c (key k) sep (compile v))
      (set c ", "))
    (cat s "}")))

(define-special %table forms
  (let (s "{\n" c "" sep ": " comma (either (forms .comma) (escape ", ")))
    (with-indent
      (let ind (indentation)
        (step x forms
          (if (atom? x)
              (cat! s c ind (key x) sep (compile x))
              (<= (# x) 2)
              (let ((name v) x)
                (cat! s c ind (key name) sep (compile v)))
            (let ((prefix name args rest: body) x
                  prefix (if (in? prefix '(define def)) "" prefix)
                  h (if (some? body)
                        (compile-function args `(do ,@body) name: (key name) prefix: prefix)
                      (cat (key name) sep (compile args))))
              (cat! s c ind h)))
          (set c (cat (inner comma) "\n")))))
    (cat s "\n" (indentation) "}")))

(define-special %class (name rest: body)
  (let ((name parent) (if (atom? name) (list name) name)
        name (if name `(,name " ") (list))
        ext (if parent `("extends " ,parent " ") (list)))
    (compile `(%literal "class " ,@name ,@ext (%table comma: "" ,@body)))))

(define-special %literal args
  (with s ""
    (step x args
      (if (string-literal? x)
          (cat! s (eval x))
        (cat! s (compile x))))))

(define-special %statement args stmt: true tr: true
  (with s (indentation)
    (step x args
      (if (string-literal? x)
          (cat! s (eval x))
        (cat! s (compile x))))
    (cat! s "\n")))

(define-special %indentation ()
  (indentation))

(define-special %spread (x)
  (cat "..." (compile x)))

(export context
        sandbox
        run
        eval
        expand
        compile)
