import { Resend } from 'resend';
import { NextResponse } from 'next/server';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY no está configurada en las variables de entorno');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El email es requerido' }, { status: 400 });
    }

    // Enviar email de confirmación
    await resend.emails.send({
      from: 'KiboHive <hola@kibohive.com>',
      to: email,
      subject: '¡Bienvenido a la lista de espera de KiboHive!',
      html: `
        <h1>¡Gracias por unirte a la lista de espera!</h1>
        <p>Hola,</p>
        <p>Gracias por tu interés en KiboHive. Te notificaremos tan pronto como estemos listos para lanzar.</p>
        <p>Mientras tanto, síguenos en nuestras redes sociales para mantenerte al día:</p>
        <ul>
          <li><a href="https://twitter.com/kibohive">Twitter</a></li>
          <li><a href="https://linkedin.com/company/kibohive">LinkedIn</a></li>
        </ul>
        <p>¡Nos vemos pronto!</p>
        <p>El equipo de KiboHive</p>
      `,
    });

    // También podríamos guardar el email en una base de datos aquí

    return NextResponse.json({ message: 'Te has unido a la lista de espera correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
