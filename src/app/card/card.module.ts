import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { MyDatePickerModule } from 'mydatepicker';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Bill',
    urls: [{title: 'Bill', url: '/generate-bill'}, {title: 'Bill'}]
  },
  component: CardComponent
}];

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MyDatePickerModule,
    FormsModule
  ]
})


export class CardModule { }
