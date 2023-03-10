import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { EditBillComponent } from './edit-bill/edit-bill.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'EditBill',
    urls: [{title: 'EditBill', url: '/edit-bill'}, {title: 'EditBill'}]
  },
  component: EditBillComponent
}];

@NgModule({
  declarations: [EditBillComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  RouterModule.forChild(routes),
    MyDatePickerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ]
})
export class EditBillModule { }
