module.exports = function (app) {
    const userList = require('../controllers/userController')

    app.route('/users').get(userList.allUser).post(userList.addUser)
    app.route('/users/:email').post()
}