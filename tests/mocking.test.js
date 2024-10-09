import { vi, it, expect, describe } from 'vitest';


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