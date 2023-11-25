const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json(data);
  });
});
app.post("/create", (req, res) => {
  const sql = "INSERT INTO users (`name`,`phone`,`email`) VALUES (?)";
  const values = [req.body.name, req.body.phone, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    console.log(values);
    return res.json("User Created");
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE users set `name` = ?,`phone` = ?,`email` = ?  WHERE id = ? ";
  const id = req.params.id;
  const values = [req.body.name, req.body.phone, req.body.email];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("User Updated");
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ? ";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("User Deleted");
  });
});

app.listen(8081, () => {
  console.log("Listening.....");
});
