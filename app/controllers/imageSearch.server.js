'use strict';

var got = require('got');
var Search = require('../models/searches.js')

function getPage(page) {
  if(parseInt(page) > 0) {
    return parseInt(page);
  } else {
    return 1;
  }
}

function ImageSearch() {
  this.search = function(req, res) {
    var now = new Date();
    var newSearch = new Search({
      term: req.params.search,
      when: now.toISOString()
    }).save();
    got('https://www.googleapis.com/customsearch/v1', {
      query: {
        q: req.params.search,
        searchType: 'image',
        cx: '004310037984104487010:a8cws52qqm4',
        key: 'AIzaSyA_a45rPElyt_ihlHgfq-fwhRn7-vPqn48',
        start: getPage(req.query.offset)},
      json: true
    }).then(function(data) {
      var results = data.body.items.map(function(item) {
        return {
          url: item.link,
          snippet: item.snippet,
          thumbnail: item.image.thumbnailLink,
          context: item.image.contextLink
        }
      });
      res.json(results);
    });
  };

  this.latest = function(req, res) {
    Search.find().sort('-when').limit(10).exec(function(err, searches) {
      res.json(searches.map(function(search) {
        return {
          term: search.term,
          when: search.when
        }
      }));
    });
  };
}

module.exports = ImageSearch;