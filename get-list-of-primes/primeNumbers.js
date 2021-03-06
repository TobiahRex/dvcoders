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
const primeMemo = {};
const notPrime = {};
// const pairs = {};
console.time("Run Time");
const limit = 10000;
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

while (finalList.length) {
  console.log(finalList.splice(0, 10));
}
// console.log(pairs);

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
 * Called randomly.
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
 * Called recursively
 * Recursively iterates over different portions of a dynamically sized list using a "partition" logic.
 * Saves only unique sums into a referenced memo.
 *
 * @param {integer, array, integer, object}
 * @return {null}
 */
function getAnswerForList(limit, list, begin, end, memo) {
  if (begin > list.length || end < 1) return;

  // if (`${left}-${end}` in pairs) return;
  // if (`${begin}-${right}` in pairs) return;

  let newList = list.slice(begin, end);
  // if (begin < end) {
  //   newList = list.slice(begin, end);
  // } else {
  //   newList = list.slice(end, begin);
  // }
  if (newList.length < 2) return;

  let sum = newList.reduce((a, b) => a + b, 0);

  if (isPrime(sum) && sum < limit) {
    if (!(sum in memo)) {
      memo[sum] = newList;
    } else {
      if (newList.length > memo[sum].length) {
        memo[sum] = newList;
      }
    }
  }

  // let left = begin + 1;
  // pairs[`${begin}-${end}`] = newList;
  getAnswerForList(limit, list, begin + 1, end, memo);

  // let right = end - 1;
  // pairs[`${begin}-${end}`] = newList;
  getAnswerForList(limit, list, begin, end - 1, memo);
}

/**
 * Begins control flow.
 * 1) Generates list of prime numbers until a possible solution exists.
 * 2) Finds solution from generated list.
 * 3) Returns final answer.
 *
 * @param {integer}
 * @return {integer}
 */
function main(limit) {
  let primes = [2],
    noAnswer = true,
    finalSum = 0,
    finalList = [],
    memo = {};

  // generate all possible primes with respect to the limit
  console.time("getPrimes");
  let sum = 2;
  while (sum < limit) {
    let lastPrime = primes[primes.length - 1],
      newPrime = getNextPrime(lastPrime);
    sum += newPrime;
    primes.push(newPrime);
  }
  console.timeEnd("getPrimes");
  // remove the last prime since the total sum would be greater than the limit.
  primes.pop();
  // console.log("primes: ", primes);
  console.time("getAnswer");
  // console.log("primes: ", primes);
  getAnswerForList(limit, primes, 0, primes.length, memo);
  // console.log("memo: ", memo);

  // find longest list in the memo;
  Object.keys(memo).forEach(key => {
    let currentSum = Number(key),
      currentList = memo[key];
    if (currentList.length === finalList.length) {
      if (currentSum > finalSum) {
        finalList = currentList;
        finalSum = currentSum;
      }
    } else if (currentList.length > finalList.length) {
      finalList = currentList;
      finalSum = currentSum;
    }
  });

  console.timeEnd("getAnswer");

  return { finalSum, finalList };
}
