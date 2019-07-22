function sc_global(){}
sc_global.categories = "";
sc_global.superCats = "";
sc_global.catNames = [];
sc_global.catToId = {};
sc_global.idToCat = "";
sc_global.iconSelected = [];
sc_global.imIdList = [];
sc_global.defaultScale = 0.5;
sc_global.delta = 0;

sc_global.tJson0 = [];
sc_global.tJson1 = [];
sc_global.tJson2 = [];

sc_global.init = function(){
  sc_global.setData();
  sc_global.drawIcon();
  sc_global.setScroll();
}

sc_global.setData = function(){
  //카테고리 정보 연동 해야함..
  /*
  sc_global.categories = {
    'outdoor': [{'supercategory': 'outdoor', 'id': 10, 'name': 'traffic light'}, {'supercategory': 'outdoor', 'id': 11, 'name': 'fire hydrant'}, {'supercategory': 'outdoor', 'id': 13, 'name': 'stop sign'}, {'supercategory': 'outdoor', 'id': 14, 'name': 'parking meter'}, {'supercategory': 'outdoor', 'id': 15, 'name': 'bench'}], 'food': [{'supercategory': 'food', 'id': 52, 'name': 'banana'}, {'supercategory': 'food', 'id': 53, 'name': 'apple'}, {'supercategory': 'food', 'id': 54, 'name': 'sandwich'}, {'supercategory': 'food', 'id': 55, 'name': 'orange'}, {'supercategory': 'food', 'id': 56, 'name': 'broccoli'}, {'supercategory': 'food', 'id': 57, 'name': 'carrot'}, {'supercategory': 'food', 'id': 58, 'name': 'hot dog'}, {'supercategory': 'food', 'id': 59, 'name': 'pizza'}, {'supercategory': 'food', 'id': 60, 'name': 'donut'}, {'supercategory': 'food', 'id': 61, 'name': 'cake'}], 'indoor': [{'supercategory': 'indoor', 'id': 84, 'name': 'book'}, {'supercategory': 'indoor', 'id': 85, 'name': 'clock'}, {'supercategory': 'indoor', 'id': 86, 'name': 'vase'}, {'supercategory': 'indoor', 'id': 87, 'name': 'scissors'}, {'supercategory': 'indoor', 'id': 88, 'name': 'teddy bear'}, {'supercategory': 'indoor', 'id': 89, 'name': 'hair drier'}, {'supercategory': 'indoor', 'id': 90, 'name': 'toothbrush'}], 'appliance': [{'supercategory': 'appliance', 'id': 78, 'name': 'microwave'}, {'supercategory': 'appliance', 'id': 79, 'name': 'oven'}, {'supercategory': 'appliance', 'id': 80, 'name': 'toaster'}, {'supercategory': 'appliance', 'id': 81, 'name': 'sink'}, {'supercategory': 'appliance', 'id': 82, 'name': 'refrigerator'}], 'sports': [{'supercategory': 'sports', 'id': 34, 'name': 'frisbee'}, {'supercategory': 'sports', 'id': 35, 'name': 'skis'}, {'supercategory': 'sports', 'id': 36, 'name': 'snowboard'}, {'supercategory': 'sports', 'id': 37, 'name': 'sports ball'}, {'supercategory': 'sports', 'id': 38, 'name': 'kite'}, {'supercategory': 'sports', 'id': 39, 'name': 'baseball bat'}, {'supercategory': 'sports', 'id': 40, 'name': 'baseball glove'}, {'supercategory': 'sports', 'id': 41, 'name': 'skateboard'}, {'supercategory': 'sports', 'id': 42, 'name': 'surfboard'}, {'supercategory': 'sports', 'id': 43, 'name': 'tennis racket'}], 'animal': [{'supercategory': 'animal', 'id': 16, 'name': 'bird'}, {'supercategory': 'animal', 'id': 17, 'name': 'cat'}, {'supercategory': 'animal', 'id': 18, 'name': 'dog'}, {'supercategory': 'animal', 'id': 19, 'name': 'horse'}, {'supercategory': 'animal', 'id': 20, 'name': 'sheep'}, {'supercategory': 'animal', 'id': 21, 'name': 'cow'}, {'supercategory': 'animal', 'id': 22, 'name': 'elephant'}, {'supercategory': 'animal', 'id': 23, 'name': 'bear'}, {'supercategory': 'animal', 'id': 24, 'name': 'zebra'}, {'supercategory': 'animal', 'id': 25, 'name': 'giraffe'}], 'vehicle': [{'supercategory': 'vehicle', 'id': 2, 'name': 'bicycle'}, {'supercategory': 'vehicle', 'id': 3, 'name': 'car'}, {'supercategory': 'vehicle', 'id': 4, 'name': 'motorcycle'}, {'supercategory': 'vehicle', 'id': 5, 'name': 'airplane'}, {'supercategory': 'vehicle', 'id': 6, 'name': 'bus'}, {'supercategory': 'vehicle', 'id': 7, 'name': 'train'}, {'supercategory': 'vehicle', 'id': 8, 'name': 'truck'}, {'supercategory': 'vehicle', 'id': 9, 'name': 'boat'}], 'furniture': [{'supercategory': 'furniture', 'id': 62, 'name': 'chair'}, {'supercategory': 'furniture', 'id': 63, 'name': 'couch'}, {'supercategory': 'furniture', 'id': 64, 'name': 'potted plant'}, {'supercategory': 'furniture', 'id': 65, 'name': 'bed'}, {'supercategory': 'furniture', 'id': 67, 'name': 'dining table'}, {'supercategory': 'furniture', 'id': 70, 'name': 'toilet'}], 'accessory': [{'supercategory': 'person', 'id': 1, 'name': 'person'}, {'supercategory': 'accessory', 'id': 27, 'name': 'backpack'}, {'supercategory': 'accessory', 'id': 28, 'name': 'umbrella'}, {'supercategory': 'accessory', 'id': 31, 'name': 'handbag'}, {'supercategory': 'accessory', 'id': 32, 'name': 'tie'}, {'supercategory': 'accessory', 'id': 33, 'name': 'suitcase'}], 'electronic': [{'supercategory': 'electronic', 'id': 72, 'name': 'tv'}, {'supercategory': 'electronic', 'id': 73, 'name': 'laptop'}, {'supercategory': 'electronic', 'id': 74, 'name': 'mouse'}, {'supercategory': 'electronic', 'id': 75, 'name': 'remote'}, {'supercategory': 'electronic', 'id': 76, 'name': 'keyboard'}, {'supercategory': 'electronic', 'id': 77, 'name': 'cell phone'}], 'kitchen': [{'supercategory': 'kitchen', 'id': 44, 'name': 'bottle'}, {'supercategory': 'kitchen', 'id': 46, 'name': 'wine glass'}, {'supercategory': 'kitchen', 'id': 47, 'name': 'cup'}, {'supercategory': 'kitchen', 'id': 48, 'name': 'fork'}, {'supercategory': 'kitchen', 'id': 49, 'name': 'knife'}, {'supercategory': 'kitchen', 'id': 50, 'name': 'spoon'}, {'supercategory': 'kitchen', 'id': 51, 'name': 'bowl'}]
  };

  sc_global.superCats = [
    'accessory', 'vehicle', 'outdoor', 'animal', 'sports', 'kitchen',  'food', 'furniture', 'electronic', 'appliance', 'indoor'
  ];

  sc_global.catNames = [
    'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
  ];

  sc_global.catToId = {
    'toilet': 70, 'teddy bear': 88, 'cup': 47, 'bicycle': 2, 'kite': 38, 'carrot': 57, 'stop sign': 13, 'tennis racket': 43, 'donut': 60, 'snowboard': 36, 'sandwich': 54, 'motorcycle': 4, 'oven': 79, 'keyboard': 76, 'scissors': 87, 'airplane': 5, 'couch': 63, 'mouse': 74, 'fire hydrant': 11, 'boat': 9, 'apple': 53, 'sheep': 20, 'horse': 19, 'banana': 52, 'baseball glove': 40, 'tv': 72, 'traffic light': 10, 'chair': 62, 'bowl': 51, 'microwave': 78, 'bench': 15, 'book': 84, 'elephant': 22, 'orange': 55, 'tie': 32, 'clock': 85, 'bird': 16, 'knife': 49, 'pizza': 59, 'fork': 48, 'hair drier': 89, 'frisbee': 34, 'umbrella': 28, 'bottle': 44, 'bus': 6, 'bear': 23, 'vase': 86, 'toothbrush': 90, 'spoon': 50, 'train': 7, 'sink': 81, 'potted plant': 64, 'handbag': 31, 'cell phone': 77, 'toaster': 80, 'broccoli': 56, 'refrigerator': 82, 'laptop': 73, 'remote': 75, 'surfboard': 42, 'cow': 21, 'dining table': 67, 'hot dog': 58, 'car': 3, 'sports ball': 37, 'skateboard': 41, 'dog': 18, 'bed': 65, 'cat': 17, 'person': 1, 'skis': 35, 'giraffe': 25, 'truck': 8, 'parking meter': 14, 'suitcase': 33, 'cake': 61, 'wine glass': 46, 'baseball bat': 39, 'backpack': 27, 'zebra': 24
  };

  sc_global.idToCat = {
    1: 'person', 2: 'bicycle', 3: 'car', 4: 'motorcycle', 5: 'airplane', 6: 'bus', 7: 'train', 8: 'truck', 9: 'boat', 10: 'traffic light', 11: 'fire hydrant', 13: 'stop sign', 14: 'parking meter', 15: 'bench', 16: 'bird', 17: 'cat', 18: 'dog', 19: 'horse', 20: 'sheep', 21: 'cow', 22: 'elephant', 23: 'bear', 24: 'zebra', 25: 'giraffe', 27: 'backpack', 28: 'umbrella', 31: 'handbag', 32: 'tie', 33: 'suitcase', 34: 'frisbee', 35: 'skis', 36: 'snowboard', 37: 'sports ball', 38: 'kite', 39: 'baseball bat', 40: 'baseball glove', 41: 'skateboard', 42: 'surfboard', 43: 'tennis racket', 44: 'bottle', 46: 'wine glass', 47: 'cup', 48: 'fork', 49: 'knife', 50: 'spoon', 51: 'bowl', 52: 'banana', 53: 'apple', 54: 'sandwich', 55: 'orange', 56: 'broccoli', 57: 'carrot', 58: 'hot dog', 59: 'pizza', 60: 'donut', 61: 'cake', 62: 'chair', 63: 'couch', 64: 'potted plant', 65: 'bed', 67: 'dining table', 70: 'toilet', 72: 'tv', 73: 'laptop', 74: 'mouse', 75: 'remote', 76: 'keyboard', 77: 'cell phone', 78: 'microwave', 79: 'oven', 80: 'toaster', 81: 'sink', 82: 'refrigerator', 84: 'book', 85: 'clock', 86: 'vase', 87: 'scissors', 88: 'teddy bear', 89: 'hair drier', 90: 'toothbrush'
  };
  */

  sc_global.categories = [
    {'id': 1, 'name': '탄약'}, {'id': 2, 'name': '폭죽'}, {'id': 3, 'name': '라이터'}, {'id': 4, 'name': '에어로졸'}, {'id': 5, 'name': '휴대용가스'}, {'id': 6, 'name': '알코올'}, {'id': 7, 'name': '신나'}, {'id': 8, 'name': '라이터기름'}, {'id': 9, 'name': '성냥'}
    , {'id': 10, 'name': '고체연료'}, {'id': 11, 'name': '건전지'}, {'id': 12, 'name': '휴대용 배터리'}, {'id': 13, 'name': '손톱깎이'}, {'id': 14, 'name': '칼'}, {'id': 15, 'name': '톱'}, {'id': 16, 'name': '가위'}, {'id': 17, 'name': '송곳'}, {'id': 18, 'name': '드라이버'}, {'id': 19, 'name': '스패너'}
    , {'id': 20, 'name': '액체(100ml이상)'}, {'id': 21, 'name': '수갑'}, {'id': 22, 'name': '도끼'}, {'id': 23, 'name': '망치'}, {'id': 24, 'name': '야구배트'}, {'id': 25, 'name': '총기'}, {'id': 26, 'name': '금속 파이프'}, {'id': 27, 'name': '총기부품'}, {'id': 28, 'name': '핸드폰'}, {'id': 29, 'name': 'USB'}
    , {'id': 30, 'name': '노트북'}, {'id': 31, 'name': 'Tablet'}, {'id': 32, 'name': 'SSD'}, {'id': 33, 'name': 'HDD'}, {'id': 34, 'name': '외장하드'}
  ];
  $.each(sc_global.categories, function(i,v){
    //console.log(sc_global.categories[i]);
    sc_global.catNames.push($(this)[0].name);
    sc_global.catToId[$(this)[0].name] = $(this)[0].id;
    sc_global.idToCat[$(this)[0].id] = $(this)[0].name;
  });
}

//icon drawing 및 event binding
sc_global.drawIcon = function() {
  // icong HTML drawing
  var div = '', i, j;
  //$.each(sc_global.superCats, function(i,v){
    div += '<div class="iconSubpanel">';
    //var cats = sc_global.categories[sc_global.superCats[i]];
    var cats = sc_global.categories;
    $.each(cats,function(j,v){
  //    div += '<span class="iconSelectWrap">';
      div += '<img title="' + cats[j].name + '" id="icon_' + cats[j].id;
      div += '" class="iconSelect" src="./images/icons/new/'+cats[j].id+'.jpg" onerror="sc_global.imgError()"/>';
  //    div += '</span>'
    });
    div += '</div>';
  //});
  $('#sc_IconPanel').append(div);

  // icon event binding
  var icons = $(".iconSelect");
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
      // click effect 임시 코드
      /*
      $(".effects").removeClass("effects");
      var _this = $(this);
      setTimeout(function(){
        _this.closest("span.iconSelectWrap").addClass("effects");
      }, 200);
      */
    });
    sc_global.iconSelected.push(icon.attr('title'));
  });

  // tagit setting
  var setTag = function(tag,state) {
    var icons = $(".iconSelect");
    $.each(icons, function(i,v){
      var icon = $(this);
      if (icon.attr('title') == tag) {
        icon.data('state', state);
        var color = state?'#2177aa':'#ccc';
        icon.css('border-color', color);
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

  // search button click event
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

  // if hash is #explore?id then go to given image id on load
  id = sc_global.checkHash();
  if(id!=undefined){
    $("#sc_search_input").tagit("createTag",id);
    sc_global.loadSearch();
  }
}

sc_global.checkHash = function() {
  var hash, args, id;
  hash = window.location.hash;
  hash = hash.substring(hash.indexOf('?')+1);
  args = hash.split('&').map(function(x) {return x.split('=')});
  for (var i=0; i<args.length; i++) if (args[i][0] == 'id') id = args[i][1];
  return id;
}

sc_global.imgError = function() {
  event.srcElement.src = "./images/icons/1.jpg";
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
  //검색결과 요청 필요
  //sc_global.tJson0 = [90324];
  sc_global.tJson0 = [4221];
  sc_global.tJson1 = [
    {
      "id": 56039,
      //"id":4221,
      "image_id": 4221,
      "category_id": 26,
      "url":"./images/test/4221.png",
      "segmentation": [
        [
          395.6,
          411.6,
          422.3,
          472.2,
          422.3,
          480.3,
          310.2,
          547.4,
          306.6,
          547.2,
          279.2,
          476.5,
          281,
          471.9,
          391.7,
          410
        ]
      ]
    },
    {
      "id": 56043,
      // "id":4221,
      "image_id": 4221,
      "category_id": 26,
      "url":"./images/test/4221.png",
      "segmentation": [
        [
          807.9,
          384.5,
          838.2,
          427.1,
          847.4,
          447.6,
          751,
          540.3,
          739.5,
          526.5,
          710.5,
          476.6,
          714.2,
          468.1,
          807.6,
          384.7
        ]
      ]
    },
    {
      "id": 56050,
      // "id":4221,
      "image_id": 4221,
      "category_id": 26,
      "url":"./images/test/4221.png",
      "segmentation": [
        [
          1495.5,
          328.8,
          1506.5,
          356.6,
          1510.9,
          383.7,
          1394.1,
          406.1,
          1388.1,
          405.3,
          1373,
          344.7,
          1391.7,
          340.4,
          1492.3,
          327.8
        ]
      ]
    }
  ];


  /*
  sc_global.tJson1 = [
    {
      "id":90324
      ,"image_id":90324
      ,"caption":"A couple holds hands as they walk down a bus street."
      ,"url":"./images/test/000000090324.jpg"
    }
  ]
  sc_global.tJson2 = [
    {
      "category_id":1
      ,"image_id":90324
      ,"segmentation":"[[135.75, 427.0, 131.57, 413.52, 140.35, 405.58, 137.84, 387.2, 131.16, 370.5, 123.22, 357.97, 117.37, 353.79, 110.69, 347.94, 110.69, 347.11, 114.03, 341.68, 114.03, 341.68, 118.63, 331.24, 113.61, 320.79, 109.02, 315.37, 98.58, 313.69, 92.73, 313.69, 88.14, 319.54, 86.05, 326.64, 86.05, 334.16, 86.88, 337.92, 84.38, 340.01, 79.78, 345.44, 76.02, 350.87, 73.1, 353.79, 68.92, 359.64, 67.67, 355.88, 65.17, 360.89, 62.66, 365.9, 60.15, 370.08, 60.15, 370.08, 59.32, 375.09, 66.84, 388.46, 71.43, 394.3, 76.44, 398.48, 81.87, 405.16, 86.47, 410.18, 87.72, 421.45, 89.39, 427.0]]"
    }
    ,{
      "category_id":1
      ,"image_id":90324
      ,"segmentation":"[[550.5, 346.69, 550.5, 343.82, 550.5, 339.99, 549.55, 329.46, 549.55, 328.5, 550.5, 323.71, 553.38, 321.8, 560.08, 314.14, 561.04, 311.27, 561.99, 306.48, 561.99, 300.74, 554.33, 294.99, 554.33, 293.08, 553.38, 286.37, 561.04, 276.8, 572.52, 275.84, 577.31, 288.29, 578.27, 289.25, 578.27, 295.95, 588.8, 309.35, 589.76, 311.27, 589.76, 316.05, 589.76, 319.88, 587.84, 329.46, 587.84, 333.29, 583.06, 365.84, 583.06, 377.33, 585.93, 398.39, 580.18, 403.18, 577.31, 412.75, 577.31, 414.67, 571.57, 422.32, 549.55, 418.5, 551.46, 416.58, 552.42, 409.88, 553.38, 408.92, 552.42, 397.43, 548.59, 391.69, 551.46, 381.16, 551.46, 373.5, 550.5, 367.75, 550.5, 359.14, 549.55, 352.43]]"
    }
    ,{
      "category_id":3
      ,"image_id":90324
      ,"segmentation":"[[498.84, 308.11, 505.38, 301.57, 512.74, 299.94, 521.32, 300.35, 524.18, 304.03, 524.18, 307.3, 522.14, 307.71, 517.23, 307.3, 512.33, 309.34, 508.65, 311.39, 507.01, 313.43, 507.01, 316.29, 505.79, 319.97, 504.15, 318.33, 501.7, 313.84]]"
    }
    ,{
      "category_id":31
      ,"image_id":90324
      ,"segmentation":"[[584.33, 328.72, 574.38, 315.33, 570.58, 313.88, 569.31, 312.79, 564.06, 310.98, 560.44, 310.08, 565.69, 307.36, 567.68, 306.82, 571.3, 308.45, 577.27, 312.61, 589.4, 324.01, 585.96, 329.08]]"
    }
  ]
  */

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

sc_global.loadImageByCats = function(tags) {
  var categoryIds = tags.map(function(x){return sc_global.catToId[x];});
  if (categoryIds.length == 0) categoryIds = [-1];
  /*
  var req= {"category_ids": categoryIds, "querytype": "getImagesByCats"};
  $.ajax({
    type: 'POST',
    url: 'https://us-central1-open-images-dataset.cloudfunctions.net/coco-dataset-bigquery',
    data: req,
  }).done( function(data) {
    imIdList = data;
    $('#search_Count').text(imIdList.length + ' results');
    sc_global.loadVisualizations(sc_global.popRandImageIds());
  });
  */

  sc_global.imIdList = sc_global.tJson0; //IdList 세팅
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
  $.each(sc_global.tJson1, function(i,v){
    var imgId = $(this)[0].image_id;
    if (imageData[imgId] == undefined) {
      imageData[imgId] = {};
      imageData[imgId]['url'] = $(this)[0].url;
      imageData[imgId]['instances'] = [];
    }

    imageData[imgId]['instances'].push(
      {
        "category_id" : $(this)[0].category_id,
        "image_id" : $(this)[0].image_id,
        "segmentation" : $(this)[0].segmentation
      }
    );
  });

  /*
  $.each(sc_global.tJson2, function(i,v){
    var imgId = $(this)[0].image_id;
    imageData[imgId]['instances'].push($(this)[0]);
  });
  */
  callback(imageData);
  /*
  var promises = [];
  var querytypes = ["getImages", "getInstances", "getCaptions"];
  for (var i = 0; i < 3; i++) {
    var req= {"image_ids": imageIds, "querytype": querytypes[i]};
    promises.push($.ajax({
      type: 'POST',
      url: 'https://us-central1-open-images-dataset.cloudfunctions.net/coco-dataset-bigquery',
      data: req,
    }).done(function(data){
      return data
    }));
  }
  Promise.all(promises).then(function(data) {
    var images = data[0];
    var instances = data[1];
    var captions = data[2];
    var imageData = {};
    for (var i=0; i<images.length; i++){
      var imgId = images[i]['id']
      imageData[imgId] = {};
      imageData[imgId]['flickr_url'] = images[i]['flickr_url'];
      imageData[imgId]['coco_url'] = images[i]['coco_url'];
      imageData[imgId]['instances'] = [];
      imageData[imgId]['captions'] = [];
    }
    for (var i=0; i<instances.length; i++){
      var imgId = instances[i]['image_id'];
      imageData[imgId]['instances'].push(instances[i]);
    }
    for (var i=0; i<captions.length; i++){
      var imgId = captions[i]['image_id'];
      imageData[imgId]['captions'].push(captions[i]['caption'].toLowerCase());
    }
    callback(imageData);
  });
  */
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
  // caption icon
  //var captionIcon = '<span class="filterIcon" style="margin-right:10px" title="show captions"><img id="filterCaptionIcon" class="filterIconImage" src="./images/icons/sentences.jpg"></span>'
  //var captionText = '<span>' + captions.join('<br>') + '</span>';
  // category icon
  var catIcons = '';
  var iconIds = Object.keys(catToSegms);
  for (var i = 0; i < iconIds.length; i++) {
    catIcons += '<span class="filterIcon" title="' + sc_global.idToCat[iconIds[i]] + '"><img data="' + iconIds[i] + '" class="filterIconImage filterCategoryImage" src="./images/icons/' + iconIds[i] + '.jpg"></span>';
  }
  // blank icon
  var blankIcon = '<span class="filterIcon" title="hide segmentations"><img id="filterBlankIcon" class="filterIconImage" src="./images/icons/blank.jpg"></span>';
  // image display drawing
  var display =
  '<div class="sc_imageDisplay" id="sc_imageDisplay' + imageId + '" style="margin-bottom:15px">' +
  //'<div class="sc_icons_area" style="display:inline-block">' + urlIcon + captionIcon + catIcons + blankIcon + '</div>' +
  '<div class="sc_icons_area" style="display:inline-block">' + urlIcon + catIcons + blankIcon + '</div>' +
  '<div class="sc_url" style="display:none">' + urlText + '</div>' +
  //'<div class="sc_caption" style="display:none">' + captionText + '</div>' +
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

  // Add listeners captions icon(s)
  /*
  display.find('#filterCaptionIcon').on('click', function () {
    var x = $(this).parents('.sc_imageDisplay').find('.sc_caption');
    if (x.css('display') == 'none'){
      x.css('display', 'block');
    } else {
      x.css('display', 'none');
    }
  });
  */

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
      //var polys = JSON.parse(segms[j]['segmentation']);
      var polys = segms[j]['segmentation'];
      // loop over all polygons
      for (var k=0; k<polys.length; k++){
        var poly = polys[k];
        ctx.beginPath();
        ctx.moveTo(poly[0], poly[1]);
        for (m=0; m<poly.length-2; m+=2){
          // let's draw!!!!
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
