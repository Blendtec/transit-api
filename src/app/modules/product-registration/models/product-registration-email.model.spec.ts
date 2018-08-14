import { plainToClass } from 'class-transformer';
import { ProductRegistrationEmail } from './product-registration-email.model';
import { ProductRegistration } from './product-registration.entity';

describe('ProductRegistrationEmail', () => {

  let classUnderTest: ProductRegistrationEmail;
  let productRegistration: ProductRegistration;

  beforeEach(() => {
    let dto = {
        firstName: 'firstName',
        lastName: 'lastName',
        addressOne: '1234 Lombard St.',
        addressTwo: 'addressTwo',
        city: 'San Francisco',
        state: 'CA',
        zip: '94016',
        country: 'US',
        email: 'tester@gmail.com',
        phone: '1118675309',
        purchasePlace: 'Costco',
        purchaseOther: 'Foo',
        purchaseDate: '2018-07-19T23:52:15+00:00',
        serialPrefix: 'TTBB',
        serialSuffix: '1234',
        wantsOffers: false,
        captcha: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        source: 'source',
    };
    productRegistration = plainToClass(ProductRegistration, dto);
    classUnderTest = new ProductRegistrationEmail(productRegistration);
  });

    describe('to', () => {
      it('should return product registration email in to field', () => {
        const result = classUnderTest.to;
        expect(classUnderTest.to).toEqual(productRegistration.email);
          
      });
    });

    describe('subject', () => {
      it('should return Blendtec Registration Confirmation', () => {
        expect(classUnderTest.subject).toEqual('Blendtec Registration Confirmation');
          
      });
    });

  describe('body', () => {
     it('should include firstname ', () => {
       expect(classUnderTest.body.indexOf(productRegistration.firstName) !== -1).toBe(true);
     }); 

     it('should include email subject', () => {
       expect(classUnderTest.body.indexOf(classUnderTest.subject) !== -1).toBe(true);
     }); 

     it('should include product serial number', () => {
       expect(classUnderTest.body.indexOf(productRegistration.serialPrefix + '-' + productRegistration.serialSuffix) !== -1)
         .toBe(true);
     }); 
  });
});
