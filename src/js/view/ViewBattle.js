class ViewBattle {
  constructor() {}

  renderEnemyName(enemyName) {
    const enemyNameEl = document.querySelector('.enemy-name');
    enemyNameEl.textContent = enemyName;
  }

  renderEnemyAvatar(pathEnemyImg) {
    const enemyImgEl = document.querySelector('.current-enemy-avatar');
    if (pathEnemyImg) enemyImgEl.src = pathEnemyImg;
  }

  updatePlayerHealth() {
    const maxHp = document.querySelector('.max-player-heath');
    const currentHp = document.querySelector('.current-player-heath');
    const playerProgressHp = document.querySelector(
      '.entity__health-bar--player'
    );

    maxHp.textContent = playerProgressHp.max;
    currentHp.textContent = playerProgressHp.value;
  }

  updateEnemyHealth() {
    const maxHp = document.querySelector('.max-enemy-heath');
    const currentHp = document.querySelector('.current-enemy-heath');
    const enemyProgressHp = document.querySelector(
      '.entity__health-bar--enemy'
    );

    maxHp.textContent = enemyProgressHp.max;
    currentHp.textContent = enemyProgressHp.value;
  }
}

export default new ViewBattle();
