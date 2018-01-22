// importing sample data
const movieData = require('./models/sampleData.js')
// class that goes in every movie object
class Movie {
	constructor(movieId, title, genre, img, overview, trailer, releaseDate, rating){
	
	this.movieId = movieId;
	this.title = title;
	this.genre = genre;
	this.img = img;
	this.overview = overview;
	this.trailer = trailer;
	this.releaseDate = releaseDate;
	this.rating = rating;
	//console.log('the Movie constructor code is working')
	}
}

class Preferences {
	constructor(favGenres, favActors) {
		this.favGenres = favGenres;
		this.favActors = favActors;
	}
}

class UserMaker  {
	constructor(username, password, preferences, moviesToSee, searchHistory, seenMovies){
		this.username = username;
		this.password = password;
		this.preferences = {};
		this.moviesToSee = [];
		this.searchHistory = [];
		this.seenMovies = [];
	//	console.log('the user constructor code is working')
	}
	generatePreferences(){
		

		this.preferences.favGenres = null;
		this.preferences.favActors = null;

	}

	generateMovieForArrays() {
		//console.log('generate code for arrays function works')
		const j = this.moviesToSee.length;

		const posterSize = 'w500';

		// parameters for new movie

		const movieId = movieData.results[j].id;
console.log(movieData.results[j].id);
		const title = movieData.results[j].title;

		const genre = 'poo';

		const img	= 'https://image.tmdb.org/t/p/' + posterSize + movieData.results[j].poster_path

		const overview = movieData.results[j].overview;

		const trailer =	"trailer";

		const releaseDate = movieData.results[j].release_date;

		const rating = movieData.results[j].vote_average;

		
		// assigns values in all the keys to go in the movie objects to items in the data
		// in the future, the ajax call will have to pass the data to these variables somehow

		// console.log(movieId, title, genre, img, overview, trailer, releaseDate, rating)

		
		const newMovie = new Movie(movieId, title, genre, img, overview, trailer, releaseDate, rating);


	//	console.log('this is new movie object', newMovie)

		
		// pushes new movies to array
		this.moviesToSee.push(newMovie);
		this.seenMovies.push(newMovie);

		return newMovie;
		
	}



}
module.exports = UserMaker;