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

const partition = (limit, list, begin, end, memo) => {
  // console.log("----------------------------------------");
  // console.log("split: ", split);

  // create new list for this invocation.
  let newList = list.slice(begin, end);
  let sum = newList.reduce((a, b) => a + b);
  // If the current list is too short - return early.

  if (newList.length < 2 || sum in memo) {
    return;
  }

  // Generate sum for current lists.

  // Verify sum is prime and its respective list is the longest saved.
  if (sum < limit) {
    if (!(sum in memo)) {
      memo[sum] = newList;
    } else {
      if (newList.length > memo[sum].length) {
        memo[sum] = newList;
      }
    }
  }
  // recursively call with new lists and new split points.

  partition(limit, list, begin, end - 1, memo);
  partition(limit, list, begin + 1, end, memo);
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
  89
  // 97
];
for (let i = 0; i < list.length; i++) {
  partition(1000, list, 0, list.length, memo);
}

// console.log("FINAL memo: \n", memo);
console.log("Total Combos: ", Object.keys(memo).length);
// console.log("FINAL memo: \n", JSON.stringify(memo, null, 2));
