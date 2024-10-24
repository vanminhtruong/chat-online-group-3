async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result)
        const dataArray = Array.isArray(result.data) ? result.data : [result.data];

        return dataArray;
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

function displayMessage(dataArray){
    if (dataArray) {
        const messageList = document.getElementById('chats');

        dataArray.forEach(item => {
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

            const deleteButton = listItemChats.querySelectorAll('#delete-chat');
            deleteButton.forEach(icon => {
                icon.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    deleteData(`http://192.168.1.3:8000/api/messages/${id}`);
                });
            });

            messageList.appendChild(listItemChats);
        });
    }
}
const btnChats = document.querySelector('.btn-chat');

btnChats.addEventListener('click', () => {
    fetchData("http://192.168.1.3:8000/api/messages").then(displayMessage);
    document.getElementsByTagName('h1')[0].innerText="CHATS"
    document.getElementById('chats').style.display=('block');
    document.getElementById('groups').style.display=('none');
    
});

