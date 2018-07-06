(ns dax.system)

(define fs (require "fs"))
(define child-process (require "child_process"))
(define path (require "path"))
(define process (require "process"))

(define read-file (path (o mode 'text))
  (if (= mode 'text)
      (fs .read-file-sync path "utf8" .replace |/\r/g| "")
    (fs .read-file-sync path)))

(define write-file (path data)
  (fs .write-file-sync path data "utf8"))

(define file-exists? (path)
  (and (fs .exists-sync path "utf8")
       (fs .stat-sync path (.is-file))))

(define directory-exists? (path)
  (and (fs .exists-sync path "utf8")
       (fs .stat-sync path (.is-directory))))

(define path-separator
  (path .sep))

(define path-join parts
  (or (reduce (fn (x y) (cat x path-separator y)) parts) ""))

(define get-environment-variable (name)
  (process .env [name]))

(define set-environment-variable (name value)
  (set (process .env [name]) value))

(define write (x cb)
  (let out (process .stdout)
    (out .write x cb)))

(define exit (code)
  (process .exit code))

(define argv
  (cut (process .argv) 2))

(define reload (module)
  (wipe (require .cache [(require .resolve module)]))
  (require module))

(define shell (command)
  (child-process .exec-sync command (.to-string)))

(export read-file
        write-file
        file-exists?
        directory-exists?
        path-separator
        path-join
        get-environment-variable
        set-environment-variable
        write
        exit
        argv
        reload
        shell)
