// @format
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Component } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import 'reflect-metadata';
import { Container } from 'typedi';

@ValidatorConstraint({ name: 'HasStates', async: true })
@Component()
export class HasStates implements ValidatorConstraintInterface {
    baseUrl: string;
    fileName: string;

    constructor() {
        this.baseUrl = process.env.DATAURL;
        this.fileName = process.env.STATESFILE;
    }

    async getStates() {
        const httpService = Container.get(HttpService);
        return httpService.get(this.baseUrl + this.fileName).toPromise();
    }

    private seeIfValidState(states: any[], theState: string) {
        for (const state of states) {
            if (state.name === theState) {
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
