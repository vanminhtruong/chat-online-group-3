document.querySelector('#btn-back').addEventListener('click', () => {
  document.querySelector('#boxChat').style.display = 'none';
  document.querySelector('#listChat').style.display = 'block';
});

function reponsiveDisplay() {
  if (window.innerWidth < 640) {
      document.querySelector('#boxChat').style.display = 'none';
      document.querySelector('#listChat').style.display = 'block';
  } else {
      document.querySelector('#boxChat').style.display = 'block';
      document.querySelector('#listChat').style.display = 'block';
  }
}

reponsiveDisplay();

// Lắng nghe sự kiện thay đổi kích thước cửa sổ
window.addEventListener('resize', reponsiveDisplay);
