// Кнопочки
const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__add-button');
const cardElement = document.querySelector('#card');
// Присваивание модификаторов попапам для разграничения
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImg = document.querySelector('.popup_type_image');
// Закрытие попапов
const closeButtonTypeEdit = popupTypeEdit.querySelector('.popup__button-close');
const closeButtonTypeAdd = popupTypeAdd.querySelector('.popup__button-close');
const closeButtonTypeImg = popupTypeImg.querySelector('.popup__button-close');
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
const openFigcaption = popupTypeImg.querySelector('.popup__image-text');

// ↓ Открытия ↓
function openPopup(popupType) {
    popupType.classList.add('popup_open');
}

// Функция открытия редактирования
function openEditPopup() {
    inputName.value = profileNameElement.textContent;
    descriptionInput.value = description.textContent;
    openPopup(popupTypeEdit);
}

// Функция открытия изображения
function openImagePopup(name, link) {
    openLink.src = link;
    openLink.alt = name;
    openFigcaption.textContent = name;
    openPopup(popupTypeImg);
}

// Функция открытия добавления
    function openAddCardPopup() {
    openPopup(popupTypeAdd);
    }

// ↓ Закрытия ↓
//Функция закрытия попапа
function closePopup(popupType) {
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
    const addUserCard = createCard(inputTitle.value, inputLink.value);
    elements.prepend(addUserCard);
    closeAddCardPopup();
    document.createForm.reset();
}

// Клонируем карточку через template ID и забираем весь контент у элемента
function createCard(name, link) {
    const cardContent = cardElement.content.cloneNode(true);
    //Ищем картинку у карточки и меняем её содержимое
    const cardPhoto = cardContent.querySelector('.element__photo');
    cardPhoto.src = link;
    cardPhoto.alt = name;
    //Ищем заголовок у карточки и меняем её содержимое
    const cardTitle = cardContent.querySelector('.element__title');
    cardTitle.textContent = name;

    // Слушатель лайка
    const cardLike = cardContent.querySelector('.element__like');
    cardLike.addEventListener('click', cardLikeAddEvent);
    // Слушатель удаления
    const deleteButton = cardContent.querySelector('.element__delete-icon');
    deleteButton.addEventListener('click', deleteCard);

    // Слушатель картинки
    cardPhoto.addEventListener('click', () => {
        openImagePopup(name, link);
    });

    return cardContent;
}

// Функция отрисовки карточек
function initializeCard() {
    initialCards.forEach((elem) => {
        const cardTemplate = createCard(elem.name, elem.link);
        elements.prepend(cardTemplate);
    });
}

initializeCard();

// ↓ Функциональные функции ↓
// Функция удаления
function deleteCard(evt) {
    const eventTargetDelete = evt.target;
    const parentElement = eventTargetDelete.closest('.element');
    parentElement.remove();
}

// Функция лайка
function cardLikeAddEvent(evt) {
    const eventTargetLike = evt.target;
    eventTargetLike.classList.toggle('element__like_active');
}

// ↓ Слушатели ↓
// Слушатели для редактирования
editButton.addEventListener('click', openEditPopup);
//Кнопка сохранить для попапа редактирования и создания новой карточки
submitFormEdit.addEventListener('submit', handleProfileFormSubmit);
submitFormAdd.addEventListener('submit', addCardSubmitForm);
//Слушатели для добавления карточек
addCardButton.addEventListener('click', openAddCardPopup);
//Слушатели закрытия
closeButtonTypeEdit.addEventListener('click', closeEditPopup);
closeButtonTypeAdd.addEventListener('click', closeAddCardPopup);
closeButtonTypeImg.addEventListener('click', closeImagePopup);