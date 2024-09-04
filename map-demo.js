let db = new Map(); //데이터베이스 대신 map 사용

let notebook = {
  productName: 'Notebook',
  price: 2000000,
};

let cup = {
  productName: 'Cup',
  price: 3000,
};

let chair = {
  productName: 'Chair',
  price: 100000,
};

let poster = {
  productName: 'Poster',
  price: 20000,
};
db.set(1, notebook); //키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);

console.log(db);
console.log(db.get(1)); // Notebook 출력
console.log(db.get(2)); // Cup 출력
console.log(db.get(3)); // Chair 출력
