var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')

/* GET home page. */
router.get("/", (req, res) => {
  console.log(res.locals.currentUser)
  res.render("index", { user: req.user });
});

router.get("/register", user_controller.register);

router.post("/register", user_controller.validate_sign_up, user_controller.handle_validation_errors, user_controller.register_post);

router.get("/login", user_controller.login_get);

router.post("/login", user_controller.login_post);


module.exports = router;

