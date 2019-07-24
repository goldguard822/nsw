function mpole_global(){};
mpole_global.init = function() {
  mpole_global.locationBind();
  mpole_global.setGnb();
  mpole_global.eventBind();
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
  $("section.container_cont").empty();
  var _target = $("section.container");
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
  //Gnb Click Event
  $("ul.gnb").off("click").on("click", function(){
    $("ul.nav_sub").slideToggle("slow", function(){

    });
  });

  //Gnb Sub Click Event
  $("ul.nav_sub>li>span").off("click").on("click", function(){
    var _nvname = $(this).attr("role");
    location.hash = _nvname;
    $("ul.gnb").trigger("click");
  });
}

mpole_global.eventBind = function() {
  //mobile, tablet 기기 메뉴 버튼 event binding..
  $("div.mobile_menu_btn").off("click").on("click", function(){
    $("header>nav").toggleClass("on");
  });
}
