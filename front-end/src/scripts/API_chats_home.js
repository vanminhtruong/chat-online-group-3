async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        return { data: [] };
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

async function creatData(urlCreate) {
    try {
        const response = await fetch(urlCreate, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete message! Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Có lỗi xảy ra khi tạo:', error);
    }
}


function displayMessage(result) {
    const messageList = document.getElementById('chats');
    messageList.innerHTML = '';

    const data = result.data;

    if (data) {
        data.forEach(item => {
            const listItemChats = document.createElement('div');
            listItemChats.classList.add('flex', 'items-center', 'mb-4', 'cursor-pointer', 'hover:bg-gray-300', 'p-2', 'rounded-md', 'group');

            listItemChats.innerHTML = `
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img
                        id="backMenu"
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        class="w-12 h-12 rounded-full"
                    />
                </div>
                <div class="flex-1">
                    <div>
                        <h2 class="text-lg font-semibold">${item.receiver_id || 'Người nhận'}</h2>
                        <p class="text-gray-600">${item.content || 'Nội dung không có!'}</p>
                    </div>
                </div>
                <img
                    id="delete-chat"
                    class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    src="../assets/icon/detele.svg"
                    alt="Xóa tin nhắn"
                    data-id="${item.id}"
                />
            `;
            if (window.innerWidth < 640) {
                listItemChats.addEventListener('click', () => {
                    document.querySelector('#boxChat').style.display = 'block';
                    document.querySelector('#listChat').style.display = 'none';
                });
            }

            const deleteButton = listItemChats.querySelector('#delete-chat');
            deleteButton.addEventListener('click', (e) => {
                const isConfirmed = confirm('Bạn có chắc chắn muốn xóa phòng này không?');
                if (isConfirmed) {
                    e.stopPropagation();
                    const id = e.target.getAttribute('data-id');
                    deleteData(`http://192.168.1.3:8000/api/messages/${id}`).then(() => {
                        fetchData("http://192.168.1.3:8000/api/messages").then(displayMessage);
                    });
                }
            });

            messageList.appendChild(listItemChats);
        });
    }
}

const btnChats = document.querySelector('.btn-chat');
fetchData("http://192.168.1.3:8000/api/messages").then(displayMessage);
btnChats.addEventListener('click', () => {
    const btnNewChatElement = document.querySelector('#btn-new-chat');
    const btnNewGroupsElement = document.querySelector('#btn-new-groups');
    
    if (btnNewChatElement) {
        btnNewChatElement.id = 'btn-new-chats';
    }
    else if(btnNewGroupsElement){
        btnNewGroupsElement.id = 'btn-new-chats';
    }
    fetchData("http://192.168.1.3:8000/api/messages").then(displayMessage);
    document.getElementsByTagName('h1')[0].innerText = "CHATS";
    document.getElementById('chats').style.display = 'block';
    document.getElementById('groups').style.display = 'none';
});



