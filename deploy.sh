#!/bin/bash

set -e

tsc

html=$(cat index.html)
html=${html/build/cards-memory-game}
echo $html > ./build/index.html

cd build

git init
git add .
git commit -m "deploy"

git push -f git@github.com:2b7d/cards-memory-game.git master:gh-pages
