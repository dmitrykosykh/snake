/* eslint-disable no-undef */
import { swap, shiftToRight } from './utils';

describe('utils', () => {
  test('swap', () => {
    const test1 = [1, 2];
    swap(test1, 0, 1);
    expect(test1).toEqual([2, 1]);
  });

  test('shiftToRight', () => {
    const test1 = [1, 2, 3, 4];
    shiftToRight(test1);
    expect(test1).toEqual([1, 1, 2, 3]);
  });
});
