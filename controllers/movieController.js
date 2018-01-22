const express = require('express');
const request = require('request');
const router = express.Router();
const apiKey = "c6ba51285da546e27050e39e5bf072be";

let minRating = 0;


const discoverOptions = { method: 'GET',
	  url: 'https://api.themoviedb.org/3/discover/movie',
	  qs: 

	   { primary_release_year: '2017',
	   	 with_genres: "",
	   	 page: '',
	     include_video: 'false',
	     include_adult: 'false',
	     sort_by: 'popularity.desc',
	     language: 'en-US',
	     api_key: apiKey },
	     body: '{}' 
	 };
const searchMoviesOptions = { method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  qs: 
   { include_adult: 'false',
     page: '1',
     query: '',
     language: 'en-US',
     api_key: apiKey },
  body: '{}'
};



router.get('/results', (req,res) =>{


	// res.send('check the console');
	if(searchMoviesOptions.qs.query!=''){
		request(searchMoviesOptions, function (error, response, body) {
	    	if (error) throw new Error(error);
	    	const bodyJSON = JSON.parse(body)
	   	console.log('if there is a title enterered the body is: ', bodyJSON)
	        	res.render('movies/results.ejs', {
					body: bodyJSON,
					minRating: minRating
		   		 });
	    });



	} else {


	    request(discoverOptions, (error, response, body) => {
		    if (error) throw new Error(error);
				const bodyJSON = JSON.parse(body)
			//	console.log('if there is a title NOT enterered the body is: ', bodyJSON)
				// console.log(bodyJSON)
		  			res.render('movies/results.ejs', {
						body: bodyJSON,
						minRating: minRating
		  		    });
	    });
	}
})

router.post('/results', (req, res) => {

	
	searchMoviesOptions.qs.query = req.body.title
	console.log("the title requested is ", req.body.title)
	console.log("posted")
	searchMoviesOptions.qs.with_genres = req.body.genre;
	searchMoviesOptions.qs.primary_release_year = req.body.releaseYear;
	minRating = req.body.minRating;
	// set all discover options for api discover method based on what search modal passes
	discoverOptions.qs.with_genres = req.body.genre;
	discoverOptions.qs.primary_release_year = req.body.releaseYear;
	
	res.redirect("/movies/results")
})




module.exports = router;