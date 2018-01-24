const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt")

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
		res.render("users/watch-list.ejs")
	})


router.route("/logout")
	.get((req, res) => {
		res.redirect("/users/login")
	})

router.route("/preferences")
	.get((req, res) => {

	            	// <input type="checkbox" value="28" checked>Action</input>
	            	// <input type="checkbox" value="12">Adventure</input>
	            	// <input type="checkbox" value="16">Animation</input>
	            	// <input type="checkbox" value="35">Comedy</input>
	            	// <input type="checkbox" value="80">Crime</input>
	            	// <input type="checkbox" value="99">Documentary</input>
	            	// <input type="checkbox" value="18">Drama</input>
	            	// <input type="checkbox" value="10751">Family</input>
	            	// <input type="checkbox" value="14">Fantasy</input>
	            	// <input type="checkbox" value="36">History</input>
	            	// <input type="checkbox" value="27">Horror</input>
	            	// <input type="checkbox" value="10402">Music</input>
	            	// <input type="checkbox" value="9648">Mystery</input>
	            	// <input type="checkbox" value="10749">Romance</input>
	            	// <input type="checkbox" value="878">Science Fiction</input>
	            	// <input type="checkbox" value="10770">TV Movie</input>
	            	// <input type="checkbox" value="53">Thriller</input>
	            	// <input type="checkbox" value="10752">War</input>
	            	// <input type="checkbox" value="37">Western</input>
	           
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
		User.findOne({ username: req.session.username }, (err, foundUser) => {
			if (foundUser) {

				console.log(foundUser.favGenres)
				console.log(foundUser.favActors)

			res.render("users/preferences.ejs", {
			genre: foundUser.favGenres,
			actor: foundUser.favActors

			})

			} else {
				console.log(err)
			}
		})


		console.log(req.session)
	})
	.post((req, res) => {
		User.findOne({ username: req.session.username }, (err, foundUser) => {
			if (foundUser) {

				foundUser.favGenres.push(req.body.favActor)
				foundUser.favActors.push(req.body.favGenre)


				console.log(foundUser.favGenres)
				console.log(foundUser.favActors)

				foundUser.save((err, data) => {
				res.redirect("/users/preferences")
				})
			} else {
				console.log(err)
			}
		})
	})
	// .put((req, res)=> { 
	// 	// User.findOneAndUpdate({ username: req.session.username }, (err, foundUser) => {
	// 	// 	if (foundUser) {
	// 	// 		{
	// 	// 			favGenres: [],
	// 	// 			favActors: []

	// 	// 		}


	// 	// 	res.render("users/preferences.ejs", 
	// 	// 	genre: foundUser.favGenres,
	// 	// 	actor: foundUser.favActors
	// 	// 	)
	// 	// 			console.log("user genres after emptying", foundUser.favGenres)
	// 	// 			console.log("user actors after emptying", foundUser.favActors)

	// 	// 	} else {
	// 	// 		console.log(err)
	// 	// 	}
	// 	})
	// 			User.findOne({ username: req.session.username }, (err, foundUser) => {
	// 				if (foundUser) {
	// 				foundUser.favGenres = favGenreArray
	// 				foundUser.favActors = []

	// 				foundUser.favGenres.push(req.body.favActor)
	// 				foundUser.favActors.push(req.body.favGenre)


	// 				console.log("user genres after updating", foundUser.favGenres)
	// 				console.log("user actors after updating", foundUser.favActors)

	// 				foundUser.save((err, data) => {
	// 					res.redirect("/users/preferences")
	// 			    })
	// 					} else {
	// 						console.log(err)
	// 					}
	// 			})

	// })


module.exports = router;
