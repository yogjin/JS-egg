const playButton = document.querySelector('.play_button');
const countDown = document.querySelector('.count_down');
const playGround = document.querySelector('.play_ground');
const remainingCarrot = document.querySelector('.remaining_carrot');
const groundWidth = playGround.getBoundingClientRect().width;
const groundHeight = playGround.getBoundingClientRect().height;
const groundX = playGround.getBoundingClientRect().x;
const groundY = playGround.getBoundingClientRect().y;

let countInterval;
let numOfCarrots;

// 게임 시작하면 카운트 다운
function handleCountDown() {
  const on = playButton.classList.contains('on');
  if (!on) {
    // 게임 시작 시 카운트다운 시작, 아이콘 변화
    playButton.innerHTML = `<i class="fas fa-square"></i>`;
    playButton.classList.add('on');
    let sec = 10;
    countDown.innerText = `00:${sec}`;
    countInterval = setInterval(() => {
      countDown.innerText = `00:0${--sec}`;
      if (sec === 0) {
        console.log('끝!!');
        clearInterval(countInterval);
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
        playButton.classList.remove('on');
      }
    }, 1000);
  } else {
    // 게임 진행중일때 버튼 다시누르면 카운트다운, 아이콘 초기화
    clearInterval(countInterval);
    let sec = 10;
    countDown.innerText = `00:${sec}`;
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
    playButton.classList.remove('on');
  }
}
playButton.addEventListener('click', handleCountDown);
playButton.addEventListener('click', () => setRemainingCarrot(10));
playButton.addEventListener('click', setCarrotAndBugs);

// 벌레, 당근 추가
function addCarrotAndBugs() {
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
  playGround.insertAdjacentHTML('afterbegin', carrot.repeat(10));
  playGround.insertAdjacentHTML('afterbegin', bug.repeat(10));
}
// 벌레, 당근을 랜덤위치 시킴
// img가 load되고 나서 getRandomPosition안의 getBoundingClientRect() 실행가능함
/* 수정요망 */
/* playButton을 눌렀을때, getBoundingClientRect() 제대로 작동하게 해야함. load말고 Promise같은걸로, 또는 다른 방법으로 */
function setCarrotAndBugs() {
  const carrotAndBugs = document.querySelectorAll('.item');
  carrotAndBugs.forEach((carrotOrBug) => {
    carrotOrBug.style.display = 'inline-block';
    const { x, y } = getRandomPosition(carrotOrBug);
    carrotOrBug.style.left = `${x}px`;
    carrotOrBug.style.top = `${y}px`;
  });
}

// 벌레,당근을 playGround안 랜덤한 위치에 위치시키기 위함
function getRandomPosition(carrotOrBug) {
  const carrotOrBugWidth = carrotOrBug.getBoundingClientRect().width;
  const carrotOrBugHeight = carrotOrBug.getBoundingClientRect().height;
  const x = groundX + (groundWidth - carrotOrBugWidth) * Math.random();
  const y = groundY + (groundHeight - carrotOrBugHeight) * Math.random();
  return { x, y };
}

// 당근과 벌레를 클릭했을 때 상호작용
// 당근: .remaining_carrot값 감소
// 벌레: 게임 오버
function handleClicked(e) {
  const carrotOrBug = e.target;
  const id = carrotOrBug.dataset.id;
  if (id === 'carrot') {
    carrotOrBug.remove();
  } else if (id === 'bug') {
    carrotOrBug.remove();
    // 게임오버
  }
}
playGround.addEventListener('click', handleClicked);

// 남은 당근 개수를 10개로 설정
function setRemainingCarrot(numOfCarrot) {
  numOfCarrots = numOfCarrot;
  remainingCarrot.innerText = numOfCarrots;
}

// 당근과 벌레를 playGround에 추가함
addCarrotAndBugs();
