import { zoomImagePopup, placesList, cardTemplate } from "./index.js";
import { openPopup } from "./modal.js";

// Функция создания карточки
export function createCard(cardInfo, removeCardCB, openImageCB, toggleLikeCB) {
  const card = cardTemplate.content.cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = cardInfo.name;

  const cardImg = card.querySelector(".card__image");
  cardImg.setAttribute("src", cardInfo.link);
  cardImg.setAttribute("alt", cardInfo.name);

  const cardRemoveButton = card.querySelector(".card__delete-button");

  cardRemoveButton.addEventListener("click", (event) => {
    const parentCard = event.target.closest("li");
    removeCardCB(parentCard);
  });

  const likeButton = card.querySelector(".card__like-button");

  likeButton.addEventListener("click", (event) => {
    const parentCard = event.target.closest("li");
    toggleLikeCB(parentCard);
  });

  const cardImage = card.querySelector(".card__image");
  cardImage.addEventListener("click", () => openImageCB(cardInfo));
  return card;
}

// Функция удаления карточки
export function removeCard(card) {
  placesList.removeChild(card);
}

export function openImagePopup(cardInfo) {
  const popupImage = zoomImagePopup.querySelector(".popup__image");
  popupImage.setAttribute("src", cardInfo.link);
  popupImage.setAttribute("alt", cardInfo.name);

  const popupCaption = zoomImagePopup.querySelector(".popup__caption");
  popupCaption.textContent = cardInfo.name;
  openPopup(zoomImagePopup);
}

export function toggleLike(card) {
  const likeButton = card.querySelector(".card__like-button");
  likeButton.classList.toggle("card__like-button_is-active");
}
