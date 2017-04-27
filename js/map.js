'use strict';

window.pin.generatePin(window.data.adsElement);
window.card.renderDialogPanel(window.data.adsElement[0]);


window.pin.closeWindow();
window.pin.openCard();
window.pin.closeDialog();

window.form.formValidity();

var pinHandle = document.querySelector('.pin__main');
var address = document.getElementById('address');
pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
    pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';

    address.value = 'x: ' + startCoords.x + ', y: ' + startCoords.y;

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
