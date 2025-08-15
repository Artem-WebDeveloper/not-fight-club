class ViewPages {
  _pageTitleEl = document.querySelector('.page-title');
  constructor() {
    this._settingsPage = document.querySelector('.settings-page');
    this._characterPage = document.querySelector('.character-page');
    this._homePage = document.querySelector('.home-page');
    this._battlePage = document.querySelector('.battle-container');
    this._registrationPage = document.querySelector('.register-page');

    this._popupAvatars = document.querySelector('.popup-choice-avatar');
  }

  renderNamePlayer(name) {
    const namePlayerElements = document.querySelectorAll('.current-name');
    if (name) namePlayerElements.forEach(el => (el.textContent = name));
  }

  renderAvatarPlayer(img) {
    const avatarPlayerElements = document.querySelectorAll('.current-avatar');
    if (img) avatarPlayerElements.forEach(el => (el.src = img));
  }

  displayChekingAvatar(current) {
    const avatars = document.querySelectorAll('.avatars-modal__img');
    avatars.forEach(avatar =>
      avatar.classList.remove('avatars-modal__img--active')
    );
    current.classList.add('avatars-modal__img--active');
  }

  openSettings(button) {
    this._resetSettingsUI();

    const menuBtns = document.querySelectorAll('.nav__btn');
    menuBtns.forEach(btn => btn.classList.remove('nav__btn--active'));
    button.classList.add('nav__btn--active');

    this._characterPage.classList.add('character-page--hidden');
    this._homePage.classList.add('home-page--hidden');
    this._battlePage.classList.add('battle-container--hidden');

    this._pageTitleEl.textContent = 'Settings';
    this._settingsPage.classList.remove('settings-page--hidden');
  }
  openCharacters(button) {
    const menuBtns = document.querySelectorAll('.nav__btn');
    menuBtns.forEach(btn => btn.classList.remove('nav__btn--active'));

    button.classList.add('nav__btn--active');

    this._settingsPage.classList.add('settings-page--hidden');
    this._homePage.classList.add('home-page--hidden');
    this._battlePage.classList.add('battle-container--hidden');

    this._pageTitleEl.textContent = 'Character';
    this._characterPage.classList.remove('character-page--hidden');
  }

  openHome(button) {
    const menuBtns = document.querySelectorAll('.nav__btn');
    menuBtns.forEach(btn => btn.classList.remove('nav__btn--active'));

    button.classList.add('nav__btn--active');

    this._settingsPage.classList.add('settings-page--hidden');
    this._characterPage.classList.add('character-page--hidden');
    this._battlePage.classList.add('battle-container--hidden');

    this._pageTitleEl.textContent = 'Main';
    this._homePage.classList.remove('home-page--hidden');
  }

  closeRegistration() {
    this._registrationPage.classList.add('register-page--hidden');
    this._homePage.classList.remove('home-page--hidden');
  }

  displayBattle() {
    this._homePage.classList.add('home-page--hidden');
    this._battlePage.classList.remove('battle-container--hidden');
  }

  displayInputName(button) {
    document.querySelector('.current-name--settings').style.display = 'none';
    document.querySelector('.change-name-input').style.display = 'block';
    document.querySelector('.btn-edit--ok').style.display = 'block';
    button.style.display = 'none';
  }

  hideInputName(button) {
    document.querySelector('.current-name--settings').style.display = 'block';
    document.querySelector('.change-name-input').style.display = 'none';
    document.querySelector('.btn-edit').style.display = 'block';
    button.style.display = 'none';
  }

  _resetSettingsUI() {
    document.querySelector('.change-name-input').style.display = 'none';
    document.querySelector('.btn-edit--ok').style.display = 'none';
    document.querySelector('.btn-edit').style.display = 'block';
    document.querySelector('.current-name--settings').style.display = 'block';
  }

  openPopupAvatars() {
    this._popupAvatars.classList.remove('popup-choice-avatar--hidden');
  }
  closePopupAvatars() {
    this._popupAvatars.classList.add('popup-choice-avatar--hidden');
  }
}

export default new ViewPages();
