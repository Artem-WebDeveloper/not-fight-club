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

  displayModalGameEnd(winner) {
    const popupEl = document.querySelector('.popup-game-end');
    const messageEl = document.querySelector('.end-game-modal__message');
    let markup;
    if (winner === 'player') {
      markup = `<p>Congragulation!🎉</p>
          <p>You Won!</p>`;
    } else if (winner === 'enemy') {
      markup = `<p>You Lost!😵</p>
          <p>Try again!</p>`;
    }

    messageEl.innerHTML = '';
    messageEl.insertAdjacentHTML('afterbegin', markup);
    popupEl.classList.remove('popup-game-end--hidden');
  }

  hideModalGameEnd() {
    const popupEl = document.querySelector('.popup-game-end');
    popupEl.classList.add('popup-game-end--hidden');
  }
}

export default new ViewBattle();
