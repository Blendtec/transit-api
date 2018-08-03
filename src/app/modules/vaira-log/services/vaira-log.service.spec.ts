import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { VairaLogService } from './vaira-log.service';

describe('VairaLogService', () => {
    let module: TestingModule;
    let service: VairaLogService;
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
                VairaLogService,
                {provide: 'VairaLogRepositoryToken', useValue: repoMock},
            ],
        }).compile();

        service = module.get(VairaLogService);
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
