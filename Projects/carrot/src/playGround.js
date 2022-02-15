export default class PlayGround {
  constructor() {
    this.playGround = document.querySelector('.play_ground');
    this.carrotSize = 80;
    window.addEventListener('load', () => {
      this.groundWidth = this.playGround.getBoundingClientRect().width;
      this.groundHeight = this.playGround.getBoundingClientRect().height;
    });
    this.playGround.addEventListener('click', (e) => {
      this.onClick && this.onClick(e);
    });
  }
  // 벌레, 당근 클릭시 이벤트 설정
  setClickListener(onClick) {
    this.onClick = onClick;
  }
  // 벌레, 당근 추가
  addCarrotAndBugs() {
    const carrot = `
    <div class='item carrot'>
      <img src='./img/carrot.png' data-id='carrot'>
    </div>
  `;
    const bug = `
    <div class='item bug'>
      <img src='./img/bug.png' data-id='bug'>
    </div>
  `;
    this.playGround.innerHTML = `${carrot.repeat(10)}${bug.repeat(10)}`;
  }

  // 벌레,당근을 playGround안 랜덤한 위치에 위치시키기 위함
  getRandomPosition() {
    const rangeX = this.groundWidth - this.carrotSize;
    const rangeY = this.groundHeight - this.carrotSize;
    const x = rangeX * Math.random();
    const y = rangeY * Math.random();
    return { x, y };
  }
  // 벌레, 당근을 랜덤위치 시킴
  setCarrotAndBugs() {
    if (!isPlaying) {
      return;
    }
    const carrotAndBugs = document.querySelectorAll('.item');
    carrotAndBugs.forEach((carrotOrBug) => {
      carrotOrBug.style.display = 'inline-block';
      const { x, y } = this.getRandomPosition();
      carrotOrBug.style.left = `${x}px`;
      carrotOrBug.style.top = `${y}px`;
    });
  }
}
