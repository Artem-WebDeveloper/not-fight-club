class Model {
  state = {
    namePlayer: '',
    avatarPlayer: '',
  };

  constructor() {}

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
}

export const model = new Model();
