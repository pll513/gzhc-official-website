(function (w, d) {
  // 事件 绑定/解除 函数
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
  
  // 解决 IE8 String类型没有indexOf方法的问题
  if (!String.prototype.indexOf) {
    String.prototype.indexOf = function (str) {
      var len1 = this.length,
        len2 = str.length,
        i;
      if (!(len1 && len2)) return -1;
      for (i = 0; i < len1; ++i) {
        if (this.slice(i, i + len2) === str) return i;
      }
      return -1;
    }
  }
  
  var ITEM_WIDTH = 356,
    THREE_ITEM_WIDTH = 1068,
    sliderWrap = getElementsByClassName('slider__wrap')[0],
    sliderItemList = sliderWrap.getElementsByTagName('div'),
    buttonWrap = d.getElementById('button-wrap'),
    activeButton,
    buttonList = buttonWrap.getElementsByTagName('button'),
    arrowLeft = d.getElementById('arrow-left'),
    arrowRight = d.getElementById('arrow-right'),
    map = {},
    lenSliderItemList = sliderItemList.length,
    lenButtonList = buttonList.length,
    SLIDER_WIDTH = ITEM_WIDTH * lenSliderItemList,
    i,
    j,
    tmpId,
    lastJ = 0,
    lastYearEventCnt,
    timerSlider;
  
  // 计算map 获得 按钮和位置 的映射
  for (i = 0; i < lenButtonList; ++i) {
    tmpId = buttonList[i].id;
    for (j = lastJ; j < lenSliderItemList; ++j) {
      if (~sliderItemList[j].className.indexOf(tmpId)) {
        map[tmpId] = -ITEM_WIDTH * j;
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
  
  console.log(SLIDER_WIDTH);
  
  // 设置滑块容器宽度
  sliderWrap.style.width = SLIDER_WIDTH + 'px';
  
  // 点击左箭头向右滑一页
  addListener(arrowLeft, 'click', function () {
    var oldLeft = parseFloat(sliderWrap.style.left) || 0,
      destLeft = (Math.floor(oldLeft / THREE_ITEM_WIDTH) + 1) * THREE_ITEM_WIDTH;
    destLeft = destLeft > 0 ? 0 : destLeft;
    clearTimeout(timerSlider);
    animateLeft(sliderWrap, destLeft);
  });
  
  // 点击右箭头向左滑一页
  addListener(arrowRight, 'click', function () {
    var oldLeft = parseFloat(sliderWrap.style.left || 0),
      destLeft = (Math.ceil(oldLeft / THREE_ITEM_WIDTH) - 1) * THREE_ITEM_WIDTH;
    destLeft = destLeft < -SLIDER_WIDTH + THREE_ITEM_WIDTH ? -SLIDER_WIDTH + THREE_ITEM_WIDTH : destLeft;
    clearTimeout(timerSlider);
    animateLeft(sliderWrap, destLeft);
  });
  
  // 实践委托 点击指定年份滑动到对应年份的第一个
  addListener(buttonWrap, 'click', function (e) {
    var event = e || w.event,
      target = event.target || event.srcElement;
    if (target.tagName === 'BUTTON') {
      clearTimeout(timerSlider);
      activeButton = getElementsByClassName('active', buttonWrap)[0];
      activeButton.className = "u-link";
      target.className = "u-link active";
      timerSlider = animateLeft(sliderWrap, map[target.id]);
    }
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
        step = 30 * Math.floor(distance / THREE_ITEM_WIDTH);
        move = function () {
          if (oldLeft + step < destLeft) {
            ele.style.left = (oldLeft = destLeft) + 'px';
          } else {
            ele.style.left = (oldLeft += step) + 'px';
            timerSlider = setTimeout(move, INTERVAL);
          }
        };
      } else {
        step = 30 * Math.ceil(distance / THREE_ITEM_WIDTH);
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
  
  /**
   * 选择指定类的标签
   * @param className {string} 类名
   * @param root [string, object] 根结点
   * @param tag [string] 标签名
   * @returns {Array}
   */
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