/* jshint asi: true */

'use strict'

var config = require('../build-helpers/gulp/config'),
  express = require('express'),
  fs = require('fs'),
  liveReload = require('connect-livereload'),
  open = require('open'),
  path = require('path'),
  requestApi = require('request');

var app = express()

function apiHandler(request, response) {
  if (process.env.APP_ENV !== 'prod') {
    var index = request.url.indexOf('?');

    var pathFilter = (index > -1) ? request.url.substr(0, index) : request.url;

    var filePath = path.join(__dirname, 'mocks', request.baseUrl.replace('/', '') + path.sep +  pathFilter + '.' + request.method.toLowerCase() + '.response.json')

    console.log('Posible mock a servir: ' + filePath)

    try {
      var data = JSON.parse(fs.readFileSync(filePath))

      setTimeout(function send() {
        response
          .status(data.status)
          .json(data.json || {})
      }, 1000)
    } catch(error) {
      return response.sendStatus(404)
    }
  } else {

    var url = (process.env.APP_API === 'public') ?
        'http://192.168.15.15:8080/abcd_mult_web_abcdpublicwebapp_02' :
        'http://192.168.15.15:8080/abcd_mult_web_abcdprivatewebapp_01';

    return request
      .pipe(requestApi({
        url: url + request.originalUrl
      }, function(error, response, body){
        console.log("---------------------------------------------------");
        var datos;
        if(error){
          console.log(error);
        }else{
          if(body){
            try {
              datos = JSON.parse(body);
              //console.log(datos);
            } catch(error) {
              console.log(['ERROR: ', request.originalUrl, '\n*********\n', body].join(''));
            }
          }
        }
      }))
      .pipe(response)
  }
}

function crossDomain(request, response, done) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  if (request.method === 'OPTIONS') {
    return response.sendStatus(200)
  }

  done();
}

app
  .use(liveReload({ port: process.env.APP_LIVE_PORT }))
  .use(express.static(config.build))
  .use(crossDomain)
  .use('/workshop', apiHandler)
  .listen(process.env.APP_PORT)

open('http://localhost:' + process.env.APP_PORT)

console.log('Server started at http://localhost:' + process.env.APP_PORT + ' and live-reload on Port: ' + process.env.APP_LIVE_PORT)
