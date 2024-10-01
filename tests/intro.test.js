import { describe, test, it, expect } from 'vitest';
import { max } from '../src/intro.js';

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