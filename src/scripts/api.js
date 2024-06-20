export { deleteCardFromServer };
export { putLIkeOnServer };
export { removeLikeFromServer };
export { saveAvatarToServer };
export { saveCardToServer, saveUserToServer, updateCardsFromServer, updateUserFromServer };


//---------------- Удаление карточки с сервера ----------------//

function deleteCardFromServer(card) {  // card => data в функции makeCard
    const cardId = card._id;

    let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/cardId'
    url = url.replace('cardId', cardId);

      return fetch(url, {    
        method: 'DELETE',
        headers: {
          authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
          'Content-Type': 'application/json'
        },       
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


//---------------- Постановка лайка на сервере ----------------//

function putLIkeOnServer(card) {  // card => data в функции makeCard
    const cardId = card._id; // получаем id карточки для добавления в url


    let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/likes/cardId'
    url = url.replace('cardId', cardId);

     return fetch(url, {    
        method: 'PUT',
        headers: {
          authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
          'Content-Type': 'application/json'
        }       
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });    
}


//---------------- Удаление лайка на сервере ----------------//

function removeLikeFromServer(card) {  // card => data в функции makeCard
  const cardId = card._id; // получаем id карточки для добавления в url

  let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/likes/cardId'
  url = url.replace('cardId', cardId);

   return fetch(url, {    
      method: 'DELETE',
      headers: {
        authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
        'Content-Type': 'application/json'
      }       
  })
  .then(res => {
    if (res.ok) {
    return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}


// ------------- функция редактирования профиля на сервере ------------- //

function saveAvatarToServer(avatarLink) {  

  return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me/avatar', {

    method: 'PATCH',
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(avatarLink),
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


// ---------- Функция редактирования карточек на сервере ---------- //
// вызывается внутри функции makeNewCardData


function saveCardToServer(newCard) {  // функция редактирования карточек на сервере
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {

    method: 'POST',
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCard),
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });    
}


// ----------- Функция редактирования профиля на сервере ----------- //

function saveUserToServer(newUser) {  
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {

    method: 'PATCH',
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser),
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }); 
}


// ----------- Функция загрузки карточек с сервера ----------- //

function updateCardsFromServer() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8'
    }
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


// ---------- Функция загрузки информации о пользователе с сервера ---------- // 

function updateUserFromServer() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8'
    }
    })
    .then(res => {
      if (res.ok) {
      return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
} 