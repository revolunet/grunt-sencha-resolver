/*
 * grunt-sencha-resolver
 * https://github.com/revolunet/grunt-sencha-resolver
 *
 * Copyright (c) 2013 LaurentMox
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('sencha_resolver', 'Resolve JS dependencies of a ExtJS project.', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // URL to load
      url: 'http://127.0.0.1',
      // Should we remove Ext(-all,-debug etc.).js library from the list?
      skipSenchaCore: false,
      // Object that map urls matching patterns (using regexp).
      urlMappings: false
    });

    grunt.log.debug("Using options:");
    grunt.log.debug();
    grunt.log.debug("url:\t" + options.url);
    grunt.log.debug("skipSenchaCore:\t" + options.skipSenchaCore);
    if (!options.urlMappings) {
      grunt.log.debug("urlMappings:\tNo");
    }
    else {
      grunt.log.debug("urlMappings:");
      for (var key in options.urlMappings) {
        grunt.log.debug("\t" + key + " = " + options.urlMappings[key]);
      }
    }

    var spawn_options = {
      // ToDo: Ugly ugly paths, need to be changed

      // PhantomJS binary path.
      cmd: './node_modules/grunt-lib-phantomjs/node_modules/phantomjs/bin/phantomjs',
      grunt: false,
      args: ['node_modules/grunt-sencha-resolver/tasks/dep/resolve_project.js', options.url, options.jsUrl, options.jsLocal],
    };

    function doneFunction(error, result, code) {
      if (!error && !code) {
        grunt.log.ok();
        grunt.log.debug("PhantomJS terminated and returned this files (mapped to -->):");
        grunt.log.debug();

        var mapped = result.stdout;
        for (var i in options.urlMappings) {
          var regex = new RegExp(i, 'g');
          mapped = mapped.replace(regex, options.urlMappings[i]);
        }
        var urls = String(result.stdout).split('\n');
        var files = String(mapped).split('\n');
        var finalList = [];
        for (var idx in urls) {
          if (options.skipSenchaCore) {
            if (files[idx].search("(ext((-all)*(-(debug|dev))*(-w-comments)*)\\.js)") > 0) {
              continue;
            }
          }
          finalList.push(files[idx]);
          grunt.log.debug(urls[idx]);
          grunt.log.debug('\t--> ' + files[idx]);
        }
        grunt.log.debug();
        grunt.log.write("Number of files: " + finalList.length);
        grunt.config.set("sencha_project", finalList);
        grunt.log.write("\n"+JSON.stringify(grunt.config.get('sencha_project')));
      } else {
        grunt.log.errorlns("Code: " + code + " An error appened when calling phantomjs. " +
          JSON.stringify(result));
      }
      done();
    }
    grunt.log.write("Spawning PhantomJS...");
    var t = grunt.util.spawn(spawn_options, doneFunction);
  });

};
