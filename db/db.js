const mongoose = require('mongoose');
// const mongoUri  = process.env.MONGODB_URI;

const mongoUri  = 'mongodb://heroku_f5vsmn6s:7sbm4aepu774fhpfvf8iat5ju3@ds115768.mlab.com:15768/heroku_f5vsmn6s';

mongoose.connect(process.env.MONGO_URI || process.env.DB_HOST);

mongoose.connection.on("connected", () => {
	console.log("Mongodb is connected")
})

mongoose.connection.on("disconnected", () => {
	console.log("Mongodb is disconnected")
})

mongoose.connection.on("error", (error) => {
	console.log("Error connecting -- ", error)
})