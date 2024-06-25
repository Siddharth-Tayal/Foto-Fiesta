const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO).then((conn) => console.log(`MongoDB connected to ${conn.connection.host}`)).catch(err => console.log(err));
}
module.exports = connectDB;