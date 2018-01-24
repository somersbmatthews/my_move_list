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
		res.render("users/watch-list.ejs", {
			
		})
	})


router.route("/logout")
	.get((req, res) => {
		res.redirect("/users/login")
	})

router.route("/preferences")
	.get((req, res) => {
		res.render("users/preferences.ejs")
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


module.exports = router;
