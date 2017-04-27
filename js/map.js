'use strict';

window.pin.generatePin(window.data.adsElement);
window.card.renderDialogPanel(window.data.adsElement[0]);


window.pin.closeWindow();
window.pin.openCard();
window.pin.closeDialog();

window.form.formValidity();
