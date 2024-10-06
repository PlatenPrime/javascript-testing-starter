import { describe, test, it, expect } from 'vitest';
import { calculateDiscount, getCoupons, isPriceInRange, validateUserInput } from '../src/core.js';




describe("test suite", () => {

    it("test case string", () => {
        const result = "The request file was not found.";
        // Loose (to general)
        expect(result).toBeDefined();
        // Tight (To specific)
        expect(result).toBe("The request file was not found.");
        // Better assertion
        expect(result).toMatch(/not found/i);
    })

    it("test case array", () => {
        const result = [1, 2, 3];
        // Loose (to general)
        expect(result).toBeDefined();
        // Tight (To specific)
        expect(result).toEqual([1, 2, 3]);
        expect(result).toHaveLength(3);
        // Better assertion
        expect(result).toContain(2);
        expect(result).toEqual(expect.arrayContaining([2, 3, 1]));
        expect(result.length).toBeGreaterThan(0);

    })


    it("test case object", () => {
        const result = {
            name: "John",
            id: 1
        };
        expect(result).toMatchObject(
            { name: "John" }
        );
        expect(result).toHaveProperty("name", "John");
        expect(typeof result.name).toBe("string");
    })

})


describe("getCoupons", () => {

    it("should return an array", () => {
        expect(getCoupons()).toBeInstanceOf(Array);
    })


    it("should return array ", () => {
        const coupons = getCoupons();
        expect(coupons).toBeInstanceOf(Array);
        expect(coupons.length).toBeGreaterThan(0);
    })


    it('should return array with objects with valid code and discount properties', () => {
        const coupons = getCoupons();
        coupons.forEach((coupon) => {
            expect(coupon).toHaveProperty('code');
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.code).toBe('string');
            expect(typeof coupon.code).toBeTruthy;
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThan(1);
        });
    })

})



describe('calculateDiscount', () => {
    it('should return discounted price if given valid discount code', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9);
        expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    })


    it('should handle non-numeric price', () => {
        expect(calculateDiscount("dirtge", 'SAVE10')).toMatch(/invalid/i);
    })

    it('should handle negative or zero price', () => {
        expect(calculateDiscount(-3, 'SAVE10')).toMatch(/invalid/i);
    })

    it('should handle non-string discount code', () => {
        expect(calculateDiscount(10, 34)).toMatch(/invalid/i);
    })

    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10, "INVALID")).toMatch(/invalid/i);
    })

    it('should handle discount code greater than 1', () => {
        expect(calculateDiscount(10, "SAVE200")).toMatch(/invalid/i);
    })

})


describe('validateUserInput', () => {

    it('should return succesful message if given valid input', () => {
        expect(validateUserInput('John', 28)).toMatch(/success/i);
    })

    it('should return error if username is not a string', () => {
        expect(validateUserInput(123, 18)).toMatch(/invalid/i);
    })

    it('should return error if username length less than 3', () => {
        expect(validateUserInput("Po", 18)).toMatch(/invalid/i);
    })

    it('should return error if username length greater than 255', () => {
        expect(validateUserInput("P".repeat(256), 18)).toMatch(/invalid/i);
    })

    it('should return error if age is not a number', () => {
        expect(validateUserInput("Portu", "23")).toMatch(/invalid/i);
    })

    it('should return error if age is less than 18', () => {
        expect(validateUserInput("Portu", 16)).toMatch(/invalid/i);
    })


})


describe('isPriceInRange', () => {
    it('should return true if price is in range', () => {
        expect(isPriceInRange(10, 5, 15)).toBe(true);
    })

    it('should return false if price is less than min', () => {
        expect(isPriceInRange(3, 5, 15)).toBe(false);
    })

    it('should return false if price is greater than max', () => {
        expect(isPriceInRange(45, 5, 15)).toBe(false);
    })

    it('should return true if price is equal to min or max', () => {
        expect(isPriceInRange(15, 5, 15)).toBe(true);
        expect(isPriceInRange(5, 5, 15)).toBe(true);
    })


})