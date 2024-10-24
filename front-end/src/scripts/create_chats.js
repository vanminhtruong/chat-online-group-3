document.querySelector('#btn-new-chat').addEventListener('click', function() {
    document.getElementById('createRoomForm').classList.toggle('hidden');
});

document.getElementById('submitRoom').addEventListener('click', function() {
    const roomName = document.getElementById('roomName').value;
    const selectedUsers = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    console.log('Tên phòng:', roomName);
    console.log('Người tham gia:', selectedUsers);

});