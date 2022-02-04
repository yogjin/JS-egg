const target = document.querySelector('.target');
const col = document.querySelector('.col');
const row = document.querySelector('.row');
const coordinates = document.querySelector('.coordinates');

document.addEventListener('mousemove', (e) => {
  const clientX = e.clientX;
  const clientY = e.clientY;
  // 조준점
  target.style.left = `${clientX - 60}px`;
  target.style.top = `${clientY - 60}px`;

  // 선
  col.style.left = `${clientX}px`;
  row.style.top = `${clientY}px`;

  // 좌표
  coordinates.innerHTML = `${clientX}px, ${clientY}px`;
  coordinates.style.left = `${clientX + 30}px`;
  coordinates.style.top = `${clientY + 30}px`;
});
