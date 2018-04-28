#!/bin/bash

node './version-plus.js'
npm run build
git add .
git commit -m "$1"
proxychains git push origin master
proxychains npm publish
