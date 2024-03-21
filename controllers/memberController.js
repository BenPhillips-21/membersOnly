const asyncHandler = require("express-async-handler");
const User = require('../models/user');
require('dotenv').config()

let passcode = process.env.SECRET_KEY
let adminKey = process.env.ADMIN_KEY

exports.get_member_page = (req, res) => {
    res.render("jointheclub");
}

exports.post_member_page = (req, res) => {    
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
        res.send("User update unsuccessful")
    }
}

exports.get_admin = (req, res) => {
    res.render("becomeadmin");
}

exports.post_admin = (req, res) => {    
    if (req.body.adminKey === adminKey) {
        User.findByIdAndUpdate(res.locals.currentUser._id, { admin: true }, { new: true })
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
        res.send("User update unsuccessful")
    }
}