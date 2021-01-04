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

  let doc = await parsed(sourceStr)
  let sfcDoc = doc.map(m => m.doc).join('\n')
  console.log(sfcDoc)
}

main()
