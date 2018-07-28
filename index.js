'use strict';
module.exports = function () {
  throw new Error("Don't instantiate directly! Use require('react-column-resizer')");
};

module.exports.Rows = require('./build/dist.js').ColumnResizer;
