/* modals.js -
открытие и закрытие модальных окон

Функции openModal и closeModal принимают в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

*/

/* При работе с формами нам нужны такие имена классов:

✦ popup - для модального окна
✦ popup__close - кнопка закрытия модального окна
✦ type=submit - кнопка Сохранить
✦ popup_is-opened - модальное окно открыто

✦ profile__edit-button - кнопка открытия модального окна Редактировать профиль
✦ name=edit-profile - форма Редактировать профиль
✦ name=name - ввод данных Имя
✦ name=description - ввод данных Занятие

✦ profile__add-button - кнопка открытия модального окна Добавить карточку
✦ popup_type_new-card - создание новой карточки
✦ popup__form name=new-place - форма создания новой карточки
✦ name=place-name - ввод данных Название
✦ name=link - ввод данных Ссылка на картинку


✦ popup__image - большое изображение 
*/

// реализуем открытие модального окна для создания новой карточки //
// при открытии добавляется класс .popup_is-opened //
  

//let popupBg = document.querySelector('.popup__bg'); //фон модального окна ??????????

let popupEdit = document.querySelector('.popup_type_edit'); //само модальное окно
let popupAdd = document.querySelector('popup_type_new-card');
let openEditButton = document.querySelector('.profile__edit-button'); //кнопка открытия окна редактирования профиля
let openAddButton = document.querySelector('.profile__add-button'); //кнопка открытия окна добавления карточки
let closePopupButton = document.querySelector('.popup__close'); //кнопка закрытия модального окна







function openModal(popup) {
    popup.classList.add('.popup_is-opened');
}

function hideModal(popup) {
    popup.classList.add('.popup_is-animated');
}


openEditButton.addEventListener('click', openModal);
openAddButton.addEventListener('click', openModal);





openModal(openEditButton);

openModal(openAddButton);

function openModal(button) { //функция открытия модального окна при нажатии на кнопку
    button.addEventListener('click', (e) => { //вешаем обработчик на кнопку 
      e.preventDefault(); // предотвращаем стандартное поведение браузера
      popup.classList.add('.popup_is-opened'); //добавляем класс для модального окна
      //overlay?????.classList.add('.ovelay???'); //добавляем класс для оверлея
    });
};

function openModal()









function closeModal(popup) { //функция закрытия модального окна по клику на фон
    document.addEventListener('click', (e) => { // вешаем обработчик на на весь документ
        if(e.target != popup) { // если цель клика крестик и не попап, то 
            popup.classList.add('.popup_is-animated'); //убираем активный класс с окна
           // overlay?????.classList.remove('.ovelay???'); //убираем класс с оверлея
        }
    });
};

function closeModal(button) {//функция закрытия модального окна по клику на крестик
    button.addEventListener('click', () => { // вешаем обработчик на кнопку
        popup.classList.add('.popup_is-animated');
    });
}




openEditButton.addEventListener('click', openModal);
openAddButton.addEventListener('click', openModal);

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    console.log("получилось");
}

function hideModal(popup) {
    popup.classList.add('popup_is-animated');
    console.log("получилось");
}

