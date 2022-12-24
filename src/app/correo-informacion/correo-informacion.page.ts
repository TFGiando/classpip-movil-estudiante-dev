import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Network } from '@ionic-native/network/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { Alumno } from '../clases';
import { ComServerService, PeticionesAPIService, SesionService } from '../servicios';
import emailJS from '@emailjs/browser'

@Component({
  selector: 'app-correo-informacion',
  templateUrl: './correo-informacion.page.html',
  styleUrls: ['./correo-informacion.page.scss'],
})
export class CorreoInformacionComponent {
  nombre: string;
  email: string;
  telefono: number;
  asunto: string;
  mensaje: string;

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

  async EnviarCorreo() {

    if (this.email === undefined) {
      const alert = await this.alertController.create({
        header: 'Atención: Introduce un correo de usuario en el formulario',
        buttons: ['OK']
      });
      await alert.present();
    } else {

      console.log(this.asunto)
      console.log('voy a enviar emial de ' + this.email);
      emailJS.init('pVnnpc_96wrNsI_Jg')
      const serviceID = 'default_service';
      const templateID = 'template_n4l4l5r';
      const templateParams = {
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        asunto: this.asunto,
        mensaje: this.mensaje,
      }

      emailJS.send(serviceID, templateID, templateParams)
        .then(function (response) {
          console.log("mensaje enviado", response)
        }, function (error) {
          console.log("mensaje no enviado", error)
        });
    };

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


  GoToInicio() {
    this.route.navigateByUrl('/home');
  }

}
