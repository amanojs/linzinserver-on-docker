const connection = require('../mysql.js')

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

exports.allUser = (req, res) => {
  let sql = "SELECT * FROM userlist;";
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    return res.json(result);
  });
};

exports.addUser = (req, res) => {
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

/*
  create table userlist(
    email VARCHAR(256) PRIMARY KEY NOT NULL,
    pass VARCHAR(256) NOT NULL,
    idcard VARCHAR(256) NOT NULL,
    created_at DATE NOT NULL
  );
*/