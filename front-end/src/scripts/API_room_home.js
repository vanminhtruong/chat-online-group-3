// // Giả lập dữ liệu nhóm (fake data)
// const fakeRoomData = [
//     { id: 1, name: 'Group 1' },
//     { id: 2, name: 'Group 2' },
//     { id: 3, name: 'Group 3' }
// ];

// // Hàm fetch giả lập để lấy dữ liệu nhóm
// async function fetchDataFake() {
//     try {
//         // Mô phỏng việc chờ lấy dữ liệu từ server
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 console.log('Đang lấy dữ liệu giả lập...');
//                 resolve(fakeRoomData);
//             }, 1000); // Giả lập thời gian chờ 1 giây
//         });
//     } catch (error) {
//         console.error('Có lỗi xảy ra:', error);
//     }
// }

// // Hàm delete giả lập để xóa dữ liệu nhóm
// async function deleteDataFake(id) {
//     try {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 // Xóa phần tử trong fakeRoomData dựa vào id
//                 const index = fakeRoomData.findIndex((item) => item.id === id);
//                 if (index !== -1) {
//                     fakeRoomData.splice(index, 1);
//                     console.log(`Đã xóa nhóm có ID: ${id}`);
//                 } else {
//                     console.log(`Không tìm thấy nhóm có ID: ${id}`);
//                 }
//                 resolve();
//             }, 1000); // Giả lập thời gian chờ 1 giây
//         });
//     } catch (error) {
//         console.error('Có lỗi xảy ra khi xóa:', error);
//     }
// }

// // Thay đổi hàm để sử dụng dữ liệu giả lập
// function displayGroupMessage(data) {
//     const roomList = document.getElementById('groups');
//     roomList.innerHTML = '';
//     if (data) {
//         data.forEach(item => {
//             const listItemRoom = document.createElement('div');
//             listItemRoom.classList.add('flex', 'items-center', 'mb-4', 'cursor-pointer', 'hover:bg-gray-300', 'p-2', 'rounded-md', 'group');

//             listItemRoom.innerHTML = `
//                 <div class="w-12 h-12 bg-gray-200 rounded-full mr-3">
//                     <div class="w-12 h-12 rounded-full text-center text-2xl font-bold text-white flex justify-center items-center">
//                         A
//                     </div>
//                 </div>
//                 <div class="flex-1">
//                     <h2 class="text-lg font-semibold">${item.name}</h2>
//                 </div>
//                 <img
//                     id="delete-room"
//                     class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
//                     src="../assets/icon/detele.svg"
//                     alt="Xóa tin nhắn"
//                     data-id="${item.id}"
//                 />
//             `;
//             if (window.innerWidth < 640) {
//                 listItemRoom.addEventListener('click', () => {
                    
//                     document.querySelector('#boxChat').style.display = 'block';
//                     document.querySelector('#listChat').style.display = 'none';
//                 });
//             }

//             const deleteButton = listItemRoom.querySelector('#delete-room');
//             deleteButton.addEventListener('click', (e) => {
//                 const isConfirmed = confirm('Bạn có chắc chắn muốn xóa phòng này không?');
//                 if (isConfirmed) {
//                     e.stopPropagation();
//                     const id = parseInt(e.target.getAttribute('data-id'), 10);
//                     deleteDataFake(id).then(() => {
//                         fetchDataFake().then(displayGroupMessage);
//                     });
//                 }
//             });

//             roomList.appendChild(listItemRoom);
//         });
//     }
// }

// const btnGroups = document.querySelector('.btn-group');
// btnGroups.addEventListener('click', () => {
//     const btnNewChatElement = document.querySelector('#btn-new-chat');
//     const btnNewChatsElement = document.querySelector('#btn-new-chats');
    
//     if (btnNewChatElement) {
//         btnNewChatElement.id = 'btn-new-groups';
//     }
//     else if(btnNewChatsElement){
//         btnNewChatsElement.id = 'btn-new-groups';
//     }
    
//     // Sử dụng fetch giả lập
//     fetchDataFake().then(displayGroupMessage);
//     document.getElementsByTagName('h1')[0].innerText = "GROUPS";
//     document.getElementById('chats').style.display = 'none';
//     document.getElementById('groups').style.display = 'block';
// });
