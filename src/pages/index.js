import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
} from "../utils/constants.js";

// Тут большинство NEW
const userInfo = new UserInfo({userNameSelector, userInfoSelector});

const validateFormEdit = new FormValidator(validationObj, submitFormEdit);
validateFormEdit.enableValidation();

const validateFormAdd = new FormValidator(validationObj, submitFormAdd);
validateFormAdd.enableValidation();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-26', 'abf7489c-028b-40af-8a54-88899dd941f0');

function handleCardDelete() {


}

function handleCardLike(card) {
    console.log(card.likes)

    const likeToggle = card.isLiked() ? api.deleteLikeUpdate(card.cardId) : api.addLikeUpdate(card.cardId);
    likeToggle.then((res) => {
        // console.log(card.likes)

        card.likes = res.likes;
        // console.log(card.likes)
        // console.log(res.likes);
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
    // console.log(userId);
    return new Card(data, '.element-template', handleCardClick, handleCardDelete, handleCardLike, userId);
}

// Промисы для получения информации с сервера и рендера её
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userDataServer, cardsDataServer]) => {

        userInfo.setUserInfo(userDataServer.name, userDataServer.about, userDataServer._id);

        //createCard(cardsDataServer, userDataServer._id);
        const classSection = new Section(
            {
                renderer: (item) => {
                    const card = createCard(item, userDataServer._id);
                    const cardElement = card.generateCard();
                    classSection.addItem(cardElement);
                }
            },
            elementsSelector);

        classSection.renderItems(cardsDataServer);









        const popupEdit = new PopupWithForm(
            popupEditSelector,
            function handlerSubmitForm(data) {
                api.updateUserInfo(data.authorName, data.authorDescription)
                    .then(() => {
                        userInfo.setUserInfo(data.authorName, data.authorDescription)
                        popupEdit.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        );

        editButton.addEventListener('click', () => {

            const userData = userInfo.getUserInfo();
            inputName.value = userData.name;
            descriptionInput.value = userData.info;

            popupEdit.open();
            validateFormEdit.checkFormState()

        });
        popupEdit.setEventListeners();

        const popupAdd = new PopupWithForm(
            popupAddSelector,
            function handlerSubmitForm(CardData) {
                api.addNewCard(CardData.name, CardData.link)
                    .then((data) => {
                        const userId = userDataServer._id;
                        const newCard = createCard(data, userId);
                        const cardElement = newCard.generateCard();
                        // Добавляем в DOM
                        classSection.addItem(cardElement);
                        popupAdd.close();
                    })
            }
        );
            popupAdd.setEventListeners();

        addCardButton.addEventListener('click', () => {
            popupAdd.open();
            validateFormAdd.checkFormState()
        });


    });









// const popupEdit = new PopupWithForm(
//     popupEditSelector,
//     function handlerSubmitForm(data) {
//         userInfo.setUserInfo(data.authorName, data.authorDescription);
//         popupEdit.close();
//     }
// );


// const popupAdd = new PopupWithForm(
//     popupAddSelector,
//     function handlerSubmitForm(CardData) {
//         const newCard = createCard(CardData);
//         const cardElement = newCard.generateCard();
//         // Добавляем в DOM
//         classSection.addItem(cardElement);
//         popupAdd.close();
//     }
// );



// Функция открытия редактирования
// function openEditPopup() {
//     // const userData = userInfo.getUserInfo();
//     // inputName.value = userData.name;
//     // descriptionInput.value = userData.info;
//     popupEdit.open();
//     popupEdit.setEventListeners();
// }


// Слушатели валидности внутри попапов при открытии
// editButton.addEventListener('click', () => {
//     openEditPopup();
//     validateFormEdit.checkFormState()
// });