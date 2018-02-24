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
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Find songs by artist":
          artistSearch();
          break;

        case "Find all artists who appear more than once":
          multiSearch();
          break;

        case "Find data within a specific range":
          rangeSearch();
          break;

        case "Search for a specific song":
          songSearch();
          break;
      }
    });
}

function initialConnection() {
    console.log("\n ~_~ WELCOME to Bamazon! ~_~ \n");
    connection.query("SELECT * FROM products", function(error, result) {
        if (error) throw error;

        for (var i = 0; i < result.length; i++) {
            console.log(result[i].item_id + " | " + result[i].product_name +
                " | $" + result[i].price);
        }
        console.log("\n");
        openingQuestions();
    });
};

function purchaseItem() {

    inquirer
        .prompt([
          {
            name: "id-number",
            type: "input",
            message: "Enter the id number for the item you are trying to buy."
          },

          {
            name: "how-many",
            type: "input",
            message: "How many would you like to buy?"
          }
        ])
        
        .then(function(answer) {
            checkItem(answer);
        })
};

function checkItem(answer) {

    var sql = "SELECT COUNT(*) ?? FROM ?? WHERE ?? = ?";
    var inserts = ["cnt", "bamazondb.products", "item_id", answer.item_id];
    sql = mySQL.format(sql, inserts);

    connection.query(sql, function(error, result) {
        if (error) throw error; 
        
        if (result[0].cnt === 0) {
            console.log("Sorry, we don't have that item!");
        }
        else{
          console.log("There are " + result[0].cnt + " left.");
        }
        anyLeft(answer);
    });
};

function anyLeft(answer) {

    var sql = "SELECT ?? FROM ?? WHERE ?? = ?";
    var inserts = ["stock_quantity", "products", "item_id", answer.item_id];
    sql = mySQL.format(sql, inserts);

    connection.query(sql, function(error, result) {
        if (error) throw error;

        if (answer.itemCount <= result[0].stock_quantity){
          console.log("There are  " + result[0].stock_quantity + " left, so you're in luck!");
          var itemPurchased = result[0].stock_quantity - answer.itemCount;
          var query = connection.query(
              "UPDATE products SET ? WHERE ?", [{
                        stock_quantity: itemPurchased
                    },
                    {
                        item_id: result[0].item_id
                    }
                ],
                function(error, result) {
                    console.log("product updated! " + itemPurchased + " left.");
                }
          );
        } 
        else {
            console.log("No dice, we're all out");
        }
    });
};
