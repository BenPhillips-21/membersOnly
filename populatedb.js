#! /usr/bin/env node

console.log(
  'This script populates the database with some maps, users, and map types.'
);

const userArgs = process.argv.slice(2);

const Message = require('./models/message');
const User = require('./models/user');

const messages = [];
const users = [];

const mongoose = require('mongoose');

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createUsers();
  await createMessages();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function messageCreate(index, text, date, user) {
  const message = new Message({ text: text, date: date, user: user });
  await message.save();
  messages[index] = message;
  console.log(`Added message: ${text}`);
}

async function userCreate(index, username, password) {
  const userdetail = { username: username, password: password };
  const user = new User(userdetail);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function createMessages() {
  let date = new Date();
  await Promise.all([
    messageCreate(
      0,
      'I love coding',
      date,
      users[0]._id
    ),
    messageCreate(
      1,
      'my name Jeff',
      date,
      users[1]._id
    ),
    messageCreate(
      2,
      'Christ is King',
      date,
      users[2]._id
    ),
    messageCreate(
      3,
      'Love me country, simple as',
      date,
      users[2]._id
    ),
  ]);
}

async function createUsers() {
  await Promise.all([
    userCreate(
      0,
      'MexicanJeff',
      'secretMexicanpassword'
    ),
    userCreate(
      1,
      'ItalianMario',
      'superSecretItalianPassword'
    ),
    userCreate(
      2,
      'FrenchPierre',
      'topSecretFrenchPassword'
    ),
  ]);
}
