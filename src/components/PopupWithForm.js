import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popupSelector.querySelector('.popup__container');
    }

    _getInputValues() {
        this._popupInputs = this._popupForm.querySelectorAll('.popup__input');
        const inputsList = {};
        this._popupInputs.forEach((input) => {
            inputsList[input.name] = input.value;
        });
        return inputsList;
    }

    setEventListeners() {
        super.setEventListeners();


    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}



//
// Создайте класс PopupWithForm
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
//     Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//     Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//     Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm
//     должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
//     Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
//     Для каждого попапа создавайте свой экземпляр класса PopupWithForm.