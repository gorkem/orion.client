
/*eslint-env node */
var app = require('app'),
	path = require('path'),
	fs = require('fs');

var values = null;
var valueFile = path.join(app.getPath('userData'),'settings.json');

exports.setValue = function(key, value){
	if(!values){
		values = load();
	}
	values[key] = value;
	fs.writeFileSync(valueFile, JSON.stringify(values,null,4));
};

exports.getValue = function(key){
	if(!values){
		values = load();
	}
	return values[key];	
};

function load() {
	try{
		return JSON.parse(fs.readFileSync(valueFile).toString());		
	}catch(error){
		console.error("Error reading settings:" + error);
		return {};
	}
}
