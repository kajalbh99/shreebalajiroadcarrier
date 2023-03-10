import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBillComponent } from './new-bill/new-bill.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'NewBill',
    urls: [{title: 'NewBill', url: '/new-bill'}, {title: 'NewBill'}]
  },
  component: NewBillComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  RouterModule.forChild(routes),
    MyDatePickerModule ,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [NewBillComponent],
  providers: [],
})
export class NewBillModule { }
