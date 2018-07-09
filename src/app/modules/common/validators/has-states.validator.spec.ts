import { HasStates } from './has-states.validator';

describe('HasStates', () => {
  let hasStates: HasStates;

  beforeEach(() => {
    hasStates = new HasStates();
    spyOn(hasStates, 'getStates').and.returnValue({data: [{"short": "UT", "name": "Utah", "country": "US", "region": "", "alt": []}]});
  });

  describe('defaultMessage', () => {
    it('should say failed', () => {
      expect(hasStates.defaultMessage()).toContain('failed');
    });
  });

  describe('validate', () => {
    it('test string should validate state', async () => {
      const out = await hasStates.validate('Utah');
      expect(out).toBe(true);
    });

  describe('not-validate', () => {
    it('test string should not validate bad input', async () => {
      const out = await hasStates.validate('fake state');
      expect(out).toBe(false);
    });

  });
});