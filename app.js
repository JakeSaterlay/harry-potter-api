const express = require("express");
const cors = require("cors");
const {
	getCharacters,
	getCharacterById,
	addOrUpdateCharacter,
	deleteCharacter,
} = require("./dynamo");
const app = express();
app.use(cors());
app.get("/", (req, res) => {
	res.send("hello world");
});

app.get("/characters", async (req, res) => {
	try {
		const characters = await getCharacters();
		res.json(characters);
	} catch (error) {
		console.log(error);
		res.status(500).json({ err: "something went wrong" });
	}
});

app.get("/characters/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const characters = await getCharacterById(id);
		res.json(characters);
	} catch (error) {
		console.log(error);
		res.status(500).json({ err: "something went wrong" });
	}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log("listening on port " + port);
});
