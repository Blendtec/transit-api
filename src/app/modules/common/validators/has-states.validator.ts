import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Inject, Component } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import "reflect-metadata";
import {Service, Container} from "typedi";

@ValidatorConstraint({name: 'HasStates', async: true})
@Component()
export class HasStates implements ValidatorConstraintInterface {

    baseUrl: string = process.env.DATAURL;
    fileName: string = process.env.STATESFILE;

    constructor() {}

    async getStates() {
        let httpService = Container.get(HttpService);
        return httpService.get(this.baseUrl + this.fileName).toPromise();
    }

    private seeIfValidState(states: any[], theState: string) {
        for (let i = 0; i < states.length; i++) {
            if (states[i].name === theState) {
                return true;
            }
        }
        return false;
    }


    async validate(text: string) {
        const out = await this.getStates();
        const valid = this.seeIfValidState(out.data, text);
        return valid;
    }

    defaultMessage(): string {
        return 'states validation failed';
    }

}