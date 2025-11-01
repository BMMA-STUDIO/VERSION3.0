const express = require('express')
const app = express()
const users = require('./routes/users')
const PORT = process.env.PORT || 8383
const path = require('path')

//View Engine Setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//Static Views
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/users', users)

//404 Rye Catcher
app.use((req, res, next) => {
    // Set status code 404
    res.status(404);
    // Render the custom 404 view
    res.render('404', { 
        path: req.originalUrl,
        title: 'Error 404'
    });
});

//RUNNING
app.listen(PORT, () => console.log(`Test App Running on PORT:${PORT}`))


