console.log('Entering karma-test-shim.js');

// // Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};


System.config({
  //baseURL: '/base/src/',   // TODO: can't set baseURL because it would break bundled named modules
  //defaultJSExtensions: true, // TODO: deprecated option, can we get rid of it?
  map: {
    'app': 'base/src/app',
  },
  packages: {
    //'angular2': {defaultExtension: false},
    //'@reactivex': {defaultExtension: false},
    'app': {defaultExtension: false} // we need this so that relative paths under app resolve with app as base
              // for some reason empty object {}, sets defaultExtension to 'js'
    },
  // paths: {
  //   '/base/src/app/hero.service.spec': '/base/src/app/hero.service.spec.jsxx?' + window.__karma__.files['/base/src/app/hero.service.spec.js']
  // }
  // paths: {
  //   'base/src/app/hero.service.spec': 'base/src/app/hero.service.spec.js?' + window.__karma__.files['/base/src/app/hero.service.spec.js']
  // }
  paths: Object.keys(window.__karma__.files).
            filter(onlyAppFiles).
            reduce(function createPathRecords(pathsMapping, appPath, index) {
              var moduleName = appPath.replace(/^\//, '').replace(/\.js$/, '');
              pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]
              if (index === 10) console.log(pathsMapping)
              return pathsMapping;
            }, {})

});

System.import('angular2/src/core/dom/browser_adapter').then(function(browser_adapter) {
  browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    .map(filePath2moduleName)        // Normalize paths to module names.
    .map(function(moduleName) {
      console.log(`>>> loading spec file: System.import('${moduleName}')`);
      return System.import(moduleName);
    }));
})
.then(function() {
  __karma__.start();
}, function(error) {
  __karma__.error(error.stack || error);
});


function filePath2moduleName(filePath) {
  return filePath.
           replace(/^\/base\/src\//, '').   // remove prefix
           replace(/\.\w+$/, '');           // remove suffix
}


function onlyAppFiles(filePath) {
  return /^\/base\/src\/app\/.*\.js$/.test(filePath)
}


function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}
