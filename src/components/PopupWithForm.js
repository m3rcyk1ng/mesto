import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerSubmitForm) {
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__container');
        this._button = this._popup.querySelector('.popup__submit');
        this._popupInputs = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
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
    }

    updateTextOnButton(text) {
        this._button.textContent = text;
    }
}
