import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "campingl90";
const yourPassword = "meow";
const yourAPIKey = "5187-monm-ktro-9654";
const yourBearerToken = "tks1-524487-5544-1111-85447444";
const token = "67bc4195-6db4-4701-be2c-e4374e4df149";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  // var URl = API_URL + "random";
  // console.log("URL : " + URL);
  try {
    const response = await axios.get(API_URL + "random");

    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});


app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908

  var URL2 = "https://secrets-api.appbrewery.com/all?page=2";
  try {
    const result = await axios.get(URL2, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);

  }

});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  var URL3 = "https://secrets-api.appbrewery.com/filter?score>4";
  try {
    const result = await axios.get(URL3, {
      params: {
        apiKey: "9defc240-7e42-4b08-a166-10591bb0ff2c",
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);

  }



});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  var URL4 = "https://secrets-api.appbrewery.com/secrets/42";

  axios.get(URL4, config)
    .then(result => {
      res.render("index.ejs", { content: JSON.stringify(result.data) });

    }).catch(error => {
      res.status(404).send(error.message);

    });



});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
