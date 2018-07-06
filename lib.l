
(%local-function create (globals)
  (%local _G (Object .assign (obj) (or globals (obj))))
  (set (_G ._G) _G)
  (set (_G .environment) (list (obj)))
  (when-compiling
    (let expand-file (_G .expand-file)
      `(do
         ,@(expand-file "runtime.l")
         ,@(expand-file "macros.l")
         (set (_G .compiler)
              (with exports (obj)
                (let (self exports module (obj exports: exports))
                  ,@(expand-file "compiler.l")))
              (_G .reader)
              (with exports (obj)
                (let (self exports module (obj exports: exports))
                  ,@(expand-file "reader.l")))
              (_G .system)
              (with exports (obj)
                (let (self exports module (obj exports: exports))
                  ,@(expand-file "system.l")))
              (_G .main)
              (with exports (obj)
                (let (self exports module (obj exports: exports))
                  ,@(expand-file "main.l"))))
         (Object .assign _G (_G .main)))))
  _G)

(case (typeof window)
  ("undefined"
   (set (module .exports .create) create))
  (else
    (when-compiling
      `(%literal ,(escape (system .read-file "vm.js"))))
    (unless (window .require)
      (set (window .require) (fn (x) (window .DAX .shims [x]))))
    (set (window .DAX)
         (Object .assign
                 (or (window .DAX) (obj))
                 (obj create: create
                      shims: (obj fs: (obj)
                                  child_process: (obj)
                                  process: (obj argv: (list))
                                  path: (obj sep: ":")
                                  vm: (window .vm)))))
    (set (window .dax)
         (window .DAX .create (or (window .dax) (obj))))))


