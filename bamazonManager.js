const mysql = require("mysql");
require("dotenv").config();
const inquirer = require("inquirer");


var border = "==================================\n"


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
});

function manager() {
    inquirer.prompt([
        {
            type: "list",
            name: "managerQuery",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (toDo) {
        if (toDo.managerQuery === "View Products for Sale") {
            connection.query("SELECT * FROM products", function (err, res) {
                for (var i in res) {
                    var id = res[i].id;
                    var product = res[i].product_name;
                    var price = res[i].price;
                    var department = res[i].department_name;
                    var stock = res[i].stock_quantity;
                    var basicProductBlock = `\n# ${id} : ${product} | ${department} \nPrice: ${price} | Stock Available: ${stock} \n${border}`;
                    console.log(basicProductBlock);
                }
                manager();
            })
        }
        if (toDo.managerQuery === "View Low Inventory") {
            connection.query("SELECT * FROM products", function (err, res) {

                for (var i in res) {
                    var id = res[i].id;
                    var product = res[i].product_name;
                    var price = res[i].price;
                    var department = res[i].department_name;
                    var stock = res[i].stock_quantity;
                    var basicProductBlock = `\n${border}    ******low inventory!*******\n\n${id} : ${product} | ${department} \nPrice: ${price} | Stock Available: ${stock}\n#${border}`;
                    if (res[i].stock_quantity < 5) {
                        console.log(basicProductBlock);
                    }
                    else {
                        console.log(`\n ${product} has sufficient stock \n`);
                    }
                }
                manager();
            })
        }
        if (toDo.managerQuery === "Add to Inventory") {
            inquirer.prompt([
                {
                    name: "toAdd",
                    message: `Which product ID are you restocking? Enter ID`
                },
                {
                    name: "quantityToAdd",
                    message: "How many are you adding?"
                }
            ]).then((add) => {
                connection.query("SELECT * FROM products WHERE id =" + "'" + add.toAdd + "'", function (err, res) {
                    if (err) throw err;
                    var addToQuantity = parseInt(res[0].stock_quantity) + parseInt(add.quantityToAdd);

                    connection.query("UPDATE products SET stock_quantity = " + addToQuantity + " WHERE id = " + add.toAdd + ";", (err, stockRes) => {
                        if (err) throw err;
                        console.log(`${border}You have restocked product number ${add.toAdd}\n${border}`);
                        manager();
                    })
                })
            })
        }
        if (toDo.managerQuery === "Add New Product") {
            console.log("Add a product:")
            inquirer.prompt([
                {
                    name: "addName",
                    message: "Enter a name for the product:"
                },
                {
                    name: "addDepartment",
                    message: "Enter a department for the product:"
                },
                {
                    name: "addPrice",
                    message: "Enter a price for the product:"
                },
                {
                    name: "addAmount",
                    message: "Enter a quantity for the product:"
                }
            ]).then(function (addProduct) {
                connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) values ('" + addProduct.addName + "' , '" + addProduct.addDepartment + "'," + addProduct.addPrice + "," + addProduct.addAmount + ")", (err, res) => {
                    if (err) throw err;
                    console.log(`${border}You added ${addProduct.addAmount} ${addProduct.addName}(s) to ${addProduct.addDepartment} \nat ${addProduct.addPrice} per ${addProduct.addName}\n${border}`);
                    manager();
                })
            })
        }
    })
}

manager();
