const express = require("express");
const mongoose = require("mongoose");

exports.mongooseLog = mongoose
	.connect(
		"mongodb+srv://Truse31:AVBGMaUugxhFPc5Q@cluster0.p3kjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));
