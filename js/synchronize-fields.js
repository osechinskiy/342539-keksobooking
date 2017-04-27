'use strict';

(function () {

  window.synchronizeFields = function (elementFirst, elementSecond, elementFirstArr, elementSecondArr, callback) {
    var elementFirstIndex = -1;
    for (var i = 0; i < elementFirstArr.length; i++) {
      if (elementFirst.value === elementFirstArr[i]) {
        elementFirstIndex = i;
        break;
      }
    }

    callback(elementSecond, elementSecondArr[elementFirstIndex]);
  };

})();
