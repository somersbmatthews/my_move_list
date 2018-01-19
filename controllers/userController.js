const express = require("express");
const router = express.Router();


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