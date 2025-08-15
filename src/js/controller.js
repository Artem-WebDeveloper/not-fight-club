import ViewPages from './view/ViewPages';

class App {
  _btnHome = document.querySelector('#btn-home');
  _btnSettings = document.querySelector('#btn-settings');
  _btnCharacter = document.querySelector('#btn-character');
  _btnEditName = document.querySelector('.btn-edit');

  constructor() {
    this._btnSettings.addEventListener('click', e =>
      ViewPages.openSettings(e.currentTarget)
    );
    this._btnCharacter.addEventListener('click', e =>
      ViewPages.openCharacters(e.currentTarget)
    );
    this._btnHome.addEventListener('click', e =>
      ViewPages.openHome(e.currentTarget)
    );

    this._btnEditName.addEventListener('click', e =>
      ViewPages.displayInputName(e.currentTarget)
    );
  }
}

export default App;
