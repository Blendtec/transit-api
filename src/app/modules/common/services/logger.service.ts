import { Component } from '@nestjs/common';

@Component()
export class LogService {

    log(...message: string[]): void {
        /* tslint:disable */
        console.log(...message);
        /* tslint:enable*/
    }

    error(...message: string[]): void {
        /* tslint:disable */
        console.error(...message);
        /* tslint:enable*/
    }

    warn(...message: string[]): void {
        /* tslint:disable */
        console.warn(...message);
        /* tslint:enable*/
    }
}