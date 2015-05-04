
/*eslint-env node */

exports.parseArgs= function (argv){
    var args = {};
    argv = argv.slice(2); //remove node and script
    for(var i =0; i<argv.length; i++){
    	args.dir = argv[i];
    }
    return args;
}
