const Message = require('../models/message') 

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get_new_message = asyncHandler(async (req, res) => {
    res.render('newmessage')
})

exports.post_new_message = asyncHandler(async (req, res, next) => {
    console.log(req.body.message)
    console.log(res.locals.currentUser)
    if (res.locals.currentUser.member === true) {
        try {
      const message = new Message({
        text: req.body.message,
        date: new Date(),
        user: res.locals.currentUser._id
      });
      await message.save(); 
      res.redirect('/');
    } catch (error) {
      return next(err);
    }
    } else {
        res.send("You must be a Premium Member in order to post a new message!")
        // Tell user to become Premium Member
    }
})

exports.get_delete_message = asyncHandler(async (req, res) => {
  const [message] = await Promise.all([
    Message.findById(req.params.id).exec(),
  ]);

  if (message === null) {
    res.redirect("/");
  }

  res.render("message_delete", {
    title: "Delete message",
    message: message,
  });
})

exports.post_delete_message = asyncHandler(async (req, res) => {
  if (res.locals.currentUser.admin === true) {
    Message.findByIdAndDelete(req.params.id)
      .then(deletedDocument => {
      if (deletedDocument) {
        console.log('Document deleted successfully:', deletedDocument);
        res.redirect("/");
      } else {
        res.send('Document not found.')
      }
    })
    .catch(error => {
      console.error('Error deleting document:', error);
    });
    } else {
      res.send('You are not authorized to do that')
    }
})

exports.get_all_messages = asyncHandler(async (req, res) => {
  const allMessages = await Message.find({}, "text date user")
    .sort({ date: 1 })
    .populate("user")
    .exec();
  res.render("index", { user: res.locals.currentUser, messages: allMessages });
})