import { IsCaptcha } from './iscaptcha.validator';
import * as testKeys from 'recaptcha-test-keys';

describe('IsCaptcha', () => {
  let isCaptcha: IsCaptcha;

  beforeEach(() => {
    isCaptcha = new IsCaptcha(testKeys.secret);
  });

  describe('defaultMessage', () => {
    it('should say failed', () => {
      expect(isCaptcha.defaultMessage({})).toContain('failed');
    });
  });

  describe('validate', () => {
    it('test string should validate captcha', async () => {
      const out = await isCaptcha.validate('asdf', {});
      expect(out).toBe(true);
    });

    it('empty string should not validate captcha', async () => {
      const out = await isCaptcha.validate('', {});
      expect(out).toBe(false);
    });

  });
});