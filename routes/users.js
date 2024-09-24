const express = require("express");
const route = express.Router();
const conn = require("../db-demo");

// 로그인
route.post("/login", (req, res) => {
  const { email, password } = req.body;
  let loginUser = {};

  const sql = "SELECT * FROM users WHERE email = ?";
  conn.query(sql, email, (_, result) => {
    if (result.length < 1) {
      res.status(404).json({ message: "회원정보가 없습니다." });
    }
    loginUser = result[0];

    if (loginUser.password !== password) {
      res.status(400).json({ message: "비밀번호가 틀렸습니다" });
    }

    res.status(200).json({ message: `${loginUser.name}님 로그인 되었습니다` });
  });
});

// 회원가입
route.post("/join", (req, res) => {
  const { email, name, password, contact } = req.body;

  const sql =
    "INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)";
  conn.query(sql, [email, name, password, contact], (err, result, fields) => {
    res.status(201).json(result);
  });
});

route
  .route("/users")
  .get((req, res) => {
    const { email } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email, (err, result, fields) => {
      if (result.length < 1) {
        res.status(404).json({ message: "회원 정보를 찾을 수 없습니다." });
      }

      res.json(result);
    });
  })
  .delete((req, res) => {
    const { email } = req.body;

    const sql = "DELETE FROM users WHERE email = ?";
    conn.query(sql, email, (_, result) => {
      res.status(200).json(result);
    });
  });

module.exports = route;
