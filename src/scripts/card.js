// Функция создания карточки
export function createCard(
  cardInfo,
  { removeCardCb, openImageCb, toggleLikeCb, cardTemplate } = {}
) {
  // Получение базовых элементов
  const card = cardTemplate.content.cloneNode(true);
  // Получение дочерних элементов
  const cardRemoveButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");

  // Настройка изображения
  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;

  // Настройка заголовка
  cardTitle.textContent = cardInfo.name;

  //Добавление обработчиков событий
  cardRemoveButton.addEventListener("click", (event) => {
    const parentCard = event.target.closest("li");
    removeCardCb(parentCard);
  });

  likeButton.addEventListener("click", () => {
    toggleLikeCb(likeButton);
  });

  cardImg.addEventListener("click", () => openImageCb(cardInfo));
  return card;
}

// Функция удаления карточки
export function removeCard(card) {
  card.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
