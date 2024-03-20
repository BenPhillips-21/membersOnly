var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get("/register", user_controller.register);

router.post("/register", user_controller.register_post);

router.get("/login", user_controller.login);


module.exports = router;

