const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	favGenres: [Number],
	favActors: [String],
	moviesToSee: [{
		movieId: String, // Database Id
		title: String,
		genre: [String], // Movies can qualify as multiple genres
		img: String, // SRC url
		overview: String, // Plot summary
		trailer: String, //SRC url
		rating: Number,
		watched: {
			type: Boolean,
			default: false
		},
		userRating: Number,
		userReview: String
	}],
	searchHistory: [String], //Will be the query sent to the API
	seenMovies: [{
		movieId: String, // Database Id
		title: String,
		genre: [String], // Movies can qualify as multiple genres
		img: String, // SRC url
		overview: String, // Plot summary
		trailer: String, //SRC url
		rating: Number,
		watched: {
			type: Boolean,
			default: true
		},
		userRating: Number,
		userReview: String
	}]
})

const User = mongoose.model('User', userSchema);

module.exports = User; 