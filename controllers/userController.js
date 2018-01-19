const express = require("express");
const router = express.Router();


router.route("/login")
	.get((req, res) => {
		res.send("login page")
		// res.render("login.ejs")
	})


router.route("/register")
	.get((req, res) => {
		res.send("registration page")
		// res.render("register.ejs")
	})

router.route("/watchlist")
	.get((req, res) => {
		res.send("user watch list");
		// res.render("watch-list.ejs")
	})


router.route("/logout")
	.get((req, res) => {
		console.log("User logged out")
		res.redirect("/users/login")
	})





module.exports = router;