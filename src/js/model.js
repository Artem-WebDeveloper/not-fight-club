class Model {
  state = {
    namePlayer: '',
    avatarPlayer: '',
    healthPlayer: 150,
    damagePlayer: 10,
    isWonPlayer: false,
    isWonEnemy: false,
    wins: 0,
    loses: 0,
  };

  enemySuccub = {
    nameEnemy: 'Succub',
    avatarEnemy: 'public/images/enemies/succubus.png',
    healthEnemy: 150,
    damage: 10,
  };
  enemyWorm = {
    nameEnemy: 'Worm',
    avatarEnemy: 'public/images/enemies/worm.png',
    healthEnemy: 160,
    damage: 10,
  };

  enemies = [this.enemyWorm, this.enemySuccub];

  constructor() {
    this._proggresHpPlayerEl = document.querySelector(
      '.entity__health-bar--player'
    );
    this._proggresHpEnemyEl = document.querySelector(
      '.entity__health-bar--enemy'
    );

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
    this._proggresHpEnemyEl.max = hp;
    this._proggresHpEnemyEl.value = hp;
  }

  setPlayerHealth(hp) {
    this._proggresHpPlayerEl.max = hp;
    this._proggresHpPlayerEl.value = hp;
  }

  playerAttacks() {
    this._proggresHpEnemyEl.value =
      +this._proggresHpEnemyEl.value - this.state.damagePlayer;
  }

  enemyAttacks(enemy) {
    this._proggresHpPlayerEl.value =
      +this._proggresHpPlayerEl.value - enemy.damage;
  }

  checkHealthBars() {
    if (this._proggresHpPlayerEl.value == 0) this.state.isWonEnemy = true;
    else if (this._proggresHpEnemyEl.value == 0) this.state.isWonPlayer = true;
  }
  checkWinner() {
    if (this.state.isWonEnemy) return 'enemy';
    if (this.state.isWonPlayer) return 'player';
    return false;
  }

  resetWinner() {
    this.state.isWonPlayer = false;
    this.state.isWonEnemy = false;
  }

  updateStatistic(winner) {
    if (winner === 'player') {
      this.state.wins += 1;
    } else if (winner === 'enemy') {
      this.state.loses += 1;
    }
    this.resetWinner();
    localStorage.setItem('state', JSON.stringify(this.state));
    console.log(this.state);
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

export const model = new Model();
