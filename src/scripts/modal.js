export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  window.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", handleEscClose);
}

export function setPopupEventListener(popup) {
  popup.addEventListener("mousedown", handleOverlayClick);

  const closeBtn = popup.querySelector(".popup__close");
  closeBtn.addEventListener("click", () => closePopup(popup));
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    openedPopup && closePopup(openedPopup);
  }
}

export function handleOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}
