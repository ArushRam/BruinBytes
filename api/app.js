var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dininghallsRouter = require('./routes/dininghall');
var reviewRouter = require('./routes/review');
var dishRouter = require('./routes/dishes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({origin: 'http://localhost:3000'}))   // stupid https://www.youtube.com/watch?v=4KHiSt0oLJ0  

const uri = "mongodb+srv://rishi:rishi@cluster0.phmcg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);
const connection =  mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully')
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dininghall', dininghallsRouter);
app.use('/review', reviewRouter);
app.use('/dishes', dishRouter);


app.listen(process.env.PORT || 5000);

//module.exports = app;
