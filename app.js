const express = require("express");
// const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extented: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  //console.log(firstName, lastName, email);

  const data = {

    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/6cd2a1cf85/members"
  const options = {

    method: "POST",
    auth: "farhan1:f82f96a2e97188f59489d63d2d8929bc-us14"

  };

  const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {

  console.log("Server started on port 3000");

});









// API KEY
// 2181f9ef21c051176eaead115a06c6ee-us14
//f82f96a2e97188f59489d63d2d8929bc-us14

// list id
// 6cd2a1cf85
