const express = require('express');
const router = express.Router();

// importing movieFactory class
const User = require('../API.js')


let searchNumber = 0;

router.get('/results', (req,res) =>{
	console.log('the movies results route works')
	// to be changed later from searchNumber to maxResults to go with search modal 
	searchNumber++;
	// fake user name to be in future in req.sessions object probably
	const username = 'Fake User Name';
	// instantiate the factory
	const user = new User(username);
	
	

	for (let i = 0; i < searchNumber; i++) {
		user.generateMovieForArrays();
		console.log(user);
				// 		res.render('movies/results.ejs', {
				// 	test: factory.results

				// })
	}
		
})





module.exports = router;