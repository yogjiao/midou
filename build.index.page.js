"use strict"
const fs = require('fs')
const crypto = require('crypto')
const util = require('util')

console.log('dist/index.html building')

let vendorsHash = crypto.createHash('sha256').update(fs.readFileSync('dist/js/vendors.js')).digest('hex');
let mainHash = crypto.createHash('sha256').update(fs.readFileSync('dist/js/main.js')).digest('hex');

let content = fs.readFileSync('index.html', {encoding: 'utf8'})

content = util.format(content, vendorsHash, mainHash)

fs.writeFileSync('dist/index.html', content, {encoding: 'utf8'})
