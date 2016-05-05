'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var fs = require('fs');

module.exports = function(options) {

  var files = {};

  options = options ? options : {};
  options.filename = options.filename || 'output.json';
  options.relative = options.relative || false;
  options.strip = options.strip || false;
  options.trim = options.trim || /(.*)\//;
  options.sync = options.sync || false;

  return through.obj(function(file, enc, cb) {

    console.log('file: ', String(file[2]));

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-file-content-to-json', 'Streaming not supported'));
      return cb();
    }

    var path = file.path;
    if (options.relative) {
      path = file.relative;
    }

    console.log('path_original: ', path);

    if (options.strip) {
      path = path.replace(options.strip, '');
    }

    console.log('replaced path: ', path);
    var fileContents = fs.readFileSync(path, 'utf8');

    if (options.trim) {
      path = path.replace(options.trim, '');
    }

    files[path] = fileContents;
    console.log('files: ', files);

    this.push(file);

    console.log('attempting to write to file: ', options.filename);
    console.log('files in output attempt: ', JSON.stringify(files));

    // fs.writeFile(options.filename, JSON.stringify(files), cb);
    fs.writeFile(options.filename, JSON.stringify(files, null, 2), cb);

    return cb();
  });
};
