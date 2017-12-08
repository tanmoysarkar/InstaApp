var config = require('../config/config')
var axios = require('axios')

var ig = require('instagram-node').instagram()
ig.use({ client_id: config.clientId,
         client_secret: config.clientSecret })

module.exports = {
	login: function(req, res){
	  	res.redirect(ig.get_authorization_url(config.redirectUri, { scope: ['likes+basic+public_content+follower_list+comments+relationships+likes'], state: 'a state' }))
	},
	getAccessToken: function(req, res){
		if(req.cookies.access_token)
			res.redirect('/profile')
		else{
			if(!req.query.code)
				res.redirect('/')
			ig.authorize_user(req.query.code, config.redirectUri, function(err, result){
	    		if (err) {
	      			console.log(err);
	      			res.send("Didn't work");
		    	}
			    else {
			    	accessTokenGlobal = result.access_token
		    		res.cookie('access_token', result.access_token, { maxAge: 900000, httpOnly: true })
		    		res.redirect('/profile')
		    	}
	  		})
		}
	},
	profile: function(req, res){
		var access_token = req.cookies.access_token
		var res1 = res
		axios.get('https://api.instagram.com/v1/users/self/?access_token='+access_token)
	  	.then(function (res2) {
	  		var data = res2.data.data
	    	res1.render('profile', {id: data.id, username: data.username, dp: data.profile_picture, name: data.full_name, bio: data.bio})
	  	})
	  	.catch(function (error) {
	    	res1.send(error)
	  	})
	},
	searchTag: function(req, res){
		var access_token = req.cookies.access_token
		console.log(req.body)
		var res1 = res
		axios.get('https://api.instagram.com/v1/tags/'+ req.body.tag +'/media/recent?access_token='+access_token)
	  	.then(function (res2) {
	  		var data = res2.data.data
	    	res1.send(data)
	  	})
	  	.catch(function (error) {
	    	res1.send(error)
	  	})
	}
}