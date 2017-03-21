(function(w, d) {
  
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
    timerSlider;
  
  // 设置滑动容器宽度
  sliderWrap.style.length = SLIDER_WIDTH + 'px';
  
  // 点击左箭头向右滑一页
  addListener(arrowLeft, 'click', function () {
    var oldLeft = parseFloat(sliderWrap.style.left) || 0,
      destLeft = (Math.floor(oldLeft / PAGE_WIDTH) + 1) * PAGE_WIDTH;
    destLeft = destLeft > 0 ? 0 : destLeft;
    clearTimeout(timerSlider);
    animateLeft(sliderWrap, destLeft);
  });
  
  // 点击右箭头向左滑一页
  addListener(arrowRight, 'click', function () {
    var oldLeft = parseFloat(sliderWrap.style.left || 0),
      destLeft = (Math.ceil(oldLeft / PAGE_WIDTH) - 1) * PAGE_WIDTH;
    destLeft = destLeft < -SLIDER_WIDTH + PAGE_WIDTH ? -SLIDER_WIDTH + PAGE_WIDTH : destLeft;
    clearTimeout(timerSlider);
    animateLeft(sliderWrap, destLeft);
  });
  
  
  function animateLeft(ele, destLeft, duration) {
    var INTERVAL = 20,
      oldLeft = parseFloat(ele.style.left) || 0,
      moveCnt,
      step,
      move,
      distance = destLeft - oldLeft;
    
    if (duration) {
      moveCnt = duration / INTERVAL;
      step = (destLeft - oldLeft) / moveCnt;
      if (distance < 0) {
        move = function () {
          if (oldLeft + step < destLeft) {
            ele.style.left = (oldLeft = destLeft) + 'px';
          } else {
            ele.style.left = (oldLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      } else {
        move = function () {
          if (oldLeft + step > destLeft) {
            ele.style.left = (oldLeft = destLeft) + 'px';
          } else {
            ele.style.left = (oldLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      }
    } else {
      if (distance < 0) {
        step = 30 * Math.floor(distance / PAGE_WIDTH);
        move = function () {
          if (oldLeft + step < destLeft) {
            ele.style.left = (oldLeft = destLeft) + 'px';
          } else {
            ele.style.left = (oldLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      } else {
        step = 30 * Math.ceil(distance / PAGE_WIDTH);
        move = function () {
          if (oldLeft + step > destLeft) {
            ele.style.left = (oldLeft = destLeft) + 'px';
          } else {
            ele.style.left = (oldLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      }
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