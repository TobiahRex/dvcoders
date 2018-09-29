#include <iostream>
#include <string>
#include <cstdlib>
using namespace std;

int main() {
  int num1{1}, num2{1}, length{10}, sum{0};

  for (int i = length; i > 0; i--) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }

  string stringSum = to_string(sum);
  cout << "Digit: " << sum << endl;
  cout << "last char: " << stringSum.at(stringSum.length() - 1) << endl;

  return 0;
}
