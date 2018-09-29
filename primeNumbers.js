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

const getAnswerForList = (list, split, memo) => {
  if (list.length < 2 || split < 0) {
    return;
  }

  let sum = list.reduce((a, b) => a + b);

  if (isPrime(sum)) {
    if (!(sum in memo)) {
      memo[sum] = list;
    } else {
      if (list.length > memo[sum].length) {
        memo[sum] = list;
      }
    }
  }

  let loList = list.slice(0, split);
  let hiList = list.slice(split);

  if (split !== list.length) {
    getAnswerForList(loList, split - 1, memo);
    getAnswerForList(hiList, split + 1, memo);
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
  let primes = [2, getNextPrime(2)],
    answerList = [],
    answerSum = 0,
    noAnswer = true;

  // while no answer exists
  while (noAnswer) {
    let memo = {};
    // generate a new prime.
    let newPrime = getNextPrime(primes.slice(0).pop());
    // at new prime to entire list.
    primes.push(newPrime);

    for (let i = 0; i < primes.length; i++) {
      getAnswerForList(primes, i, memo);
      // console.log("memo: ", memo);
      let largestList = [],
        largestSum = 0;

      Object.keys(memo).forEach(key => {
        let currentSum = memo[key].reduce((a, b) => a + b),
          currentList = memo[key];

        if (
          currentList.length > largestList.length &&
          currentSum > largestSum
        ) {
          largestList = currentList;
          longestList = currentSum;
        }
      });

      const answerList = memo[answerSum.toString()];

      if (answerSum < limit && answerList > longestList) {
        lastSum = answerSum;
        lastList = answerList;
      } else if (answerSum > limit) {
        noAnswer = false;
        console.log("memo: ", memo);
      }
    }
  }
  return {
    sum: lastSum,
    list: lastList
  };
};

const { sum, list } = main(100);
console.log("sum: ", sum);
console.log("listLength: ", list.length);
console.log("list: ", list);
