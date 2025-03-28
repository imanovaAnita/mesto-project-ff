import "../pages/index.css";
import { openPopup, closePopup, setPopupEventListener } from "./modal.js";
import { createCard, removeCard, toggleLike } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import * as api from "./api.js";

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResp, cardsResp]) => {
    // Установка профиля
    profileTitle.textContent = userInfoResp.name;
    profileImage.style.backgroundImage = `url(${userInfoResp.avatar})`;
    profileDescription.textContent = userInfoResp.about;
    window.userId = userInfoResp._id;

    // Отрисовка карточек
    cardsResp.forEach((cardInfo) => {
      const card = createCard(cardInfo, {
        removeCardCb: removeCard,
        openImageCb: openImagePopup,
        toggleLikeCb: toggleLike,
        userId: window.userId,
        cardTemplate,
      });
      placesList.appendChild(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Добавляем логотип
const profileImage = document.querySelector(".profile__image");

// Модальные окна
export const newMestoPopup = document.querySelector(".popup_type_new-card");
export const profileEditingPopup = document.querySelector(".popup_type_edit");
export const zoomImagePopup = document.querySelector(".popup_type_image");
export const avatarPopup = document.querySelector(".popup_type_avatar");

// Описание профиля
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
const popupCaption = zoomImagePopup.querySelector(".popup__caption");

// Формы
const editProfileFormElement = document.querySelector(
  'form[name="edit-profile"]'
);
const newPlaceFormElement = document.querySelector('form[name="new-place"]');
const editAvatarFormElement = document.querySelector(
  'form[name="edit-avatar"]'
);

const nameInput = editProfileFormElement.querySelector(
  ".popup__input_type_name"
);
const jobInput = editProfileFormElement.querySelector(
  ".popup__input_type_description"
);

const cardNameInput = newPlaceFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardUrlInput = newPlaceFormElement.querySelector(
  ".popup__input_type_url"
);
const avatarUrlInput = editAvatarFormElement.querySelector(
  ".popup__input_type_avatar_url"
);

export const placesList = document.querySelector(".places__list");

// Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editProfileSubmitButton =
  editProfileFormElement.querySelector(".popup__button");
const addCardSubmitButton = newPlaceFormElement.querySelector(".popup__button");
const editAvatarSubmitButton =
  editAvatarFormElement.querySelector(".popup__button");
// Картинка попапа
const popupImage = zoomImagePopup.querySelector(".popup__image");

// Темплейт карточки
export const cardTemplate = document.getElementById("card-template");

profileEditButton.addEventListener("click", openEditProfilePopup);
profileAddButton.addEventListener("click", openNewCardPopup);
profileImage.addEventListener("click", openEditAvatarPopup);

editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
newPlaceFormElement.addEventListener("submit", handleNewPlaceFormSubmit);
editAvatarFormElement.addEventListener("submit", handleEditAvatarFormSubmit);

function openImagePopup(cardInfo) {
  popupImage.setAttribute("src", cardInfo.link);
  popupImage.setAttribute("alt", cardInfo.name);

  popupCaption.textContent = cardInfo.name;
  openPopup(zoomImagePopup);
}

document.querySelectorAll(".popup").forEach(setPopupEventListener);

function setInitialEditProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openEditProfilePopup() {
  setInitialEditProfileForm();
  clearValidation(editProfileFormElement, validationConfig);
  openPopup(profileEditingPopup);
}

function resetForm(form) {
  form.reset();
}

function openNewCardPopup() {
  resetForm(newPlaceFormElement);
  clearValidation(newPlaceFormElement, validationConfig);
  openPopup(newMestoPopup);
}

function openEditAvatarPopup() {
  resetForm(editAvatarFormElement);
  clearValidation(editAvatarFormElement, validationConfig);
  openPopup(avatarPopup);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  // до отправки на сервер
  editProfileSubmitButton.textContent = "Сохранение...";
  editProfileSubmitButton.style.pointerEvents = "none";
  api
    .editProfile({ name: nameInput.value, about: jobInput.value })
    // меняем данные профиля в DOM только после сохранения их на сервер
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(profileEditingPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileSubmitButton.textContent = "Сохранить";
      editProfileSubmitButton.style.pointerEvents = "all";
    });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  addCardSubmitButton.textContent = "Создание...";
  addCardSubmitButton.style.pointerEvents = "none";
  api
    .addCard({ name: cardNameInput.value, link: cardUrlInput.value })
    // меняем данные профиля в DOM только после сохранения их на сервер
    .then((cardInfo) => {
      const newCard = createCard(cardInfo, {
        removeCardCb: removeCard,
        openImageCb: openImagePopup,
        toggleLikeCb: toggleLike,
        userId: window.userId,
        cardTemplate,
      });

      placesList.prepend(newCard);
      resetForm(newPlaceFormElement);
      closePopup(newMestoPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardSubmitButton.textContent = "Создать";
      addCardSubmitButton.style.pointerEvents = "all";
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  // до отправки на сервер
  editAvatarSubmitButton.textContent = "Сохранение...";
  editAvatarSubmitButton.style.pointerEvents = "none";
  api
    .editAvatar(avatarUrlInput.value)
    // меняем данные профиля в DOM только после сохранения их на сервер
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarUrlInput.value})`;
      // после отправки на сервер
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarSubmitButton.textContent = "Сохранить";
      editAvatarSubmitButton.style.pointerEvents = "all";
    });
}

// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включаем валидацию
enableValidation(validationConfig);
