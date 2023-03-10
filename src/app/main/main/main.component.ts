import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  page=1;
  list:any;
  search;

  constructor(private emp: EmployeeService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
  	this.getEmployeeList()
   }

  ngOnInit() {
  }


  edit(id){
    this.router.navigateByUrl('/edit-employee/'+id);
  }

  card(id){
    this.router.navigateByUrl('/generate-card/'+id);
  }

  getEmployeeList(){
    // this.spinnerService.show();
	  // this.emp.employeeList(this.page).subscribe(
	  //   data =>{
	  //     let result = data.json(); 
	  //     if(result.status){
    //     this.list =  result.list;
    //     this.spinnerService.hide();
	  //     	console.log(this.list);
	  //       }else{
    //         this.list = [];
    //         this.spinnerService.hide();
	  //       }
	  //     }
	  // )
   }

   searchEmp(){
    this.spinnerService.show();
     this.emp.searchEmployee(this.search).subscribe(
      data =>{
        let result = data.json(); 
        if(result.status){
        this.list =  result.list;
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
      this.getEmployeeList();
    }
   }



   

}
