(ns dax.macros)

(define-macro current-ns args
  `(_G (.*ns* ,@args)))

(define-macro ns (name)
  `(current-ns ,(escape name)))

(define-macro deref (ns name rest: args)
  `((_G .Namespace .find ',ns) (.intern ',name) (.deref) ,@args))

(define-macro setq (ns name value)
  `((_G .Namespace .find ',ns) (.intern ',name) (.deref ,value)))

(define-macro quote (form)
  (quoted form))

(define-macro quasiquote (form)
  (quasiexpand form 1))

(define-macro set args
  `(do ,@(map (fn ((lh rh)) `(%set ,lh ,rh))
              (pair args))))

(define-macro at (l i)
  `(,l [,i]))

(define-macro wipe (place)
  `(%delete ,place))

(define-macro list body
  (if (keys? body)
      `(%object ,@(mapo (fn (x) x) body))
    `(%array ,@body)))

(define-macro if branches
  (hd (expand-if branches)))

(define-macro case (expr rest: clauses)
  (let-unique (x)
    (let (eq (fn (_) (if (= _ 'else) `true `(= ,_ ,x)))
          cl (fn ((a rest: body))
               (if (or (string? a) (number? a) (= (hd a) 'quote)) (list (eq a) `(do ,@body))
                   (one? a) (list (eq (hd a)) `(do ,@body))
                   (> (# a) 1) (list `(or ,@(map eq a)) `(do ,@body)))))
      `(let ,x ,expr
         (if ,@(apply join (map cl clauses)))))))

(define-macro when (cond rest: body)
  `(if ,cond (do ,@body)))

(define-macro unless (cond rest: body)
  `(if (not ,cond) (do ,@body)))

(define-macro obj body
  `(%object ,@(mapo (fn (x) x) body)))

(define-macro let (bs rest: body)
  (if (atom? bs) `(let (,bs ,(hd body)) ,@(tl body))
      (none? bs) `(do ,@body)
    (let ((lh rh rest: bs2) bs
          (id val rest: bs1) (bind lh (either rh 'nil)))
      (let renames (list)
        (unless (id-literal? id)
          (let id1 (unique id)
            (set renames (list id id1)
                 id id1)))
        `(do (%local ,id ,val)
             (let-symbol ,renames
               (let ,(join bs1 bs2) ,@body)))))))

(define-macro with (x v rest: body)
  `(let (,x ,v) ,@body ,x))

(define-macro let-when (x v rest: body)
  (let-unique (y)
    `(let ,y ,v
       (when (yes ,y)
         (let (,x ,y)
           ,@body)))))

(define-macro void body
  `(do ,@body (do)))

(define-macro %setenv (name rest: keys)
  `(void (setenv ',name ,@keys)))

(define-macro define-macro (name args rest: body)
  `(%setenv ,name macro: (fn ,args ,@body)))

(define-macro define-special (name args rest: body)
  `(%setenv ,name special: (fn ,args ,@body) ,@(keys body)))

(define-macro define-symbol-macro (name expansion)
  `(%setenv ,name symbol: ',expansion))

(define-macro define-reader ((char s) rest: body)
  `(set (read-table [,char]) (fn (,s) ,@body)))

(define-macro alter-definition (name)
  `((current-ns) .intern ',name .bind-root ,name (fn () ,name) (fn (x) (set ,name x))))

(define-macro define (name x rest: body)
  (setenv name variable: true)
  (let form (if (some? body)
                `(%local-function ,name ,@(bind* x body))
                `(%local ,name ,x))
    `(do ,form
         (alter-definition ,name))))

(define-macro define-global (name x rest: body)
  (setenv name toplevel: true variable: true)
  `(do ,(if (some? body)
            `(%global-function ,name ,@(bind* x body))
          `(%set ,name ,x))
       (alter-definition ,name)
       (%set (_G ,(cat "." name)) ,name)))

(define-macro with-frame body
  (let-unique (x)
    `(do (add (_G .environment) (obj))
         (with ,x (do ,@body)
           (drop (_G .environment))))))

(define-macro with-bindings ((names) rest: body)
  (let-unique (x)
   `(with-frame
      (each ,x ,names
        (if (default-assignment? ,x)
            (setenv (at ,x 1) variable: true)
          (setenv ,x variable: true)))
      ,@body)))

(define-macro let-macro (definitions rest: body)
  (with-frame
    (map (fn (m)
           (eval `(define-macro ,@m)))
         definitions)
    `(do ,@(macroexpand body))))

(define-macro let-symbol (expansions rest: body)
  (with-frame
    (map (fn ((name exp))
           (eval `(define-symbol-macro ,name ,exp)))
         (pair expansions))
    `(do ,@(macroexpand body))))

(define-macro let-unique (names rest: body)
  (let bs (map (fn (n)
                 (list n `(unique ',n)))
               names)
    `(let ,(apply join bs)
       ,@body)))

(define-macro fn (args rest: body)
  `(%function ,@(bind* args body) ,@(keys body)))

(define-macro apply (f rest: args)
  (if (> (# args) 1)
      `(%call apply ,f (join (list ,@(almost args)) ,(last args)))
      `(%call apply ,f ,@args)))

(define-macro guard (expr)
  `((fn () (%try (list true ,expr)))))

(define-macro each (x t rest: body)
  (let-unique (o n i)
    (let ((k v) (if (atom? x) (list i x)
                  (if (> (# x) 1) x
                      (list i (hd x)))))
      `(let (,o ,t ,k nil)
         (%for ,o ,k
           (let (,v (,o [,k]))
             (let ,k (if (numeric? ,k)
                         (parseInt ,k)
                       ,k)
               ,@body)))))))

(define-macro for (i to rest: body)
  `(let ,i 0
     (while (< ,i ,to)
       ,@body
       (inc ,i))))

(define-macro step (v t rest: body)
  (let-unique (x i)
    `(let (,x ,t)
       (for ,i (# ,x)
         (let (,v (at ,x ,i))
           ,@body)))))

(define-macro set-of xs
  (let l (list)
    (each x xs
      (set (l [x]) true))
    `(obj ,@l)))

(define-macro join! (a rest: bs)
  `(set ,a (join ,a ,@bs)))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

(define-macro inc (n by)
  `(set ,n (+ ,n ,(if (nil? by) 1 by))))

(define-macro dec (n by)
  `(set ,n (- ,n ,(if (nil? by) 1 by))))

(define-macro with-indent (form)
  (let-unique (x)
    `(do (inc indent-level)
         (with ,x ,form
           (dec indent-level)))))

(define-macro export names
  `(do ,@(map (fn (k)
                `(set (exports ,(cat "." k)) ,k))
              names)))

(define-macro when-compiling body
  (eval `(do ,@body)))

(define-macro during-compilation body
  (with x (expand `(do ,@body))
    (eval x)))

(define-macro class (x rest: body)
  (if (atom? x)
      `(%class (,x) ,@body)
    `(%class ,x ,@body)))

(define-macro . args
  (if (none? args) `(this .constructor)
      (one? args) `(. this ,(hd args) ,@(tl args))
    (let ((name a rest: bs) args)
      (let (prop (if (atom? a) `',(compile a)
                     (= 'quote (hd a)) `',(compile (at a 1))
                    a)
            expr `(,name [,prop]))
        (if (or (and (not (atom? a))
                     (= 'quote (hd a)))
                (string-literal? a)
                (none? bs))
            expr
          `(,expr ,@bs))))))

(define-macro try body
  (let-unique (e)
    `(%condition-case ,e
       (do ,@(map (fn (x)
                    (unless (and (obj? x)
                                 (in? (hd x) '(catch finally)))
                      x))
                  body))
       ,@(map (fn (x)
                (when (obj? x)
                  (if (= (hd x) 'finally) x
                      (= (hd x) 'catch)
                    (let ((_ type var rest: body) x)
                      `(catch ,type (let (,var ,e) ,@body))))))
              body))))

(define-macro throw (x)
  `(%throw ,x))

(define-macro brackets args
  `(%brackets ,@args))

(define-macro braces args
  `(%braces ,@args))

