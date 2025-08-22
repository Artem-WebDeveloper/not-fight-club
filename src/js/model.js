class Model {
  state = {
    namePlayer: '',
    avatarPlayer: 'public/images/avatars/elster.webp',
    health: 150,
    initHealth: 150,
    damage: 10,
    isWonPlayer: false,
    isWonEnemy: false,
    wins: 0,
    loses: 0,
    logs: [],
    playerAttack: '',
    playerDefences: '',
    critChance: 0.25,
    isPlayer: true,

    get name() {
      return this.namePlayer;
    },

    set name(value) {
      this.namePlayer = value;
    },
  };

  currentEnemyState = {};

  enemySuccub = {
    nameEnemy: 'Succubus',
    avatarEnemy: 'public/images/enemies/succubus.webp',
    health: 140,
    initHealth: 140,
    damage: 7,
    attacks: 2,
    defences: 1,
    critChance: 0.2,
    isPlayer: false,
    archetype: 'Agressor',
    strengths: 'Agile',
    weaknesses: 'Fragile',

    get name() {
      return this.nameEnemy;
    },

    set name(value) {
      this.nameEnemy = value;
    },
  };
  enemyTyrant = {
    nameEnemy: 'Mr.X',
    avatarEnemy: 'public/images/enemies/tyrant.webp',
    health: 150,
    initHealth: 150,
    damage: 10,
    attacks: 1,
    defences: 3,
    critChance: 0.1,
    isPlayer: false,
    archetype: 'Tank',
    strengths: 'High defence',
    weaknesses: 'Slow',

    get name() {
      return this.nameEnemy;
    },

    set name(value) {
      this.nameEnemy = value;
    },
  };
  enemyDoggo = {
    nameEnemy: 'Doggo Sif',
    avatarEnemy: 'public/images/enemies/doggo.webp',
    health: 130,
    initHealth: 130,
    damage: 5,
    attacks: 3,
    defences: 1,
    critChance: 0.05,
    isPlayer: false,
    archetype: 'Fast Predator',
    strengths: 'Multi attacks',
    weaknesses: 'Weak defence, Low crit',

    get name() {
      return this.nameEnemy;
    },

    set name(value) {
      this.nameEnemy = value;
    },
  };
  enemyScorpepe = {
    nameEnemy: 'ScorPepe',
    avatarEnemy: 'public/images/enemies/scorpepe.webp',
    health: 120,
    initHealth: 120,
    damage: 6,
    attacks: 2,
    defences: 2,
    critChance: 0.3,
    isPlayer: false,
    archetype: 'Critical Striker',
    strengths: 'High crit',
    weaknesses: 'Unstable damage',

    get name() {
      return this.nameEnemy;
    },

    set name(value) {
      this.nameEnemy = value;
    },
  };

  enemies = [
    this.enemyTyrant,
    this.enemySuccub,
    this.enemyDoggo,
    this.enemyScorpepe,
  ];
  bodyParts = ['head', 'neck', 'body', 'belly', 'legs'];

  constructor() {
    this._proggresHpPlayerEl = document.querySelector(
      '.entity__health-bar--player'
    );
    this._proggresHpEnemyEl = document.querySelector(
      '.entity__health-bar--enemy'
    );
    // console.log(this.getPicksEnemy());
  }

  initHealths() {
    this.enemies.forEach(enemy => (enemy.health = enemy.initHealth));
    this.state.health = this.state.initHealth;
  }

  saveNamePlayer(input) {
    const secureHTML = str =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    this.state['namePlayer'] = secureHTML(input.value.trim());
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

    this.state.playerAttack = [checkedAttack.dataset.bodypart];
    this.state.playerDefences = Array.from(checkedDefences).map(
      el => el.dataset.bodypart
    );
    // console.log(this.state);
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
    // console.log(this.currentEnemyState);
  }

  saveGame(enemy) {
    const logsPanelEl = document.querySelector('.logs-panel');

    localStorage.setItem('state', JSON.stringify(this.state));
    localStorage.setItem('enemyHealth', enemy.health);
    localStorage.setItem('enemyIndex', this.enemies.indexOf(enemy));
    localStorage.setItem('logsOfFight', logsPanelEl.innerHTML);
  }

  recoverState() {
    const logsPanelEl = document.querySelector('.logs-panel');
    const stateLocale = JSON.parse(localStorage.getItem('state'));
    if (stateLocale) {
      Object.assign(this.state, stateLocale);
    }

    const enemyIndex = localStorage.getItem('enemyIndex');
    if (enemyIndex !== null && this.enemies[enemyIndex]) {
      this._enemy = this.enemies[enemyIndex];
    } else {
      this._enemy = this.getRandomEnemy();
    }

    const enemyHealth = localStorage.getItem('enemyHealth');
    if (enemyHealth && this._enemy) this._enemy.health = +enemyHealth;

    const logsOfFight = localStorage.getItem('logsOfFight');
    if (logsOfFight) logsPanelEl.innerHTML = logsOfFight;
  }

  getAvatar(avatar) {
    this.state['avatarPlayer'] = avatar.getAttribute('src');
    localStorage.setItem('state', JSON.stringify(this.state));
    // console.log(this.state);
  }

  setEnemyHealth(hp, hpMax) {
    this._proggresHpEnemyEl.max = hpMax;
    this._proggresHpEnemyEl.value = hp;
  }

  setPlayerHealth(hp, hpMax) {
    this._proggresHpPlayerEl.max = hpMax;
    this._proggresHpPlayerEl.value = hp;
  }

  updateCurrentHealthsBars(playerHp, enemyHp) {
    this._proggresHpPlayerEl.value = playerHp;
    this._proggresHpEnemyEl.value = enemyHp;
  }

  playerAttacks(damage) {
    this._proggresHpEnemyEl.value = +this._proggresHpEnemyEl.value - damage;
  }

  enemyAttacks(damage) {
    this._proggresHpPlayerEl.value = +this._proggresHpPlayerEl.value - damage;
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

  calculateDamage(attacker, target, attackZones, targetDefences) {
    const zones = Array.isArray(attackZones) ? attackZones : [attackZones];
    let totalDamage = 0;
    const results = [];

    for (const zone of zones) {
      let damage = attacker.damage;
      const isCrit = Math.random() < attacker.critChance;
      const blocked = targetDefences.includes(zone);

      if (isCrit && !blocked) damage = Math.floor(damage * 1.5);
      else if (!isCrit && blocked) damage = 0;

      const attackerName = attacker.name;
      const targetName = target.name;
      const attackerType = attacker.isPlayer ? 'player' : 'enemy';
      const targetType = target.isPlayer ? 'player' : 'enemy';

      results.push({
        attackerName,
        attackerType,
        targetName,
        targetType,
        damage,
        isCrit,
        blocked,
        zone,
      });
      totalDamage += damage;
    }

    target.health -= totalDamage;

    return { totalDamage, results };
  }
}

export const model = new Model();
