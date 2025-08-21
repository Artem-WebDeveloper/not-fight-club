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

  _radioAttack = document.querySelectorAll('input[name="body-part-attack"]');
  _checkboxesDefences = document.querySelectorAll(
    'input[name="body-part-defence"]'
  );

  _inputRegistrationEl = document.querySelector('#name-character');
  _inputSettingsEl = document.querySelector('.change-name-input');

  _enemy;

  constructor() {
    /* -------------LOADDOM------------------------ */

    // this._enemy = model.getRandomEnemy();

    window.addEventListener('load', () => {
      // localStorage.clear();
      model.recoverState();
      this._enemy = model._enemy;

      ViewPages.renderStatistic(model.state);

      if (model.state.namePlayer) {
        ViewPages.closeRegistration();
        ViewPages.renderNamePlayer(model.state.namePlayer);
      }

      if (model.state.avatarPlayer) {
        ViewPages.renderAvatarPlayer(model.state.avatarPlayer);
        ViewPages.restoreActiveAvatar(model.state.avatarPlayer);
      }

      this._initFight();
    });

    /* --------------------------------------------------*/

    /* --------------BATTLE FIGHT------------------ */

    [...this._checkboxesDefences, ...this._radioAttack].forEach(input => {
      input.addEventListener('change', () => {
        const checkedAttack = document.querySelectorAll(
          'input[name="body-part-attack"]:checked'
        );
        const checkedDefences = document.querySelectorAll(
          'input[name="body-part-defence"]:checked'
        );
        model.checkValidatePicks(
          checkedAttack,
          checkedDefences,
          this._btnAttack
        );
      });
    });

    this._btnAttack.addEventListener('click', async () => {
      if (this._btnAttack.disabled) return;
      this._btnAttack.disabled = true;

      model.getPicksPlayer();
      model.getPicksEnemy(this._enemy.attacks, this._enemy.defences);

      const dmgFromPlayer = model.calculateDamage(
        model.state,
        this._enemy,
        model.state.playerAttack,
        model.currentEnemyState.defenceZones
      );
      // console.log(dmgFromPlayer);
      await ViewBattle.displaylogs(dmgFromPlayer);

      const dmgFromEnemy = model.calculateDamage(
        this._enemy,
        model.state,
        model.currentEnemyState.attackZones,
        model.state.playerDefences
      );
      await ViewBattle.displaylogs(dmgFromEnemy);
      // console.log(dmgFromEnemy);
      // ViewBattle.displaylogs(dmgFromEnemy);

      model.updateCurrentHealthsBars(model.state.health, this._enemy.health);
      ViewBattle.updatePlayerHealth();
      ViewBattle.updateEnemyHealth();

      model.checkHealthBars();
      if (model.checkWinner()) {
        ViewBattle.displayModalGameEnd(model.checkWinner());
        model.updateStatistic(model.checkWinner());
        ViewPages.renderStatistic(model.state);
        return;
      }
      model.saveGame(this._enemy);
      this._btnAttack.disabled = false;
    });

    this._btnFinish.addEventListener('click', () => {
      ViewBattle.hideModalGameEnd();
      ViewPages.openCharacters(this._btnCharacter);
      this._enemy = model.getRandomEnemy();
      model.initHealths();
      localStorage.setItem('state', JSON.stringify(model.state));
      this._initFight();

      ViewBattle.clearLogs();
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

  _initFight() {
    ViewBattle.renderEnemyAvatar(this._enemy.avatarEnemy);
    ViewBattle.renderEnemyName(this._enemy.nameEnemy);

    model.setPlayerHealth(model.state.health, model.state.initHealth);
    ViewBattle.updatePlayerHealth();

    model.setEnemyHealth(this._enemy.health, this._enemy.initHealth);
    ViewBattle.updateEnemyHealth();
    this._resetPicks();
  }

  _resetPicks() {
    this._radioAttack.forEach(radio => (radio.checked = false));
    this._checkboxesDefences.forEach(checkbox => (checkbox.checked = false));
    this._btnAttack.disabled = true;
  }
}

export default App;
