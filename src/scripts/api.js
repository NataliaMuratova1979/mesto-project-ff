export { deleteCardFromServer };
export { putLIkeOnServer };
export { removeLikeFromServer };


//---------------- Удаление карточки с сервера ----------------//

function deleteCardFromServer(card) {  // card => data в функции makeCard
    const cardId = card._id;

    console.log('ВЫВОДИМ В КОНСОЛЬ КАРТОЧКУ');
    console.log(cardId);
    console.log('ВЫВОДИМ В КОНСОЛЬ КАРТОЧКУ');

    let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/cardId'
    url = url.replace('cardId', cardId);
    console.log(url);   

      return fetch(url, {    
        method: 'DELETE',
        headers: {
          authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
          'Content-Type': 'application/json'
        },       
    })
    .then((res) => {
      return res.json();
    })
}

//---------------- Постановка лайка на сервере ----------------//

function putLIkeOnServer(card) {  // card => data в функции makeCard
    const cardId = card._id; // получаем id карточки для добавления в url

   // console.log('ВЫВОДИМ В КОНСОЛЬ КАРТОЧКУ');
    //console.log(cardId);
   // console.log('ВЫВОДИМ В КОНСОЛЬ КАРТОЧКУ');

    let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/likes/cardId'
    url = url.replace('cardId', cardId);
  //  console.log(url);   

     return fetch(url, {    
        method: 'PUT',
        headers: {
          authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
          'Content-Type': 'application/json'
        }       
    })
    .then((res) => {
      return res.json();
    })     
}

//---------------- Удаление лайка на сервере ----------------//

function removeLikeFromServer(card) {  // card => data в функции makeCard
  const cardId = card._id; // получаем id карточки для добавления в url

  let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/likes/cardId'
  url = url.replace('cardId', cardId);
 // console.log(url);   

   return fetch(url, {    
      method: 'DELETE',
      headers: {
        authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
        'Content-Type': 'application/json'
      }       
  })
  .then((res) => {
    return res.json();
  })
  
}


