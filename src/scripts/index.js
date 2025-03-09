import "../pages/index.css";
import avatar from "../images/avatar.jpg";
import { initialCards } from "./cards.js";
import {
  openPopup,
  closePopup,
  handleOverlayClick,
  handleKeydown,
} from "./modal.js";
import { createCard, removeCard, toggleLike } from "./card.js";

// Добавляем логотип
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

// Модальные окна
export const newMestoPopup = document.querySelector(".popup_type_new-card");
export const profileEditingPopup = document.querySelector(".popup_type_edit");
export const zoomImagePopup = document.querySelector(".popup_type_image");

// Описание профиля
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

// Формы
const editProfileFormElement = document.querySelector(
  'form[name="edit-profile"]'
);
const newPlaceFormElement = document.querySelector('form[name="new-place"]');

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

// Картинка попапа
const popupImage = zoomImagePopup.querySelector(".popup__image");

// Темплейт карточки
export const cardTemplate = document.getElementById("card-template");

profileEditButton.addEventListener("click", openEditProfilePopup);
profileAddButton.addEventListener("click", openNewCardPopup);

editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
newPlaceFormElement.addEventListener("submit", handleNewPlaceFormSubmit);

function openImagePopup(cardInfo) {
  popupImage.setAttribute("src", cardInfo.link);
  popupImage.setAttribute("alt", cardInfo.name);

  const popupCaption = zoomImagePopup.querySelector(".popup__caption");
  popupCaption.textContent = cardInfo.name;
  openPopup(zoomImagePopup);
}

window.addEventListener("keydown", handleKeydown);

function setPopupEventListener(popup) {
  popup.addEventListener("mousedown", handleOverlayClick);

  const closeBtn = popup.querySelector(".popup__close");
  closeBtn.addEventListener("click", () => closePopup(popup));
}

document.querySelectorAll(".popup").forEach(setPopupEventListener);

initialCards.forEach((cardInfo) => {
  const card = createCard(cardInfo, {
    removeCardCb: removeCard,
    openImageCb: openImagePopup,
    toggleLikeCb: toggleLike,
    cardTemplate,
  });
  placesList.appendChild(card);
});

function setInitialEditProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openEditProfilePopup() {
  setInitialEditProfileForm();
  openPopup(profileEditingPopup);
}

function resetForm(form) {
  form.reset();
}

function openNewCardPopup() {
  resetForm(newPlaceFormElement);
  openPopup(newMestoPopup);
}

function saveNewProfileDate() {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  saveNewProfileDate();
  closePopup(profileEditingPopup);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const cardInfo = { name: cardNameInput.value, link: cardUrlInput.value };
  const card = createCard(cardInfo, {
    removeCardCb: removeCard,
    openImageCb: openImagePopup,
    toggleLikeCb: toggleLike,
    cardTemplate,
  });
  placesList.prepend(card);

  resetForm(newPlaceFormElement);
  closePopup(newMestoPopup);
}
