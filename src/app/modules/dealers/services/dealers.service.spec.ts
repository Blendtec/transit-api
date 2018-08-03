import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { DealersService } from './dealers.service';

describe('DealersService', () => {
    let module: TestingModule;
    let service: DealersService;
    let repoMock: any;
    let dto: any;
    let newModel: any;

    beforeEach(async () => {
        dto = {};
        newModel = {};
        repoMock = {
            find: jest.fn(),
        };
        module = await Test.createTestingModule({
            components: [
                DealersService,
                {provide: 'DealersRepositoryToken', useValue: repoMock},
            ],
        }).compile();

        service = module.get(DealersService);
    });

    it('should exists', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {

        it('should call find on repository', async () => {
            await service.findAll();
            expect(repoMock.find).toHaveBeenCalled();
        });
    });
});