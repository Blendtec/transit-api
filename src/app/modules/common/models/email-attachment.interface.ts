export interface EmailAttachment {
	contentType: string;
	path: string;
	filename: string;
}

export interface EmailPreAttachment {
	path: string;
	name: string;
}