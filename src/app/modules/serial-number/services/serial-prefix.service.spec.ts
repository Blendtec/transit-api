// @format
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { SerialPrefixService } from './serial-prefix.service';

describe('SerialPrefixService', () => {
    let module: TestingModule;
    let service: SerialPrefixService;
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
                SerialPrefixService,
                {provide: 'SerialPrefixRepositoryToken', useValue: repoMock},
            ],
        }).compile();

        service = module.get(SerialPrefixService);
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
