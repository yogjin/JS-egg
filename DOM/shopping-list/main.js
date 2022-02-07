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
  removeBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  removeBtn.addEventListener('click', removeItem);

  // item list
  const li = document.createElement('li');
  li.setAttribute('class', 'items');
  li.innerText = value;
  li.append(removeBtn);

  list.append(li);
  list.insertAdjacentHTML('beforeend', `<li class="divider"></li>`); // divider 추가
  // input창 초기화
  addInput.value = '';
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
  this.parentNode.nextSibling.remove(); // divider 삭제
  this.parentNode.remove();
}
