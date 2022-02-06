'use strict';
const list = document.querySelector('.shopping-list');
const addBtn = document.querySelector('.addBtn');
const addInput = document.querySelector('.addInput');
const removeBtns = document.querySelectorAll('.removeBtn');

// list에 추가
function addItem() {
  const value = addInput.value;

  // item 입력안했을 시
  if (value == '') {
    return false;
  }

  // 삭제버튼
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'removeBtn');
  removeBtn.innerText = 'X';
  removeBtn.addEventListener('click', removeItem);

  // item list
  const li = document.createElement('li');
  li.innerText = value;
  li.append(removeBtn);

  list.append(li);
}
addBtn.addEventListener('click', addItem);

// 엔터 눌러서 item 추가
addInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    addItem();
  }
});

// list에서 삭제
function removeItem() {
  this.parentNode.remove();
}
