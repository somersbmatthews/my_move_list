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

router.route("/preferences")
	.get((req, res) => {
	//	const EJSerror  = ejsLint('/users/preferences.ejs');
		//const parsedEJSerror = JSON.parse(EJSerror);
	//	console.log("this is ejsError", EJSerror);
	           
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

				// console.log("the user preferences database retrieval is working")

				 console.log("this is found user fav genres object", foundUser.favGenres)
	//			console.log('this is genre object', genreObject)

				res.render("users/preferences.ejs", {
					genre: foundUser.favGenres,
					actor: foundUser.favActors,
					arrayOfObjects: genreObject

				})

			} else {
				console.log(err)
			}
		})


		//console.log(req.session)
	} else {
		res.redirect('/users/login')
	}

})

	.post((req, res) => {
		User.findOne({ username: req.session.username }, (err, foundUser) => {
			if (foundUser) {
				if(foundUser.favGener.length != 0){
					for(let i = 0; i<foundUser.favActors.length; i++){
						foundUser.favActors.pop()
					}
				}
				for(let i = 0; i < req.body.favGenres.length; i++){
					foundUser.favGenres.push(req.body.favGenres[i])
				}

				foundUser.favActors.push(req.body.favActor)

				foundUser.save((err, data) => {
					// res.send(data);
					res.redirect("/users/preferences")
				})
			} else {
				console.log(err)
			}
		})
	})



module.exports = router;
