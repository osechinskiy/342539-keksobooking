'use strict';

window.load = (function () {

  var load = function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case 200: {
          onLoad(xhr.response);
        }
          break;
        case 400: {
          onError('Неверный запрос');
        }
          break;
        case 401: {
          onError('Пользователь не авторизован');
        }
          break;
        case 404: {
          onError('Ничего не найдено');
        }
          break;
        default: {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
          break;
      }
      function onError(errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      }
    });
    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  return {
    getData: load
  };
})();
