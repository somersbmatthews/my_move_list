const express = require('express');
const request = require('request');
const router = express.Router();
const apiKey = "c6ba51285da546e27050e39e5bf072be";

const options = { method: 'GET',
	  url: 'https://api.themoviedb.org/3/discover/movie',
	  qs: 
	   { primary_release_year: '2017',
	   	 with_genres: 18,
	   	 with_cast: 
	   	 "vote_average.gte": 7,
	   	 page: '1',
	     include_video: 'false',
	     include_adult: 'false',
	     sort_by: 'popularity.desc',
	     language: 'en-US',
	     api_key: 'c6ba51285da546e27050e39e5bf072be' },
	     body: '{}' 
	 };


router.get('/results', (req,res) =>{
	console.log(options);
	// res.send('check the console');
	request(options, (error, response, body) => {
	  if (error) throw new Error(error);
			const bodyJSON = JSON.parse(body)
			// console.log(bodyJSON)
	  	res.render('movies/results.ejs', {
				body: bodyJSON
	    });
	});
})

router.post('/results', (req, res) => {
	// console.log(req.body.genre)
	options.qs.with_genres = req.body.genre;
	options.qs.primary_release_year = req.body.releaseYear;
	options.qs["vote_average.gte"] = req.body.minRating;
	res.redirect("/movies/results")
})




module.exports = router;