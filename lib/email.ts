import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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