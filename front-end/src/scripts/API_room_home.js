async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;

    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

async function deleteData(urlDelete) {
    try {
        const response = await fetch(urlDelete, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete message! Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Có lỗi xảy ra khi xóa:', error);
    }
}

function displayGroupMessage(data) {
    const roomList = document.getElementById('groups');
    roomList.innerHTML = '';
    if (data) {
        data.forEach(item => {
            const listItemRoom = document.createElement('div');
            listItemRoom.classList.add('flex', 'items-center', 'mb-4', 'cursor-pointer', 'hover:bg-gray-300', 'p-2', 'rounded-md', 'group');

            listItemRoom.innerHTML = `
                <div class="w-12 h-12 bg-gray-200 rounded-full mr-3">
                    <div class="w-12 h-12 rounded-full text-center text-2xl font-bold text-white flex justify-center items-center">
                        A
                    </div>
                </div>
                <div class="flex-1">
                    <h2 class="text-lg font-semibold">${item.name}</h2>
                </div>
                <img
                    id="delete-room"
                    class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    src="../assets/icon/detele.svg"
                    alt="Xóa tin nhắn"
                    data-id="${item.id}"
                />
            `;
            if (window.innerWidth < 640) {
                listItemRoom.addEventListener('click', () => {
                    
                    document.querySelector('#boxChat').style.display = 'block';
                    document.querySelector('#listChat').style.display = 'none';
                });
            }

            const deleteButton = listItemRoom.querySelector('#delete-room');
            deleteButton.addEventListener('click', (e) => {
                const isConfirmed = confirm('Bạn có chắc chắn muốn xóa phòng này không?');
                if (isConfirmed) {
                    e.stopPropagation();
                    const id = e.target.getAttribute('data-id');
                    deleteData(`http://192.168.1.3:8000/api/rooms/${id}`).then(() => {
                        fetchData("http://192.168.1.3:8000/api/rooms").then(displayGroupMessage);
                    });
                }
            });

            roomList.appendChild(listItemRoom);
        });
    }
}

const btnGroups = document.querySelector('.btn-group');
btnGroups.addEventListener('click', () => {
    const btnNewChatElement = document.querySelector('#btn-new-chat');
    const btnNewChatsElement = document.querySelector('#btn-new-chats');
    
    if (btnNewChatElement) {
        btnNewChatElement.id = 'btn-new-groups';
    }
    else if(btnNewChatsElement){
        btnNewChatsElement.id = 'btn-new-groups';
    }
    fetchData("http://192.168.1.3:8000/api/rooms").then(displayGroupMessage);
    document.getElementsByTagName('h1')[0].innerText = "GROUPS";
    document.getElementById('chats').style.display = 'none';
    document.getElementById('groups').style.display = 'block';
});



