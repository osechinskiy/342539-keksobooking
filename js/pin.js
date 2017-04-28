'use strict';

window.pin = (function () {
  var fragment = document.createDocumentFragment();
  var newFragment = document.querySelector('.tokyo__pin-map');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('#offer-dialog');
  var pinIndex = tokyoPinMap.querySelectorAll('.pin');
  var dialogClose = document.querySelector('.dialog__close');
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var generatePin = function (local) {
    for (var i = 0; i < local.length; i++) {
      var newElement = document.createElement('div');
      newElement.setAttribute('id', 'data');
      newElement.setAttribute('data-index', i);
      newElement.className = 'pin';
      newElement.style.left = local[i].location.x + 'px';
      newElement.style.top = local[i].location.y + 'px';
      newElement.innerHTML = '<img src="' + local[i].author.avatar + '" class="rounded" width="40" height="40" tabindex="0">';

      fragment.appendChild(newElement);
    }
    newFragment.appendChild(fragment);
  };

  var getTarget = function (evt) {
    var target = evt.currentTarget;
    var pinActiv = tokyoPinMap.querySelector('.pin--active');
    if (pinActiv !== null) {
      pinActiv.classList.remove('pin--active');
    }
    var pin = target.dataset.index;
    if (pin) {
      target.classList.add('pin--active');
      window.card.renderDialogPanel(window.adsElement[pin]);
      openWindow();
    }
  };

  var closeWindow = function () {
    dialog.classList.add('hidden');
  };

  var openWindow = function () {
    dialog.classList.remove('hidden');
  };

  var delActivPin = function () {
    var pinActiv = tokyoPinMap.querySelector('.pin--active');
    if (pinActiv !== null) {
      pinActiv.classList.remove('pin--active');
    }
  };

  var enterKeyOpen = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      getTarget(evt);
    }
  };

  var enterKeyClose = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      delActivPin();
      closeWindow();
    }
  };

  var escKeyClose = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      delActivPin();
      closeWindow();
    }
  };

  var openCard = function () {
    tokyoPinMap.addEventListener('click', function () {
      pinIndex = tokyoPinMap.querySelectorAll('.pin');
      for (var i = 0; i < pinIndex.length; i++) {
        pinIndex[i].addEventListener('click', getTarget);
        pinIndex[i].addEventListener('keydown', enterKeyOpen);
      }
    });
  };

  var closeDialog = function () {
    dialogClose.addEventListener('click', function () {
      closeWindow();
      delActivPin();
    });
    document.addEventListener('keydown', escKeyClose);
    dialogClose.addEventListener('keydown', enterKeyClose);
  };

  return {
    generatePin: generatePin,
    openCard: openCard,
    getTarget: getTarget,
    closeDialog: closeDialog,
    closeWindow: closeWindow
  };
})();
