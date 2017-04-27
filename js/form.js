'use strict';

window.form = (function () {
  var type = document.getElementById('type');
  var checkIn = document.getElementById('time');
  var checkOut = document.getElementById('timeout');
  var rooms = document.getElementById('room_number');
  var title = document.getElementById('title');
  var price = document.getElementById('price');
  var noticeForm = document.querySelector('.notice__form');


  var checkTitle = function () {
    var titleValue = document.getElementById('title').value;
    return (titleValue.length > 30 && titleValue.length < 100);
  };


  var autoСorrectionCheckIn = function () {
    var index = event.target.selectedIndex;
    checkOut.selectedIndex = index;
  };

  var autoСorrectionСheckOut = function () {
    var index = event.target.selectedIndex;
    checkIn.selectedIndex = index;
  };

  var autoСorrectionPrice = function () {
    switch (type.value) {
      case 'flat': {
        price.min = 1000;
        price.value = 1000;
      }
        break;
      case 'shack': {
        price.min = 0;
        price.value = 0;
      }
        break;
      case 'palace': {
        price.min = 10000;
        price.value = 10000;
      }
    }
  };

  var checkPrice = function () {
    return (price.value >= price.min && price.value <= 1000000);
  };

  var autoСorrectionRooms = function () {
    var capacity = document.getElementById('capacity');
    var roomsValue = document.getElementById('room_number').value;

    if (roomsValue === 1) {
      capacity.options[1].selected = true;
    }
    if (roomsValue === 2 || roomsValue === 100) {
      capacity.options[0].selected = true;
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
