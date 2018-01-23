const express = require('express');
const request = require('request');
const router = express.Router();
const apiKey = "c6ba51285da546e27050e39e5bf072be";

const titleArray = [];
const actorHistory = [];
const displayArray = [];

let minRating = 0;
let personId = '';
let firstSearch = true;



// let discoverOptionsObject = { method: 'GET',
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


// let searchMoviesOptionsObject = { method: 'GET',
// 		url: 'https://api.themoviedb.org/3/search/movie',
// 		qs: 
// 		  {  include_adult: 'false',
// 		     page: '',
// 		     query: '',
// 		     language: 'en-US',
// 		     api_key: apiKey },
// 		 	 body: '{}'
// 	};

// let searchPeopleOptionsObject = { method: 'GET',
// 		 url: 'https://api.themoviedb.org/3/search/person',
// 		 qs: 
// 		   { include_adult: 'false',
// 		     page: '',
// 		     query: '',
// 		     language: 'en-US',
// 		     api_key: 'c6ba51285da546e27050e39e5bf072be' },
// 		 	 body: '{}' 
// 	};
let discoverOptionsObject = {};
let searchMoviesOptionsObject = {};
let searchPeopleOptionsObject = {};




const discoverOptions = (genre, releaseYear, personId) => {
	const discoverOptionsInnerObject = { method: 'GET',
	    url: 'https://api.themoviedb.org/3/discover/movie',
	    qs: 
		   { primary_release_year: '',
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

	 discoverOptionsInnerObject.qs.with_genres = genre;
	 discoverOptionsInnerObject.qs.primary_release_year = releaseYear;
	 discoverOptionsInnerObject.qs.with_cast = personId;
	 return discoverOptionsInnerObject;
}
const searchMoviesOptions = (title) => {
  	const searchMoviesOptionsInnerObject = { method: 'GET',
		url: 'https://api.themoviedb.org/3/search/movie',
		qs: 
		  {  include_adult: 'false',
		     page: '',
		     query: '',
		     language: 'en-US',
		     api_key: apiKey },
		 	 body: '{}'
	};
	searchMoviesOptionsInnerObject.qs.query = title;
	return searchMoviesOptionsInnerObject;
}

const searchPeopleOptions = (actor) => {

	const searchPeopleOptionsInnerObject = { method: 'GET',
		 url: 'https://api.themoviedb.org/3/search/person',
		 qs: 
		   { include_adult: 'false',
		     page: '',
		     query: '',
		     language: 'en-US',
		     api_key: 'c6ba51285da546e27050e39e5bf072be' },
		 	 body: '{}' 
	};
		searchPeopleOptionsInnerObject.qs.query = actor;
		//return searchPeopleOptionsInnerObject;
		console.log('HERE LIES the search people options object', searchPeopleOptionsInnerObject)
		return searchPeopleOptionsInnerObject;


}


function returnPersonId(searchPeopleOptions){
	console.log('this is search people in return personId options', searchPeopleOptions)
			
					request(searchPeopleOptions, function (error, response, body) {
	  			if (error) throw new Error(error);
	  				const bodyJSON = JSON.parse(body)
	  				console.log('here is the searchPeople Options JSON body', bodyJSON)

					personId = bodyJSON.results[0].id
					console.log('person id is ' , personId)

					return personId
	  		
			});
			
}





router.get('/results', (req,res) =>{

	// the following is what shows up first on the results page:
	if(firstSearch === true){

		let discoverOptionsObject = { method: 'GET',
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


	    request(discoverOptionsObject, (error, response, body) => {
		    if (error) throw new Error(error);
				const bodyJSON = JSON.parse(body)
					console.log('if there is  NO title AND NO ACTOR enterered the body is: ')
				// console.log(bodyJSON)
	  			res.render('movies/results.ejs', {
					body: bodyJSON,
					minRating: minRating
	  		    });
	    });
	    // If User included a person and a movie title do something
	// } else if((searchMoviesOptionsObject.qs.query != '') && (personId != 0)){


	



	// // If user included a person then add the person id to the discover api call and run it
	// } 
}else if(personId != 0){
		discoverOptionsObject = discoverOptions("","", personId)

   		request(discoverOptionsObject, (error, response, body) => {
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
	 } 
	 else if(searchMoviesOptionsObject.qs.query!=''){
		request(searchMoviesOptionsObject, function (error, response, body) {
    	if (error) throw new Error(error);
    		const bodyJSON = JSON.parse(body)
		   	console.log('if there is a title enterered but NO PERSON the searchMoviesOptionsObject is: ',searchMoviesOptionsObject )
        	res.render('movies/results.ejs', {
				body: bodyJSON,
				minRating: minRating
	   		});
	    });

	// If the person didn't people or title, run a discover api call with the criteria they did give
	} 
	else { 

	    request(discoverOptionsObject, (error, response, body) => {
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

})



router.post('/results', (req, res) => {

	// if(req.body.actor === ""){
	// 	personId = 0;
	// } else {
	// 	personId = '?'
	// }

	minRating = req.body.minRating;

	discoverOptionsObject = discoverOptions(req.body.genre, req.body.releaseYear);

	searchMoviesOptionsObject = searchMoviesOptions(req.body.title);

	console.log("console log the actor", req.body.actor)

	searchPeopleOptionsObject = searchPeopleOptions(req.body.actor);

	console.log("this is what searchmoviesoptionsobject says in the post route", searchMoviesOptionsObject);

	

	

//	console.log("the req.body.genre is: ",req.body.genre)

//	console.log("the req.body ENTIRE OBJECT: ",req.body)
	if(req.body.actor != ""){
		returnPersonId(searchPeopleOptionsObject);
		console.log("this is what searchmoviesoptionsobject says in the getroute", searchMoviesOptionsObject);
	}

	firstSearch = false;

	
	//personId = returnPersonId(searchPeopleOptionsObject);


	setTimeout(()=>{

		console.log("BEFORE REDIRECT the searchPeopleOptionsObject", searchPeopleOptionsObject)
		res.redirect("/movies/results")



	}, 1000)
})

module.exports = router;