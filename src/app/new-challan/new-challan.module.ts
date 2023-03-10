import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChallanComponent } from './new-challan/new-challan.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TagInputModule } from 'ngx-chips';

const routes: Routes = [{
  path: '',
  data: {
    title: 'NewChallan',
    urls: [{title: 'NewChallan', url: '/new-challan'}, {title: 'NewChallan'}]
  },
  component: NewChallanComponent
}];

@NgModule({
  imports: [
    TagInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	  RouterModule.forChild(routes),
    MyDatePickerModule ,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [NewChallanComponent],
  providers: [],
})
export class NewChallanModule { }
