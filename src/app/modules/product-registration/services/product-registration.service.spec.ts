// @format
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { ProductRegistrationService } from './product-registration.service';
import { ProductRegistrationEmailService } from './product-registration-email.service';

describe('ProductRegistrationService', () => {
    let module: TestingModule;
    let service: ProductRegistrationService;
    let repoMock: any;
    let emailServiceMock: any;
    let dto: any;
    let newModel: any;

    beforeEach(async () => {
        dto = {};
        newModel = {};
        repoMock = {
            save: jest.fn().mockReturnValue(newModel),
        };

        emailServiceMock = {
            send: jest.fn().mockReturnValue(Promise.resolve(),
        };

        module = await Test.createTestingModule({
            components: [
                ProductRegistrationService,
                {provide: 'ProductRegistrationRepositoryToken', useValue: repoMock},
                {provide: ProductRegistrationEmailService, useValue: emailServiceMock},
            ],
        }).compile();

        service = module.get(ProductRegistrationService);
    });

    it('should exists', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {

        it('should call save on repository', async () => {
            await service.create(dto);
            expect(repoMock.save).toHaveBeenCalledWith(dto);
        });

        it('should return newly created registration', async () => {
            const result = await service.create(dto);
            expect(result).toEqual(newModel);
        });

        it('should send email confirmation', async () => {
            const result = await service.create(dto);
            expect(emailServiceMock.send).toHaveBeenCalledWith(dto);
        });

    });

});
