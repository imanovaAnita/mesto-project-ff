// Темплейт карточки
const cardTemplate = document.getElementById("card-template");

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardInfo, removeCardCB) {
  const card = cardTemplate.content.cloneNode(true);
  
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = cardInfo.name;
  
  const cardImg = card.querySelector(".card__image");
  cardImg.setAttribute("src", cardInfo.link);
  cardImg.setAttribute('alt', cardInfo.name);

  const cardRemoveButton = card.querySelector(".card__delete-button");
  cardRemoveButton.addEventListener("click", (event) => {
    const parentCard = event.target.closest('li');
    removeCardCB(parentCard);
  });

  return card;
}

// Функция удаления карточки
function removeCard(card) {
  placesList.removeChild(card);
}

// Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
  const card = createCard(cardInfo, removeCard);
  placesList.appendChild(card);
});
