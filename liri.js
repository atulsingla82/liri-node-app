
//Data from keys.js to store twitter access keys

var keys = require('./keys.js');





// Set up other required variables

var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var colors  = require('colors');
var client = new Twitter(keys.twitterKeys);


// Stored Arguments Array

var nodeArgv = process.argv;
var command = process.argv[2];

// variable for movie or song

var x = "" ;

// attaches multiple word arguemts
for (var i = 3; i<nodeArgv.length;i++){

    if (1 > 3 && i < nodeArgv.length){

        x = x + "+" + nodeArgv[i];
    } else {

        // x = x + nodeArgv[i];
        x += nodeArgv[i];
    }
}

// Switch Case

switch(command){
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        if(x){
            spotifySong(x);
        } else{
            spotifySong("The Sign");
        }
        break;

    case "movie-this":
        if(x){
            omdbData(x)
        } else{
            omdbData("Mr. Nobody")
        }
        break;

    case "do-what-it-says":
        doWhat();
        break;

    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}".green);
        break;
}

function myTweets() {

    var params = {screen_name: 'asingla82'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                var date = tweets[i].created_at;


                console.log("");
                console.log("@asingla82:" + tweets[i].text.red + " created: " + date.substring(0, 19));
                console.log("");
                console.log("-------------------------------------------------------")
                console.log("");
            }
        } else {

            console.log('something went wrong'.bold);
        }


    });

}

function spotifySong(song) {

    var spotify = require('spotify');

    spotify.search({ type: 'track', query: song }, function(err, data) {

        if (err) throw err;
        //this sets the variable music to get the initial information from the object, just so it's easier to call in the for loop below
        var music = data.tracks.items;
        //this loops through the object that we get from spotify and then loops through each objects information to get what we need from spotify
        for (var i = 0; i<music.length; i++) {
            for (j = 0; j < music[i].artists.length; j++) {
                //artist
                console.log(colors.bgYellow("Artist: ") + music[i].artists[j].name);
                console.log("");
                // song name
                console.log(colors.bgYellow("Song Name: ") + music[i].name);
                console.log("");
                // link
                console.log(colors.bgYellow("Preview:") + music[i].preview_url);
                console.log("");
                //album
                console.log(colors.bgYellow("Album Name: ") + music[i].album.name + "\n");
                console.log("-------------------------------------------------------".bold)
            }

        }

    });
    
}

function omdbData(movie) {

    //  run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";
    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site
            var body = JSON.parse(body);

            // retrive results
            console.log(colors.bgRed("Title:" )+ body.Title);
            console.log("");
            console.log(colors.bgRed("Release Year: ") + body.Year);
            console.log("");
            console.log(colors.bgRed("IMdB Rating: ") + body.imdbRating);
            console.log("");
            console.log(colors.bgRed("Country: ") + body.Country);
            console.log("");
            console.log(colors.bgRed("Language: ") + body.Language);
            console.log("");
            console.log(colors.bgRed("Plot: ") + body.Plot);
            console.log("");
            console.log(colors.bgRed("Actors: ") + body.Actors);
            console.log("");
            console.log(colors.bgRed("Awards: ") + body.Awards);
            console.log("");
            console.log(colors.bgRed("Rotten Tomatoes Rating: ") + body.tomatoRating);
            console.log("");
            console.log(colors.bgRed("Rotten Tomatoes URL: ") + body.tomatoURL);
            console.log("");
            console.log(colors.bgRed("Website: ") + body.Website);
            console.log("--------------------------------------------------------------------".bold)


        } else{
            console.log('Error occurred.')
        }
        if(movie === "Mr. Nobody") {

            console.log("If you haven't watched 'Mr. Nobody', you should . It's on Netflix!");
            console.log("--------------------------------------------------------------------".bold)
            console.log("");
        }
    });

}