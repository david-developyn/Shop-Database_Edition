const knex = require("knex")({
	client: "pg",
	version: "11.5",
	connection: {
		host: "localhost",
		port: 5432,
		user: "postgres",
		password: "password",
		database: "shop"
	}
});

exports.get_stock = async () => {
	let stock;
	await knex.raw(`
		SELECT * FROM stock
		ORDER BY name
	`).then(response => stock = response.rows);
	return stock;
};

exports.edit_stock = (stock_name, change_amount) =>
	knex.raw(`
		UPDATE stock
		SET amount = amount + ${change_amount}
		WHERE name = '${stock_name}'
	`).then(); // For some reason .then() is needed to make this statement run