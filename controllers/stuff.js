const express = require("express");
const Things = require("../models/Things");

exports.createThing = (req, res, next) => {
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
};

exports.modifyThing = (req, res, next) => {
	//en premier argument l'objet qu'on modifie et en deuxieme le nouvel objet
	Things.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "objet modifié" }))
		.catch((e) => res.status(400).json({ e }));
};

exports.deleteThing = (req, res, next) => {
	Things.deleteOne({ _id: req.params.id })
		.then((e) => res.status(200).json({ message: "objet supprimé" }))
		.catch((e) => res.status(400).json({ e }));
};

exports.getOneThing = (req, res, next) => {
	//parametre sur la requete(req) recupere l'id
	//findOne pour en trouver UN seule
	Things.findOne({ _id: req.params.id })
		.then((thing) => res.status(200).json(thing))
		.catch((e) => res.status(404).json({ e }));
};

exports.getAllThings = (req, res, next) => {
	Things.find()
		.then((things) => res.status(200).json(things))
		.catch((e) => res.status(400).json({ e }));
};
