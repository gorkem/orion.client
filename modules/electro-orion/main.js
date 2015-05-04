/*eslint-env node */
var app = require('app'),  // Module to control application life.port 
	crashreporter = require('crash-reporter'),
	BrowserWindow = require('browser-window'),  // Module to create native browser window.
	orion = require('../orionode'),
	connect = require('connect'),
	globalShortcut = require('global-shortcut'),
	path = require('path'),
    fs = require('fs'),
	argslib = require('./args');
// Report crashes to our server.
crashreporter.start();
var args = argslib.parseArgs(process.argv);
console.log(args);
var port =  8082;
var dir = path.resolve(process.cwd(), args.dir);
try{
    var stats = fs.lstatSync(dir);
    if (!stats.isDirectory()) {
        dir = path.dirname(dir);
    }
}catch(err){
    dir = app.getPath('home');
}


var orionMiddleware = orion({
				workspaceDir: dir,
				configParams: {},
				maxAge:  0 ,// no caching
			}), appContext = orionMiddleware.appContext;
			var server = connect()
				.use(connect.logger('tiny') )
				.use(connect.compress())
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
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, 'node-integration': false});
//  mainWindow.openDevTools();
  // and load the index.html of the app.
  var url = 'http://localhost:'+port;
  console.log("load url " + url);
  var ret = globalShortcut.register('ctrl+r', function() { mainWindow.reload(); })
  mainWindow.loadUrl(url);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
