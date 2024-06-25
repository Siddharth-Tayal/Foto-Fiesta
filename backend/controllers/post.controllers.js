const PostModels = require("../models/Post.models");
const UserModels = require("../models/User.models");
const cloudinary = require("cloudinary")
async function createPost(req, res) {
    try {
        const cloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "posts"
        })
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: cloud.public_id,
                url: cloud.secure_url
            },
            owner: req.user._id
        }
        const newPost = await PostModels.create(newPostData);
        const user = await UserModels.findById(req.user._id);
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json({
            success: true,
            post: newPost,
            message: "Post created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function likeUnlike(req, res) {
    try {
        const post = await PostModels.findById(req.params.id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "No post exists"
            })
        }
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Unliked"
            })
        }
        else {
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Liked"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function deletePost(req, res, next) {
    try {
        const post = await PostModels.findById(req.params.id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "No post exists"
            })
        }
        const isMatch = post.owner.toString() !== req.user._id
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const imageId = post.image.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        await post.deleteOne();
        const user = await UserModels.findById(req.user._id)
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Post deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function getPostOfJinkoFollowKarRhaHoon(req, res, next) {
    try {
        const joFollowKarRhaHai = await UserModels.findById(req.user._id);
        const posts = await PostModels.find({
            owner: {
                $in: joFollowKarRhaHai.following
            }
        }).populate("owner likes comments.user")
        res.status(200).json({
            success: true,
            posts: posts.reverse()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function updateCaptions(req, res, next) {
    try {
        const { caption } = req.body;
        const post = await PostModels.findById(req.params.id);
        if (!post) return res.status(400).json({
            success: false,
            message: "Post not found"
        })
        const user = await UserModels.findById(req.user._id);
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized"
            })
        }
        post.caption = caption;
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Post updated successfully.",
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function addComment(req, res, next) {
    const post = await PostModels.findById(req.params.id);
    if (!post) return res.status(400).json({
        success: false,
        message: "No post found."
    })
    //checking if comment exist or not
    let commentIndex = -1;
    post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
            commentIndex = index;
        }
    })
    if (commentIndex !== -1) {
        post.comments[commentIndex].comment = req.body.comment;
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Comment updated successfully"
        })
    }
    post.comments.push({ user: req.user._id, comment: req.body.comment });
    await post.save();
    return res.status(200).json({
        success: true,
        message: "Comment added successfully."
    })
}
async function deleteComment(req, res, next) {
    try {
        const post = await PostModels.findById(req.params.id)
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found."
            })
        }
        const postOwnerId = post.owner.toString();
        const requestUserId = req.user._id.toString();
        const isEqual = postOwnerId === requestUserId;
        if (isEqual) {
            console.log(req.body.commentId)
            if (req.body.commentId === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "CommentId is required."
                })
            }
            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1);
                }
            })
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Selected comment deleted."
            })
        }
        else {
            let commentIndex = -1;
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    commentIndex = index;
                }
            })
            post.comments.splice(commentIndex, 1);
            await post.save();
        }
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully."
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function deleteCommentAdmin(req, res, next) {
    try {
        const post = await PostModels.findById(req.params.id)
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found."
            })
        }
        const postOwnerId = post.owner.toString();
        const requestUserId = req.user._id.toString();
        const isEqual = postOwnerId === requestUserId;
        if (isEqual) {
            if (req.body.commentId === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "CommentId is required."
                })
            }
            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1);
                }
            })
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Selected comment deleted."
            })
        }
        else {
            let commentIndex = -1;
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    commentIndex = index;
                }
            })
            post.comments.splice(commentIndex, 1);
            await post.save();
        }
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully."
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function myPosts(req, res, next) {
    try {
        const joFollowKarRhaHai = await UserModels.findById(req.user._id);
        const posts = await PostModels.find({
            owner: {
                $in: req.user._id
            }
        }).populate("owner likes comments.user")
        res.status(200).json({
            success: true,
            posts: posts.reverse()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
async function getAnyUserPosts(req, res, next) {
    try {
        const user = await UserModels.findById(req.params.id);
        const posts = await PostModels.find({ owner: user._id }).populate("owner likes comments.user")
        res.status(200).json({
            success: true,
            posts: posts.reverse()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {
    myPosts, createPost, deletePost, likeUnlike, getPostOfJinkoFollowKarRhaHoon, updateCaptions, addComment, deleteComment, deleteCommentAdmin, getAnyUserPosts
}