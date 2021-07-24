import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__image-text');
    this._link = link;
    this._name = name;
    }

    open() {
        super.open();
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupText.textContent = this._name;
    }
}
