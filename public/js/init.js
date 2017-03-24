(function (w, d) {
  
  var
    i,
    len,
    clientWidth = d.body.clientWidth,
    
    cssLink = d.getElementById('index-css'),
    
    banner = d.getElementById('banner'),
    intelligence = d.getElementsByName('intelligence'),
    hicare = d.getElementById('hicare'),
    cloud = d.getElementById('cloud'),
    hifond = d.getElementById('hifond'),
    speed = d.getElementById('speed'),
    bannerImgList = banner.getElementsByTagName('img'),
    hicareImgList = hicare.getElementsByTagName('img'),
    cloudImgList = cloud.getElementsByTagName('img'),
    hifondImgList = hifond.getElementsByTagName('img'),
    speedImgList = speed.getElementsByTagName('img'),
    
    bannerBg = d.getElementById('banner-bg'),
    
    logoCircle = d.getElementById('logo-circle'),
    patient = d.getElementById('patient'),
    doctor = d.getElementById('doctor'),
    hospital = d.getElementById('hospital'),
    
    video = d.getElementById('video'),
    
    gridLines = d.getElementById('grid-lines'),
    bloodPressure2 = d.getElementById('blood-pressure2'),
    bloodPressure1 = d.getElementById('blood-pressure1'),
    bloodSugar = d.getElementById('blood-sugar'),
    heartRate1 = d.getElementById('heart-rate1'),
    heartRate2 = d.getElementById('heart-rate2'),
    doctorPad = d.getElementById('doctor-pad'),
    
    pad = d.getElementById('pad'),
    circle = d.getElementById('circle'),
    circles = d.getElementById('circles'),
    notice = d.getElementById('notice'),
    dailyPaper = d.getElementById('dailyPaper'),
    connection = d.getElementById('connection'),
    meetingAssistant = d.getElementById('meeting-assistant'),
    consultation = d.getElementById('consultation'),
    
    hifond1 = d.getElementById('hifond1'),
    hifond2 = d.getElementById('hifond2'),
    
    cloudCollection = d.getElementById('cloud-collection'),
    coupon = d.getElementById('coupon'),
    member = d.getElementById('member'),
    collection = d.getElementById('collection'),
    paymentCode = d.getElementById('payment-code');
  
  
  if (clientWidth >= 750) {
    cssLink.href = '/css/index.css';
    bannerBg.src = '/images/banner-bg-lg.jpg';
    doctor.src = '/images/doctor.png';
    patient.src = '/images/patient.png';
    hospital.src = '/images/hospital.png';
  } else {
    cssLink.href = '/css/index-mobile.css';
    bannerBg.src = '/images/banner-bg-sm.png';
    patient.src = '/images/patient2.png';
    doctor.src = '/images/doctor2.png';
    hospital.src = '/images/hospital2.png';
    
    for (i = 0, len = hicareImgList.length; i < len; ++i) {
      scale(hicareImgList[i]);
    }
  
    for (i = 0, len = cloudImgList.length; i < len; ++i) {
      scale(cloudImgList[i]);
    }
  
    for (i = 0, len = speedImgList.length; i < len; ++i) {
      scale(speedImgList[i]);
    }
    
    scale(patient, 84.6);
    scale(doctor, 85.5);
    scale(hospital, 80.5);
    
    scale(doctorPad, 417);
    
    scale(hifond1, 362);
    scale(hifond2, 115);
  }
  
  // 根据屏幕宽度调整部分元素尺寸
  function scale(ele, baseWidth) {
    baseWidth = baseWidth || ele.width;
    ele.width = baseWidth * clientWidth / 750;
  }
  
  
})(window, document);