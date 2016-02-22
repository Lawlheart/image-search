'use strict';

var cors = require('cors');
var ImageSearch = require(process.cwd() + '/app/controllers/imageSearch.server.js');

module.exports = function (app, db) {
  var imageSearch = new ImageSearch(db);

  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/api/imagesearch/:search')
    .get(cors(), imageSearch.search)

  app.route('/api/latest/imagesearch')
    .get(cors(), imageSearch.latest)

};
