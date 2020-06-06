const mysql = require('mysql')
const config = {
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'linzin'
}
const connection = mysql.createConnection(config)
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
exports.allUser = function (req, res) {
    let sql = 'SELECT * FROM userlist;'
    connection.query(sql, (err, result, fields) => {
        if (err) throw err
        return res.json(result)
    })
}

exports.addUser = function (req, res) {
    console.log(req.body)
    const name = req.body.name,
        email = req.body.email
    const sql = 'INSERT INTO userlist VALUES(null,?,?);'
    connection.query(sql, [name, email], (err, result) => {
        if (err) throw error
        return res.status(200).send(true)
    })
}