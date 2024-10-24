
// DTO
const fakeRoomData = {
  1: {
    data: [
      {
        id: 1,
        name: "Room 1",
        create_at: "2024-10-01 10:00:00",
      },
    ],
  },
  2: {
    data: [
      {
        id: 2,
        name: "Room 2",
        create_at: "2024-10-01 10:00:00",
      },
    ],
  },
  3: {
    data: [
      {
        id: 3,
        name: "Room 3",
        create_at: "2024-10-01 10:00:00",
      },
    ],
  },
};

const fakeMessagesByRoom = {
  1: {
    data: [
      {
        id: 1,
        user_id: "1",
        room_id: 1,
        content: "Welcome to Room 1!",
        create_at: "2024-10-01 10:05:00",
      },
      {
        id: 2,
        user_id: "2",
        room_id: 1,
        content: "Room 1 discussion ongoing.",
        create_at: "2024-10-01 10:15:00",
      },
    ],
  },
  2: {
    data: [
      {
        id: 3,
        user_id: "3",
        room_id: 2,
        content: "Welcome to Room 2!",
        create_at: "2024-10-05 14:35:00",
      },
      {
        id: 4,
        user_id: "4",
        room_id: 2,
        content: "Room 2 has a different topic.",
        create_at: "2024-10-05 14:40:00",
      },
    ],
  },
  3: {
    data: [
      {
        id: 5,
        user_id: "5",
        room_id: 3,
        content: "This is Room 3, feel free to join!",
        create_at: "2024-10-10 09:20:00",
      },
      {
        id: 6,
        user_id: "6",
        room_id: 3,
        content: "Room 3 is about coding!",
        create_at: "2024-10-10 09:30:00",
      },
    ],
  },
};
////////////////////////////
async function fetchAllRoom() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const allRoom = Object.values(fakeRoomData).flatMap((room) => room.data);
    const data = { data: allRoom };
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching room data:", error);
    return { data: [] };
  }
}
////////////////////////////////////////
async function fetchMessagesByRoom(idRoom) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = fakeMessagesByRoom[idRoom] || { data: [] };
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching messages by room:", error);
    return { data: [] };
  }
}
////////////////////////////////////////
async function deleteData(urlDelete) {
  try {
    console.log(`Pretending to delete item at: ${urlDelete}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Deleted successfully (fake response)");
  } catch (error) {
    console.error("Error deleting:", error);
  }
}
////////////////////////////////////////////////////////////////
function displayMessage(result) {
  const messageList = document.getElementById("chats");
  messageList.innerHTML = "";

  const data = result.data;

  if (data) {
    data.forEach((item) => {
      const listItemChats = document.createElement("div");
      listItemChats.classList.add(
        "flex",
        "items-center",
        "mb-4",
        "cursor-pointer",
        "hover:bg-gray-300",
        "p-2",
        "rounded-md",
        "group"
      );
      listItemChats.innerHTML = `
        <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=User&font=Lato"
            alt="User Avatar"
            class="w-12 h-12 rounded-full"
          />
        </div>
        <div class="flex-1">
          <div>
            <h2 class="text-lg font-semibold">${
              item.name || ""
            }</h2>
            <span class="text-sm text-gray-500">${item.create_at}</span>
          </div>
        </div>
        <img
          id="delete-chat"
          class="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          src="../assets/icon/detele.svg"
          alt="Delete Message"
          data-id="${item.id}"
        />
      `;

      listItemChats.addEventListener("click", () => {
        currentRoomId.value = item.id;
        fetchMessagesByRoom(item.id).then(displayMessagesInRoom);

        document.querySelector("#notification-chat").style.display = "none";
        document.querySelector("#form-chat").style.display = "block";
        if (window.innerWidth < 640) {
          document.querySelector("#boxChat").style.display = "block";
          document.querySelector("#listChat").style.display = "none";
        }
      });

      const deleteButton = listItemChats.querySelector("#delete-chat");
      deleteButton.addEventListener("click", (e) => {
        const isConfirmed = confirm(
          "Are you sure you want to delete this message?"
        );
        if (isConfirmed) {
          e.stopPropagation();
          const id = e.target.getAttribute("data-id");
          deleteData(`http://127.0.0.1:8000/api/messages/${id}`).then(() => {
            fetchMessagesByRoom(item.room_id).then(displayMessage);
          });
        }
      });

      messageList.appendChild(listItemChats);
    });
  }
}
function displayMessagesInRoom(result) {
  const messageContainer = document.querySelector("#boxChat .flex-1");
  messageContainer.innerHTML = "";
  const data = result.data;

  if (data) {
    data.forEach((item) => {
      const messageElement = document.createElement("div");
      const isSender = item.user_id === "1";

      if (isSender) {
        messageElement.classList.add(
          "flex",
          "justify-end",
          "mb-4",
          "cursor-pointer"
        );
        messageElement.innerHTML = `
          <div class="flex max-w-xs sm:max-w-sm lg:max-w-md bg-indigo-500 text-white rounded-lg p-3">
            <p class="text-send">${item.content || ""}</p>
          </div>
          <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              class="w-8 h-8 rounded-full"
            />
          </div>
        `;
      } else {
        messageElement.classList.add("flex", "mb-4", "cursor-pointer");
        messageElement.innerHTML = `
          <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              class="w-8 h-8 rounded-full"
            />
          </div>
          <div class="flex max-w-xs sm:max-w-sm lg:max-w-md bg-gray-100 rounded-lg p-3">
            <p class="text-receiver">${item.content || ""}</p>
          </div>
        `;
      }
      messageContainer.appendChild(messageElement);
    });
  }
}
///////////////////////////////////////////
async function sendMessageToRoom(content, roomId) {
  try {
   
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newMessage = {
      id: Date.now(), 
      user_id: "1", 
      room_id: roomId,
      content: content,
      create_at: new Date().toISOString(), 
    };

    if (!fakeMessagesByRoom[roomId]) {
      fakeMessagesByRoom[roomId] = { data: [] };
    }
    fakeMessagesByRoom[roomId].data.push(newMessage);

   
    fetchMessagesByRoom(roomId).then(displayMessagesInRoom);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}


const currentRoomId = { value: null }; 

document.getElementById("sendMessageButton").addEventListener("click", () => {
  const inputMessage = document.getElementById("inputMessage").value;
  if (inputMessage && currentRoomId.value) {
    sendMessageToRoom(inputMessage, currentRoomId.value);
    document.getElementById("inputMessage").value = ""; 
  } else {
    alert("Please enter a message and select a room.");
  }
});


async function initializeChat() {
  const rooms = await fetchAllRoom();
  displayMessage(rooms);
}

initializeChat();
