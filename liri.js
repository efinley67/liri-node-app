var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var twitterKeys = new twitter (keys);

var nodeArgs = process.argv;

if (nodeArgs[2] === "my-tweets") {

  var params = {screen_name: "efinley67", count: 20};

  twitterKeys.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
      console.log(error);
    }
      console.log(tweets);

  });
};

if (nodeArgs[2] === "movie-this") {

  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if(i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }

    else {
      movieName += nodeArgs[i];
    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Year);
      console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
};

var spotify = new Spotify ({
  id: "58d21f95af8c46c98eb4ee4e2f4646a0",
  secret: "f4ea463929e040bfbf303a2f2fa96e89",
});

if (nodeArgs[2] === "spotify-this-song") {

  var songSearch = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if(i > 2 && i < nodeArgs.length) {
      songSearch = songSearch + "+" + nodeArgs[i];
    }

    else {
      songSearch += nodeArgs[i];
    }
  }

  spotify.search({ type: "track", query: songSearch, limit:5 }, function(error, data) {
    if (error) {
      return console.log("Error ocurred: " + err);
    }

    else {
      var songInfo = data.tracks.items[0];

      console.log(songInfo.artists[0].name);
      console.log(songInfo.name);
      console.log(songInfo.album.name);
      console.log(songInfo.preview_url);
    }
  });
}

if (nodeArgs[2] === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    spotify.search({ type: "track", query: data, limit:5 }, function(error, data) {
      if (error) {
        return console.log("Error ocurred: " + err);
      }

      else {
        var songInfo = data.tracks.items[0];

        console.log(songInfo.artists[0].name);
        console.log(songInfo.name);
        console.log(songInfo.album.name);
        console.log(songInfo.preview_url);
      }
    });

  });

}
