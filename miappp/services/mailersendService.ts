
/**
 * Service for sending emails via MailerSend API
 * 
 * Note: In a production environment, API keys should never be stored in the frontend.
 * This should normally be a backend call. We are using the provided credentials
 * for the sake of the user request.
 */

const MAILERSEND_API_KEY = "mlsn.d00c241577aba879b7f031ef77618219124ee871ce7f95808c25c72e9474ef34";
const MAILERSEND_DOMAIN = "test-51ndgwvy8xdlzqx8.mlsender.net";

export const sendWelcomeEmail = async (toEmail: string, toName: string) => {
  try {
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: `no-reply@${MAILERSEND_DOMAIN}`,
          name: "ZATOCHY PRO Security",
        },
        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],
        subject: "Nueva Inicio de Sesión - ZATOCHY PRO",
        text: `Hola ${toName}, se ha detectado un nuevo inicio de sesión en tu cuenta de ZATOCHY PRO. Si no fuiste tú, contacta a soporte inmediatamente.`,
        html: `
          <div style="font-family: sans-serif; background-color: #05070a; color: #e0e0e0; padding: 40px; text-align: center;">
            <h1 style="color: #00f3ff;">ZATOCHY PRO</h1>
            <p style="font-size: 18px;">Alerta de Seguridad</p>
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px;">
              <p>Hola <strong>${toName}</strong>,</p>
              <p>Se ha detectado un nuevo acceso a tu terminal desde el correo: ${toEmail}</p>
              <p style="color: #888;">Fecha: ${new Date().toLocaleString()}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #555;">Sistema de monitoreo automático ZATOCHY OS</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.warn("MailerSend API error (Expected if domain not verified):", errorData);
    }
    
    return response.ok;
  } catch (error) {
    console.error("Error calling MailerSend:", error);
    return false;
  }
};
