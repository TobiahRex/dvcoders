/*
CHALLENGE DESCRIPTION:
----------------------------
The prime 41, can be written as the sum of six consecutive primes:

41 = 2 + 3 + 5 + 7 + 11 + 13
This is the longest sum of consecutive primes that adds to a prime below one-hundred.

The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

Which prime, below one-million, can be written as the sum of the most consecutive primes?
*/

/**
 * Called randomly to verify argument is prime.
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

/**
 * Called randomly.
 * Generates new prime number, based off argument as last prime number found.
 *
 * @param {integer}
 * @return {integer}
 */
const getNextPrime = lastPrime => {
  let newPrime = 0;
  let keepLooking = true;

  for (let i = lastPrime + 1; keepLooking === true; i++) {
    if (isPrime(i)) {
      keepLooking = false;
      newPrime = i;
    }
  }
  return newPrime;
};

/**
 * Called recursively
 * Recursively iterates over different portions of a dynamically sized list using a "partition" logic.
 * Saves only unique sums into a referenced memo.
 *
 * @param {integer, array, integer, object}
 * @return {null}
 */
const getAnswerForList = (limit, list, split, memo) => {
  if (list.length < 2 || split < 0) {
    return;
  }

  let sum = list.reduce((a, b) => a + b);

  if (isPrime(sum) && sum < limit) {
    if (!(sum in memo)) {
      memo[sum] = list;
    } else {
      if (list.length > memo[sum].length) {
        memo[sum] = list;
      }
    }
  }

  let loList = list.slice(0, split - 1);
  let hiList = list.slice(split + 1);

  if (split !== list.length) {
    getAnswerForList(limit, loList, split - 1, memo);
    getAnswerForList(limit, hiList, split + 1, memo);
  }
};

/**
 * Begins control flow.
 * 1) Generates list of prime numbers until a possible solution exists.
 * 2) Finds solution from generated list.
 * 3) Returns final answer.
 *
 * @param {integer}
 * @return {integer}
 */
const main = limit => {
  let primes = [2, 3],
    noAnswer = true,
    finalSum = 0,
    finalList = [],
    memo = {};

  // generate all possible primes with respect to the limit
  while (primes.reduce((a, b) => a + b) < limit) {
    let newPrime = getNextPrime(primes.slice(0).pop());
    primes.push(newPrime);
  }

  // remove the last prime since the total sum would be greater than the limit.
  primes.pop();

  for (let i = 0; i < primes.length; i++) {
    getAnswerForList(limit, primes, i, memo);

    // find longest list in the memo;
    if (Object.keys(memo).length) {
      Object.keys(memo).forEach(key => {
        let currentSum = memo[key].reduce((a, b) => a + b),
          currentList = memo[key];

        if (currentList.length > finalList.length) {
          finalList = currentList;
          finalSum = currentSum;
        }
      });
    }
  }

  return { finalSum, finalList };
};
console.time("Run Time");
const limit = 1000000;
const { finalSum, finalList } = main(limit);
console.timeEnd("Run Time");
console.log(
  "limit # ",
  limit,
  "\nfinal Sum: ",
  finalSum,
  "\nfinal List Length: ",
  finalList.length
);
