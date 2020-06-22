const express = require("express"),
  app = express(),
  port = 23450,
  bodyParser = require("body-parser");

var LEX = require("letsencrypt-express").testing();
var DOMAIN = "linzin.net";
var EMAIL = "takashivue@gmail.com";

var lex = LEX.create({
  configDir: require("os").homedir() + "/letsencrypt/etc",
  approveRegistration: function (hostname, approve) {
    // leave `null` to disable automatic registration
    if (hostname === DOMAIN) {
      // Or check a database or list of allowed domains
      approve(null, {
        domains: [DOMAIN],
        email: EMAIL,
        agreeTos: true,
      });
    }
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );

  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

const routes = require("./api/routes/userRoutes");
routes(app);

lex.onRequest = app;

lex.listen([port], [443, 5001], function () {
  var protocol = "requestCert" in this ? "https" : "http";
  console.log(
    "Listening at " + protocol + "://localhost:" + this.address().port
  );
});
console.log("REST API server started on " + port);
