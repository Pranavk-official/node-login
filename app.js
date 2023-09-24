const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const nocache = require("nocache");


const app = express();
const PORT = process.env.PORT || 4200;

// view engine
app.set('view engine','ejs')

// static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/js',express.static(__dirname + 'public/js'))

// middleware to handle urlencoded data
app.use(express.urlencoded({extended: true}))
// middleware to handle json
app.use(express.json())

app.use(nocache());

// session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,

}))


// Routes
const router = require('./routes/routes')

app.use('/',router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nLink: http://localhost:${PORT}`);
})
