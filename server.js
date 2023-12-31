const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');
// MongoDB Database url

// Connect Mongodb Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(
	  () => {
		console.log('Database is connected')
	  },
	  err => {
	  	console.log('There is problem while connecting database ' + err)
	  }
);

// Setting up port with express js
const employeeRoute = require('./routes/employee.route')
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.get("/",(req,res) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.send("API is running..");
});
// app.use(express.static(path.join(__dirname, './dist/crud-app')));
// app.use('/', express.static(path.join(__dirname, './dist/crud-app')))
app.use('/api', employeeRoute)
// default file
// app.get('**',(req,res) => {
//   res.sendFile(path.join(__dirname,'./dist/crud-app/index.html'));
// });
// Create port
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})

