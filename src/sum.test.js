import { expect, test } from 'vitest';
import { sum } from 'src/sum.js';
import { calculateMix } from './services/calcmix.js';
import { isNumberObject } from 'util/types';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('validate that inputAmount is a number', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber('hej')).toBe(false);
})

function isNumber(value) {
    return typeof value === 'number';
}