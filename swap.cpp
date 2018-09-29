#include <iostream>
using namespace std;

int main() {
  int a{12};
  int b{25};

  a += b;
  b = a - b;
  a -= b;

  cout << "a: " << a << endl;
  cout << "b: " << b << endl;

  return 0;
}
