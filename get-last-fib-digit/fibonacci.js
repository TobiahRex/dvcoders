const main = (num1, num2, length) => {
  let n1 = num1,
    n2 = num2,
    sum = 0;

  for (let i = length; i > 0; i--) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }

  let stringSum = sum.toString();
  console.log(stringSum[stringSum.length - 1]);
  // 1, 3, 5, 8, 13, 21, 34, 55, 89, 144
};

main(1, 1, 10);
