import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills/bills.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Bills',
    urls: [{title: 'Bills', url: '/bills'}, {title: 'Bills'}]
  },
  component: BillsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [BillsComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class BillsModule { }
