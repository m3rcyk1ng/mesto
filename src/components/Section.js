export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cardArr) {
        cardArr.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

    reverseItem(element) {
        this._container.append(element);
    }
}