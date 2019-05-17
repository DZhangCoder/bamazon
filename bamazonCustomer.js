var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mnizdd123",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //loop through the res array and return the information 
    for (var i = 0; i < res.length; i++) {
      console.log("Item Id: " + res[i].item_id + " || " + "Name: " + res[i].product_name +
        " || " + "Price: " + res[i].price);
      console.log("----------------------------------------------------------");
    }
    message();
  });
};

function message() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What's the ID of the product that you would like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the product you would like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function (answer) {
      var id = answer.id;
      var units = parseInt(answer.units);
      var query = "SELECT stock_quantity, price FROM products WHERE item_id = ?";
      connection.query(query, [id], function (err, res) {
        var stock = parseInt(res[0].stock_quantity);
        // console.log(res);
        if (units > stock) {
          console.log("Insufficient quantity!");
        }
        else {
          console.log("Orders received! Placing orders...");
          console.log("Units left in stock: " + stock);
          var price = parseFloat(res[0].price);
          console.log("Price per unit: " + price);
          var newQuant = stock - units;
          updateProduct(newQuant, id);
          var totalCost = units * price;
          console.log("Your total cost of purchase is: " + totalCost);
        }
      });
    });
};

function updateProduct(newQuant, id) {
  var query = connection.query(
    "UPDATE products SET? WHERE?",
    [
      { stock_quantity: newQuant },
      { item_id: id }
    ],
    function (err, res) {
      console.log(res.affectedRows + " product(s) updated!\n");
      console.log("Updated quantity of items in stock: "+newQuant);
    }
  );
}; 

