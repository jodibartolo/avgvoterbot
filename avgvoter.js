\

// DEBUG
var debug = false;		

// Include configuration file

var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);
var stream = T.stream('user');
var Alabama	= ['32.80', '-86.50', '33.00', '-87.50']
var Alaska	=['61.37', '-152.40' ]
var Arizona	= ['33.72','-111.43']
var California = ['36.11', '-119.68']
var Colorado = ['39.05', '-105.31']
var Connecticut	= ['41.59	', '-72.75']
var Delaware = ['39.318', '-75.507']
var DistrictC =	['38.89', '-77.02']
var Florida = ['27.766', '-81.686']
var Georgia	=['33.040', '-83.643']
var Hawaii	=['21.094', '-157.498']
var Idaho	=['44.240', '-114.478']
var Illinois	=['40.349457', '-88.986137']
var Indiana	=['39.849426','-86.258278']
var Iowa	=['42.011539', '-93.210526']
var Kansas	=['38.526600', '-96.726486']
var Kentucky	=['37.668140', '-84.670067']
var Louisiana	=['31.169546', '-91.867805']
var Maine =	['44.693947', '-69.381927']
var Maryland	=['39.063946', '-76.802101']
var Massachusetts=	['42.230171', '-71.530106']
var Michigan	=['43.326618', '-84.536095']
var Minnesota	=['45.694454', '-93.900192']
var Mississippi	=['32.741646', '-89.678696']
var Missouri	=['38.456085', '-92.288368']
var Montana	=['46.921925', '-110.454353']
var Nebraska	=['41.125370', '-98.268082']
var Nevada	=['38.313515', '-117.055374']
var NewHampshire=	['43.452492', '-71.563896']
var NewJersey	=['40.298904', '-74.521011']
var NewMexico=	['34.840515', '-106.248482']
var NewYork	=['42.165726', '-74.948051']
var NorthCarolina=	['35.630066', '-79.806419']
var NorthDakota	=['47.528912', '-99.784012']
var Ohio	=['40.388783', '-82.764915']
var Oklahoma	=['35.565342', '-96.928917']
var Oregon	=['44.572021', '-122.070938']
var Pennsylvania	=['40.590752', '-77.209755']
var RhodeIsland	=['41.680893', '-71.511780']
var SouthCarolina=	['33.856892','-80.945007']
var SouthDakota	=['44.299782', '-99.438828']
var Tennessee	=['35.747845', '-86.692345']
var Texas=	['31.054487', '-97.563461']
var Utah=	['40.150032', '-111.862434']
var Vermont=	['44.045876', '-72.710686']
var Virginia	=['37.769337', '-78.169968']
var Washington	=['47.400902', '-121.490494']
var WestVirginia	=['38.491226', '-80.954453']
var Wisconsin=	['44.268543', '-89.616508']
var Wyoming	=['42.755966', '-107.302490']

var states = [Alaska, Alabama, Georgia, Florida, WestVirginia, Wisconsin,
			Washington, Vermont, Utah, Texas, Tennessee, SouthDakota, SouthCarolina,
		Wyoming, RhodeIsland, Pennsylvania, Oregon, Oklahoma, Ohio, NorthDakota,
		NorthCarolina, NewYork, NewMexico, NewJersey, NewHampshire, Michigan, Minnesota,
		Nevada, Nebraska, Montana, Mississippi, Missouri, Massachusetts, Maryland,
		Louisiana, Kentucky, Kansas, Iowa, Indiana, Illinois, Idaho, Hawaii, DistrictC,
		Arizona, California, Colorado, Connecticut, Maine]

var stateStrings = [["Alabama","Kay Ivey", "Walt Maddox"],
					["Alaska", "Mark Begich", "Mike Dunleavy"],
					["Georgia", "Brian Kemp", "Stacey Abrams"],
					["Florida", "Ron DeSantis", "Andrew Gillum"],
					["Wisconsin", "Tony Evers", "Scott Walker"],
					["Vermont", "Christine Hallquist", "Phil Scott"],
					["Texas", "Greg Abbott", "Lupe Valdez"],
					["Tennessee", "Karl Dean", "Bill Lee"],
					["SouthDakota", "Kristi Noem", "Billie Sutton"],
					["SouthCarolina", "James E. Smith Jr.", "Henry McMaster"],
				["Wyoming", "Mark Gordon", "Mary Throne"],
				["RhodeIsland", "Gian Raimondo"],
				["Pennsylvania", "Tom Wolf", "Scott Wagner"],
				["Oregon", "Kate Brown", "Knute Buehler"],
				["Oklahoma", "Kevin Stitt", "Drew Edmondson"],
				["Ohio", "Mike DeWine", "Richard Cordray"],
				["NewYork", "Andrew Cuomo", "Marcus Moinaro"],
				["NewMexico", "Michelle Lujan Grisham", "Steve Pearce"],
				["NewHampshire", "Chris Sununu", "Molly Kelly"],
				["Michigan", "Bill Schuette", "Gretchen Whitmer"],
				["Minnesota", "Tim Walz", "Jeff Johnson"]
				["Nevada", "Adam Laxalt", "Steve Sisolak"],
				 ["Nebraska", "Pete ricketts", "Bob Krist"],
				["Maryland", "Larry Hogan", "Benjamin Jealous"],
				["Kansas", "Laura Kelly", "Kris Kobach"],
				["Iowa", "Kim Reynolds", "Fred Hubbel"],
				["Illinois", "Penny Pritzker", "Bruce Rauner"],
				["Idaho", "Paulette Jordan", "Brad Little"],
				["Hawaii", "David Ige", "Andria Tupola"],
				["Arizona", "Doug Ducey", "David Garcia"],
				["California", "Gavin Newsom", "John H. Cox"],
				["Colorado", "Jared Polis", "Walker Stapleton"],
				["Connecticut", "Ned Lamont", "Mark Boughton"],
				["Maine", "Janet Mills", "Shawn Moody"]]





// Helper function for arrays, picks a random thing
Array.prototype.pick = function() {
	return this[Math.floor(Math.random()*this.length)];
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function retweeting() {

var voteSearch = {q: "#vote", count:20, result_type: "recent"};

T.get('search/tweets', voteSearch, function(error, data) {

	console.log(error, data);
// If our search request to the server had no errors...
	if (!error) {
  // ...then we grab the ID of the tweet we want to retweet...
  	var retweetId = data.statuses[0].id_str;
  // ...and then we tell Twitter we want to retweet it!
  	T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
	  	if (response) {
		  console.log('Success! Check your bot, it should have retweeted something.')
	  	}
	  // If there was an error with our Twitter call, we print it out here.
	  	if (error) {
		  console.log('There was an error with Twitter:', error);
	  	}
  })
}
// However, if our original search request had an error, we want to print it out here.
	else {
  console.log('There was an error with your hashtag search:', error);
}
});
}

function tweeting() {
var pre = [	"Make sure to go out and vote!",
			"Want to know which party they are with? Well there is always Google :)",
			"Wait... that's my dad's name... dad??",
			"get out to the polls!",
			"Did your girlfriend vote yet?",
			"Do you need help getting to the polls??",
			"Wait... two people!?!? I didn't know I actually get to choose!!",
			"Man, I didn't know it was already time to vote for a new president ....",
			"Ahhh so THIS is what democracy means!",
			"'Was eating a candy bar at the polls...They told me to throw it away :(' - John Doe",
			"'Which one of these candidates looks good in a leather jacket' - James Dean",

		  ]

var randStatenum = stateStrings[Math.floor(Math.random() * 36) + 1];
var randState = randStatenum[0];

var stateText = randStatenum[1] + " and " + randStatenum[2];
T.post('statuses/update', {status: "#" + randState + ": These are your main candidates for Governor!: " + stateText
 + ". " + pre.pick() + " #vote #america" }, function (error, reply) {
	if (error != null){
		console.log('Error: ', error);
	}
	else {
		console.log('Tweeted: ', stateText);
	}
});
}

function following() {
T.get('statuses/mentions_timeline', { count:50, include_rts:1 },  function (err, reply) {
	  if (err !== null) {
		console.log('Error: ', err);
	  }
	  else {
		var sn = reply.pick().user.screen_name;
		if (debug)
			console.log(sn);
		else {
			//Now follow that user
			T.post('friendships/create', {screen_name: sn }, function (err, reply) {
				if (err !== null) {
					console.log('Error: ', err);
				}
				else {
					console.log('Followed: ' + sn);
				}
			});
		}
	}
});
}

function runBot() {
	var rand = Math.random();

if(rand <= 1.60) {
	console.log("-------Tweet something");
	tweeting();

} else if (rand <= 0.80) {
	console.log("-------Tweet something @someone");
	retweeting();

} else {
	console.log("-------Follow someone who @-mentioned us");
	following();
}
T.get('search/tweets', {q: "#vote"}, function(err, data, response) {
  // If there is no error, proceed
  if(err){
    return console.log(err);
  }

  // Loop through the returned tweets
  const tweetsId = data.statuses
    .map(tweet => ({ id: tweet.id_str }));

  tweetsId.map(tweetId => {
    T.post('favorites/create', tweetId, (err, response) => {
      if(err){
        return console.log(err[0].message);
      }

      const username = response.user.screen_name;
      const favoritedTweetId = response.id_str;
      console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);

    });
  });
  })


}
runBot();
setInterval(runBot, 1000 * 60 * 60);
