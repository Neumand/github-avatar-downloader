var request = require('request');
var fs = require('fs');
var token = require('./secrets');
console.log(token.GITHUB_TOKEN);
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  }
    request(options, function (err, res, body) {
      parsedBody = JSON.parse(body);
      cb(err, parsedBody);
    });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var url in result) {
    console.log("Avatar URL: " + result[url]["avatar_url"]);
  }
  // console.log("Result:", result);
});