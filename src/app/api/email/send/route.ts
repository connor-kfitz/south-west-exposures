import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: `${name} <noreply@swexposures.com>`,
      to: ['robert.kamen@swexposures.com'],
      subject: `Message from ${name}`,
      html: message,
    });

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Email failed to send' }),
      { status: 500 }
    );
  }
}
