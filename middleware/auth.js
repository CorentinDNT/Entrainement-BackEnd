const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		//constante a prtir de la requête. Qu'on split autour de l'espace, ce qu'il va nous retourner baerer et ensuite le token.
		//on récupère que le deuxième élément du tableau [1]
		const token = req.headers.authorization.split(" ")[1];
		//On vérifie le token et la clé secrète créer précedement
		const decodedToken = jsonWebToken.verify(token, "RANDOM_TOKEN_SECRET");
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifié" });
	}
};
