// Стандартные 6 карточек
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Веб-разработчик',
        link: 'https://9ban.ru/wp-content/uploads/fmg5e7defc49bea66.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


export const validationObj = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error',
    errorMessageClass: 'popup__input-error_visible'
};


// Кнопочки
export const editButton = document.querySelector('.profile__button-edit');
export const addCardButton = document.querySelector('.profile__add-button');
// Присваивание модификаторов попапам для разграничения
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeAdd = document.querySelector('.popup_type_add');
// Кнопки сохранить
export const submitFormEdit = popupTypeEdit.querySelector('.popup__container');
export const submitFormAdd = popupTypeAdd.querySelector('.popup__container');
// Поля попапа
export const inputName = document.querySelector('.popup__input_type_name');
export const descriptionInput = document.querySelector('.popup__input_type_description');
// Селекторы для классов
export const elementsSelector = '.elements';
export const userNameSelector = '.profile__name';
export const userInfoSelector = '.profile__description';
export const popupEditSelector = '.popup_type_edit';
export const popupAddSelector = '.popup_type_add';
export const popupImgSelector = '.popup_type_image';
