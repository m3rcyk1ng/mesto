import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {initialCards, validationObj, editButton, addCardButton, cardElement, popupTypeEdit, popupTypeAdd, popupTypeImg, submitFormEdit, submitFormAdd, profileNameElement,
    description, inputName, inputTitle, descriptionInput, elements, elementsSelector, userNameSelector, userInfoSelector, inputLink, openLink, openFigCaption} from "../utils/constants.js";

// ↓ Открытия ↓
function openPopup(popupType) {
    //Добавление слушателей
    document.addEventListener('keydown', pressedEsc);
    popupType.addEventListener('click', closeClick);
    popupType.classList.add('popup_open');
}

const userInfo = new UserInfo({userNameSelector, userInfoSelector});


// Функция открытия редактирования
function openEditPopup() {
    const userData = userInfo.getUserInfo();
    inputName.value = userData.name;
    descriptionInput.value = userData.info;
    openPopup(popupTypeEdit);
}

// ↓ Изменения на страницу ↓
//Функция сохранения данных в попапе редактирования
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userInfo.setUserInfo(inputName.value, descriptionInput.value);
    closeEditPopup();
}


// Функция открытия добавления
function openAddCardPopup() {
    openPopup(popupTypeAdd);
    document.createForm.reset();
}

function handleCardClick(name, link) {
    openLink.src = link;
    openFigCaption.textContent = name;
    openPopup(popupTypeImg);
}

// ↓ Закрытия ↓
//Функция закрытия попапа
function closePopup(popupType) {
    //Удаление слушателей
    document.removeEventListener('keydown', pressedEsc);
    popupType.removeEventListener('click', closeClick);
    popupType.classList.remove('popup_open');
}

// Функция закрытия попапа редактирования
function closeEditPopup() {
    closePopup(popupTypeEdit);
}

// Функция закрытия попапа изображения
function closeImagePopup() {
    closePopup(popupTypeImg);
}

// Функция закрытия попапа добавления
function closeAddCardPopup() {
    closePopup(popupTypeAdd);
}


function createCard(data) {
    return new Card(data, '.element-template', handleCardClick);
}


//Функция закрытия попапа на ESC
function pressedEsc(evt) {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_open');
        closePopup(activePopup);
    }
}

const validateFormEdit = new FormValidator(validationObj, submitFormEdit);
validateFormEdit.enableValidation();

const validateFormAdd = new FormValidator(validationObj, submitFormAdd);
validateFormAdd.enableValidation();

const renderDefaultCards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = createCard(item);
            const cardElement = card.generateCard();
            renderDefaultCards.addItem(cardElement);
        }
    },
    elementsSelector);
renderDefaultCards.renderItems();



//Функция добавляет карточки пользователя
function addCardSubmitForm(evt) {
    evt.preventDefault();
    const data = {
        name: inputTitle.value,
        link: inputLink.value
    }
    const newCard = createCard(data);
    const cardElement = newCard.generateCard();
    // Добавляем в DOM
    elements.prepend(cardElement);
    closeAddCardPopup();
}

// Функция закрытия через клик и оверлей
function closeClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
        closePopup(evt.currentTarget);
    }
}

// ↓ Слушатели ↓
//Кнопка сохранить для попапа редактирования и создания новой карточки
submitFormEdit.addEventListener('submit', handleProfileFormSubmit);
submitFormAdd.addEventListener('submit', addCardSubmitForm);

// Слушатели валидности внутри попапов при открытии
editButton.addEventListener('click', () => {
    openEditPopup();
    validateFormEdit.checkFormState()
});
addCardButton.addEventListener('click', () => {
    openAddCardPopup();
    validateFormAdd.checkFormState()
});