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
    logs: [],
    playerAttack: '',
    playerDefences: '',
    critChance: 0.2,
  };

  currentEnemyState = {};

  enemySuccub = {
    nameEnemy: 'Succub',
    avatarEnemy: 'public/images/enemies/succubus.png',
    health: 140,
    damage: 10,
    attacks: 2,
    defences: 1,
    critChance: 0.2,
  };
  enemyWorm = {
    nameEnemy: 'Worm',
    avatarEnemy: 'public/images/enemies/worm.png',
    health: 150,
    damage: 10,
    attacks: 1,
    defences: 3,
    critChance: 0.1,
  };

  enemies = [this.enemyWorm, this.enemySuccub];
  bodyParts = ['head', 'neck', 'body', 'belly', 'legs'];

  constructor() {
    this._proggresHpPlayerEl = document.querySelector(
      '.entity__health-bar--player'
    );
    this._proggresHpEnemyEl = document.querySelector(
      '.entity__health-bar--enemy'
    );
    console.log(this.getPicksEnemy());
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

  checkValidatePicks(radio, checkboxes, button) {
    if (radio.length === 1 && checkboxes.length === 2) button.disabled = false;
    else button.disabled = true;
  }

  getPicksPlayer() {
    const checkedAttack = document.querySelector(
      'input[name="body-part-attack"]:checked'
    );
    const checkedDefences = document.querySelectorAll(
      'input[name="body-part-defence"]:checked'
    );

    this.state.playerAttack = checkedAttack.dataset.bodypart;
    this.state.playerDefences = Array.from(checkedDefences).map(
      el => el.dataset.bodypart
    );
    console.log(this.state);
  }

  /* getPicksEnemy(numAttacks, numDefs) {
    const bodyPts = [...this.bodyParts];
    this._shuffle(bodyPts);

    this.currentEnemyState.attackZones = bodyPts.slice(0, numAttacks);
    this.currentEnemyState.defencesZones = bodyPts.slice(0, numDefs);

    console.log(this.currentEnemyState);
  } */

  getPicksEnemy(numAttacks, numDefs) {
    const getRandomZone = (usedZones = []) => {
      let zone;
      do {
        zone =
          this.bodyParts[Math.floor(Math.random() * this.bodyParts.length)];
      } while (usedZones.includes(zone));
      return zone;
    };
    this.currentEnemyState.attackZones = [];
    for (let i = 0; i < numAttacks; i++) {
      const zone = getRandomZone(this.currentEnemyState.attackZones);
      this.currentEnemyState.attackZones.push(zone);
    }
    this.currentEnemyState.defenceZones = [];
    for (let i = 0; i < numDefs; i++) {
      const zone = getRandomZone(this.currentEnemyState.defenceZones);
      this.currentEnemyState.defenceZones.push(zone);
    }
    console.log(this.currentEnemyState);
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

  /*  logStroke(enemy) {
    const player = {
      damage: '',
      zone: '',
      isCrit: false,
    };
    const enemy = {
      damage: '',
      zone: '',
      isCrit: false,
    };
    return `${this.state.namePlayer} attacked ${enemy.nameEnemy} to ${enemy.zone}`;
  } */

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

  getRandomEnemy() {
    const index = Math.floor(Math.random() * this.enemies.length);
    return this.enemies[index];
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  calculateDamage(attacker, target, attackZone, targetDefences) {
    let damage = attacker.damage;
    const isCrit = Math.random() < attacker.critChance;

    const blocked = targetDefences.includes(attackZone);

    if (isCrit) {
      if (!blocked) damage = Math.floor(damage * 1.5);
      else damage = damage;
    } else {
      if (blocked) damage = 0;
    }
    console.log(targetDefences);
    // target.health -= damage;
    this._proggresHpEnemyEl.value = +this._proggresHpEnemyEl.value - +damage;

    return { damage, isCrit, blocked, zone: attackZone };
  }
}

export const model = new Model();
