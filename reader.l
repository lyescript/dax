(define-global delimiters (set-of "{" "}" "[" "]" "(" ")" ";" "\r" "\n"))
(define-global whitespace (set-of " " "\t" "\r" "\n"))

(define-global all-buffers ())

(define-global buffer? (x)
  (and (obj? x)
       (has? x 'pos)
       (has? x 'string)
       (has? x 'len)))

(define-global stream (str more eos rest: props)
  (join (obj pos: 0 string: str len: (# str) more: more eos: eos) props))

(define-global get-buffer (name)
  (step x all-buffers
    (when (= (x .name) name)
      (return x))))

(define-global directory-name? (filename)
  (= (char filename (edge filename))
     ((require "path") .sep)))

(define-global file-name-as-directory (filename)
  (if (directory-name? filename) filename
    (cat filename ((require "path") .sep))))

(define-global directory-file-name (filename)
  (while (directory-name? filename)
    (set filename (clip filename 0 (edge filename))))
  filename)

(define-global abbreviate-file-name (filename)
  (let h (user-homedir)
    (if (filename .starts-with h)
        (filename .replace h "~")
      filename)))

(define-global file-name-directory (filename)
  (if (directory-name? filename) filename
    (file-name-as-directory
      ((require "path") (.dirname filename)))))

(define-global file-name-nondirectory (filename)
  (if (directory-name? filename) ""
    (directory-file-name
      ((require "path") (.basename filename)))))

(define-global user-homedir ()
  (let os (require "os")
    (when (function? (os .user-info))
      (try
        (let homedir (os (.user-info) .homedir)
          (if homedir (return homedir)))
        (catch true e
          (unless (= (e .code) "ENOENT")
            (throw e)))))
    (if (function? (os .homedir))
        (os (.homedir))
      ((require "process") .env .HOME))))

(define-global file-name-absolute? (filename)
  (or (= (char filename 0) "~")
      ((require "path") .is-absolute filename)))

(define-global file-relative-name (filename directory)
  (unless (is? directory)
    (set directory (current-directory)))
  ((require "path") .relative directory filename))

(define-global current-directory ()
  ((require "process") (.cwd)))

(define-global expand-file-name (filename directory)
  (unless (is? directory)
    (set directory (current-directory)))
  (with s filename
    (unless (file-name-absolute? s)
      (set s ((require "path") (.join directory s))))
    (when (= (char s 0) "~")
      (set s (cat (user-homedir) (clip s 1))))))

(define-global find-buffer-visiting (filename predicate)
  (step x all-buffers
    (when (= (buffer-file-name x) filename)
      (when (or (and predicate (predicate x))
                (nil? predicate))
        (return x)))))

(define-global get-file-buffer (filename)
  (find-buffer-visiting (expand-file-name filename)))

(define-global get-buffer-create (name)
  (or (get-buffer name)
      (with s (stream "" name: name)
        (add all-buffers s))))

(define-global active-buffer (get-buffer-create "*scratch*"))

(define-global current-buffer ()
  active-buffer)

(define-global buffer-name (buffer)
  (let b (or buffer (current-buffer))
    (b .name)))

(define-global buffer-file-name (buffer)
  (let b (or buffer (current-buffer))
    (b .file)))

(define-global set-visited-file-name (filename)
  (let b (current-buffer)
    (set (b .file) filename)))

(define-global point ()
  (+ (active-buffer .pos) 1))

(define-global point-min ()
  (+ (or (active-buffer .start) 0) 1))

(define-global point-max ()
  (+ (or (active-buffer .end) (active-buffer .len)) 1))

(define-global buffer-end (flag)
  (if (> flag 1) (point-max) (point-min)))

(define-global buffer-size (buffer)
  (let b (or buffer (current-buffer))
    (b .len)))

(define-global goto-char (n)
  (let n n
    (set n (max (point-min) n))
    (set n (min (point-max) n))
    (set (active-buffer .pos) (- n 1)))
  n)

(define-global char-after (position)
  (let p (either position (point))
    (if (or (< p (point-min))
            (>= p (point-max)))
        nil
      (let b (current-buffer)
        (char (b .string) (- p 1))))))

(define-global char-before (position)
  (let p (either position (point))
    (if (or (<= p (point-min))
            (> p (point-max)))
        nil
      (let b (current-buffer)
        (char (b .string) (- p 2))))))

(define-global line-info (buffer pos)
  (let (b (or buffer (current-buffer))
        s (b .string)
        p (either pos (+ (b .pos) 1))
        row 1
        col 0)
    (for i (- p 1)
      (let c (char s i)
        (when (is? c)
          (if (= c "\n")
              (set col 0 row (+ row 1))
            (inc col)))))
    (obj line: row column: col)))

(define-global buffer-line (buffer pt)
  (if (nil? buffer) (set buffer (current-buffer)))
  ((line-info buffer pt) .line))

(define-global buffer-column (buffer pt)
  (if (nil? buffer) (set buffer (current-buffer)))
  ((line-info buffer pt) .column))

(define-global narrow-to-region (start end)
  (let b (current-buffer)
    (set (b .start) (- start 1)
         (b .end) (- end 1)
         (b .pos) (max (b .pos) (b .start))
         (b .pos) (min (b .pos) (b .end))))
  nil)

(define-global buffer-narrowed? (buffer)
  (let b (or buffer (current-buffer))
    (or (is? (b .start)) (is? (b .end)))))

(define-global widen ()
  (let b (current-buffer)
    (wipe (b .start))
    (wipe (b .end))))

(define-global set-buffer (buffer-or-name)
  (if (string? buffer-or-name)
      (set active-buffer
           (or (get-buffer buffer-or-name)
               (error (cat "No buffer named " buffer-or-name))))
      (buffer? buffer-or-name)
      (set active-buffer buffer-or-name)
      (nil? buffer-or-name)
      (set active-buffer (current-buffer))
    (error (cat "Must be a buffer or string: " (str buffer-or-name)))))

(define-global switch-to-buffer (buffer-or-name)
  (set-buffer buffer-or-name))

(define-global insert-char (character count inherit)
  (let (n (either count 1)
        b (current-buffer)
        s (clip (b .string) 0 (b .pos)))
    (for i n
      (cat! s (string character)))
    (cat! s (clip (b .string) (b .pos)))
    (set (b .string) s)
    (inc (b .pos) n)
    (inc (b .len) n)
    (when (buffer-narrowed? b)
      (inc (b .end) n)))
  nil)

(define-global delete-char-at (pt)
  (goto-char pt)
  (when (and (>= (point) (point-min))
             (< (point) (point-max)))
    (let (b (current-buffer)
          p (- (point) 1))
      (set (b .string)
           (cat (clip (b .string) 0 p)
                (clip (b .string) (+ p 1))))
      (dec (b .len))
      (when (buffer-narrowed? b)
        (dec (b .end)))))
  nil)

(define-global delete-char (count killp)
  (if (< count 0)
      (for i (- count)
        (delete-char-at (- (point) 1)))
      (> count 0)
      (for i count
        (delete-char-at (point) i))))

(define-global delete-region (start end)
  (goto-char start)
  (for i (- end start)
    (delete-char 1)))

(define-global insert args
  (let b (current-buffer)
    (step x args
      (if (string? x)
          (step c x
            (insert-char c))
        (insert-char x)))))

(define-macro save-current-buffer body
  (let-unique (prev)
    `(let (,prev (current-buffer))
       (try (do ,@body)
         (finally (set-buffer ,prev))))))

(define-macro with-current-buffer (buffer-or-name rest: body)
  `(save-current-buffer
     (set-buffer ,buffer-or-name)
     ,@body))

(define-macro save-excursion body
  (let-unique (b pt)
    `(let (,b (current-buffer)
           ,pt (point))
       (try (do ,@body)
         (finally
           (with-current-buffer ,b
             (goto-char ,pt)))))))

(define-macro save-restriction body
  (let-unique (b start end)
    `(let (,b (current-buffer)
           ,start (,b .start)
           ,end (,b .end))
       (try (do ,@body)
         (finally
           (set (,b .start) ,start
                (,b .end) ,end))))))

(define-global buffer-string (buffer)
  (with-current-buffer (or buffer (current-buffer))
    (let b (current-buffer)
      (clip (b .string) (- (point-min) 1) (- (point-max) 1)))))

(define-global mode-line-format "%b L%l:%c")

(define-global format-mode-line (format face window buffer)
  (set format (either format (_G .mode-line-format)))
  (set buffer (or buffer (current-buffer)))
  (let i (search format "%")
    (while (is? i)
      (inc i)
      (let (c (char format i)
            s (case c
                ("b" (str (buffer-name buffer)))
                ("c" (str (buffer-column buffer)))
                ("f" (buffer-file-name buffer))
                ("i" (str (- (point-max) (point-min))))
                ("l" (str (buffer-line buffer)))
                ("n" (if (buffer-narrowed? buffer) "Narrow"))
                ("%" "%")
                (else (error (cat "Unknown format mode line spec: " c)))))
        (if (nil? s) (set s ""))
        (inc i)
        (set format (cat (clip format 0 (- i 2))
                         s
                         (clip format i)))
        (dec i 2)
        (inc i (# s)))
      (set i (search format "%" i))))
  format)

(define-global peek-char (s)
  (when (< (s .pos) (s .len))
    (char (s .string) (s .pos))))

(define-global read-char (s)
  (let c (peek-char s)
    (if c (do (inc (s .pos)) c))))

(define-global skip-non-code (s)
  (while true
    (let c (peek-char s)
      (if (nil? c) (break)
          (whitespace [c]) (read-char s)
          (= c ";")
          (do (while (and c (not (= c "\n")))
                (set c (read-char s)))
              (skip-non-code s))
        (break)))))

(define-global read-table (obj))
(define-global eof (obj))

(define-global read (s)
  (skip-non-code s)
  (let c (peek-char s)
    (if (is? c)
        ((or (read-table [c])
             (read-table [""]))
         s)
      eof)))

(define-global read-all (s)
  (with l (list)
    (while true
      (let form (read s)
        (if (= form eof) (break))
        (add l form)))))

(define-global read-string (str more (o eos (_G .eos)))
  (let x (read (stream str more eos))
    (unless (= x eof)
      x)))

(define key? (atom)
  (and (string? atom)
       (> (# atom) 1)
       (= (char atom (edge atom)) ":")))

(define-global expected (s c)
  (or (s .more) (error (cat "Expected " c " at " (s .pos)))))

(define-global unexpected (s c)
  (or (s .eos) (error (cat "Unexpected " c " at " (s .pos)))))

(define-global wrap (s x)
  (let y (read s)
    (if (= y (s .more)) y
      (list x y))))

(define-global hex-prefix? (str)
  (let i (if (= (code str 0) ?-) 1 0)
    (and (= (code str i) ?0)
         (let n (code str (inc i))
           (or (= n ?x) (= n ?X))))))

(define octal-prefix? (str)
  (and (= (code str 0) ?0)
       (number-code? (or (code str 1) 0))))

(define maybe-number (str)
  (if (hex-prefix? str)
      (parseInt str 16)
      (octal-prefix? str)
      (parseInt str 8)
      (and (number-code? (code str (edge str)))
           (not (= (code str 0) ?.)))
      (number str)))

(define-global real? (x)
  (and (number? x) (not (nan? x)) (not (inf? x))))

(define-reader ("" s) ; atom
  (let (str "")
    (while true
      (let c (peek-char s)
        (if (and c (and (not (whitespace [c]))
                        (not (delimiters [c]))))
            (do (when (= c "\\")
                  (cat! str (read-char s)))
                (cat! str (read-char s)))
          (break))))
  (if (= str "true") true
      (= str "false") false
    (let n (maybe-number str)
      (if (real? n) n str)))))

(define-reader ("(" s)
  (read-char s)
  (with r nil
    (let l (list)
      (while (nil? r)
        (skip-non-code s)
        (let c (peek-char s)
          (if (= c ")") (do (read-char s) (set r l))
              (nil? c) (set r (expected s ")"))
            (let x (read s)
              (if (key? x)
                  (let (k (clip x 0 (edge x))
                        v (read s))
                    (set (l [k]) v))
                (add l x)))))))))

(define-reader (")" s)
  (unexpected s ")"))

(define-reader ("[" s)
  (read-char s)
  (with r nil
    (let l (list)
      (while (nil? r)
        (skip-non-code s)
        (let c (peek-char s)
          (if (= c "]") (do (read-char s) (set r `(brackets ,@l)))
              (nil? c) (set r (expected s "]"))
            (let x (read s)
              (add l x))))))))

(define-reader ("]" s)
  (unexpected s "]"))

(define-reader ("{" s)
  (read-char s)
  (with r nil
    (let l (list)
      (while (nil? r)
        (skip-non-code s)
        (let c (peek-char s)
          (if (= c "}") (do (read-char s) (set r `(braces ,@l)))
              (nil? c) (set r (expected s "}"))
            (let x (read s)
              (add l x))))))))

(define-reader ("}" s)
  (unexpected s "}"))

(define-reader ("\"" s)
  (read-char s)
  (with r nil
    (let str "\""
      (while (nil? r)
        (let c (peek-char s)
          (if (= c "\"") (set r (cat str (read-char s)))
              (nil? c) (set r (expected s "\""))
            (do (when (= c "\\")
                  (cat! str (read-char s)))
                (cat! str (read-char s)))))))))

(define-reader ("|" s)
  (read-char s)
  (with r nil
    (let str "|"
      (while (nil? r)
        (let c (peek-char s)
          (if (= c "|") (set r (cat str (read-char s)))
              (nil? c) (set r (expected s "|"))
            (cat! str (read-char s))))))))

(define-reader ("'" s)
  (read-char s)
  (wrap s 'quote))

(define-reader ("`" s)
  (read-char s)
  (wrap s 'quasiquote))

(define-reader ("," s)
  (read-char s)
  (if (= (peek-char s) "@")
      (do (read-char s)
          (wrap s 'unquote-splicing))
    (wrap s 'unquote)))

(define-reader ("?" s)
  (read-char s)
  (let (c (read-char s)
        c1 (if (= c "\\") (read-char s) c))
    (code c1)))

(define-reader ("#" s)
  (read-char s)
  (let c (peek-char s)
    (if (= c "'")
        (do (read-char s)
          (wrap s 'function))
        (= c ";")
        (do (read-char s) (read s) (read s))
      (do (dec (s .pos))
          (read-table [""] s)))))

(export stream
        read
        read-all
        read-string
        read-table)
