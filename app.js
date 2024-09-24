const express = require("express");
const route = express.Router();
const app = express();
const channelRouter = require("./routes/channels");
const userRouter = require("./routes/users");

app.use(express.json());

app.use("/", userRouter);
app.use("/channels", channelRouter);

app.listen(7777);
