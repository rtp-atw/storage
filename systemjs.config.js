(function (global) {
  
  
  // map tells the System loader where to look for things
  var map = {
    'app': 'app',
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs',
    'lodash': 'node_modules/lodash',
     // ...
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    // CDK individual packages
    '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
    // ...
    '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
    'tslib': 'npm:tslib/tslib.js',

    '@angular/cdk/bidi': 'npm:/@angular/cdk/bundles/cdk-bidi.umd.js', 
    '@angular/cdk/keycodes': 'npm:/@angular/cdk/bundles/cdk-keycodes.umd.js', 
    '@angular/cdk/coercion': 'npm:/@angular/cdk/bundles/cdk-coercion.umd.js', 
    '@angular/cdk/overlay': 'npm:/@angular/cdk/bundles/cdk-overlay.umd.js', 
    '@angular/cdk/portal':'npm:/@angular/cdk/bundles/cdk-portal.umd.js', 
    '@angular/cdk/collections': 'npm:/@angular/cdk/bundles/cdk-collections.umd.js', 
    '@angular/cdk/observers': 'npm:/@angular/cdk/bundles/cdk-observers.umd.js', 
    '@angular/cdk/accordion': 'npm:/@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/scrolling': 'npm:/@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/layout': 'npm:/@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/rxjs': 'npm:/@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/table': 'npm:/@angular/cdk/bundles/cdk-table.umd.js',   
    '@angular/cdk/stepper': 'npm:/@angular/cdk/bundles/cdk-stepper.umd.js',
    
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',   
  
    'angularfire2' : 'npm:angularfire2/bundles/core.umd.js',
    'angularfire2/database' : 'npm:angularfire2/bundles/database.umd.js',
    'angularfire2/auth': 'npm:angularfire2/bundles/auth.umd.js',
    'angularfire2/firestore' : 'npm:angularfire2/bundles/firestore.umd.js',
    'firebase': 'npm:firebase/firebase.js',
    'firebase/app': 'npm:firebase/firebase.js',
    'firebase/database': 'npm:firebase/firebase.js',
    'firebase/auth': 'npm:firebase/firebase.js',
    'firebase/firestore': 'npm:firebase/firebase.js',
    'file-saver' : 'npm:file-saver/FileSaver.min.js', 
    'moment' : 'node_modules/moment',

    'typed-prompts' : 'npm:typed-prompts/lib/inquirer.js',
    
    'xlsx': 'npm:xlsx/dist/xlsx.full.min.js', // <-- make sure xlsx.full.min.js is in same dir 'xlsx.full.min.js'
    'fs': '',     // <--|
    'crypto': '', // <--| suppress native node modules
    'stream': ''  // <--|
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js',  defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'lodash': { main: 'index.js', defaultExtension: 'js' },
    'moment': { main: 'moment.js', defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',

  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var paths = {
    'npm:': 'node_modules/'
    
  };

  var meta = {
    firebase: {
      format: 'global',
      exports: 'firebase'
    },
    'xlsx': {
      exports: 'XLSX' // <-- tell SystemJS to expose the XLSX variable
    },
    'moment': { format: 'global' }

  };

  var config = {
    map: map,
    packages: packages,
    meta: meta,
    paths: paths
  };

  System.config(config);

})(this);