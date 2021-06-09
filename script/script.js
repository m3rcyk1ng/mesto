const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__add-button');


const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button-close');
const submitForm = document.querySelector('.popup__container');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__name');
const descriptionInput = document.querySelector('.popup__description');
const elements = document.querySelector('.elements');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImg = document.querySelector('.popup_type_image');

function popupOpen(popupType) {
    popupType.classList.add('popup_open');
}

// Функция открытия попапа редактирования
function openEditPopup() {
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
    popupOpen(popupTypeEdit);
}

// Функция открытия изображения
function openImagePopup(evt) {
    const eventTargetImage = evt.target;
    popupOpen(popupTypeImg);
}

    function openAddCardPopup() {
    popupOpen(popupTypeAdd) // popupOpen (popupTypeAdd >>>>>> popupType (+popup_open);
    }

    //Функция закрытия попапа
    function popupClose() {
    popup.classList.remove('popup_open');
    }


    //Функция сохранения данных
    function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    popupClose();
    }



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

// Функция отрисовки карточек
function initializeCard() {
    initialCards.forEach((elem, index) => {
        const cardTemplate = createCard(elem, index);
        elements.prepend(cardTemplate);
    });
}
initializeCard();



//Слушатели для редактирования
editButton.addEventListener('click', openEditPopup);
closeButton.addEventListener('click', popupClose);

//Кнопка сохранить для попапа редактирования и сохранения
submitForm.addEventListener('submit', formSubmitHandler);

//Слушатели для добавления карточек
addCardButton.addEventListener('click', openAddCardPopup);


//Слушатели для карточек с картинками
