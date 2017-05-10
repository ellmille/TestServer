//things that need to be here for grunt
module.exports = function(grunt){
	//configure
	grunt.initConfig({
		//get config info from package.json
		pkg: grunt.file.readJSON('package.json'),
		//configure our modules
		//lint
		jshint: {
			options: {
			    reporter: require('jshint-stylish'),
			    strict: false,
			    node: true,
			    "predef": ['console', 'alert', '$', 'window'],
			},
			all: ['Gruntfile.js', 'DB/DBIO.js', 'Servers/*.js']
		},
	});

	// run multiple tasks at once
  	grunt.registerTask('default', ['jshint']); 

	//load the plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
};