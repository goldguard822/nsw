function mpole_global(){};
mpole_global.swiper = "";
mpole_global.init = function() {
  mpole_global.setSwiper();
  mpole_global.setResize();
  mpole_global.setScroll();
  mpole_global.locationBind();
  mpole_global.setGnb();
  mpole_global.eventBind();
}

mpole_global.setSwiper = function() {
  swiper = new Swiper({
    el: '.swiper-container',
    initialSlide: 2,
    spaceBetween: 50,
    slidesPerView: 2,
    centeredSlides: true,
    slideToClickedSlide: true,
    grabCursor: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    mousewheel: {
      enabled: true,
    },
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
}

mpole_global.setResize = function() {
  $(window).resize(function(){
    var _width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
    var _shadow_top;
    if (_width < 1024) {
      _shadow_top = 40;
    } else {
      _shadow_top = 80;
    }
    var _curr_shadow_top = parseInt($("div.shadow").css("top").replace(/px/gi,""));
    if ( _curr_shadow_top > 0 ) {
      $("div.shadow").css("top", _shadow_top + "px");
    }
  });
}

mpole_global.setScroll = function() {
  var lastScrollTop = 0, delta = 20;
  $(window).scroll(function (event) {
    var _width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
    var _shadow_top;
    if (_width < 1024) {
      _shadow_top = 40;
    } else {
      _shadow_top = 80;
    }
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta) return;
    if ((st > lastScrollTop) && (lastScrollTop > 0)) {
        $("header div.home_header_inner").css("top", "-1000px");
        $("div.shadow").css("top", (_shadow_top - 1000) + "px");
    } else {
        $("header div.home_header_inner").css("top", "0px");
        $("div.shadow").css("top", _shadow_top + "px");
    }
    lastScrollTop = st;
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
  //Gnb Click Event (PC 버젼)
  $("div.nav_wrap.pc ul.gnb").off("click").on("click", function(){
    $("div.nav_wrap.pc ul.nav_sub").slideToggle("fast");
  });

  //Gnb Click Event (Mobile 버젼)
  $("div.nav_wrap.mobile ul.gnb li").off("click").on("click", function(){
    $(this).children("ul.nav_sub").toggle();
    $(this).toggleClass("on");
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
    $("header nav div.nav_wrap").toggleClass("on");
  });
}
