const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const studentRoutes = require("./routes/students");

//express app
const app = express();

app.use(express.json());
//routes
app.use("/api/students", studentRoutes);

//connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("Connected to DB and Listening on port", process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error);
	});
