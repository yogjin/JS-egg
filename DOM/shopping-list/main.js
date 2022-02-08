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
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.innerHTML = `
    <div class='item'>
      <span class='item__name'>${value}</span>
      <button class='item__removeBtn'>
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div class='item__divider'></div>
  `;
  list.append(itemRow);
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
