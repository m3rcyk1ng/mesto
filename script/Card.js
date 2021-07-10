class Card {
    constructor(data, template, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = template;
        this._handleCardClick = handleCardClick;
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
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._like = this._element.querySelector('.element__like');
        // Добавим данные
        this._cardImage = this._element.querySelector('.element__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    }

    _likeMePlease() {
        this._like.classList.toggle('element__like_active');
    }
    _deleteMePlease() {
        this._element.querySelector('.element__delete-icon').closest('.element').remove();
    }
    _setEventListeners() {
        this._like.addEventListener('click', () => {
            this._likeMePlease();
        });

        this._element.querySelector('.element__delete-icon').addEventListener('click', () => {
            this._deleteMePlease();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}

export default Card;