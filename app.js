const express = require("express");
const app = express();
const https = require('https');

app.use(express.static("public"));
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
		auth: "manvendra12:6b58669b72e684733c8fc6776115b808-us6"

	}
	const request = https.request(url,options, (response) => {
		console.log(response.statusCode);
		if(response.statusCode == 200){
			res.sendFile(__dirname + "/success.html");
			
		}
		else {
			res.sendFile(__dirname + "/failure.html");
		}

		response.on("data", (data) => {
            // console.log(JSON.parse(data)); 
        });
	})
	request.write(jsonData);
    request.end();

});
app.post('/failure',function(req,res){
	res.redirect('/');
})

app.listen( process.env.PORT ||3000 ,function(){
	console.log("Server is Running");
});

// bbca7794cf3937ac44a73cbac68785fd-us6
// list id: 313a362295

