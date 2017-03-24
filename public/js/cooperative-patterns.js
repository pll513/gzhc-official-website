(function (w, d) {
  
  var addListener, removeListener;
  if (typeof addEventListener === 'function') {
    addListener = function (el, type, fn) {
      el.addEventListener(type, fn, false);
    };
    removeListener = function (el, type, fn) {
      el.removeEventListener(type, fn, false);
    };
  } else if (typeof attachEvent === 'function') {
    addListener = function (el, type, fn) {
      el.attachEvent('on' + type, fn);
    };
    removeListener = function (el, type, fn) {
      el.detachEvent('on' + type, fn);
    }
  } else {
    addListener = function (el, type, fn) {
      el['on' + type] = fn;
    };
    removeListener = function (el, type) {
      el['on' + type] = null;
    };
  }
  
  var sliderWrap = getElementsByClassName('slider__wrap')[0],
    sliderPageList = getElementsByClassName('slider__page', sliderWrap),
    lenSliderPage = sliderPageList.length,
    PAGE_WIDTH = 620,
    SLIDER_WIDTH = PAGE_WIDTH * lenSliderPage,
    arrowLeft = d.getElementById('arrow-left'),
    arrowRight = d.getElementById('arrow-right'),
    timerSlider,
    timerCountUp,
    isSliding;
  
  // 设置滑动容器宽度
  sliderWrap.style.length = SLIDER_WIDTH + 'px';
  
  // 点击左箭头向右滑一页
  addListener(arrowLeft, 'click', function () {
    if (isSliding) return;
    var oldLeft = parseFloat(sliderWrap.style.left) || 0,
      destLeft = oldLeft + PAGE_WIDTH;
    destLeft = destLeft > 0 ? 0 : destLeft;
    animateLeft(sliderWrap, destLeft);
  });
  
  // 点击右箭头向左滑一页
  addListener(arrowRight, 'click', function () {
    if (isSliding) return;
    var oldLeft = parseFloat(sliderWrap.style.left || 0),
      destLeft = oldLeft - PAGE_WIDTH;
    destLeft = destLeft < -SLIDER_WIDTH + PAGE_WIDTH ? -SLIDER_WIDTH + PAGE_WIDTH : destLeft;
    animateLeft(sliderWrap, destLeft);
  });
  
  // 数字自增效果
  var countUpList = getElementsByClassName('count-up');
  console.log(countUpList);
  w.onload = function () {
    var i, len = countUpList.length;
    timerCountUp = new Array(len);
    for (i = 0; i < len; ++i) countUpTo(countUpList[i], i, 1000);
  };
  
  function countUpTo(ele, index, duration) {
    var interval = 20,
      count,
      step,
      increase,
      originNum = 0,
      finalNum = parseInt(ele.innerHTML) || 0;
    
    duration = duration || 1000;
    count = duration / interval;  // 不是整数也没关系
    step = Math.ceil(finalNum / count);
    
    // 如果数字本身比较小那么需要增大时间间隔
    if (step == 1) interval = duration / finalNum;
    
    ele.innerHTML = 0;
    
    increase = function () {
      if (originNum + step >= finalNum) {
        clearTimeout(timerCountUp);
      } else {
        ele.innerHTML = originNum += step;
        timerCountUp[index] = setTimeout(increase, interval);
      }
    };
    timerCountUp[index] = setTimeout(increase, interval);
  }
  
  function animateLeft(ele, destLeft, duration) {
    var INTERVAL = 20,
      oldLeft = parseFloat(ele.style.left) || 0,
      moveCnt,
      step,
      move,
      distance = destLeft - oldLeft;
    
    duration = duration || 800;
    moveCnt = duration / INTERVAL;
    step = (destLeft - oldLeft) / moveCnt;
    
    isSliding = true;
    
    if (distance < 0) {
      move = function () {
        if (oldLeft + step <= destLeft) {
          ele.style.left = (oldLeft = destLeft) + 'px';
          isSliding = false;
          clearTimeout(timerSlider);
        } else {
          ele.style.left = (oldLeft += step) + 'px';
          timerSlider = setTimeout(move, INTERVAL);
        }
      };
    } else {
      move = function () {
        if (oldLeft + step >= destLeft) {
          ele.style.left = (oldLeft = destLeft) + 'px';
          isSliding = false;
          clearTimeout(timerSlider);
        } else {
          ele.style.left = (oldLeft += step) + 'px';
          timerSlider = setTimeout(move, INTERVAL);
        }
      };
    }
    move();
  }
  
  
  function getElementsByClassName(className, root, tag) {
    var elementList = [],
      elements,
      element,
      i,
      j,
      lenElements,
      lenClassList,
      classList;
    
    root = typeof root === 'string' ? d.getElementById(root) : root;
    if (!root) {
      root = d.body;
    }
    
    if (typeof root.getElementsByClassName === 'function') {
      return root.getElementsByClassName(className);
    }
    
    tag = tag || '*';
    elements = root.getElementsByTagName(tag);
    
    for (i = 0, lenElements = elements.length; i < lenElements; ++i) {
      element = elements[i];
      classList = element.className.split(' ');
      lenClassList = classList.length;
      for (j = 0; j < lenClassList; ++j) {
        if (classList[j] === className) {
          elementList.push(element);
          break;
        }
      }
    }
    return elementList;
  }
})(window, document);