export { /*openPopupWindow,*/ enableValidation, clearValidation, validationConfig };

// -------------------- Валидация форм -------------------- //

// formSelector: '.popup__form'  - html-элемент формы
// inputSelector: '.popup__input' - html-элемент поле ввода 

const validationConfig = {
    formSelector: '.popup__form',  // validationConfig.formSelector
    inputSelector: '.popup__input', // validationConfig.inputSelector
    submitButtonSelector: '.popup__button', // validationConfig.submitButtonSelector
    inactiveButtonClass: 'popup__button_disabled', // validationConfig.inactiveButtonClass
    inputErrorClass: 'form__input_type_error', // validationConfig.inputErrorClass  'popup__input_type_error'
    errorClass: 'form__input-error_active' // validationConfig.errorClass  'popup__error_visible'
};
console.log(validationConfig);



function showInputError(formSelector, inputSelector, errorMessage, validationConfig) {
  
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`); // находим span c классом как в input concat -error
    
    // находим элемент ошибки внутри самой функции
    
    inputSelector.classList.add(validationConfig.inputErrorClass); // добавляем красную линию 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass); // выводим подпись с сообщением об ошибке
};
  

function hideInputError(formSelector, inputSelector, validationConfig) {
  
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`); 
      // находим элемент ошибки внутри самой функции
  
    inputSelector.classList.remove(validationConfig.inputErrorClass); // убираем красную линию
    errorElement.classList.remove(validationConfig.errorClass); // убираем подпись с сообщением об ошибке
    errorElement.textContent = ''; // убираем сообщение об ошибке
};
    
  
  // formSelector: '.popup__form'  - html-элемент форма
  // inputSelector: '.popup__input' - html-элемент поле ввода 
  // функция получает параметром форму, в которой находится проверяемое поле, и это само поле - проверяемое поле ввода
  
function checkInputValidity(formSelector, inputSelector) { 
  
    if (inputSelector.validity.patternMismatch) { 
      inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    } else {
      inputSelector.setCustomValidity("");
    }
    
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage, validationConfig);
    } else {
      hideInputError(formSelector, inputSelector, validationConfig);
    }
  };
  
  
  // проверяем валидность всех полей, чтобы настроить статус кнопки
  
  const hasInvalidInput = (inputList) => {
      return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    })
  };
  
  // функция для выключения и включения кнопки Сохранить
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else { 
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  
  
  // Добавляем слушатель событий всем полям ввода внутри формы
  // Функция setEventListeners принимает параметром элемент формы и добавляет полям нужные обработчики
  
  function setEventListeners(formSelector, validationConfig) {
    // добавляет обработчики сразу всем полям формы
  
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector)); 
    const buttonElement = formSelector.querySelector(validationConfig.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement); // блокируем кнопку с самого начала
  
    inputList.forEach((inputSelector) => {
  
        inputSelector.addEventListener('input', function () {
  
        checkInputValidity(formSelector, inputSelector);
        toggleButtonState(inputList, buttonElement);
      });    
    });
  };
  
  // Добавление обработчиков всем формам
  
  function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    formList.forEach((formSelector) => {
      setEventListeners(formSelector, validationConfig);
    });
  };
  
  
  // -------------------- функция очистки ошибок валидации -------------------- //
  
  function clearValidation(formToClear, validationConfig) { 
  
    const inputsToClear = Array.from(formToClear.querySelectorAll(validationConfig.inputSelector));
    const buttonToUnactive = formToClear.querySelector(validationConfig.submitButtonSelector);
      
    inputsToClear.forEach((inputToClear) => {
        hideInputError(formToClear, inputToClear, validationConfig);
    });

    buttonToUnactive.classList.add(validationConfig.inactiveButtonClass);
};




  
  