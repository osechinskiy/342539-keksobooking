'use strict';

window.data = (function () {

  var pinMap = document.querySelector('.tokyo__pin-map');

  var filtersElement = document.querySelector('.tokyo__filters-container');
  var filterSelectElements = filtersElement.querySelectorAll('select');
  var filterCheckboxElements = filtersElement.querySelectorAll('input[type=checkbox]');

  var filterDefaultProperties = {
    rooms: 'any',
    type: 'any',
    price: 'middle',
    guests: 'any',
    wifi: 'any',
    dishwasher: 'any',
    parking: 'any',
    washer: 'any',
    elevator: 'any',
    conditioner: 'any'
  };

  var typeFilter = filtersElement.querySelector('#housing_type');
  var priceFilter = filtersElement.querySelector('#housing_price');
  var guestsFilter = filtersElement.querySelector('#housing_guests-number');
  var roomsFilter = filtersElement.querySelector('#housing_room-number');

  function filter() {
    var adsClone = window.adsElement.slice();
    var pinElements = pinMap.querySelectorAll('.pin:not(.pin__main)');

    adsClone = adsClone.map(function (it) {
      it.hidden = false;
      return it;
    });

    if (typeFilter.value !== filterDefaultProperties.type) {
      adsClone = adsClone.map(function (it) {
        if (it.offer.type !== typeFilter.value) {
          it.hidden = true;
        }

        return it;
      });
    }

    if (priceFilter.value !== filterDefaultProperties.price) {
      adsClone = adsClone.map(function (it) {
        if (priceFilter.value === 'low' && it.offer.price > 10000) {
          it.hidden = true;
        } else {
          if (priceFilter.value === 'high' && it.offer.price < 50000) {
            it.hidden = true;
          }
        }

        return it;
      });
    }

    if (roomsFilter.value !== filterDefaultProperties.rooms) {
      adsClone = adsClone.map(function (it) {

        if (it.offer.rooms !== parseInt(roomsFilter.value, 10)) {
          it.hidden = true;
        }

        return it;
      });
    }

    if (guestsFilter.value !== filterDefaultProperties.guests) {
      adsClone = adsClone.map(function (it) {
        if (it.offer.guests !== parseInt(guestsFilter.value, 10)) {
          it.hidden = true;
        }

        return it;
      });
    }

    [].forEach.call(filterCheckboxElements, function (filterCheckboxElement) {
      if (filterCheckboxElement.checked) {
        adsClone = adsClone.map(function (it) {
          if (it.offer.features.indexOf(filterCheckboxElement.value) === -1) {
            it.hidden = true;
          }

          return it;
        });
      }
    });

    // hide or show
    [].forEach.call(pinElements, function (pin) {
      if (adsClone[pin.dataset.index].hidden) {
        pin.classList.add('hidden');
      } else {
        pin.classList.remove('hidden');
      }
    });
  }

  function onLoad(loadData) {
    window.adsElement = loadData;
    window.pin.generatePin(window.adsElement);

    filter();

    [].forEach.call(filterSelectElements, function (filterSelectElement) {
      filterSelectElement.addEventListener('change', function () {
        window.debounce(filter);
      });
    });

    [].forEach.call(filterCheckboxElements, function (filterCheckboxElement) {
      filterCheckboxElement.addEventListener('change', function () {
        window.debounce(filter);
      });
    });

    window.pin.openCard();
  }

  return {
    generateAds: onLoad
  };
})();
