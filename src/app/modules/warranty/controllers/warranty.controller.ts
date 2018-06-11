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
        this.emailService.sendEmail(process.env.WARRANTYEMAIL, 
        	"Blendtec Warranty Claim Received",
        	this.warrantyBody(warranty),
        	[
        	{path: warranty.serialnumber, name: 'serialNumber'},
        	{path: warranty.jarnumber, name: 'jarnumber'},
        	{path: warranty.problem, name: 'problem'},
        	{path: warranty.receiptPhoto, name: 'receiptPhoto'}
        	]);
        this.emailService.sendEmail(warranty['email_address'], 
        	"Blendtec Warranty Claim Received",
        	this.warrantyBody(warranty),
        	[]);
        await this.warrantyService.create(warranty);
	}


	warrantyBody(warranty: any) {
	let jarInfo = '';
	if(warranty['whichProblem'] === 'both' || warranty['whichProblem'] === 'jar'){
	jarInfo = `
		<strong>Jar Number: </strong> ${ this.emailService.makeStringSafe(warranty['jar_number']) }
		<br>
		<strong>Jar Size: </strong> ${ this.emailService.makeStringSafe(warranty['jar_size']) }
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
			<strong>Name: </strong> ${ warranty['first_name'] } ${ this.emailService.makeStringSafe(warranty['last_name']) }
			<br>
			<strong>Address: </strong> ${ this.emailService.makeStringSafe(warranty['street']) }
			<br>
			${ warranty['city'] }, ${ this.emailService.makeStringSafe(warranty['state']) }
			<br>
			${ warranty['zip_code'] } ${ this.emailService.makeStringSafe(warranty['country']) }
			<br>
			<strong>Phone Number: </strong> ${ this.emailService.makeStringSafe(warranty['phone_number']) }
			<br>
			<strong>Email Address: </strong> ${ this.emailService.makeStringSafe(warranty['email_address']) }
			<br>
			<strong>Preferred Contact Method: </strong> ${ this.emailService.makeStringSafe(warranty['preferred_contact_method']) }
			<br>
			<strong>Preferred Contact Time: </strong> ${ this.emailService.makeStringSafe(warranty['preferred_contact_time']) }
			<br>

			<strong>Time Zone: </strong> ${ this.emailService.makeStringSafe(warranty['time_zone']) }
			<br>
			<strong>Began using the Blendtec around: </strong> ${ this.emailService.makeStringSafe(warranty['purchaseDate']) }
			<br>
			<br><br>
			<strong>Blender Information</strong>
			<br><br>
			<strong>Is the problem the Blender or the Jar: </strong> ${ this.emailService.makeStringSafe(warranty['whichProblem']) }
			<br>

			<strong>Serial Number: </strong> ${ this.emailService.makeStringSafe(warranty['serial_number']) }
			<br>
			` +
			jarInfo
			+ `
			<strong>Description of Problem: </strong> ${ this.emailService.makeStringSafe(warranty['description']) }
			<br>

			<strong>Jar Making Sounds: </strong> ${ this.emailService.makeStringSafe(warranty['jar_sounds']) }
			<br>

			<strong>Does Shaft Spin Smoothly: </strong> ${ this.emailService.makeStringSafe(warranty['smooth_spinning']) }
			<br>

			<strong>Does the Shaft Wiggle: </strong> ${ this.emailService.makeStringSafe(warranty['wiggle_shaft']) }
			<br>


			<strong>Does the Jar Leak: </strong> ${ this.emailService.makeStringSafe(warranty['leaky_jar']) }
			</td>
			</tr>
			</tbody>
			</table>`;
	}

}
