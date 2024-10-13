import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency, getShippingInfo, renderPage, submitOrder } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');




describe('test suit', () => {
    it('test case', () => {
        const greet = vi.fn();
        // const greet1 = vi.fn();

        // greet.mockReturnValue('hello');
        // greet.mockResolvedValue('hello resolved');
        // const result = greet();
        // const asyncResult = greet().then(res => console.log(res)
        // );

        // console.log(result);

        greet.mockImplementation((name) => `hello ${name}`);
        const result = greet('John');
        expect(greet).toHaveBeenCalledWith('John');
        expect(greet).toHaveBeenCalledOnce();

    })
})

describe('test suit exercise', () => {
    it('should been called and return ok', () => {
        const send = vi.fn();
        send.mockReturnValue('ok');

        const result = send('hello')
        expect(send).toHaveBeenCalledOnce();
        expect(send).toHaveBeenCalledWith('hello');
        expect(result).toMatch(/ok/i)
    })
})


describe('getPriceInCurrency', () => {
    it('should return price in currency', () => {

        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(10, "AUD");

        expect(price).toBe(15);
    })
})



describe('getShippingInfo', () => {
    it('should return shipping info', () => {
        vi.mocked(getShippingQuote).mockReturnValue({
            cost: 7,
            estimatedDays: 2
        });

        const result = getShippingInfo("London");

        expect(result).toMatch("$7")
        expect(result).toMatch(/2 days/i)

        expect(result).toMatch(/shipping cost: \$7 \(2 days\)/i)
    })


    it('should return shipping unavailable', () => {
        vi.mocked(getShippingQuote).mockReturnValue('');

        const result = getShippingInfo("London");

        expect(result).toMatch(/unavailable/i)
    })

})


describe('renderPage', () => {
    it('should return correct content', async () => {
        const result = await renderPage();

        expect(result).toMatch(/content/i)
    })

    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    })

})


describe('submitOrder', () => {

    const order = {
        totalAmount: 10
    }

    const creditCard = {
        creditCardNumber: '1234'
    }

    it('should charge the customer', async () => {

        vi.mocked(charge).mockResolvedValue({ status: 'success' });


        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    })

    it('should return succes if payment was succesful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });


        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: true });
    })

    it('should return succes if payment was succesful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed' });


        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: false, error: 'payment_error' });
    })




})