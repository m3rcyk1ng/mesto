class Card {
    constructor(data, template) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = template;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        // Дождаться доминирующую особь и продолжить
        return cardElement;
    }

    generateCard() {
        // Запишем разметку в приватное поле _element.
        // Запишем разметку в приватное поле _element.
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        // Добавим данные
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    }

    _likeMePlease() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
    _deleteMePlease() {
        this._element.querySelector('.element__delete-icon').closest('.element').remove();
    }
    _clickOnPhotoPlease() {
        openLink.src = this._link;
        openLink.alt = this._name;
        openFigCaption.textContent = this._name;
        openPopup(popupTypeImg);
    }
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeMePlease();
        });

        this._element.querySelector('.element__delete-icon').addEventListener('click', () => {
            this._deleteMePlease();
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._clickOnPhotoPlease();
        });
    }
}

export default Card;