const express = require('express');
const app = express();
app.listen(1234);

const fruits = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'strawberry' },
  { id: 4, name: 'blueberry' },
];

app.get('/fruits', (req, res) => {
  res.json(fruits);
});

app.get('/fruits/:id', (req, res) => {
  const id = req.params.id;
  const fruit = fruits.find((f) => f.id == id);

  if (fruit) {
    res.json(fruit);
  } else {
    res.status(404).json({ message: '전달주신 id로 저장된 과일이 없습니다' });
  }
});
