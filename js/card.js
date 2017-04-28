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

  var generateHouseType = function (local) {
    var type = local.offer.type;
    var typeName = '';
    switch (type) {
      case 'flat': {
        typeName = 'Квартира';
      } break;
      case 'house': {
        typeName = 'Дом';
      } break;
      case 'bungalo': {
        typeName = 'Бунгало';
      } break;
    }
    return typeName;
  };

  var replaceElement = function (newChild, oldEChild) {
    var parent = oldEChild.parentElement;
    parent.replaceChild(newChild, oldEChild);
  };

  var renderDialogPanel = function (local) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var adsElement = lodgeTemplate.cloneNode(true);

    adsElement.querySelector('.lodge__title').textContent = local.offer.title;
    adsElement.querySelector('.lodge__address').textContent = local.offer.address;
    adsElement.querySelector('.lodge__price').innerHTML = local.offer.price + '&#x20bd;/ночь';
    adsElement.querySelector('.lodge__type').textContent = generateHouseType(local);
    adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + local.offer.guests + ' гостей в ' + local.offer.rooms + ' комнатах';
    adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + local.offer.checkin + ', выезд до ' + local.offer.checkout;
    adsElement.querySelector('.lodge__features').appendChild(generateFeaturesType(local));
    adsElement.querySelector('.lodge__description').textContent = local.offer.description;


    var dialogPanelElement = document.querySelector('.dialog__panel');
    replaceElement(adsElement, dialogPanelElement);

    var dialogElement = document.querySelector('.dialog__title');
    dialogElement.getElementsByTagName('img')[0].src = local.author.avatar;

  };


  return {
    generateFeaturesType: generateFeaturesType,
    generateHouseType: generateHouseType,
    renderDialogPanel: renderDialogPanel,

  };
})();
