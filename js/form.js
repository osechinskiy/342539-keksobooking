'use strict';

window.form = (function () {
  var type = document.getElementById('type');
  var checkIn = document.getElementById('time');
  var checkOut = document.getElementById('timeout');
  var rooms = document.getElementById('room_number');
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var noticeForm = document.querySelector('.notice__form');
  var capacity = document.getElementById('capacity');


  var checkTitle = function () {
    var titleValue = document.getElementById('title').value;
    return (titleValue.length > 30 && titleValue.length < 100);
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var autoСorrectionCheckIn = function () {
    window.synchronizeFields(checkIn, checkOut, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  };

  var autoСorrectionСheckOut = function () {
    window.synchronizeFields(checkOut, checkIn, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  };


  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  var autoСorrectionPrice = function () {
    window.synchronizeFields(type, price, ['flat', 'shack', 'palace'], [1000, 0, 10000], syncValueWithMin);
  };

  var checkPrice = function () {
    return (price.value >= price.min && price.value <= 1000000);
  };

  var autoСorrectionRooms = function () {
    var roomsValue = document.getElementById('room_number').value;
    switch (roomsValue) {
      case 'one': {
        capacity.value = 'not';
      }
        break;
      case 'two': {
        capacity.value = 'guests';
      }
        break;
      case 'hundred': {
        capacity.value = 'guests';
      }
        break;
    }
  };

  var formSubmit = function (e) {
    var errorFound = false;
    if (!checkTitle()) {
      errorFound = true;
      title.style.borderColor = 'red';
    } else {
      title.style.borderColor = '#d9d9d3';
    }
    if (!checkPrice()) {
      errorFound = true;
      price.style.borderColor = 'red';
    } else {
      price.style.borderColor = '#d9d9d3';
    }

    if (errorFound) {
      e.preventDefault();
    } else {
      noticeForm.reset();
    }
  };

  var formValidity = function () {
    title.addEventListener('change', checkTitle);
    price.addEventListener('change', checkPrice);
    type.addEventListener('change', autoСorrectionPrice);
    checkIn.addEventListener('change', autoСorrectionCheckIn);
    checkOut.addEventListener('change', autoСorrectionСheckOut);
    rooms.addEventListener('change', autoСorrectionRooms);
    noticeForm.addEventListener('submit', formSubmit);
  };

  return {
    formValidity: formValidity
  };
})();
