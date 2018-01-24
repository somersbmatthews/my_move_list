const express = require('express');
const request = require('request');
const router = express.Router();
const apiKey = "c6ba51285da546e27050e39e5bf072be";
let firstSearch = true;
let minRating = 0;


router.get('/results', (req,res) => {
	
	res.render("movies/results.ejs", {
		body: req.session.body,
		minRating: minRating
	})
})




/********************
*********************/


	
// 	if(firstSearch === true){

// 		let discoverOptionsObject = { method: 'GET',
// 	    url: 'https://api.themoviedb.org/3/discover/movie',
// 	    qs: 
// 		   { primary_release_year: '2017',
// 		   	 with_genres: "",
// 		   	 page: '',
// 		     include_video: 'false',
// 		     include_adult: 'false',
// 		     sort_by: 'popularity.desc',
// 		     language: 'en-US',
// 		     api_key: apiKey },
// 		     body: '{}', 
// 		     with_cast: ''
// 	 };


// 	    request(discoverOptionsObject, (error, response, body) => {
// 		    if (error) throw new Error(error);
// 				const bodyJSON = JSON.parse(body)
// 	  			res.render('movies/results.ejs', {
// 					body: bodyJSON,
// 					minRating: minRating
// 	  		    });
// 	    });
// }else if(personId != 0){
// 		discoverOptionsObject = discoverOptions("","", personId)

//    		request(discoverOptionsObject, (error, response, body) => {
//     	if (error) throw new Error(error);
// 			const bodyJSON = JSON.parse(body)
			
			
		
// 			// console.log(bodyJSON)
//   			res.render('movies/results.ejs', {
// 				body: bodyJSON,
// 				minRating: minRating
//   		    });
// 	    });
// 	 } 
// 	 else if(searchMoviesOptionsObject.qs.query!=''){
// 		request(searchMoviesOptionsObject, function (error, response, body) {
//     	if (error) throw new Error(error);
//     		const bodyJSON = JSON.parse(body)
//         	res.render('movies/results.ejs', {
// 				body: bodyJSON,
// 				minRating: minRating
// 	   		});
// 	    });
// 	} 
// 	else { 
// 	    request(discoverOptionsObject, (error, response, body) => {
// 		    if (error) throw new Error(error);
// 				const bodyJSON = JSON.parse(body)
// 				// console.log(bodyJSON)
// 	  			res.render('movies/results.ejs', {
// 					body: bodyJSON,
// 					minRating: minRating
// 	  		    });
// 	    });
// 	}
// })




/*****************
******************/


const discoverOptions = { method: 'GET',
	    url: 'https://api.themoviedb.org/3/discover/movie',
	    qs: 
		   { primary_release_year: "",
		   	 with_genres: "",
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




router.post("/results", (req, res) => {
	
	const setDiscoverObject = () => {
		discoverOptions.qs.primary_release_year = req.body.releaseYear;
		discoverOptions.qs.with_genres = req.body.genre;
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
		console.log(req.body)
		movieOptions.qs.query = req.body.title	;
		

		// res.send(movieOptions)

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


	// Calling Methods

	
	if (req.body.title) {
		setMovieObject();
	} else {
		setDiscoverObject();
	}	
	






})



































module.exports = router;