;; -*- mode: lisp -*-

(set fs (require "fs"))

(declare delimiters {})
(set (get delimiters "(") true) (set (get delimiters ")") true)
(set (get delimiters ";") true) (set (get delimiters "\n") true)

(declare whitespace {})
(set (get whitespace " ") true)
(set (get whitespace "\t") true)
(set (get whitespace "\n") true)

(declare operators {})
(set (get operators "+") "+") (set (get operators "-") "-")
(set (get operators "<") "<") (set (get operators ">") ">")
(set (get operators "and") "&&") (set (get operators "or") "||")
(set (get operators "cat") "+") (set (get operators "=") "==")

(declare special {})
(set (get special "do") compile-do)
(set (get special "set") compile-set)
(set (get special "get") compile-get)
(set (get special "dot") compile-dot)
(set (get special "not") compile-not)
(set (get special "if") compile-if)
(set (get special "function") compile-function)
(set (get special "declare") compile-declare)
(set (get special "while") compile-while)
(set (get special "each") compile-each)
(set (get special "list") compile-list)
(set (get special "quote") compile-quote)

(declare macros {})

(function error (msg) (throw msg))

;; library

(function string (form)
  (if ((= (typeof form) "string")
       (return (cat "\"" form "\"")))
      (true (return (cat form "")))))

(function string-length (str)
  (return str.length))

(function string-ref (str n)
  (return (str.charAt n)))

(function substring (str start end)
  (return (str.substring start end)))

;; reader

(function make-stream (str)
  (declare s {})
  (set s.pos 0)
  (set s.string str)
  (set s.len (string-length str))
  (return s))

(function read-file (filename)
  (return (fs.readFileSync filename "utf8")))

(function write-file (filename data)
  (return (fs.writeFileSync filename data "utf8")))

(function peek-char (s)
  (if ((< s.pos s.len) (return (string-ref s.string s.pos)))))

(function read-char (s)
  (declare c (peek-char s))
  (if (c (set s.pos (+ s.pos 1)) (return c))))

(function skip-non-code (s)
  (declare c)
  (while true
    (set c (peek-char s))
    (if ((not c) break)
	((get whitespace c) (read-char s))
        ((= c ";")
	 (while (and c (not (= c "\n")))
	   (set c (read-char s)))
	 (skip-non-code s))
	(true break))))

(function read-atom (s)
  (declare c)
  (declare str "")
  (while true
    (set c (peek-char s))
    (if ((and c (and (not (get whitespace c))
                     (not (get delimiters c))))
         (set str (cat str c))
         (read-char s))
        (true break)))
  (declare n (parseFloat str))
  (if ((isNaN n) (return str))
      (true (return n))))

(function read-list (s)
  (read-char s) ; (
  (declare c)
  (declare l [])
  (while true
    (skip-non-code s)
    (set c (peek-char s))
    (if ((and c (not (= c ")"))) (l.push (read s)))
        (c (read-char s) break) ; )
        (true (error (cat "Expected ) at " s.pos)))))
  (return l))

(function read-string (s)
  (read-char s) ; "
  (declare c)
  (declare str "\"")
  (while true
    (set c (peek-char s))
    (if ((and c (not (= c "\"")))
         (if ((= c "\\") (set str (cat str (read-char s)))))
         (set str (cat str (read-char s))))
        (c (read-char s) break) ; "
        (true (error (cat "Expected \" at " s.pos)))))
  (return (cat str "\"")))

(function read-quote (s)
  (read-char s) ; '
  (return (list "quote" (read s))))

(function read-unquote (s)
  (read-char s) ; ,
  (return (list "unquote" (read s))))

(function read (s)
  (skip-non-code s)
  (declare c (peek-char s))
  (if ((= c "(") (return (read-list s)))
      ((= c ")") (error (cat "Unexpected ) at " s.pos)))
      ((= c "\"") (return (read-string s)))
      ((= c "'") (return (read-quote s)))
      ((= c ",") (return (read-unquote s)))
      (true (return (read-atom s)))))

;; compiler

(function atom? (form)
  (return (or (= (typeof form) "string") (= (typeof form) "number"))))

(function list? (form)
  (return (Array.isArray form)))

(function call? (form)
  (return (and (list? form) (= (typeof (get form 0)) "string"))))

(function operator? (form)
  (return (not (= (get operators (get form 0)) null))))

(function special? (form)
  (return (not (= (get special (get form 0)) null))))

(function macro-call? (form)
  (return (not (= (get macros (get form 0)) null))))

(function macro-definition? (form)
  (return (and (call? form) (= (get form 0) "macro"))))

(function terminator (stmt?)
  (if (stmt? (return ";")) (true (return ""))))

(function compile-args (forms)
  (declare i 0)
  (declare str "(")
  (while (< i forms.length)
    (set str (cat str (compile (get forms i) false)))
    (if ((< i (- forms.length 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile-body (forms)
  (declare i 0)
  (declare str "{")
  (while (< i forms.length)
    (set str (cat str (compile (get forms i) true)))
    (set i (+ i 1)))
  (return (cat str "}")))

(function compile-atom (form stmt?)
  (declare atom form)
  (if ((and (= (typeof form) "string")
	    (not (= (string-ref form 0) "\"")))
       (set atom (string-ref form 0))
       (declare i 1) ; skip leading -
       (while (< i (string-length form))
	 (declare c (string-ref form i))
	 (if ((= c "-") (set c "_")))
	 (set atom (cat atom c))
	 (set i (+ i 1)))
       (declare last (- (string-length form) 1))
       (if ((= (string-ref form last) "?")
	    (set atom (cat "is_" (substring atom 0 last)))))))
  (return (cat atom (terminator stmt?))))

(function compile-call (form stmt?)
  (declare fn (compile (get form 0) false))
  (declare args (compile-args (form.slice 1)))
  (return (cat fn args (terminator stmt?))))

(function compile-operator (form)
  (declare i 1)
  (declare str "(")
  (declare op (get operators (get form 0)))
  (while (< i form.length)
    (set str (cat str (compile (get form i) false)))
    (if ((< i (- form.length 1)) (set str (cat str op))))
    (set i (+ i 1)))
  (return (cat str ")")))

(function compile-do (forms stmt?)
  (if ((not stmt?)
       (error "Cannot compile DO as an expression")))
  (return (compile-body forms)))

(function compile-set (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile assignment as an expression")))
  (if ((< form.length 2)
       (error "Missing right-hand side in assignment")))
  (declare lh (compile (get form 0) false))
  (declare rh (compile (get form 1) false))
  (return (cat lh "=" rh (terminator true))))

(function compile-branch (branch last?)
  (declare condition (compile (get branch 0) false))
  (declare body (compile-body (branch.slice 1)))
  (if ((and last? (= condition "true"))
       (return body))
      (true (return (cat "if(" condition ")" body)))))

(function compile-if (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile if as an expression")))
  (declare i 0)
  (declare str "")
  (while (< i form.length)
    (declare branch (compile-branch (get form i) (= i (- form.length 1))))
    (set str (cat str branch))
    (if ((< i (- form.length 1))
         (set str (cat str "else "))))
    (set i (+ i 1)))
  (return str))

(function compile-function (form stmt?)
  (declare name (compile (get form 0)))
  (declare args (compile-args (get form 1)))
  (declare body (compile-body (form.slice 2)))
  (return (cat "function " name args body)))

(function compile-get (form stmt?)
  (declare object (compile (get form 0) false))
  (declare key (compile (get form 1) false))
  (return (cat object "[" key "]" (terminator stmt?))))

(function compile-dot (form stmt?)
  (declare object (compile (get form 0) false))
  (declare key (get form 1))
  (return (cat object "." key (terminator stmt?))))

(function compile-not (form stmt?)
  (declare expr (compile (get form 0) false))
  (return (cat "!(" expr ")" (terminator stmt?))))

(function compile-declare (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile declaration as an expression")))
  (declare lh (get form 0))
  (declare tr (terminator true))
  (if ((= (typeof (get form 1)) "undefined")
       (return (cat "var " lh tr)))
      (true
       (declare rh (compile (get form 1) false))
       (return (cat "var " lh "=" rh tr)))))

(function compile-while (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile WHILE as an expression")))
  (declare condition (compile (get form 0) false))
  (declare body (compile-body (form.slice 1)))
  (return (cat "while(" condition ")" body)))

(function compile-each (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile EACH as an expression")))
  (declare key (get (get form 0) 0))
  (declare value (get (get form 0) 1))
  (declare object (get form 1))
  (declare body (form.slice 2))
  (body.unshift 
   '(set ,value (get ,object ,key)))
  (return (cat "for(" key " in " object ")" (compile-body body))))

(function compile-list (forms stmt? quoted?)
  (if (stmt?
       (error "Cannot compile LIST as a statement")))
  (declare i 0)
  (declare str "[")
  (while (< i forms.length)
    (declare x (get forms i))
    (declare x1)
    (if (quoted? (set x1 (quote-form x)))
	(true (set x1 (compile x false))))
    (set str (cat str x1))
    (if ((< i (- forms.length 1)) (set str (cat str ","))))
    (set i (+ i 1)))
  (return (cat str "]")))

(function quote-form (form)
  (if ((and (= (typeof form) "string")
	    (= (string-ref form 0) "\""))
       (return form))
      ((atom? form) (return (string form)))
      ((= (get form 0) "unquote")
       (return (compile (get form 1) false)))
      (true (return (compile-list form false true)))))

(function compile-quote (forms stmt?)
  (if (stmt?
       (error "Cannot compile quoted form as a statement")))
  (if ((< forms.length 1)
       (error "Must supply at least one argument to QUOTE")))
  (return (quote-form (get forms 0))))	; first arg only

(function compile-macro (form stmt?)
  (if ((not stmt?)
       (error "Cannot compile macro definition as an expression")))
  (eval (compile-function form true))
  (declare name (get form 0))
  (declare register
    '(set (get macros ,(string name)) ,name))
  (eval (compile register true)))

(function compile (form stmt?)
  (if ((atom? form) (return (compile-atom form stmt?)))
      ((call? form)
       (if ((and (operator? form) stmt?)
            (error (cat "Cannot compile operator application as a statement")))
           ((operator? form)
            (return (compile-operator form)))
	   ((macro-definition? form)
	    (compile-macro (form.slice 1) stmt?)
	    (return ""))
           ((special? form)
            (declare fn (get special (get form 0)))
            (return (fn (form.slice 1) stmt?)))
	   ((macro-call? form)
	    (declare fn (get macros (get form 0)))
	    (declare form (fn (form.slice 1)))
	    (return (compile form stmt?)))
           (true (return (compile-call form stmt?)))))
      (true (error (cat "Unexpected form: " form)))))

(function compile-file (filename)
  (declare form)
  (declare output "")
  (declare s (make-stream (read-file filename)))
  (while true
    (set form (read s))
    (if (form (set output (cat output (compile form true))))
        (true break)))
  (return output))

(function usage ()
  (console.log "usage: x input [-o output]"))

(if ((< process.argv.length 3) (usage))
    ((= (get process.argv 2) "--help") (usage))
    (true
     (declare input (get process.argv 2))
     (declare output)
     (if ((and (> process.argv.length 4)
               (= (get process.argv 3) "-o"))
         (set output (get process.argv 4)))
         (true
          (declare name (input.slice 0 (input.indexOf ".")))
          (set output (cat name ".js"))))
     (write-file output (compile-file input))))
