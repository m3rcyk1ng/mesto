export default class Api {
    constructor(link, token) {
        this._link = link;
        this._token = token;
    };

    getInitialCards() {
        return fetch(`${this._link}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkStatus);
    }

    getUserInfo() {
        return fetch(`${this._link}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkStatus);
    }

    updateUserInfo(name, about) {
        return fetch(`${this._link}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkStatus);
    }

    addNewCard(name, link) {
        return fetch(`${this._link}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkStatus);
    }


    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    addLikeUpdate (cardId) {
        return fetch(`${this._link}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkStatus);
    }

    deleteLikeUpdate (cardId) {
        return fetch(`${this._link}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkStatus);
    }


}