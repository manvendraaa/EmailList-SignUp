const express = require("express");
const { post } = require("request");
// const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require('https');

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

app.get("/",function(req,res){
	res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;
	var data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_feilds: {
                    FNAME: firstName,
                    LNAME: lastName
                }
			}
		]
	};
	var jsonData = JSON.stringify(data);

	const url = "https://us6.api.mailchimp.com/3.0/lists/313a362295";
	const options = {
		
		method: "POST",
		auth: "manvendra:bbca7794cf3937ac44a73cbac68785fd-us6",
		// body: jsonData

	}
	// request(options,function(error,response,body){
	// 	if(error){
	// 		console.log(error);
	// 	}else{
	// 		console.log(response.statusCode);
	// 	}
	// })
	const request = https.request(url,options, (response) => {
		console.log(response.statusCode);
		if(response.statusCode == 200){
			res.end("success");
		}
		else {
			res.end("fail");
		}

		response.on("data", (data) => {
            // console.log(JSON.parse(data));
        });
	})
	request.write(jsonData);
    request.end();

});

app.listen(3000,function(){
	console.log("Running on port 3000");
});

// bbca7794cf3937ac44a73cbac68785fd-us6
// list id: 313a362295