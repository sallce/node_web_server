const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//get enviroment variable port for deploying
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partial");
// app.set('view engine', 'hbs');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//set middlewares which are called by the order
app.use((req, res, next) => {
  var now = new Date().toDateString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log("Unable to save log.");
    }
  });

  next();

});

// app.use((req, res, next) => {
//   res.render('maintenance.html');
// });

app.use(express.static(__dirname + "/public"));//this should be last


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.html',{
    pageTitle: "Welcome",
    name: "Kyle Shang",
    age: 26,
    welcomeMessage: "Hello"
  });
});

app.get('/about', (req, res) => {
  //views folder is the default views directory
  res.render('about.html',{
    pageTitle: "About"
  });
});

app.get('/json', (req, res) => {
  res.send({
    name: "Kyle Shang",
    age: 26
  });
});


app.listen(port, () => {
  console.log(`Example application listening on port ${port}.`);
});
