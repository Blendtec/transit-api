import { SerialPrefix } from './serial-prefix.validator';
import { Connection } from 'typeorm';
import { SerialPrefix as SP } from '../../serial-number/models/serial-prefix.entity';

describe('serialPrefix', () => {
  let serialPrefix: SerialPrefix;
  let testConn = { getRepository: function(value) {
  	return {find: async function (input) {
  		if (input['prefix'] === 'ttbb') {
  			return await [{id: 1, prefix: 'ttbb'}];
  		} else {
  			return [];
  		}
  	}};	
  }};

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
    	let tempArgs = {constraints: ['serialprefix']};
    	const out =  await serialPrefix.validate('ttbb', tempArgs);
      	expect(out).toBe(true);

    });
  });

  describe('validate', async () => {
    it('invalid prefix should return false', async () => {
    	let tempArgs = {constraints: ['serialprefix']};
    	const out = await serialPrefix.validate('notValidPrefix', tempArgs);
      	expect(out).toBe(false);

    });
  });

});