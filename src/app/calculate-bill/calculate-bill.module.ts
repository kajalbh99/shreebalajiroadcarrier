import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalculateBillComponent } from './calculate-bill/calculate-bill.component';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MonthpickerComponent } from '../monthpicker/monthpicker/monthpicker.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Calculate',
    urls: [{title: 'Calculate', url: '/calculate-bill'}, {title: 'Calculate'}]
  },
  component: CalculateBillComponent
}];

@NgModule({
  declarations: [CalculateBillComponent,MonthpickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ]
})
export class CalculateBillModule { }
