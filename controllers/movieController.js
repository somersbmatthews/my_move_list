const express = require('express');
const request = require('request');
const router = express.Router();
const apiKey = "c6ba51285da546e27050e39e5bf072be";

const titleArray = [];
const actorHistory = [];
const displayArray = [];


let minRating = 0;
let personId = '';


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
	     body: '{}', 
	     with_cast: ''
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
const searchPeopleOptions = { method: 'GET',
  url: 'https://api.themoviedb.org/3/search/person',
  qs: 
   { include_adult: 'false',
     page: '1',
     query: '',
     language: 'en-US',
     api_key: 'c6ba51285da546e27050e39e5bf072be' },
  body: '{}' 
};



router.get('/results', (req,res) =>{
	
	// If user added a person find that person's id
	if(searchPeopleOptions.qs.query != ''){
		request(searchPeopleOptions, function (error, response, body) {
  			if (error) throw new Error(error);
  				const bodyJSON = JSON.parse(body)
				personId = bodyJSON.results[0].id
				console.log("first assignment", personId)
  		
		});
	} else {
		// Do nothing
	}
setTimeout(()=>{ 
	// If User included a person and a movie title do something
	if((searchMoviesOptions.qs.query != '') && (searchPeopleOptions.qs.query != '')){


	// If user included a person then add the person id to the discover api call and run it
	} else if(searchPeopleOptions.qs.query != ''){
   		console.log("Person ID is: ",personId);
		console.log("discoverOptions.qs is ",discoverOptions.qs.with_cast);

   		discoverOptions.qs.with_cast = personId;

   		console.log("discoverOptions.qs", discoverOptions.qs)

   		request(discoverOptions, (error, response, body) => {
    	if (error) throw new Error(error);
			const bodyJSON = JSON.parse(body)
			console.log('if there is a person enterered but NO TITLE the body is: ')
			
		
			// console.log(bodyJSON)
  			res.render('movies/results.ejs', {
				body: bodyJSON,
				minRating: minRating
  		    });
	    });

   	// If user included a movie title then add then run the movie search with given title
	} else if(searchMoviesOptions.qs.query!=''){
		request(searchMoviesOptions, function (error, response, body) {
    	if (error) throw new Error(error);
    		const bodyJSON = JSON.parse(body)
		   	console.log('if there is a title enterered but NO PERSONthe body is: ')
        	res.render('movies/results.ejs', {
				body: bodyJSON,
				minRating: minRating
	   		});
	    });

	// If the person didn't people or title, run a discover api call with the criteria they did give
	} else { 

	    request(discoverOptions, (error, response, body) => {
		    if (error) throw new Error(error);
				const bodyJSON = JSON.parse(body)
					console.log('if there is  NO title AND NO ACTOR enterered the body is: ')
				// console.log(bodyJSON)
	  			res.render('movies/results.ejs', {
					body: bodyJSON,
					minRating: minRating
	  		    });
	    });
	}
}, 4000)
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

	searchPeopleOptions.qs.query = req.body.actor;
	
	res.redirect("/movies/results")
})


//route to single movie info
router.get('/:id', (req,res) =>{
    // let options = { method: 'GET',
    //     url: 'https://api.themoviedb.org/3/movie/346364',
    //     qs:
    //         { language: 'en-US',
    //             api_key: apiKey },
    //     body: '{}' };
    //
    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    // }

	res.render('movies/show.ejs')
});




module.exports = router;