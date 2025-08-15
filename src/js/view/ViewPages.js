class ViewPages {
  _pageTitleEl = document.querySelector('.page-title');
  constructor() {
    this._settingsPage = document.querySelector('.settings-page');
    this._characterPage = document.querySelector('.character-page');
    this._homePage = document.querySelector('.home-page');
    this._battlePage = document.querySelector('.battle-container');
  }

  check() {
    console.log('check');
  }

  openSettings(button) {
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

  displayInputName(button) {
    document.querySelector('.current-name--settings').style.display = 'none';
    document.querySelector('.change-name-input').style.display = 'block';
    document.querySelector('.btn-edit--ok').style.display = 'block';
    button.style.display = 'none';
  }
}

export default new ViewPages();
