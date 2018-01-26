require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");

require("./db/db.js");



/*
Middleware
*/

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session({
	secret: "Holder String",
	resave: false,
	saveUninitialized: false
}))

app.use(methodOverride('_method'))

app.use(express.static("public"));


/*
Controllers
*/
const userController = require("./controllers/userController.js");
app.use("/users", userController)

const movieController = require("./controllers/movieController.js");
app.use("/movies", movieController)

app.get('/*/', (req,res)=>{
	res.send('your route is messed up')
})


app.listen(3000, () => {
	console.log("Listening on port 3000");
})