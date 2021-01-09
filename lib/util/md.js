const table = require('markdown-table')

exports.h = (text, level = 2) => {
  const prefix = (cnt) => new Array(cnt).fill('#').join('')
  return prefix(level) + ' ' + text
}
exports.quote = (text) => `> ${text}`
exports.item = (text) => `- ${text}`
exports.bold = (text) => `**${text}**`
exports.italic = (text) => `*${text}*`
exports.code = (text, lang = 'js', inline = true) => {
  if (typeof text != 'boolean' && !text) return ''
  return inline ? `\`${text}\`` : '```' + lang + '\n' + text + '\n```'
}

exports.block = (text, lang = 'js') => {
  return code(text, lang, false)
}

/**
 * Mixed Chinese string length
 * @param {String} v string
 */
function stringLength(v) {
  let byteLen = Buffer.byteLength(v),
    len = v.length,
    offset = byteLen - len,
    count = offset / 2,
    letterLen = len
  if (count > 0) {
    letterLen = byteLen - count * 3
  }

  letterLen = letterLen < 0 ? 0 : letterLen
  return letterLen + count * 1.7
}

exports.table = (data = [], options = {}) => {
  return table(data, {
    stringLength,
    ...options,
  })
}
