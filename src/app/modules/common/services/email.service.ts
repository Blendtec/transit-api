import { Component, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Component()
export class EmailService {
	constructor() {
		AWS.config.update({
		    accessKeyId: process.env.ACCESSKEYID,
		    secretAccessKey: process.env.SECRETACCESSKEY,
		    "region": process.env.REGION
		});
	}

	generateFileFromString(base64String: string) {
		let match = base64String.match(/\/[^;]*;/);
		if (match && typeof match === "object" && typeof match[0] === "string") {
			return {
				contents: base64String,
				contentType: match[0].slice(0, -1)
			};
		} else {
			return null;
		}
	}

	sendEmail(email: string, firstName: string, lastName: string, subject: string, emailBodyHTML: string, attachments: string[]) {
		let attachments = [];
		for (const i = 0; i < attachments.length; i++) {
			let out = this.generateFileFromString(attachments[i]);
			if (out) {
				attachments.push(out);
			}
		}
		const params = {
		  Destination: { 
		    ToAddresses: [
		      email,
		    ]
		  },
		  Message: {
		    Body: {
		      Html: {
		       Charset: "UTF-8",
		       Data: emailBodyHTML
		      },
		      Text: {
		       Charset: "UTF-8",
		       Data: "this is the body"
		      }
		     },
		     Subject: {
		      Charset: 'UTF-8',
		      Data: subject
		     }
		    },
		  Source: 'noreply@blendtec.com',
		};       
		const sendPromise = new AWS.SES().sendEmail(params).promise();

		sendPromise.then(
		  function(data) {
		    console.log(data.MessageId);
		  }).catch(
		    function(err) {
		    console.error(err, err.stack);
		  });
	}


}