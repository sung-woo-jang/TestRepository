# YouTube 데이터 관리 API 개선 프로젝트

최근 우리 팀은 YouTube 채널 데이터를 관리하는 API를 개선하는 작업을 진행했습니다. 주요 변경사항과 학습 내용을 공유하고자 합니다.

## 전체 조회 기능 개선

기존에는 배열 형태로 데이터를 반환했지만, 객체 형태로 변경하여 클라이언트 측에서 더 쉽게 데이터를 활용할 수 있도록 했습니다.

```jsx
// 전체조회
app.get('/youtubers', (req, res) => {
	const youtubers = {};
	[...db].map((d) => {
		youtubers[d[0]] = d[1];
	});
	
	res.json(youtubers);
});
```

---

또한, `Object.fromEntries()`를 사용하면 코드를 더욱 간결하게 만들 수 있다는 점도 알게 되었습니다:

```jsx
// 전체조회
app.get('/youtubers', (req, res) => {
	res.json(Object.fromEntries(db));
});
```

![스크린샷 2024-09-06 오후 1.41.30.png](https://private-user-images.githubusercontent.com/54757435/365045675-f61eaf0b-8d80-4883-ab6a-50c8223c844e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjU2MDEyNjYsIm5iZiI6MTcyNTYwMDk2NiwicGF0aCI6Ii81NDc1NzQzNS8zNjUwNDU2NzUtZjYxZWFmMGItOGQ4MC00ODgzLWFiNmEtNTBjODIyM2M4NDRlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTA2VDA1MzYwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTIwNmRjYjgwMjBkNTUzY2IzNzI2YTBhNDc2ZGYyNjYzOWRlYjg4OGRiNGM2Mzg1NzhjYTQzMDQ4NGJkMGJlN2EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.L-_ZxUIqgip2pdWH6RMpgWT2psxZR2Da60IuZUA13P4)

객체 안에 key:{} 형식으로 잘 들어오는 것이 확인된다.

## forEach와 map의 차이점 이해

프로젝트를 진행하면서 `forEach`와 `map`의 차이점에 대해 깊이 이해하게 되었습니다. 주요 차이점은 다음과 같습니다:

- `forEach`: 반환값이 없으며, 기존 배열을 수정하지 않습니다.

    ```jsx
    /**
     * 배열
     */
    const arr = [1, 2, 3, 4, 5];
    
    // 콜백함수가 하는 일
    // 객체 (또는 배열)에서 요소를 하나 꺼낸 다음 콜백을 호출하는 고차함수
    arr.forEach((a, b, c) => {
      //
      // console.log(`a: ${a}, b: ${b}, c: ${c}`);
    });
    
    // Map과 forEach의 만남
    const map = new Map();
    map.set(7, 'seven');
    map.set(9, 'nine');
    map.set(8, 'eight');
    
    map.forEach((a, b, c) => {
      console.log(`a: ${a}, b: ${b}, c: ${c}`);
    });
    
    ```

  ![스크린샷 2024-09-06 오후 1.42.29.png](https://private-user-images.githubusercontent.com/54757435/365046184-957d1f09-ff88-4eec-a4a2-ca08b26ca422.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjU2MDE0MzgsIm5iZiI6MTcyNTYwMTEzOCwicGF0aCI6Ii81NDc1NzQzNS8zNjUwNDYxODQtOTU3ZDFmMDktZmY4OC00ZWVjLWE0YTItY2EwOGIyNmNhNDIyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTA2VDA1Mzg1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTYxZTU2ODdjOTk2Zjk0YjljM2MxYTIwOWNjYTY2NzYxNDgwZTk2OTgzNjBlNmE4MGVjN2I0YjY1YWM2OGViZTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.e8foO-nyWkxl0bKZf_vYT616Q6LEYcvdj_TIXF4v5QA)

- `map`: 새로운 배열을 반환하며, 기존 배열은 변경되지 않습니다.

    ```jsx
    /**
     * map 함수(메서드) vs forEach 차이
     */
    const arr = [1, 2, 3, 4, 5];
    
    // 콜백함수가 하는 일
    // 객체 (또는 배열)에서 요소를 하나 꺼낸 다음 콜백을 호출하는 콜백함수
    const forEachArr = arr.forEach((a, b, c) => {
      return a * 2;
    });
    
    console.log(arr); // [ 1, 2, 3, 4, 5 ]
    
    const mapArr = arr.map((a, b, c) => {
      return a * 2;
    });
    
    console.log(arr); // [ 1, 2, 3, 4, 5 ]
    
    console.log('forEach return: ', forEachArr); // undefined
    console.log('map return: ', mapArr); // [ 2, 4, 6, 8, 10 ]
    ```


## 삭제 기능 구현

개별 삭제와 전체 삭제 기능을 구현했습니다. 특히 예외 처리를 통해 사용자 경험을 개선했습니다.

개별 삭제 예시:

```jsx
// 개별삭제
app.delete('/youtubers/:id', (req, res) => {
  const { id } = req.params;
  const idCheck = db.delete(id);
  if (!idCheck) {
    res.json({
      message: `${id}번 계정이 존재하지 않습니다.`,
    });
  } else {
    res.json({
      message: `${id}번 계정이 삭제되었습니다.`,
    });
  }
});
```

![스크린샷 2024-09-06 오후 1.46.30.png](https://private-user-images.githubusercontent.com/54757435/365046418-309f61eb-e5fe-44a8-9a3c-98eff969c576.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjU2MDE1MDQsIm5iZiI6MTcyNTYwMTIwNCwicGF0aCI6Ii81NDc1NzQzNS8zNjUwNDY0MTgtMzA5ZjYxZWItZTVmZS00NGE4LTlhM2MtOThlZmY5NjljNTc2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTA2VDA1NDAwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA2MmFjYWE2ZjEwYTI0MDZhMmJkNGU0MjgyZjZhMDlkYjEzYTU3YWRhNDFlYzNlZDJmODVhYjBkMWM2YjYxMWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0._bULm5QxyI0tRM1ygObnSRpVH4WwTmltxkzkutr8btU)

---

# 리팩토링: 코드 품질 향상의 핵심

리팩토링은 소프트웨어 개발에서 매우 중요한 과정입니다. 이는 기존 코드의 내부 구조를 개선하면서도 외부 동작은 변경하지 않는 기술입니다.

## 리팩토링의 주요 목표

1. **가독성 향상**: 코드를 더 이해하기 쉽게 만듭니다.
2. **성능 개선**: 실행 속도와 리소스 사용을 최적화합니다.
3. **안정성 강화**: 버그를 줄이고 예외 상황에 더 잘 대처하게 합니다.

이 세 가지 목표가 모두 달성되면, 우리는 그것을 "클린 코드"라고 부릅니다. 클린 코드는 모든 개발자가 추구해야 할 이상적인 상태입니다.

## 리팩토링이 필요한 시점

1. **반복적인 에러 발생**: 같은 문제가 여러 번 나타날 때
2. **새로운 기능 추가 전**: 기존 코드베이스를 정리하여 새 기능 통합을 용이하게 함
3. **코드 리뷰 과정에서**: 팀원들의 피드백을 바탕으로 개선할 때
4. **리팩토링 중 새로운 문제 발견 시**: 한 문제를 해결하다 다른 문제를 발견할 수 있음

## 주의사항

❗ **중요**: 배포나 운영 직전에는 리팩토링을 피해야 합니다. 이 시기의 코드 변경은 예상치 못한 문제를 일으킬 수 있으며, 시스템 안정성에 위험을 초래할 수 있습니다.

리팩토링은 지속적인 과정이며, 코드 품질 유지를 위한 핵심 실천사항입니다. 적절한 시기에 수행된 리팩토링은 프로젝트의 장기적인 성공과 유지보수성을 크게 향상시킬 수 있습니다.

---

### 전체삭제 기능 구현

clear() 함수를 이용하여 전체삭제를 해줬다.

db.size로 0보다 크면 삭제, 아니라면 삭제할 계정이 없다고 예외처리를 해주었다❗

```jsx
// 전체삭제
app.delete('/youtubers', (req, res) => {
  const size = db.size;
  if (size > 0) {
    db.clear();
    res.json({
      message: '모든 계정이 삭제되었습니다.',
    });
  } else {
    res.json({
      message: '삭제할 계정이 없습니다.',
    });
  }
});
```

clear()함수를 사용 후 console.log(db)로 찍었을때 Map(0) {}으로 빈 map으로 나온다.

---

![스크린샷 2024-09-06 오후 1.48.07.png](https://private-user-images.githubusercontent.com/54757435/365046585-858ccdcd-f3ef-4d9a-bb45-7c7c2fcb4741.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjU2MDE1NjAsIm5iZiI6MTcyNTYwMTI2MCwicGF0aCI6Ii81NDc1NzQzNS8zNjUwNDY1ODUtODU4Y2NkY2QtZjNlZi00ZDlhLWJiNDUtN2M3YzJmY2I0NzQxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTA2VDA1NDEwMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTYyNmI2ZTQwYzRjMDM4NGQzM2MwNzU2NzJhMWIzZmU2MGUzZGYxY2RjMzRiZjVkNDM1MzNhODc5Mjk4MzhlNWMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.bavl_hwIJG3Xaa2lz4-6M1emXhzZym_MMgYzwgsM_Lg)

---

```jsx
// 전체삭제
app.delete('/youtubers', (req, res) => {
  const size = db.size;
  let msg;
  if (size > 0) {
    db.clear();
    msg = '모든 계정이 삭제되었습니다.';
  } else {
    msg = '삭제할 계정이 없습니다.';
  }
  res.json({
    message: msg,
  });
});
```

---

## 수정 기능 구현

채널 정보 수정 기능을 구현하면서 Map 객체의 특성을 고려해야 했습니다. 키 값 변경의 제한으로 인해 삭제 후 재추가 방식을 사용했습니다.

```jsx
// 개별수정
app.put('/youtubers/:id', (req, res) => {
  const { id } = req.params;
  let message;
  [...db].map((data) => {
    if (data[0] === id) {
      const { channelTitle } = req.body;
      db.set(channelTitle, { ...data[1], channelTitle });
      msg = `${id}번의 계정이 ${channelTitle}로 변경되었습니다.`;
      db.delete(id);
    } else {
      msg = `변경할 유튜버의 계정이 존재하지 않습니다.`;
    }
  });
  console.log(db);
  
  res.json({ message });
});
```

---

![스크린샷 2024-09-06 오후 2.10.57.png](https://github.com/user-attachments/assets/e4cd6e78-bb7b-4647-a942-705e489c814e)

랄로의 key와 channelTitle이 로랄으로 들어온다

---

HTTP 상태코드

- 200: 조회/수정/삭제성공
- 201: 등록 성공
- 404: 찾는 페이지(리소스) 없음(url에 맞는 api 없음)
- 500: 서버가 죽었을 때(서버가 크리티컬한 오류를 맞았을 때)