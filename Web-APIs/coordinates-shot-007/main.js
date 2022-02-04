const target = document.querySelector('.target');
document.addEventListener('mousemove', (e) => {
  const offsetX = e.clientX;
  const offsetY = e.clientY;
  // 조준점
  target.style.left = `${offsetX - 60}px`;
  target.style.top = `${offsetY - 60}px`;
});
