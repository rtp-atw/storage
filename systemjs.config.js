(function (global) {
  
  
  // map tells the System loader where to look for things
  var map = {
    'app': 'app',
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs',
    'lodash': 'node_modules/lodash',

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
    'lodash': { main: 'index.js', defaultExtension: 'js' }
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
    }

  };

  var config = {
    map: map,
    packages: packages,
    meta: meta,
    paths: paths
  };

  System.config(config);

})(this);