import { sendEmail } from "@/lib/email";

/**
 * Processes a participant job-interest submission by sending its details by email.
 *
 * @returns A JSON response indicating successful processing
 */
export async function POST(request: Request) {
    const body = await request.json();

    await sendEmail({
        subject: 'Ny Deltagare vill jobba!',
        html: `
        
        <h1>Ny Deltagare vill jobba!</h1>
        <h2>Deltagare: ${body.deltagare} vill jobba på ${body.foretag}</h2>
        `
    });

    return Response.json({
        success: true
    })

}