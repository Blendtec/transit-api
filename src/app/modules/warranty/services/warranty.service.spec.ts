import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { WarrantyService } from './warranty.service';

describe('WarrantyService', () => {
	let module: TestingModule;
	let service: WarrantyService;
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
				WarrantyService,
				{provide: 'WarrantyRepositoryToken', useValue: repoMock},
			],
		}).compile();

		service = module.get(WarrantyService);
	});

	it('should exists', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {

		it('should call save on repository', async () => {
			await service.create(dto);
			expect(repoMock.save).toHaveBeenCalledWith(dto);
		});

		it('should return newly created warranty', async () => {
			const result = await service.create(dto);
			expect(result).toEqual(newModel);
		});

	});
});