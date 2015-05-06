/*eslint-env node */
var app = require('app'),  // Module to control application life.port 
	crashreporter = require('crash-reporter'),
	OrionWindow = require('./orionWindow'), 
	orion = require('../orionode'),
	connect = require('connect'),
	globalShortcut = require('global-shortcut'),
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
				.listen(port, '127.0.0.1');

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
  mainWindow = new OrionWindow.OrionWindow();
  
  var url = 'http://127.0.0.1:'+port;
  console.log("load url " + url);
  globalShortcut.register('ctrl+r', function() { mainWindow.reload(); });
  mainWindow.load(url);

});
