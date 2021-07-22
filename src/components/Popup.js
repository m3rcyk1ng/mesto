export class Popup {
    constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popupSelector.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popupSelector.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);

    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(this._popupSelector);
        }
    };

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
                this.close(evt.currentTarget);
            }
        });
    };
};