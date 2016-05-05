

Create json file mapping sources to their content. Modified from https://github.com/danielhusar


## Install

```sh
npm install --save-dev gulp-file-content-to-json
```

## Example

```js
var gulp = require('gulp');
var toJson = require('gulp-to-json');

gulp.task('tojson', function () {
  gulp.src('./public/*.html')
  .pipe(toJson());
});
```

```js
var gulp = require('gulp');
var toJson = require('gulp-to-json');

gulp.task('tojson', function () {
  gulp.src('./public/*.html')
  .pipe(toJson({
    strip: /^.+\/?\\?public\/?\\?/ //create just file names by removing everything from left of public/ folder
  }));
});
```

This will create output.json file in which will be all the html files from public folder.

## Options

#### filename

Type: `String`  
Default: 'output.json'

Filename where to save json file

#### relative

Type: `Boolean`  
Default: 'false'

If the relative urls should be used

#### strip

Type: `Regexp or String`  
Default: false

Pattern to strip from the files urls.

## License

MIT © [Krista Fryauff](https://github.com/kfryauff-mw)
