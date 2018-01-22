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
		res.render("users/register.ejs")
	})

	.post((req, res) => {
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
		res.render("users/preferences.ejs")
		console.log(req.session)
	})
	.post((req, res) => {
		User.findOneAndUpdate({ username: req.session.username},
			{$set: {favGenres: req.body.favGenre, favActors: req.body.favActor} },

			(err, updatedUser) => {
				if (err) {
					console.log(err)
				} else {
					res.send(updatedUser);
				}
			}
		)
	})




module.exports = router;