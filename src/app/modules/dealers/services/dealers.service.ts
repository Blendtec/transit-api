import { Component, Inject } from '@nestjs/common';
import { Repository,  } from 'typeorm';
import * as test from 'typeorm';
import { Dealers } from '../models/dealers.entity';

@Component()
export class DealersService {
    constructor(@Inject('DealersRepositoryToken') private readonly dealersRepository: Repository<Dealers>) {
    }

   mysql_real_escape_string (str: string) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\"+char;
            }
        });
    }

    async findAll(): Promise<Dealers[]> {
        return await this.dealersRepository.find();
    }

    async findAllResidential(): Promise<Dealers[]> {
        return await this.dealersRepository.find({country_code: 'US'});
    }

    async residentialState(state): Promise<Dealers[]> {  
        state = this.mysql_real_escape_string(state);
        return await this.dealersRepository.find({country_code: 'US', locations: 'state-' + state});
    }

    async residentialStateRep(state, dealerRep): Promise<Dealers[]> {  
        state = this.mysql_real_escape_string(state);
        let isRep = null;
        if (dealerRep === 'dealer') {
            isRep = 0;
        } else if (dealerRep === 'rep') {
            isRep = 1;
        } else {
            return this.residentialState(state);
        }
        return await this.dealersRepository.find({country_code: 'US', locations: 'state-' + state, isRep: isRep});
    }

    async findAllInternational(): Promise<Dealers[]> {
        return await this.dealersRepository.query('SELECT * FROM transit.dealers WHERE country_code != "US"');
    }

    async findInternationalState(country): Promise<Dealers[]> {
        country = this.mysql_real_escape_string(country);
        return await this.dealersRepository.query(`SELECT * FROM transit.dealers WHERE country_code != "US" AND locations = 'country-${country}'`);
    }

}