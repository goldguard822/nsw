$.loadCSS = function(url) {
  if (!$('link[href="' + url + '"]').length) {
    $('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
  }
}
$.when(
  $.loadCSS("./css/testcss.css"),
  $.getScript( "./js/script1.js"),
  $.getScript( "./js/script2.js"),
  $.getScript( "./js/script3.js"),
  $.Deferred(function( deferred ){

    $( deferred.resolve );
  })
).done(function(){
  $(document).ready(function(){
    testscript.init();
  })
  //place your code here, the scripts are all loaded
});
