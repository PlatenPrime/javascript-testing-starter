import {
    describe,
    it,
    expect,

  } from 'vitest';
import { calculateDiscount } from '../src/main';


describe('calculateDiscount', () => {
    it('should return discounted price if given valid discount code', () => {
      expect(calculateDiscount(10, 'SAVE10')).toBe(9);
      expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    });
  
    it('should handle negative or zero price', () => {
      expect(calculateDiscount(-3, 'SAVE10')).toMatch(/invalid/i);
    });

    it('should handle invalid discount code', () => {
      expect(calculateDiscount(10, 'INVALID')).toMatch(/invalid/i);
    });
  
    it('should handle discount code greater than 1', () => {
      expect(calculateDiscount(10, 'SAVE200')).toMatch(/invalid/i);
    });
  });