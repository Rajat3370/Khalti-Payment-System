const express = require("express");
const app = express();
const port = 3000;
const request = require("request");
const bodyParser = require("body-parser");

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payment", (req, res) => {
  const data = {
    amount: 1300,
    token: "testToken",
    currency: "USD",
    description: "Test Payment",
  };

  const headers = {
    Authorization: "test_public_key_30b8f76bd5114d07b1f0d874cf9f1e5f",
  };

  // Make request to payment gateway API
  request.post(
    {
      url: "https://api.paymentgateway.com/pay",
      headers: headers,
      body: data,
      json: true,
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error processing payment.");
      } else {
        console.log(body);
        res.status(200).send("Payment processed successfully.");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
