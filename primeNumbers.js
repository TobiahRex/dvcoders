/*
The prime 41, can be written as the sum of six consecutive primes:

41 = 2 + 3 + 5 + 7 + 11 + 13
This is the longest sum of consecutive primes that adds to a prime below one-hundred.

The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.

Which prime, below one-million, can be written as the sum of the most consecutive primes?
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

const answerExists = (currentSum, limit) => {
  if (currentSum < limit) {
    return false;
  } else {
    return true;
  }
};

const getAnswer = (primeList, limit) => {
  let keepLooking = true,
    sum = primeList.reduce((a, b) => a + b),
    lastList = [],
    currentList = [];

  // console.log("primeList before: ", primeList);
  for (let i = primeList.length - 1; keepLooking; i--) {
    sum -= primeList[i];
    if (sum < limit && isPrime(sum)) {
      keepLooking = false;
      console.log("Number of primes: ", primeList.slice(0, i));
    }
  }
  return sum;
};

const main = limit => {
  let primes = [2, getNextPrime(2)],
    currentSum = primes.reduce((a, b) => a + b),
    noAnswer = true;

  while (noAnswer) {
    let newPrime = getNextPrime(primes.slice(0).pop());
    primes.push(newPrime);
    currentSum += newPrime;

    if (isPrime(currentSum)) {
      if (answerExists(currentSum, limit)) {
        noAnswer = false;
      }
    }
  }

  return getAnswer(primes, limit);
};

console.log(main(1000));
