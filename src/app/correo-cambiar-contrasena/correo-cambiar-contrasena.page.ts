import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Network } from '@ionic-native/network/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { Alumno } from '../clases';
import { ComServerService, PeticionesAPIService, SesionService } from '../servicios';

@Component({
  selector: 'app-correo-cambiar-contrasena',
  templateUrl: './correo-cambiar-contrasena.page.html',
  styleUrls: ['./correo-cambiar-contrasena.page.scss'],
})
export class CorreoCambiarContrasenaComponent {
  alumno: Alumno;
  username: string;
  nombre: string;
  email: string;

  indicarCorreoCambiarContrasena = true;


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

    console.log ('voy a enviar contraseña');
    if (this.email === undefined) {
      const alert = await this.alertController.create({
        header: 'Atención: Introduce un correo de usuario en el formulario',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      console.log ('voy a pedir contraseña ' + this.email);
      this.peticionesAPI.DameAlumnoConCorreo (this.email)
      .subscribe (async (res) => {
          console.log ('tengo res');
          console.log (res);
          if (res[0] !== undefined) {
            console.log ('tengo el alumno');
            const alumno = res[0]; // Si es diferente de null, el alumno existe
            // le enviamos la contraseña
            console.log ('tengo el alumno');
            this.comServer.RecordarContrasena(alumno);
            const alert = await this.alertController.create({
              header: 'En breve recibirás un email con tu contraseña',
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
          } else {
            const alert = await this.alertController.create({
              header: 'No hay ningun alumno con este correo electronico',
              buttons: ['OK']
            });
            await alert.present();
          }
      });
    }

  }


  async EnviarCodigo() {

    console.log ('voy a enviar codigo');
    if (this.email === undefined) {
      const alert = await this.alertController.create({
        header: 'Atención: Introduce un correo de usuario en el formulario',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.peticionesAPI.DameAlumnoConCorreo(this.email)
      .subscribe (async (res) => {
          console.log ('tengo res');
          console.log (res);
          if (res[0] !== undefined) {
            console.log ('tengo el alumno');
            const alumno = res[0]; // Si es diferente de null, el alumno existe
            // le enviamos la contraseña
            console.log ('tengo el alumno');
            this.comServer.EnviarCodigoContrasena(alumno);
            const alert = await this.alertController.create({
              header: 'En breve recibirás un email con el codigo para cambiar de contraseña',
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
          } else {
            const alert = await this.alertController.create({
              header: 'No hay ningun alumno con este nombre de usuario',
              buttons: ['OK']
            });
            await alert.present();
          }
    });
  }
  }
    
  

  VolverInicio() {
    this.route.navigateByUrl('/home');
  } 
  GoToCambiarContrasena() {
    this.route.navigateByUrl('/cambiar-contrasena/:id/:token');
  } 

}

