const database = require("./database/connection.js");
const express = require("express");
const app = express();

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.json());

app.get("/stock", (request, response) =>
	database.get_stock().then(data =>
		response.json(data)));

app.post("/edit-stock-amount", (request, response) => {
	database.edit_stock(request.body.message, request.body.data);
	response.status(200).end();
});

app.listen(5000);