  const menuButton = document.querySelector('.menuButton');
  const menuDropdown = document.querySelector('.menuDropdown');
  const btnChats = document.querySelector('.btn-chat');
  const btnGroups = document.querySelector('.btn-group');

  menuButton.addEventListener('click', () => {
      if (menuDropdown.classList.contains('hidden')) {
          menuDropdown.classList.remove('hidden');
      } else {
          menuDropdown.classList.add('hidden');
      }
  });

  document.addEventListener('click', (e) => {
      if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
          menuDropdown.classList.add('hidden');
      }
  });

  btnChats.addEventListener('click', () => {
      document.getElementsByTagName('h1')[0].innerText="CHATS"
      document.getElementById('chats').classList=('block');
      document.getElementById('groups').classList=('hidden');
  });
  btnGroups.addEventListener('click', () => {
    document.getElementsByTagName('h1')[0].innerText="GROUPS";
    document.getElementById('chats').classList=('hidden');
    document.getElementById('groups').classList=('block');
  });