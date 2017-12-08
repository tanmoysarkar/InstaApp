var express = require('express')
var router = express.Router()
var instaFunctions = require('./instaFunctions')

var session = function(req, res, next){
	if(!req.cookies.access_token)
		res.redirect('/')
	next()
}

router.get('/', function(req, res){
	res.render('index', {user: 'tammy'})
})

router.get('/login', instaFunctions.login)
router.get('/getAccessToken', instaFunctions.getAccessToken)
router.get('/profile', session, instaFunctions.profile)
router.post('/searchTag', session, instaFunctions.searchTag)

module.exports = router