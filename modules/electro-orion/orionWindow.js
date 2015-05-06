
/*eslint-env node */
var BrowserWindow = require('browser-window'),
	path = require('path');


function OrionWindow(){
	this.restoreState();

	var windowOptions = {
		'preload':this.state.preload,
		 width: this.state.width,
		 heigth: this.state.height
	}
	this.kernelWindow = new BrowserWindow(windowOptions);
}

OrionWindow.prototype.restoreState = function(){
	if(!this.state){
        var preloadjs = path.resolve(__dirname,'preload.js')
		this.state = {width:1024,height:768,'preload':preloadjs};
	}
};

OrionWindow.prototype.load= function(path){
	this.kernelWindow.loadUrl(path);
};

OrionWindow.prototype.reload = function(){
	this.kernelWindow.reload();
};

OrionWindow.prototype.registerListeners = function(){
	this.kernelWindow.on('close',function(){
		
	});
}

exports.OrionWindow = OrionWindow;
