<h1>Shop Stock</h1>
<h2>Total Worth: £{total_worth}</h2>
{#each stock as stock_item}
    <h2>{stock_item.name}</h2>
    <h3 class="inline">Amount: {stock_item.amount}</h3>
    <button on:click={edit_amount(stock_item.name, 1)}>Add</button>
    <button on:click={edit_amount(stock_item.name, -1)}>Remove</button>
    <h3>Price: £{stock_item.price}</h3>
{/each}

<script>
let stock = []
let total_worth = 0;

// Gets all stock information
const get_stock = () => {
	fetch("http://localhost:5000/stock", {
		headers: {
		  "Content-Type": "application/json"
		}
	}).then(response => response.json()).then(data => {
        stock = data;

		// Calculates the new total stock worth every update
		total_worth = 0;
		data.forEach(stock_item => total_worth += stock_item.amount * stock_item.price);
	}).catch(error => console.error(error));
};

// Allows users to add/remove stock
const edit_amount = (name, edit_amount) => {
	fetch("http://localhost:5000/edit-stock-amount", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			message: name,
			data: edit_amount
		})
	}).then(get_stock).catch(error => console.error(error));
};

get_stock();
setInterval(get_stock, 1000);
</script>

<style>
.inline {
	display: inline;
}
</style>