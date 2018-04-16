import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { ProductRegistrationService } from './product-registration.service';

describe('ProductRegistrationService', () => {
	let module: TestingModule;
	let service: ProductRegistrationService;
	let repoMock: any;
	let dto: any;
	let newModel: any;

	beforeEach(async () => {
		dto = {};
		newModel = {};
		repoMock = {
			save: jest.fn().mockReturnValue(newModel),
		};
		module = await Test.createTestingModule({
			components: [
				ProductRegistrationService,
				{provide: 'ProductRegistrationRepositoryToken', useValue: repoMock},
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

	});
});