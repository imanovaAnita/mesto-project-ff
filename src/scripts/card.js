import * as api from "./api.js";

// Функция создания карточки
export function createCard(
  cardInfo,
  { removeCardCb, openImageCb, toggleLikeCb, cardTemplate, userId } = {}
) {
  // Получение базовых элементов
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);
  // Получение дочерних элементов
  const cardRemoveButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");
  const likeCountEl = card.querySelector(".card__like-count");
  // переменная со счетчиком лайков
  const likeCount = cardInfo.likes.length;
  likeCountEl.textContent = likeCount;

  const hasMyLike = cardInfo.likes.some((user) => user._id === userId);

  if (hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }
  const isMyCard = cardInfo.owner._id === userId;
  if (!isMyCard) {
    cardRemoveButton.remove();
  }

  // Настройка изображения
  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;

  // Настройка заголовка
  cardTitle.textContent = cardInfo.name;

  //Добавление обработчиков событий
  if (isMyCard) {
    cardRemoveButton.addEventListener("click", () => {
      api.removeCard(cardInfo._id).then(() => {
        removeCardCb(card);
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

  likeButton.addEventListener("click", () => {
    toggleLikeCb(likeButton, cardInfo._id, likeCountEl);
  });

  cardImg.addEventListener("click", () => openImageCb(cardInfo));
  return card;
}

// Функция удаления карточки
export function removeCard(card) {
  card.remove();
}

export function toggleLike(likeButton, cardId, likeCountEl) {
  likeButton.classList.toggle("card__like-button_is-active");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    api
      .addLike(cardId)
      .then((res) => {
        const likeCount = res.likes.length;
        likeCountEl.textContent = likeCount;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .deleteLike(cardId)
      .then((res) => {
        const likeCount = res.likes.length;
        likeCountEl.textContent = likeCount;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
