const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: [true, "Email must be unique"],
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be atleast 8 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compareSync(password, this.password);
}
userSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}
userSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model("User", userSchema);