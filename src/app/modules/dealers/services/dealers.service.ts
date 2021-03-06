import {Component, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Dealers} from '../models/dealers.entity';
import {MysqlEscape} from '../../common/services/mysql-escape.service';
import {countryCode} from '../../common/enums/country-code.enum';
import {sellerTypes} from '../../common/enums/seller-type.enum';

@Component()
export class DealersService {
  constructor(
    @Inject('DealersRepositoryToken') private readonly dealersRepository: Repository<Dealers>,
    private mysqlEscape: MysqlEscape,
  ) {}

  async findAll(): Promise<Dealers[]> {
    return await this.dealersRepository.find({isActive: true});
  }

  async findAllResidential(): Promise<Dealers[]> {
    return await this.dealersRepository.find({countryCode: countryCode.RESIDENTIAL_COUNTRY, isActive: true});
  }

  async residentialState(state): Promise<Dealers[]> {
    state = this.mysqlEscape.mysqlStringEscape(state);
    return await this.dealersRepository.find({
      countryCode: countryCode.RESIDENTIAL_COUNTRY,
      stateCode: state,
      isActive: true,
    });
  }

  async residentialStateRep(state, dealerRep): Promise<Dealers[]> {
    state = this.mysqlEscape.mysqlStringEscape(state);
    let isRep = null;
    if (dealerRep === sellerTypes.DEALER) {
      isRep = 0;
    } else if (dealerRep === sellerTypes.REPRESENTATIVE) {
      isRep = 1;
    } else {
      return this.residentialState(state);
    }
    return await this.dealersRepository.find({
      countryCode: countryCode.RESIDENTIAL_COUNTRY,
      stateCode: state,
      isRep,
      isActive: true,
    });
  }

  async findAllInternational(): Promise<Dealers[]> {
    return await this.dealersRepository
      .createQueryBuilder()
      .where(`countryCode != :US`, {US: countryCode.RESIDENTIAL_COUNTRY, isActive: true})
      .getMany();
  }

  async findInternationalState(country): Promise<Dealers[]> {
    country = this.mysqlEscape.mysqlStringEscape(country);
    return await this.dealersRepository.find({countryCode: country, isActive: true});
  }
}
