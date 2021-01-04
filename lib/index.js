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
async function parsed(vueFileStr) {
  let fileDocs = handleFileDoc(vueFileStr)

  let parsed = await vuedoc.parse({ filecontent: vueFileStr })
  let { events, methods, props, slots } = parsed

  let propsDoc = handlePropsDoc(props)
  let eventsDoc = handleEventsDoc(events)
  let methodsDoc = handleMethodsDoc(methods)
  let slotsDoc = handleSlotsDoc(slots)

  return [...fileDocs, propsDoc, eventsDoc, methodsDoc, slotsDoc]
}

module.exports = {
  parsed,
  vuedoc,
}
