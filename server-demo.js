const express = require('express');
const app = express();
const port = 1234;

app.get('/2', (req, res) => {
  res.json({
    productName: 'Cup',
    price: 3000,
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
