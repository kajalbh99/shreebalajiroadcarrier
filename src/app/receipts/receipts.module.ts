import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsComponent } from './receipts/receipts.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'receipts',
    urls: [{title: 'Receipts', url: '/receipts'}, {title: 'Receipts'}]
  },
  component: ReceiptsComponent
}];

@NgModule({
  declarations: [ReceiptsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ]
})
export class ReceiptsModule { }
