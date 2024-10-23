
type Discounts = {
    [key: string]: number,
    };


const babel: string = 'babel';


export function calculateDiscount(price: number, discountCode: string) {
    const discounts: Discounts = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      SAVE200: 2,
    };
  
    if (price <= 0) {
      return 'Invalid price';
    }
  
  
    if (!(discountCode in discounts)) {
      return 'Invalid discount code';
    }
  
    if (discounts[discountCode] > 1) {
      return 'Invalid discount code';
    }
  
    return price - price * discounts[discountCode];
  }