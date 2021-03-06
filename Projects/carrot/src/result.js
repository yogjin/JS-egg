export default class Result {
  constructor() {
    this.resultMessage = document.querySelector('.result_message');
    this.resultContainer = document.querySelector('.result_container');
    this.redoButton = document.querySelector('.button_redo');
    this.redoButton.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }
  showWithMessage(message) {
    this.resultMessage.innerText = message;
    this.resultContainer.style.display = 'flex';
  }
  hide() {
    this.resultContainer.style.display = 'none';
  }
}
