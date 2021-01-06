/**
 * 提取SFC的顶层注释
 * @param {String} source SFC string
 */
module.exports = function (source) {
  let reg = /(?:<!--)([\s\S]*?)(?:-->)/gim
  let res = reg.exec(source)
  if (res) {
    let str = res[1] || ''
    let keywords = []
    let description = ''
    let tmpstr = str.replace(/(\n\*)/gm, '*')
    let lines = str.replace(/(\n\*)/gm, '*').split('* ').filter(Boolean)
    
    lines.forEach((line, idx) => {
      let keyReg = /(?:@)(\w{1,})(?:\s{1,})([.\s\S]*)/gm
      if (!idx) return (description = line)
      let execRes = keyReg.exec(line)
      if (!execRes) return
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
