// importing sample data
const movieData = require('./models/sampleData.js')
// class that goes in every movie object
class Movie {
  constructor(username, searchNumber, title, releaseDate, Rating) {
  this.username = username;
  this.searchNumber = searchNumber;
  this.title = title;
 
  this.releaseDate = releaseDate;
  this.rating = Rating;
  }
}	
// factory class that makes the movies and puts them in an array of results
 class MovieFactory {
	constructor(username, searchNumber){
	
		this.username = username;
		this.searchNumber = searchNumber;
		this.results = [];
	
	}
	generateMovie() {
	
		// assigns values in all the keys to go in the movie objects to items in the data
		// in the future, the ajax call will have to pass the data to these variables somehow
		const title = movieData.results[this.results.length].title;

		const releaseDate = movieData.results[this.results.length].release_date;

		const rating = movieData.results[this.results.length].vote_average;



		const newMovie = new Movie(this.username, this.searchNumber, title, releaseDate, rating);



		// pushes new movies to array
		this.results.push(newMovie);

	}

}

module.exports = MovieFactory;