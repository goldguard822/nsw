function sc_global(){}
sc_global.categories = "";
sc_global.superCats = "";
sc_global.catNames = "";
sc_global.catToId = "";
sc_global.idToCat = "";
sc_global.iconSelected = [];
sc_global.imIdList = [];

sc_global.tJson = [];

sc_global.init = function(){
  sc_global.setData();
  sc_global.drawIcon();
  sc_global.setScroll();
}

sc_global.setData = function(){
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
}

//icon drawing 및 event binding
sc_global.drawIcon = function() {
  // icong HTML drawing
  var div = '', i, j;
  $.each(sc_global.superCats, function(i,v){
    div += '<div class="iconSubpanel">';
    var cats = sc_global.categories[sc_global.superCats[i]];
    $.each(cats,function(j,v){
      div += '<img title="' + cats[j].name + '" id="icon_' + cats[j].id;
      div += '" class="iconSelect" src="./images/icons/'+cats[j].id+'.jpg" onerror="sc_global.imgError()"/>';
    });
    div += '</div>';
  });
  $('#IconPanel').append(div);

  // icon event binding
  var icons = $(".iconSelect");
  $.each(icons, function(i,v){
    var icon = $(this);
    icon.data('state', false);
    icon.off('mousedown').on('mousedown', function(){
      var state = $(this).data('state');
      var cat = $(this).attr('title');
      if(state) {
        $("#search_input").tagit("removeTagByLabel", cat);
      } else {
        $("#search_input").tagit("createTag", cat);
      }
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
        var color = state?'#00DD00':'transparent';
        icon.css('border-color', color);
      }
    });
  };
  $("#search_input").tagit({
    availableTags: sc_global.catNames,
    allowDuplicates: false,
    afterTagAdded: function(e, ui) {
      var lbl=ui.tagLabel, valid=sc_global.iconSelected.indexOf(lbl)!=-1 || !isNaN(lbl);
      if(!valid) {
        $("#search_input").tagit("removeTagByLabel", lbl);
        return;
      }
      setTag(lbl,true);
    },
    afterTagRemoved: function(e, ui){
      setTag(ui.tagLabel,false);
    }
  });

  // search button click event
  $('#search_btn').off("click").on("click", function(){
    sc_global.clearCanvas();
    sc_global.loadSearch()
  });
  $('#search_Loading').hide();
  $('#search_Done').hide();

  // if hash is #explore?id then go to given image id on load
  var hash, args, id;
  hash = window.location.hash;
  hash = hash.substring(hash.indexOf('?')+1);
  args = hash.split('&').map(function(x) {return x.split('=')});
  for (var i=0; i<args.length; i++) if (args[i][0] == 'id') id = args[i][1];
  if(id!=undefined){
    $("#search_input").tagit("createTag",id);
    sc_global.loadSearch();
  }
}

sc_global.imgError = function() {
  event.srcElement.src = "./images/icons/1.jpg";
}

sc_global.setScroll = function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
      if ($('#search_btn').prop('disabled') == false) {
        var randInds = sc_global.popRandImageIds();
        if(randInds.length > 0) {
          $('#search_btn').prop("disabled", true);
          $('#search_Loading').show();
          sc_global.loadSearch(randInds);
        } else {
          $('#search_Done').show();
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

sc_global.loadSearch = function() {
  sc_global.tJson = [
    {
    "image_id":90324
    ,"caption":"A couple holds hands as they walk down a bus street."
    ,"url":"./images/test/000000090324.jpg"
    ,"segmentation":"[[498.84, 308.11, 505.38, 301.57, 512.74, 299.94, 521.32, 300.35, 524.18, 304.03, 524.18, 307.3, 522.14, 307.71, 517.23, 307.3, 512.33, 309.34, 508.65, 311.39, 507.01, 313.43, 507.01, 316.29, 505.79, 319.97, 504.15, 318.33, 501.7, 313.84]]"
    ,"category_id":3
    }
  ]

}
