
// write the code you need to grab the data from keys.js. Then store the keys in a variable.

var sourceFile = require('./keys.js');
// console.log(sourceFile.twitterKeys);

var request = require('request')
var fs = require('fs');
var question = process.argv[2];

//  Make it so liri.js can take in one of the following commands:
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says` 

var Twitter = require('twitter');

	//Twtitter section-

if(question === "my-tweets"){
	 
		var client = new Twitter(sourceFile.twitterKeys);
		 
		var params = {screen_name: 'nodejs'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    console.log(tweets);
			}
		});
}
	//end of Twitter section


	var spotify = require('spotify')

	//Spotify Section

if(question === "spotify-this-song"){
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
        if(process.argv[3]){
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                
                console.log(data[i].name); //song track name
                console.log(data[i].album.href); //url 
                console.log(data[i].album.name); //album name
                console.log(data[i].preview_url); //preview link to the song
            
                for(var j =0; j < data[i].artists.length; j++){
                    console.log(data[i].artists[j].name); //artist's name
                }
            }
        }else{
            spotify.search({ type: 'track', query: "what's my age again"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); //song track name
                console.log(data[0].album.href); //url 
                console.log(data[0].album.name); //album name
                console.log(data[0].preview_url); //preview link to the song
                console.log(data[0].artists[0].name); //artist's name
            });
        }
    });
    outputText();
}
	//End of Spotify section


// var omdb = require('omdb');

	//OMDB section

if(question === "movie-this"){	
    console.log(process.argv);
    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true",function (error, response, body){
        
        if(process.argv[3]){
        console.log(body);  
       
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true",function(error, response,body){
                console.log(body);
            
            })
        }
    })
    // outputText();
}

	//end of OMDB
if(question === " do-what-it-says"){

    fs.readFile('random.txt', "utf8", function(err, data){
        console.log(data);
    });
    outputText(); 
}

function outputText(){
        console.log(spotify.response + twitter.response + OMDB.response)
    }
	