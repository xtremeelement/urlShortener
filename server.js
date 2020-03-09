const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const db = require("./models/url");
const cors = require("cors");

//setting up DB connection to mongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/urlShortener",
  {
    //settings to avoid deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//setting ejs middleware as our templating engine
app.set("view engine", "ejs");

app.use(cors());

//middleware to use a body parser and set nested objects to false
app.use(express.urlencoded({ extended: false }));

//setting static folder to render css and other necessary static files instead of routes
app.use(express.static("views"));

//the home/index route to render our site page
app.get("/", async (req, res) => {
  const urls = await db.find();
  res.render("index", { urls });
});

//post route to handle the url submission
app.post("/getUrl", async (req, res) => {
  await db.create({ target_url: req.body.fullUrl });
  res.redirect("/");
});

//route to handle the redirect once the tiny_url is clicked on
app.get("/:tinyUrl", async (req, res) => {
  const url = await db.findOne({ tiny_url: req.params.tinyUrl });
  if (url === null) return res.sendStatus(404);

  res.redirect(url.target_url);
});

//turning on the server
app.listen(port);
