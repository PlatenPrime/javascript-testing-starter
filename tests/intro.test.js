import { describe, test, it, expect } from 'vitest';
import { max, fizzBuzz, calculateAvarage } from '../src/intro.js';

describe("max", () => {
    it("should return first argument if it is greater", () => {

        // Arrange
        // const a = 2;
        // const b = 1;

        // Act
        // const result = max(a, b);

        // Assert
        // expect(result).toBe(a);

        expect(max(1, 2)).toBe(2);
    })

    it("should return second argument if it is greater", () => {
        expect(max(5, 18)).toBe(18);
    })


    it("should return first argument if arguments are equal", () => {
        expect(max(7, 7)).toBe(7);
    })
})


describe("fizzBuzz", () => {
    it("should return 'FizzBuzz' if argument is divisible by 3 and 5", () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
    it("should return 'Fizz' if argument is divisible by 3", () => {
        expect(fizzBuzz(27)).toBe('Fizz');
    });
    it("should return 'Buzz' if argument is divisible by 5", () => {
        expect(fizzBuzz(25)).toBe('Buzz');
    });
    it("should return the argument as a string if it is not divisible by 3 or 5", () => {
        expect(fizzBuzz(7)).toBe('7');
    });
})


describe("calculateAvarage", () => {
    it("should return NaN if given en empty array", () => {
        expect(calculateAvarage([])).toBeNaN();
    });

it("should calculate the avarage of an array with a single element", () => {
    expect(calculateAvarage([5])).toBe(5);
})


it("should calculate the avarage of an array with a two elements", () => {
    expect(calculateAvarage([5, 9])).toBe(7);
})


it("should calculate the avarage of an array with a three elements", () => {
    expect(calculateAvarage([5, 9, 13])).toBe(9);
})

})

