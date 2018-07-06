(ns dax.reader)

(define-global delimiters (set-of "{" "}" "[" "]" "(" ")" ";" "\r" "\n"))
(define-global whitespace (set-of " " "\t" "\r" "\n"))

(define-global stream (str more)
  (with s (obj pos: 0 string: str len: (# str))
    (when (is? more)
      (set (s .more) more))))

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

(define-global read-string (str more)
  (let x (read (stream str more))
    (unless (= x eof) x)))

(define key? (atom)
  (and (string? atom)
       (> (# atom) 1)
       (= (char atom (edge atom)) ":")))

(define-global expected (s c)
  (let ((more: true pos: true) s)
    (or more (error (cat "Expected " c " at " pos)))))

(define-global wrap (s x)
  (let y (read s)
    (if (= y (s .more)) y
      (list x y))))

(define-global hex-prefix? (str)
  (let i (if (= (code str 0) ?-) 1 0)
    (and (= (code str i) ?0)
         (let n (code str (inc i))
           (or (= n ?x) (= n ?X))))))

(define-global maybe-number (str)
  (if (hex-prefix? str)
      (parseInt str 16)
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
  (error (cat "Unexpected ) at " (s .pos))))

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
  (error (cat "Unexpected ] at " (s .pos))))

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
  (error (cat "Unexpected } at " (s .pos))))

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
      (do (dec (s .pos))
          (read-table [""] s)))))

(export stream
        read
        read-all
        read-string
        read-table)
