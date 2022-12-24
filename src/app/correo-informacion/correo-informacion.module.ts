import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CorreoInformacionComponent } from './correo-informacion.page';

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    MatExpansionModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
      path: '',
      component: CorreoInformacionComponent
    }
  ])
],
declarations: [CorreoInformacionComponent]
})
export class CorreoInformacionModule {}