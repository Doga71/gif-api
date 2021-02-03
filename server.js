//jshint esversion:6
const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let giphyData = [];

app.get("/",function(req,res){
  res.render("home",{result: giphyData});
});

app.get("/results", function(req,res){
  res.render("results",{result: giphyData});
});

app.post("/",function(req,res){

  const query = req.body.input;
  // console.log(query);
  const limit = req.body.limit;
  const api = "5n0TEYwFFcxS3GCFdf0egYhtksbx3OX8";
  const url =  "https://api.giphy.com/v1/gifs/search?q="+query+"&api_key="+api+"&limit="+limit;// limit,cat+dancing is query

  // https.get(url, function(response){
  //   console.log(response.statusCode);
  //   console.log(url);
  //
  //   response.on("data", function(response){
  //     const giphy = JSON.parse(response);
  //     res.send(giphy.data[0].images.original.url);
  //   });
  //
  // });
  //  https.get(url, function(response){
  //
  //    console.log(response.statusCode);
  //
  //    response.on("data",function(data) {
  //      const aaa = JSON.parse(data);
  //      console.log(aaa);
  //      const giphy = aaa.data[0].images.original.url;
  //      res.write("giphy is:"+ giphy);
  //     // res.send(data.data[0].images.original.url);
  //     res.send();
  //     res.redirect("result");
  //   });
  // });

  let options = {json: true};

  request(url , options, function(error, response, body) { // options
    if (error) {
        return  console.log(error)
    } else {
      // console.log(body);
      // const newData = body;
      // giphyData = newData;
      // return console.log(newData);
      // console.log(response);
      // console.log(body.data[0].images.original.url); // its working

      for(var i=0; i< limit; i++){
          // console.log(body.data[i].images.original.url);
          // res.write(body.data[i].images.original.url);
          const post = {
            url: body.data[i].images.original.url.toString()
          }
          giphyData.push(post);
      }

    }
  });
    res.redirect("/results");
});


app.listen("3000", function(){
  console.log("Server is running on port 3000");
});
