const fs = require('fs')

const pkg = require('./package.json')
const t = pkg.version.split('.')
t[2] = parseInt(t[2]) + 1
pkg.version = t.join('.')
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
