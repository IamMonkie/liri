// Initialization
require("dotenv").config();
let keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var bandsintown = require("bandsintown");
// var spotify = new Spotify(keys.spotify);
var searchType = process.argv[2];
var searchValue = process.argv;

// Key Access
// for (let songs in keys) {
//   console.log("The");
// }

// Switch statement to determine which function will run.
switch (searchType) {
  case "concert-this":
    concert();
    break;

  case "spotify-this-song":
    song();
    break;

  case "movie-this":
    movie();
    break;

  case "what-it-says":
    says();
    break;
}

// ----------------------------------------------------
/*
// User Input Function
function userInput() {
  var searchValue = process.argv;
  var userInput = "";
  for (var i = 3; i < searchValue.length; i++) {
    if (i > 3 && i < searchValue.length) {
      userInput = userInput + "+" + searchValue[i];
    } else {
      userInput += searchValue[i];
    }
  }
}*/

// Bands in Town
// Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything

function concert() {
  var bandName = "";
  for (var i = 3; i < searchValue.length; i++) {
    if (i > 3 && i < searchValue.length) {
      bandName = bandName + "+" + searchValue[i];
    } else {
      bandName += searchValue[i];
    }
  }

  queryURL =
    "https://rest.bandsintown.com/artists/" +
    bandName +
    "?app_id=codingbootcamp";

  var currentDate = moment();
  //var now = moment().format('MMMM Do YYYY) probably not needed
  bandsintown
    .getArtistEventList(bandName, currentDate)
    .then(function(response) {
      console.log("Upcoming Concerts for: " + response.name);

      // Constructing HTML containing the artist information
      var artistName = response.searchValue;
      var artistURL = response.url.append(artistName);
      var upcomingEvents = response.upcoming_event_count;
      var goToArtist = response.url;

      // Empty the contents of the artist-div, append the new artist content
      console.log(
        "Artist: " +
          artistName +
          "\n" +
          "Upcoming Events: " +
          upcomingEvents +
          "\n" +
          "Artist Page: " +
          goToArtist
      );
    });
  /*
  bandsintown.getArtistEventList(bandName).then(function(response) {
    console.log("Events: " + response.name);
  });
  */
}

//Movie function
function movie() {
  var movieName = "";
  for (var i = 3; i < searchValue.length; i++) {
    if (i > 3 && i < searchValue.length) {
      movieName = movieName + "+" + searchValue[i];
    } else {
      movieName += searchValue[i];
    }
  }

  var axiosQuery =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=2413de60";

  axios.get(axiosQuery).then(
    function(response) {
      console.log(
        "The movie's title is: " +
          response.data.Title +
          "\n" +
          "Year Released: " +
          response.data.Year +
          "\n" +
          "IMDB Rating: " +
          response.data.imdbRating +
          "\n" +
          "Rotten Tomatoes Rating: " +
          response.data.Ratings[1].Value +
          "\n" +
          "Country: " +
          response.data.Country +
          "\n" +
          "Language: " +
          response.data.Language +
          "\n" +
          "Plot: " +
          response.data.Plot +
          "\n" +
          "Actors: " +
          response.data.Actors
      );
    },

    //Error Log
    function(err) {
      console.log(err);
    }
  );
}
/*
// Spotify function
function song() {
    var spotifySearch = "";
    for (var i = 3; i < searchValue.length; i++) {
      if (i > 3 && i < searchValue.length) {
        spotifySearch = spotifySearch + "+" + searchValue[i];
      } else {
        spotifySearch += searchValue[i];
      }
    }

    spotifySearch.search({ 
      type: 'track', 
      query: 'All the Small Things' }, 
      function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data); 
    });
    */
/*
//Says function
function says() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(err);
    }
    console.log("It Says to: " + data);
  });
}
*/
