const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { urlencoded } = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
    
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const unit = "imperial";
    const apiKey = "d1a71af7e2d20dcf2e9fd80e5aeec36c";
    const api_link = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; 
    https.get(api_link, function(response){
        //console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      
            
            res.write("<h1>The temperature in "+ query + " is " + temperature + " degrees Celsius</h1>");
            res.write("<p>The weather is currently " + desc+"</p>");
            res.write("<img src="+ weatherImage +">");
            res.send();
            
        })
    })

})



app.listen(3000, function(){
    console.log("Server is running on port 3000.")
});