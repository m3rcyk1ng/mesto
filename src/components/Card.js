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
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        // Вернём элемент наружу
        return this._element;
    }

    isLiked() {
        return this.likes.some((like) => {
            console.log(like)
            // console.log(this.userId);
            return like._id = this._userId;
        })
    }

    handleToggleLike() {
        if (this.isLiked()) {
            this._like.classList.remove('element__like_active');
        } else {
            this._like.classList.add('element__like_active');
        }
    }

    updateLikes(likeLength) {
    this._likeCounter.textContent = likeLength;
    }



    // _likeMePlease() {
    //     this._like.classList.toggle('element__like_active');
    // }

    _deleteMePlease() {
        this._element.querySelector('.element__delete-icon').closest('.element').remove();
    }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            this._handleCardLike(this);
        });

        this._element.querySelector('.element__delete-icon').addEventListener('click', () => {
            this._deleteMePlease();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

}