function makeCard(cardObject, deleteFunction) { 
    //при добавлении карточки cardObject присвоим элемент массива, на место deleteFunction встанет функция deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон

    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект

    placesItem.querySelector('.card__title').textContent = cardObject.name; //элемент массива 
    placesItem.querySelector('.card__image').src = cardObject.link; //элемент массива
    placesItem.querySelector('.card__image').alt = cardObject.name; //элемент массива
  
    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления
    
    deleteButton.addEventListener('click', () => { 
        deleteFunction(placesItem); // 
    }); 

    return placesItem;
    console.log(placesItem);
}

function deleteCard(item) { //deleteCard будет на месте deleteFunction при объявлении addCard
   item.remove(); //убираем карточку
}
  
function addCard(cardArray) { //при вызове функции на место cardArray встанет наш массив initialCards
  for (i = 0; i < cardArray.length; i++) {
    const cardObject = cardArray[i];

    const placesList = document.querySelector('.places__list');

    placesList.append(makeCard(cardObject, deleteCard)); //добавляем карточку 
  }
}
    
addCard(initialCards);
