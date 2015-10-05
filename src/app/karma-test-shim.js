console.log('Entering karma-test-shim.js');

// // Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;


//jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};


System.config({
  //baseURL: '/base/src/',   // TODO: can't set baseURL because it would break bundled named modules
  defaultJSExtensions: true, // TODO: deprecated option, can we get rid of it?
  packages: {
    'angular2': {defaultExtension: false},
    '@reactivex': {defaultExtension: false}
    },
  map: {
    'app': 'base/src/app',
  }
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


function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}
