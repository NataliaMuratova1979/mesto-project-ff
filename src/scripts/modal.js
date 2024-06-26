export { /*openPopupWindow,*/ closeModal, addPopupOpened, addPopupAnimated, removePopupOpened };

//----------------------------- функция добавления класса popup_is-opened -----------------------------//

function addPopupOpened(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeModalByOverlay);
    document.addEventListener('keydown', closeModalByEsc); 
}

//----------------------------- функция удаления класса popup_is-opened -----------------------------//

function removePopupOpened(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeModalByOverlay);
    document.removeEventListener('keydown', closeModalByEsc);
} 

//----------------------------- функция добавления класса popup_is-animated -----------------------------//

function addPopupAnimated(popup) {
    popup.classList.add('popup_is-animated');
    //навесить обработчик
}

//-----------------------------функция открытия попапа по кнопке--------------------------------------//

/*
function openPopupWindow(button, window, clearValidation) {

  button.addEventListener('click', function (event) {
    addPopupOpened(window);
    clearValidation(window);
  });
}
*/


// ---------------- функция закрытия модального окна по кнопке  ---------------- //

function closeModal(button)  {
  const popupToClose = button.closest('div.popup');
  button.addEventListener('click', function (event) { 
    removePopupOpened(popupToClose);
    addPopupAnimated(popupToClose);
  });
}

// ---------------- функция закрытия модального окна по оверлею ---------------- //

function closeModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupToClose = document.querySelector('.popup_is-opened');
    removePopupOpened(popupToClose);
  }
}

// ---------------- функция закрытия модального окна по esc ---------------- //

function closeModalByEsc(evt) { 
    if (evt.key === 'Escape') { 
      const openedPopup = document.querySelector('.popup_is-opened');
      removePopupOpened(openedPopup);
  } 
}