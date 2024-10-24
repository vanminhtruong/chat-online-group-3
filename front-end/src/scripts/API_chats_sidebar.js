async function fetchUsers() {
    try {
        const response = await fetch('http://192.168.1.3:8000/api/getUsers');
        if (!response.ok) {
            throw new Error(`Failed to fetch users! Status: ${response.status}`);
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu người dùng:', error);
    }
}

function displayUsers(users) {
    const chatsDiv = document.getElementById('chats');
    chatsDiv.innerHTML = ''; 

    const usersArray = Array.isArray(users) ? users : [users];
    usersArray.forEach(user => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item mb-3 p-2 border-b'; 
        chatItem.id = `receiver-${user.id}`; 
        chatItem.innerHTML = `
            <strong>${user.username}</strong>: <span class="message-content">content message here</span>
        `;

        chatsDiv.appendChild(chatItem);
    });
}

fetchUsers();