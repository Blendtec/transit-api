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
            query: jest.fn()
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

    describe('mysql_real_escape_string', () => {

        it('should escape special characters', () => {
            const escaped = service.mysql_real_escape_string(`"'%\r\n`);
            expect(escaped).toBe("\\\"\\'\\%\\r\\n");
        });
    });

    describe('findAllResidential', () => {

        it('should call find on repository with country_code = \'US\'', async () => {
            await service.findAllResidential();
            expect(repoMock.find).toHaveBeenCalledWith({country_code: 'US'});
        });
    });

    describe('residentialState', () => {

        it('should call find on repository with country_code = \'US\' and state = \'state-CA\'', async () => {
            await service.residentialState('CA');
            expect(repoMock.find).toHaveBeenCalledWith({country_code: 'US', locations: 'state-CA'});
        });
    });

    describe('residentialStateRep', () => {

        it('should call find on repository with country_code = \'US\' and state = \'state-CA\' and isRep = 1', async () => {
            await service.residentialStateRep('CA', 'rep');
            expect(repoMock.find).toHaveBeenCalledWith({country_code: 'US', locations: 'state-CA', isRep: 1});
        });
    });

    describe('findAllInternational', () => {

        it('should call query on repository with SELECT * FROM transit.dealers WHERE country_code != "US"', async () => {
            await service.findAllInternational();
            expect(repoMock.query).toHaveBeenCalledWith('SELECT * FROM transit.dealers WHERE country_code != "US"');
        });
    });

    describe('findInternationalState', () => {

        it('should call query on repository with SELECT * FROM transit.dealers WHERE country_code != "US" AND locations = \'country-DE\'', async () => {
            await service.findInternationalState('DE');
            expect(repoMock.query).toHaveBeenCalledWith('SELECT * FROM transit.dealers WHERE country_code != "US" AND locations = \'country-DE\'');
        });
    });
});