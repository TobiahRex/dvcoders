/**
 * Called randomly to verify argument is prime.
 *
 * @param {integer}
 * @return {boolean}
 */

function isPrime(n) {
  this.memo = { ...this.memo };

  if (!n) return false;
  if (n in this.memo) return true;
  else if (n == 2) return true;

  let result = null;
  for (let i = 2; i < n || !result; i++) {
    if (n % i === 0) {
      result = false;
      break;
    } else {
      this.memo[n] = true;
      result = true;
    }
  }
  console.log("this.memo: ", this.memo);
  return result;
}

isPrime(2);
isPrime(3);
isPrime(5);
isPrime(5);
isPrime(5);
isPrime(7);
isPrime(11);
isPrime(12);
