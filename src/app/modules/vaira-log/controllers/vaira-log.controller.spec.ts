import { VairaLogService } from '../services/vaira-log.service';
import { VairaLogController } from './vaira-log.controller';

describe('VairaLogController', () => {
    let vairaLogController: VairaLogController;
    let vairaLogService: VairaLogService;

    beforeEach(() => {
          vairaLogService = new VairaLogService();
          vairaLogController = new VairaLogController(vairaLogService);
        });

    describe('findAll', () => {
          it('should return an array of vairaLog', async () => {
                  const result = ['test'];
                  jest.spyOn(vairaLogService, 'findAll').mockImplementation(() => result);

                  expect(await vairaLogController.findAll()).toBe(result);
                });
        });

    describe('create', () => {
          it('should return void', async () => {
               jest.spyOn(vairaLogService, 'create').mockImplementation();
               expect(await vairaLogController.create({})).toBeUndefined();
          });
        });
});
