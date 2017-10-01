var request = require("request");
var keys = require("./keys");
var twitterKeys = keys;

var consumer_key = twitterKeys.consumer_key;
var consumer_secret = twitterKeys.consumer_secret;
var access_token_key = twitterKeys.access_token_key;
var access_token_secret = twitterKeys.access_token_secret;

console.log(consumer_key);
console.log(consumer_secret);
console.log(access_token_key);
console.log(access_token_secret);


// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
//
//   if (!error && response.statusCode === 200) {
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });
