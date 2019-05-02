#!/usr/bin/env bash


echo -e "\e[32m  Setting git configs..."
node ./build/releases/bin/build-releases.js version
echo -e "\e[32m  Setting git configs..."
git push https://${GH_TOKEN}@github.com/uidu-org/guidu.git HEAD:master > /dev/null 2>&1
echo -e "\e[32m  Setting git configs..."
yarn build:pkg
echo -e "\e[32m  Setting git configs..."
node ./build/releases/bin/build-releases.js publish --public
echo -e "\e[32m  Setting git configs..."
git push https://${GH_TOKEN}@github.com/uidu-org/guidu.git --tags > /dev/null 2>&1
echo -e "\e[32m  Setting git configs..."
