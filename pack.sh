npx webpack --config ./webpack.config.js
mkdir -p ./synthListSite
mkdir -p ./synthListSite/js
mkdir -p ./synthListSite/css
mkdir -p ./synthListSite/icons
cp ./site.html ./synthListSite
cp ./js/main.js ./synthListSite/js
cp ./icons/* ./synthListSite/icons
cp ./css/* ./synthListSite/css
cp ./manifest.json ./synthListSite
cp sw.js ./synthListSite
mv ./synthListSite/site.html ./synthListSite/index.html