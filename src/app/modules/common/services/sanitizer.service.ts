import { Component } from '@nestjs/common';

@Component()
export class SanitizerService {

    public htmlEncode(input: string): string {
        // TODO HtmlEncode
        return String(input).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}