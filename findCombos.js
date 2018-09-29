const partition = (list, split, memo) => {
  console.log("split: ", split, "list: ", list);
  // If the current list is too short - return early.
  if (list.length < 2 || split < 0) {
    return;
  }

  // Generate sums for current lists.
  let sum = list.reduce((a, b) => a + b, 0);

  // Verify sum of LIST doesn't already exist inside memo.
  if (!(sum in memo)) {
    memo[sum] = list;
    // if it does exist and the current list is longer - then replace the sum.
  } else if (list.length > memo[sum].length) {
    memo[sum] = list;
  }

  // create new lists based on current split point.
  let loList = list.slice(0, split--),
    hiList = list.slice(split++);

  // recursively call with new lists and new split points.
  if (split !== list.length) {
    partition(loList, split--, memo);
    partition(hiList, split++, memo);
  } else {
    return memo;
  }
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
