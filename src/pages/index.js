import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";

import './index.css';

import {
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
    userAvatarSelector,
    popupDeleteSubmitSelector,
    popupUpdateAvatarSelector,
    editAvatarButton,
    submitFormUpdate
} from "../utils/constants.js";

// Тут не ассинхронные NEW
const userInfo = new UserInfo({userNameSelector, userInfoSelector, userAvatarSelector});

const validateFormEdit = new FormValidator(validationObj, submitFormEdit);
validateFormEdit.enableValidation();

const validateFormAdd = new FormValidator(validationObj, submitFormAdd);
validateFormAdd.enableValidation();

const validateFormUpdateAvatar = new FormValidator(validationObj, submitFormUpdate);
validateFormUpdateAvatar.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-26', 'abf7489c-028b-40af-8a54-88899dd941f0');

const popupDelete = new PopupWithSubmit(
    function handlerSubmitForm(card) {
        api.deleteCard(card.cardId)
            .then(response => {
                if (response.message === "Пост удалён") {
                    card.deleteMePlease();
                    popupDelete.close();
                }

            })
            .catch((err) => console.log(err));
    },
    popupDeleteSubmitSelector);

// ФУНКЦИИ //
function handleCardDelete(card) {
    popupDelete.open(card);
    popupDelete.setEventListeners();
}

function handleCardLike(card) {
    const likeToggle = card.isLiked() ? api.deleteLikeUpdate(card.cardId) : api.addLikeUpdate(card.cardId);
    likeToggle.then((res) => {
        card.likes = res.likes;
        card.handleToggleLike();
        card.updateLikes(res.likes.length);
    })
        .catch((err) => console.log(err));
}

function handleCardClick(name, link) {
    const popupImg = new PopupWithImage(
        {name, link},
        popupImgSelector);
    popupImg.open();
    popupImg.setEventListeners();
}

function createCard(data, userId) {
    const newCard = new Card(data, '.element-template', handleCardClick, handleCardDelete, handleCardLike, userId);
    return newCard.createCard();
}

// Промисы для получения информации с сервера и рендера её
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userDataServer, cardsDataServer]) => {
        userInfo.setUserInfo(userDataServer.name, userDataServer.about, userDataServer._id);
        userInfo.setUserAvatar(userDataServer.avatar);
        const classSection = new Section(
            {
                renderer: (item) => {
                    const card = createCard(item, userDataServer._id);
                    classSection.reverseItem(card);
                }
            },
            elementsSelector);
        classSection.renderItems(cardsDataServer);

        const popupEdit = new PopupWithForm(
            popupEditSelector,
            function handlerSubmitForm(data) {
                popupEdit.updateTextOnButton('Сохранение...');
                api.updateUserInfo(data.authorName, data.authorDescription)
                    .then(() => {
                        popupEdit.updateTextOnButton('Сохранить');
                        userInfo.setUserInfo(data.authorName, data.authorDescription);
                        popupEdit.close();
                    })
                    .catch((err) => console.log(err));
            }
        );
        editButton.addEventListener('click', () => {
            const userData = userInfo.getUserInfo();
            inputName.value = userData.name;
            descriptionInput.value = userData.info;
            popupEdit.open();
            validateFormEdit.checkFormState();
        });
        popupEdit.setEventListeners();

        const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector,
            function handlerSubmitForm(inputsList) {
                popupUpdateAvatar.updateTextOnButton('Сохранение...');
                api.updateAvatar(inputsList.avatar)
                    .then((inputsList) => {
                        popupUpdateAvatar.updateTextOnButton('Сохранить');
                        userInfo.setUserAvatar(inputsList.avatar);
                        popupUpdateAvatar.close();
                    })
                    .catch((err) => console.log(err));
            });
        popupUpdateAvatar.setEventListeners();
        editAvatarButton.addEventListener('click', () => {
            popupUpdateAvatar.open();
            validateFormUpdateAvatar.checkFormState();
        });

        const popupAdd = new PopupWithForm(
            popupAddSelector,
            function handlerSubmitForm(CardData) {
                popupAdd.updateTextOnButton('Создание...');
                api.addNewCard(CardData.name, CardData.link)
                    .then((data) => {
                        popupAdd.updateTextOnButton('Создать');
                        const userId = userDataServer._id;
                        const newCard = createCard(data, userId);
                        classSection.addItem(newCard);
                        popupAdd.close();
                    })
            }
        );
        popupAdd.setEventListeners();
        addCardButton.addEventListener('click', () => {
            popupAdd.open();
            validateFormAdd.checkFormState();
        });
    })
    .catch((err) => console.log(err));