// Кнопочки
const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__add-button');
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
// Для редактирования информации профиля
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
// Поля попапа
const nameInput = document.querySelector('.popup__name');
const descriptionInput = document.querySelector('.popup__description');
const elements = document.querySelector('.elements');

// ↓ Открытия ↓
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
function openImagePopup(name, link) {
    const openLink = popupTypeImg.querySelector('.popup__image');
    const openAlt = popupTypeImg.querySelector('.popup__image-text');
    const openFigcaption = popupTypeImg.querySelector('.popup__image-text');
    openLink.src = link;
    openAlt.alt = name;
    openFigcaption.textContent = name;
    popupOpen(popupTypeImg);
}

// Функция открытия добавления
    function openAddCardPopup() {
    popupOpen(popupTypeAdd);
    }

// ↓ Закрытия ↓
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
    popupClose(popupTypeAdd); // popupOpen (popupTypeAdd >>>>>> popupType (+popup_open);
}

// ↓ Изменения на страницу ↓
//Функция сохранения данных в попапе редактирования
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closeEditPopup();
}

//Функция добавляет карточки пользователя
function formSubmitAddCard(evt) {
    evt.preventDefault();
    const titleInput = popupTypeAdd.querySelector('.popup__name');
    const linkInput = popupTypeAdd.querySelector('.popup__link');
    const addUserCard = createCard(titleInput.value, linkInput.value);
    elements.prepend(addUserCard);
    closeAddCardPopup();
}

// Клонируем карточку через template ID и забираем весь контент у элемента
const cardElement = document.querySelector('#card');
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
    deleteButton.addEventListener('click', cardDelete);

    // Слушатель картинки
    const imageClick = cardContent.querySelector('.element__photo');
    imageClick.addEventListener('click', () => {
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

// ↓ Слушатели ↓
// Слушатели для редактирования
editButton.addEventListener('click', openEditPopup);
//Кнопка сохранить для попапа редактирования и создания новой карточки
submitFormEdit.addEventListener('submit', formSubmitHandler);
submitFormAdd.addEventListener('submit', formSubmitAddCard);
//Слушатели для добавления карточек
addCardButton.addEventListener('click', openAddCardPopup);
//Слушатели закрытия
closeButtonTypeEdit.addEventListener('click', closeEditPopup);
closeButtonTypeAdd.addEventListener('click', closeAddCardPopup);
closeButtonTypeImg.addEventListener('click', closeImagePopup);