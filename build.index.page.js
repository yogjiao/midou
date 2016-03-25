"use strict"
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const util = require('util')
const rd = require('rd');
const packages = require(path.resolve(__dirname, 'package.json'))
console.log('dist/index.html building')



let vendors, main;


let vendorsHash = crypto.createHash('sha256').update(fs.readFileSync('dist/js/vendors.js')).digest('hex');
let mainHash = crypto.createHash('sha256').update(fs.readFileSync('dist/js/main.js')).digest('hex');

vendors = vendorsHash +'.vendors.js'
main = mainHash +'.main.js'
fs.renameSync('dist/js/vendors.js',  'dist/js/'+ vendors)
fs.renameSync('dist/js/main.js',  'dist/js/'+ main)

//let venderParttern = /([\w.]+.vendors.js)$/
let mainParttern = /([\w.]+.main.js)$/
rd.eachSync('dist/js', function (f, s) {
  console.log(f)
  // 每找到一个文件都会调用一次此函数
  // 参数s是通过 fs.stat() 获取到的文件属性值

  // if (venderParttern.test(f)) {
  //   vendors = f.match(venderParttern)[1]
  // }
  if (mainParttern.test(f)) {
    main = f.match(mainParttern)[1]
  }
});


let content = fs.readFileSync('index.template.html', {encoding: 'utf8'})

content = util.format(content, vendors, main)

// const exec = require('child_process').exec;
// const child = exec('mkdir dist/1.1.0',
//   (error, stdout, stderr) => {
//     if (error !== null) {
//       console.log(`exec error: ${error}`);
//     } else {
//       console.log(`${packages.version} success mkdir`);
//
//     }
// });
try {
  fs.mkdirSync('dist/' + packages.version)
} catch (e) {

} finally {
  fs.writeFileSync('dist/' + packages.version +'/index.html', content, {encoding: 'utf8'})
}
