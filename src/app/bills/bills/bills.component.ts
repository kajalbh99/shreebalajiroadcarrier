import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {


  ngOnInit() {
  }

  page=1;
  list:any;
  search;
  paginationArr = [];
  currentPage = 1;

  constructor(private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
  	this.getAllBills();
   }




  edit(id){
    this.router.navigateByUrl('/edit-bill/'+id);
  }

  card(id){
    this.router.navigateByUrl('/generate-bill/'+id);
  }


  getAllBills(){
    this.spinnerService.show();
	  this.emp.allBills(this.page).subscribe(
	    data =>{
	      let result = data.json(); 
	      if(result.status){
        this.list =  result.bills.data;
        this.currentPage = result.bills.current_page;
        if(result.bills.total > 1 && this.paginationArr.length == 0){
          for (let index = 1; index <= result.bills.last_page; index++) {
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

   searchbill(){
    this.spinnerService.show();
     this.emp.searchBill(this.search).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status){
        this.list =  result.bills;
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
      this.getAllBills();
    }
   }

   pagination(value){
     this.page = value;
     this.getAllBills();
   }

   delete(id){
    var r = confirm("Do You Want To Delete This Billti!");
    if (r == true) {
      this.spinnerService.show();
      this.emp.deleteBill(id).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status){
            alert('Billti Deleted')
            this.getAllBills();
            this.spinnerService.hide();
            }else{
              alert('Try Again');
              this.spinnerService.hide();
            }
          }
      ) 
    } else {
      console.log('No');
    }
   }


}

