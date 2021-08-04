export default class Card {
    constructor(data, template, handleCardClick, handleCardDelete, handleCardLike, userId) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = template;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this.likes = data.likes;
        this._userId = userId;
        this.cardId = data._id;
        this.owner = data.owner;
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
        this._likeCounter = this._element.querySelector('.element__like-counter');
        // Добавим данные
        this._cardImage = this._element.querySelector('.element__photo');
        this.buttonDeleteCard = this._element.querySelector('.element__delete-icon');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    }

    isLiked() {
        return this.likes.some((item) => {
            return item._id === this._userId;
        })
    }

    _checkOwner() {
        if (this.owner._id !== this._userId) {
            this.buttonDeleteCard.remove();
        }
    }

    handleToggleLike() {
        if (this.isLiked()) {
            this._like.classList.add('element__like_active');
        } else {
            this._like.classList.remove('element__like_active');
        }
    }

    updateLikes(likeLength) {
    this._likeCounter.textContent = likeLength;
    }


    deleteMePlease() {
        this.buttonDeleteCard.closest('.element').remove();
    }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            this._handleCardLike(this);
        });

        this.buttonDeleteCard.addEventListener('click', () => {
            this._handleCardDelete(this);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    createCard() {
        this._getTemplate();
        this.generateCard();
        this.handleToggleLike();
        this.updateLikes(this.likes.length);
        this._checkOwner();
        this._setEventListeners();
        return this._element;
    }

}