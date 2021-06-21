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
const openFigcaption = popupTypeImg.querySelector('.popup__image-text');

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
function openImagePopup(name, link) {
    openLink.src = link;
    openLink.alt = name;
    openFigcaption.textContent = name;
    openPopup(popupTypeImg);
}

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
    const addUserCard = createCard(inputTitle.value, inputLink.value);
    elements.prepend(addUserCard);
    closeAddCardPopup();
}

//Функция закрытия попапа на ESC
function pressedEsc(evt) {
    const activePopup = document.querySelector('.popup_open');
    if (evt.key === 'Escape') {
        closePopup(activePopup);
    }
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
