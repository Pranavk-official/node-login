const express = require('express');

const app = express();
const PORT = process.env.PORT || 4200;

// view engine
app.set('view engine','ejs')

// static files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/js',express.static(__dirname + 'public/js'))


// Routes
const router = require('./routes/routes')

app.use('/',router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nLink: http://localhost:${PORT}`);
})
