/**
 * This is a very basic bit of JavaScript functionality, so we don't need a big framework like jQuery.
 * Instead, we'll recreate the functions we need by hand.
 * This doesn't support IE<=8, which doesn't have QSA, addEventListener or getComputedStyle. Instead they'll just see a more printer-friendly version.
 */

// This is our wrapper to check the browser is qualified to do the JS stuff
if (typeof document.querySelectorAll === 'function') {

// Quick synonym for QSA
function $(sel) {
  return document.querySelectorAll(sel);
}

// A little iterator function so we can bulk-apply things
function each(obj, fnc, args) {
  if (typeof obj !== 'object') obj = [obj];
  if (typeof args !== 'object') args = [args];

  for (var i = 0; i < obj.length; i++) {
    fnc.apply( obj[i], args );
  }
}

// Quick display function
function disp(type) {
  this.style.display = type;
}

// Toggle hidden and js-only objects now we know that JS is good to go!
each($('.hidden'), disp, 'none');
each($('.js-only'), disp, 'block');

// Make the data-toggle object actually toggle things
each($('[data-toggle]'), function() {
  this.addEventListener( 'click', function() {
    var id = this.getAttribute('data-toggle');
    var obj = $('#'+id)[0];

    // If the object doesn't exist, continue
    if(!obj) return;

    // Toggle the object's display
    disp.call(obj, getComputedStyle(obj).display === 'none' ? 'block' : 'none');

    // Track in GA events
    ga('send', 'event', 'toggler', 'click', id);
  }, false);
});

}

// Google Analytics to give me an idea of who's coming in!
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-34023507-2', 'auto'); ga('send', 'pageview');