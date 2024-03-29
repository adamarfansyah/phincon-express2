export const fibonacci = (num) => {
  if (num <= 0) return 0;
  if (num === 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
};

export const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
};
