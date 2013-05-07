# grunt-sencha-resolver

> Resolve dependencies of a Sencha ExtJS project.

## Getting Started
This plugin requires Grunt `~0.4.1` and [Phantomjs](https://github.com/Obvious/phantomjs) `~1.9.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sencha-resolver --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sencha-resolver');
```

## The "sencha_resolver" task

### Overview
In your project's Gruntfile, add a section named `sencha_resolver` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sencha_resolver: {
    options: {
      // Task-specific options go here.
    },
  },
})
```

### Options

#### options.url
Type: `String`
Default value: `'http://127.0.0.1'`

This is the URL to call to check Sencha ExtJS dependencies (scripts files).

#### options.urlMapping
Type: `Object`
Default value: `'{}'`

An object that define mapping of caught scripts, using regexp.

#### options.skipSenchaCore
Type: `Boolean`
Default value: `'false'`

A boolean that tell the task to delete references of any ExtJS core library (Ext-debug.js, Ext-all.js etc...).

### Usage Examples

In this example, we target an url of a running ExtJS project and extract all it's script dependencies. We then map to local storage path some of the obtained URLs, using regexp. We also want to remove the Ext-all-debug.js library.

```js
grunt.initConfig({
  sencha_resolver: {
    options: {
      url: 'http://127.0.0.1/awesomeExtJSproject',
      urlMappings: {
        '.*www/': '/home/awesome_developper/dev/awesome_extjs_project/www/',
        '\\?(.*)': ''
      },
      skipSenchaCore: true
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
