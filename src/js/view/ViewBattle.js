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

  /*displaylogs(logsObj) {
    const logsEl = document.querySelector('.logs-panel');

    const { totalDamage } = logsObj;

    logsObj.results.forEach(result => {
      const log = document.createElement('p');

      const { attackerName, targetName, damage, zone, isCrit, blocked } =
        result;
      console.log(totalDamage, attackerName, targetName, damage, zone);

      const attackerClass =
        result.attackerType === 'player' ? 'accent-defence' : 'accent-attack';
      const targetClass =
        result.targetType === 'player' ? 'accent-defence' : 'accent-attack';
      const logEntry =
        result.attackerType === 'player'
          ? 'player-attack-log'
          : 'enemy-attack-log';

      log.classList.add(logEntry);

      let markup = `<span class="${attackerClass}">${attackerName}</span> attacked <span class="${targetClass}">${targetName}</span> to <span class="accent-defence">${zone}</span> and ${
        isCrit && !blocked
          ? '<span class="color-peach-stroke">CRIT</span>'
          : 'dealt'
      } <span class="accent-attack">${damage}</span> <span class="color-red">damage</span>`;

      if (blocked && !isCrit) {
        markup = `<span class="${attackerClass}">${attackerName}</span> attacked <span class="${targetClass}">${targetName}</span> to <span class="accent-defence">${zone}</span> but <span class="${targetClass}">${targetName}</span> was able to protect his <span class="accent-defence">${zone}</span>`;
      }

      if (blocked && isCrit) {
        markup = `<span class="${attackerClass}">${attackerName}</span> attacked <span class="${targetClass}">${targetName}'s</span> <span class="accent-defence">${zone}</span>. 
<span class="${targetClass}">${targetName}</span> tried to block, but <span class="${attackerClass}">${attackerName}</span> <span class="color-peach-stroke">crit</span> through the block, 
dealing <span class="accent-attack">${damage}</span> <span class="color-red">damage!</span>`;
      }

      log.innerHTML = markup;
      logsEl.appendChild(log);
    });
    
  } */

  async displaylogs(logsObj) {
    const logsEl = document.querySelector('.logs-panel');
    const { totalDamage } = logsObj;

    for (const result of logsObj.results) {
      const log = document.createElement('p');

      const { attackerName, targetName, damage, zone, isCrit, blocked } =
        result;

      const attackerClass =
        result.attackerType === 'player'
          ? 'color-player-text'
          : 'color-enemy-text';
      const targetClass =
        result.targetType === 'player'
          ? 'color-player-text'
          : 'color-enemy-text';
      const logEntry =
        result.attackerType === 'player'
          ? 'player-attack-log'
          : 'enemy-attack-log';

      log.classList.add(logEntry);

      let markup = `<span class="damage-pulse ${attackerClass}">${attackerName}</span> attacked <span class="damage-pulse ${targetClass}">${targetName}</span> to <span class="highlight-text">${zone}</span> and ${
        isCrit && !blocked
          ? '<span class="color-peach-stroke damage-flash">CRIT</span>'
          : 'dealt'
      } <span class="accent-attack shake">${damage}</span> <span class="color-red damage-shake">damage</span>`;

      if (blocked && !isCrit) {
        markup = `<span class="${attackerClass} damage-pulse">${attackerName}</span> attacked <span class="${targetClass} damage-pulse">${targetName}</span> to <span class="highlight-text">${zone}</span> but <span class="${targetClass} damage-pulse">${targetName}</span> was able to protect his <span class="highlight-text">${zone}</span>`;
      }

      if (blocked && isCrit) {
        markup = `<span class="${attackerClass} damage-pulse">${attackerName}</span> attacked <span class="${targetClass} damage-pulse">${targetName}'s</span> <span class="highlight-text">${zone}</span>. 
<span class="damage-pulse ${targetClass}">${targetName}</span> tried to block, but <span class="damage-pulse ${attackerClass}">${attackerName}</span> <span class="color-peach-stroke damage-flash">crit</span> through the block, 
dealing <span class="accent-attack shake">${damage}</span> <span class="color-red damage-shake">damage!</span>`;
      }

      log.innerHTML = markup;
      // logsEl.appendChild(log);
      logsEl.insertAdjacentElement('afterbegin', log);

      await this._typeHTML(log, markup, 6, 8);

      // logsEl.scrollTop = logsEl.scrollHeight;
      document.insertAdjacent;
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  }

  clearLogs() {
    const logsEl = document.querySelector('.logs-panel');
    logsEl.innerHTML = '';
  }

  async _typeHTML(element, html, blockSize = 4, delay = 10) {
    element.innerHTML = '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const appendNode = async (parent, node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        let i = 0;
        while (i < node.textContent.length) {
          parent.append(node.textContent.slice(i, i + blockSize));
          i += blockSize;
          await new Promise(r => setTimeout(r, delay));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = document.createElement(node.tagName);
        for (const attr of node.attributes) {
          el.setAttribute(attr.name, attr.value);
        }
        parent.appendChild(el);
        for (const child of Array.from(node.childNodes)) {
          await appendNode(el, child);
        }
      }
    };

    for (const node of Array.from(tempDiv.childNodes)) {
      await appendNode(element, node);
    }
  }
}

export default new ViewBattle();
