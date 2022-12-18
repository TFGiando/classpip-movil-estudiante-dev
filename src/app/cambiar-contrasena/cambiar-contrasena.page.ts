import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, AlertController, AngularDelegate, Platform } from '@ionic/angular';
// import { HttpClient } from '@angular/common/http';
import { Alumno } from '../clases';
import { IniciPage } from '../inici/inici.page';
import { TabsPage } from '../tabs/tabs.page';
import { PeticionesAPIService, SesionService, ComServerService} from '../servicios/index';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
//import { Camera, CameraOptions } from '@ionic-native/camera';

import { Transfer } from '@ionic-native/transfer';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { WheelSelector } from '@ionic-native/wheel-selector/ngx';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Network } from '@ionic-native/network/ngx';

import jwt from 'jsonwebtoken';




@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage {
  token: string;
  contrasena: string;
  contrasenaRep: string;
  idUsuario: number;
  CambioContrasena = true;
  alumno: Alumno;
  JWT_SECRET: string = "SECRETOCLASSPIP";
  correcto: string = "0";

  constructor(
    private route: Router,
    public navCtrl: NavController,
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private geolocation: Geolocation,
    private file: File,
    private media: Media,
    private comServer: ComServerService,
    private selector: WheelSelector,
    private localNotifications: LocalNotifications,
    public platform: Platform,
    private network: Network,

  ){
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
    });
  }

  ValidaPass(pass) {
    // La contraseña solo puede tener numeros y digitos
    const re = /[^A-Za-z0-9]+/;
    return !re.test(pass);
  }

  
  async CambiarContrasena() {

    const camposURL = window.location.pathname.split('/');
    this.idUsuario = Number(camposURL[2])
    this.token = camposURL[3]


    console.log(this.token)
    console.log(this.idUsuario)
    console.log ('cambiando contrasena');


     if (!this.ValidaPass (this.contrasena)) {
      const alert = await this.alertController.create({
        header: 'La contraseña solo puede tener letras y digitos',
        buttons: ['OK']
      });
      await alert.present();

    } else if (this.contrasena !== this.contrasenaRep) {
      const alert = await this.alertController.create({
        header: 'No coincide la contraseña con la contraseña repetida',
        buttons: ['OK']
      });
      await alert.present();

    } else {
      this.peticionesAPI.DameAlumnoConId(this.idUsuario)
      .subscribe (async (res) => {
        if (res !== undefined) {
          const secret = this.JWT_SECRET + res.Password

          try{
            const payload = jwt.verify(this.token, secret)
            console.log(payload)
            this.correcto="1";
          }
          catch(error){
            console.log(error)
          }

          if(this.correcto=="1"){
          res.Password = this.contrasena;
          this.peticionesAPI.CambiarContrasena(res).subscribe();
          const alert = await this.alertController.create({
            header: 'Contraseña cambiada correctamente',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  console.log('Confirm Ok');
                }
              }
            ]
          })
          await alert.present(); 
        }
        else{
          const alert = await this.alertController.create({
            header: 'El token no es valido y no se puede cambiar la contraseña',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  console.log('Confirm Ok');
                }
              }
            ]
          })
          await alert.present();
          
        }
        }          
      } 
    )};                      
  }
}
    
