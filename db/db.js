const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
	// useMongoClient: true
});

mongoose.connection.on("connected", () => {
	console.log("Mongodb is connected")
})

mongoose.connection.on("disconnected", () => {
	console.log("Mongodb is disconnected")
})

mongoose.connection.on("error", (error) => {
	console.log("Error connecting -- ", error)
})