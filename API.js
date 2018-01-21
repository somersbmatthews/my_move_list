const movieData = require('./models/sampleData.js')

class Movie {
  constructor(username, searchNumber, title, releaseDate, Rating) {
  this.username = username;
  this.searchNumber = searchNumber;
  this.title = title;
 
  this.releaseDate = releaseDate;
  this.rating = Rating;
  }
}	

 class MovieFactory {
	constructor(username, searchNumber){
	
		this.username = username;
		this.searchNumber = searchNumber;
		this.results = [];
	
	}
	generateMovie() {
	
		
		const title = movieData.results[this.results.length].title;

		const releaseDate = movieData.results[this.results.length].release_date;

		const rating = movieData.results[this.results.length].vote_average;



		const newMovie = new Movie(this.username, this.searchNumber, title, releaseDate, rating);




		this.results.push(newMovie);

	}

}

module.exports = MovieFactory;