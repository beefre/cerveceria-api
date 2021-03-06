var express = require('express');
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
const passport = require('./db/passport')
const session = require('express-session')
var logger = require('morgan');
const fileUpload = require('express-fileupload');
require("dotenv").config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var getProductsRouter = require('./routes/getProducts')
var authRouter = require("./routes/auth")


var app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//para aceptar peticiones
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRouter)
app.use('/', indexRouter);
app.use('/users', passport.authenticate("jwt", { session: false }),usersRouter);
app.use('/products',passport.authenticate("jwt", { session: false }),productsRouter)
app.use('/getProducts',getProductsRouter);



module.exports = app;
