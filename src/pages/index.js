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

const classSection = new Section(
    {
        renderer: (item) => {
            const card = createCard(item);
            const cardElement = card.generateCard();
            classSection.addItem(cardElement);
        }
    },
    elementsSelector);

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-26', 'abf7489c-028b-40af-8a54-88899dd941f0');

// Промисы для получения информации с сервера и рендера её
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userDataServer, cardsDataServer]) => {
        classSection.renderItems(cardsDataServer);
        userInfo.setUserInfo(userDataServer.name, userDataServer.about);

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
                        const newCard = createCard(data);
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