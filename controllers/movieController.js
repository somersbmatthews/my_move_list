const express = require('express');
const request = require('request');

const router = express.Router();

// importing movieFactory class
const User = require('../API.js')

const apiKey = "c6ba51285da546e27050e39e5bf072be";

let searchNumber = 0;



router.get('/results', (req,res) =>{
	



	const options = { method: 'GET',
	  url: 'https://api.themoviedb.org/3/discover/movie',
	  qs: 
	   { primary_release_year: '2017',
	   	 with_genres: '18',
	   	 page: '1',
	     include_video: 'false',
	     include_adult: 'false',
	     sort_by: 'popularity.desc',
	     language: 'en-US',
	     api_key: 'c6ba51285da546e27050e39e5bf072be' },
	     body: '{}' 
	 };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
		const bodyJSON = JSON.parse(body)
		console.log(bodyJSON)
	  	res.render('movies/results.ejs', {
			body: bodyJSON
	    });
	    // console.log(body);
	    // console.log(body.results)

	 // res.send(body);

//	  console.log(body);
	});


	
})





module.exports = router;