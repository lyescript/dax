(ns dax.main)

(define reader (_G .reader))
(define compiler (_G .compiler))
(define system (_G .system))

(define eval-print (form)
  (let ((ok v) (guard (compiler .eval form)))
    (if (not ok)
        (print (v .stack))
        (is? v) (print (str v)))))

(define rep (s)
  (eval-print (reader .read-string s)))

(define repl ()
  (let buf ""
    (%local-function rep1 (s)
      (cat! buf s)
      (let (more (list)
            form (reader .read-string buf more))
          (unless (= form more)
            (eval-print form)
            (set buf "")
            (system .write "> ")))))
  (system .write "> ")
  (let in (process .stdin)
    (in (.removeAllListeners))
    (in .setEncoding "utf8")
    (in .on "data" rep1)))

(define-global pp-to-string (body)
  (if (atom? body) (str body)
      (empty? body) (str body)
    (let s "("
      (step x body
        (cat! s (str x) "\n\n"))
      (cat s ")"))))

(define-global pp (body)
  (print (pp-to-string body))
  body)

(define-global read-file (path)
  (let (s (reader .stream (system .read-file path))
        body (reader .read-all s))
    (if (one? body) (hd body) `(do ,@body))))

(define-global expand-file (path)
  (let body (read-file path)
    (compiler .expand body)))

(define-global compile-file (path)
  (let (body (expand-file path)
        form (compiler .expand `(do ,@body)))
    (compiler .compile form stmt: true)))

(define-global load (path)
  (let code (compile-file path)
    (let prev (or (_G .exports) (obj))
      (with x (set (_G .exports) (obj))
        (compiler .run code)
        (set (_G .exports) prev)))))

(define script-file? (path)
  (not (or (= "-" (char path 0))
           (= ".js" (clip path (- (# path) 3))))))

(define run-file (path)
  (if (script-file? path)
      (load path)
    (compiler .run (system .read-file path))))

(define usage ()
  (print "usage: dax [<file> <arguments> | options <object files>]")
  (print " <file>\t\tProgram read from script file")
  (print " <arguments>\tPassed to program in system.argv")
  (print " <object files>\tLoaded before compiling <input>")
  (print "options:")
  (print " -c <input>\tCompile input file")
  (print " -x <input>\tExpand input file")
  (print " -a <input>\tRead input file")
  (print " -o <output>\tOutput file")
  (print " -e <expr>\tExpression to evaluate"))

(define main ()
  (let arg (hd (system .argv))
    (if (and arg (script-file? arg))
        (load arg)
        (or (= arg "-h")
            (= arg "--help"))
        (usage)
      (let (pre (list)
            op nil
            input nil
            output nil
            expr nil
            argv (system .argv))
        (for i (# argv)
          (let a (at argv i)
            (if (or (= a "-c") (= a "-x") (= a "-a") (= a "-o") (= a "-t") (= a "-e"))
                (if (= i (edge argv))
                    (print (cat "missing argument for " a))
                  (do (inc i)
                      (let val (at argv i)
                        (if (= a "-c") (set input val op 'compile)
                            (= a "-x") (set input val op 'expand)
                            (= a "-a") (set input val op 'read)
                            (= a "-o") (set output val)
                            (= a "-e") (set expr val)))))
                (not (= "-" (char a 0))) (add pre a))))
        (step file pre
          (run-file file))
        (if (nil? input) (if expr (rep expr) (repl))
          (do (let code (if (= op 'expand) (pp-to-string (expand-file input))
                            (= op 'read) (pp-to-string (read-file input))
                          (compile-file input))
                (if (or (nil? output) (= output "-"))
                    (print code)
                  (system .write-file output code)))))))))

(export reader
        compiler
        system
        eval-print
        rep
        repl
        compile-file
        load
        script-file?
        run-file
        usage
        main)
