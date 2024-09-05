const express = require('express');
const app = express();

app.listen(1111);

const restaurant1 = {
    name: '맛있는 김밥',
    rating: '4.5',
    menuCount: '30개',
};

const restaurant2 = {
    name: '화덕 피자',
    rating: '4.2',
    menuCount: '15개',
};

const restaurant3 = {
    name: '착한 돈까스',
    rating: '4.0',
    menuCount: '25개',
};

const db = new Map();

db.set('맛있는 김밥', restaurant1);
db.set('화덕 피자', restaurant2);
db.set('착한 돈까스', restaurant3);

// 등록
app.use(express.json());
app.post('/restaurants', (req, res) => {
    const key = req.body.name;
    const restaurantInfo = req.body;
    db.set(key, restaurantInfo);
    res.send(`${key} 음식점이 성공적으로 등록되었습니다!`);
    console.log(db);
});

// 개별조회
app.get('/restaurants/:id', function (req, res) {
    let { id } = req.params;

    const idInfo = db.get(id);
    if (idInfo === undefined) {
        res.json({ message: '해당 음식점을 찾을 수 없습니다.' });
    } else {
        res.json({
            ...idInfo,
        });
    }
});

// 전체조회
app.get('/restaurants', function (req, res) {
    const data = [...db].map((d) => d[1]);
    res.json(data);
});