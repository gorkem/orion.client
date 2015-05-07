
/*eslint-env node */
var BrowserWindow = require('browser-window'),
	path = require('path'),
	settings = require('./settingsStorage');


function OrionWindow(){
	this.restoreState();
	var windowOptions = {
		'preload':this.state.preload,
		 width: this.state.width,
		 heigth: this.state.height
	};
	console.log(windowOptions);
	this.kernelWindow = new BrowserWindow(windowOptions);
	this.registerListeners();
}

OrionWindow.prototype.restoreState = function(){
	if(!this.state){
        var preloadjs = path.resolve(__dirname,'preload.js');
        var size = settings.getValue('window-size') || [1024,768];
        console.log(size);
		this.state = {width:size[0], height:size[1],'preload':preloadjs};
	}
};

OrionWindow.prototype.load= function(path){
	this.kernelWindow.loadUrl(path);
};

OrionWindow.prototype.reload = function(){
	this.kernelWindow.reload();
};

OrionWindow.prototype.saveState = function(){
	settings.setValue('window-size',this.kernelWindow.getSize());	
};

OrionWindow.prototype.registerListeners = function(){
	var that = this;
	this.kernelWindow.on('close',function(){
		that.saveState();
	});
};


exports.OrionWindow = OrionWindow;
