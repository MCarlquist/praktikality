import { sendEmail } from "@/lib/email";

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