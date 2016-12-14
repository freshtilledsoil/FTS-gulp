# FTS-gulp

Fresh Tilled Soil's default gulp config.


## Getting Started

```
git clone
cd FTS-gulp
npm install
```

## Commands

```
// Run build and watch for changes
gulp

// Build dist folder
gulp build

// Delete dist folder
gulp clean
```

## Project Structure

All development is limited to the `/src` folder.
Running the `gulp` command will compile and build a `/dist` folder which
is referenced via the built in server at [localhost:3000](http://localhost:3000).
With gulp running, saving a file within the `/src` folder will run the
associated gulp task and update the `/dist` folder accordingly.

## Tasks

### serve()
[BrowserSync](https://www.npmjs.com/package/browser-sync)

### html()
Moves .html files to `/dist` folder.

### svgmin()
[gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin)

### fonts()
Moves font files to `/dist` folder.

### imagemin()
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)

### styles()
[gulp-sass](https://www.npmjs.com/package/gulp-sass)
[gulp-autorprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

### concat()
[gulp-concat](https://www.npmjs.com/package/gulp-concat)

### uglify()
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

### fileinclude()
[gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
