const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__add-button');
// Кнопки сохранить
const submitFormEdit = document.querySelector('.popup__container');
const submitFormAdd = document.querySelector('.popup__container');


const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const addCardDataTitle = document.querySelector('.popup__input_type_title');
const addCardDataLink = document.querySelector('.popup__add-card');
const nameInput = document.querySelector('.popup__name');
const descriptionInput = document.querySelector('.popup__description');
const elements = document.querySelector('.elements');
// Открытие попапов через модификаторы
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImg = document.querySelector('.popup_type_image');
// Закрытие попапов
const closeButtonTypeEdit = popupTypeEdit.querySelector('.popup__button-close');
const closeButtonTypeAdd = popupTypeAdd.querySelector('.popup__button-close');
const closeButtonTypeImg = popupTypeImg.querySelector('.popup__button-close');

// ====================================================
function popupOpen(popupType) {
    popupType.classList.add('popup_open');
}

// Функция открытия редактирования
function openEditPopup() {
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
    popupOpen(popupTypeEdit);
}

// Функция открытия изображения
function openImagePopup() {
    popupOpen(popupTypeImg);
}

// Функция открытия добавления
    function openAddCardPopup() {
    popupOpen(popupTypeAdd) // popupOpen (popupTypeAdd >>>>>> popupType (+popup_open);
    }

// ====================================================

//Функция закрытия попапа
function popupClose(popupType) {
    popupType.classList.remove('popup_open');
}

// Функция закрытия попапа редактирования
function closeEditPopup() {
    popupClose(popupTypeEdit);
}

// Функция закрытия попапа изображения
function closeImagePopup() {
    popupClose(popupTypeImg);
}

// Функция закрытия попапа добавления
function closeAddCardPopup() {
    popupClose(popupTypeAdd) // popupOpen (popupTypeAdd >>>>>> popupType (+popup_open);
}

// ====================================================
    //Функция сохранения данных в попапе редактирования
    function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closeEditPopup();
    }

//Функция сохранения данных в попапе добавления
function formSubmitAddCard(evt) {
    evt.preventDefault();
    cardElement.prepend(addCardDataTitle, addCardDataLink);
    closeAddCardPopup();
}

// ====================================================
// Клонируем карточку через template ID и забираем весь контент у элемента
const cardElement = document.querySelector('#card');
//index - как value в кнопку удалить//
function createCard(cardData) {
    const cardContent = cardElement.content.cloneNode(true);
    //Ищем картинку у карточки и меняем её содержимое
    const cardPhoto = cardContent.querySelector('.element__photo');
    cardPhoto.src = cardData.link;
    cardPhoto.alt = cardData.name;
    //Ищем заголовок у карточки и меняем её содержимое
    const cardTitle = cardContent.querySelector('.element__title');
    cardTitle.textContent = cardData.name
    // need add event listeners

    // Слушатель лайка
    const cardLike = cardContent.querySelector('.element__like');
    cardLike.addEventListener('click', cardLikeAddEvent);

    // Слушатель удаления
    const deleteButton = cardContent.querySelector('.element__delete-icon');
    deleteButton.addEventListener('click', cardDelete);

    // Слушатель картинки
    const imageClick = cardContent.querySelector('.element__photo');
    imageClick.addEventListener('click', openImagePopup);

    return cardContent;
}

// Функция отрисовки карточек
function initializeCard() {
    initialCards.forEach((elem) => {
        const cardTemplate = createCard(elem);
        elements.prepend(cardTemplate);
    });
}
initializeCard();

// ====================================================

// Функция удаления
function cardDelete(evt) {
    const eventTargetDelete = evt.target;
    const parentElement = eventTargetDelete.closest('.element');
    parentElement.remove();
}

// Функция лайка
function cardLikeAddEvent(evt) {
    const eventTargetLike = evt.target;
    eventTargetLike.classList.toggle('element__like_active');
}
// ====================================================


//Слушатели для редактирования
editButton.addEventListener('click', openEditPopup);
// closeButton.addEventListener('click', popupClose);

//Кнопка сохранить для попапа редактирования и создания новой карточки
submitFormEdit.addEventListener('submit', formSubmitHandler);
submitFormAdd.addEventListener('submit', formSubmitAddCard);

//Слушатели для добавления карточек
addCardButton.addEventListener('click', openAddCardPopup);



//Слушатели закрытия
closeButtonTypeEdit.addEventListener('click', closeEditPopup);
closeButtonTypeAdd.addEventListener('click', closeAddCardPopup);
closeButtonTypeImg.addEventListener('click', closeImagePopup);