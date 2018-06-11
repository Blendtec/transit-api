import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { EmailService } from './email.service';

describe('EmailService', () => {
	let module: TestingModule;
	let service: EmailService;

	beforeEach(() => {
		service = new EmailService();
	});

	it('should exists', () => {
		expect(service).toBeDefined();
	});

	describe('makeStringSafe', () => {

		it('should make a string safe', () => {
			const unsafeString = '&<>"';
			const safeString = service.makeStringSafe(unsafeString);
			expect(safeString).toEqual("&amp;&lt;&gt;&quot;");
		});

	});

	describe('attachmentFromString', () => {

		it('should make email attachment from pre email attachment input', () => {
			const preEmailAttachment = {path: 'data:image/png;base64,asdfasdf%3D%3D', name: 'test'};
			const emailAttachment = service.attachmentFromString(preEmailAttachment);
			expect(emailAttachment).toEqual({contentType: 'image/png', path: 'data:image/png;base64,asdfasdf%3D%3D', filename: 'test.png'});
		});

	});
});