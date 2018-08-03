import { Controller, Get, Param } from '@nestjs/common';
import { Dealers } from '../models/dealers.entity';
import { DealersService } from '../services/dealers.service';

@Controller('dealers')
export class DealersController {
    constructor(private readonly dealersService: DealersService) {
    }

    @Get('residential/:stateCode')
    residentialState(@Param('stateCode') stateCode): Promise<Dealers[]> {
        return this.dealersService.residentialState(stateCode);
    }

    @Get('residential/:stateCode/:dealerRep')
    residentialStateRep(@Param('stateCode') stateCode, @Param('dealerRep') dealerRep): Promise<Dealers[]> {
        return this.dealersService.residentialStateRep(stateCode, dealerRep);
    }

    @Get('residential')
    residential(): Promise<Dealers[]> {
        return this.dealersService.findAllResidential();
    }

    @Get('international/:countryCode')
    internationalCountry(@Param('countryCode') countryCode): Promise<Dealers[]> {
        return this.dealersService.findInternationalState(countryCode);
    }

    @Get('international')
    international(): Promise<Dealers[]> {
        return this.dealersService.findAllInternational();
    }

    @Get()
    allDealers(): Promise<Dealers[]> {
    	return this.dealersService.findAll();
    }
}