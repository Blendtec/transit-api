import { Controller, Get, Post, Body } from '@nestjs/common';
import { Warranty } from '../models/warranty.entity';
import { WarrantyService } from '../services/warranty.service';
import { CreateWarrantyDto } from '../models/create-warranty.dto';
import { plainToClass } from 'class-transformer';
import { EmailService } from '../../common/services/email.service';

@Controller('warranty')
export class WarrantyController {
	constructor(private readonly warrantyService: WarrantyService, private emailService: EmailService) {}

	@Post()
	async create( @Body() createWarrantyDto: CreateWarrantyDto) {
        const warranty = plainToClass(Warranty, createWarrantyDto);
        this.emailService.sendEmail(warranty['email_address'], 
        	warranty['first_name'], 
        	warranty['last_name'], 
        	"Product Registration",
        	this.warrantyBody(warranty),
        	[warranty['serialnumber'], warranty['jarnumber'], warranty['problem'], warranty['receiptPhoto']]);
        await this.warrantyService.create(warranty);
	}


	warrantyBody(warranty: any) {
	let jarInfo = '';
	if(warranty['whichProblem'] === 'both' || warranty['whichProblem'] === 'jar'){
	jarInfo = `
		<strong>Jar Number: </strong> ${ warranty['jar_number'] }
		<br>
		<strong>Jar Size: </strong> ${ warranty['jar_size'] }
		<br>
		`
	}
		return `
		<table width="100%">
				<tbody>
				<tr><td><img align="left" alt="" src="https://s3.amazonaws.com/blendtec.com/external/img/logo_blendtec.jpg" width="199" style="max-width:199px;padding-bottom:0;vertical-align:bottom" class="CToWUd"></td></tr>
				<tr>
					<td align="center" valign="top" style="padding-bottom:30px">
			<strong>Personal Information</strong>
			<br><br>
			<strong>Name: </strong> ${ warranty['first_name'] } ${ warranty['last_name'] }
			<br>
			<strong>Address: </strong> ${ warranty['street'] }
			<br>
			${ warranty['city'] }, ${ warranty['state'] }
			<br>
			${ warranty['zip_code'] } ${ warranty['country'] }
			<br>
			<strong>Phone Number: </strong> ${ warranty['phone_number'] }
			<br>
			<strong>Email Address: </strong> ${ warranty['email_address'] }
			<br>
			<strong>Preferred Contact Method: </strong> ${ warranty['preferred_contact_method'] }
			<br>
			<strong>Preferred Contact Time: </strong> ${ warranty['preferred_contact_time'] }
			<br>

			<strong>Time Zone: </strong> ${ warranty['time_zone'] }
			<br>
			<strong>Began using the Blendtec around: </strong> ${ warranty['purchaseDate'] }
			<br>
			<br><br>
			<strong>Blender Information</strong>
			<br><br>
			<strong>Is the problem the Blender or the Jar: </strong> ${ warranty['whichProblem'] }
			<br>

			<strong>Serial Number: </strong> ${ warranty['serial_number'] }
			<br>
			` +
			jarInfo
			+ `
			<strong>Description of Problem: </strong> ${ warranty['description'] }
			<br>

			<strong>Jar Making Sounds: </strong> ${ warranty['jar_sounds'] }
			<br>

			<strong>Does Shaft Spin Smoothly: </strong> ${ warranty['smooth_spinning'] }
			<br>

			<strong>Does the Shaft Wiggle: </strong> ${ warranty['wiggle_shaft'] }
			<br>


			<strong>Does the Jar Leak: </strong> ${ warranty['leaky_jar'] }
			</td>
			</tr>
			</tbody>
			</table>`;
	}

}
