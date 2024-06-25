const express = require("express");
const { register, login, follow, logout, updatePassword, updateProfile, deleteAccount, myProfile, getAnyUser, getAllUsers, forgotPassword, resetPassword } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.get('/logout', logout);
router.put("/updatePassword", isAuthenticated, updatePassword);
router.put('/updateProfile', isAuthenticated, updateProfile);
router.get('/follow/:id', isAuthenticated, follow);
router.delete('/delete', isAuthenticated, deleteAccount);
router.get('/me', isAuthenticated, myProfile);
router.get('/users', isAuthenticated, getAllUsers);
router.post('/password/forgot', forgotPassword);
router.put('/resetPassword/:token', resetPassword);
router.get('/:id', isAuthenticated, getAnyUser);

module.exports = router;