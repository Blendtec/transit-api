import { ValidationArguments } from 'class-validator';
import { SerialPrefix } from './serial-prefix.validator';
import { Connection } from 'typeorm';

describe('serialPrefix', () => {
  let serialPrefix: SerialPrefix;
  const testConn = {
    getRepository: (value) => {
      return {
        find: async (input) => {
          if (input.prefix === 'ttbb') {
            return await [{ id: 1, prefix: 'ttbb' }];
          } else {
            return [];
          }
        },
      };
    },
  } as Connection;

  beforeEach(() => {

    serialPrefix = new SerialPrefix(testConn);
  });

  describe('defaultMessage', () => {
    it('should say failed', () => {
      expect(serialPrefix.defaultMessage({})).toContain('failed');
    });
  });

  describe('validate', async () => {
    it('valid prefix should return true', async () => {
      const tempArgs = { constraints: ['serialprefix'] } as ValidationArguments;
      const out = await serialPrefix.validate('ttbb', tempArgs);
      expect(out).toBe(true);

    });
  });

  describe('validate', async () => {
    it('invalid prefix should return false', async () => {
      const tempArgs = { constraints: ['serialprefix'] } as ValidationArguments;
      const out = await serialPrefix.validate('notValidPrefix', tempArgs);
      expect(out).toBe(false);

    });
  });

});