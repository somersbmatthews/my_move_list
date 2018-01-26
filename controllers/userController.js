const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt")


const getData = () => {
	let defered = Promise.defer();

	request(movieOptions, (error, response, body) => {
		if (error) throw new Error(error);
		const movieBodyJSON = JSON.parse(body)

		defered.resolve(data)
		return defered.promise
			})
}

router.route("/login")
	.get((req, res) => {
		res.render("users/login.ejs", {
			message: req.session.message
		})
	})
	.post((req, res) => {
		User.findOne({ username: req.body.username }, (err, foundUser) => {
			if(foundUser) {
				if (bcrypt.compareSync(req.body.password, foundUser.password)) {
					req.session.username = foundUser.username;
					req.session.logged = true;
					req.session.message = "";
					res.redirect("/movies/browse")
				} else {
					req.session.message = "Incorrect password or username";
					res.redirect("/users/login");
				}
			} else {
				req.session.message = "Incorrect password or username";
				res.redirect("/users/login");
			}
		})
	})


router.route("/register")
	.get((req, res) => {
		res.render("users/register.ejs", {
			message: ""
		})
	})

	.post((req, res) => {
		User.findOne({ username: req.body.username }, (err, foundUser) => {
			if (foundUser) {
				const message = "That username is already taken"
				res.render("users/register.ejs", {
					message: message
				})
			} else {
				req.session.username = req.body.username;
				req.session.logged = true;
				req.session.message = "";
				const password = req.body.password;
				const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
				const userDBEntry = {
					username: req.body.username,
					password: passwordHash
				}	
				User.create(userDBEntry, (err, createdUser) => {
					if (err) {
						console.log(err);
						res.send(err);
					} else {
						console.log(createdUser);
						res.redirect("/users/preferences")
					}
				})
			}
		})
	})

router.route("/watchlist")
	.get((req, res) => {
		User.findOne({ username: req.session.username}, (err, foundUser) => {
			if (err) {
				console.log(err)
			} else {
				// res.send(foundUser.moviesToSee);
				res.render("users/watch-list.ejs", {
					results: foundUser.moviesToSee
				})
			}
		})
	})


router.route("/logout")
	.get((req, res) => {
		res.redirect("/users/login")
	})

router.route("/preferences/:index")
	.delete((req, res) => {
		User.findOne({ username: req.session.username }, (err, foundUser) => {
			if (err) {
				console.log(err)
			} else {
				foundUser.favActors.splice(req.params.index, 1);
				// res.send(foundUser.favActors)
				foundUser.save((err, data) => {
					if (err) {
						console.log(err)
					} else {
						res.redirect("/users/preferences")
					}
				})
			}
		})
	})

router.route("/preferences")
	.get((req, res) => {
	           
		const genreObject = [
			{
				text: "Action",
				id: "28"
			},
			{
				text: "Adventure",
				id: "12"
			},
						{
				text: "Animation",
				id: "16"
			},
						{
				text: "Comedy",
				id: "25"
			},
						{
				text: "Crime",
				id: "80"
			},
						{
				text: "Documentary",
				id: "99"
			},
						{
				text: "Drama",
				id: "18"
			},
						{
				text: "Family",
				id: "10751"
			},
			{
				text: "Fantasy",
				id: "14"
			},
		    {
				text: "History",
				id: "36"
			},
			{
				text: "Horror",
				id: "27"
			},
			{
				text: "Music",
				id: "10402"
			},
			{
				text:"Mystery",
				id: "9648"
			},
			{
				text: "Romance",
				id: "10749"
			},
			{
				text: "Science Fiction",
				id: "878"
			},
			{
				text: "TV Movie",
				id: "10770"
			},
			{
				text: "Thriller",
				id: "53"
			},
			{
				text: "War",
				id: "10752"
			},
			{
				text: "Western",
				id: "37"
			}
		]

	if(req.session.username){
		User.findOne({ username: req.session.username }, (err, foundUser) => {
			if (foundUser) {


				 console.log("this is found user fav genres object", foundUser.favGenres)


				res.render("users/preferences.ejs", {
					genre: foundUser.favGenres,
					actor: foundUser.favActors,
					arrayOfObjects: genreObject

				})

			} else {
				console.log(err)
			}
		})
	} else {
		res.redirect('/users/login')
	}

})

	.post((req, res) => {

		User.findOneAndUpdate({ username: req.session.username },
			{$set: { favGenres: req.body.favGenres }}, (err, updatedUser) => {
				if (err) {
					console.log(err);
				} else {
					if (req.body.favActor) {
						updatedUser.favActors.push(req.body.favActor)
						updatedUser.save((err, data) => {
						if (err) {
							console.log(err)
						} else {
							res.redirect("/users/preferences")
						}
						})	
					} else {
						res.redirect("/users/preferences")
					}

				}
			})
	})



module.exports = router;
