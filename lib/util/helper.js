/**
 * 移除空的列 remove empty columns
 * @param {Array} tableHeader 表格头数组[a,b,c,d]
 * @param {Array} tableBody 表格body数组[[a1,b1,c1,d1],[...]]
 * @param {Array} emptyFlags 空的列标识
 * @return {Array} 处理完成的表格数据 table data [header, ...body]
 */
exports.removeEmptyColumns = function (
  tableHeader,
  tableBody,
  emptyFlags = ['-']
) {
  let emptyIdxs = tableHeader.map((itm, idx) => `0-${idx}`)
  let contentTables = [tableHeader, ...tableBody]
  for (let r = 0; r < tableBody.length; r++) {
    let row = tableBody[r]
    let c = row.length
    while (c--) {
      if (!emptyFlags.includes(row[c])) {
        emptyIdxs[c] = emptyIdxs[c].replace('0-', '1-')
      }
    }
    // If all of them have been marked in a cycle, they will jump out of the cycle
    if (emptyIdxs.every((itm) => itm.slice(0, 1) == '1')) {
      break
    }
  }

  let spliceIdxs = emptyIdxs
    .filter((itm) => itm.slice(0, 1) == '0')
    .map((itm) => {
      return itm.split('-')[1]
    })

  if (spliceIdxs.length) {
    contentTables.forEach((row) => {
      spliceIdxs.forEach((idx, offset) => {
        row.splice(idx - offset, 1)
      })
    })
  }

  return contentTables
}
