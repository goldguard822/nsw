function mpole_global(){};
mpole_global.init = function() {
  mpole_global.setResize();
  mpole_global.setScroll();
  mpole_global.locationBind();
  mpole_global.setGnb();
  mpole_global.eventBind();
}

mpole_global.setResize = function() {
  $(window).resize(function(){
    var _width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
    if (_width > 1023) {
      $("header#home_header").css("top", "0px");
    }
  });
}

mpole_global.setScroll = function() {
  //var _useragent = navigator.userAgent;
  //var _ismobile = false;
  // 모바일인 경우
  //if (navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {

  //}
  var lastScrollTop = 0, delta = 20;
  $(window).scroll(function (event) {
    var _width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
    if (_width < 1024) {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta) return;
      if ((st > lastScrollTop) && (lastScrollTop > 0)) {
          $("header#home_header").css("top", "-1000px");
          $("div.shadow").css("top", "-960px");
      } else {
          $("header#home_header").css("top", "0px");
          $("div.shadow").css("top", "40px");
      }
      lastScrollTop = st;
    }
  });
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
    $("header>nav>div.nav_wrap").toggleClass("on");
  });
}
