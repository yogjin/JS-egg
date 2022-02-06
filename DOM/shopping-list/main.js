'use strict';
const list = document.querySelector('.shopping-list');
const addBtn = document.querySelector('.addBtn');
const addInput = document.querySelector('.addInput');

// list에 추가
function addItem() {
  const value = addInput.value;
  const li = `<li>${value}<button class="removeBtn">X</button></li>`;
  list.insertAdjacentHTML('beforeend', li);
}
addBtn.addEventListener('click', addItem);
// list에서 삭제
