'use strict';
  //  1.Создайте массив, состоящий из 8 сгенерированных JS объектов,
  //  которые будут описывать похожие объявления неподалеку. Структура объектов должна быть следующей:

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function generateRandomFeatures() {
  var randFeatures = [];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  for (var i = 0; i < features.length; i++) {
    if (generateRandomInt(0, 1)) {
      randFeatures.push(features[i]);
    }
  }
  return randFeatures;
}

function generateAds(n) {
  var ads = [];
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var photos = [];

  for (var i = 0; i < n; i++) {
    ads.push({
      author: {
        avatar: ('img/avatars/user0') + (i + 1) + ('.png')
      },

      offer: {
        title: title[i],
        address: generateRandomInt(300, 900) + ', ' + generateRandomInt(100, 500),
        price: generateRandomInt(1000, 1000000),
        type: type[generateRandomInt(0, type.length - 1)],
        rooms: generateRandomInt(1, 20),
        guests: generateRandomInt(1, 20),
        checkin: checkin[generateRandomInt(0, checkin.length - 1)],
        checkout: checkout[generateRandomInt(0, checkout.length - 1)],
        features: generateRandomFeatures(),
        description: ' ',
        photos: photos
      },

      location: {
        x: generateRandomInt(300, 900),
        y: generateRandomInt(100, 500)
      }
    }
  );
  }
  return ads;
}
var ads = generateAds(8);

// 2.На основе данных, созданных в предыдущем пункте создайте DOM-элементы,
// соответствующие меткам на карте случайно сгенерированных объявлений
// и заполните их данными из массива. Итоговая разметка метки должна выглядеть следующим образом:
var fragment = document.createDocumentFragment();
var newFragment = document.querySelector('.tokyo__pin-map');
for (var i = 0; i < ads.length; i++) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.style.left = ads[i].location.x + 'px';
  newElement.style.top = ads[i].location.y + 'px';
  newElement.innerHTML = '<img src="' + ads[i].author.avatar + '" class="rounded" width="40" height="40">';

// 3.Отрисуйте сгенерированные DOM-элементы в блок .tokyo__pin-map. Для вставки элементов используйте DocumentFragment.
  fragment.appendChild(newElement);
  newFragment.appendChild(fragment);
}

// 4.На основе первого по порядку элемента из сгенерированного массива и шаблона #lodge-template создайте
// DOM-элемент, заполните его данными из объекта и вставьте полученный DOM-элемент вместо блока .dialog__panel:

function generateFeaturesType(local) {
  var featuresType = local.offer.features;
  var fragmentFeatures = document.createDocumentFragment();
  for (i = 0; i < featuresType.length; i++) {
    var span = document.createElement('span');
    span.classList.add('feature__image', 'feature__image--' + featuresType[i]);
    fragmentFeatures.appendChild(span);
  }
  return fragmentFeatures;
}

function generateHouseType(local) {
  var type = local.offer.type;
  var typeName = '';
  switch (type) {
    case 'flat':
      typeName = 'Квартира';
      break;
    case 'house':
      typeName = 'Дом';
      break;
    case 'bungalo':
      typeName = 'Бунгало';
      break;
  }
  return typeName;
}

function replaceElement(newChild, oldEChild) {
  var parent = oldEChild.parentElement;
  parent.replaceChild(newChild, oldEChild);
}
i = 0;
var featuresType = generateFeaturesType(ads[i]);
var houseType = generateHouseType(ads[i]);

function renderDialogPanel(local) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var adsElement = lodgeTemplate.cloneNode(true);

  adsElement.querySelector('.lodge__title').textContent = local.offer.title;
  adsElement.querySelector('.lodge__address').textContent = local.offer.address;
  adsElement.querySelector('.lodge__price').innerHTML = local.offer.price + '&#x20bd;/ночь';
  adsElement.querySelector('.lodge__type').textContent = houseType;
  adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + local.offer.guests + ' гостей в ' + local.offer.rooms + ' комнатах';
  adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + local.offer.checkin + ', выезд до ' + local.offer.checkout;
  adsElement.querySelector('.lodge__features').appendChild(featuresType);
  adsElement.querySelector('.lodge__description').textContent = local.offer.description;


  var dialogPanelElement = document.querySelector('.dialog__panel');
  replaceElement(adsElement, dialogPanelElement);

  var dialogElement = document.querySelector('.dialog__title');
  dialogElement.getElementsByTagName('img')[0].src = ads[i].author.avatar;

}

renderDialogPanel(ads[0]);
