const { Router } = require("express");

const {
  getIndex,
  getNewMessage,
  createMessage,
  getMessage,
  deleteMessages,
} = require("../controllers/messageController");

const indexRouter = Router();

indexRouter.get("/", getIndex);

indexRouter.get("/new", getNewMessage);

indexRouter.post("/new", createMessage);

indexRouter.get("/message/:messageId", getMessage);

indexRouter.get("/delete", deleteMessages);

module.exports = indexRouter;
