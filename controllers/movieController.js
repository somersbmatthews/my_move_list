const express = require('express');
const router = express.Router();

// importing movieFactory classes
const MovieFactory = require('../API.js')


let searchNumber = 0;

router.get('/results', (req,res) =>{
	console.log('the movies results route works')
	// to be changed later from searchNumber to maxResults to go with search modal 
	searchNumber++;
	// fake user name to be in future in req.sessions object probably
	const username = 'Fake User Name';
	// instantiate the factory
	const factory = new MovieFactory(username, searchNumber);
	req.body.maxResults = 4;

		
	// for loop to make movies up to the number desired from the modal search form variable maxResults
	for(let i = 0; i<req.body.maxResults; i++){
		factory.generateMovie()
		if(i===req.body.maxResults-1){
			console.log(factory.results);
			
			 	// render the array of movie objects in the search result
				res.render('movies/results.ejs', {
					test: factory.results

				})
		}
	}	
})





module.exports = router;