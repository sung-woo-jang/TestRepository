const express = require("express");
const route = express.Router();
const conn = require("../db-demo");

const db = new Map();
let id = 1;

const notFoundChannel = (res) => {
  res.status(404).json({ message: "채널 정보를 찾을 수 없습니다" });
};

route
  .route("/")
  .get((req, res) => {
    const { userId } = req.body;
    if (!userId) {
      notFoundChannel(res);
    }

    const sql = "SELECT * FROM channels WHERE user_id = ?";
    conn.query(sql, userId, (_, result) => {
      if (result.length < 1) {
        notFoundChannel(res);
      }

      res.status(200).json(result);
    });
  })
  .post((req, res) => {
    const { name, userId } = req.body;
    if (!name || !userId) {
      res.status(400).json({ message: "요청 값을 제대로 보내주세요." });
    }

    const sql = "INSERT INTO channels (name, user_id) VALUES (?, ?)";
    const value = [name, userId];
    conn.query(sql, value, (err, result, fields) => {
      res.status(201).json(result);
    });
  });

route
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const sql = "SELECT * FROM channels WHERE id = ?";
    conn.query(sql, id, (_, result) => {
      if (result.length < 1) {
        notFoundChannel(res);
      }

      res.status(200).json(result);
    });
  })
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);
    const oldTitle = channel.channelTitle;

    if (!channel) {
      notFoundChannel(res);
    }

    const newTitle = req.body.channelTitle;
    channel.channelTitle = newTitle;
    db.set(id, channel);

    res.status(200).json({
      message: `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}`,
    });
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const channel = db.get(id);

    if (!channel) {
      notFoundChannel(res);
    }

    db.delete(id);
    res
      .status(200)
      .json({ message: `${channel.channelTitle}이 정상적으로 삭제되었습니다` });
  });

module.exports = route;
