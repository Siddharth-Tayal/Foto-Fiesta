const express = require("express");
const { createPost, likeUnlike, deletePost, getPostOfJinkoFollowKarRhaHoon, updateCaptions, addComment, deleteComment, myPosts, deleteCommentAdmin, getAnyUserPosts } = require("../controllers/post.controllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post('/upload', isAuthenticated, createPost);
router.get('/posts', isAuthenticated, getPostOfJinkoFollowKarRhaHoon)
router.get('/posts/:id', isAuthenticated, getAnyUserPosts)
router.get('/myposts', isAuthenticated, myPosts)
router.route('/:id').get(isAuthenticated, likeUnlike).delete(isAuthenticated, deletePost).put(isAuthenticated, updateCaptions)
router.route('/comment/:id').put(isAuthenticated, addComment).delete(isAuthenticated, deleteComment).post(isAuthenticated, deleteCommentAdmin)
module.exports = router;