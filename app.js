/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var shortcut = require('./routes/shortcut');
var report = require('./routes/report');
var building_plan = require('./routes/building_plan');
var help = require('./routes/help');
var login = require('./routes/login');
var start = require('./routes/start');
var directions = require('./routes/direction');
var questions = require('./routes/questions');
var find = require('./routes/find');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("IxD secret key"));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

// development only
if ("development" == app.get("env")) {
  app.use(express.errorHandler());
}

app.get('/nav', index.view);
app.get('/add/shortcut', shortcut.view);
app.get('/add/building_plan_alt', building_plan.addBuildingPlanAlt);
app.get('/add/building_plan_alt/undo', building_plan.removeBuildingPlanAlt);
app.get('/help', help.view);
app.get('/', login.view);
app.get('/login', login.view);
app.get('/nav/start', start.view);
app.get('/nav/directions', directions.view);
app.get('/question/:number', questions.questionInfo);
app.get("/add/report", report.addEvent);
app.get("/add/report/undo", report.removeEvent);
app.get("/find", find.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
