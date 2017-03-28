/**
 * 这部分代码写得比较糟糕
 * 抛开了把4个页面写在一起的客观选择导致的复杂性
 * 许多变量名的选取比较纠结
 * 为了提高DOM性能没有选择切换的时候删除节点而是选择隐藏节点
 * 因此在做动效的时候额外保存了一些引用和状态
 * 此后会考虑重写这部分代码
 * 提高可读性
 */

(function (w, d) {
  
  var
    IMG_WIDTH = 204,
    IMAGE = {
      website: [
        '/images/products/website1.png',
        '/images/products/website2.png',
        '/images/products/website3.png',
        '/images/products/website4.png'
      ],
      treatment: [
        '/images/products/treatment1.png',
        '/images/products/treatment2.png',
        '/images/products/treatment3.png'
      ],
      remind: [
        '/images/products/remind1.png',
        '/images/products/remind2.png',
        '/images/products/remind3.png',
        '/images/products/remind4.png',
        '/images/products/remind5.png',
        '/images/products/remind6.png',
        '/images/products/remind7.png'
      ],
      service: [
        '/images/products/service1.png',
        '/images/products/service2.png',
        '/images/products/service3.png',
        '/images/products/service4.png',
        '/images/products/service5.png',
        '/images/products/service6.png',
        '/images/products/service7.png'
      ]
    },
    IMG_LEN = {
      website: 4,
      treatment: 3,
      remind: 7,
      service: 7
    },
    DATA = {
      website: [
        {
          title: '医院介绍',
          desc: '为患者展示医院基本信息，包括医院级别、历史、规模、荣誉、联系方式等。'
        },
        {
          title: '科室介绍',
          desc: '为患者展示科室基本信息，包括科室级别、发展历史、团队组成、医疗技术、联系方式、科室位置等。'
        },
        {
          title: '医生介绍',
          desc: '为患者展示医生基本信息，包括医生照片、姓名、头衔、所擅专长等。'
        },
        {
          title: '来院导航',
          desc: '为患者展示来院线路图导航，指引患者及家属来院。'
        }
      ],
      treatment: [
        {
          title: '预约挂号',
          desc: '患者可直接通过医院的微信服务号选择就诊日期、就诊医生，进行预约挂号。'
        },
        {
          title: '门诊缴费',
          desc: '患者可直接通过医院的额微信服务号缴纳门诊费用。'
        },
        {
          title: '排队就诊',
          desc: '患者可通过医院的微信服务号查看门诊排队、检查排队、取药排队情况。'
        }
      ],
      remind: [
        {
          title: '儿童疫苗提醒',
          desc: '定期为儿童推送每次需注册疫苗的时间及具体内容。'
        },
        {
          title: '新生儿童检查提醒',
          desc: '定期为新生儿童推送每次检查的建议时间和每次检查的内容。'
        },
        {
          title: '孕妇孕检提醒',
          desc: '定期为孕妇推送每次产检的建议时间和每次产检的内容。'
        },
        {
          title: '就诊提醒',
          desc: '就诊前一天，医院的微信服务号进行消息推送，提醒患者来院就诊。'
        },
        {
          title: '待缴费提醒',
          desc: '患者有待缴费项时，医院的微信服务号进行消息推送，提醒患者缴纳费用。'
        },
        {
          title: '报告发布提醒',
          desc: '患者有报告时，医院的微信服务号进行消息推送，提醒患者查看相关报告。'
        },
        {
          title: '停诊提醒',
          desc: '患者预约的医生停诊时，医院的微信服务号进行消息推送，提醒患者预约其他医生。'
        }
      ],
      service: [
        {
          title: '扫码支付',
          desc: '患者通过手机扫一扫就能完成支付。'
        },
        {
          title: '当面付',
          desc: '患者点击“刷卡”出示条形码和二维码，收费窗口扫码即可完成支付。'
        },
        {
          title: '医生个性二维码',
          desc: '扫描医生二维码，即可提供医生个人详细信息。'
        },
        {
          title: '就诊卡卡包',
          desc: '当微信就诊卡添加至卡包后，医院可通过扫码枪扫描卡号条形码，以取代原有的刷卡动作。'
        },
        {
          title: '自我预检',
          desc: '患者通过简单的选择各部位症状，获得相关科室诊疗推荐，给不了解自己症状病情的患者提供科室挂号引导。'
        },
        {
          title: '满意度调查',
          desc: '给患者发送电子问卷，调查患者满意度。'
        },
        {
          title: '语音智能机器人',
          desc: '患者可直接通过语音预设好的关键词，直接获得机器人的答疑帮助。'
        }
      ]
    },
    EXTRA = {
      website: '除此之外，微网站还为医院提供楼群分布、服务指南等功能，并可根据医院要求进行定制化开发。',
      treatment: '除此之外，微网站还为医院提供当班挂号、住院缴费、电子就诊卡等功能信息，并可根据医院要求进行定制化开发。',
      remind: '除此之外，微网站还为医院提供住院押金不足提醒、孕妇孕检提醒、儿童疫苗接种提醒等功能信息，并可根据医院要求进行定制化开发。',
      service: '除此之外，微网站还为医院提供智能导诊、在线咨询、住院点餐等功能信息，并可根据医院要求进行定制化开发。'
    },
    
    CATE_INDEX = {
      website: 0,
      treatment: 1,
      remind: 2,
      service: 3
    },
    
    dataLoaded = {
      website: true,
      treatment: false,
      remind: false,
      service: false
    },
    imgLoaded = {
      website: true,
      treatment: false,
      remind: false,
      service: false
    },
    introListMap = {
      website: [],
      treatment: [],
      remind: [],
      service: []
    },
    introRef = {
      website: [],
      treatment: [],
      remind: [],
      service: []
    },
    // 保存目录对应图片列表的引用（修改f-none样式的时候需要用到）
    imgRef = {
      website: [],
      treatment: [],
      remind: [],
      service: []
    },
    currentIndex = 0,
    isSliding = false,
    timerSlider = null,
    timerAutoSwitch = null,
    
    navLeft = d.getElementById('nav-left'),                   // 左边导航
    imageSlider = d.getElementById('image-slider'),           // 图片滑动容器
    navBtnList = M.getElementsByClassName('u-btn', navLeft),  // 左边导航按钮
    intro = d.getElementById('intro'),                        // 右边文字包含块
    lenIntroList,
    currentCategory = 'website';                              // 当前目录
  
  
  M.addListener(navLeft, 'click', function (e) {
    var event = e || w.event,
      target = event.target || event.srcElement,
      targetCategory;
    
    // 如果被点击的是按钮
    if (M.containClass(target, 'u-btn')) {
      targetCategory = target.className.split(/\s+/)[0];
      // 如果[点击目录]不同于[当前目录]就切换
      if (targetCategory != currentCategory) {
        // 改变左侧样式
        destory();
        
        M.removeClass(navBtnList[CATE_INDEX[currentCategory]], 'active');
        M.addClass(navBtnList[CATE_INDEX[targetCategory]], 'active');
        currentCategory = targetCategory;
        
        // 刷新图片 和 右侧DOM中的数据
        refreshImage(targetCategory);
        refreshIntro(targetCategory);
        
        init();
      }
    }
    
  });
  
  // 虽然绑定mouseover会触发多次，但是mouseenter是不能委托成功的
  // M.addListener(intro, 'mouseover', function (e) {
  //   var event = e || w.event,
  //     target = event.target || event.srcElement,
  //     targetId;
  //   if (M.containClass(target, 'f-pdtb-20')) {
  //
  //     timerAutoSwitch && clearTimeout(timerAutoSwitch);
  //
  //     targetId = target.className.split(/\s/)[0];
  //     if (targetId != currentIndex) {
  //       // 如果移到一个新index上 执行一系列动作
  //
  //       // 切换当前激活的块
  //       toggleActiveIntro(targetId);
  //
  //
  //     }
  //   }
  // });
  
  
  // 首先 website category下的内容已经加载过了
  introListMap.website = Array.prototype.slice.call(M.getElementsByClassName('f-pdtb-20', intro));
  introRef.website = Array.prototype.slice.call(M.getElementsByClassName('f-pdtb-20', intro));
  introListMap.website.push(M.getElementsByClassName('f-color-info', intro)[0]);
  imgRef.website = Array.prototype.slice.call(imageSlider.getElementsByTagName('img'));
  
  init();
  
  
  function bindEvent() {
    for (var i = 0; i < lenIntroList; ++i) {
      (function (i) {
        M.addListener(introRef[currentCategory][i], 'mouseenter', function (e) {
          
          timerAutoSwitch && clearTimeout(timerAutoSwitch);
          
          if (i != currentIndex) {
            // 如果移到一个新index上 执行一系列动作
            
            // 切换当前激活的块
            toggleActiveIntro(i);
            animateLeft(imageSlider, computeNewLeft(currentIndex), 340);
            
          }
          
        });
        M.addListener(introRef[currentCategory][i], 'mouseleave', function (e) {
          
          console.log('hahahaha');
          autoSwitch();
          
        });
      })(i);
    }
  }
  
  
  // 改变数据
  function refreshIntro(category) {
    var introFrag,
      introList,
      introExtra,
      i, len,
      introItemHtml,
      introItemTitleHtml,
      introItemDescHtml,
      introExtraHtml,
      introDOM;
    if (dataLoaded[category]) {
      
      // 已经插入到DOM中，但为隐藏状态
      
      // 把所有元素设置为隐藏
      hideIntro();
      
      // 把对应目录下的元素设置为显示
      introDOM = introListMap[category];
      for (i = 0, len = introDOM.length; i < len; ++i) {
        M.removeClass(introDOM[i], 'f-none');
      }
      
    } else {
      
      // 还没有插入到DOM中
      
      introList = DATA[category];
      introExtra = EXTRA[category];
      introFrag = d.createDocumentFragment();
      
      for (i = 0, len = introList.length; i < len; ++i) {
        
        // 单条介绍容器
        introItemHtml = d.createElement('div');
        introItemHtml.setAttribute('class', i + ' f-pdtb-20 f-pdlr-30');
        
        // 单条介绍标题
        introItemTitleHtml = d.createElement('h5');
        introItemTitleHtml.setAttribute('class', 'f-fs-14');
        introItemTitleHtml.innerHTML = introList[i].title;
        
        // 单条介绍详情
        introItemDescHtml = d.createElement('p');
        introItemDescHtml.setAttribute('class', 'f-mgt-10 f-fs-12');
        introItemDescHtml.innerHTML = introList[i].desc;
        
        // 把标题和详情放入容器
        introItemHtml.appendChild(introItemTitleHtml);
        introItemHtml.appendChild(introItemDescHtml);
        
        // 把单条介绍放入Fragment中
        introFrag.appendChild(introItemHtml);
        
        // 把当前目录的引用保存到introListMap对象中
        introListMap[category].push(introItemHtml);
        introRef[category].push(introItemHtml);
      }
      
      // 其他介绍
      introExtraHtml = d.createElement('p');
      introExtraHtml.setAttribute('class', 'f-mgt-35 f-mgl-30 f-fs-14 f-color-info');
      introExtraHtml.innerHTML = introExtra;
      introFrag.appendChild(introExtraHtml);
      
      introListMap[category].push(introExtraHtml);
      
      
      // 把所有元素设置为隐藏
      hideIntro();
      
      // 把Fragment插入到页面中
      intro.appendChild(introFrag);
      
      dataLoaded[category] = true;
    }
    
  }
  
  function refreshImage(category) {
    var imgFrag,
      imgHtml,
      i, len,
      imgList;
    
    if (imgLoaded[category]) {
      imgList = imgRef[category];
      // 图片已经加载过了
      hideImg();
      for (i = 0, len = imgList.length; i < len; ++i) {
        M.removeClass(imgList[i], 'f-none');
      }
      imageSlider.style.width = len * IMG_WIDTH + 'px';
      imageSlider.style.left = 0;
    } else {
      
      // 图片还没加载
      
      imgFrag = d.createDocumentFragment();
      imgList = IMAGE[category];
      
      for (i = 0, len = imgList.length; i < len; ++i) {
        imgHtml = d.createElement('img');
        imgHtml.setAttribute('width', IMG_WIDTH + '');
        imgHtml.setAttribute('height', '362.8');
        imgHtml.setAttribute('src', imgList[i]);
        imgFrag.appendChild(imgHtml);
        imgRef[category].push(imgHtml);
      }
      imageSlider.style.width = len * IMG_WIDTH + 'px';
      hideImg();
      imageSlider.appendChild(imgFrag);
      imgLoaded[category] = true;
      
      
    }
    
  }
  
  // 隐藏所有已加载的文字介绍（右边）
  function hideIntro() {
    var introListDOM = M.getElementsByClassName('f-pdtb-20', intro),
      introExtraListDOM = M.getElementsByClassName('f-color-info', intro),
      i, len;
    
    for (i = 0, len = introListDOM.length; i < len; ++i) {
      M.addClass(introListDOM[i], 'f-none');
    }
    
    for (i = 0, len = introExtraListDOM.length; i < len; ++i) {
      M.addClass(introExtraListDOM[i], 'f-none');
    }
  }
  
  // 隐藏所有已加载的图片（手机里）
  function hideImg() {
    var imgList = imageSlider.getElementsByTagName('img'),
      i, len;
    for (i = 0, len = imgList.length; i < len; ++i) {
      M.addClass(imgList[i], 'f-none');
    }
  }
  
  // 切换当前被选中的介绍块（右边的一项）*** 实在想不出【介绍块】外的叫法
  function toggleActiveIntro(newIndex) {
    console.log('toggleActiveIntro()');
    var introRefTmp = introRef[currentCategory];
    M.removeClass(introRefTmp[currentIndex], 'active');
    currentIndex = parseInt(newIndex);
    M.addClass(introRefTmp[currentIndex], 'active');
  }
  
  
  function destory() {
    timerSlider && clearTimeout(timerSlider);
    timerAutoSwitch && clearTimeout(timerAutoSwitch);
    for (var i = 0; i < lenIntroList; ++i) {
      M.removeClass(introRef[currentCategory][i], 'active');
    }
  }
  
  // 刚进页面时／切换标签时的初始化工作
  function init() {
    console.log('init()');
    currentIndex = 0;
    isSliding = false;
    lenIntroList = introRef[currentCategory].length;
    M.addClass(introRef[currentCategory][currentIndex], 'active');
    bindEvent();
    autoSwitch();
  }
  
  function autoSwitch() {
    
    timerAutoSwitch && clearTimeout(timerAutoSwitch);
    
    timerAutoSwitch = setTimeout(switchStep, 3000);
  }
  
  function switchStep() {
    toggleActiveIntro((currentIndex + 1) % lenIntroList);
    animateLeft(imageSlider, computeNewLeft(currentIndex), 340);
    timerAutoSwitch = setTimeout(switchStep, 3000);
  }
  
  function slideimage() {
    
  }
  
  function computeNewLeft(index) {
    return - index * IMG_WIDTH;
  }
  
  function animateLeft(ele, newLeft, duration) {
    var INTERVAL = 17,
      oldLeft = parseFloat(ele.style.left) || 0,
      count = duration / INTERVAL,
      move,
      step = (newLeft - oldLeft) / count;
    
    isSliding = true;
    
    if (step < 0) {
      move = function () {
        if (oldLeft + step <= newLeft) {
          ele.style.left = (oldLeft = newLeft) + 'px';
          isSliding = false;
          clearTimeout(timerSlider);
        } else {
          ele.style.left = (oldLeft += step) + 'px';
          timerSlider = setTimeout(move, INTERVAL);
        }
      };
    } else {
      move = function () {
        if (oldLeft + step >= newLeft) {
          ele.style.left = (oldLeft = newLeft) + 'px';
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
  
  
})(window, document);