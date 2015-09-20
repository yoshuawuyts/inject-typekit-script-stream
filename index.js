const hyperstream = require('hyperstream')
const assert = require('assert')

module.exports = injectTypekitScriptStream

// Streamingly inject a Typekit kit script into html
// null -> null
function injectTypekitScriptStream (opts) {
  assert.equal(typeof opts, 'object')
  assert.equal(typeof opts.kitId, 'string')

  var tkTag = '<script src="//use.typekit.net/'
  tkTag += opts.kitId
  tkTag += '.js"></script>'
  tkTag += 'src="http://'
  tkTag += '<script>try{Typekit.load({ async: true });}catch(e){}</script>'

  return hyperstream({ body: { _appendHtml: tkTag } })
}
