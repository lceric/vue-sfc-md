const { FILE_TOP_COMMENT } = require('../const/config')
const md = require('../util/md')
const convertAstToMd = require('./convertAstToMd')
const convertSFCTopMd = require('./convertSFCTopMd')

/**
 * 处理SFC顶层注释
 * @param {String} fileSource SFC string
 */
function handleFileDoc(fileSource) {
  let topComment = convertSFCTopMd(fileSource)
  let descTitle = FILE_TOP_COMMENT.DESCRIPTION
  let descContent = ''
  let docs = []
  if (topComment) {
    descContent = topComment.description
    // 组件描述
    let descDoc = geneModuleStruct(md.h(descTitle, 2), descContent, null, false)
    docs.push(descDoc)
    // 其他描述
    let keywords = topComment.keywords
    keywords.forEach((itm) => {
      docs.push(
        geneModuleStruct(
          md.h(FILE_TOP_COMMENT[itm.name.toUpperCase()] || itm.name, 2),
          itm.description,
          topComment,
          false
        )
      )
    })
  }
  return docs
}

/**
 * 处理props注释
 * @param {Array} props AST props
 */
function handlePropsDoc(props) {
  return convertAstToMd('Props', props)
}

/**
 * 处理events注释
 * @param {Array} events AST events
 */
function handleEventsDoc(events) {
  return convertAstToMd('Events', events)
}

/**
 * 处理methods注释
 * @param {Array} methods AST methods
 */
function handleMethodsDoc(methods) {
  return convertAstToMd('Methods', methods)
}

/**
 * 处理slots注释
 * @param {Array} slots AST slots
 */
function handleSlotsDoc(slots) {
  return convertAstToMd('Slots', slots)
}

/**
 * 组装单模块文档结构
 * @param {String} title 模块md标题
 * @param {String} content 模块内容
 * @param {Object|Array} source 模块的原始AST
 * @param {Boolean} empty 是否是空的，如表格
 */
function geneModuleStruct(title, content, source, empty) {
  return {
    title,
    content,
    doc: `${title}\n${content}\n`,
    source,
    empty,
  }
}

module.exports = {
  handleFileDoc,
  handlePropsDoc,
  handleEventsDoc,
  handleMethodsDoc,
  handleSlotsDoc,
}
