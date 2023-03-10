import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {
  page=1;
  list:any;
  search;
  paginationArr = [];
  currentPage = 1;

  ngOnInit() {
  }

  constructor(private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
  	this.getAllReceipts();
   }

   getAllReceipts(){
    this.spinnerService.show();
	  this.emp.allReceipts(this.page).subscribe(
	    data =>{
	      let result = data.json(); 
	      if(result.status){
        this.list =  result.receipts.data;
        this.currentPage = result.receipts.current_page;
        if(result.receipts.total > 1 && this.paginationArr.length == 0){
          for (let index = 1; index <= result.receipts.last_page; index++) {
            this.paginationArr.push(index);
          }
        }
        this.spinnerService.hide();
	        }else{
            this.list = [];
            this.spinnerService.hide();
	        }
	      }
	  )
   }

   searchReceipt(){
    this.spinnerService.show();
     this.emp.searchReceipt(this.search).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status){
        this.list =  result.receipts;
          console.log(this.list);
          this.spinnerService.hide();
          }else{
            this.list = [];
            this.spinnerService.hide();
          }
        }
    )
   }

   searchEmpty(value){
     this.search = value;
     if (this.search == '') {
      this.getAllReceipts();
    }
   }

   pagination(value){
     this.page = value;
     this.getAllReceipts();
   }

   pdf(id){
    this.router.navigateByUrl('/print-receipt/'+id);
   }
}
