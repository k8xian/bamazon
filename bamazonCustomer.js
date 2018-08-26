const mysql = require("mysql");
require("dotenv").config();
const inquirer = require("inquirer");

var border = "==================================\n"

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "bamazon"
});


function readProducts() {
    connection.query("select * from products", (err, res) => {
        if (err) throw err;

        for (let i in res) {
            var id = res[i].id;
            var product = res[i].product_name;
            var price = res[i].price;
            var stock = res[i].stock_quantity;

            console.log(`${border} \n# ${id} : ${product} \nPrice: ${price} | Stock Available: ${stock}`);
        };
        console.log(`${border}`);

        inquirer.prompt([
            {
                type: "input",
                message: `What is the ID of the product \nyou would like to purchase?\n`,
                name: "product"
            },
            {
                type: "input",
                message: `How many would you like?\n`,
                name: "quantity"
            },
            {
                type: "confirm",
                message: "Are you sure?\n",
                name: "confirm",
                default: true
            }
        ]).then((queryRes) => {

            if (queryRes.confirm) {

                if (queryRes.quantity > res[queryRes.product - 1].stock_quantity || res[queryRes.product - 1].stock_quantity === 0) {
                    readProducts();

                    console.log("Not enough products in stock. Please choose a different product or quantity.");
                } else {
                    buyProducts(res[queryRes.product - 1].product_name, queryRes.quantity, res[queryRes.product - 1].price, res[queryRes.product - 1].stock_quantity, res[queryRes.product - 1].id);
                }
            } else {
                console.log(`Here is the list of products, once more with feeling.`);
                readProducts();
            }

        });
    });
};


function buyProducts(product, quantity, price, originalStock, id) {

    var totalPrice = quantity * price;
    var remainingStock = originalStock - quantity;

console.log(`${border} \nYou bought ${quantity} ${product}(s) for $${price} each \nYour total is: $${totalPrice}`);

    connection.query(
        `UPDATE products SET stock_quantity = ${remainingStock} WHERE id = ${id}`, (err) => {
            if (err) throw err;
            console.log(`Thank you for your order! \n\nPlease Come Again`);
        });
    connection.end();
}

readProducts();
