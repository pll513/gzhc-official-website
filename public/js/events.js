(function (w, d) {
  
  var ITEM_WIDTH = 356,
    THREE_ITEM_WIDTH = 1068,
    sliderWrap = d.getElementById('slider-wrap'),
    sliderItemList = sliderWrap.getElementsByTagName('div'),
    buttonWrap = d.getElementById('button-wrap'),
    buttonList = buttonWrap.getElementsByTagName('button'),
    arrowLeft = d.getElementById('arrow-left'),
    arrowRight = d.getElementById('arrow-right'),
    map = {}, // 形如 { 2017: -100, 2016: -80, 2015: -40, 2014: 0 }
    positionArr = [], // 形如 [-0, -40, -80, -100]
    lenSliderItemList = sliderItemList.length,
    lenButtonList = buttonList.length,
    SLIDER_WIDTH = ITEM_WIDTH * lenSliderItemList,
    i,
    j,
    tmpId,
    lastJ = 0,
    lastYearEventCnt,
    timerSlider,
    originIndex = 0,
    isSliding = false;
  
  // 计算map 获得 按钮和位置 的映射
  for (i = 0; i < lenButtonList; ++i) {
    tmpId = buttonList[i].id;
    for (j = lastJ; j < lenSliderItemList; ++j) {
      if (~sliderItemList[j].className.indexOf(tmpId)) {
        positionArr[i] = map[tmpId] = -ITEM_WIDTH * j;
        lastJ = j;
        break;
      }
    }
  }
  
  // 根据最右边标签对应事件个数调整滑块容器宽度 事件个数不足3才需要调整
  lastYearEventCnt = lenSliderItemList - lastJ;
  if (lastYearEventCnt < 3) {
    SLIDER_WIDTH += (3 - lastYearEventCnt) * ITEM_WIDTH;
  }
  
  // 设置滑块容器宽度
  sliderWrap.style.width = SLIDER_WIDTH + 'px';
  
  // 点击左箭头向右滑一页
  M.addListener(arrowLeft, 'click', function () {
    if (isSliding) return;
    var originLeft = parseFloat(sliderWrap.style.left) || 0,
      // newLeft = (Math.floor(originLeft / THREE_ITEM_WIDTH) + 1) * THREE_ITEM_WIDTH;
      newLeft = originLeft + THREE_ITEM_WIDTH;
    newLeft = newLeft > 0 ? 0 : newLeft;
    timerSlider = animateLeft(sliderWrap, newLeft);
  });
  
  // 点击右箭头向左滑一页
  M.addListener(arrowRight, 'click', function () {
    if (isSliding) return;
    var originLeft = parseFloat(sliderWrap.style.left || 0),
      // newLeft = (Math.ceil(originLeft / THREE_ITEM_WIDTH) - 1) * THREE_ITEM_WIDTH;
      newLeft = originLeft - THREE_ITEM_WIDTH;
    newLeft = newLeft < -SLIDER_WIDTH + THREE_ITEM_WIDTH ? -SLIDER_WIDTH + THREE_ITEM_WIDTH : newLeft;
    timerSlider = animateLeft(sliderWrap, newLeft);
  });
  
  // 实践委托 点击指定年份滑动到对应年份的第一个
  M.addListener(buttonWrap, 'click', function (e) {
    var event = e || w.event,
      target = event.target || event.srcElement;
    if (target.tagName === 'BUTTON') {
      clearTimeout(timerSlider);
      animateLeft(sliderWrap, map[target.id]);
    }
  });
  
  function positionToIndex(left) {
    var i,
      len = positionArr.length;
    for (i = 0; i < len; ++i) {
      if (left > positionArr[i]) {
        return i - 1
      }
    }
    return i - 1;
  }
  
  /**
   * 根据滑块当前位置和新位置切换当前标签
   * @param newLeft {number}
   */
  function switchTag(newLeft) {
    var newIndex = positionToIndex(newLeft);
    
    if (originIndex != newIndex) {
      buttonList[originIndex].className = 'u-link';
      buttonList[newIndex].className = 'u-link active';
      originIndex = newIndex;
    }
    
  }
  
  function animateLeft(ele, newLeft, duration) {
    var INTERVAL = 20,
      originLeft = parseFloat(ele.style.left) || 0,
      moveCnt,
      step,
      move,
      distance = newLeft - originLeft;
    
    isSliding = true;
    switchTag(newLeft);
    
    if (duration) {
      moveCnt = duration / INTERVAL;
      step = (newLeft - originLeft) / moveCnt;
      if (distance < 0) {
        move = function () {
          if (originLeft + step <= newLeft) {
            ele.style.left = (originLeft = newLeft) + 'px';
            isSliding = false;
            clearTimeout(timerSlider);
          } else {
            ele.style.left = (originLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      } else {
        move = function () {
          if (originLeft + step >= newLeft) {
            ele.style.left = (originLeft = newLeft) + 'px';
            isSliding = false;
            clearTimeout(timerSlider);
          } else {
            ele.style.left = (originLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      }
    } else {
      if (distance < 0) {
        step = 30 * Math.floor(distance / THREE_ITEM_WIDTH);
        move = function () {
          if (originLeft + step <= newLeft) {
            ele.style.left = (originLeft = newLeft) + 'px';
            isSliding = false;
            clearTimeout(timerSlider);
          } else {
            ele.style.left = (originLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      } else {
        step = 30 * Math.ceil(distance / THREE_ITEM_WIDTH);
        move = function () {
          if (originLeft + step >= newLeft) {
            ele.style.left = (originLeft = newLeft) + 'px';
            isSliding = false;
            clearTimeout(timerSlider);
          } else {
            ele.style.left = (originLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      }
    }
    move();
  }
  
})(window, document);

//