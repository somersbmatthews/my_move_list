const mongoose = require('mongoose');

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';



mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
	console.log("Mongodb is connected")
})

mongoose.connection.on("disconnected", () => {
	console.log("Mongodb is disconnected")
})

mongoose.connection.on("error", (error) => {
	console.log("Error connecting -- ", error)
})