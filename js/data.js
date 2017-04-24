'use strict';

window.data = (function () {
  var randFeatures = [];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var photos = [];
  var ads = [];

  var generateRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var generateRandomFeatures = function () {
    randFeatures = [];
    for (var i = 0; i < features.length; i++) {
      if (generateRandomInt(0, 1)) {
        randFeatures.push(features[i]);
      }
    }
    return randFeatures;
  };

  var generateAds = function (n) {
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
  };


  return {
    generateRandomInt: generateRandomInt,
    generateRandomFeatures: generateRandomFeatures,
    generateAds: generateAds,
    adsElement: generateAds(8)
  };
})();
