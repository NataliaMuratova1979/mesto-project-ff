function makeCard(someObject, someFunction) { 
    //при вызове функции на место someObject встанет объект массива, на место someFunction - функция deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон
    console.log(cardTemplate); //ok

    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект
    console.log(placesItem);

    const placesList = document.querySelector('.places__list');

    placesItem.querySelector('.card__title').textContent = someObject.name; //элемент массива 
    placesItem.querySelector('.card__image').src = someObject.link; //элемент массива
    placesItem.querySelector('.card__image').alt = someObject.name; //элемент массива

    placesList.append(placesItem); //добавляем карточку 

    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления
    
    deleteButton.addEventListener('click', () => { 
        someFunction(placesItem); // 
    }); 
}

function deleteCard(item) { //deleteCard будет на месте deleteFunction при объявлении addCard
   item.remove(); //убираем карточку
}
  
function addCard(someArray) { //при вызове функции на место someArray встанет наш массив initialCards
  for (i = 0; i < someArray.length; i++) {
    const someObject = someArray[i];
    makeCard(someObject, deleteCard);
  }
}
    
addCard(initialCards);
