(function (w, d) {
  
  var groupList = M.getElementsByClassName('m-image-text', d.getElementById('group')),
    lenGroupList = groupList.length,
    i,
    timerFadeIn = new Array(lenGroupList);
  
  // 先全设置成不可见的
  for (i = 0; i < lenGroupList; ++i) {
    groupList[i].style.opacity = 0;
  }
  
  function fadeIn(ele, index, duration) {
    var INTERVAL = 20,
      time = duration / INTERVAL,
      step = 1 / time,
      originOpacity = parseFloat(ele.style.opacity) || 0;
    
    console.log(index);
    console.log(originOpacity);
    
    function fade() {
      originOpacity = originOpacity + step;
      if (originOpacity >= 1) {
        ele.style.opacity = 1;
        clearTimeout(timerFadeIn[index]);
      } else {
        ele.style.opacity = originOpacity;
        timerFadeIn[index] = setTimeout(fade, INTERVAL);
      }
    }
    
    timerFadeIn[index] = setTimeout(fade, 0);
    
  }
  
  
  M.addListener(w, 'load', function () {
    for (i = 0; i < lenGroupList; ++i) {
      (function (i) {
        setTimeout(function () {
          fadeIn(groupList[i], i, 1000);
        }, 200 * i);
      })(i);
    }
  });
  
})(window, document);