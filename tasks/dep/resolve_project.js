/* global phantom,document,Ext */

var system = require('system'),
    page = require('webpage').create();

// Viewport size is defined for the screenshot (see below)
// page.viewportSize = {
//   width: 1280,
//   height: 800
// };

page.onError = function (msg, trace) {
  console.log('Error: ' + msg + " Trace: " + JSON.stringify(trace, undefined, 4));
  phantom.exit(-1);
};

if (system.args.length < 1) {
  console.log('Error: No URL specified !');
  phantom.exit(-1);
}

var url = system.args[1];

page.open(url, function (status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
    phantom.exit(-1);
  } else {
    // Grab url of all included scripts BEFORE ExtJS starts to load dynamic ones
    var src = page.evaluate(function () {
      var src = [];
      var scripts = document.getElementsByTagName('script');
      for (var idx in scripts) {
        if (scripts[idx].src) {
          src.push(scripts[idx].src);
        }
      }
      return src;
    });

    // Wait few seconds for ExtJS to load dependencies
    setTimeout(function() {
      var src2 = page.evaluate(function () {
        var src2 = [];
        for (var cls in Ext.Loader.history) {
          src2.push(Ext.Loader.getPath(Ext.Loader.history[cls]));
        }
        return src2;
      });
      // Concat dynamically loaded script files to static ones
      src = src2.concat(src);

      // Uncomment to take a screenshot of webpage as a minimal 'proof' of page integrity :)
      // page.render('proof.png');

      // ToDo: check if some dynamic files were already loaded and inserted into the DOM...

      // We need to use the console.log to communicate with the parent process (GruntJS)
      for (var i in src) {
        console.log(src[i]);
      }
      phantom.exit();
    }, 7000);
  }
});
