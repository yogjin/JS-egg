const target = document.querySelector('.target');
const col = document.querySelector('.col');
const row = document.querySelector('.row');
const coordinates = document.querySelector('.coordinates');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // 조준점
  target.style.transform = `translate(${x}px, ${y}px)`;

  // 선
  col.style.transform = `translateX(${x}px)`;
  row.style.transform = `translateY(${y}px)`;

  // 좌표
  coordinates.innerHTML = `${x}px, ${y}px`;
  coordinates.transform = `translate(${x}, ${y})`;
});
