var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(error) {
  if (error) throw error;
  homepage();
});

function homepage() {
    console.log("\nWelcome to Bamazon\n");
    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;

        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name +
                " | $" + response[i].price);
        };
        purchaseItem();
    });
};

function purchaseItem() {

    inquirer.prompt([
      {
        type: "input",
        name: "idNumber",
        message: "\nEnter the id number for the item you are trying to buy.",
        validate: function(value){
          if (isNaN(value) === false){
            return true
          }
          else {
            return false
          }
        }
      },
      {
        type: "input",
        name: "howMany",
        message: "\nHow many would you like to buy?",
        validate: function(value){
          if (isNaN(value) === false){
            return true
          }
          else {
            return false
          }
        }
      }
    ])
        
    .then(function(userInput) {

      var query = connection.query("SELECT * FROM products WHERE item_id = ?", {item_id:userInput.idNumber}, function(error, response) {
        if (error) throw error;

        if (response[0].stock_quantity > userInput.howMany){
          var howMuch = response[0].price * userInput.howMany
          console.log("\nThat'll be $" + howMuch);
        }
        else{
          console.log("Sorry, we don't have enough. Get outside and try a real store.")
        }
        console.log("\nThanks for shopping with us!\n");
        connection.end();
      }
    )});
};

//Still need to update stock quantity in mysql

