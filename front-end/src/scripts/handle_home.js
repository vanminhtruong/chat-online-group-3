  const menuButton = document.querySelector('.menuButton');
  const menuDropdown = document.querySelector('.menuDropdown');

  const sidebar = document.getElementById('sidebar');
        const closeButton = document.getElementById('closeButton');

        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

        closeButton.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });

  

  
  


  document.getElementById('delete-chat').addEventListener('click',()=>{
    console.log("aoidhouiashdoasdosa");
    
  })