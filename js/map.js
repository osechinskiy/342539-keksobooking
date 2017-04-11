// 1 фичи(спан) добавлять в фрагмент с помощью функции и возвращать фрагмент и дальше с ним рабоать
//

'use strict';
  //  1.Создайте массив, состоящий из 8 сгенерированных JS объектов,
  //  которые будут описывать похожие объявления неподалеку. Структура объектов должна быть следующей:

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

function getObject(n) {
  var objects = [];
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var photos = [];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var maxSteep = features.length;

  for (var i = 0; i < n; i++) {
    var priceRand = getRandomInt(1000, 1000000);
    var locationRandX = getRandomInt(300, 900);
    var locationRandY = getRandomInt(100, 500);
    var typeRand = Math.floor(Math.random() * (type.length));
    var roomsRand = getRandomInt(1, 5);
    var guestsRand = getRandomInt(1, 20);
    var checkinRand = Math.floor(Math.random() * (checkin.length));
    var checkoutRand = Math.floor(Math.random() * (checkout.length));
    var firtsSteep = Math.floor(Math.random() * (maxSteep - 3 + 1)) + 0;
    var secondSteep = Math.floor(Math.random() * (maxSteep - firtsSteep + 1)) + (firtsSteep + 1);
    var resultStep = features.slice(firtsSteep, secondSteep);

    objects.push({
      author: {
        avatar: ('img/avatars/user0') + (i + 1) + ('.png')
      },

      offer: {
        title: title[i],
        address: locationRandX + ', ' + locationRandY,
        price: priceRand,
        type: type[typeRand],
        rooms: roomsRand,
        guests: guestsRand,
        checkin: checkin[checkinRand],
        checkout: checkout[checkoutRand],
        features: resultStep,
        description: ' ',
        photos: photos
      },

      location: {
        x: locationRandX,
        y: locationRandY
      }
    }
  );
  }
  return objects;
}
var objects = getObject(8);

// 2.На основе данных, созданных в предыдущем пункте создайте DOM-элементы,
// соответствующие меткам на карте случайно сгенерированных объявлений
// и заполните их данными из массива. Итоговая разметка метки должна выглядеть следующим образом:

for (var i = 0; i < objects.length; i++) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.style.left = objects[i].location.x + 'px';
  newElement.style.top = objects[i].location.y + 'px';
  newElement.innerHTML = '<img src="' + objects[i].author.avatar + '" class="rounded" width="40" height="40">';

// 3.Отрисуйте сгенерированные DOM-элементы в блок .tokyo__pin-map. Для вставки элементов используйте DocumentFragment.

  var newFragment = document.querySelector('.tokyo__pin-map');
  newFragment.appendChild(newElement);
}

// 4.На основе первого по порядку элемента из сгенерированного массива и шаблона #lodge-template создайте
// DOM-элемент, заполните его данными из объекта и вставьте полученный DOM-элемент вместо блока .dialog__panel:

var lodgeTemplate = document.querySelector('#lodge-template').content;

function getFeaturesType(local) {
  var featuresType = local.offer.features;
  var result = [];
var features = document.querySelector('.lodge__features');
  for (i = 0; i < featuresType.length; i++) {
    var span = document.createElement('span');
    span.classList.add('feature__image', 'feature__image--' + featuresType[i]);
    features.appendChild(span);
    // result.push(span);
  }
  // return result;
}

function getHouseType(local) {
  var type = local.offer.type;
  var typeName = '';
  switch (type) {
  case "flat":
          typeName = 'Квартира';
    break;
  case "house":
          typeName =  'Дом'
    break;
  case "bungalo":
          typeName = 'Бунгало'
    break;
  default:
    console.log('Нет подходящих типов');
}
  return typeName;
}
debugger;
var i = 0;
//for (i = 0; i < objects.length; i++) {
  var FeaturesType = getFeaturesType(objects[i]);
  var houseType = getHouseType(objects[i]);
  var objectElement = lodgeTemplate.cloneNode(true);
  objectElement.querySelector('.lodge__title').textContent = objects[i].offer.title;
  objectElement.querySelector('.lodge__address').textContent = objects[i].offer.address;
  objectElement.querySelector('.lodge__price').textContent = objects[i].offer.price + '&#x20bd;/ночь';
  objectElement.querySelector('.lodge__type').textContent = houseType;
  objectElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + objects[i].offer.guests + ' гостей в ' + objects[i].offer.rooms + ' комнатах';
  objectElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + objects[i].offer.checkin + ', выезд до ' + objects[i].offer.checkout;
//  objectElement.querySelector('.lodge__features').textContent = FeaturesType;
  objectElement.querySelector('.lodge__description').textContent = objects[i].offer.description;


  var dialogPanelElement = document.querySelector('.dialog__panel');
  dialogPanelElement.innerHTML = objectElement;

  var dialogElement = document.querySelector('.dialog__title');
  dialogElement.innerHTML = '<img src="' + objects[i].author.avatar + '" alt="Avatar" width="70" height="70">';
  dialogElement.appendChild(objectElement);
//}
