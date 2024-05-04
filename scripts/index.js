function makeCard(cardElement, deleteCallBack) { 
    //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон

    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект

    placesItem.querySelector('.card__title').textContent = cardElement.name; //элемент массива 
    placesItem.querySelector('.card__image').src = cardElement.link; //элемент массива
    placesItem.querySelector('.card__image').alt = cardElement.name; //элемент массива
  
    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления
    
    deleteButton.addEventListener('click', () => { 
        deleteCallBack(placesItem); // 
    }); 

    return placesItem;
    console.log(placesItem);
}

function deleteCard(item) { //deleteCard => deleteCallBack при объявлении addCard
   item.remove(); //убираем карточку
}
  
function addCard(cardArray) { //при вызове функции на место cardArray встанет наш массив initialCards
  for (i = 0; i < cardArray.length; i++) {
    const cardElement = cardArray[i];

    const placesList = document.querySelector('.places__list');

    placesList.append(makeCard(cardElement, deleteCard)); //добавляем карточку 
  }
}
    
addCard(initialCards);
