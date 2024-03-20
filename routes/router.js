var express = require('express');
var router = express.Router();
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

const user_controller = require('../controllers/userController')
const member_controller = require('../controllers/memberController')

/* GET home page. */

// find all messages put them in allMessages variable an pass it to '/'
router.get("/", asyncHandler(async (req, res) => {
  const allMessages = await Message.find({}, "text date user")
    .sort({ date: 1 })
    .populate("user")
    .exec();
  res.render("index", { user: res.locals.currentUser, messages: allMessages });
}))

router.get("/register", user_controller.register);

router.post("/register", user_controller.validate_sign_up, user_controller.handle_validation_errors, user_controller.register_post);

router.get("/login", user_controller.login_get);

router.post("/login", user_controller.login_post);

router.get("/jointheclub", member_controller.get_member_page);

router.post("/jointheclub", member_controller.post_member_page);

module.exports = router;

