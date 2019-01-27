// @format
import { Test } from '@nestjs/testing';
import { MysqlEscape } from './mysql-escape.service';

describe('MysqlEscape', () => {
    let service: MysqlEscape;

    beforeEach(() => {
        service = new MysqlEscape();
    });

    it('should exists', () => {
        expect(service).toBeDefined();
    });

    describe('mysqlStringEscape', () => {
         it('should escape special characters', () => {
            const escaped = service.mysqlStringEscape(`"'%\r\n`);
            expect(escaped).toBe("\\\"\\'\\%\\r\\n");
        });
    });

});
