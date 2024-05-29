export { openPopupWindow, closeModal, closeWindow, closeModalByOverlay, closeModalByEsc, openPopup };

const popup = document.querySelector('.popup');  

//-----------------------------функция открытия попапа --------------------------------------//

function openPopupWindow(button, window) {
  button.addEventListener('click', function (event) {
    window.classList.add("popup_is-opened");
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

    let popupToClose = button.closest('div.popup');

    popupToClose.classList.remove('popup_is-opened');
    popupToClose.classList.add('popup_is-animated');
  });
}

// ---------------- функция закрытия модального окна по оверлею ---------------- //

function closeWindow(window) {
  window.classList.remove('popup_is-opened');
};

function closeModalByOverlay(popupToClose) {
  popupToClose.addEventListener('click', event => {
  if(event.target === event.currentTarget) {
    closeWindow(popupToClose);
  }
});
};

// ---------------- функция закрытия модального окна по esc ---------------- //

function closeModalByEsc(popupToClose) {
  document.addEventListener('keydown', event => {
    if (event.key === "Escape")  closeWindow(popupToClose);
  });
  document.removeEventListener('keydown', closeWindow);
};





function openPopup(cardElement) { // openPopup => openPopupCallBack при объявлении addCard modal.js

    const popupImageWindow = document.querySelector('.popup_type_image'); // модальное окно
    const popupImageContent = popupImageWindow.querySelector('.popup__content_content_image');
    const popupImagePicture = popupImageContent.querySelector('.popup__image');
    const popupImageText = popupImageContent.querySelector('.popup__caption');
    
    popupImagePicture.src = cardElement.link; //картинка модального окна - элемент массива
    popupImageText.textContent = cardElement.name; // текст - элемент массива 
  
  popupImageWindow.classList.add('popup_is-opened');
  
  closeModalByOverlay(popupImageWindow); //функция закрытия по оверлею 
  closeModalByEsc(popupImageWindow); //функция закрытия по кнопке esc
  };  

