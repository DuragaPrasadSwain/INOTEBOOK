const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config()

const connectToMongo = async() => {


// await mongoose.connect("mongodb+srv://project:zdsANglr6cQ0Qhnm@inotebook.q5fnlpk.mongodb.net/inotebook?retryWrites=true&w=majority");
// await mongoose.connect(`mongodb://localhost:27017/inotebook`);
await mongoose.connect(MONGODB_URL);                //.env


    console.log(`the DB is connected ${mongoose.connection.host}`);
}

module.exports = connectToMongo;




//first file