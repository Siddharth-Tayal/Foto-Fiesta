const PostModels = require("../models/Post.models");
const UserModels = require("../models/User.models");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto')
const cloudinary = require('cloudinary')
async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;
        let user = await UserModels.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        let myCloud;
        try {
            myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "socialAvatars"
            })
        } catch (error) {
            console.log(error);
        }
        user = await UserModels.create({
            name, email, password, avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        })
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        return res.cookie("socialToken", token, options).status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserModels.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        return res.cookie("socialToken", token, options).status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function logout(req, res, next) {
    try {
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }
        return res.cookie("socialToken", null, options).status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function follow(req, res, next) {
    const jiskoFollowKarnaHai = await UserModels.findById(req.params.id);
    const joFollowKarRhaHai = await UserModels.findById(req.user._id);
    if (!jiskoFollowKarnaHai) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        })
    }
    if (jiskoFollowKarnaHai.followers.includes(req.user._id)) {
        const index = jiskoFollowKarnaHai.followers.indexOf(req.user._id)
        jiskoFollowKarnaHai.followers.splice(index, 1);
        const index2 = joFollowKarRhaHai.following.indexOf(req.params.id);
        joFollowKarRhaHai.following.splice(index2, 1);
        await joFollowKarRhaHai.save();
        await jiskoFollowKarnaHai.save();
        return res.status(200).json({
            success: true,
            message: "User unfollowed"
        })
    }
    jiskoFollowKarnaHai.followers.push(req.user._id);
    joFollowKarRhaHai.following.push(req.params.id);
    await jiskoFollowKarnaHai.save();
    await joFollowKarRhaHai.save();
    return res.status(200).json({
        success: true,
        message: "Followed successfully"
    })

}
async function updatePassword(req, res, next) {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) return res.status(400).json({
            success: false,
            message: "All fields required"
        })
        const user = await UserModels.findById(req.user._id).select('+password');
        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password not matched"
            })
        }
        else {
            user.password = newPassword;
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Password updated successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function updateProfile(req, res, next) {
    try {
        const { name, email } = req.body;
        const user = await UserModels.findById(req.user._id);
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (req.body.avatar !== "") {
            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "socialAvatars",
                width: 150,
                crop: "scale"
            })
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function deleteAccount(req, res, next) {
    try {
        const user = await UserModels.findById(req.user._id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const posts = user.posts;
        const followers = user.followers;
        const followings = user.following;
        const userId = user._id;
        res.cookie("socialToken", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        await user.deleteOne();
        for (let i = 0; i < posts.length; i++) {
            const post = await PostModels.findById(posts[i]);
            const postImageId = await post.image.public_id;
            await cloudinary.v2.uploader.destroy(postImageId)
            await post.deleteOne();
        }
        for (let i = 0; i < followers.length; i++) {
            const follower = await UserModels.findById(followers[i]);
            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1);
            await follower.save();
        }
        for (let i = 0; i < followings.length; i++) {
            const following = await UserModels.findById(followings[i]);
            const index = following.followers.indexOf(userId);
            following.followers.splice(index, 1);
            await following.save();
        }
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully"
        })
    } catch (error) {

        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
async function myProfile(req, res, next) {
    try {
        const user = await UserModels.findById(req.user._id).populate("posts followers following");
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function getAnyUser(req, res, next) {
    try {
        const user = await UserModels.findById(req.params.id).populate("posts followers following");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found",
                error: "Invalid user "
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function getAllUsers(req, res, next) {
    try {
        let users = await UserModels.find({});
        let exceptMeAndMyFollowingList = users.filter((item) => item._id.toString() !== req.user._id.toString())
        res.status(200).json({
            success: true,
            users: exceptMeAndMyFollowingList
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function forgotPassword(req, res, next) {
    try {
        const user = await UserModels.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            })
        }
        const resetPasswordToken = await user.getResetPasswordToken();
        await user.save();
        const resetUrlLink = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetPasswordToken}`
        const message = `Your are receiving this email because you (or someone else) has requested the reset of a password for INSTA-PRO. Please click on the link given below or ignore it if you have not requested \n\n ${resetUrlLink}`
        try {
            await sendEmail({ email: user.email, subject: "Reset password INSTA-PRO", message })
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`
            })
        } catch (error) {
            user.resetPasswordExpires = undefined;
            user.resetPasswordToken = undefined
            await user.save();
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function resetPassword(req, res, next) {
    try {
        const token = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await UserModels.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: true,
                message: "Your resetPassword token has been Expired or Invalid."
            })
        }
        user.password = req.body.password;
        user.resetPasswordExpires = undefined
        user.resetPasswordToken = undefined
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Your password has been updated"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {
    register, login, logout, follow, updatePassword, updateProfile, deleteAccount,
    myProfile, getAnyUser, getAllUsers, forgotPassword, resetPassword
}