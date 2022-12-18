export class MensajeCorreo {
    Email: string;
    Titulo: string;
    Mensaje: string;
  
    constructor(email?: string, titulo?: string, mensaje?: string) {
  
      this.Email = email;
      this.Titulo = titulo;
      this.Mensaje = mensaje;
    }
  }