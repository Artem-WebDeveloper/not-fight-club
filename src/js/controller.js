import ViewPages from './view/ViewPages';
import ViewBattle from './view/ViewBattle';
import { model } from './model';

class App {
  _btnStart = document.querySelector('.btn-start');
  _btnHome = document.querySelector('#btn-home');
  _btnSettings = document.querySelector('#btn-settings');
  _btnCharacter = document.querySelector('#btn-character');
  _btnEditName = document.querySelector('.btn-edit');

  _btnSubmitNamePlayer = document.querySelector('.submit-name');
  _btnChangeNamePlayer = document.querySelector('.btn-edit--ok');
  _btnCloseAvatarPopup = document.querySelector('.avatars-modal__svg-close');

  _btnAttack = document.querySelector('.attack-btn');
  _btnFinish = document.querySelector('.btn-end');

  _characterBoxAvatar = document.querySelector(
    '.character-information__avatar'
  );
  _avatarImages = document.querySelectorAll('.avatars-modal__img');

  _inputRegistrationEl = document.querySelector('#name-character');
  _inputSettingsEl = document.querySelector('.change-name-input');

  constructor() {
    /* -------------LOADDOM------------------------ */

    window.addEventListener('load', () => {
      // localStorage.clear();
      model.recoverState();

      if (model.state.namePlayer) {
        ViewPages.closeRegistration();
        ViewPages.renderNamePlayer(model.state.namePlayer);
      }

      if (model.state.avatarPlayer)
        ViewPages.renderAvatarPlayer(model.state.avatarPlayer);

      ViewBattle.renderEnemyAvatar(model.enemies[0].avatarEnemy);
      ViewBattle.renderEnemyName(model.enemies[0].nameEnemy);

      model.setPlayerHealth(model.state.healthPlayer);
      ViewBattle.updatePlayerHealth();

      model.setEnemyHealth(model.enemies[0].healthEnemy);
      ViewBattle.updateEnemyHealth();
    });

    /* --------------------------------------------------*/

    /* --------------BATTLE FIGHT------------------ */
    this._btnAttack.addEventListener('click', () => {
      model.playerAttacks();
      model.enemyAttacks(model.enemies[0]);
      ViewBattle.updateEnemyHealth();
      ViewBattle.updatePlayerHealth();
      model.checkHealthBars();

      if (model.checkWinner()) {
        ViewBattle.displayModalGameEnd(model.checkWinner());
        model.updateStatistic(model.checkWinner());
        ViewPages.renderStatistic(model.state);
      }
    });

    this._btnFinish.addEventListener('click', () => {
      ViewBattle.hideModalGameEnd();
      ViewPages.openCharacters(this._btnCharacter);

      ViewBattle.renderEnemyAvatar(model.enemies[0].avatarEnemy);
      ViewBattle.renderEnemyName(model.enemies[0].nameEnemy);

      model.setPlayerHealth(model.state.healthPlayer);
      ViewBattle.updatePlayerHealth();

      model.setEnemyHealth(model.enemies[0].healthEnemy);
      ViewBattle.updateEnemyHealth();
    });
    /* ------------------------------------- */

    /* -------------REGISTRATION------------------------ */
    this._btnSubmitNamePlayer.addEventListener('click', e => {
      model.saveNamePlayer(this._inputRegistrationEl, e.currentTarget);
      ViewPages.renderNamePlayer(model.state.namePlayer);
      ViewPages.closeRegistration();
    });

    this._inputRegistrationEl.addEventListener('focus', e => {
      model.checkNameLength(e.currentTarget, this._btnSubmitNamePlayer);
    });

    this._inputRegistrationEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !this._btnSubmitNamePlayer.disabled) {
        this._btnSubmitNamePlayer.click();
      }
    });

    /* --------------------------------------------------*/

    /* -------------SETTINGS PAGE------------------------ */
    this._btnEditName.addEventListener('click', e => {
      ViewPages.displayInputName(e.currentTarget);
      this._inputSettingsEl.focus();
    });

    this._inputSettingsEl.addEventListener('focus', e => {
      model.checkNameLength(e.currentTarget, this._btnChangeNamePlayer);
    });

    this._btnChangeNamePlayer.addEventListener('click', e => {
      model.saveNamePlayer(this._inputSettingsEl);
      ViewPages.renderNamePlayer(model.state.namePlayer);
      ViewPages.hideInputName(e.currentTarget);
      this._inputSettingsEl.value = '';
    });

    this._inputSettingsEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !this._btnChangeNamePlayer.disabled) {
        this._btnChangeNamePlayer.click();
      }
    });

    /* --------------------------------------------------*/

    /* -------------CHARACTER PAGE------------------------ */

    this._popupAvatars = document.querySelector('.popup-choice-avatar');
    this._popupAvatarsWindow = document.querySelector('.avatars-modal');
    this._characterBoxAvatar.addEventListener(
      'click',
      ViewPages.openPopupAvatars.bind(ViewPages)
    );
    this._btnCloseAvatarPopup.addEventListener(
      'click',
      ViewPages.closePopupAvatars.bind(ViewPages)
    );

    this._popupAvatars.addEventListener('click', e => {
      if (e.target === this._popupAvatars) ViewPages.closePopupAvatars();
    });

    this._avatarImages.forEach(avatar => {
      avatar.addEventListener('click', () => {
        const img = avatar.querySelector('img');
        if (img) model.getAvatar(img);

        ViewPages.displayChekingAvatar(avatar);
        ViewPages.renderAvatarPlayer(model.state.avatarPlayer);
      });
    });
    /* --------------------------------------------------*/

    /* --------------CONTROLS------------------ */
    this._btnSettings.addEventListener('click', e =>
      ViewPages.openSettings(e.currentTarget)
    );
    this._btnCharacter.addEventListener('click', e =>
      ViewPages.openCharacters(e.currentTarget)
    );
    this._btnHome.addEventListener('click', e =>
      ViewPages.openHome(e.currentTarget)
    );

    this._btnStart.addEventListener('click', () => {
      ViewPages.displayBattle();
      ViewPages.hideActiveMenuBtns();
    });
    /* ------------------------------------- */
  }
}

export default App;
