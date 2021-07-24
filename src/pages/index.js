import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import './index.css';

import {
    initialCards,
    validationObj,
    editButton,
    addCardButton,
    submitFormEdit,
    submitFormAdd,
    popupEditSelector,
    popupAddSelector,
    popupImgSelector,
    inputName,
    descriptionInput,
    elementsSelector,
    userNameSelector,
    userInfoSelector,
} from "../utils/constants.js";

const popupEdit = new PopupWithForm(
    popupEditSelector,
    function handlerSubmitForm(data) {
        userInfo.setUserInfo(data.authorName, data.authorDescription);
        popupEdit.close();
    }
);

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


const popupAdd = new PopupWithForm(
    popupAddSelector,
    function handlerSubmitForm(CardData) {
        const newCard = createCard(CardData);
        const cardElement = newCard.generateCard();
        // Добавляем в DOM
        renderDefaultCards.addItem(cardElement);
        popupAdd.close();
    }
);


const userInfo = new UserInfo({userNameSelector, userInfoSelector});

function createCard(data) {
    return new Card(data, '.element-template',
        function handleCardClick(name, link) {
            const popupImg = new PopupWithImage(
                {name, link},
                popupImgSelector);
            popupImg.open();
            popupImg.setEventListeners();
        });
}

const validateFormEdit = new FormValidator(validationObj, submitFormEdit);
validateFormEdit.enableValidation();

const validateFormAdd = new FormValidator(validationObj, submitFormAdd);
validateFormAdd.enableValidation();

// Функция открытия редактирования
function openEditPopup() {
    const userData = userInfo.getUserInfo();
    inputName.value = userData.name;
    descriptionInput.value = userData.info;
    popupEdit.open();
    popupEdit.setEventListeners();
}

// Функция открытия добавления
function openAddCardPopup() {
    popupAdd.open();
    popupAdd.setEventListeners();
}

// Слушатели валидности внутри попапов при открытии
editButton.addEventListener('click', () => {
    openEditPopup();
    validateFormEdit.checkFormState()
});
addCardButton.addEventListener('click', () => {
    openAddCardPopup();
    validateFormAdd.checkFormState()
});