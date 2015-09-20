const fromString = require('from2-string')
const concat = require('concat-stream')
const test = require('tape')

const tk = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  t.throws(tk.bind(null, 'foo'), /object/)
  t.throws(tk.bind(null, {}), /string/)
})

test('should inject a livereload script', function (t) {
  t.plan(2)
  const kitId = '123ui9'

  fromString('<html><body></body></html>')
    .pipe(tk({ kitId: kitId }))
    .pipe(concat(function (buf) {
      const str = buf.toString()
      t.ok(/typekit/.test(str), 'script injected')
      t.ok(new RegExp(kitId).test(str), 'kitId injected')
    }))
})
