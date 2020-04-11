
(set rl (require "readline"))
(set process (require "process"))

(define-macro eassert (x)
  `(unless (yes ,x)
     (print (cat "Assertion failed: " (str ',x)))
     (system .exit 1)))

(define-global bit-and (a b)
  (%literal a " & " b))

(define-global bit-or (a b)
  (%literal a " | " b))

(define-global bit-xor (a b)
  (%literal a " ^ " b))

(define-global bit-rsh (n bits)
  (%literal n " >> " bits))

(define-global bit-lsh (n bits)
  (%literal n " << " bits))


;;
;; Casting should be at least as efficient as anding with 0xff,
;; and won't have the size problems.  Override in sysdef.h if no
;; unsigned char type.
;;
(define-global CHARMASK (c)
  (bit-and c 0xFF))

;;
;; These flags, and the macros below them,
;; make up a do-it-yourself set of "ctype" macros that
;; understand the DEC multinational set, and let me ask
;; a slightly different set of questions.
;; 

(define-global _MG_W 0x01)
(define-global _MG_W 0x01)	; Word.			 
(define-global _MG_U 0x02)	; Upper case letter.		 
(define-global _MG_L 0x04)	; Lower case letter.		 
(define-global _MG_C 0x08)	; Control.			 
(define-global _MG_P 0x10)	; end of sentence punctuation	 
(define-global _MG_D 0x20)	; is decimal digit		 

(define-global ISWORD (c)  (not (= (bit-and (cinfo [(CHARMASK c)]) _MG_W) 0)))
(define-global ISCTRL (c)  (not (= (bit-and (cinfo [(CHARMASK c)]) _MG_C) 0)))
(define-global ISUPPER (c) (not (= (bit-and (cinfo [(CHARMASK c)]) _MG_U) 0)))
(define-global ISLOWER (c) (not (= (bit-and (cinfo [(CHARMASK c)]) _MG_L) 0)))
(define-global ISEOSP (c)  (not (= (bit-and (cinfo [(CHARMASK c)]) _MG_P) 0)))
(define-global ISDIGIT (c) (not (= (bit-and (cinfo [(CHARMASK c)]) _MG_D) 0)))
(define-global TOUPPER (c) (- c 0x20))
(define-global TOLOWER (c) (+ c 0x20))

;;
;; Generally useful thing for chars
;; 
(define-global CCHR (x) (bit-xor x 0x40))	;; CCHR('?') == DEL

(define-global METACH (CCHR ?[))

;; 
;; This table, indexed by a character drawn
;; from the 256 member character set, is used by my
;; own character type macros to answer questions about the
;; type of a character. It handles the full multinational
;; character set, and lets me ask some questions that the
;; standard "ctype" macros cannot ask.
;;/
;;
;; Due to incompatible behaviour between "standard" emacs and
;; ctags word traversing, '_' character's value is changed on 
;; the fly in ctags mode, hence non-const.
;;/
(define-global cinfo (list
	_MG_C _MG_C _MG_C _MG_C				      ; 0x0X */
	_MG_C _MG_C _MG_C _MG_C
	_MG_C _MG_C _MG_C _MG_C
	_MG_C _MG_C _MG_C _MG_C
	_MG_C _MG_C _MG_C _MG_C				      ; 0x1X */
	_MG_C _MG_C _MG_C _MG_C
	_MG_C _MG_C _MG_C _MG_C
	_MG_C _MG_C _MG_C _MG_C
	0 _MG_P 0 0						      ; 0x2X */
	_MG_W _MG_W 0 _MG_W
	0 0 0 0
	0 0 _MG_P 0
	(bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W)   ; 0x3X */
	(bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W)
	(bit-or _MG_D _MG_W) (bit-or _MG_D _MG_W) 0 0
	0 0 0 _MG_P
	0 (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)		      ; 0x4X */
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)   ; 0x5X */
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) 0
	0 0 0 0
	0 (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)		      ; 0x6X */
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)   ; 0x7X */
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) 0
	0 0 0 _MG_C
	0 0 0 0						      ; 0x8X */
	0 0 0 0
	0 0 0 0
	0 0 0 0
	0 0 0 0						      ; 0x9X */
	0 0 0 0
	0 0 0 0
	0 0 0 0
	0 0 0 0						      ; 0xAX */
	0 0 0 0
	0 0 0 0
	0 0 0 0
	0 0 0 0						      ; 0xBX */
	0 0 0 0
	0 0 0 0
	0 0 0 0
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)   ; 0xCX */
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	0 (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)		      ; 0xDX */
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W)
	(bit-or _MG_U _MG_W) (bit-or _MG_U _MG_W) 0 _MG_W
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)   ; 0xEX */
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	0 (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)		      ; 0xFX */
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W)
	(bit-or _MG_L _MG_W) (bit-or _MG_L _MG_W) 0 0
  ))

;;
;; Find the name of a keystroke.  Needs to be changed to handle 8-bit printing
;; characters and function keys better.	 Returns a pointer to the terminating
;; '\0'.  Returns NULL on failure.
;;
(define-global getkeyname (k)
  (when (< k 0)
    (set k (CHARMASK k))) ; sign extended char
  (case k
    ((CCHR ?@) (return "C-SPC"))
    ((CCHR ?I) (return "TAB"))
    ((CCHR ?M) (return "RET"))
    ((CCHR ?[ ?]) (return "ESC"))
    ((CCHR ?\ ) (return "SPC"))
    ((CCHR ??) (return "DEL"))
    (else
      (with cp ""
        (if (> k (CCHR ??))
            (do (cat! cp "0")
                (cat! cp (string (+ (bit-and (bit-rsh k 6) 7) ?0)))
                (cat! cp (string (+ (bit-and (bit-rsh k 3) 7) ?0)))
                (cat! cp (string (+ (bit-and k 7) ?0)))
                (return cp))
            (< k ?\ )
            (do (cat! cp "C-")
                (set k (CCHR k))
                (when (ISUPPER k)
                  (set k (TOLOWER k)))))
        (cat! cp (string k))))))

(define-global repl2 ()
  (let (rl (require "readline")
        process (require "process")
        in (process .stdin))
    (in (.remove-all-listeners))
    (rl .emit-keypress-events in)
    (in (.set-raw-mode true))
    (in (.resume))
    (in (.set-encoding "utf8"))
    (in .on "keypress" ;"data"
        (fn (key info)
          (print info)
          (if (= key "\u0003")
              (do (process (.exit)))
              (do
                (step c (or key (info .sequence))
                  (let n (code c 0)
                    (let s (getkeyname n)
                      (process .stdout .write (cat s "\n")))))
                (process .stdout .write "\n")))))))

(define-global repl3 ()
  (let (rl (require "readline")
        process (require "process")
        in (process .stdin))
    (in (.remove-all-listeners))
    (rl .emit-keypress-events in)
    (in (.set-raw-mode true))
    (in (.resume))
    (in (.set-encoding "utf8"))
    (in .on "keypress" ;"data"
        (fn (key info)
          ; (print info)
          (if (= key "\u0003")
              (do (process (.exit)))
              (do
                (step c (or key (info .sequence))
                  (let n (code c 0)
                    (let s (getkeyname n)
                      (process .stdout .write c))))))))))

(define-global repl4 ()
  (let in (process .stdin)
    (in (.remove-all-listeners))
    (rl .emit-keypress-events in)
    (in (.set-raw-mode true))
    (in (.resume))
    (in (.set-encoding "utf8"))
    (in .on "keypress" ;"data"
        (fn (key info)
          (print (JSON .stringify (obj key: key info: info)))
          (print info)
          (if (= key "\u0003")
              (do (process (.exit))))))))

(define-global rows ()
  (process .stdout .rows))

(define-global cols ()
  (process .stdout .columns))

(set vp (obj x: 0 y: 0))

(define-global vp-x () (or (vp .x) 0))
(define-global vp-y () (or (vp .y) 0))
(define-global vp-w () (or (vp .w) (process .stdout .columns)))
(define-global vp-h () (or (vp .h) (process .stdout .rows)))

(define-global vp-scissor (x y w h)
  (set (vp .x) x
       (vp .y) y
       (vp .w) w
       (vp .h) h))

(set chalk (require "chalk"))

(define-global rpad (s n)
  (when (is? n)
    (while (< (# s) n)
      (cat! s " ")))
  s)

(define-global text-style-bg 'bg-cyan-bright)
(define-global text-style-fg 'black)

(define-global render-header (buffer n)
  (with-current-buffer (or buffer (current-buffer))
    (chalk [(compile text-style-bg)] [(compile text-style-fg)] (rpad (format-mode-line) n))))

(define-global render-line (s width pt)
  (let (s (rpad (clip s 0 width) width)
        p (if (number? pt) pt -1))
    (when (and (>= p 0) (< p (# s)))
      (set s (cat (clip s 0 p)
                  (chalk [(compile text-style-bg)] [(compile text-style-fg)] (char s p))
                  (clip s (+ p 1)))))
    (cat s "\n")))

(define-global buffer-lines (buffer height)
  (with lines (cut (split (buffer-string buffer) "\n") 0 height)
    (when (is? height)
      (while (< (# lines) height)
        (add lines "")))))

(define-global render-lines (buffer height width)
  (let lines (buffer-lines buffer height)
    (with s ""
      (let (l (line-info buffer)
            i 1)
        (step x lines
          (cat! s (render-line x width (if (= (l .line) i) (l .column) nil)))
          (inc i))))))

(define-global render-buffer (buffer height width)
  (cat (render-lines buffer (- height 1) width)
       (if (= buffer minibuffer) ""
       (render-header buffer width))))

(define-global minibuffer (get-buffer-create " *Minibuf-1*"))

(define-global format (string rest: objects)
  (let (s (stream string)
        xs (reverse objects)
        msg "")
    (with r nil
      (while (nil? r)
        (let c (read-char s)
          (if (= c "%")
              (cat! msg (case (set c (read-char s))
                          ("%" "%")
                          (("s") (drop objects))
                          (("S") (str (drop objects)))
                          (("o" "d" "x" "X")
                           (parse-int (drop objects) (case c ("o" 8) ("d" 10) (("x" "X") 16))))
                          (("f" "g")
                           (parse-float (drop objects)))
                          (else
                            (error (cat "Unknown format specifier: " c)))))
              (nil? c) (set r msg)
            (cat! msg c)))))))

(define-global message args
  (with-current-buffer minibuffer
    (let msg (apply format args)
      (delete-region (point-min) (point-max))
      (insert msg))))

(define-global recursive-buffers (list))

(define-global recursive-edit (buffer props)
  (unless buffer
    (error "recursive-edit: Must specify a buffer"))
  (set (props .buffer) (current-buffer))
  (add recursive-buffers props)
  (set-buffer buffer))

(define-global recursive-value ()
  (when (some? recursive-buffers)
    (let ((buffer: buf complete: f prompt: p) (last recursive-buffers))
      (clip (buffer-string) (# p)))))

(define-global recursive-prompt ()
  (when (some? recursive-buffers)
    (let ((buffer: buf complete: f prompt: p) (last recursive-buffers))
      p)))

(define-global recursive-pop (quit?)
  (when (some? recursive-buffers)
    (let ((buffer: buf complete: f prompt: p) (drop recursive-buffers))
      (let x (clip (buffer-string) (# p))
        (set-buffer buf)
        (unless quit?
          (when f
            (f x)))))))

(define-global prompt (msg f)
  (unless (= (current-buffer) minibuffer)
    (message "%s" msg)
    (recursive-edit minibuffer (obj complete: f prompt: (buffer-string minibuffer)))))

(define-global render-to-string (buffer)
  (let (b (or buffer (current-buffer))
        b (if (= b minibuffer) ((last recursive-buffers) .buffer) b)
        s (render-buffer b (- (rows) 2) (cols)))
    (cat! s (render-buffer minibuffer 2 (cols)))
    (set s (clip s 0 (edge s)))
    s))

(define-global render (buffer)
  (rl .cursor-to (process .stdout) 0 0)
  (let s (render-to-string buffer)
    (process .stdout .write s)
    nil))

(define-global history (list))

(define-global forward-char (n)
  (set n (either n 1))
  (goto-char (+ (point) n)))

(define-global backward-char (n)
  (forward-char (- (either n 1))))

(define-global current-line ()
  ((line-info) .line))

(define-global current-column ()
  ((line-info) .column))

(define-global advance-point-until (predicate n)
  (set n (either n 1))
  (let pt (point)
    (while true
      (when (predicate)
        (return true))
      (forward-char n)
      (when (= pt (point))
        (return false))
      (set pt (point)))))

(define-global forward-line ()
  (let line (current-line)
    (advance-point-until
      (fn () (> (current-line) line)))))

(define-global bol ()
  (advance-point-until
    (fn () (= (current-column) 0))
    -1))

(define-global eol ()
  (when (forward-line)
    (backward-char)))

(define-global command-loop (key info)
  (unless (= (current-buffer) minibuffer)
    (message "%S"
             (list
               key: (JSON .stringify key)
               seq: (JSON .stringify (info .sequence))
               info: info)))
  ; (print info)
  (if (= key "\u0007")
      (do (recursive-pop true)
          (message "Quit"))
      (= key "\u0001")
      (bol)
      (= key "\u0005")
      (eol)
      (= key "\u0003")
      (do (process (.exit)))
      (= (info .sequence) "\u001b:")
      (do (prompt "Eval: "
                  (fn (x)
                    (unless (and (some? x) (= (last history) x))
                      (add history x))
                    (let ((ok v) (guard (compiler .eval (reader .read-string x))))
                      (message "%S" (if ok v (v .message)))))))
      (= key "\u0013")
      (when (buffer-file-name)
        (system .write-file
                (buffer-file-name)
                (buffer-string))
        (message "Wrote %s" (buffer-file-name)))
      (do
        ; (step c (or key (info .sequence))
        ;   (let n (code c 0)
        ;     (let s (getkeyname n)
        ;       (cat! prompt c))))))
        (case (info .name)
          ("enter"
           (unless (= (current-buffer) minibuffer)
             (let ((ok v) (guard (save-excursion (compiler .eval (read (current-buffer))))))
               (when ok
                 (message "%S" v)))))
          ("return"
           (if (= (current-buffer) minibuffer)
               (recursive-pop)
               (insert "\n")))
          ("up"
           (when (= (current-buffer) minibuffer)
             (let (cur (recursive-value)
                       prev ""
                       l (if (in? cur history) history (join history (list cur))))
               (step x l
                 (when (= x cur)
                   (message "%s%s" prev (recursive-prompt)))
                 (set prev x)))))
          ("left" (goto-char (- (point) 1)))
          ("right" (goto-char (+ (point) 1)))
          ("backspace" (delete-char -1))
          (else
            (unless (or (info .ctrl)
                        (info .meta)
                        (nil? key)
                        (none? key))
              (insert (info .sequence)))))
        ))
  (render))

(define-global repl5 ()
  (let (rl (require "readline")
        process (require "process")
        in (process .stdin))
    (in (.remove-all-listeners))
    (rl .emit-keypress-events in)
    (in (.set-raw-mode true))
    (in (.resume))
    (in (.set-encoding "utf8"))
    (rl .cursor-to (process .stdout) 0 0)
    (rl .clear-screen-down (process .stdout))
    (process .stdout .on "resize" render)
    (render)
    (in .on "keypress" command-loop)))

; 	switch (k) {
; 	case CCHR('@'):
; 		np = "C-SPC";
; 		break;
; 	case CCHR('I'):
; 		np = "TAB";
; 		break;
; 	case CCHR('M'):
; 		np = "RET";
; 		break;
; 	case CCHR('['):
; 		np = "ESC";
; 		break;
; 	case ' ':
; 		np = "SPC";
; 		break;		/* yuck again */
; 	case CCHR('?'):
; 		np = "DEL";
; 		break;
; 	default:
		; if (k > CCHR('?')) {
		; 	*cp++ = '0';
		; 	*cp++ = ((k >> 6) & 7) + '0';
		; 	*cp++ = ((k >> 3) & 7) + '0';
		; 	*cp++ = (k & 7) + '0';
		; 	*cp = '\0';
		; 	return (cp);
		; } else if (k < ' ') {
		; 	*cp++ = 'C';
		; 	*cp++ = '-';
		; 	k = CCHR(k);
		; 	if (ISUPPER(k))
		; 		k = TOLOWER(k);
		; }
		; *cp++ = k;
		; *cp = '\0';
		; return (cp);
	; }
	; copied = strlcpy(cp, np, len);
	; if (copied >= len)
		; copied = len - 1;
	; return (cp + copied);
; }
