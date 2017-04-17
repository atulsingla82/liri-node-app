
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
            spotifySong("Fluorescent Adolescent");
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
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}".red);
        break;
}

function myTweets() {

    var params = {screen_name: 'asingla82'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                // var date = tweets[i].created_at;

                console.log("@asingla82:" + tweets[i].text);
                console.log("--------------------------------")
            }
        } else {

            console.log('something went wrong'.bold);
        }


    });

}
