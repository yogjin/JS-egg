const target = document.querySelector('.target');
const col = document.querySelector('.col');
const row = document.querySelector('.row');
const coordinates = document.querySelector('.coordinates');

document.addEventListener('mousemove', (e) => {
  const offsetX = e.clientX;
  const offsetY = e.clientY;
  // 조준점
  target.style.left = `${offsetX - 60}px`;
  target.style.top = `${offsetY - 60}px`;

  // 선
  col.style.left = `${offsetX}px`;
  row.style.top = `${offsetY}px`;

  // 좌표
  coordinates.innerHTML = `${offsetX}px, ${offsetY}px`;
  coordinates.style.left = `${offsetX + 30}px`;
  coordinates.style.top = `${offsetY + 30}px`;
});
