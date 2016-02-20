'use strict';

function ImageSearch() {
  this.search = function(req, res) {
    res.json("search images!")
  };
  this.latest = function(req, res) {
    res.json("get latest!")
  };
}

module.exports = ImageSearch;