import { EmailAttachment } from './../../common/models/email-attachment.interface';
import { Warranty } from './warranty.entity';

export class WarrantyEmail {

    constructor(private readonly warranty: Warranty) { }

    public get to(): string {
        return this.warranty.emailAddress;
    }

    public get subject(): string {
        return 'Blendtec Warranty Claim Received';
    }

    private get imageFields(): string[] {
        return [
            this.warranty.jarNumberImage,
            this.warranty.problemImage,
            this.warranty.receiptImage,
            this.warranty.serialImage,
        ];
    }

    public get attachments(): EmailAttachment[] {
        return this.imageFields
        .map((img, idx) => {
            if (img !== null && img !== '') {
                const match = img.match(/\/[^;]*;/);
                return {
                    path: img,
                    contentType: 'image' + match[0].slice(0, -1),
                    filename: 'attachment' + idx + '.' + match[0].slice(0, -1).slice(1),
                };
            }
        })
        .filter(i => i);
    }

    private htmlEncode(input: string): string {
        return String(input).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    public get body(): string {

        let jarInfo = '';
        if (this.warranty.whichProblem === 'both' || this.warranty.whichProblem === 'jar') {
            jarInfo = `<strong>Jar Number: </strong>;
                      ${ this.htmlEncode(this.warranty.jarNumber)}
                      <br>
                      <strong>Jar Size: </strong>
                      ${ this.htmlEncode(this.warranty.jarSize)}
                      <br>`;
        }
        return `<table width='100%'>
                    <tbody>
                        <tr><td><img align='left' alt='' src='https://s3.amazonaws.com/blendtec.com/external/img/logo_blendtec.jpg' width='199' style='max-width:199px;padding-bottom:0;vertical-align:bottom' class='CToWUd'></td></tr>
                        <tr>
                            <td align='center' valign='top' style='padding-bottom:30px'>
                                <strong>Personal Information</strong>
                                <br>
                                <br>
                                <strong>Name: </strong> ${ this.warranty.firstName} ${this.htmlEncode(this.warranty.lastName)}
                                <br>
                                <strong>Address: </strong> ${ this.htmlEncode(this.warranty.street)}
                                <br>
                                ${ this.warranty.city}, ${this.htmlEncode(this.warranty.state)}
                                <br>
                                ${ this.warranty.zipCode} ${this.htmlEncode(this.warranty.country)}
                                <br>
                                <strong>Phone Number: </strong> ${ this.htmlEncode(this.warranty.phoneNumber)}
                                <br>
                                <strong>Email Address: </strong> ${ this.htmlEncode(this.warranty.emailAddress)}
                                <br>
                                <strong>Preferred Contact Method: </strong> ${ this.htmlEncode(this.warranty.contactMethod)}
                                <br>
                                <strong>Preferred Contact Time: </strong> ${ this.htmlEncode(this.warranty.contactTime)}
                                <br>
                                <strong>Time Zone: </strong> ${ this.htmlEncode(this.warranty.timeZone)}
                                <br>
                                <strong>Began using the Blendtec around: </strong> ${ this.htmlEncode(this.warranty.purchaseDate.toLocaleString())}
                                <br>
                                <br><br>
                                <strong>Blender Information</strong>
                                <br><br>
                                <strong>Is the problemImage the Blender or the Jar: </strong> ${ this.htmlEncode(this.warranty.whichProblem)}
                                <br>
                                <strong>Serial Number: </strong> ${ this.htmlEncode(this.warranty.serialNumber)}
                                <br>` +
                                jarInfo + `
                                <strong>Description of Problem: </strong> ${ this.htmlEncode(this.warranty.description)}
                                <br>
                                <strong>Jar Making Sounds: </strong> ${ this.htmlEncode(this.warranty.hasUnusualSounds)}
                                <br>
                                <strong>Does Shaft Spin Smoothly: </strong> ${ this.htmlEncode(this.warranty.isSmoothSpinning)}
                                <br>
                                <strong>Does the Shaft Wiggle: </strong> ${ this.htmlEncode(this.warranty.isShaftSecure)}
                                <br>
                                <strong>Does the Jar Leak: </strong> ${ this.htmlEncode(this.warranty.isLeakingJar)}
                            </td>
                        </tr>
                    </tbody>
            </table>`;
    }
}