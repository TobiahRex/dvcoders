/**
 * Called randomly to verify number is prime.
 *
 * @param {integer}
 * @return {boolean}
 */
const isPrime = n => {
  // n = 3
  if (n == 2) {
    return true;
  }

  let result = null;
  if (!!n) {
    for (let i = 2; i < n; i++) {
      if (i !== n) {
        if (n % i === 0) {
          result = false;
          break;
        } else {
          result = true;
        }
      }
    }
  }
  return result;
};

const partition = (list, split, memo) => {
  // console.log("----------------------------------------");
  // console.log("split: ", split);
  // If the current list is too short - return early.
  if (list.length < 2 || split < 0) {
    return;
  }

  // Generate sum for current lists.
  let sum = list.reduce((a, b) => a + b);

  // Verify sum prime and its respective list is the longest saved.
  if (isPrime(sum)) {
    if (!(sum in memo)) {
      memo[sum] = list;
    } else {
      if (list.length > memo[sum].length) {
        memo[sum] = list;
      }
    }
  }
  // create new lists based on current split point.
  let loList = list.slice(0, split);
  let hiList = list.slice(split);

  // recursively call with new lists and new split points.
  if (split !== list.length) {
    partition(loList, split - 1, memo);
    partition(hiList, split + 1, memo);
  }
};
const memo = {};

/*
  {
    [split]: {
      sum: [array of numbers],
      sum: [array of numbers],
    }
  }
*/
const list = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97
];
for (let i = 0; i < list.length; i++) {
  partition(list, i, memo);
}

console.log("FINAL memo: \n", memo);
console.log("Total Combos: ", Object.keys(memo).length);
// console.log("FINAL memo: \n", JSON.stringify(memo, null, 2));
