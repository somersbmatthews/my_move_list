const express = require('express');
const request = require('request');
const router = express.Router();
const apiKey = "c6ba51285da546e27050e39e5bf072be";
let firstSearch = true;



const discoverOptions = { method: 'GET',
	    url: 'https://api.themoviedb.org/3/discover/movie',
	    qs: 
		   { primary_release_year: "",
		   	 with_genres: "",
		   	 'vote_average.gte': '',
		   	 with_cast: "",
		   	 page: '',
		     include_video: 'false',
		     include_adult: 'false',
		     sort_by: 'popularity.desc',
		     language: 'en-US',
		     api_key: apiKey },
	    body: '{}',      
	 	};

const movieOptions = { method: 'GET',
		url: 'https://api.themoviedb.org/3/search/movie',
		qs: 
		  {  include_adult: 'false',
		     page: '',
		     query: '',
		     language: 'en-US',
		     api_key: apiKey },
		 	 body: '{}'
	};

	const peopleOptions = { method: 'GET',
		 url: 'https://api.themoviedb.org/3/search/person',
		 qs: 
		   { include_adult: 'false',
		     page: '',
		     query: '',
		     language: 'en-US',
		     api_key: 'c6ba51285da546e27050e39e5bf072be' },
		 	 body: '{}' 
	};




router.get('/results', (req,res) => {
	
	res.render("movies/results.ejs", {
		body: req.session.body,
	})
})






router.post("/results", (req, res) => {
	
	const setDiscoverObject = () => {
		discoverOptions.qs.with_cast = req.body.actor
		discoverOptions.qs.primary_release_year = req.body.releaseYear;
		discoverOptions.qs.with_genres = req.body.genre;
		discoverOptions.qs["vote_average.gte"] = req.body.minRating
		

		callDiscover();
	}

	const callDiscover = () => {
		request(discoverOptions, (error, response, body) => {
    	if (error) throw new Error(error);
			const bodyJSON = JSON.parse(body)
			req.session.body = bodyJSON
			res.redirect("/movies/results")
  	});
	}

	const setMovieObject = () => {
		movieOptions.qs.query = req.body.title;
		callMovie();
	}

	const callMovie = () => {
		request(movieOptions, (error, response, body) => {
			if (error) throw new Error(error);
			const bodyJSON = JSON.parse(body)
			req.session.body = bodyJSON;
			res.redirect("/movies/results")
		})
	}

	const setPeopleObject = () => {
		peopleOptions.qs.query = req.body.actor
		getPersonId();
	}

	const getPersonId = () => {
		request(peopleOptions, (err, res, body) => {
			if (err) throw new Error(err);
			const bodyJSON = JSON.parse(body);
			const personId = bodyJSON.results["0"].id;
			req.body.actor = personId;

			setDiscoverObject();
		})
	}

	const compareAndFilter = () => {

	}

	// Calling Methods

	if (req.body.title && req.body.actor) {

	}
	else if (req.body.title) {
		setMovieObject();
	} else if (req.body.actor) {
		setPeopleObject();
	} else {
		setDiscoverObject();
	}	
	






})



































module.exports = router;