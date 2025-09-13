import { Resend } from "resend";

class EmailService {
    private client: Resend;
    private domain: string;

    constructor(apiKey: string, domain: string) {
        this.client = new Resend(apiKey);
        this.domain = domain;
    }

    public async sendEmail(
        to: string,
        subject: string,
        text: string,
    ): Promise<void> {
        await this.client.emails.send({
            from: `Unnati <mail@${this.domain}>`,
            to,
            subject,
            text,
        });
    }
}

export default new EmailService(
    process.env.RESEND_API_KEY as string,
    process.env.RESEND_DOMAIN as string,
);
