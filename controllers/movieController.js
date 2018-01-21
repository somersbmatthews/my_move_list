const express = require('express');
const router = express.Router();
const MovieFactory = require('../API.js')


let searchNumber = 0;

router.get('/results', (req,res) =>{
	console.log('the movies results route works')
	// to be changed later from searchNumber to maxResults to go with search modal 
	searchNumber++;

	const username = 'Fake User Name';

	const factory = new MovieFactory(username, searchNumber);
	req.body.maxResults = 4;

		

	for(let i = 0; i<req.body.maxResults; i++){
		factory.generateMovie()
		if(i===req.body.maxResults-1){
			console.log(factory.results);
			
			 
				res.render('movies/results.ejs', {
					test: factory.results

				})
		}
	}	
})

router.post('/results', (req,res) =>{
		console.log('the movies results POST route works')
		 
		

})




module.exports = router;