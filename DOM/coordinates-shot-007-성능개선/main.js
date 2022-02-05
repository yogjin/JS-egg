const target = document.querySelector('.target');
const col = document.querySelector('.col');
const row = document.querySelector('.row');
const coordinates = document.querySelector('.coordinates');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // 조준점
  target.style.left = `${x - 60}px`;
  target.style.top = `${y - 60}px`;

  // 선
  col.style.left = `${x}px`;
  row.style.top = `${y}px`;

  // 좌표
  coordinates.innerHTML = `${x}px, ${y}px`;
  coordinates.style.left = `${x + 30}px`;
  coordinates.style.top = `${y + 30}px`;
});
