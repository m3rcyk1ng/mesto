export default class UserInfo {
    constructor({userNameSelector, userInfoSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._userId = '';
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
    }

    setUserInfo(nameUpdate, infoUpdate, id) {
        this._userName.textContent = nameUpdate;
        this._userInfo.textContent = infoUpdate;
        this._userId = id;
    }

    getUserId() {
        return this._userId;
    }
}