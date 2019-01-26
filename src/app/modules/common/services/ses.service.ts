// @format
import { Component } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Component()
export class SESService {
    sendRawEmail(message: string): Promise<any> {
        return new AWS.SES()
            .sendRawEmail({ RawMessage: { Data: message } })
            .promise();
    }
}
