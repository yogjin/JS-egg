const target = document.querySelector('.target');
const col = document.querySelector('.col');
const row = document.querySelector('.row');
const coordinates = document.querySelector('.coordinates');
const targetHalfWidth = target.getBoundingClientRect().width / 2;
const targetHalfHeight = target.getBoundingClientRect().height / 2;

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // 조준점
  target.style.transform = `translate(${x - targetHalfWidth}px, ${
    y - targetHalfHeight
  }px)`;

  // 선
  col.style.transform = `translateX(${x}px)`;
  row.style.transform = `translateY(${y}px)`;

  // 좌표
  coordinates.innerHTML = `${x}px, ${y}px`;
  coordinates.transform = `translate(${x}, ${y})`;
});
