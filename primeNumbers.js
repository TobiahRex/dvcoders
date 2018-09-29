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
 * Called randomly to verify number is prime.
 *
 * @param {integer}
 * @return {boolean}
 */
const isPrime = n => {
  // n = 3
  let result = null;
  if (!!n) {
    for (let i = 2; i < n; i++) {
      //
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
 * Generates new prime number, based off last prime number found.
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
 * Verifies that the collection of cached prime numbers, sums to a possible solution
 * NOTE: Does not generate answer, but simply verifies one exists.
 *
 * @param {integer, integer}
 * @return {boolean}
 */
const answerExists = (currentSum, limit) => {
  if (currentSum < limit) {
    return false;
  } else {
    return true;
  }
};

/**
 * Locates the combination of primes that when summed, give the largest prime value,
 * less than the "limit" value.
 *
 * @param {array, integer}
 * @return {integer}
 */
const getAnswer = (primeList, limit) => {
  let keepLooking = true,
    sum = primeList.reduce((a, b) => a + b),
    lastList = [],
    currentList = [];

  for (let i = primeList.length - 1; keepLooking; i--) {
    sum -= primeList[i];
    if (sum < limit && isPrime(sum)) {
      keepLooking = false;
      console.log("Number of primes: ", primeList.slice(0, i).length);
      console.log("Primes: ", primeList.slice(0, i));
    }
  }
  return sum;
};

const getAnswerForList = (list, split, memo) => {
  if (split < 0 || list.length < 2) {
    return;
  }
  const sum = list.reduce((a, b) => a + b);
  if (isPrime(sum)) {
    if (!(sum in memo)) {
      if (memo[sum].length < list.length) {
        memo[sum] = list;
      }
    }
  }

  const loList = list.splice(0, split),
    hiList = list.splice(split);

  getAnswerForList(loList, split - 1, memo);
  getAnswerForList(hiList, split + 1, memo);
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
  let primes = [2, getNextPrime(2)],
    lastList = [],
    lastSum = 0,
    noAnswer = true,
    memo = {};

  // while no answer exists
  while (noAnswer) {
    // generate a new prime.
    let newPrime = getNextPrime(primes.slice(0).pop());
    // at new prime to entire list.
    primes.push(newPrime);

    for (let i = 0; i < primes.length; i++) {
      getAnswerForList(primes, i, memo);
      const answerSum = Object.keys(memo).pop();

      if (
        answerSum < limit &&
        answerSum > lastSum &&
        answerList.length > lastList.length
      ) {
        lastList = answerList;
        lastSum = answerSum;
      } else if (answerSum > limit) {
        noAnswer = false;
      }
    }
  }

  return lastSum;
};

console.log(main(1000));
