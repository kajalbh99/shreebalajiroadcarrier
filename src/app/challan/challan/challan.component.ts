import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css']
})
export class ChallanComponent implements OnInit {

  page=1;
  challans:any;
  search;
  paginationArr = [];
  currentPage = 1;

  constructor(private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService)  { }

  ngOnInit() {
    this.getAllChallans();
  }

  edit(id){
    this.router.navigateByUrl('/edit-challan/'+id);
  }
  
  getAllChallans(){
    this.spinnerService.show();
	  this.emp.allChallans(this.page).subscribe(
	    data =>{
	      let result = data.json(); 
	      if(result.status){
        this.challans =  result.challans.data;
        this.currentPage = result.challans.current_page;
        if(result.challans.total > 1 && this.paginationArr.length == 0){
          for (let index = 1; index <= result.challans.last_page; index++) {
            this.paginationArr.push(index);
          }
        }
        this.spinnerService.hide();
	        }else{
            this.challans = [];
            this.spinnerService.hide();
	        }
	      }
	  )
  }

  print(id){
    this.router.navigateByUrl('/print-challan/'+id);
  }

  searchChallan(){
    this.spinnerService.show();
     this.emp.searchChallan(this.search).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status){
          this.challans =  result.challans;
          this.spinnerService.hide();
            console.log(this.challans);
            }else{
              this.challans = [];
              this.spinnerService.hide();
            }
          }
    )
  }

  searchEmpty(value){
    this.search = value;
    if (this.search == '') {
     this.getAllChallans();
   }
  }

  pagination(value){
    this.page = value;
    this.getAllChallans();
  }

  delete(id){
    var r = confirm("Do You Want To Delete This Challan!");
    if (r == true) {
      this.spinnerService.show();
      this.emp.deleteChallan(id).subscribe(
        data =>{
          let result = data.json(); 
          if(result.status){
            alert('Challan Deleted')
            this.getAllChallans();
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
