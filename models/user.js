const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: { type: String, required: true },
    password: { type: String, required: true },
    member: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
})

UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name} ${this.family_name}`;
  }

  return fullname;
});

module.exports = mongoose.model("User", UserSchema);