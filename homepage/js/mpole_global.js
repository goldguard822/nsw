function mpole_global(){};
mpole_global.init = function() {
  mpole_global.locationBind();
  mpole_global.setGnb();
}

mpole_global.locationBind = function() {
  window.onhashchange = mpole_global.locationHashChanged;
  if(!window.HashChangeEvent)( function() {
    let lastURL = document.URL;
    window.addEventListener( "hashchange", function( event ) {
        Object.defineProperty( event, "oldURL", { enumerable: true, configurable: true, value: lastURL } );
        Object.defineProperty( event, "newURL", { enumerable: true, configurable: true, value: document.URL } );
        lastURL = document.URL;
    });
  }());
}

mpole_global.locationHashChanged = function(e) {
  var _hash = location.hash;
  $("div#container div.container_cont").empty();
  var _target = $("div#container");
  $.ajax({
    url : "./"+ _hash.replace(/\#/,"") +".html"
    ,type : "GET"
    ,cache : false
    ,async : true
    ,datatype : "html"
    ,success : function(data){
      _target.empty();
      _target.html(data);
    }
    ,error : function(req,status,error) {
      debugger;
    }
  });
}

mpole_global.setGnb = function() {
  $(".gnb_btn").off("click").on("click", function(){
    var _nvname = $(this).attr("role");
    location.hash = _nvname;
    /*
    var _container = $("div#container");
    $("div.container_cont", _container).hide();
    $("div[role='"+ _nvname +"']", _container).show();
    */
  });
}
