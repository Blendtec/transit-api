import { Component, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as mailcomposer from 'mailcomposer';
import { EmailAttachment, EmailPreAttachment } from '../models/';

@Component()
export class EmailService {
	constructor() {
		AWS.config.update({
		    accessKeyId: process.env.ACCESSKEYID,
		    secretAccessKey: process.env.SECRETACCESSKEY,
		    "region": process.env.REGION
		});
	}

	makeStringSafe(unsafe: string): string {
		return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	attachmentFromString(emailPreAttachment: EmailPreAttachment): EmailAttachment {
		if (typeof emailPreAttachment.path === "string" && typeof emailPreAttachment.name === "string") {
			let match = emailPreAttachment.path.match(/\/[^;]*;/);
			if (match && typeof match === "object" && typeof match[0] === "string") {
				return {
					path: emailPreAttachment.path,
					contentType: 'image' + match[0].slice(0, -1),
					filename: emailPreAttachment.name + "." + match[0].slice(0, -1).slice(1)
				};
			}
		}
		return null;
	}

	sendEmail(email: string, subject: string, emailBodyHTML: string, inAttachments: EmailPreAttachment[]) {
		let attachments = [];
		for (let i = 0; i < inAttachments.length; i++) {
			let out = this.attachmentFromString(inAttachments[i]);
			if (out) {
				attachments.push(out);
			}
		}	
		const textOnly = emailBodyHTML.replace(/<[^>]+>/g, '');
		const mailOptions = {
		    from: 'noreply@blendtec.com',
		    subject: subject,
		    text: textOnly,
		    html: emailBodyHTML,
		    to: email,
		    attachments: attachments ? attachments : []
		};

		const mail = mailcomposer(mailOptions);

		mail.build((err, message) => {
			const sendPromise = new AWS.SES().sendRawEmail({RawMessage: {Data: message}}).promise();
			sendPromise.then(
			  (data) => {
			    console.log(data.MessageId);
			  }).catch(
			    (err) => {
			    console.error(err, err.stack);
			  });
		}); 
	}
}