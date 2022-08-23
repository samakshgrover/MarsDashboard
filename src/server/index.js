require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

app.get("/Curiosity", (req, res) => {
  axios
    .get(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=${process.env.API_KEY}`
    )
    .then((resp) => {
      axios
        .get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.API_KEY}`
        )
        .then((lp) => {
          const one = resp.data.photo_manifest;
          one.photos = undefined;

          const two = lp.data.latest_photos;

          res.send({ manifesto: one, photos: two });
        });
    });
});

app.get("/Opportunity", (req, res) => {
  axios
    .get(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity?api_key=${process.env.API_KEY}`
    )
    .then((resp) => {
      axios
        .get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=${process.env.API_KEY}`
        )
        .then((lp) => {
          const one = resp.data.photo_manifest;
          one.photos = undefined;

          const two = lp.data.latest_photos;

          res.send({ manifesto: one, photos: two });
        });
    });
});

app.get("/Spirit", (req, res) => {
  axios
    .get(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/Spirit?api_key=${process.env.API_KEY}`
    )
    .then((resp) => {
      axios
        .get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=${process.env.API_KEY}`
        )
        .then((lp) => {
          const one = resp.data.photo_manifest;
          one.photos = undefined;
          const two = lp.data.latest_photos;

          res.send({ manifesto: one, photos: two, res: resp.data });
        });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
