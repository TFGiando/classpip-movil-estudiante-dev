import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Network } from '@ionic-native/network/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { Alumno } from '../clases';
import { MensajeCorreo } from '../clases/MensajeCorreo';
import { ComServerService, PeticionesAPIService, SesionService } from '../servicios';

@Component({
  selector: 'app-correo-informacion',
  templateUrl: './correo-informacion.page.html',
  styleUrls: ['./correo-informacion.page.scss'],
})
export class CorreoInformacionComponent {
  email: string;
  titulo: string;
  mensaje: string;

  mensajeCorreo: MensajeCorreo

  correoInformacion = true;

  constructor(
    private route: Router,
    public navCtrl: NavController,
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private comServer: ComServerService,
    private selector: WheelSelector,
    private localNotifications: LocalNotifications,
    public platform: Platform,
    private network: Network,
  ) {

    platform.ready().then(() => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
    });

  }

  async EnviarCorreo(){
    console.log(this.email)
    const nuevoMensaje = new MensajeCorreo (
    this.email,
    this.titulo,
    this.mensaje
    )

    if (this.email === undefined) {
      const alert = await this.alertController.create({
        header: 'Atención: Introduce un correo de usuario en el formulario',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.comServer.EnviarCorreoInformacion(this.email, this.titulo, this.mensaje)
      console.log("EEEEEEESSSSSSSAAAAAAAAA")
      console.log(nuevoMensaje)
      const alert = await this.alertController.create({
        header: 'Mensaje enviado con éxito',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
      await alert.present();
    }
  }

  GoToInicio() {
    this.route.navigateByUrl('/home');
  }

}
