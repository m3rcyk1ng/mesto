import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerSubmitForm) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__container');
        this._button = this._popup.querySelector('.popup__submit');
    }

    _getInputValues() {
        this._popupInputs = this._popupForm.querySelectorAll('.popup__input');
        const inputsList = {};
        this._popupInputs.forEach((input) => {
            inputsList[input.name] = input.value;
        });
        return inputsList;
    }

    _handlerCloseClick = (evt) => {
        evt.preventDefault();
        this._handlerSubmitForm(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._handlerCloseClick);
    }

    close() {
        super.close();
        this._popupForm.reset();
        this._popup.removeEventListener('submit', this._handlerCloseClick);
    }

    updateTextOnButton(text) {
        this._button.textContent = text;
    }
}
