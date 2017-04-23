'use strict';

window.card = (function () {

  var generateFeaturesType = function (local) {
    var featuresType = local.offer.features;
    var fragmentFeatures = document.createDocumentFragment();
    for (var i = 0; i < featuresType.length; i++) {
      var span = document.createElement('span');
      span.classList.add('feature__image', 'feature__image--' + featuresType[i]);
      fragmentFeatures.appendChild(span);
    }
    return fragmentFeatures;
  };

  return {
    generateFeaturesType: generateFeaturesType,
  };
})();
