import "../pages/index.css";
import avatar from "../images/avatar.jpg";
import { initialCards } from "./cards.js";
import {
  openPopup,
  closePopup,
  handleEditProfileFormSubmit,
  handleNewPlaceFormSubmit,
  openEditProfilePopup,
  openNewCardPopup,
} from "./modal.js";
import { createCard, openImagePopup, removeCard, toggleLike } from "./card.js";

// Добавляем логотип
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

// Модальные окна
export const newMestoPopup = document.querySelector(".popup_type_new-card");
export const profileEditingPopup = document.querySelector(".popup_type_edit");
export const zoomImagePopup = document.querySelector(".popup_type_image");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

// Формы
export const editProfileFormElement = document.querySelector(
  'form[name="edit-profile"]'
);
export const newPlaceFormElement = document.querySelector(
  'form[name="new-place"]'
);

export const nameInput = editProfileFormElement.querySelector(
  ".popup__input_type_name"
);
export const jobInput = editProfileFormElement.querySelector(
  ".popup__input_type_description"
);

export const cardNameInput = newPlaceFormElement.querySelector(
  ".popup__input_type_card-name"
);
export const cardUrlInput = newPlaceFormElement.querySelector(
  ".popup__input_type_url"
);
export const placesList = document.querySelector(".places__list");

// Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditCloseBtn = profileEditingPopup.querySelector(".popup__close");
const newMestoCloseBtn = newMestoPopup.querySelector(".popup__close");
const zoomImageCloseBtn = zoomImagePopup.querySelector(".popup__close");

// Темплейт карточки
export const cardTemplate = document.getElementById("card-template");

profileEditButton.addEventListener("click", openEditProfilePopup);
profileAddButton.addEventListener("click", openNewCardPopup);
profileEditCloseBtn.addEventListener("click", () =>
  closePopup(profileEditingPopup)
);
newMestoCloseBtn.addEventListener("click", () => closePopup(newMestoPopup));
zoomImageCloseBtn.addEventListener("click", () => closePopup(zoomImagePopup));
editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
newPlaceFormElement.addEventListener("submit", handleNewPlaceFormSubmit);

initialCards.forEach((cardInfo) => {
  const card = createCard(cardInfo, removeCard, openImagePopup, toggleLike);
  placesList.appendChild(card);
});
