var request = require('request');
var fs = require('fs');
var token = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + "/contributors";
  headers = {
    'User-Agent': 'request',
    'Authorization': token.GITHUB_TOKEN
  }
  request(url, function (err, res, body) {
    cb(err, body);
  })
          // .on('error', function (error) {
            // console.log('Error: ' + error);
          // })
          // .on ('response', function(response) {
            // console.log('Contributor list populating...');
            // console.log('Reponse status code: ' + response.statusCode);
            // console.log('Reponse status message: ' + response.statusMessage);
          // })
          // .on('end', function () {
            // console.log('Contributor list has been downloaded!');
          // });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});