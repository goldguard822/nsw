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

sc_global.searchResult = [];

sc_global.init = function(){
  sc_global.setData();
  sc_global.setScroll();
}

sc_global.setData = function(){
  //카테고리 정보 연동
  var _url = "./data/category.json";
  $.ajax({
    url : _url
    ,async : true
    ,datatype : "json"
    ,cache : false
    ,success : function(data, status, xhr){
      sc_global.categories = data.category;
      $.each(sc_global.categories, function(i,v){
        sc_global.catNames.push($(this)[0].name);
        sc_global.catToId[$(this)[0].name] = $(this)[0].id;
        sc_global.idToCat[$(this)[0].id] = $(this)[0].name;
      });
      sc_global.drawIcon();
    }
    ,error : function(xhr, status, err) {
      alert("카테고리 데이터를 가져오는 중 오류가 발생하였습니다.");
    }
  });
}

//카테고리 아이콘 drawing 및 event binding
sc_global.drawIcon = function() {
  // 카테고리 아이콘 HTML drawing
  var div = '', i, j;
  div += '<div class="iconSubpanel">';
  var cats = sc_global.categories;
  $.each(cats,function(j,v){
    div += '<span class="iconwrap" title="'+ cats[j].name +'">';
    div +=  '<span class="selected_area"></span>';
    div +=  '<img title="' + cats[j].name + '" id="icon_' + cats[j].id + '" class="iconSelect" src="./images/icons/new/'+ cats[j].id +'.jpg" onerror="sc_global.imgError()"/>';
    div += '</span>';
  });
  div += '</div>';

  $('#sc_IconPanel').append(div);

  // 카테고리 아이콘 event binding
  var icons = $(".iconwrap");
  $.each(icons, function(i,v){
    var icon = $(this);
    icon.data('state', false);
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

  // tagit 세팅
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
    sc_global.clearCanvas();
    sc_global.loadSearch()
  });
  $('#sc_search_Loading').hide();
  $('#sc_search_Done').hide();

  //hash를 체크하여 hash값에 id가 있는 경우 해당값으로 검색 실행
  id = sc_global.checkHash();
  if(id!=undefined){
    //var _cat = sc_global.idToCat[parseInt(id)];
    $("#sc_search_input").tagit("createTag",id);
    sc_global.loadSearch();
  }
}

sc_global.checkHash = function() {
  var hash, args, id;
  hash = window.location.hash.replace(/\#/gi,"");
  hash = hash.substring(hash.indexOf('?')+1);
  args = hash.split('&').map(function(x) {return x.split('=')});
  for (var i=0; i<args.length; i++) if (args[i][0] == 'id') id = args[i][1];
  return id;
}

sc_global.imgError = function() {
  event.srcElement.src = "./images/icons/new/1.jpg";
}

sc_global.setScroll = function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
      if ($('#sc_search_btn').prop('disabled') == false) {
        var randInds = sc_global.popRandImageIds();
        if(randInds.length > 0) {
          $('#sc_search_btn').prop("disabled", true);
          $('#sc_search_Loading').show();
          sc_global.loadSearch(randInds);
        } else {
          $('#sc_search_Done').show();
        }
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
  //검색결과 요청
  var _url = "./data/search_result.json";
  $.ajax({
    url : _url
    ,datatype : "json"
    ,success : function(data, textStatus, xhr) {
      if(data.idlist.length > 0) {
        sc_global.imIdList = data.idlist;
        sc_global.searchResult = data.search_result;
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
    ,error : function(xhr, textStatus, err) {
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
    $("div.sc_imageDisplay").remove();
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
      imageData[imgId]['url'] = $(this)[0].url;
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
  var urlIcon = '<span class="filterIcon" title="url to share this image"><img id="filterURLIcon" class="filterIconImage" src="images/icons/url.jpg"></span>'
  var sc_url = '<a href="#showcase?id=' + imageId + '" target="_blank">' + './#showcase?id=' + imageId + '</a>';
  var urlText = sc_url + '</br>' + url;
  // category icon
  var catIcons = '';
  var iconIds = Object.keys(catToSegms);
  for (var i = 0; i < iconIds.length; i++) {
    catIcons += '<span class="filterIcon" title="' + sc_global.idToCat[iconIds[i]] + '"><img data="' + iconIds[i] + '" class="filterIconImage filterCategoryImage" src="./images/icons/new/' + iconIds[i] + '.jpg"></span>';
  }
  // blank icon
  var blankIcon = '<span class="filterIcon" title="hide segmentations"><img id="filterBlankIcon" class="filterIconImage" src="./images/icons/blank.jpg"></span>';
  // image display drawing
  var display =
  '<div class="sc_imageDisplay" id="sc_imageDisplay' + imageId + '" style="margin-bottom:15px">' +
  '<div class="sc_icons_area" style="display:inline-block">' + urlIcon + catIcons + blankIcon + '</div>' +
  '<div class="sc_url" style="display:none">' + urlText + '</div>' +
  '<div style="margin-top:1px" id="canvas_div_'+ imageId +'" class="canvas_div"><canvas class="sc_canvas"></canvas></div>' +
  '</div>';

  $('#sc_imageDisplayList').append(display);
  var display = $('#sc_imageDisplay' + imageId);

  // Draw polygon on the image
  var canvas = display.find('.sc_canvas')[0];
  var ctx = canvas.getContext("2d");
  var img = new Image;
  img.src = url;
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
    return evt.preventDefault() && false;
  };
  canvas.addEventListener('DOMMouseScroll',handleZoom,false);
  canvas.addEventListener('mousewheel',handleZoom,false);
}

sc_global.renderImage = function(ctx, img, zoom) {
  if (zoom == undefined) zoom = 0.5
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.drawImage(img, 0, 0, img.width*zoom, img.height*zoom);
}

sc_global.renderSegms = function(ctx, img, data, zoom) {
  if (zoom == undefined) zoom = 0.5
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
        ctx.beginPath();
        ctx.moveTo(poly[0], poly[1]);
        for (m=0; m<poly.length-2; m+=2){
          ctx.lineTo(poly[m+2],poly[m+3]);
        }
        ctx.lineTo(poly[0],poly[1]);
        ctx.lineWidth = 3;
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}
