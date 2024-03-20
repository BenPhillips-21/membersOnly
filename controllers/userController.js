const User = require('../models/user')

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
    res.render("register")
})

exports.register_post = asyncHandler(async (req, res, next) => {
    res.render("register")
})

exports.login = asyncHandler(async (req, res, next) => {
    res.render("login")
})