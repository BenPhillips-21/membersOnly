const mongoose = require("mongoose")
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
    text: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
})

MessageSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

MessageSchema.virtual("formattedDate").get(function () {
  const luxonDate = DateTime.fromJSDate(this.date);
  const formattedDate = luxonDate.toFormat('yyyy-MM-dd');
  return formattedDate;
})

module.exports = mongoose.model("Message", MessageSchema);