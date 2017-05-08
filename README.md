# auto-apply
A Chrome extension to automate applications around the web. 

## Getting Started

Download the respository and run 
```
git clone https://github.com/adrind/auto-apply
npm install
gulp build
```

Open Chrome and go to More Tools --> Extensions (or simply navigate to chrome://extensions/)
Check 'Developer Mode' checkbox
Load unpacked extension and select auto-apply/dist directory

## Developing

This application is built with [Chrome livereload](https://www.npmjs.com/package/gulp-livereload)

Run 
```
gulp watch
```
As you're developing to take advantage

## Running the tests

Currently tests are set up using Mocha.

```
npm test
```

