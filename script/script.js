import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import initialCards from "./initialCards.js";

// Кнопочки
const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__add-button');
const cardElement = document.querySelector('#card');
// Присваивание модификаторов попапам для разграничения
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImg = document.querySelector('.popup_type_image');
// Кнопки сохранить
const submitFormEdit = popupTypeEdit.querySelector('.popup__container');
const submitFormAdd = popupTypeAdd.querySelector('.popup__container');
//  Профиль на мейнпейдж
const profileNameElement = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
// Поля попапа
const inputName = document.querySelector('.popup__input_type_name');
const inputTitle = popupTypeAdd.querySelector('.popup__input_type_title');
const descriptionInput = document.querySelector('.popup__input_type_description');
const elements = document.querySelector('.elements');
// Раскрытые изображения
const inputLink = popupTypeAdd.querySelector('.popup__input_type_link');
const openLink = popupTypeImg.querySelector('.popup__image');
const openFigCaption = popupTypeImg.querySelector('.popup__image-text');

const validationObj = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // +
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error',
    errorMessageClass: 'popup__input-error_visible'
};


// ↓ Открытия ↓
function openPopup(popupType) {
    //Добавление слушателей
    document.addEventListener('keydown', pressedEsc);
    popupType.addEventListener('click', closeClick);
    popupType.classList.add('popup_open');
}

// Функция открытия редактирования
function openEditPopup() {
    inputName.value = profileNameElement.textContent;
    descriptionInput.value = description.textContent;
    openPopup(popupTypeEdit);
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

// ↓ Изменения на страницу ↓
//Функция сохранения данных в попапе редактирования
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = inputName.value;
    description.textContent = descriptionInput.value;
    closeEditPopup();
}

function createCard(data) {
    return new Card(data, '.element-template', handleCardClick);
}
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


initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = createCard(item);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    elements.prepend(cardElement);
});

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