(function (w, d) {
  
  var navCategory = d.getElementById('nav-category'),
    navList = M.getElementsByClassName('u-link', navCategory),
    categoryList = M.getElementsByClassName('f-mgt-55'),
    categoryMap = {},
    i, len = categoryList.length;
  
  categoryMap.hot = categoryList[0];
  categoryMap.tech = categoryList[1];
  categoryMap.product = categoryList[2];
  categoryMap.market = categoryList[3];
  categoryMap.intern = categoryList[4];
  categoryMap.welfare = categoryList[5];
  
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
      for (i = 0; i < len; ++i) {
        M.removeClass(navList[i], 'active');
      }
      M.addClass(target, 'active');
      
      for (i = 0; i < len; ++i) {
        M.addClass(categoryList[i], 'f-none');
      }
      M.removeClass(categoryMap[classCategory], 'f-none');
      
    }
  });
  
  
})(window, document);