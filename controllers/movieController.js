const express = require('express');
const request = require('request');
const router = express.Router();
const User = require("../models/userModel.js");
const apiKey = "c6ba51285da546e27050e39e5bf072be";

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
		body: req.session.body
	})


});

router.get('/browse', (req,res)=>{



	// User.findOne({ username: req.session.username }, (err, foundUser) => {
	// 	if (foundUser) {
	// 			//this code gets the two array preferences from the foundUser



	// 				foundUser.favGenres.push(req.body.favActor)
	// 				foundUser.favActors.push(req.body.favGenre)


	// 				console.log(foundUser.favGenres)
	// 				console.log(foundUser.favActors)

	// 				foundUser.save((err, data) => {
	// 					res.redirect("/users/preferences")
	// 				})
	// 			} else {
	// 				console.log(err)
	// 			}
	// 	})


		//mostPop
		//genre
		//actor

		// for(let i = 0; i<req.userGenreArray; i++){
		// 	req.session.userGenreArray[i]
		// }
		// for(let j = 0; j<req.userPersonArray; j++){
		// 	req.session.userPersonArray[i]
		// }

		
		request(discoverOptions, (error, response, body) => {
    	if (error) throw new Error(error);
			const discoverBodyJSON = JSON.parse(body)
		//	console.log(discoverBodyJSON)
		//compareAndFilter(movieBody, discoverBodyJSON)
		req.session.body = discoverBodyJSON;
  		});

setTimeout(()=>{
		res.render("movies/browse.ejs", {
			mostPop: req.session.body.results,
			genre: req.session.body.results,
			actor: req.session.body.results
		})

    
}, 2000)
});


router.post("/results", (req, res) => {
	
	const setDiscoverObject = (movieBody) => {
		discoverOptions.qs.with_cast = req.body.actor
		discoverOptions.qs.primary_release_year = req.body.releaseYear;
		discoverOptions.qs.with_genres = req.body.genre;
		discoverOptions.qs["vote_average.gte"] = req.body.minRating
		callDiscover(movieBody);
	}

	const callDiscover = (movieBody) => {
		request(discoverOptions, (error, response, body) => {
    	if (error) throw new Error(error);
			const discoverBodyJSON = JSON.parse(body)
			compareAndFilter(movieBody, discoverBodyJSON)
  	});
	}

	const setMovieObject = () => {
		movieOptions.qs.query = req.body.title;
		callMovie();
	}

	const callMovie = () => {
		if (req.body.title) {
			request(movieOptions, (error, response, body) => {
				if (error) throw new Error(error);
				const movieBodyJSON = JSON.parse(body)

				setPeopleObject(movieBodyJSON)
			})
		} else {
			const movieBodyJSON = false
			setPeopleObject(movieBodyJSON)
		} 		
	}

	const setPeopleObject = (movieBody) => {
		peopleOptions.qs.query = req.body.actor
		getPersonId(movieBody);
	}

	const getPersonId = (movieBody) => {
		if (req.body.actor) {
			request(peopleOptions, (err, res, body) => {
				if (err) throw new Error(err);
				const bodyJSON = JSON.parse(body);
				const personId = bodyJSON.results["0"].id;
				req.body.actor = personId;
				setDiscoverObject(movieBody);	
			})
		}	else {
			setDiscoverObject(movieBody);
		}
	}

	
	const compareAndFilter = (movieBody, discoverBody) => {
		
		let otherSearch = ""
 		if (discoverOptions.qs.primary_release_year || 
 				discoverOptions.qs.with_genres || 
 				discoverOptions.qs["vote_average.gte"]||
 				discoverOptions.qs.with_cast) {
					otherSearch = true
				} else {
					otherSearch = false
				}

		const resultsObj = {
			results: [],
		}
		if (movieBody && otherSearch) {
			for(let m = 0; m < movieBody.results.length; m++){
				for(let d = 0; d < discoverBody.results.length; d++){
					if (movieBody.results[m].id === discoverBody.results[d].id) {
						resultsObj.results.push(movieBody.results[m])
					} else {
						// Do Nothing
					}
				}
			}
			req.session.body = resultsObj;
			res.redirect("/movies/results")
		} else if (!movieBody) {
			req.session.body = discoverBody
			res.redirect("/movies/results")
		} else if (movieBody && !otherSearch) {
			req.session.body = movieBody
			res.redirect("/movies/results")
		}
	};

setMovieObject();
});



//route to single movie info
router.get('/:id', (req,res) =>{
    let options = { method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + req.params.id,
        qs:
            { language: 'en-US',
                api_key: apiKey },
        body: '{}' };

    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error)
				}else{
        	// Passing the info from what the user clicked on to their session so we can continue to track it
          req.session.body = JSON.parse(body)
          res.render('movies/show.ejs',{
      			body: req.session.body
				})
			}
    })
});


//create post route for the fav movie append to watch list
router.post('/:id', (req,res) =>{
	// Push movie information to user moviesToWatch when button is pushed
	User.findOne({ username: req.session.username }, (err, foundUser) => {
		foundUser.moviesToSee.push(req.session.body)
		foundUser.save((err, data) => {
			
			res.redirect("/movies/"+req.params.id)
		})
	})
})

router.delete("/:id", (req, res) => {
	const index = req.params.id
	User.findOne({ username: req.session.username}, (err, foundUser) => {
		if (err) {
			console.log(err)
		} else {
			const OgWatchList = foundUser.moviesToSee
			foundUser.moviesToSee.splice(index, 1);

			foundUser.save((err, data) => {
				if(err) console.log(err);
				res.redirect("/users/watchlist")
			})	
		}
	})
})


module.exports = router;