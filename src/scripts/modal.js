export { openPopupWindow, closeModal, closeWindow, closeModalByOverlay, closeModalByEsc, addPopupOpened, addPopupAnimated };

const popup = document.querySelector('.popup'); 

//----------------------------- функция добавления класса popup_is-opened -----------------------------//

function addPopupOpened(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEsc); 
}

//----------------------------- функция удаления класса popup_is-opened -----------------------------//

function removePopupOpened(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEsc);
} 

//----------------------------- функция добавления класса popup_is-animated -----------------------------//

function addPopupAnimated(popup) {
    popup.classList.add('popup_is-animated');
    //навесить обработчик
}

//-----------------------------функция открытия попапа по кнопке--------------------------------------//

function openPopupWindow(button, window) {
  button.addEventListener('click', function (event) {
    addPopupOpened(window);
  });

  closeModalByOverlay(window); // функция закрытия по оверлею
  closeModalByEsc(window); // функция закрытия по кнопке esc
}

// --------------- Назначаем кнопки закрытия модальных окон форм ---------------- //

let closePopupButtons = document.querySelectorAll('.popup__close'); //массив кнопки закрытия модального окна
closePopupButtons.forEach(closeModal);

// ---------------- функция закрытия модального окна по кнопке  ---------------- //

function closeModal(button)  {
  button.addEventListener('click', function (event) { 

    const popupToClose = button.closest('div.popup');

    removePopupOpened(popupToClose);
    addPopupAnimated(popupToClose);
  });
}

// ---------------- функция закрытия модального окна по оверлею ---------------- //

function closeWindow(window) {
  window.classList.remove('popup_is-opened');
};

function closeModalByOverlay(popupToClose) {
  popupToClose.addEventListener('click', event => {
  if(event.target === event.currentTarget) {
    removePopupOpened(popupToClose);
  }
});
}

// ---------------- функция закрытия модального окна по esc ---------------- //

function closeModalByEsc(evt) { 
    const openedPopup = document.querySelector('.popup_is-opened');
    //const key = event.keyCode; 
    if (evt.key === 'Escape') removePopupOpened(openedPopup);
    }

console.log('все');

