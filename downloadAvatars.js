var https = require('https');
var request = require('request');
var fs = require('fs');
var token = require('./secrets');
var repoOwner = process.argv[2];
var repoName = process.argv[3];
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    console.log("Error: please input the repo owner and repo name as command line arguments.");
  }
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  }
    request(options, function (err, res, body) {
      parsedBody = JSON.parse(body);
      for (var each in parsedBody) {
        cb(parsedBody[each]["avatar_url"], `avatars/${each.login}.jpg`);
      }
    });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
        .on ('error', function(err) {
          throw err;
        })
        .on('response', function(response) {
          console.log('Download avatars...');
          console.log('Response status code: ' + response.statusCode);
          console.log('Response status message: ' + response.statusMessage);
          console.log('Response content type: ' + response.headers["content-type"]);
        })
        .on('end', function () {
        console.log('Avatar download complete!');
        })
        .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, downloadImageByURL);