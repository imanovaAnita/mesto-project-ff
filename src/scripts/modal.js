import { toggleLike, removeCard, createCard, openImagePopup } from "./card";
import {
  profileEditingPopup,
  newMestoPopup,
  profileTitle,
  profileDescription,
  placesList,
  nameInput,
  jobInput,
  cardNameInput,
  cardUrlInput,
} from "./index";

function addEscKeyListener() {
  window.addEventListener("keydown", closePopupButtonEsc);
}

function addOverlayListener(popup) {
  window.addEventListener("keydown", handleOverlayClick);
}

function removeEscKeyListener() {
  window.removeEventListener("keydown", closePopupButtonEsc);
}

function removeOverlayListener() {
  window.removeEventListener("keydown", handleOverlayClick);
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addEscKeyListener();
  addOverlayListener();
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  removeEscKeyListener();
  removeOverlayListener();
}

export function closePopupButtonEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});

function setInitialEditProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function openEditProfilePopup() {
  setInitialEditProfileForm();
  openPopup(profileEditingPopup);
}

function clearNewCardForm() {
  cardNameInput.value = "";
  cardUrlInput.value = "";
}

export function openNewCardPopup() {
  clearNewCardForm();
  openPopup(newMestoPopup);
}

function saveNewProfileDate() {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

export function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  saveNewProfileDate();
  closePopup(profileEditingPopup);
}

export function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const cardInfo = { name: cardNameInput.value, link: cardUrlInput.value };
  const card = createCard(cardInfo, removeCard, openImagePopup, toggleLike);
  placesList.prepend(card);

  clearNewCardForm();
  closePopup(newMestoPopup);
}
