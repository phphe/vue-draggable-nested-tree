#!/bin/bash

node './version-plus.js'
npm run build
git add .
git commit -m "$1"
git push origin master
npm publish
