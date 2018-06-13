import { Component } from '@nestjs/common';
import * as mailcomposer from 'mailcomposer';

@Component()
export class MailComposerService {
    private _mailComposer;
    init(options: object) {
        this._mailComposer = mailcomposer(options);
    }

    build(callback: any): Promise<any> {
        return this._mailComposer.build(callback);
    }
}