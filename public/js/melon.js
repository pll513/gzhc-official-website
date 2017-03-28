(function (w, d) {
  
  var melon = (function () {
    
    var melon = {};
    
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
    
    return melon;
    
  })();
  
  w.M = melon;
  
})(window, document);


(function (w, d) {
  
  var header = M.getElementsByClassName('header')[0],
    product = M.getElementsByClassName('u-link', header)[0],
    subNav = d.getElementById('sub-nav'),
    subNavLinkList = subNav.getElementsByTagName('a');
  
  console.log(product);
  
  M.addListener(product, 'mouseenter', function () {
    M.removeClass(subNav, 'f-none');
    header.style.height = '136px';
  });
  
})(window, document);
