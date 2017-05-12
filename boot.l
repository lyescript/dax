(define lumen (require (target js: "./lumen.js" lua: 'lumen)))

((get lumen 'main)
 (get (get lumen 'system) 'argv))
