// @format
import { CreateProductRegistrationDto } from './create-product-registration.dto';
jest.mock('../../common/validators/serial-prefix.validator');
jest.mock('../../common/validators/iscaptcha.validator');
jest.mock('../../common/validators/has-states.validator');
import { validate } from 'class-validator';

describe('CreateProductRegistrationDto', () => {
    
    let classUnderTest: CreateProductRegistrationDto;


  beforeEach(() => {
    classUnderTest  = new CreateProductRegistrationDto();
    classUnderTest.firstName = 'firstName';
    classUnderTest.lastName = 'lastName';
    classUnderTest.addressOne = '1234 Lombard St.';
    classUnderTest.addressTwo = 'addressTwo';
    classUnderTest.city = 'San Francisco';
    classUnderTest.state = 'CA';
    classUnderTest.zip = '94016';
    classUnderTest.country = 'US';
    classUnderTest.email = 'tester@gmail.com';
    classUnderTest.phone = '1118675309';
    classUnderTest.purchasePlace = 'Costco';
    classUnderTest.purchaseOther = 'Foo';
    classUnderTest.purchaseDate = '2018-07-19T23:52:15+00:00';
    classUnderTest.serialPrefix = 'TTBB';
    classUnderTest.serialSuffix = '1234';
    classUnderTest.wantsOffers = false;
    classUnderTest.captcha = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
    classUnderTest.source = 'source';
    
  });

  it('should validate when all fields are complete', async () => {
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(0);
  });


  it('should not validate when firstName empty', async () => {
    classUnderTest.firstName = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });
  
  it('should not validate when lastName is empty', async () => {
    classUnderTest.lastName = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when addressOne is empty', async () => {
    classUnderTest.addressOne = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when city is empty', async () => {
    classUnderTest.city = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when zip is empty', async () => {
    classUnderTest.zip = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when country is empty', async () => {
    classUnderTest.country = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when email is empty', async () => {
    classUnderTest.email = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when email is not a valid email', async () => {
    classUnderTest.email = 'asdfasdfasd';
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when phone is empty', async () => {
    classUnderTest.phone = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when purchaseDate is empty', async () => {
    classUnderTest.purchaseDate = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

  it('should not validate when purchaseDate is not in iso format', async () => {
    classUnderTest.purchaseDate = '01/05/2016';
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });


  it('should not validate when source is empty', async () => {
    classUnderTest.source = null;
      let errors = await validate(classUnderTest);
      expect(errors.length).toEqual(1);
  });

});
