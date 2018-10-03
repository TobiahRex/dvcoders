/*
CHALLENGE DESCRIPTION:
----------------------------
The prime 41, can be written as the sum of six consecutive primes:

41 = 2 + 3 + 5 + 7 + 11 + 13
This is the longest sum of consecutive primes that adds to a prime below one-hundred.

The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

Which prime, below one-million, can be written as the sum of the most consecutive primes?
*/
console.time("Run Time");
const limit = 100;
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
  let primes = [2, 3],
    noAnswer = true,
    finalSum = 0,
    finalList = [],
    primeMemo = {};

  // generate all possible primes with respect to the limit
  console.time("getPrimes");
  while (primes.reduce((a, b) => a + b) < limit) {
    let lastPrime = primes[primes.length - 1],
      newPrime = getNextPrime(lastPrime, primeMemo);

    primes.push(newPrime);
  }
  console.timeEnd("getPrimes");

  // remove the last prime since the total sum would be greater than the limit.
  // primes.pop();

  console.time("getAnswer");
  memo = {
    sums: {},
    treeNodes: {}
  };
  getAnswerForList(limit, primes, 0, primes.length - 1, memo, primeMemo);
  // console.log("memo: ", memo);
  // find longest list in the memo;
  for (let key in memo.sums) {
    // console.log("finalList: ", finalList, "\nfinalSum: ", finalSum);
    let currentSum = Number(key),
      currentList = memo.sums[key];
    // if (currentSum === 953) {
    //   console.log("currentList.length: ", currentList.length);
    // }
    if (currentList.length === finalList.length) {
      if (currentSum > finalSum) {
        finalList = currentList;
        finalSum = currentSum;
      }
    } else if (currentList.length > finalList.length) {
      finalList = currentList;
      finalSum = Number(currentSum);
    }
  }
  console.timeEnd("getAnswer");

  return { finalSum, finalList };
}

/**
 * Called randomly.
 * Generates new prime number, based off argument as last prime number found.
 *
 * @param {integer}
 * @return {integer}
 */
function getNextPrime(lastPrime, primeMemo) {
  let newPrime = 0;
  let keepLooking = true;

  for (let i = lastPrime + 1; keepLooking === true; i++) {
    if (isPrime(i, primeMemo)) {
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
function getAnswerForList(limit, list, begin, end, memo, primeMemo) {
  // if this iteration of begin and end has already been calculated - skip.
  // if (
  //   `${begin}-${end}` in memo.treeNodes ||
  //   `${begin}-${end}` in memo.treeNodes
  // ) {
  //   return;
  // }

  // create new list for this invocation.
  let newList = list.slice(begin, end);
  // If the current list is too short - return early.
  if (newList.length < 2) {
    return;
  }

  let sum = newList.reduce((a, b) => a + b);

  if (isPrime(sum, primeMemo) && sum < limit) {
    if (sum in memo.sums) {
      if (newList.length > memo.sums[sum].length) {
        memo.sums[sum] = newList;
      } else {
        return;
      }
    } else {
      memo.sums[sum] = newList;
    }
  }

  // recursively call with new lists and new split points.
  getAnswerForList(limit, list, begin, end - 1, memo, primeMemo);
  getAnswerForList(limit, list, begin + 1, end, memo, primeMemo);
}

/**
 * Called randomly to verify argument is prime.
 *
 * @param {integer}
 * @return {boolean}
 */
// function isPrime(n, pMemo) {
//   // n = 3
//   if (n == 2) {
//     return true;
//   }
//
//   let result = null;
//   if (!!n) {
//     for (let i = 2; i < n; i++) {
//       if (i !== n) {
//         if (n % i === 0) {
//           result = false;
//           break;
//         } else {
//           result = true;
//         }
//       }
//     }
//   }
//   return result;
// }
function isPrime(n, pMemo) {
  if (n in pMemo) return true;
  else if (n == 2) return true;

  let result = null;
  for (let prime in pMemo) {
    if (prime < n && n % prime === 0) {
      result = false;
    }
  }
  if (result == null) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      result = false;
      break;
    } else {
      pMemo[n] = true;
      result = true;
    }
  }
  return result;
}
