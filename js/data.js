'use strict';

window.data = (function () {

  function onLoad(loadData) {
    window.adsElement = loadData;
    window.pin.generatePin(loadData);
  }

  return {
    generateAds: onLoad
  };
})();
