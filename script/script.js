function closePopup() {
    const popupClose = document.querySelector('.popup_closed');
    document.removeEventListener('click', closePopup);
    popupClose.classList.remove('.popup-edit');
}

closePopup ();

