const scriptfortest = require('../scriptfortest');
const sum = scriptfortest.sum;
const sub = scriptfortest.sub;
const mult = scriptfortest.mult;
const div = scriptfortest.div;

// Вычитание
describe('Функция sub()', () => {
    it('должна возвращать 0 при аргументах (2, 2)', () => {
        expect(sub(2, 2)).toBe(0);
    })
});
describe('Функция sub()', () => {
    it('должна возвращать NaN при аргументах (2, null)', () => {
        expect(sub(2, null)).toBeNaN();
    })
});
describe('Функция sub()', () => {
    it('должна возвращать NaN при аргументах (2, str)', () => {
        expect(sub(2, 'str')).toBeNaN();
    })
});
describe('Функция sub()', () => {
    it('должна возвращать NaN при аргументах (undefined, 2)', () => {
        expect(sub(undefined, 2)).toBeNaN();
    })
});


// Сложение
describe('Функция sum()', () => {
    it('должна возвращать 0 при аргументах (2, -2)', () => {
        expect(sum(2, -2)).toBe(0);
    })
});
describe('Функция sum()', () => {
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(sum(2, null)).toBeNull();
    })
});
describe('Функция sum()', () => {
    it('должна возвращать NaN при аргументах (2, str)', () => {
        expect(sum(2, 'str')).toBeNaN();
    })
});
describe('Функция sum()', () => {
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(sum(undefined, 2)).toBeNull();
    })
});


//Умножение
describe('Функция mult()', () => {
    it('должна возвращать 4 при аргументах (-2, -2)', () => {
        expect(mult(-2, -2)).toBe(4);
    })
});
describe('Функция mult()', () => {
    it('должна возвращать null при аргументах (2, null)', () => {
        expect(mult(2, null)).toBeNull();
    })
});
describe('Функция mult()', () => {
    it('должна возвращать NaN при аргументах (2, "str")', () => {
        expect(mult(2, 'str')).toBeNaN();
    })
});
describe('Функция mult()', () => {
    it('должна возвращать NaN при аргументах (undefined, 2)', () => {
        expect(mult(undefined, 2)).toBeNaN();
    })
});

//Деление
describe('Функция div()', () => {
    it('должна возвращать 0 при аргументах (0, -2)', () => {
        expect(div(-2, -2)).toBe(0);
    })
});
describe('Функция div()', () => {
    it('должна возвращать NaN при аргументах (2, null)', () => {
        expect(div(2, null)).toBeNaN();
    })
});
describe('Функция div()', () => {
    it('должна возвращать NaN при аргументах (2, "str")', () => {
        expect(div(2, 'str')).toBeNaN();
    })
});
describe('Функция div()', () => {
    it('должна возвращать NaN при аргументах (undefined, 2)', () => {
        expect(div(undefined, 2)).toBeNaN();
    })
});
describe('Функция div()', () => {
    it('должна возвращать NaN при аргументах (2, 0)', () => {
        expect(div(2, 0)).toBeNaN();
    })
});