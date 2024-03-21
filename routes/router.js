var express = require('express');
var router = express.Router();
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

const user_controller = require('../controllers/userController')
const member_controller = require('../controllers/memberController')
const message_controller = require('../controllers/messageController')

/* GET home page. */

router.get("/", message_controller.get_all_messages);

router.get("/register", user_controller.register);

router.post("/register", user_controller.validate_sign_up, user_controller.handle_validation_errors, user_controller.register_post);

router.get("/login", user_controller.login_get);

router.post("/login", user_controller.login_post);

router.get("/jointheclub", member_controller.get_member_page);

router.post("/jointheclub", member_controller.post_member_page);

router.get("/becomeadmin", member_controller.get_admin);

router.post("/becomeadmin", member_controller.post_admin);

router.get("/newmessage", message_controller.get_new_message);
// user must be signed in
router.post("/newmessage", message_controller.post_new_message);

router.get("/deletemessage/:id", message_controller.get_delete_message);

router.post("/deletemessage/:id", message_controller.post_delete_message);

module.exports = router;

