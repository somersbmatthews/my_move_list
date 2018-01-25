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
	favGenres: [String],
	favActors: [String],
	moviesToSee: [{
		id: String, // Database Id
		title: String,
		poster_path: String, // SRC url
		vote_average: Number,
		watched: {
			type: Boolean,
			default: false
		},
		userRating: Number, //Leaving blank for now
		userReview: String // Leaving blank for now
	}],
	searchHistory: [String], //Will be the query sent to the API
	seenMovies: [{
		id: String, // Database Id
		title: String,
		poster_path: String, // SRC url
		vote_average: Number,
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