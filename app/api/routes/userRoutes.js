module.exports = function (app) {
    const userList = require('../controllers/userController')
    const awaitingList = require('../controllers/awaitingController')

    app.route('/users').get(userList.allUser).post(userList.addUser)
    app.route('/users/:email').post()

    app.route('/awaitng').get(awaitingList.allAwaiting).post(awaitingList.addAwaiting)
}