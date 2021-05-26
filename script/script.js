let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup-edit');
let closeButton = popup.querySelector('.popup-edit__button-close');
let submitForm = popup.querySelector('.popup-edit__container');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let nameInput = popup.querySelector('.popup-edit__name');
let descriptionInput = popup.querySelector('.popup-edit__description');

function popupOpen() {
   popup.classList.add('popup-edit_open');
   nameInput.value = name.textContent;
   descriptionInput.value = description.textContent;
}

function popupClose() {
   popup.classList.remove('popup-edit_open');
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
