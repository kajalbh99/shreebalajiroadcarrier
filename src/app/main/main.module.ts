import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Main',
    urls: [{title: 'Main', url: '/main'}, {title: 'Main'}]
  },
  component: MainComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [MainComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class MainModule { }
