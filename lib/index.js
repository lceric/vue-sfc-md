const vuedoc = require('@vuedoc/parser')
const {
  handleFileDoc,
  handlePropsDoc,
  handleEventsDoc,
  handleMethodsDoc,
  handleSlotsDoc,
} = require('./core')

/**
 * 入口
 * @param {String} vueFileStr SFC string
 */
async function parsed(vueFileStr, ext = {}) {
  let opts = Object.assign({ filecontent: vueFileStr }, ext)

  let fileDocs = handleFileDoc(vueFileStr, opts)
  let parsed = await vuedoc.parse(opts)

  let { events, methods, props, slots } = parsed
  let propsDoc = handlePropsDoc(props, opts)
  let eventsDoc = handleEventsDoc(events, opts)
  let methodsDoc = handleMethodsDoc(methods, opts)
  let slotsDoc = handleSlotsDoc(slots, opts)

  return [...fileDocs, propsDoc, eventsDoc, methodsDoc, slotsDoc]
}

module.exports = {
  parsed,
  vuedoc,
}
