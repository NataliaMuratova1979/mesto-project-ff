//export { renderLoading };

function renderLoading(isLoading, button) {
    if (isLoading) {
      button.innerHTML = "Сохранение...";
    } else {
      button.innerHTML = "Сохранить";
    }
  }