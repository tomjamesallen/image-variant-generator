'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deleteFolderRecursive;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deleteFolderRecursive(path) {
  if (_fs2.default.existsSync(path)) {
    _fs2.default.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (_fs2.default.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        _fs2.default.unlinkSync(curPath);
      }
    });
    _fs2.default.rmdirSync(path);
  }
}