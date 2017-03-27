(function (w, d) {
  
  var navCategory = d.getElementById('nav-category');
  
  M.addListener(navCategory, 'click', function (e) {
    
    var event = e || w.event,
      target = event.target || event.srcElement,
      targetClass = target.className,
      classCategory;
    
    if (~targetClass.indexOf('u-link')) {
      
      // 获取类别
      classCategory = targetClass.split(/\s+/)[0];
      
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      
      // 载入对应数据
      
    }
  });
  
})(window, document);