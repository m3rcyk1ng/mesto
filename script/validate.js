// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationObj = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // +
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error',
    errorMessageClass: 'popup__input-error_visible'
};
enableValidation(validationObj);

// Найдём все формы с указанным классом в DOM, делаем из них массив методом Array.from
function enableValidation(validationObj) {
    const allForms = Array.from(document.querySelectorAll(validationObj.formSelector));
    allForms.forEach(form => {
        validateFormItem(form, validationObj);
    });
}

// Обработчик на все инпуты
function validateFormItem(form, validationObj) {
    const inputs = allInputs(form, validationObj);
    form.addEventListener('input', () => checkFormValidity(form, validationObj, inputs));
    inputs.forEach(input => {
        input.addEventListener('input', () => checkInputValidity(input, validationObj));
    });
}

// Ищем все инпуты в forms
function allInputs(form, validationObj) {
    return Array.from(form.querySelectorAll(validationObj.inputSelector));
}

// Проверка на валидность и изменение состояния кнопки
function checkFormValidity(form, validationObj, inputs) {
    const button = form.querySelector(validationObj.submitButtonSelector);
    if (inputs.some(input => !input.validity.valid)) {
        disableSubmit(button, validationObj);
    } else {
        enableSubmit(button, validationObj);
    }
}

// Функции отключения и включения кнопки "сохранить"
function disableSubmit(button, validationObj) {
    button.classList.add(validationObj.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
}
function enableSubmit(button, validationObj) {
    button.classList.remove(validationObj.inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
}

// Функция проверяет валидность поля и работает со строкой ошибки
function checkInputValidity(input, validationObj) {
    const errorString = getErrorString(input);
    errorString.textContent = input.validationMessage;
    if (!input.validity.valid) {
        showInputError(input, errorString, validationObj);
    } else {
        hideInputError(input, errorString, validationObj);
    }
}

// Функция получения ошибки
function getErrorString(input) {
    return document.querySelector(`.${input.id}-error`);
}

// Добавление и удаление псевдоклассов с ошибками заполнений инпутов
function showInputError(input, wrongString, validationObj) {
    input.classList.add(validationObj.inputErrorClass); // Подчёркивание строки красным
    wrongString.classList.add(validationObj.errorMessageClass); // Добавление текста
}
function hideInputError(input, wrongString, validationObj) {
    input.classList.remove(validationObj.inputErrorClass);
    wrongString.classList.remove(validationObj.errorMessageClass);
}

// Сверение необходимого при открытии попапов и установка нужного значения кнопки сохранить
function formState(form, validationObj) {
    const inputs = allInputs(form, validationObj);
    checkFormValidity(form, validationObj, inputs);
    inputs.forEach(input => {
        const wrongString = getErrorString(input);
        hideInputError(input, wrongString, validationObj); // Очистка на всякий случайно от сохранившихся ошибок
    });
}

//Слушатели валидности внутри попапов при открытии
editButton.addEventListener('click', () => formState(document.forms.editForm, validationObj));
addCardButton.addEventListener('click', () => formState(document.forms.createForm, validationObj));