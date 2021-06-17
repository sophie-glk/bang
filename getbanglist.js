const fs = require('fs')
const https = require('https')
https://duckduckgo.com/bv1.js

function getversion(){
    const options = {
  hostname: 'duckduckgo.com',
  port: 443,
  path: '/bv1.js',
  method: 'GET'
}
let str = "";
let version = "";
callback = function(response){
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    version = str.match(/^\d+|\d+\b|\d+(?=\w)/g)[0];
    console.log(version);
    getbangs(version);
  });
}
const req = https.request(options, callback).end();
}

getversion();

function getbangs(version) {
    let str = "";
const options = {
  hostname: 'duckduckgo.com',
  port: 443,
  path: '/bang.v'+version+'.js',
  method: 'GET'
}
callback = function(response){
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    let data = JSON.stringify(str);
   const fs = require('fs');
fs.writeFile('bangs.json', str, function (err) {
  if (err) return console.log(err);
});
    
  });
}

const req = https.request(options, callback).end();
}
