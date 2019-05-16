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
  start();
});

// start function that prompts the menu choices
function start() {
  inquirer.prompt({
    name: "menu",
    type: "rawlist",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory",
      "Add to Inventory", "Add New Product"]
  }).then(function (answer) {
    switch (answer.menu) {
      case "View Products for Sale":
        saleProducts();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
    }
  })
};

// function saleProducts(); view products for sale
function saleProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //loop through the res array and return the information 
    for (var i = 0; i < res.length; i++) {
      console.log("Item Id: " + res[i].item_id + " || " + "Name: " + res[i].product_name +
        " || " + "Price: " + res[i].price + " || " + "Quantity: " + res[i].stock_quantity);
      console.log("----------------------------------------------------------");
    }
    start();
  });
};

// function lowInventory(); view low inventory
function lowInventory() {
  // For the purpose of test, set the iventory of id 4 and 7 to be less than 5.
  connection.query("UPDATE products SET stock_quantity = 3 WHERE item_id = 4");
  connection.query("UPDATE products SET stock_quantity = 4 WHERE item_id = 7");

  // select the products that have inventory less than 5. 
  connection.query("SELECT * From products WHERE stock_quantity<5", function (err, res) {
    if (err) throw err;
    //loop through the res array and return the information 
    for (var i = 0; i < res.length; i++) {
      console.log("Item Id: " + res[i].item_id + " || " + "Name: " + res[i].product_name +
        " || " + "Price: " + res[i].price + " || " + "Quantity: " + res[i].stock_quantity);
      console.log("----------------------------------------------------------");
    }
    start();
  });
};

// function addInventory(); add to inventory
function addInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);
    var managerChoice = [];
    //loop through the res array and return the information 
    for (var i = 0; i < res.length; i++) {
      managerChoice.push("Item Id: " + res[i].item_id + " || " + "Name: " + res[i].product_name +
        " || " + "Price: " + res[i].price + " || " + "Quantity: " + res[i].stock_quantity);
    };
    // console.log(managerChoice);
    select(managerChoice);
  });
};

function select(managerChoice) {
  inquirer.prompt([
    {
      name: "selectID",
      type: "rawlist",
      message: "Which of the products that you would like to add more inventory to?",
      choices: managerChoice,
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "addedQuant",
      type: "input",
      message: "How many units you would like to add?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]).then(function (answer) {
      var id = answer.selectID.slice(9, 10);
      console.log(id);
      var addedQuant = parseInt(answer.addedQuant);
      connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        console.log(res);
        var stock = parseInt(res[0].stock_quantity);
        var newQuant = stock + addedQuant;
        updateProduct(newQuant, id);
      });
    })
};

function updateProduct(newQuant, id) {
  connection.query("UPDATE products SET? WHERE?",
    [
      {
        stock_quantity: newQuant
      },
      {
        item_id: id
      }],
    function (err, res) {
      console.log(res.affectedRows + " product(s) updated!\n");
    });
};


// function addProduct(); add new product 
function addProduct() {
  inquirer.prompt([
    {
      name: "product_name",
      type: "input",
      message: "What's the name of the product?"
    },
    {
      name: "department",
      type: "input",
      message: "What's the department name?"
    },
    {
      name: "price",
      type: "input",
      message: "What's the price of the product?"
    },
    {
      name: "stock",
      type: "input",
      message: "How many units of inventories?"
    }]).then(function(answer){
      console.log("Inserting a new product...\n");
      connection.query("INSERT INTO products SET?",
      {
        product_name: answer.product_name,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.stock
      },
      function(err,res){
        console.log(res.affectedRows + " product inserted!\n");
      })
    })
};


