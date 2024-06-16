export { deleteCardFromServer };


//---------------- Удаление карточки с сервера ----------------//

function deleteCardFromServer(card) {  // функция редактирования карточек на сервере
    const cardId = card._id;

    console.log('ВЫВОДИМ В КОНСОЛЬ КАРТОЧКУ');
    console.log(cardId);
    console.log('ВЫВОДИМ В КОНСОЛЬ КАРТОЧКУ');

    let url = 'https://nomoreparties.co/v1/wff-cohort-16/cards/cardId'
    url = url.replace('cardId', cardId);
    console.log(url);   

      fetch(url, {    
        method: 'DELETE',
        headers: {
          authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
          'Content-Type': 'application/json'
        },       
    })
}