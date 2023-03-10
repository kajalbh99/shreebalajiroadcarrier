import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';
import { Routes, RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'NewReceipt',
    urls: [{title: 'NewReceipt', url: '/new-receipt'}, {title: 'NewReceipt'}]
  },
  component: NewReceiptComponent
}];

@NgModule({
  declarations: [NewReceiptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  RouterModule.forChild(routes),
    MyDatePickerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ]
})
export class NewReceiptModule { }
