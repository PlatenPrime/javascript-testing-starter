import { describe, test, it, expect, beforeEach, afterEach, afterAll, beforeAll } from 'vitest';
import { Stack, calculateDiscount, canDrive, fetchData, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from '../src/core.js';




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

    it.each([
        { price: 10, min: 5, max: 15, result: true },
        { price: 3, min: 5, max: 15, result: false },
        { price: 45, min: 5, max: 15, result: false },
        { price: 15, min: 5, max: 15, result: true },
        { price: 5, min: 5, max: 15, result: true },
    ])("shoud return $result if price $price is in range between $min and $max", ({ price, min, max, result }) => {
        expect(isPriceInRange(price, min, max)).toBe(result);
    })

})


describe('isValidUsername', () => {

    const minLength = 5;
    const maxLength = 15;


    it('should return true if username length in correct range', () => {
        expect(isValidUsername("P".repeat(minLength + 1))).toBe(true);
    })

    it('should return false if username length is out of range', () => {
        expect(isValidUsername("P".repeat(minLength - 1))).toBe(false);
        expect(isValidUsername("P".repeat(maxLength + 1))).toBe(false);
    })

    it('should return true if username length is equal to minLength or maxLength', () => {
        expect(isValidUsername("P".repeat(minLength))).toBe(true);
        expect(isValidUsername("P".repeat(maxLength))).toBe(true);
    })

    it('should return false if username is not a string', () => {
        expect(isValidUsername(123)).toBe(false);
        expect(isValidUsername({})).toBe(false);
        expect(isValidUsername(null)).toBe(false);
        expect(isValidUsername(undefined)).toBe(false);
        expect(isValidUsername([])).toBe(false);
    })

})


describe('canDrive', () => {


    it.each([
        { age: 15, countryCode: 'US', expected: false },
        { age: 16, countryCode: 'US', expected: true },
        { age: 17, countryCode: 'US', expected: true },
        { age: 16, countryCode: 'UK', expected: false },
        { age: 17, countryCode: 'UK', expected: true },
        { age: 18, countryCode: 'UK', expected: true },
    ])("should return $expected if age is $age and countryCode is $countryCode", ({ age, countryCode, expected }) => {
        expect(canDrive(age, countryCode)).toBe(expected);
    })


    it('should return invalid message if countryCode is invalid', () => {
        expect(canDrive(20, 'USA')).toMatch(/invalid/i);
    })


    it('should return false for invalid age type', () => {
        expect(canDrive(null, 'UK')).toMatch(/invalid/i);
        expect(canDrive(undefined, 'UK')).toMatch(/invalid/i);
    })


})


describe('fetchData', () => {
    it('should return a promise that resolves to an array of numbers', async () => {
        try {
            const result = await fetchData();
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            expect(error).toHaveProperty("reason");
            expect(error.reason).toMatch(/failed/i);
        }

    })
})


describe('Stack', () => {

    let stack

    beforeEach(() => {
        stack = new Stack();
    })




    it('push should add an item to the stack', () => {
        stack.push(1);

        expect(stack.size()).toBe(1);
    })


    it('pop should remove and return the top item from the stack', () => {
        stack.push(1)
        stack.push(2)

        expect(stack.pop()).toBe(2);
        expect(stack.size()).toBe(1);
    })

    it('pop should throw an error if the stack is empty ', () => {
        try {
            stack.pop()
        } catch (error) {
            expect(error.message).toMatch(/empty/i);
        }
        // Or like this
        expect(() => stack.pop()).toThrow(/empty/i);

    })

    it('peek method should return the top item from the stack', () => {
        stack.push(1)
        stack.push(2)

        const peekedItem = stack.peek();

        expect(peekedItem).toBe(2);
        expect(stack.size()).toBe(2);
    })

    it('peek should throw an error if the stack is empty', () => {
        expect(() => stack.peek()).toThrow(/empty/i);
    })


    it('isEmpty should return true if the stack is empty', () => {
        expect(stack.isEmpty()).toBe(true);
    })

    it('isEmpty should return false if the stack is not empty', () => {
        stack.push(1)
        expect(stack.isEmpty()).toBe(false);
    })


    it('size should return the number of items in the stack', () => {
        stack.push(1)
        stack.push(2)   

        expect(stack.size()).toBe(2);
    })


    it('clear should remove all items from the stack', () => {
        stack.push(1)
        stack.push(2)

        stack.clear()

        expect(stack.size()).toBe(0);
    })

})





