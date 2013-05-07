/*
 * grunt-sencha-resolver
 * https://github.com/revolunet/grunt-sencha-resolver
 *
 * Copyright (c) 2013 LaurentMox
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
  });

  // Actually load this plugin's task(s).
   grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, only lint.
  grunt.registerTask('default', ['jshint']);
};
