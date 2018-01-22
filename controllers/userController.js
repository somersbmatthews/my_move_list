const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt")

router.route("/login")
	.get((req, res) => {
		res.render("users/login.ejs", {
			message: "Placeholder"
		})
	})


router.route("/register")
	.get((req, res) => {
		res.render("users/register.ejs")
	})
	.post((req, res) => {
		// res.send(req.body)
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
				res.send("User created " +  createdUser)
			}
		})
	})

router.route("/watchlist")
	.get((req, res) => {
		res.render("users/watch-list.ejs")
	})


router.route("/logout")
	.get((req, res) => {
		console.log("User logged out")
		res.redirect("/users/login")
	})





module.exports = router;