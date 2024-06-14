export { makeCard, deleteCard, activeLikeButton };



// ------------------------ функция создания карточки с 5-го спринта ------------------------// 

function makeCard(cardElement, deleteCallBack, likeCallBack, openPopupCallBack) { //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект

    placesItem.querySelector('.card__title').textContent = cardElement.name; //элемент массива 
    placesItem.querySelector('.card__image').src = cardElement.link; //элемент массива
    placesItem.querySelector('.card__image').alt = cardElement.name; //элемент массива

    // const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления
   
    console.log('1');
    console.log(cardElement);
    console.log('2'); // работает
    
    console.log(cardElement.owner);
    console.log('3'); // работает
    console.log(cardElement.owner._id);
    console.log('4'); // работает










    // функция колбэк - удаление карточки
  
    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления 
    deleteButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
        deleteCallBack(placesItem); // 
    }); 

    // функция колбэк - лайк картинки 

    const likeButton = placesItem.querySelector('.card__like-button'); // назначаем кнопку лайк
    likeButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
      likeCallBack(likeButton);
    });
    
    //функция колбэк - открытие модального окна
    
    const popupImageButton = placesItem.querySelector('.card__image'); // картинка становится кнопкой  
    popupImageButton.addEventListener('click', () => { // по нажатию на картинку запускается колбэк
      openPopupCallBack(cardElement);
    });  

    
    if (cardElement.owner._id !== '0831699e8c089d4fe917fe41') {
      console.log(cardElement.owner.name); 
      console.log("ПОЛУЧИЛОСЬ");
      makeInvisible(deleteButton);
    };
    
    // выводим карточки на страницу

    return placesItem;
  }

// ----------------- Функции - колбэки ----------------- //

function deleteCard(item) { //deleteCard => deleteCallBack при объявлении addCard card.js
   item.remove(); //убираем карточку
}

function activeLikeButton(button) { // activeLikeButton => likeCallBack при объявлении addCard card.js
  button.classList.add('card__like-button_is-active');
};

function makeInvisible(item) {
  item.classList.add('invisible');
}

