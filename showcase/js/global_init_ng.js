//Prototype 선언(array differnce check)
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

//global class
function sc_global(){}
sc_global.categories = "";
sc_global.superCats = "";
sc_global.catNames = [];
sc_global.catToId = {};
sc_global.idToCat = {};
sc_global.iconSelected = [];
sc_global.imIdList = [];
sc_global.defaultScale = 0.5;
sc_global.delta = 0;

sc_global.sel_ids = [];
sc_global.resultInfo = [];
sc_global.searchResult = [];
sc_global.paging = [];
sc_global.searchCnt = 0;
sc_global.isDifference = false;

sc_global.searchHost = "http://192.168.0.117";
sc_global.init = function(){
  var sApp = angular.module('sApp', []);

  //카테고리 데이터 가져오기(동기 방식)
  sc_global.setData();

  sc_global.setScroll();

  //카테고리 아이콘 drawing 및 이벤트 바인딩, tagit init, 검색버튼 event binding
  sApp.controller('iconpanel', ['$scope', '$http', function($scope, $http) {
    $scope.urlprefix = 'http://127.0.0.1:3000/showcase/images/icons/new/';
    $scope.init = function() {
      $scope.categories = sc_global.categories;
    }
    $scope.onfinish = function() {
      // 카테고리 아이콘 event binding
      var icons = $(".iconwrap");
      $.each(icons, function(i,v){
        var icon = $(this);
        icon.off('mousedown').on('mousedown', function(e){
          if(e.button != 0) {return;}
          var state = $(this).data('state');
          var cat = $(this).attr('title');
          if(state) {
            $("#sc_search_input").tagit("removeTagByLabel", cat);
          } else {
            $("#sc_search_input").tagit("createTag", cat);
          }
        });
        sc_global.iconSelected.push(icon.attr('title'));
      });
      // tagit set
      var setTag = function(tag,state) {
        var icons = $(".iconwrap");
        $.each(icons, function(i,v){
          var icon = $(this);
          if (icon.attr('title') == tag) {
            icon.data('state', state);
            var selected = $(this).children("span.selected_area");
            if (state) {
              selected.addClass("on");
            } else {
              selected.removeClass("on");
            }
          }
        });
      };
      $("#sc_search_input").tagit({
        availableTags: sc_global.catNames,
        allowDuplicates: false,
        afterTagAdded: function(e, ui) {
          var lbl=ui.tagLabel, valid=sc_global.iconSelected.indexOf(lbl)!=-1 || !isNaN(lbl);
          if(!valid) {
            $("#sc_search_input").tagit("removeTagByLabel", lbl);
            return;
          }
          setTag(lbl,true);
        },
        afterTagRemoved: function(e, ui){
          setTag(ui.tagLabel,false);
        }
      });
      // 검색버튼 click event binding
      $('#sc_search_btn').off("click").on("click", function(){

        var _tagit = $("#sc_search_input").tagit("assignedTags");
        if (_tagit.length == 0) {
          alert("카테고리를 선택하세요.");
          return false;
        }
        var _sel_ids = [];
        $.each(_tagit, function(i,v){
          _sel_ids.push(sc_global.catToId[v].toString());
        });

        //이미 기존에 검색결과가 있는 경우 체크 (선택한 분류와 현재 검색된 분류가 동일한 경우 재 검색 하지 않음.)
        if(sc_global.sel_ids.length > 0) {
          sc_global.arrDiff(_sel_ids, sc_global.sel_ids);
          if (!sc_global.isDifference) return false;
        }

        sc_global.clearCanvas();
        sc_global.loadSearch(_sel_ids);
      });
      $('#sc_search_Loading').hide();
      $('#sc_search_Done').hide();
    }
  }]);
  sApp.directive('onFinishRender', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
            if (!!attr.onFinishRender) {
              $parse(attr.onFinishRender)(scope);
            }
          });
        }

        if (!!attr.onStartRender) {
          if (scope.$first === true) {
            $timeout(function () {
              scope.$emit('ngRepeatStarted');
              if (!!attr.onStartRender) {
                $parse(attr.onStartRender)(scope);
              }
            });
          }
        }
      }
    }
  }]);
}

sc_global.setData = function(){
  //카테고리 정보 연동
  var _url = sc_global.searchHost + "/Cats";
  $.ajax({
    url : _url
    ,contentType : "application/json"
    ,method : "POST"
    ,async : false
    ,datatype : "json"
    ,cache : false
    ,success : function(data, status, xhr){
      sc_global.categories = data;
      $.each(sc_global.categories, function(i,v){
        sc_global.catNames.push($(this)[0].category_name);
        sc_global.catToId[$(this)[0].category_name] = $(this)[0].category_id;
        sc_global.idToCat[$(this)[0].category_id] = $(this)[0].category_name;
      });
      //sc_global.drawIcon();
    }
    ,error : function(xhr, status, err) {
      alert("카테고리 데이터를 가져오는 중 오류가 발생하였습니다.");
    }
  });
}

sc_global.arrDiff = function(a,b) {
  var _diff1 = a.diff(b);
  var _diff2 = b.diff(a);

  if (_diff1.length == 0 && _diff2.length == 0) {
    sc_global.isDifference = false;
  } else {
    sc_global.isDifference = true;
  }
}

sc_global.imgError = function() {
  event.srcElement.src = "./images/icons/new/1.jpg";
}

sc_global.setScroll = function() {
  //scroll 시 추가 이미지 불러오기
  $(window).scroll(function() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
      if (sc_global.paging.length == 0) return;
      if (($('#sc_search_btn').prop('disabled') == false) && ($('#sc_search_Done').css("display") == "none")) {
        $('#sc_search_btn').prop("disabled", true);
        $('#sc_search_Loading').show();
        sc_global.loadSearch(sc_global.sel_ids);
      }
    }
  });
}

//캔버스 초기화
sc_global.clearCanvas = function() {
  sc_global.imIdList = [];
  $('.imageDisplay').remove();
}

sc_global.popRandImageIds = function() {
  var randImIds = [];
  var N = sc_global.imIdList.length;
  for (var i=0; i<Math.min(N, 5); i++){
    var M = sc_global.imIdList.length;
    var randInd = Math.floor(Math.random(M) * M);
    randImIds.push(sc_global.imIdList[randInd]);
    sc_global.imIdList.splice(randInd, 1);
  }
  return randImIds;
}

sc_global.loadSearch = function(ids) {
  if (ids.length == 0) {
    sc_global.sel_ids = [];
    $('#sc_search_btn').prop("disabled", false);
    return;
  }

  //새로운 카테고리를 선택하여 검색했는지 체크
  sc_global.arrDiff(ids, sc_global.sel_ids);

  //선택한 카테고리 값 저장
  sc_global.sel_ids = ids;

  //검색결과 요청
  var _url = sc_global.searchHost + "/ImageByCats";
  var _data = {
    'category_ids' : ids
    ,'size' : 3
  }
  if (!sc_global.isDifference && sc_global.paging.length > 0) {
    _data["next"] = parseInt(sc_global.paging[0]);
  }

  $.ajax({
    url : _url
    , contentType : "application/json"
    , method : "POST"
    , async : true
    , datatype : "json"
    , data : JSON.stringify(_data)
    , cache : false
    , success : function(data, textStatus, xhr) {
      if(typeof(data) == "string") {
        var _json = $.parseJSON(data.replace(/'/gi,"\""));
        if (_json.index == "nodata") {                    //더 이상 데이터가 없음.
          if (sc_global.isDifference) {                   //새로운 분류를 선택한 경우 기존 검색결과 삭제
            $("#sc_imageDisplayList").empty();
          }
          $('#sc_search_Loading').hide();
          $('#sc_search_Done').show();
          $('#sc_search_btn').prop("disabled", false);
          $('.sc_result_count').hide();
          return;
        }
      }
      if(data[0].length > 0) {

        sc_global.imIdList = data[0];
        sc_global.resultInfo = data[1][0];
        sc_global.searchResult = data[1][1];
        sc_global.paging = data[2];
        sc_global.searchCnt = data[3];

        var tags = $("#sc_search_input").tagit("assignedTags");
        // disable search button and show loading
        $('#sc_search_btn').prop("disabled", true);
        $('#sc_search_Loading').show();
        $('#sc_search_Done').hide();

        if (ids != undefined){
          sc_global.loadVisualizations(ids);
        } else if($.isNumeric(tags[0])){
          sc_global.loadVisualizations([tags[0]]);
          sc_global.imIdList = [];
        } else {
          sc_global.loadImageByCats(tags);
        }
      }
    }
    , error : function(xhr, textStatus, err) {
      alert("검색결과를 가져오는 중 오류가 발생하였습니다.");
    }
  });
}

sc_global.loadImageByCats = function(tags) {
  var categoryIds = tags.map(function(x){return sc_global.catToId[x];});
  if (categoryIds.length == 0) categoryIds = [-1];
  sc_global.loadVisualizations(sc_global.popRandImageIds());
}

sc_global.loadVisualizations = function(imageIds) {
  if (imageIds.length > 0){
    if (sc_global.paging.length == 0 || sc_global.isDifference) {
      $("div.sc_result_count").show().find("h4 > span").html(sc_global.searchCnt);           //검색건수 세팅
      $("div.sc_imageDisplay").remove();
    }
    sc_global.loadImageData(imageIds, function (dataImage) {
      var imageIds = Object.keys(dataImage);
      for (var j = 0; j < imageIds.length; j++) {
        var imageId = imageIds[j];
        var instances = dataImage[imageId]['instances'];
        var url = dataImage[imageId]['url'];
        var catToSegms = {};
        for (var i = 0; i < instances.length; i++) catToSegms[instances[i]['category_id']] = [];
        for (var i = 0; i < instances.length; i++) {
          catToSegms[instances[i]['category_id']].push(instances[i]);
        }
        sc_global.createDisplay(imageId, catToSegms, url);
      }
      // unlock search button
      $('#sc_search_btn').prop("disabled", false);
      $('#sc_search_Loading').hide();
    });
  }else{
    // unlock search button
    $('#sc_search_btn').prop("disabled", false);
    $('#sc_search_Loading').hide();
  }
}

sc_global.loadImageData = function(imageIds, callback) {
  var imageData = {};
  $.each(sc_global.searchResult, function(i,v){
    var imgId = $(this)[0].image_id;
    if (imageData[imgId] == undefined) {
      imageData[imgId] = {};
      $.each(sc_global.resultInfo, function(k,val){
        if (imgId == val.image_id) {
          imageData[imgId]['url'] = $(this)[0].image_url;
        }
      });
      //imageData[imgId]['url'] = $(this)[0].url;
      imageData[imgId]['instances'] = [];
    }

    imageData[imgId]['instances'].push({
        "category_id" : $(this)[0].category_id,
        "image_id" : $(this)[0].image_id,
        "segmentation" : $(this)[0].segmentation
    });
  });

  callback(imageData);
}
sc_global.createDisplay = function(imageId, catToSegms, url){
  //이미지 ID 중복체크
  if($("#sc_imageDisplay" + imageId, "#sc_imageDisplayList").size() > 0) {
    return;
  }
  // url Icon
  //var urlIcon = '<span class="filterIcon" title="url to share this image"><img id="filterURLIcon" class="filterIconImage" src="images/icons/url.png"></span>';
  var urlIcon = '';
  var sc_url = '<a href="#showcase?id=' + imageId + '" target="_blank">' + './#showcase?id=' + imageId + '</a>';
  var urlText = sc_url + '</br>' + url;
  // category icon
  var catIcons = '';
  var iconIds = Object.keys(catToSegms);
  for (var i = 0; i < iconIds.length; i++) {
    catIcons += '<span class="filterIcon" title="' + sc_global.idToCat[iconIds[i]] + '"><img data="' + iconIds[i] + '" class="filterIconImage filterCategoryImage" src="./images/icons/new/' + iconIds[i] + '.jpg"></span>';
  }
  // blank icon
  var blankIcon = '<span class="filterIcon blank" title="hide segmentations"><img id="filterBlankIcon" class="filterIconImage" src="./images/icons/blank.png"></span>';
  // image display drawing
  var display = '<div class="sc_imageDisplay" id="sc_imageDisplay' + imageId + '">';
  display += '<div class="sc_icons_area" style="display:inline-block">' + urlIcon + catIcons + blankIcon + '</div>';
  //display += '<div class="sc_url" style="display:none">' + urlText + '</div>';
  display += '<div style="margin-top:1px" id="canvas_div_'+ imageId +'" class="canvas_div"><canvas class="sc_canvas"></canvas></div>';
  display += '</div>';

  $('#sc_imageDisplayList').append($(display));
  var display = $('#sc_imageDisplay' + imageId);

  // Draw polygon on the image
  var canvas = display.find('.sc_canvas')[0];
  var ctx = canvas.getContext("2d");
  var img = new Image;
  img.src = sc_global.searchHost + url;
  img.onload = function () {
    canvas.width = this.width * sc_global.defaultScale;
    canvas.height = this.height * sc_global.defaultScale;
    sc_global.renderImage(ctx, this, sc_global.defaultScale);
    sc_global.renderSegms(ctx, this, catToSegms, sc_global.defaultScale);
  }

  // set up data for display
  display.data('image', img); // store image object in display
  display.data('catToSegms', catToSegms); // store image object in display
  display.data('delta', 0);
  display.data('scale', sc_global.defaultScale);

  // Add listener to URL icon
  display.find('#filterURLIcon').on('click', function () {
    var x = $(this).parents('.sc_imageDisplay').find('.sc_url');
    if (x.css('display') == 'none') x.css('display', 'block');
    else x.css('display', 'none');
  });

  // Add listener to category icons
  var categoryIcons = display.find('.filterCategoryImage');
  for (var i = 0; i < categoryIcons.length; i++) {
    $(categoryIcons[i]).on("mouseenter", function() {
      var iconId = $(this).attr('data');
      var img = $(this).parents('.sc_imageDisplay').data('image');
      var catToSegms = $(this).parents('.sc_imageDisplay').data('catToSegms');
      var currScale = $(this).parents('.sc_imageDisplay').data('scale');
      sc_global.renderImage(ctx, img, currScale);
      sc_global.renderSegms(ctx, img, {iconId: catToSegms[iconId]}, currScale);
    }).on("mouseout", function() {
      var img = $(this).parents('.sc_imageDisplay').data('image');
      var catToSegms = $(this).parents('.sc_imageDisplay').data('catToSegms');
      var currScale = $(this).parents('.sc_imageDisplay').data('scale');
      sc_global.renderImage(ctx, img, currScale);
      sc_global.renderSegms(ctx, img, catToSegms, currScale);
    });
  }

  // Add listener to blank icon
  display.find('#filterBlankIcon').on("mouseover", function() {
    var currScale = $(this).parents('.sc_imageDisplay').data('scale');
    sc_global.renderImage(ctx, $(this).parents('.sc_imageDisplay').data('image'), currScale);
  }).on("mouseout", function() {
    var img = $(this).parents('.sc_imageDisplay').data('image');
    var catToSegms = $(this).parents('.sc_imageDisplay').data('catToSegms');
    var currScale = $(this).parents('.sc_imageDisplay').data('scale');
    sc_global.renderImage(ctx, img, currScale);
    sc_global.renderSegms(ctx, img, catToSegms, currScale);
  });

  //Zoom event set
  var handleZoom = function(evt){
    var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
    var _act = delta < 0 ? "down" : "up";
    if (delta) {
      var _parents = $(this).parents('.sc_imageDisplay');
      var _delta = _parents.data('delta');
      var _zoom = Math.pow(1.1, parseInt(_delta + delta));
      var _currScale = _parents.data('scale');
      _parents.data('delta', parseFloat(_delta + delta));
      if ( ( _act == "down" && (_currScale > _zoom)) || (_act == "up") ){
        _parents.data('scale', parseFloat(_zoom));
        var img = _parents.data('image');
        var catToSegms = _parents.data('catToSegms');
        sc_global.renderImage(ctx, img, _zoom);
        sc_global.renderSegms(ctx, img, catToSegms, _zoom);
      }
    }
    return evt.preventDefault() || evt.stopPropagation() && false;
  };
  //canvas.addEventListener('DOMMouseScroll',handleZoom,false);
  //canvas.addEventListener('mousewheel',handleZoom,false);
}

sc_global.renderImage = function(ctx, img, zoom) {
  if (zoom == undefined) zoom = sc_global.defaultScale;
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.drawImage(img, 0, 0, img.width*zoom, img.height*zoom);
}

sc_global.renderSegms = function(ctx, img, data, zoom) {
  if (zoom == undefined) zoom = sc_global.defaultScale;
  var cats = Object.keys(data);

  ctx.save();
  ctx.setTransform(zoom,0,0,zoom,0,0);
  for (var i=0; i<cats.length; i++){
    // set color for each object
    var segms = data[cats[i]];
    for (var j=0; j<segms.length; j++){
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      ctx.fillStyle = 'rgba('+r+','+g+','+b+',0.7)';

      var polys = segms[j]['segmentation'];
      for (var k=0; k<polys.length; k++){
        var poly = polys[k];
        for (var n=0; n<poly.length; n++){
          var _poly = poly[n][0];
          ctx.beginPath();
          ctx.moveTo(_poly[0], _poly[1]);
          for (var m=0; m<_poly.length-2; m+=2){
            ctx.lineTo(_poly[m+2],_poly[m+3]);
          }
          ctx.lineTo(_poly[0],_poly[1]);
          ctx.lineWidth = 3;
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = 'black';
          ctx.stroke();
        }
      }
    }
  }
  ctx.restore();
}
