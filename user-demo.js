const express = require('express');
const app = express();
app.use(express.json());
app.listen(7777);

const db = new Map();
let id = 1;

// 로그인
app.post('/login', (req, res) => {});

// 회원가입
app.post('/join', (req, res) => {
  if (req.body?.name) {
    db.set(id++, req.body);

    res.json({
      message: `${req.body.name}님 환영합니다.`,
    });
  } else {
    res.status(400).json({
      message: '입력 값을 확인해주세요.',
    });
  }
});

app
  .route('/users/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);

    if (!user) {
      res.status(404).json({ message: '유저 정보를 찾을 수 없습니다.' });
    }

    res.json({ userId: user.userId, name: user.name });
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get(id);

    if (!user) {
      res.status(404).json({ message: '유저 정보를 찾을 수 없습니다.' });
    }

    db.delete(id);

    res.json({ message: `${user.name}님 다음에 또 뵙겠습니다` });
  });
