import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

   logout(){
   	this.router.navigateByUrl('/login');
   	window.localStorage.clear();
   }


   NewBill(){
    this.router.navigateByUrl('/new-bill');
   }

   NewChallan(){
    this.router.navigateByUrl('/new-challan');
   }

   AllBills(){
    this.router.navigateByUrl('/bills');
   }

   AllChallans(){
    this.router.navigateByUrl('/challans');
   }

   NewReceipt(){
    this.router.navigateByUrl('/new-receipt');
   }

   AllReceipt(){
    this.router.navigateByUrl('/receipts');
   }

   calculate(){
    this.router.navigateByUrl('/calculate-bill');
   }
}
