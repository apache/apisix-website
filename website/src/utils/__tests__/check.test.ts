import { checkPrototype } from '../check';

describe('utils/check', () => {
  it('checkPrototype', () => {
    expect(checkPrototype('width', 'String')).toBe(true);
    expect(checkPrototype('width', 'string')).toBe(false);
    expect(checkPrototype(BigInt(222), 'BigInt')).toBe(true);
    expect(checkPrototype(Symbol(1), 'Symbol')).toBe(true);
  });
});
