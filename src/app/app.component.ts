import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'payroll-system';
  route;
  user;
  password;
  header= false;

  constructor(private router:Router){
  	router.events.subscribe(
      data => {
        if(router.url != undefined){
           if(router.url == '/login' || router.url == '/' || router.url == ''
            ){
              this.header = true;
            }else{
              this.header = false;
            }
            this.loadScript();
          
        }
      }
    );


  }

  loadScript(){
  	var elementExists = document.getElementById("script1");
    if(elementExists)
    elementExists.remove();
    var script1 = document.createElement("script1");
    script1.setAttribute("id", "script1");
    script1.setAttribute("src", "assets/js/custom-js");
    document.body.appendChild(script1);
  }


}
