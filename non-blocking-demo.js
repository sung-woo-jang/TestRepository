const first = () => {
  console.log("첫 번째");
};

const second = () => {
  console.log("두 번째");
};
const third = () => {
  console.log("세 번째");
};

first();

// 2초 대기
setTimeout(second, 2000);

third();
