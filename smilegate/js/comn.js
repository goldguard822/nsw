function comn() {}
$(document).ready(function(){
  comn.init();
});

comn.init = function() {
  comn.loadFooter();
}

comn.loadFooter = function() {
  var _url = "./footer.html"
  $.ajax({
    url : _url
    ,cache : true
    ,async : true
    ,datatype : "html"
    ,success : function(data, status, xhr) {
      $("footer").empty().html($(data));
      //푸터 패밀리사이트 토글
      $("footer div.footer_family div.link_item span.family_icon").off("click").on("click", function(){
          $("footer div.family_wrap").toggle();
      });
    }
    ,error : function(xhr, status, err) {
      debugger;
    }
  });
}
