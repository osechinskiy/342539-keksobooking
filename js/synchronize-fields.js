'use strict';

(function () {

  window.synchronizeFields = function (elementFirst, elementSecond, elementFirstArr, elementSecondArr, callback) {
    var elementFirstIndex = elementFirstArr.indexOf(elementFirst.value);

    callback(elementSecond, elementSecondArr[elementFirstIndex]);
  };

})();
