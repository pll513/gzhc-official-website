(function (w, d) {
  
  var melon = (function () {
    
    var melon = {};
    
    var animationQueue = {};
    var animationId = 0;
    
    melon.method = function (ele, funcName, func) {
      if (!ele.prototype[funcName]) {
        ele.prototype[funcName] = func;
      }
      return this;
    };
    
    melon.method(Array, 'indexOf', function (ele) {
      var i;
      var len = this.length;
      for (i = 0; i < len; ++i) {
        if (this[i] === ele) {
          return i;
        }
      }
      return -1;
    });
    
    melon.method(String, 'indexOf', function (ele) {
      var len1 = this.length,
        len2 = ele.length,
        i;
      if (!(len1 && len2)) return -1;
      for (i = 0; i < len1; ++i) {
        if (this.slice(i, i + len2) === ele) return i;
      }
      return -1;
    });
    
    melon.method(Object, 'keys', (function () {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;
      
      return function (obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
        
        var result = [], prop, i;
        
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
        
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }()));
    
    
    if (typeof addEventListener === 'function') {
      melon.addListener = function (el, type, fn) {
        el.addEventListener(type, fn, false);
      };
      melon.removeListener = function (el, type, fn) {
        el.removeEventListener(type, fn, false);
      };
    } else if (typeof attachEvent === 'function') {
      melon.addListener = function (el, type, fn) {
        el.attachEvent('on' + type, fn);
      };
      melon.removeListener = function (el, type, fn) {
        el.detachEvent('on' + type, fn);
      }
    } else {
      melon.addListener = function (el, type, fn) {
        el['on' + type] = fn;
      };
      melon.removeListener = function (el, type) {
        el['on' + type] = null;
      };
    }
    
    if (typeof w.pageYOffset === 'number') {
      melon.getScrollTop = function () {
        return w.pageYOffset;
      };
    } else {
      melon.getScrollTop = function () {
        if (d.documentElement.scrollTop > 0) {
          melon.getScrollTop = function () {
            return d.documentElement.scrollTop;
          };
          melon.setScrollTop = function (top) {
            d.documentElement.scrollTop = top;
          };
          return d.documentElement.scrollTop;
        } else if (d.body.scrollTop > 0) {
          melon.getScrollTop = function () {
            return d.body.scrollTop;
          };
          melon.setScrollTop = function (top) {
            d.body.scrollTop = top;
          };
          return d.body.scrollTop;
        }
        return d.documentElement.scrollTop || d.body.scrollTop;
      };
    }
    
    melon.getPageHeight = function () {
      var pageHeight = w.innerHeight;
      if (typeof pageHeight !== 'number') {
        if (d.compatMode === 'CSS1Compat') {
          pageHeight = d.documentElement.clientHeight;
        } else {
          pageHeight = d.body.clientHeight;
        }
      }
      return pageHeight;
    };
    
    melon.containClass = function (ele, c) {
      
      var classes = ele.className;
      
      if (c.length === 0 || c.indexOf(' ') != -1) {
        throw new Error('Invalid class name: "' + c + '"');
      }
      
      if (!classes) {
        return false;
      }
      if (classes === c) {
        return true;
      }
      return classes.search('\\b' + c + '\\b') !== -1;
      
    };
    
    melon.addClass = function (ele, c) {
      
      var classes = ele.className;
      
      if (melon.containClass(ele, c)) {
        return;
      }
      
      if (classes && classes[classes.length - 1] !== ' ') {
        c = ' ' + c;
      }
      ele.className = classes + c;
    };
    
    melon.removeClass = function (ele, c) {
      
      var pattern = new RegExp('\\b' + c + '\\b\\s*', 'g');
      ele.className = ele.className.replace(pattern, "");
      
      if (c.length === 0 || c.indexOf(' ') != -1) {
        throw new Error('Invalid class name: "' + c + '"');
      }
      
    };
    
    melon.toggleClass = function (ele, c) {
      if (melon.containClass(ele, c)) {
        melon.removeClass(ele, c);
        return false;
      } else {
        melon.addClass(ele, c);
        return true;
      }
    };
    
    melon.getElementsByClassName = function (className, root, tag) {
      
      var elementList = [];
      var elements;
      var element;
      var i;
      var j;
      var lenElements;
      var lenClassList;
      var classList;
      
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
      
    };
    
    melon.animate = function (ele, props, options) {
      var INTERVAL = 20;
      var i;
      var propNames = Object.keys(props);
      var propStartVal, propEndVal;
      var propStartVals = [], propEndVals = [], propSteps = [];
      var lenProps = propNames.length;
      var style = ele.style;
      var duration = 500;
      var stepCnt;
      var direction;
      var queueIndex = animationId++;
      
      if (!props) {
        throw new Error('a css property object is required');
      }
      if (options) {
        duration = parseInt(options.duration) || 500;
      }
      stepCnt = Math.ceil(duration / INTERVAL);
      for (i = 0; i < lenProps; ++i) {
        propStartVal = propStartVals[i] = parseInt(style[propNames[i]]) || 0;
        propEndVal = propEndVals[i] = parseInt(props[propNames[i]]);
        propSteps[i] = (propEndVal - propStartVal) / stepCnt;
      }
      direction = propSteps[0] > 0 ? 1 : -1;
      
      function oneStep() {
        if (direction * (propStartVals[0] + propSteps[0]) >= direction * propEndVals[0]) {
          // 直接结束了
          for (i = 0; i < lenProps; ++i) {
            style[propNames[i]] = propEndVals[i] + 'px';
          }
          melon.stopAnimate(queueIndex);
        } else {
          
          for (i = 0; i < lenProps; ++i) {
            style[propNames[i]] = (propStartVals[i] += propSteps[i]) + 'px';
          }
          animationQueue[queueIndex] = setTimeout(oneStep, INTERVAL);
        }
        
      }
      
      animationQueue[queueIndex] = setTimeout(oneStep, INTERVAL);
      
      return queueIndex;
      
    };
    
    melon.stopAnimate = function (queueIndex) {
      if (animationQueue[queueIndex]) {
        clearTimeout(animationQueue[queueIndex]);
        delete animationQueue[queueIndex];
      }
    };
    
    melon.fadeIn = function (ele, options) {
      var INTERVAL = 20;
      var style = ele.style;
      var duration = 500;
      var step;
      var stepCnt;
      var startOpacity = parseInt(style.opacity) || 0;
      var queueIndex = animationId++;
      
      if (options) {
        duration = parseInt(options.duration) || 500;
      }
      stepCnt = Math.ceil(duration / INTERVAL);
      step = (1 - parseInt(startOpacity)) / stepCnt;
      
      function oneStep() {
        if (startOpacity + step >= 1) {
          style.opacity = 1;
          melon.stopAnimate(queueIndex);
        } else {
          style.opacity = (startOpacity += step);
          animationQueue[queueIndex] = setTimeout(oneStep, INTERVAL);
        }
      }
      
      animationQueue[queueIndex] = setTimeout(oneStep, INTERVAL);
      
      return queueIndex;
      
    };
    
    return melon;
    
  })();
  
  w.M = melon;
  
})(window, document);

// 二级导航特效
(function (w, d) {
  
  var header = M.getElementsByClassName('header')[0],
    product = M.getElementsByClassName('nav-item', header)[0],
    nav = M.getElementsByClassName('nav', header)[0],
    subNav = d.getElementById('sub-nav'),
    subNavLinkList = subNav.getElementsByTagName('a'),
    lenSubNavLinkList = subNavLinkList.length,
    subNavLinkAnimationQueue = [];
  
  M.addListener(product, 'mouseenter', function () {
    var i;
    M.removeClass(subNav, 'f-none');
    header.style.height = '136px';
    for (i = 0; i < lenSubNavLinkList; ++i) {
      subNavLinkList[i].style.marginLeft = '55px';
    }
    for (i = 0; i < lenSubNavLinkList; ++i) {
      subNavLinkAnimationQueue[i] = M.animate(subNavLinkList[i], {marginLeft: 40}, {duration: 500});
    }
  });
  
  M.addListener(product, 'mouseleave', function () {
    var i;
    M.addClass(subNav, 'f-none');
    header.style.height = '60px';
    for (i = 0; i < lenSubNavLinkList; ++i) {
      M.stopAnimate(subNavLinkAnimationQueue[i]);
    }
  });
  
})(window, document);

// 初始淡入特效
(function (w, d) {
  
  var fadeInOneList = M.getElementsByClassName('fade-in-1'),
    fadeInTwoList = M.getElementsByClassName('fade-in-2'),
    logoCircle = d.getElementById('logo-circle'),
    bannerBg = d.getElementById('banner-bg'),
    i,
    lenOne = fadeInOneList.length,
    lenTwo = fadeInTwoList.length;
  
  for (i = 0; i < lenTwo; ++i) {
    fadeInTwoList[i].style.opacity = 0;
    fadeInTwoList[i].style.marginTop = '100px';
  }
  bannerBg.style.opacity = 0;
  logoCircle.style.marginTop = '70px';
  
  M.fadeIn(bannerBg, {duration: 1000});
  for (i = 0; i < lenOne; ++i) {
    fadeInOneList[i].style.opacity = 0;
    fadeInOneList[i].style.marginTop = '100px';
    M.fadeIn(fadeInOneList[i], {duration: 600});
    M.animate(fadeInOneList[i], {marginTop: 0}, {duration: 400});
  }
  
  
  
  setTimeout(function () {
    for (i = 0; i < lenTwo; ++i) {
      M.fadeIn(fadeInTwoList[i], {duration: 600});
      M.animate(fadeInTwoList[i], {marginTop: 0}, {duration: 400});
    }
  }, 200);
  
  
})(window, document);


// 自动淡入特效
(function (w, d) {
  
  var eleList = M.getElementsByClassName('fade-in-auto'),
    eleTopList = [],
    timerList = [],
    i,
    len = eleList.length;
  
  M.addListener(w, 'load', function () {
    var eleTop;
    for (i = 0; i < len; ++i) {
      // 计算所有自动淡入元素距文档顶部距离并缓存
      eleTop = eleTopList[i] = getContectElement(eleList[i]).offsetTop + eleList[i].offsetTop;
      
      eleList[i].style.marginTop = '200px';
      eleList[i].style.opacity = 0;
      
      (function (eleTop, i) {
        timerList[i] = setInterval(function () {
          console.log('pageHeight: ' + M.getPageHeight());
          console.log('scrollTop: ' + M.getScrollTop());
          console.log(eleTop);
          if (M.getPageHeight() + M.getScrollTop() >= eleTop) {
            // 执行淡入
            console.log('hahahaha');
            M.animate(eleList[i], {marginTop: 0}, {duration: 500});
            M.fadeIn(eleList[i], {duration: 700});
            // 解除监听
            clearInterval(timerList[i]);
          }
        }, 400);
      })(eleTop, i);
      
    }
    console.log(eleTopList);
  });
  
  function getContectElement(curr) {
    while (!M.containClass(curr, 'sec')) {
      if (curr.tagName === 'BODY') return;
      curr = curr.parentNode;
    }
    return curr;
  }
  
})(window, document);

