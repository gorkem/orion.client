
/*eslint-env node */

var fs = require('fs');
exports.parsePath = function(argv){
    argv = argv.slice(2);//remove node and script
   	var thePath;
	var candidates = argv.filter(function(arg){ return !(/^-/.test(arg)); });
    for(var i = 0; i < candidates.length; i++){
		try{
			thePath = fs.realpathSync(candidates[i]);
		}catch(error){
			//ignore
		}
	}
	return thePath;
};
