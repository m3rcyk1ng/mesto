let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button-close');
let submitForm = popup.querySelector('.popup__container');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = popup.querySelector('.popup__name');
let descriptionInput = popup.querySelector('.popup__description');

function popupOpen() {
   popup.classList.add('popup_open');
   nameInput.value = name.textContent;
   descriptionInput.value = description.textContent;
}

function popupClose() {
   popup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   name.textContent = nameInput.value;
   description.textContent = descriptionInput.value;
   popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
submitForm.addEventListener('submit', formSubmitHandler);
