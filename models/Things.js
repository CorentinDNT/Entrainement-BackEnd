const mongoose = require("mongoose");

//on uttilise la fonction Schema mise a disposition par le package mongoose
//auquel on va passer un objet qui va dicter les diferents champs dont notre "Things/Schema" aura besoin

//on indique leur type ainsi que leur caractère {required} (obligatoire ou non)
const thingSchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	userId: { type: String, required: true },
	price: { type: Number, required: true },
});

//on exporte le module model du package mongoose dont le premier argument est le nom du modèle
//et le deuxième sera le schema qu'on veut uttiliser
module.exports = mongoose.model("Thing", thingSchema);
