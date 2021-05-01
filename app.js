const express = require("express");
//npm install body-parser --save
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Things = require("./models/Things");

mongoose
	.connect(
		"mongodb+srv://Truse31:AVBGMaUugxhFPc5Q@cluster0.p3kjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
//Premier middleWare qui sera générale (qui n'a pas besoin de route pour acceder a notre serveur)
//il sera donc accessible par toutes les requetes
app.use((req, res, next) => {
	//on ajoute des Header sur l'obj réponse
	//on dit que l'origine qui a le droit d'uttiliser des requetes c'est : '*'
	res.setHeader("Access-Control-Allow-Origin", "*");

	//on donne l'autorisation d'uttiliser certains headers sur l'obj requête (req)
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);

	//et l'autorisation pour certaines méthodes
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);

	//on passe l'éxec au middleWare suivant
	next();
});

//pour toutes les routes de l'app on uttilise bodyParser.json
app.use(bodyParser.json());

//ce middleWare va servir à traiter les donées en methodes POST
app.post("/api/stuff", (req, res, next) => {
	//on retire le champ id du corp(.body) de la requette (req)
	delete req.body._id;
	const thing = new Things({
		/* title: req.body.title, */
		...req.body,
	});
	thing
		.save()
		.then(() => res.status(201).json({ message: "objet enregistré" }))
		.catch((e) => res.status(400).json({ e }));
});

app.put("/api/stuff/:id", (req, res, next) => {
	//en premier argument l'objet qu'on modifie et en deuxieme le nouvel objet
	Things.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "objet modifié" }))
		.catch((e) => res.status(400).json({ e }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
	Things.deleteOne({ _id: req.params.id })
		.then((e) => res.status(200).json({ message: "objet supprimé" }))
		.catch((e) => res.status(400).json({ e }));
});

app.get("/api/stuff/:id", (req, res, next) => {
	//parametre sur la requete(req) recupere l'id
	//findOne pour en trouver UN seule
	Things.findOne({ _id: req.params.id })
		.then((thing) => res.status(200).json(thing))
		.catch((e) => res.status(404).json({ e }));
});

app.use("/api/stuff", (req, res, next) => {
	Things.find()
		.then((things) => res.status(200).json(things))
		.catch((e) => res.status(400).json({ e }));
});

/* ce middleWare est la pour créer un groupe d'articles avec le schéma de données spécifique requis par le front-end
"/api/stuff" est l'url visé par l'app, le front va essayer de faire une requête "GET" à cet adresse.
app.use("/api/stuff", (req, res, next) => {
	const stuff = [
		{
			_id: "oeihfzeoi",
			title: "Mon premier objet",
			description: "Les infos de mon premier objet",
			imageUrl:
				"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
			price: 4900,
			userId: "qsomihvqios",
		},
		{
			_id: "oeihfzeomoihi",
			title: "Mon deuxième objet",
			description: "Les infos de mon deuxième objet",
			imageUrl:
				"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
			price: 2900,
			userId: "qsomihvqios",
		},
	];
	attribu un code 200 à la réponse donc c'est une réponse réussi
	et renvoie en réponse JSON le [{stuff}]
	res.status(200).json(stuff);
}); */

module.exports = app;
