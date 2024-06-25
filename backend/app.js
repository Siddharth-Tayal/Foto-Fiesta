const express = require("express");
const Post = require("./routes/post.routes");
const User = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const path = require("path")
const app = express();
// Middlewares

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())

//Routing
app.use('/api/v1/post/', Post)
app.use('/api/v1/user/', User)

//Setting up static folder
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})
module.exports = app;