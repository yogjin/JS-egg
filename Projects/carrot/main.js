const playButton = document.querySelector('.play_button');
const countDown = document.querySelector('.count_down');

// 게임 시작하면 카운트 다운
function startCountDown() {
  let sec = 10;
  countDown.innerText = `00:${sec}`;
  const countInterval = setInterval(() => {
    countDown.innerText = `00:0${--sec}`;
    if (sec === 0) {
      console.log('끝!!');
      clearInterval(countInterval);
    }
  }, 1000);
}
playButton.addEventListener('click', startCountDown);
