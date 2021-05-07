// jshint esversion: 6
const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/40c377004a";
    const options = {
        method: "POST",
        auth: "aravindhsharma:84c39636aee032f94790de9dd60cf1c9-us1"

    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end();
});

app.post("/success", function (req, res) {
    res.redirect("/");
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("The server is started.");
});

// 84c39636aee032f94790de9dd60cf1c9-us1
// 40 c377004a