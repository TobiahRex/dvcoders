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
 * Begins control flow.
 * 1) Generates list of prime numbers until a possible solution exists.
 * 2) Finds solution from generated list.
 * 3) Returns final answer.
 *
 * @param {integer}
 * @return {object}
 */
function main(limit) {
  let primes = [2],
    noAnswer = true,
    finalSum = 0,
    finalList = [],
    memo = {};

  // generate all possible primes with respect to the limit
  let sumAllPrime = primes[0];
  while (sumAllPrime < limit) {
    let lastPrime = primes[primes.length - 1],
      newPrime = getNextPrime(lastPrime);
    sumAllPrime += newPrime;
    primes.push(newPrime);
  }
  // remove the last prime since the total sum would be greater than the limit.
  primes.pop();

  for (let i = 0; i < primes.length; i++) {
    getAnswerForList(limit, primes, i, memo);
    // console.log("memo: ", memo);

    // find longest list in the memo;
    for (let key in memo) {
      let currentSum = Number(key),
        currentList = memo[key];

      if (currentList.length > finalList.length) {
        finalList = currentList;
        finalSum = currentSum;
      }
    }
  }

  return { finalSum, finalList };
}

/**
 * Called by main().
 * Generates new prime number, based off argument as last prime number found.
 *
 * @param {integer}
 * @return {integer}
 */
function getNextPrime(lastPrime) {
  let newPrime = 0;
  let keepLooking = true;

  for (let i = lastPrime + 1; keepLooking === true; i++) {
    if (isPrime(i)) {
      keepLooking = false;
      newPrime = i;
    }
  }
  return newPrime;
}

/**
 * Called randomly to verify argument is prime.
 *
 * @param {integer}
 * @return {boolean}
 */
const primeMemo = {},
  notPrime = {};
function isPrime(n) {
  if (n in primeMemo) return true;
  if (n in notPrime || n > limit) return false;

  let result = null;

  for (let prime in primeMemo) {
    if (prime < n && n % Number(prime) === 0) {
      notPrime[n] = true;
      result = false;
    }
  }
  if (result == false) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      result = false;
      notPrime[n] = true;
      break;
    } else {
      primeMemo[n] = true;
      result = true;
    }
  }
  return result;
}

/**
 * Called recursively
 * Recursively iterates over different portions of a dynamically sized list using a "partition" logic.
 * Saves only unique sums into a referenced memo.
 *
 * @param {integer, array, integer, object}
 * @return {null}
 */
function getAnswerForList(limit, list, split, memo) {
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

  if (split !== list.length) {
    let loList = list.slice(0, split - 1);
    let hiList = list.slice(split + 1);
    getAnswerForList(limit, loList, split - 1, memo);
    getAnswerForList(limit, hiList, split + 1, memo);
  }
}

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
