'use strict';

var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var should = require('should');
var toJson = require('./index');

// describe('Create output file : ', function() {
//
//   it('Creates output.json', function(cb) {
//     // var stream = toJson({
//     //   strip: /^.+\/?\\?public\/?\\?/,
//     // });
//     var stream = toJson();
//
//     // var data = require('./output.json');
//     // data.should.not.equal(null);
//
//     stream.on('data', function() {});
//
//     stream.on('end', function() {
//       var data = require('./output.json');
//       console.log('printing data from test: ', String(data));
//       // data['/index.html'].should.equal('unicorns\n');
//       cb();
//     });
//
//     stream.write(new gutil.File({
//       base: __dirname,
//       path: __dirname + '/index.html',
//       contents: new Buffer('unicorns'),
//     }));
//
//     // stream.end();
//   });
//
// });

describe('It should store data', function() {

  it('should create empty object when it isNull()', function(done) {
    var stream = toJson();
    var streamFile = {
      isNull: function() {
        return false;
      },

      isStream: function() {
        return true;
      },

    };

    stream.on('error', function(err) {
      err.message.should.equal('Streaming not supported');
      done();
    });

    stream.write(streamFile);
  });

  it('should create output.json', function(done) {
    var stream = toJson();
    var streamPath = path.join(__dirname, '/index.html');
    var streamFile = new gutil.File({
      cwd: __dirname,
      base: __dirname,
      path: streamPath,
      contents: fs.readFileSync(streamPath),
    });

    console.log(streamFile);

    // stream.on('error', function(err) {
    //   err.message.should.equal('Streaming not supported');
    //   done();
    // });

    stream.on('data', function(data) {
      // console.log('data from test: ', data);
      // should.exist('./output.json');
    });

    stream.write(streamFile);

    stream.end();
  });

  // it('Store sample data', function(cb) {
  //
  //   var stream = toJson({
  //     strip: /^.+\/?\\?public\/?\\?/,
  //   });
  //
  //   stream.on('data', function(data) {
  //     console.log('data : ', data);
  //   });
  //
  //   stream.on('end', function() {
  //     var data = require('./output.json');
  //     data['/index.html'].should.equal('unicorns\n');
  //     cb();
  //   });
  //
  //   stream.write(new gutil.File({
  //     base: __dirname,
  //     path: __dirname + '/index.html',
  //     contents: new Buffer('unicorns'),
  //   }));
  //
  //   stream.end();
  //
  // });
  //
  // it('Store sample data with relative url', function(cb) {
  //
  //   var stream = toJson({
  //     relative: true,
  //     filename: 'output2.json',
  //   });
  //
  //   stream.on('data', function() {});
  //
  //   stream.on('end', function() {
  //     var data = require('./output2.json');
  //
  //     // data.keyset()[0].should.equal('public/index.html');
  //     cb();
  //   });
  //
  //   stream.write(new gutil.File({
  //     base: __dirname,
  //     path: __dirname + '/public/index.html',
  //     contents: new Buffer('unicorns'),
  //   }));
  //
  //   stream.end();
  //
  // });

});
