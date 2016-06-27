'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dirPath, mode, callback) {
  if (typeof mode === 'function') {
    callback = mode;
    mode = undefined;
  }

  // Call the standard fs.mkdir
  _fs2.default.mkdir(dirPath, mode, function (error) {
    // When it fail in this way, do the custom steps
    if (error && error.errno === -2) {
      // Create all the parents recursively
      _fs2.default.mkdirParent(_path2.default.dirname(dirPath), mode, callback);
      // And then the directory
      _fs2.default.mkdirParent(dirPath, mode, callback);
    }
    // Manually run the callback since we used our own callback to do all these
    callback && callback(error);
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }