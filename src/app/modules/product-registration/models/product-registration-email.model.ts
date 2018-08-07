import { ProductRegistration } from './product-registration.entity';

export class ProductRegistrationEmail {

    constructor(private readonly productRegistration: ProductRegistration) { }

    public get to(): string {
        return this.productRegistration.email;
    }

    public get subject(): string {
        return 'Blendtec Registration Confirmation';
    }

    public get body(): string {
      /* tslint:disable */
        return `<table width='100%'>
                    <tbody>
                        <tr>
                            <td>
                                <img align='center' alt='' src='https://s3.amazonaws.com/blendtec.com/external/img/logo_blendtec.jpg' width='199' style='max-width:199px;padding-bottom:0;vertical-align:bottom' class='CToWUd'>
                            </td>
                        </tr>
                        <tr>
                            <td align='center' valign='top' style='padding-bottom:30px'>
                                <h1 style="color: #ea002a">${this.subject}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td align='left'>
                                <br/>
                                <br/>
                                <p>
                                    Hi ${this.productRegistration.firstName},
                                </p>
                                <p>
                                    Congratulations! Your Product with serial number ${this.productRegistration.serialPrefix}-${this.productRegistration.serialSuffix} has been successfully registered on <a href="https://www.blendtec.com">blendtec.com</a>.
                                </p>
                                <p>
                                    As a member of the Blendtec family, feel free to <a href="https://www.blendtec.com/contact"> contact us</a> with any questions, concerns, or needs for repair.
                                </p>
                                <p>
                                    Happy Blending!
                                </p>
                                <p>
                                    Then Blendtec Team
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>`;
    /* tslint:enable */
    }
}
