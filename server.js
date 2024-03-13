const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const mysql = require("mysql2")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'DB'
})



// simple route
app.get("/", (req, res) => {
  db.connect((err) => {
    if (err) {
      res.json({ message: `You do not have database connection ${err}` })
    }
    res.json({message: 'Connected to the mysql server'})
  })
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
