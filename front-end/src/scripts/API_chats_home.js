async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const dataArray = Array.isArray(result.data) ? result.data : [result.data];

        return dataArray;
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

async function sendMessage(url, messageContent, receiverId) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                content: messageContent, 
                receiver_id: receiverId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(`Failed to send message! Status: ${response.status}, Error: ${errorData.message}`);
        }

        const newMessage = await response.json();
        displayMessage([newMessage]); 
    } catch (error) {
        console.error('Có lỗi xảy ra khi gửi tin nhắn:', error);
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
        console.log('Tin nhắn đã được xóa thành công');

    } catch (error) {
        console.error('Có lỗi xảy ra khi xóa:', error);
    }
}

function displayMessage(dataArray) {
    if (dataArray) {
        const messageList = document.getElementById('chats');
        messageList.innerHTML = ''; 

        dataArray.forEach(item => {
            const listItemChats = document.createElement('div');
            listItemChats.classList.add('flex', 'items-center', 'mb-4', 'cursor-pointer', 'hover:bg-gray-300', 'p-2', 'rounded-md', 'group');

            listItemChats.innerHTML = `
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                    <img
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
                    class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    src="../assets/icon/delete.svg"
                    alt="Xóa tin nhắn"
                    data-id="${item.id}"
                />
            `;

            listItemChats.querySelector('img[alt="Xóa tin nhắn"]').addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                deleteData(`http://192.168.1.3:8000/api/messages/${id}`);
                listItemChats.remove(); 
            });

            messageList.appendChild(listItemChats);
        });
    }
}

const chatForm = document.querySelector('#send-message');
const messageInput = chatForm.querySelector('input[type="text"]');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const messageContent = messageInput.value.trim();

    if (messageContent) {
        sendMessage("http://192.168.1.3:8000/api/messages", messageContent); 
        messageInput.value = '';
    }
});

const btnChats = document.querySelector('.btn-chat');
btnChats.addEventListener('click', () => {
    fetchData("http://192.168.1.3:8000/api/messages").then(displayMessage);
    document.getElementsByTagName('h1')[0].innerText = "CHATS";
    document.getElementById('chats').style.display = 'block';
    document.getElementById('groups').style.display = 'none';
});