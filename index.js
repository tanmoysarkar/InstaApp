var express = require("express")
var app = express()
var path = require('path')
var http = require('http')
var config = require('./config/config')
var bodyParser = require('body-parser')
var axios = require('axios')
var router = require('./api/router')
var cookieParser = require('cookie-parser')

var accessTokenGlobal = ''

// middleware
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './frontend')))

// configuration
app.set('views', path.join(__dirname, '/frontend'))
app.set('view engine', 'ejs')

app.use('/', router)

var port = process.env.PORT || 5000
 
app.listen(port, function(){
   console.log("Listening on " + port)
})