import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ComServerService } from './../servicios/com-server.service';
import { NoopAnimationPlayer } from '@angular/animations';
import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SesionService } from '../servicios/sesion.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PeticionesAPIService } from '../servicios/index';
import { CalculosService } from '../servicios/calculos.service';
import { Juego, Equipo, Evento } from '../clases/index';
import { Router } from '@angular/router';
import { JuegoSeleccionadoPage } from '../juego-seleccionado/juego-seleccionado.page';
import { IonSlides } from '@ionic/angular';
import Swiper, { SwiperOptions } from 'swiper';
import { ThisReceiver } from '@angular/compiler/src/expression_parser/ast';


@Component({
  selector: 'app-inici',
  templateUrl: './inici.page.html',
  styleUrls: ['./inici.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IniciPage implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;
  // @ViewChild(IonSlides) slides: IonSlides;
  // prevBtn = document.getElementById('prevBtn') as HTMLButtonElement | null;
  // nextBtn = document.getElementById('nextBtn') as HTMLButtonElement | null;

  /* Creamos los array con los juegos activos e inactivos que solicitaremos a la API */
  id: number;
  JuegosActivos: Juego[] = [];
  disablePrevBtn = true;
  disableNextBtn = false;


  //animals: any[];

  constructor(
    private route: Router,
    public navCtrl: NavController,
    private sesion: SesionService,
    private peticionesAPI: PeticionesAPIService,
    private calculos: CalculosService,
    private socket: Socket
  ) {
    this.esperarCambioStatusJuegos().subscribe(mensaje => {
      console.log(`Este es el mensaje: ${mensaje}`);
      this.DameJuegosAlumno(this.id);
    })

  }


  ngOnInit() {
    this.id = this.sesion.DameAlumno().id;
    console.log('Este es el id del alumno que se ha logado: ' + this.id);
    this.DameJuegosAlumno(this.id);
    // this.calculos.DameJuegosAlumno_back(this.id)
    //   .subscribe(listas => {
    //     this.JuegosActivos = listas.activos;
    //     console.log ('ya tengo los juegos ', this.JuegosActivos);
    // });
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper([]);
    }
  }

  async DameJuegosAlumno(id) {
    const listas = await this.calculos.DameJuegosAlumno(id);
    this.JuegosActivos = listas.activos;

  }


  JuegoSeleccionado(juego: any) {
    // Registrar el Acceso al Juego
    this.peticionesAPI.DameGrupo(juego.grupoId).subscribe((grupo) => {

      // tslint:disable-next-line:max-line-length
      const evento: Evento = new Evento(2, new Date(), grupo.profesorId, this.sesion.DameAlumno().id, undefined, juego.id, juego.NombreJuego, juego.Tipo);
      this.calculos.RegistrarEvento(evento);
      // this.peticionesAPI.CreaEvento(evento).subscribe((res) => {
      //   console.log("Registrado evento: ", res);
      // }, (err) => { 
      //   console.log(err); 
      // });
    }, (err) => {
      console.log(err);
    });

    this.sesion.TomaJuego(juego);
    if (juego.Tipo === 'Juego De Puntos') {
      this.navCtrl.navigateForward('/juego-puntos');
    } else if (juego.Tipo === 'Juego De Competición Liga') {
      this.navCtrl.navigateForward('/juego-competicion-liga');
    } else if (juego.Tipo === 'Juego De Competición Fórmula Uno') {
      this.navCtrl.navigateForward('/juego-competicion-f1');
    } else if (juego.Tipo === 'Juego De Competición Torneo') {
      this.navCtrl.navigateForward('/juego-competicion-torneo');
    } else if (juego.Tipo === 'Juego De Cuestionario') {
      this.navCtrl.navigateForward('/juego-de-cuestionario');
    } else if (juego.Tipo === 'Juego De Geocaching') {
      this.navCtrl.navigateForward('/juego-de-geocaching');
    } else if (juego.Tipo === 'Juego De Avatar') {
      this.sesion.TomaJuegoAvatar(juego);
      this.navCtrl.navigateForward('/juego-avatar');
    } else if (juego.Tipo === 'Juego De Votación Uno A Todos') {
      this.navCtrl.navigateForward('/juego-votacion-uno-atodos');
    } else if (juego.Tipo === 'Juego De Votación Todos A Uno') {
      this.navCtrl.navigateForward('/juego-votacion-todos-auno');
    } else if (juego.Tipo === 'Juego De Votación Votar opciones') {
      this.navCtrl.navigateForward('/juego-votacion-aopciones');
    } else if (juego.Tipo === 'Juego De Cuestionario de Satisfacción') {
      this.navCtrl.navigateForward('/juego-cuestionario-satisfaccion');
    } else if (juego.Tipo === 'Evaluacion') {
      this.sesion.TomaJuegoEvaluacion(juego);
      this.navCtrl.navigateForward('/juego-evaluacion');
    } else if (juego.Tipo === 'Control de trabajo en equipo') {
      this.navCtrl.navigateForward('/juego-de-control-de-trabajo-en-equipo');
    } else {
      this.navCtrl.navigateForward('/juego-colleccion');
    }
  }



  doCheck() {
    // Para decidir si hay que mostrar los botones de previo o siguiente slide
    // const prom1 = this.slides.isBeginning();
    // const prom2 = this.slides.isEnd();
    const prom1 = this.swiper.swiperRef.isBeginning;
    const prom2 = this.swiper.swiperRef.isEnd;


    Promise.all([prom1, prom2]).then((data) => {
      console.log("Esta es data 0:")
      console.log(data[0]);
      data[0] ? this.disablePrevBtn = true : this.disablePrevBtn = false;
      data[1] ? this.disableNextBtn = true : this.disableNextBtn = false;
      // data[0] ? this.prevBtn?.setAttribute('disabled','') : this.prevBtn?.removeAttribute('disabled');
      // data[1] ? this.nextBtn?.setAttribute('disabled','') : this.nextBtn?.removeAttribute('disabled');
      // if(data[0]){
      //   this.disablePrevBtn = true;
      // }

    });
  }


  next() {
    // this.slides.slideNext();
    this.swiper.swiperRef.slideNext();
  }

  prev() {
    // this.slides.slidePrev();
    this.swiper.swiperRef.slidePrev();
  }


  esperarCambioStatusJuegos() {

    let observable = new Observable( observer => {
      this.socket.on('nuevoStatusJuego', (mensaje) => {
        console.log('Nuevo status de juego: ' + mensaje);
        observer.next(mensaje);
      })
    });

    return observable;
  }

}
