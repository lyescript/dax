(define reader (_G .reader))
(define compiler (_G .compiler))
(define system (_G .system))
(define path (require "path"))
(define-global inquirer (require "inquirer"))
(define-global BottomBar (inquirer .ui .BottomBar))
(define-global bottom-bar nil)
(inquirer .register-prompt "command" (require "inquirer-command-prompt"))
(inquirer .register-prompt "command" (require "inquirer-fuzzy-path"))

(define-global find-file-noselect (name)
  (let filepath (path .resolve name)
    (or (get-file-buffer filepath)
        (with b (get-buffer-create filepath)
          (with-current-buffer b
            (set-visited-file-name filepath)
            (insert (system .read-file filepath))
            (goto-char 1))))))

(define-global find-file (name)
  (switch-to-buffer (find-file-noselect name)))

(define eval-print (form)
  (let ((ok v) (guard (compiler .eval form)))
    (if (not ok)
        (print (v .stack))
        (is? v) (print (str v)))))

(define rep (s)
  (eval-print (reader .read-string s (_G .eof) (_G .eos))))

(define-global buf "")

(define-global rep1 (s)
  (cat! buf s)
  (let (more (list)
        eos (list)
        form (reader .read-string buf more eos))
    (unless (= form more)
      (unless (= form eos)
        (eval-print form))
      (set buf "")
      (system .write "> "))))

(define-global repl ()
  (system .write "> ")
  (let in (process .stdin)
    (in (.remove-listener "data" rep1))
    (in .setEncoding "utf8")
    (in .on "data" rep1)))

(define-global repl2 ()
  (set (_G .bottom-bar) (new BottomBar bottomBar: "foo"))
  (process .stdin .on "data" (fn (s) (_G .bottom-bar (.update-bottom-bar "")) nil))
  (set-interval (fn () (_G .bottom-bar (.update-bottom-bar ""))) 300)
  (inquirer .prompt (list (obj type: "fuzzypath" name: "path" pathFilter: (fn (isDirectory nodePath) isDirectory) rootPath: "." message: "Select path: " default: "node_modules" suggestOnly: false validate: (fn (x) (require "fs" .exists-sync x))))))

(define-global prompt (args)
  (process .stdin (.remove-listener "data" rep1))
  (inquirer .prompt args
            .then (fn (answers)
                    (print (str answers))
                    (set (_G .answers) answers)
                    (repl))))

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
