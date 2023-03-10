import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallanComponent } from './challan/challan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Challan',
    urls: [{title: 'Challan', url: '/challans'}, {title: 'Challan'}]
  },
  component: ChallanComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ChallanComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class ChallanModule { }
