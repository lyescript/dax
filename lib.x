;; -*- mode: lisp -*-

;; environment

(set environment (list (table)))

(def getenv (k)
  (let (i (- (length environment) 1))
    (while (>= i 0)
      (let (v (get (at environment i) k))
	(if v (return v)))
      (set i (- i 1)))))

(def setenv (k v)
  (set (get (last environment) k) v))

(set variable (table))

(def symbol-macro? (k)
  (let (v (getenv k))
    (and (not (= v nil))
	 (not (= v variable))
	 (not (macro? k)))))

(def macro? (k)
  (function? (getenv k)))

(def variable? (k)
  (= (get (last environment) k) variable))

(def bound? (x)
  (or (symbol-macro? x)
      (macro? x)
      (variable? x)))

(set embed-macros? false)

;; macros

(mac at (arr i)
  (if (and (= target 'lua) (number? i))
      (set i (+ i 1))
      (= target 'lua)
      (set i `(+ ,i 1)))
  `(get ,arr ,i))

(mac let (bindings body...)
  (let (i 0
	renames ()
	locals ())
    (while (< i (length bindings))
      (let (id (at bindings i))
	(if (bound? id)
	    (let (rename (make-id))
	      (push renames (list id rename))
	      (set id rename))
	  (setenv id variable))
	(push locals `(local ,id ,(at bindings (+ i 1)))))
      (set i (+ i 2)))
    `(letsym ,renames ,@(join locals body))))

(mac letmac (definitions body...)
  (push environment (table))
  (let (embed? embed-macros?)
    (set embed-macros? false)
    (map (fn (macro)
	   ((compiler 'mac) macro))
	 definitions)
    (set embed-macros? embed?))
  (let (body1 (macroexpand body))
    (pop environment)
    `(do ,@body1)))

(mac letsym (expansions body...)
  (push environment (table))
  (map (fn (pair)
	 (setenv (at pair 0) (at pair 1)))
       expansions)
  (let (body1 (macroexpand body))
    (pop environment)
    `(do ,@body1)))

(mac sym (name expansion)
  (setenv name expansion)
  nil)

(mac defvar (name value)
  `(set ,name ,value))

(mac bind (list value)
  (if (list? value)
      (let (v (make-id))
	`(do (local ,v ,value)
	     ,@(bind1 list value)))
    `(do ,@(bind1 list value))))

(mac across ((list v i start) body...)
  (let (l (make-id))
    (set i (or i (make-id)))
    (set start (or start 0))
    `(let (,i ,start ,l ,list)
       (while (< ,i (length ,l))
	 (let (,v (at ,l ,i))
	   ,@body
	   (set ,i (+ ,i 1)))))))

(mac make-set (elements...)
  `(table ,@(collect (fn (x) (list x true)) elements)))

;; macro helpers

(def vararg? (name)
  (= (sub name (- (length name) 3) (length name)) "..."))

(def bind1 (list value)
  (let (forms ())
    (across (list x i)
      (if (list? x)
	  (set forms (join forms (bind1 x `(at ,value ,i))))
          (vararg? x)
	  (let (v (sub x 0 (- (length x) 3)))
	    (push forms `(local ,v (sub ,value ,i)))
	    break) ; no more args
	(push forms `(local ,x (at ,value ,i)))))
    forms))

;; languages

(mac language () `',target)
(set target (language))

(mac target (clauses...)
  (find (fn (x)
	  (if (= (at x 0) target) (at x 1)))
	clauses))

;; sequences

(def length (x)
  (target (js x.length) (lua #x)))

(def empty? (list)
  (= (length list) 0))

(def sub (x from upto)
  (if (string? x)
      (target
       (js (x.substring from upto))
       (lua (string.sub x (+ from 1) upto)))
    (target
     (js (x.slice from upto))
     (lua
      (do (set upto (or upto (length x)))
	  (let (i from j 0 x2 ())
	    (while (< i upto)
	      (set (at x2 j) (at x i))
	      (set i (+ i 1))
	      (set j (+ j 1)))
	    x2))))))

;; lists

(def push (arr x)
  (target (js (arr.push x)) (lua (table.insert arr x))))

(def pop (arr)
  (target (js (arr.pop)) (lua (table.remove arr))))

(def last (arr)
  (at arr (- (length arr) 1)))

(def join (a1 a2)
  (target
   (js (a1.concat a2))
   (lua
    (let (i 0 len (length a1) a3 ())
      (while (< i len)
	(set (at a3 i) (at a1 i))
	(set i (+ i 1)))
      (while (< i (+ len (length a2)))
	(set (at a3 i) (at a2 (- i len)))
	(set i (+ i 1)))
      a3))))

(def reduce (f x)
  (if (empty? x) x
      (= (length x) 1) (at x 0)
    (f (at x 0) (reduce f (sub x 1)))))

(def keep (f a)
  (let (a1 ())
    (across (a x) (if (f x) (push a1 x)))
    a1))

(def find (f a)
  (across (a x)
    (let (x1 (f x))
      (if x1 (return x1)))))

(def map (f a)
  (let (a1 ())
    (across (a x) (push a1 (f x)))
    a1))

(def collect (f a)
  (let (a1 ())
    (across (a x) (set a1 (join a1 (f x))))
    a1))

(mac join* (xs...)
  (reduce (fn (a b) (list 'join a b)) xs))

(mac list* (xs...)
  (if (= (length xs) 0)
      ()
    (let (t ())
      (across (xs x i)
	(if (= i (- (length xs) 1))
	    (set t (list 'join (join '(list) t) x))
	  (push t x)))
      t)))

;; strings

(def char (str n)
  (target (js (str.charAt n)) (lua (sub str n (+ n 1)))))

(def search (str pattern start)
  (target
   (js (let (i (str.indexOf pattern start))
	 (if (>= i 0) i)))
   (lua (do (if start (set start (+ start 1)))
	    (let (i (string.find str pattern start true))
	      (and i (- i 1)))))))

(def split (str sep)
  (target
   (js (str.split sep))
   (lua (let (strs ())
	  (while true
	    (let (i (search str sep))
	      (if (= i nil)
		  break
		(do (push strs (sub str 0 i))
		    (set str (sub str (+ i 1)))))))
	  (push strs str)
	  strs))))

(mac cat! (a bs...)
  `(set ,a (cat ,a ,@bs)))

;; io

(target (js (set fs (require 'fs))))

(def read-file (path)
  (target
    (js (fs.readFileSync path 'utf8))
    (lua (let (f (io.open path))
	   (f:read '*a)))))

(def write-file (path data)
  (target
    (js (fs.writeFileSync path data 'utf8))
    (lua (let (f (io.open path 'w))
	   (f:write data)))))

(target (js (def print (x) (console.log x))))

(def write (x)
  (target (js (process.stdout.write x)) (lua (io.write x))))

(def exit (code)
  (target (js (process.exit code)) (lua (os.exit code))))

;; predicates

(def string? (x) (= (type x) 'string))
(def string-literal? (x) (and (string? x) (= (char x 0) "\"")))
(def number? (x) (= (type x) 'number))
(def boolean? (x) (= (type x) 'boolean))
(def function? (x) (= (type x) 'function))
(def composite? (x) (= (type x) (target (js 'object) (lua 'table))))
(def atom? (x) (not (composite? x)))
(def table? (x) (and (composite? x) (= (at x 0) nil)))
(def list? (x) (and (composite? x) (not (= (at x 0) nil))))

;; numbers

(def parse-number (str)
  (target
   (js (let (n (parseFloat str))
	 (if (not (isNaN n)) n)))
   (lua (tonumber str))))

;; printing

(def to-string (x)
  (if (= x nil) "nil"
      (boolean? x) (if x "true" "false")
      (atom? x) (cat x "")
      (function? x) "#<function>"
      (table? x) "#<table>"
    (let (str "(")
      (across (x y i)
	(cat! str (to-string y))
	(if (< i (- (length x) 1))
	    (cat! str " ")))
      (cat str  ")"))))

;; misc

(target (js (def error (msg) (throw msg) nil)))
(target (js (def type (x) (typeof x))))

(def apply (f args)
  (target (js (f.apply f args)) (lua (f (unpack args)))))

(set id-counter 0)

(def make-id (prefix)
  (set id-counter (+ id-counter 1))
  (cat "_" (or prefix "") id-counter))

(set eval-result nil)

(target
 (lua (def eval (x)
	;; lua does not allow expressions to be evaluated at the
	;; top-level
        (let (y (cat "eval_result=" x)
	      f (load y))
	  (if f
	      (do (f) eval-result)
	    (let (f,e (load x))
	      (if f (f) (error (cat e " in " x)))))))))
