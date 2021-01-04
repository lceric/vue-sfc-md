const fs = require('fs');
const path = require('path');
const { parsed } = require('../lib')
/**
 * 主线程
 */
async function main() {
  const sourceStr = fs.readFileSync(
    path.join(__dirname, './Btn.vue'),
    'utf8'
  )

  let docModules = await parsed(sourceStr)
  let sfcDoc = docModules.map(m => !m.empty && m.doc).join('\n')
  console.log(sfcDoc)
}

main()
