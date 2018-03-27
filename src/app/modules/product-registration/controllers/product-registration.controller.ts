import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductRegistration } from '../models/product-registration.entity';
import { ProductRegistrationService } from '../services/product-registration.service';
import { CreateProductRegistrationDto } from '../models/create-product-registration.dto';
import { plainToClass } from 'class-transformer';
import { Recaptcha } from 'recaptcha-verify';

@Controller('product-registration')
export class ProductRegistrationController {
	constructor(private readonly productRegistrationService: ProductRegistrationService) {}

	@Get()
	findAll(): Promise<ProductRegistration[]> {
		return this.productRegistrationService.findAll();
	}

	private checkRecaptcha(value) {
		if (!value || !value['captcha']) {
			return new Promise((resolve, reject) => {
				reject(new Error('No Captcha given'));
			});
		} else {
			var Recaptcha = require('recaptcha-verify');
			var recaptcha = new Recaptcha({
			    secret: process.env.CAPTCHA_SECRET,
			    verbose: true
			});
	    	return new Promise((resolve, reject) => {
		    	recaptcha.checkResponse(value['captcha'], function(error, response){
		    		if (error) {
		    			reject(new Error(error));
		    		} else {
		    			resolve(response);
		    		}
		    	});

	    	});

		}
	}

	@Post()
	async create( @Body() createProductRegistrationDto: CreateProductRegistrationDto) {
		const self = this;
		this.checkRecaptcha(createProductRegistrationDto).then(async function (response) {
		    if (response['success']) {
		        const productRegistration = plainToClass(ProductRegistration, createProductRegistrationDto);
		        await self.productRegistrationService.create(productRegistration);
		    } else {
		        console.log(response);
		    }
		}, function (error) {
		    console.log(error);
		});
	}

}