const crypto = require('crypto')
const noop = require('noop2')
const url = require('url')

const prefix = crypto.createHash('md5')
  .update(__dirname)
  .digest('hex') + ':'

var counter = 0

module.exports = DockPane

function DockPane (opts, init, exit) {
  const id = String(++counter)
  const disposers = []

  if (typeof opts === 'function') {
    exit = init
    init = opts
    opts = {}
  }

  opts = opts || {}
  init = init || noop
  exit = exit || noop

  disposers.push(
    atom.views.addViewProvider(Model, View),
    atom.workspace.addOpener(opener)
  )

  function Model () {}
  Model.prototype.destroy = exit
  Model.prototype.createView = View
  Model.prototype.getTitle = function () {
    return opts.title || 'Atom Pane'
  }
  Model.prototype.getDefaultLocation = function () {
    return opts.defaultLocation || 'right';
  }
  Model.prototype.getAllowedLocations = function () {
    return opts.allowedLocations || opts.defaultLocation;
  }

  function View (model) {
    var el = opts.element || 'div'
    if (typeof el === 'string') el = document.createElement(el)
    if (typeof el === 'function') el = new el() // eslint-disable-line
    model.div = el
    return el
  }

  return atom.workspace.open(prefix + '//' + id, {
    activatePane: opts.activatePane !== false,
    searchAllPanes: false
  }).then(function (model) {
    disposers.forEach(function (disposer) {
      return disposer.dispose()
    })

    setTimeout(function () {
      init(null, atom.views.getView(model))
    })
  }).catch(init)

  function opener (uri) {
    uri = url.parse(uri)

    if (uri.protocol !== prefix) return
    if (uri.host !== id) return

    return new Model()
  }
}
