const db = require("../db/queries");

async function getIndex(req, res) {
  const search = req.query.search;

  const messages = search
    ? await db.searchMessages(search)
    : await db.getAllMessages();

  res.render("index", {
    title: "Mini Message Board",
    messages,
    search,
  });
}

function getNewMessage(req, res) {
  res.render("form", {
    title: "New Message",
  });
}

async function createMessage(req, res) {
  const { messageUser, messageText } = req.body;

  const username = messageUser.trim();
  const text = messageText.trim();

  if (!username || !text) {
    return res.status(400).send("Name and message are required.");
  }

  if (username.length > 100) {
    return res.status(400).send("Name is too long.");
  }

  if (text.length > 1000) {
    return res.status(400).send("Message is too long.");
  }

  await db.insertMessage(username, text);

  res.redirect("/");
}

async function getMessage(req, res) {
  const messageId = Number(req.params.messageId);

  if (!Number.isInteger(messageId) || messageId < 1) {
    return res.status(400).send("Invalid message ID.");
  }

  const message = await db.getMessageById(messageId);

  if (!message) {
    return res.status(404).send("Message not found.");
  }

  res.render("message", {
    title: "Message Details",
    message,
  });
}

async function deleteMessages(req, res) {
  await db.deleteAllMessages();

  res.redirect("/");
}

module.exports = {
  getIndex,
  getNewMessage,
  createMessage,
  getMessage,
  deleteMessages,
};
