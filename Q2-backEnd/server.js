const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 5500

const connectDB = require('./config/db');
const signUp = require('./controllers/signup')

connectDB()
app.use(bodyParser())
app.use(bodyParser.json())

app.use('/api/signup', signUp)


app.get('/', (req, res) => {
    res.send('Hello')
})



app.listen(PORT, (req, res) => {
    console.log('SERVER Running in :', PORT)
})