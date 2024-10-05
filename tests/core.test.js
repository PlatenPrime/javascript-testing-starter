import { describe, test, it, expect } from 'vitest';
import { getCoupons } from '../src/core.js';




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


