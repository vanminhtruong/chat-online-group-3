  const menuButton = document.querySelector('.menuButton');
  const menuDropdown = document.querySelector('.menuDropdown');
  const btnChats = document.querySelector('.btn-chat');
  const btnGroups = document.querySelector('.btn-group');

  const sidebar = document.getElementById('sidebar');
        const closeButton = document.getElementById('closeButton');

        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

        closeButton.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });

  

  btnChats.addEventListener('click', () => {
      document.getElementsByTagName('h1')[0].innerText="CHATS"
      document.getElementById('chats').style.display=('block');
      document.getElementById('groups').style.display=('none');
  });
  btnGroups.addEventListener('click', () => {
    document.getElementsByTagName('h1')[0].innerText="GROUPS";
    document.getElementById('chats').style.display=('none');
    document.getElementById('groups').style.display=('block');
  });


  document.getElementById('delete-chat').addEventListener('click',()=>{
    console.log("aoidhouiashdoasdosa");
    
  })