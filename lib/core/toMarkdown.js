const md = require('../util/md')
const { tableHeadMap } = require('../const/enum')
const { MODULE_H_LEVEL } = require('../const/config')

/**
 * 转AST模块为Markdown Doc
 * @param {String} moduleName 模块标题
 * @param {Array} moduleAst 模块的AST树
 */
module.exports = function (moduleName, moduleAst) {
  let len = moduleAst.length
  let prop = moduleName.toLowerCase()
  let tableHeader = Object.values(tableHeadMap[prop])
  let tableBody = []
  while (len--) {
    let evt = moduleAst[len]
    const {
      name,
      kind,
      visibility,
      description,
      arguments: args,
      params,
      default: defaultVal,
      required,
      type,
      keywords,
    } = evt
    if (visibility != 'public') continue

    // 事件名
    let nameText = md.code(name)

    // 类型
    let typeText = md.code(type)

    // 是否必须
    let requiredText = md.code(required) || '-'

    // 默认
    let defaultText = md.code(defaultVal) || '-'

    // 说明
    let descriptionText = description

    // 参数说明
    let argumentsText = '-'
    if (kind == 'event' && args.length) {
      argumentsText = ''
      argumentsText += args
        .map((itm) => {
          return `${md.code(itm.name + '：' + itm.type + '')} ${
            itm.description
          }`
        })
        .join('，')
    }

    // method params
    let paramsText = ''
    if (kind == 'method' && params.length) {
      paramsText = ''
      paramsText += params
        .map((itm) => {
          let paramDefaultVal = itm.defaultValue
            ? `默认${md.code(itm.defaultValue)}`
            : ''
          return `${md.code(itm.name + '：' + itm.type + '')} ${
            itm.description
          } ${paramDefaultVal}`
        })
        .join('，')
    }

    // props optional
    let optionalText = '-'
    // slot bind
    let bindText = '-'

    if (keywords.length) {
      keywords.forEach((itm) => {
        if (itm.name == 'optional') {
          optionalText = md.code(itm.description.split('|').join(',')) || '-'
        }
        if (itm.name == 'bind') {
          bindText = itm.description
        }
      })
    }

    // 合并
    switch (kind) {
      case 'prop':
        tableBody.push([
          nameText,
          descriptionText,
          typeText,
          optionalText,
          requiredText,
          defaultText,
        ])
        break
      case 'method':
        tableBody.push([nameText, descriptionText, paramsText])
        break
      case 'slot':
        tableBody.push([nameText, descriptionText, bindText])
        break
      default:
        tableBody.push([nameText, descriptionText, argumentsText])
    }
  }

  let title = md.h(moduleName, MODULE_H_LEVEL)
  let content = md.table([tableHeader, ...tableBody])

  return {
    title,
    content,
    doc: `${title}\n${content}\n`,
    source: moduleAst,
    empty: tableBody.length < 1,
  }
}

// function extractJsPart(source) {
//   let reg = /(?:<script .*?>)([\s\S]*?)(?:<\/script>)/gi
//   let regRes = reg.exec(source)
//   return regRes[1] || ''
// }
