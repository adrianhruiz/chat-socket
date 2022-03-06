const socket = io();

let DOM = {
  message: document.querySelector(".message"),
  username: document.querySelector(".username"),
  send: document.querySelector(".send"),
  output: document.querySelector(".output"),
  actions: document.querySelector(".actions"),
};

DOM.send.addEventListener("click", () => {
  const chatMessage = {
    username: DOM.username.value,
    message: DOM.message.value,
  };
  DOM.message.value = "";

  if (chatMessage.username != "" && chatMessage.message != "") {
    socket.emit("chatMessage", chatMessage);

    const totalMessages = document.querySelectorAll(".output p").length;

    if (totalMessages >= 5) {
      const firstMessage = document.querySelector(".output > p:first-child");
      const firstHr = document.querySelector(".output hr");

      firstMessage.remove();
      firstHr.remove();
    }
  }
});

DOM.message.addEventListener("keypress", () => {
  socket.emit("chatTyping", DOM.username.value);
});

socket.on("chatMessage", (data) => {
  DOM.output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p><hr>`;
});

socket.on("chatTyping", (data) => {
  DOM.actions.innerHTML = `${data} is typing...`;
  setTimeout(() => {
    DOM.actions.innerHTML = "";
  }, 3000);
});
