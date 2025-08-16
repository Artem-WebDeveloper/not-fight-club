class Model {
  state = {
    namePlayer: '',
    avatarPlayer: '',
    healthPlayer: 120,
  };

  enemySuccub = {
    nameEnemy: 'Succub',
    avatarEnemy: 'public/images/enemies/succubus.png',
    healthEnemy: 150,
  };
  enemyWorm = {
    nameEnemy: 'Worm',
    avatarEnemy: 'public/images/enemies/worm.png',
    healthEnemy: 160,
  };

  enemies = [this.enemyWorm, this.enemySuccub];

  constructor() {
    this._shuffle(this.enemies);
  }

  saveNamePlayer(input) {
    this.state['namePlayer'] = input.value.trim();
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  checkNameLength(input, button) {
    input.addEventListener('input', () => {
      if (input.value.trim().length < 1) button.disabled = true;
      else button.disabled = false;
    });
  }

  recoverState() {
    const stateLocale = JSON.parse(localStorage.getItem('state'));
    if (!stateLocale) return;
    Object.assign(this.state, stateLocale);

    console.log('this', this.state);
  }

  getAvatar(avatar) {
    this.state['avatarPlayer'] = avatar.getAttribute('src');
    localStorage.setItem('state', JSON.stringify(this.state));
    console.log(this.state);
  }

  setEnemyHealth(hp) {
    const proggresHpEl = document.querySelector('.entity__health-bar--enemy');
    proggresHpEl.max = hp;
    proggresHpEl.value = hp;
  }

  setPlayerHealth(hp) {
    const proggresHpEl = document.querySelector('.entity__health-bar--player');
    proggresHpEl.max = hp;
    proggresHpEl.value = hp;
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

export const model = new Model();
