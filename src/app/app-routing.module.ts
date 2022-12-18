import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'slides', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'inici', loadChildren: () => import('./inici/inici.module').then(m => m.IniciPageModule) },
  { path: 'juego-seleccionado', loadChildren: () => import('./juego-seleccionado/juego-seleccionado.module').then(m => m.JuegoSeleccionadoPageModule) },
  { path: 'cromos-amostrar', loadChildren: () => import('./cromos-amostrar/cromos-amostrar.module').then(m => m.CromosAMostrarPageModule) },
  { path: 'mi-perfil', loadChildren: () => import('./mi-perfil/mi-perfil.module').then(m => m.MiPerfilPageModule) },
  { path: 'mis-grupos', loadChildren: () => import('./mis-grupos/mis-grupos.module').then(m => m.MisGruposPageModule) },
  { path: 'mis-juegos-inactivos', loadChildren: () => import('./mis-juegos-inactivos/mis-juegos-inactivos.module').then(m => m.MisJuegosInactivosPageModule) },
  { path: 'intercambiar-cromos', loadChildren: () => import('./intercambiar-cromos/intercambiar-cromos.module').then(m => m.IntercambiarCromosPageModule) },
  { path: 'juegos-inactivos', loadChildren: () => import('./juegos-inactivos/juegos-inactivos.module').then(m => m.JuegosInactivosPageModule) },
  { path: 'slides', loadChildren: () => import('./slides/slides.module').then(m => m.SlidesPageModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'mis-colecciones', loadChildren: () => import('./mis-colecciones/mis-colecciones.module').then(m => m.MisColeccionesPageModule) },
  { path: 'juego-de-cuestionario', loadChildren: () => import('./juego-de-cuestionario/juego-de-cuestionario.module').then(m => m.JuegoDeCuestionarioPageModule)},
  { path: 'juego-competicion-f1', loadChildren: () => import('./juego-competicion-f1/juego-competicion-f1.module').then(m => m.JuegoCompeticionF1PageModule) },
  { path: 'juego-competicion-liga', loadChildren: () => import('./juego-competicion-liga/juego-competicion-liga.module').then(m => m.JuegoCompeticionLigaPageModule) },
  { path: 'juego-competicion-torneo', loadChildren: () => import('./juego-competicion-torneo/juego-competicion-torneo.module').then(m => m.JuegoCompeticionTorneoPageModule) },
  { path: 'informacion-jornadas', loadChildren: () => import('./informacion-jornadas/informacion-jornadas.module').then(m => m.InformacionJornadasPageModule) },
  { path: 'juego-colleccion', loadChildren: () => import('./juego-colleccion/juego-colleccion.module').then(m => m.JuegoColleccionPageModule) },
  { path: 'juego-avatar', loadChildren: () => import('./juego-avatar/juego-avatar.module').then(m => m.JuegoAvatarPageModule) },
  { path: 'avatar-editor', loadChildren: () => import('./avatar-editor/avatar-editor.module').then(m => m.AvatarEditorPageModule) },

  { path: 'juego-puntos', loadChildren: () => import('./juego-puntos/juego-puntos.module').then(m => m.JuegoPuntosPageModule) },
  { path: 'album-alumno', loadChildren: () => import('./album-alumno/album-alumno.module').then(m => m.AlbumAlumnoPageModule) },

  { path: 'juego-de-geocaching', loadChildren: () => import('./juego-de-geocaching/juego-de-geocaching.module').then(m => m.JuegoDeGeocachingPageModule) },
  { path: 'modal', loadChildren: () => import('./modal/modal.module').then(m => m.ModalPageModule) },
  { path: 'ver-avatares-grupo', loadChildren: () => import('./ver-avatares-grupo/ver-avatares-grupo.module').then(m => m.VerAvataresGrupoPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-votacion-uno-atodos', loadChildren: () => import('./juego-votacion-uno-atodos/juego-votacion-uno-atodos.module').then(m => m.JuegoVotacionUnoATodosPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-votacion-todos-auno', loadChildren: () => import('./juego-votacion-todos-auno/juego-votacion-todos-auno.module').then(m => m.JuegoVotacionTodosAUnoPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-cuestionario-satisfaccion', loadChildren: () => import('./juego-cuestionario-satisfaccion/juego-cuestionario-satisfaccion.module').then(m => m.JuegoCuestionarioSatisfaccionPageModule) },
  { path: 'juego-votacion-rapida', loadChildren: () => import('./juego-votacion-rapida/juego-votacion-rapida.module').then(m => m.JuegoVotacionRapidaPageModule) },
  { path: 'mis-juegos-inactivos', loadChildren: () => import('./mis-juegos-inactivos/mis-juegos-inactivos.module').then(m => m.MisJuegosInactivosPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-coger-turno-rapido', loadChildren: () => import('./juego-coger-turno-rapido/juego-coger-turno-rapido.module').then(m => m.JuegoCogerTurnoRapidoPageModule) },
  { path: 'juego-evaluacion', loadChildren: () => import('./juego-evaluacion/juego-evaluacion.module').then(m => m.JuegoEvaluacionPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'pagina-evaluar/:id', loadChildren: () => import('./pagina-evaluar/pagina-evaluar.module').then(m => m.PaginaEvaluarPageModule) },
  { path: 'pagina-notafinal/:id', loadChildren: () => import('./pagina-notafinal/pagina-notafinal.module').then(m => m.PaginaNotafinalPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'juego-de-control-de-trabajo-en-equipo', loadChildren: () => import('./juego-de-control-de-trabajo-en-equipo/juego-de-control-de-trabajo-en-equipo.module').then(m => m.JuegoDeControlDeTrabajoEnEquipoPageModule) },
  { path: 'juego-votacion-aopciones', loadChildren: () => import('./juego-votacion-aopciones/juego-votacion-aopciones.module').then(m => m.JuegoVotacionAOpcionesPageModule) },


  { path: 'correo-cambiar-contrasena', loadChildren: () => import('./correo-cambiar-contrasena/correo-cambiar-contrasena.module').then(m => m.CorreoCambiarContrasenaModule) },
  { path: 'cambiar-contrasena/:id/:token', loadChildren: () => import('./cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule) }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


