const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sandeep@123",
  database: "resturant_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM resturant_table";
  db.query(sqlGet, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/add", (req, res) => {
  const { name, food, tableNo } = req.body;
  const sqlInsert = `INSERT INTO resturant_table (name, food, tableNo) VALUES (?, ?, ?)`;
  db.query(sqlInsert, [name, food, tableNo], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = `DELETE FROM resturant_table WHERE id = ?`;
  db.query(sqlDelete, id, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, food, tableNo } = req.body;
  const sqlUpdate = `UPDATE resturant_table SET name = ?, food = ?, tableNo = ? WHERE id = ?`;
  db.query(sqlUpdate, [name, food, tableNo, id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
