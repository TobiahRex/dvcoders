const partition = (list, split, memo) => {
  if (list.length < 2) {
    return memo;
  }
  let loList = list.slice(0, split - 1),
    hiList = list.slice(split + 1);

  if (loList.length > 1) {
    let loSum = loList.reduce((a, b) => a + b, 0);

    if (!(loSum in memo) && loList.length > 1) {
      memo[loSum] = loList;
      partition(loList, split, memo);
    }
  }

  if (hiList.length > 1) {
    let hiSum = hiList.reduce((a, b) => a + b, 0);

    if (!(hiSum in memo) && hiList.length > 1) {
      memo[hiSum] = hiList;
      partition(hiList, split++, memo);
    }
  }

  return;
};
const memo = {};

/*
  {
    [sum of array]: [array of numbers]
  }
*/
const list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
partition(list, 0, memo);
console.log("FINAL memo: \n", memo);
// console.log("FINAL memo: \n", JSON.stringify(memo, null, 2));
