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


	// this mongoose method 
	User.findOne({ username: req.session.username }, (err, foundUser) => {
		if (foundUser) {
		

			const favActorArray = foundUser.favActors
			const favGenresArray = foundUser.favGenres
				request(discoverOptions, (error, response, body) => {
				if (error) throw new Error(error);
				const discoverBodyJSON = JSON.parse(body)
						
			// 		// logic for picking random genre
					genreIndex= Math.floor(Math.random()*favGenresArray.length)
					discoverOptions.qs.with_genres = favGenresArray[genreIndex]
			// 		//this API request gets the genres
					request(discoverOptions, (error, response, bodyGenre) => {
						if (error) throw new Error(error);
						const genreBodyJSON = JSON.parse(bodyGenre)

			// 			// set the people id search object in these two lines of code
						const peopleOptionsWithActor = peopleOptions;
						const actorIndex = Math.floor(Math.random()*favActorArray.length) 
						peopleOptionsWithActor.qs.query = favActorArray[actorIndex]
						 

						request(peopleOptionsWithActor, (error, response, bodyPeopleId) => {
							if (error) throw new Error(error);
							const discoverIdJSON = JSON.parse(bodyPeopleId)
			// // 				// set the new discover options object with a person id that is returned in the api call above
							const discoverOptionsWithCast = discoverOptions;
							discoverOptionsWithCast.qs.with_cast = discoverIdJSON.results[0].id
							request(discoverOptionsWithCast, (error, response, bodyActor) => {
								if (error) throw new Error(error);
								const actorBodyJSON = JSON.parse(bodyActor)
									console.log("Top Popular Movie -------------------", discoverBodyJSON.results[0])
									console.log("Top genre Movie -------------------", genreBodyJSON.results[0])
									console.log("Top actor Movie -------------------", actorBodyJSON.results[0])
									res.render("movies/browse.ejs", {
										mostPop: discoverBodyJSON.results,
										genre: genreBodyJSON.results,
										actor: actorBodyJSON.results
									})
							})
						})
					})
			})

		} else {
			console.log(err)
		}
					
			

	})



		



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
			foundUser.moviesToSee.splice(index, 1);

			foundUser.save((err, data) => {
				if(err) console.log(err);
				res.redirect("/users/watchlist")
			})	
		}
	})
})


module.exports = router;