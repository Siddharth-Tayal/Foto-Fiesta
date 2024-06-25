const app = require("./app")
const connectDB = require("./config/connection");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary');

dotenv.config({
    path: "backend/config/config.env"
})
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT : ${process.env.PORT}`);
})