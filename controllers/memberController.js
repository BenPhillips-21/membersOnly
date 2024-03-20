const asyncHandler = require("express-async-handler");
const User = require('../models/user');
require('dotenv').config()

let passcode = process.env.SECRET_KEY

exports.get_member_page = (req, res) => {
    console.log(res.locals.currentUser, "AHHHHHH")
    res.render("jointheclub");
}

exports.post_member_page = (req, res) => {
    console.log(req.body.passcode);
    console.log(passcode)
    // user needs to be logged in and we need to access res.locals.currentUser
    
    if (req.body.passcode === passcode) {
        User.findByIdAndUpdate(res.locals.currentUser._id, { member: true }, { new: true })
            .then(updatedUser => {
                if (updatedUser) {
                console.log('User updated successfully:', updatedUser);
                } else {
                console.log('User not found.');
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
        res.redirect('/')
    } else {
        console.log("try again goyim!")
    }
}