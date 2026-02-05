
# Guía de Instalación: ZATOCHY PRO

Para que tu página funcione correctamente con los servicios que proporcionaste, sigue estos pasos:

### 1. Configuración de Firebase (Backend vs Frontend)
El código que proporcionaste es una "Cuenta de Servicio" (Service Account). **No debes poner la clave privada (`private_key`) directamente en el código de tu página web**, ya que cualquier persona que visite tu sitio podría verla y hackear tu base de datos completa.

**Qué hacer:**
1. Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2. Entra en tu proyecto `ztchy-pro-9eaf8`.
3. Crea una "Web App" en la configuración general.
4. Firebase te dará un código que dice `apiKey`, `authDomain`, etc. Copia eso en el archivo `services/firebaseService.ts` (reemplaza los placeholders).

### 2. MailerSend
He configurado el servicio en `services/mailersendService.ts` usando la API Key y el dominio que pasaste.
- Ten en cuenta que MailerSend requiere que el dominio (`test-51ndgwvy8xdlzqx8.mlsender.net`) esté verificado en su panel para que los correos lleguen a la bandeja de entrada.
- El sistema enviará un correo automático de "Nueva Sesión" cada vez que alguien entre.

### 3. Ejecución del Proyecto
1. El archivo `index.html` ya incluye Tailwind CSS y las fuentes futuristas ("Orbitron" y "Rajdhani").
2. El Login está diseñado exactamente como lo pediste:
   - **Título:** ZATOCHY PRO
   - **Campos:** Usuario/Correo y Contraseña.
   - **Botones:** "Olvidé mi contraseña" y "Registrarse".
3. Al ingresar, verás un Dashboard futurista con efectos de cristal (glassmorphism) y luces de neón.

### 4. Estilo Futurista
- He usado **Glassmorphism**: Paneles con fondo oscuro semitransparente y desenfoque.
- **Neon Glows**: Sombras y bordes con colores cian (`#00f3ff`) y púrpura.
- **Scanner Effect**: Hay una línea láser animada en el login que "escanea" el formulario.
- **Iconos**: Se usó la librería `lucide-react` para iconos tecnológicos.

**Usuario de prueba:**
- Email: `fulanitoperez@gmail.com`
- Contraseña: `fulanito`
