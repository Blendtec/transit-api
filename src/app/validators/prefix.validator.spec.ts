import { IsCaptcha } from './prefix.validator';

xdescribe('Prefix', () => {
  let prefix: Prefix;

  beforeEach(() => {
    prefix = new Prefix(testKeys.secret);
  });


});