
(set rl (require "readline"))
(set process (require "process"))

(define-global band (a b)
  (%literal a " & " b))

(define-global bor (a b)
  (%literal a " | " b))

(define-global bxor (a b)
  (%literal a " ^ " b))


;;
;; Casting should be at least as efficient as anding with 0xff,
;; and won't have the size problems.  Override in sysdef.h if no
;; unsigned char type.
;;
(define-global CHARMASK (c)
  (band c 0xFF))

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

(define-global ISWORD (c)	(not (= (band (cinfo [(CHARMASK c)]) _MG_W) 0)))
(define-global ISCTRL (c)	(not (= (band (cinfo [(CHARMASK c)]) _MG_C) 0)))
(define-global ISUPPER (c)	(not (= (band (cinfo [(CHARMASK c)]) _MG_U) 0)))
(define-global ISLOWER (c)	(not (= (band (cinfo [(CHARMASK c)]) _MG_L) 0)))
(define-global ISEOSP (c)	(not (= (band (cinfo [(CHARMASK c)]) _MG_P) 0)))
(define-global	ISDIGIT (c)	(not (= (band (cinfo [(CHARMASK c)]) _MG_D) 0)))
(define-global TOUPPER (c)	(- c 0x20))
(define-global TOLOWER (c)	(+ c 0x20))

;;
;; Generally useful thing for chars
;; 
(define-global CCHR (x) (bxor x 0x40))	;; CCHR('?') == DEL

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
	(bor _MG_D _MG_W) (bor _MG_D _MG_W) (bor _MG_D _MG_W) (bor _MG_D _MG_W)   ; 0x3X */
	(bor _MG_D _MG_W) (bor _MG_D _MG_W) (bor _MG_D _MG_W) (bor _MG_D _MG_W)
	(bor _MG_D _MG_W) (bor _MG_D _MG_W) 0 0
	0 0 0 _MG_P
	0 (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)		      ; 0x4X */
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)   ; 0x5X */
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) 0
	0 0 0 0
	0 (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)		      ; 0x6X */
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)   ; 0x7X */
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) 0
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
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)   ; 0xCX */
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	0 (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)		      ; 0xDX */
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W) (bor _MG_U _MG_W)
	(bor _MG_U _MG_W) (bor _MG_U _MG_W) 0 _MG_W
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)   ; 0xEX */
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	0 (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)		      ; 0xFX */
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W) (bor _MG_L _MG_W)
	(bor _MG_L _MG_W) (bor _MG_L _MG_W) 0 0
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
    ((CCHR ? ) (return "SPC"))
    ((CCHR ??) (return "DEL"))
    (else
      (with cp ""
        (if (> k (CCHR ??))
            (error "todo")
            (< k ? )
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

(define-global render ()
  (rl .cursor-to (process .stdout) 0 0)
  (let s ""
    (for y (rows)
      (for x (cols)
        (cat! s (if (= y 1) "=" "x")))
      (cat! s "\n"))
    (process .stdout .write s)))


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
