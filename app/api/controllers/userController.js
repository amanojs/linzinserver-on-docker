const mysql = require("mysql");
const config = {
  host: "mysql",
  user: "root",
  password: "password",
  database: "linzin",
};
const connection = mysql.createConnection(config);
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
exports.allUser = function (req, res) {
  let sql = "SELECT * FROM userlist;";
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    return res.json(result);
  });
};

exports.addUser = function (req, res) {
  const today = new Date();
  const date =
    today.getFullYear() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    (today.getDate() + 1);
  console.log(req.body);
  const email = req.body.email,
    pass = req.body.pass,
    card_url = req.body.card_url;
  const sql = "INSERT INTO userlist VALUES(?,?,?,?);";
  connection.query(sql, [email, pass, card_url, date], (err, result) => {
    if (err) throw error;
    return res.status(200).send(true);
  });
};
