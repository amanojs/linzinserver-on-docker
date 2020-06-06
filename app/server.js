const express = require("express"),
    app = express(),
    port = 23450,
    bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require("./api/routes/userRoutes")
routes(app)

app.listen(port)
console.log("REST API server started on " + port)