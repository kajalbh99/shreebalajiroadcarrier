import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions  } from '@angular/http';
import * as myGlobals from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: Http) { }

  userLogin(user,password){
    let data = new URLSearchParams();
    data.append('user',user);
    data.append('password',password);
    return this.http.post(myGlobals.api_base_url+'login', data);
  }

}
