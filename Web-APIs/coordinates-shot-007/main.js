const target = document.querySelector('.target');
const col = document.querySelector('.col');
const row = document.querySelector('.row');

document.addEventListener('mousemove', (e) => {
  const offsetX = e.clientX;
  const offsetY = e.clientY;
  // 조준점
  target.style.left = `${offsetX - 60}px`;
  target.style.top = `${offsetY - 60}px`;

  // 선
  col.style.left = `${offsetX}px`;
  row.style.top = `${offsetY}px`;
});
