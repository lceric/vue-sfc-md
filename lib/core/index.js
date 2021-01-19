const { fileTopComment } = require('../const/config')
const md = require('../util/md')
const convertAstToMd = require('./toMarkdown')
const genFileHeaderAST = require('./genFileHeaderAST')

/**
 * 处理SFC顶层注释
 * @param {String} fileSource SFC string
 */
function handleFileDoc(fileSource, opts) {
  let topComment = genFileHeaderAST(fileSource)

  // 合并动态顶层注释映射
  let { commentExtra = {} } = opts || {}
  let topCommentMap = Object.assign({}, fileTopComment, commentExtra)

  let descTitle = topCommentMap.description
  let descContent = ''
  let docs = []
  if (topComment) {
    descContent = topComment.description
    // 组件描述
    // 如果keywords中存在description，将会覆盖此

    let descDoc = geneModuleStruct(
      md.h(descTitle, 2),
      descContent,
      null,
      false,
      'description'
    )
    docs.push(descDoc)
    // 其他描述
    let keywords = topComment.keywords
    keywords.forEach((itm) => {
      let title = topCommentMap[itm.name.toLowerCase()] || itm.name,
        description = itm.description,
        titleLevel = 2,
        fn = 'push'
      if (itm.name == 'title') {
        title = itm.description
        description = ''
        titleLevel = 1
        fn = 'unshift'
      }
      let raw = Object.create(null)
      raw = geneModuleStruct(
        md.h(title, titleLevel),
        description,
        topComment,
        false,
        itm.name
      )
      docs[fn](raw)
    })
  }
  return docs
}

/**
 * 处理props注释
 * @param {Array} props AST props
 */
function handlePropsDoc(props, opts) {
  return convertAstToMd('Props', props, opts)
}

/**
 * 处理events注释
 * @param {Array} events AST events
 */
function handleEventsDoc(events, opts) {
  return convertAstToMd('Events', events, opts)
}

/**
 * 处理methods注释
 * @param {Array} methods AST methods
 */
function handleMethodsDoc(methods, opts) {
  return convertAstToMd('Methods', methods, opts)
}

/**
 * 处理slots注释
 * @param {Array} slots AST slots
 */
function handleSlotsDoc(slots, opts) {
  return convertAstToMd('Slots', slots, opts)
}

/**
 * 组装单模块文档结构
 * @param {String} title 模块md标题
 * @param {String} content 模块内容
 * @param {Object|Array} source 模块的原始AST
 * @param {Boolean} empty 是否是空的，如表格
 */
function geneModuleStruct(title, content, source, empty, keyword) {
  const text = t => t ? `${t}\n` : ''
  return {
    title,
    content,
    doc: `${title}\n${text(content)}`,
    source,
    empty,
    keyword,
  }
}

module.exports = {
  handleFileDoc,
  handlePropsDoc,
  handleEventsDoc,
  handleMethodsDoc,
  handleSlotsDoc,
}
