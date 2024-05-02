// @todo: Темплейт карточки

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');
console.log(placesList); //

// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу

//function addCard (nameValue, linkValue)

function makeCard(addCard, deleteCard) {

for (i = 0; i < initialCards.length; i++) {
    const cardTemplate = document.querySelector('#card-template').content;
    console.log(cardTemplate); //ok
    
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    console.log(placesItem); //ok

   const linkValue = initialCards[i].link;
   const nameValue = initialCards[i].name;

   console.log(nameValue); //ok
   console.log(linkValue); //ok  

   placesItem.querySelector('.card__title').textContent = nameValue; //элемент массива

   placesItem.querySelector('.card__image').src = linkValue; //элемент массива

   placesList.append(placesItem); //добавляем карточку 

   const deleteButton = placesItem.querySelector('.card__delete-button');
   
   deleteButton.addEventListener('click', function (evt) {
    placesItem.remove(); //убираем карточку
   });
   }
}

makeCard();
