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

// Функция открытия изображения
// function openImagePopup(name, link) {
//     openLink.src = link;
//     openLink.alt = name;
//     openFigCaption.textContent = name;
//     openPopup(popupTypeImg);
// }

// Функция открытия добавления
function openAddCardPopup() {
    openPopup(popupTypeAdd);
    document.createForm.reset();
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

//Функция добавляет карточки пользователя
function addCardSubmitForm(evt) {
    evt.preventDefault();
    const data = {
        name: inputTitle.value,
        link: inputLink.value
    }
    const newCard = new Card (data, '.element-template');
    const cardElement = newCard.generateCard();
    // Добавляем в DOM
    document.querySelector('.elements').prepend(cardElement);
    closeAddCardPopup();
}

//Функция закрытия попапа на ESC
function pressedEsc(evt) {
    const activePopup = document.querySelector('.popup_open');
    if (evt.key === 'Escape') {
        closePopup(activePopup);
    }
}

// // Клонируем карточку через template ID и забираем весь контент у элемента
// function createCard(name, link) {
//     const cardContent = cardElement.content.cloneNode(true);
//     //Ищем картинку у карточки и меняем её содержимое
//     const cardPhoto = cardContent.querySelector('.element__photo');
//     cardPhoto.src = link;
//     cardPhoto.alt = name;
//     //Ищем заголовок у карточки и меняем её содержимое
//     const cardTitle = cardContent.querySelector('.element__title');
//     cardTitle.textContent = name;
//
//     // Слушатель лайка
//     // const cardLike = cardContent.querySelector('.element__like');
//     // cardLike.addEventListener('click', handleLikeClick);
//     // Слушатель удаления
//     const deleteButton = cardContent.querySelector('.element__delete-icon');
//     deleteButton.addEventListener('click', deleteCard);
//
//     // Слушатель картинки
//     cardPhoto.addEventListener('click', () => {
//         openImagePopup(name, link);
//     });
//
//     return cardContent;
// }
//
//
// function renderCard(name, link) {
//     const cardTemplate = createCard(name, link);
//     elements.prepend(cardTemplate);
// }

// // Функция отрисовки карточек
// function initializeCard() {
//     initialCards.forEach((elem) => {
//         renderCard(elem.name, elem.link);
//     });
// }

// initializeCard();
////////////////
// ↓ Функциональные функции ↓
// // Функция удаления
// function deleteCard(evt) {
//     const eventTargetDelete = evt.target;
//     const parentElement = eventTargetDelete.closest('.element');
//     parentElement.remove();
// }

const validateFormEdit = new FormValidator(validationObj, submitFormEdit);
validateFormEdit.enableValidation();

const validateFormAdd = new FormValidator(validationObj, submitFormAdd);
validateFormAdd.enableValidation();


initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, '.element-template');
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements').prepend(cardElement);
});



// Функция лайка
// function handleLikeClick(evt) {
//     const eventTargetLike = evt.target;
//     eventTargetLike.classList.toggle('element__like_active');
// }

// Функция закрытия через клик и оверлей
function closeClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
        closePopup(evt.currentTarget);
    }
}

// ↓ Слушатели ↓
// Слушатели для редактирования
editButton.addEventListener('click', openEditPopup);
//Слушатели для добавления карточек
addCardButton.addEventListener('click', openAddCardPopup);
//Кнопка сохранить для попапа редактирования и создания новой карточки
submitFormEdit.addEventListener('submit', handleProfileFormSubmit);
submitFormAdd.addEventListener('submit', addCardSubmitForm);

// //Слушатели валидности внутри попапов при открытии
editButton.addEventListener('click', () => _checkFormState(document.forms.editForm, validationObj));
addCardButton.addEventListener('click', () => _checkFormState(document.forms.createForm, validationObj));
