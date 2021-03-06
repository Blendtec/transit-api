import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { DealersService } from './dealers.service';
import { MysqlEscape } from '../../common/services/mysql-escape.service';
import { countryCode } from '../../common/enums/country-code.enum';

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
            createQueryBuilder: jest.fn()
        };
        module = await Test.createTestingModule({
            components: [
                DealersService,
                {provide: 'DealersRepositoryToken', useValue: repoMock},
                MysqlEscape,
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

    describe('findAllResidential', () => {

        it('should call find on repository with countryCode = \'USA\'', async () => {
            await service.findAllResidential();
            expect(repoMock.find).toHaveBeenCalledWith({countryCode: 'USA', isActive: true});
        });
    });

    describe('residentialState', () => {

        it('should call find on repository with countryCode = \'USA\' and state = \'CA\'', async () => {
            await service.residentialState('CA');
            expect(repoMock.find).toHaveBeenCalledWith({countryCode: 'USA', isActive: true, stateCode: 'CA'});
        });
    });

    describe('residentialStateRep', () => {

        it('should call find on repository with countryCode = \'USA\' and state = \'CA\' and isRep = 1', async () => {
            await service.residentialStateRep('CA', 'rep');
            expect(repoMock.find).toHaveBeenCalledWith({countryCode: 'USA', stateCode: 'CA', isActive: true, isRep: 1});
        });
    });

});
