/*eslint-env node */
var app = require('app'),  // Module to control application life.port 
	crashreporter = require('crash-reporter'),
	BrowserWindow = require('browser-window'),  // Module to create native browser window.
	orion = require('../orionode'),
	connect = require('connect'),
	globalShortcut = require('global-shortcut'),
	path = require('path'),
	argslib = require('./args');
// Report crashes to our server.
//crashreporter.start();
var port =  8082;
var dir = argslib.parsePath(process.argv);
if(!dir){
	dir = app.getPath('home');
}

var orionMiddleware = orion({
				workspaceDir: dir,
				configParams: {},
				maxAge:  0 ,// no caching
			}), appContext = orionMiddleware.appContext;
			var server = connect()
				.use(connect.logger('tiny') )
//				.use(connect.compress())
				.use(orionMiddleware)
				.listen(port);

			server.on('error', function(err) {
				console.log(err);
			});


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    var preloadjs = path.resolve(__dirname, 'preload.js');
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, 'preload':preloadjs});
//  mainWindow.openDevTools();
  // and load the index.html of the app.
  var url = 'http://localhost:'+port;
  console.log("load url " + url);
  var ret = globalShortcut.register('ctrl+r', function() { mainWindow.reload(); });
  mainWindow.loadUrl(url);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
