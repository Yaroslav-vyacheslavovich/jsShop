const sum = (a, b) => {
    if (!a || !b) {
        return null;
    }
    else if (typeof a === 'string' || typeof b === 'string') {
        return NaN;
    }
    else {
        return a + b;
    }
}

const sub = (a, b) => {
    if (!a || !b) {
        return NaN;
    }
    else {
        return a - b;
    }
}

const mult = (a, b) => {
    if (!a || !b) {
        return NaN;
    }
    else if (a != null && b != null) {
        return a * b;
    }
    else {
        return a;
    }
}
const div = (a, b) => {
    if (!a || !b) {
        return NaN;
    }
    else if (a = 0) {
        return 0;
    }
    else if (b === 0) {
        return NaN;
    }
    else {
        return a / b
    }
}



module.exports = {
    sum: sum,
    sub: sub,
    mult: mult,
    div: div
}