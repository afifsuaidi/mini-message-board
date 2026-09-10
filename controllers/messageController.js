const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

function getIndex(req, res) {
  res.render("index", {
    title: "Mini Message Board",
    messages,
  });
}

function getNewMessage(req, res) {
  res.render("form", {
    title: "New Message",
  });
}

function createMessage(req, res) {
  const { messageUser, messageText } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
}

function getMessage(req, res) {
  const messageId = Number(req.params.messageId);
  const message = messages[messageId];

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", {
    title: "Message Details",
    message,
  });
}

module.exports = {
  getIndex,
  getNewMessage,
  createMessage,
  getMessage,
};
