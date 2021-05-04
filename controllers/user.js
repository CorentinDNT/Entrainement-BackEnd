const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

const User = require("../models/User");

//fonction signup
exports.signup = (req, res, next) => {
	//crypte le mot de passe
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			//prends le mdp crypté et créer un nouveau user avec
			const user = new User({
				email: req.body.email,
				password: hash,
			});
			//et enregistre l'user dans la database
			user
				.save()
				.then(() => res.status(201).json({ message: "user created" }))
				.catch((e) => res.status(500).json({ e }));
		})
		.catch((e) => res.status(500).json({ e }));
};

exports.login = (req, res, next) => {
	//On recup l'user de la base qui correspond a l'email rentré
	User.findOne({ email: req.body.email })
		.then((user) => {
			//si l'email n'est pas bon
			if (!user) {
				return res.status(401).json({ error: "user non trouvé" });
			}
			//sinon on compare le mdp entré par l'user avec celui de la database
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					//si la comparaison n'est pas bonne alors
					if (!valid) {
						return res.status(401).json({ error: "mdp incorrect" });
					}
					//si l'user a rentré les identifiants valable on lui renvoie un (userId et un token) => attendu par le frontEnd
					res.status(200).json({
						userId: user._id,
						//la fonction de jsonWebToken .sign() qui prends trois arguments.
						token: jsonWebToken.sign(
							//1er: les donées qu'on veut encoder
							//on encode le userId pour que tout le monde ne puisse pas modifier tous les objets de tout le monde
							{ userId: user._id },
							//2ème: la clé secrète pour l'encodage
							"RANDOM_TOKEN_SECRET",
							//3ème: argument de configuration ici pour la durée de validité
							{ expiresIn: "24h" }
						),
					});
				})
				.catch((e) => res.status(500).json({ e }));
		})
		//si on a un probleme de co / sur la database
		.catch((e) => res.status(500).json({ e }));
};
