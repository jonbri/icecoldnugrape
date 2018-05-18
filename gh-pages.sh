#!/bin/sh

# first run production build in this repo
npm run build

echo "create staging repo"
mkdir -p /tmp/icecoldnugrape
rm -Rf /tmp/icecoldnugrape
git clone -b gh-pages https://github.com/jonbri/icecoldnugrape.git /tmp/icecoldnugrape
npm install

echo "clear out content"
git -C /tmp/icecoldnugrape rm -rf .
git -C /tmp/icecoldnugrape clean -fxd

echo "copy over new content"
cp -R build/* /tmp/icecoldnugrape

echo "icecoldnugrape.com" > /tmp/icecoldnugrape/CNAME

echo "stage and create a new commit"
git -C /tmp/icecoldnugrape add .
git -C /tmp/icecoldnugrape add -u
git -C /tmp/icecoldnugrape commit -m "Update from: `git rev-parse --short master`"

echo "push"
git -C /tmp/icecoldnugrape push origin gh-pages

echo "done"
