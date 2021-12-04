const mongoose = require('mongoose');
const mongoDB_URI = 'mongodb://localhost:27017/BWT-assign'

const connectDB = () => {
    mongoose.connect(mongoDB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDB