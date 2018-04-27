const bili = require('bili');
const fs = require('fs');
fs.renameSync('.babelrc', '.babelrc-back')
bili.write({
  input: 'src/bundle-entry.js',
  format: ['cjs','umd','umd-min','es'],
  banner: true,
  plugin: ['vue'],
}).then(() => {
  console.log('Done!')
})

fs.renameSync('.babelrc-back', '.babelrc')
