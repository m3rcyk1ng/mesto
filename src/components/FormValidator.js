export default class FormValidator {
    constructor(validationObj, form) {
        this._form = form;
        this._submitButtonSelector = validationObj.submitButtonSelector;
        this._button = form.querySelector(this._submitButtonSelector);
        this._allInputs = Array.from(form.querySelectorAll(validationObj.inputSelector));
        this._inactiveButtonClass = validationObj.inactiveButtonClass;
        this._inputErrorClass = validationObj.inputErrorClass;
        this._errorMessageClass = validationObj.errorMessageClass;
    }

// Найдём все формы с указанным классом в DOM, делаем из них массив методом Array.from
    enableValidation = () => {
        this._setEventListeners();
    }

// Обработчик на все инпуты
    _setEventListeners = () => {
        this._form.addEventListener('input', () => {
            this._checkFormValidity();
        });
        this._allInputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
            });
        });
    }

// Проверка на валидность и изменение состояния кнопки
    _checkFormValidity = () => {
        if (this._allInputs.some(input => !input.validity.valid)) {
            this._disableSubmit();
        } else {
            this._enableSubmit();
        }
    }
// Функции отключения и включения кнопки "сохранить"
    _disableSubmit = () => {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', 'disabled');
        }
    _enableSubmit = () => {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled', 'disabled');
        }


// Функция проверяет валидность поля и работает со строкой ошибки
    _checkInputValidity = (input) => {
        const errorString = this._getErrorString(input);
        errorString.textContent = input.validationMessage;
        if (!input.validity.valid) {
            this._showInputError(input, errorString);
        } else {
            this._hideInputError(input, errorString);
        }
    }

// Добавление и удаление псевдоклассов с ошибками заполнений инпутов
    _showInputError = (input, wrongString) => {
        input.classList.add(this._inputErrorClass); // Подчёркивание строки красным
        wrongString.classList.add(this._errorMessageClass); // Добавление текста
    }

    _hideInputError = (input, wrongString) => {
        input.classList.remove(this._inputErrorClass);
        wrongString.classList.remove(this._errorMessageClass);
    }

// Функция получения ошибки
    _getErrorString = (input) => {
        return this._form.querySelector(`.${input.id}-error`);
    }

// Сверение необходимого при открытии попапов и установка нужного значения кнопки сохранить
    checkFormState = () => {
        this._allInputs.forEach(input => {
            this._checkFormValidity(input);
            const wrongString = this._getErrorString(input);
            this._hideInputError(input, wrongString); // Очистка на всякий случайно от сохранившихся ошибок
        });
    }}
