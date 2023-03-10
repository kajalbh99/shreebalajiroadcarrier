import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Login',
    urls: [{title: 'Login', url: '/login'}, {title: 'Login'}]
  },
  component: LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [LoginComponent],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginModule { }
