const fs = require('fs')
const path = require('path')
const vuedoc = require('@vuedoc/parser')
const {
  handleFileDoc,
  handlePropsDoc,
  handleEventsDoc,
  handleMethodsDoc,
  handleSlotsDoc,
} = require('./core')

/**
 * parse source string
 * @param {String} str source string
 */
function parsedSource(str = '', opts = {}) {
  return vuedoc.parse({ filecontent: str, ...opts })
}

/**
 * 入口
 * @param {String} vueFileStr SFC string
 */
async function entry(vueFileStr) {
  let fileDocs = handleFileDoc(vueFileStr)

  let parsed = await parsedSource(vueFileStr)
  let { events, methods, props, slots } = parsed

  let propsDoc = handlePropsDoc(props)
  let eventsDoc = handleEventsDoc(events)
  let methodsDoc = handleMethodsDoc(methods)
  let slotsDoc = handleSlotsDoc(slots)

  return [...fileDocs, propsDoc, eventsDoc, methodsDoc, slotsDoc]
}

/**
 * 主线程
 */
async function main() {
  const sourceStr = fs.readFileSync(
    path.join(__dirname, './example.vue'),
    'utf8'
  )

  let doc = await entry(sourceStr)
  console.log(doc)
}

main()
