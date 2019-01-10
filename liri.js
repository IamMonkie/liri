// Initialization
require("dotenv").config();
let keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);
var searchType = process.argv[2];
var searchValue = process.argv;

/*
// Key Access
for (let songs in keys) {
  console.log("The");
}
*/
// Switch statement to determine which function will run.
switch (searchType) {
  case "concert-this":
    concert();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "what-it-says":
    says();
    break;
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

// Bands in Town
// Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything

function concert() {
  var queryURL =
    "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Printing the entire object to console
    console.log(response);

    // Constructing HTML containing the artist information
    var artistName = response.name;
    var artistURL = response.url.append(artistName);
    var upcomingEvents = response.upcoming_event_count;
    var goToArtist = response.url;

    // Empty the contents of the artist-div, append the new artist content
    console.log(
      "Artist: " +
        artistURL +
        "\n" +
        "Upcoming Events: " +
        upcomingEvents +
        "\n" +
        "Artist Page: " +
        goToArtist
    );
  });
}

//Says function
function says() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(err);
    }
    console.log("It Says to: " + data.toFixed(2));
  });
}

// ----------------------------------------------
/*
Make it so liri.js can take in one of the following commands:

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

* This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

  * Name of the venue

  * Venue location

  * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

* This will show the following information about the song in your terminal/bash window

  * Artist(s)

  * The song's name

  * A preview link of the song from Spotify

  * The album that the song is from

* If no song is provided then your program will default to "The Sign" by Ace of Base.

* You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

* The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

* Step One: Visit <https://developer.spotify.com/my-applications/#!/>

* Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

* Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

* Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

* This will output the following information to your terminal/bash window:

  ```
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
  ```

* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

  * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

  * It's on Netflix!

* You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

  * Edit the text in random.txt to test out the feature for movie-this and concert-this.
------------------------------------------------------------------------------------------------
demonstration
  node liri.js spotify-this-song come\ sail\ away
  node liri.js movie-this gladiator
  node liri.js concert-this metallica
  results popup in terminal
  Thu, Jan 3 2019 - Power of Packages -2:00 remaining
  */
