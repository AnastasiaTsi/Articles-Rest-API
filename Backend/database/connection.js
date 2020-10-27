const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:2p4H7ebouOo3MKPF@cluster0.xtxek.mongodb.net/MongoNode?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));
}

module.exports = connectDB;