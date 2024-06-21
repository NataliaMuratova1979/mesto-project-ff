export { deletesCard };
export { putsLIke };
export { removesLike };
export { savesAvatar };
export { savesCard, savesUser, updatesCards, updatesUser };


const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}


//---------------- Удаление карточки с сервера ----------------//

function deletesCard(card) {  // card => data в функции makeCard

    const cardId = card._id;   
    
    return fetch(`${config.baseUrl}/cards/${cardId}`, {    
        method: 'DELETE',
        headers: config.headers
    })
    
    .then(checkResponse);
  } 

//---------------- Постановка лайка  ----------------//


function putsLIke(card) {  // card => data в функции makeCard 
  const cardId = card._id; // получаем id карточки для добавления в url 

  let url = `${config.baseUrl}/cards/likes/cardId` 
  url = url.replace('cardId', cardId); 

   return fetch(url, {     
      method: 'PUT', 
      headers: config.headers
  }) 

  .then(checkResponse);    
} 


//---------------- Удаление лайка на сервере ----------------// 

function removesLike(card) {  // card => data в функции makeCard 
const cardId = card._id; // получаем id карточки для добавления в url 

let url = `${config.baseUrl}/cards/likes/cardId` 
url = url.replace('cardId', cardId); 

 return fetch(url, {     
    method: 'DELETE', 
    headers: config.headers
}) 
.then(checkResponse);
} 

// ------------- функция редактирования профиля на сервере ------------- //

function savesAvatar(avatarLink) {  

  return fetch(`${config.baseUrl}/users/me/avatar`, {

    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatarLink),
    })

    .then(checkResponse);
}


// ---------- Функция редактирования карточек на сервере ---------- //
// вызывается внутри функции makeNewCardData


function savesCard(newCard) {  // функция редактирования карточек на сервере
  return fetch(`${config.baseUrl}/cards`, {

    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCard),
    })

    .then(checkResponse);   
}


// ----------- Функция редактирования профиля на сервере ----------- //

function savesUser(newUser) {  
  return fetch(`${config.baseUrl}/users/me`, {

    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newUser),
    })

    .then(checkResponse);
}


// ----------- Функция загрузки карточек с сервера ----------- //

function updatesCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
    })

    .then(checkResponse);
}


// ---------- Функция загрузки информации о пользователе с сервера ---------- // 

function updatesUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
    })

    .then(checkResponse);
} 