import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;
  password;

  constructor(private log: LoginService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    let logged = window.localStorage.getItem('logged_user');
    if(logged){
      this.router.navigateByUrl('/bills');
    }
    
  }

    login(){
      this.spinnerService.show();
  	if(this.user != "" && this.password != ""){
  		this.log.userLogin(this.user,this.password).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status){
            window.localStorage.setItem('logged_user','true');
            window.localStorage.setItem('logged_user_id',result.data);
            this.spinnerService.hide();
            this.router.navigateByUrl('/bills');
            //alert('Login successful!');
            }else{
              this.spinnerService.hide();
              alert('Please check your login credentials');
              
            }
          }
      )
  	}else{
      this.spinnerService.hide();
  		alert("Please check your login credentials!");
  	}
  }

}
