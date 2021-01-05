## vue-sfc-md
read vue sfc, or sfc string, output md modules. [@vuedoc/paser](https://github.com/vuedoc/parser)

## install
```bash
npm i vue-sfc-md
```

## usage

```js
const fs = require('fs');
const path = require('path');
const { parsed } = require('vue-sfc-md')
/**
 * 主线程
 */
async function main() {
  const sourceStr = fs.readFileSync(
    path.join(__dirname, '[your path].vue'),
    'utf8'
  )

  let doc = await parsed(sourceStr)
  let sfcDoc = doc.map(m => m.doc).join('\n')
  console.log(sfcDoc)
}

main()
```