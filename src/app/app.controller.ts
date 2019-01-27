import { HttpStatus } from '@nestjs/common';
import { Get, Controller, Res } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    root(@Res() res): any {
        res.status(HttpStatus.OK).send();
    }
}
