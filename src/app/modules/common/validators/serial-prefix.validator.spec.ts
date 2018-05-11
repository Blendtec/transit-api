import { SerialPrefix } from './serial-prefix.validator';
import { SerialPrefix as SP } from '../../serial-number/models/serial-prefix.entity';

describe('serialPrefix', () => {
  let serialPrefix: SerialPrefix;

  beforeEach(() => {
    serialPrefix = new SerialPrefix({});

  });

  describe('defaultMessage', () => {
    it('should say failed', () => {
      expect(serialPrefix.defaultMessage({})).toContain('failed');
    });
  });

});