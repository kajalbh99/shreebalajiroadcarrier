import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { EditChallanComponent } from './edit-challan/edit-challan.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [{
  path: '',
  data: {
    title: 'EditChallan',
    urls: [{title: 'EditChallan', url: '/edit-challan'}, {title: 'EditChallan'}]
  },
  component: EditChallanComponent
}];

@NgModule({
  declarations: [EditChallanComponent],
  imports: [
    TagInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  RouterModule.forChild(routes),
    MyDatePickerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ]
})
export class EditChallanModule { }

