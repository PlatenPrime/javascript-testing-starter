// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

export function calculateAvarage(numbers) {

  if (numbers.length === 0) return NaN

  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;

  return numbers[0]
}
