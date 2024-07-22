import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "67bc4195-6db4-4701-be2c-e4374e4df149";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  //const URL = API_URL + "/secrets";
  const URL = "https://secrets-api.appbrewery.com/secrets";
  try {

    const response = await axios.post(URL, req.body, config);
    console.log("res : " + response.data);
    res.render("index.ejs", { content: JSON.stringify(response.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }

});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const URL2 = `https://secrets-api.appbrewery.com/secrets/${searchId}`;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  const obj = {
    secret: req.body.secret,
    score: req.body.score,
  };
  try {
    const response = axios.put(URL2, obj, config);
    res.render("index.ejs", { content: JSON.stringify((await response).data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const URL3 = `https://secrets-api.appbrewery.com/secrets/${searchId}`;
  console.log("ID: " + URL3);
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  const obj = {
    secret: req.body.secret,
    score: req.body.score,
  };
  try {
    const response = await axios.patch(URL3, obj, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });

  }
  res.redirect("/");

});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  const URL4 = `https://secrets-api.appbrewery.com/secrets/${searchId}`;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const result = await axios.delete(URL4, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
