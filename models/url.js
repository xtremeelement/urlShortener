const mongoose = require("mongoose");
const shortId = require("shortid");

//defining the model/schema of our database
const urlSchema = new mongoose.Schema({
  //the original submitted url
  target_url: {
    type: String,
    required: true
  },
  //the dynamically created shortened url
  tiny_url: {
    type: String,
    required: true,
    default: shortId.generate
  }
});

module.exports = mongoose.model("shortUrl", urlSchema);
