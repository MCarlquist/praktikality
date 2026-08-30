import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an HTML email with the specified subject.
 *
 * @param subject - The email subject
 * @param html - The email body as HTML
 * @returns The email provider's send result data
 * @throws Error if the email provider reports a sending failure
 */
export async function sendEmail({ subject, html }: { subject: string, html: string }) {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject,
        html,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}