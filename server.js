const express = require('express')
const app = express()
const users = require('./routes/users')
const PORT = process.env.PORT || 8383
const path = require('path')


//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Static Views
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/api/users', users)

//RUNNING
app.listen(PORT, () => console.log(`Test App Running on PORT:${PORT}`))


