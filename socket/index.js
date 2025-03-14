import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();


const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
  },
});


let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser);
    
  });

  socket.on("sendMessage", ({ receiverId, data }) => {



    const receiver = getUser(receiverId);
    
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log(`User with ID ${receiverId} is not online`);
    }
  });
  

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");