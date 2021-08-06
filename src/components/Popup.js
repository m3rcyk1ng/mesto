export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._handlerClickClose);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this._popup);
        }
    };

    _handlerClickClose = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
            this.close();
        }
    };

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handlerClickClose);
    };
}