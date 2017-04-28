'use strict';

window.data = (function () {

  function onLoad(loadData) {
    window.adsElement = loadData;
    window.pin.generatePin(loadData);
    window.pin.openCard();
  }

  return {
    generateAds: onLoad
  };
})();
