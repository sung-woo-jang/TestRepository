const express = require('express');
const app = express();
app.use(express.json());

// 임시 DB 데이터
const db = new Map([
  [
    '랄로',
    {
      channelTitle: '랄로',
      sub: '126만명',
      videoNum: '529개',
    },
  ],
  [
    '사코팍',
    {
      channelTitle: '사우스 코리안 파크 South Korean Park',
      sub: '148만명',
      videoNum: '197개',
    },
  ],
  [
    '슈카',
    {
      channelTitle: '슈카월드',
      sub: '336만명',
      videoNum: '1700개',
    },
  ],
]);

// 전체조회
app.get('/youtubers', (req, res) => {
  res.json(Object.fromEntries(db));
});

// 개별조회
app.get('/youtubers/:id', (req, res) => {
  const { id } = req.params;
  const youtuber = db.get(id);
  if (youtuber) {
    res.json(youtuber);
  } else {
    res.status(404).json({ message: `${id} 채널을 찾을 수 없습니다.` });
  }
});

// 개별삭제
app.delete('/youtubers/:id', (req, res) => {
  const { id } = req.params;
  const idCheck = db.delete(id);
  if (idCheck) {
    res.json({ message: `${id} 계정이 삭제되었습니다.` });
  } else {
    res.status(404).json({ message: `${id} 계정이 존재하지 않습니다.` });
  }
});

// 전체삭제
app.delete('/youtubers', (req, res) => {
  const size = db.size;
  if (size > 0) {
    db.clear();
    res.json({ message: '모든 계정이 삭제되었습니다.' });
  } else {
    res.json({ message: '삭제할 계정이 없습니다.' });
  }
});

// 개별수정
app.put('/youtubers/:id', (req, res) => {
  const { id } = req.params;
  const { channelTitle, sub, videoNum } = req.body;
  if (db.has(id)) {
    const updatedData = { ...db.get(id), channelTitle, sub, videoNum };
    db.delete(id);
    db.set(channelTitle, updatedData);
    res.json({
      message: `${id} 계정이 ${channelTitle}로 변경되었습니다.`,
      data: updatedData,
    });
  } else {
    res
      .status(404)
      .json({ message: '변경할 유튜버의 계정이 존재하지 않습니다.' });
  }
});

// 새 유튜버 추가
app.post('/youtubers', (req, res) => {
  const { channelTitle, sub, videoNum } = req.body;
  if (db.has(channelTitle)) {
    res.status(400).json({ message: '이미 존재하는 채널입니다.' });
  } else {
    db.set(channelTitle, { channelTitle, sub, videoNum });
    res.status(201).json({
      message: '새 유튜버가 추가되었습니다.',
      data: { channelTitle, sub, videoNum },
    });
  }
});

const PORT = 1111;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
