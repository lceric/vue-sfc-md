/**
 * 提取SFC的顶层注释
 * @param {String} source SFC string
 */
module.exports = function (source) {
  let reg = /(?:<!--)([\s\S]*?)(?:-->)/gim
  let keyReg = /(?:@)(\w*)(?:\s)(.*)/g
  let res = reg.exec(source)
  if (res) {
    let str = res[1] || ''
    let keywords = []
    let description = ''

    let lines = str.replace(/\n/g, '').split('* ').filter(Boolean)

    lines.forEach((line, idx) => {
      if (!idx) return (description = line)
      let execRes = keyReg.exec(line)
      console.log(execRes)
      keywords.push({
        name: execRes[1],
        description: execRes[2],
      })
    })

    return {
      description,
      keywords,
      empty: keywords.length < 1,
    }
  }
}
