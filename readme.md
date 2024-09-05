# POST 요청 사용하기

## 웹 브라우저의 한계

웹 브라우저에서는 POST 요청을 직접 테스트하기 어렵습니다. 이를 위해 특별한 도구가 필요합니다.

## POST 요청의 용도

POST 요청은 주로 다음과 같은 상황에서 사용됩니다:

- 회원가입 (예: ID, 비밀번호, 이름, 이메일, 연락처 전송)
- 민감한 정보 전송 (URL 쿼리스트링이나 경로 파라미터로 전송하기에 부적절한 경우)

POST 요청은 요청 본문(body)에 데이터를 담아 안전하게 전송할 수 있습니다.

## Postman 사용하기

Postman은 API 테스트를 위한 강력한 도구입니다. 웹 버전보다는 데스크톱 앱 사용을 권장합니다.

Postman의 장점:

- 다양한 HTTP 메서드 테스트 가능
- 직관적인 인터페이스로 요청 결과 즉시 확인 가능
- 웹 브라우저에서 테스트하기 어려운 POST 요청도 쉽게 테스트 가능

```jsx
// POST 요청 처리 예제 코드
app.post('/example', (req, res) => {
  const data = req.body;
  console.log(data);
  res.json(data);
});
```

주의: Postman에서 JSON 데이터 작성 시 반드시 큰따옴표(`"`)를 사용해야 합니다. 작은따옴표 사용 시 `undefined` 오류가 발생할 수 있습니다.

---

# 음식점 관리 API 구현하기

이번에는 음식점 정보를 관리하는 간단한 API를 Express.js를 사용하여 구현해보겠습니다. 이 API는 음식점 등록, 개별 조회, 전체 조회 기능을 제공합니다.

## 기본 설정

먼저 Express 앱을 설정하고 필요한 미들웨어를 추가합니다:

```jsx
const express = require('express');
const app = express();

app.listen(1111);

app.use(express.json());
```

## 초기 데이터

시작을 위해 몇 개의 음식점 데이터를 미리 설정합니다:

```jsx
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
```

## API 엔드포인트 구현

### 1. 음식점 등록 (POST /restaurants)

새로운 음식점을 등록하는 엔드포인트입니다:

```jsx
app.post('/restaurants', (req, res) => {
    const key = req.body.name;
    const restaurantInfo = req.body;
    db.set(key, restaurantInfo);
    res.send(`${key} 음식점이 성공적으로 등록되었습니다!`);
    console.log(db);
});
```

### 2. 개별 음식점 조회 (GET /restaurants/:id)

특정 음식점의 정보를 조회하는 엔드포인트입니다:

```jsx
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
```

### 3. 전체 음식점 조회 (GET /restaurants)

모든 음식점 정보를 조회하는 엔드포인트입니다:

```jsx
app.get('/restaurants', function (req, res) {
    const data = [...db].map((d) => d[1]);
    res.json(data);
});
```

## 테스트하기

이제 Postman을 사용하여 각 엔드포인트를 테스트해볼 수 있습니다:

1. POST /restaurants로 새 음식점 등록
2. GET /restaurants/:id로 특정 음식점 정보 조회
3. GET /restaurants로 모든 음식점 정보 조회